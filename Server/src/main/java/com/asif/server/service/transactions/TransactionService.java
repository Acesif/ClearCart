package com.asif.server.service.transactions;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.auth.UserInformation;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.dto.product.TransactionType;
import com.asif.server.dto.transaction.TransactionDTO;
import com.asif.server.entity.Transactions.ProductTransactions;
import com.asif.server.entity.auth.User;
import com.asif.server.entity.product.Product;
import com.asif.server.persistence.TransactionsRepository;
import com.asif.server.service.product.ProductService;
import com.asif.server.service.users.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

import static com.asif.server.utils.ExtractAuth.extractUserInformation;

@Service
public class TransactionService extends BaseService<ProductTransactions> {

    private final ProductService productService;
    private final UserService userService;
    private final TransactionsRepository transactionsRepository;

    public TransactionService(
            BaseRepository<ProductTransactions> baseRepository,
            ProductService productService,
            UserService userService,
            TransactionsRepository transactionsRepository
    ) {
        super(baseRepository);
        this.productService = productService;
        this.userService = userService;
        this.transactionsRepository = transactionsRepository;
    }


    @Transactional
    public Mono<GenericResponse<TransactionDTO>> buyProduct(
            ProductDTO product,
            Authentication authentication
    ) {
        return Mono.fromCallable(() -> {
            UserInformation userInformation = extractUserInformation(authentication);
            Product productEntity = productService.findById(product.id());

            if (!productEntity.getFlag()) {
                return GenericResponse.<TransactionDTO>builder()
                        .message("Product not available")
                        .data(null)
                        .build();
            }

            Boolean owned = transactionsRepository.existsByProductIdAndFromOwnerId(product.id(), userInformation.userId());

            if (owned) {
                return GenericResponse.<TransactionDTO>builder()
                        .message("You already own this product")
                        .data(null)
                        .build();
            }

            ProductTransactions existingTransactions = transactionsRepository.findByProductId(product.id());
            OffsetDateTime today = OffsetDateTime.now();
            if (existingTransactions != null && today.equals(existingTransactions.getToRentDate()) && today.isBefore(existingTransactions.getToRentDate())) {
                return GenericResponse.<TransactionDTO>builder()
                        .message("Another user has scheduled to rent this product")
                        .data(null)
                        .build();
            }

            User buyer = userService.findById(userInformation.userId());

            ProductTransactions productTransactions = ProductTransactions.builder()
                    .product(productEntity)
                    .fromOwner(productEntity.getOwner())
                    .toOwner(buyer)
                    .transactionType(TransactionType.TRADE)
                    .fromRentDate(null)
                    .toRentDate(null)
                    .build();

            ProductTransactions transaction = super.save(productTransactions);
            if (transaction == null) {
                return GenericResponse.<TransactionDTO>builder()
                        .data(null)
                        .message("Failed to buy product")
                        .build();
            }

            productService.delete(product.id());

            TransactionDTO transactionDTO = toDTO(transaction);
            return GenericResponse.<TransactionDTO>builder()
                    .data(transactionDTO)
                    .message("Successfully bought product")
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }

    @Transactional
    public Mono<GenericResponse<TransactionDTO>> rentProduct(
            ProductDTO product,
            OffsetDateTime fromRentDate,
            OffsetDateTime toRentDate,
            Authentication authentication
    ) {
        return Mono.fromCallable(() -> {
            UserInformation userInformation = extractUserInformation(authentication);
            Boolean owned = transactionsRepository.existsByProductIdAndFromOwnerId(product.id(), userInformation.userId());

            if (owned) {
                return GenericResponse.<TransactionDTO>builder()
                        .message("You already own this product")
                        .data(null)
                        .build();
            }

            Product productEntity;
            ProductTransactions existingTransaction = transactionsRepository.findByProductId(product.id());
            if (existingTransaction != null && existingTransaction.getFlag()) {
                productEntity = existingTransaction.getProduct();
                if (validRentPeriod(existingTransaction.getFromRentDate(), existingTransaction.getToRentDate(), fromRentDate, toRentDate)) {
                    return rentProductHelperMethod(fromRentDate, toRentDate, userInformation, productEntity);
                }
                return GenericResponse.<TransactionDTO>builder()
                        .message("Invalid date range selection for renting product")
                        .data(null)
                        .build();
            } else {
                productEntity = productService.findById(product.id());
                return rentProductHelperMethod(fromRentDate, toRentDate, userInformation, productEntity);
            }
        }).subscribeOn(Schedulers.boundedElastic());
    }


    public Mono<GenericResponse<List<TransactionDTO>>> seeMyBoughtItems(Authentication authentication) {
        UserInformation userInformation = extractUserInformation(authentication);
        return Mono.fromCallable(() -> {
            List<ProductTransactions> transactions = transactionsRepository.findByBoughtItems(userInformation.userId());
            return GenericResponse.<List<TransactionDTO>>builder()
                    .message("Successfully retrieved your bought items")
                    .data(toDTOList(transactions))
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<List<TransactionDTO>>> seeMySoldItems(Authentication authentication) {
        UserInformation userInformation = extractUserInformation(authentication);
        return Mono.fromCallable(() -> {
            List<ProductTransactions> transactions = transactionsRepository.findBySoldItems(userInformation.userId());
            return GenericResponse.<List<TransactionDTO>>builder()
                    .message("Successfully retrieved your sold items")
                    .data(toDTOList(transactions))
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<List<TransactionDTO>>> seeMyLentItems(Authentication authentication) {
        UserInformation userInformation = extractUserInformation(authentication);
        return Mono.fromCallable(() -> {
            List<ProductTransactions> transactions = transactionsRepository.findByLentItems(userInformation.userId());
            return GenericResponse.<List<TransactionDTO>>builder()
                    .message("Successfully retrieved your lent items")
                    .data(toDTOList(transactions))
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<List<TransactionDTO>>> seeMyBorrowedItems(Authentication authentication) {
        UserInformation userInformation = extractUserInformation(authentication);
        return Mono.fromCallable(() -> {
            List<ProductTransactions> transactions = transactionsRepository.findByBorrowedItems(userInformation.userId());
            return GenericResponse.<List<TransactionDTO>>builder()
                    .message("Successfully retrieved your borrowed items")
                    .data(toDTOList(transactions))
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }

    private GenericResponse<TransactionDTO> rentProductHelperMethod(
            OffsetDateTime fromRentDate,
            OffsetDateTime toRentDate,
            UserInformation userInformation,
            Product productEntity) {
        User renter = userService.findById(userInformation.userId());

        ProductTransactions newTransaction = ProductTransactions.builder()
                .product(productEntity)
                .fromOwner(productEntity.getOwner())
                .toOwner(renter)
                .transactionType(TransactionType.LOAN)
                .fromRentDate(fromRentDate)
                .toRentDate(toRentDate)
                .build();

        if (newTransaction == null) {
            return GenericResponse.<TransactionDTO>builder()
                    .data(null)
                    .message("Failed to rent product")
                    .build();
        }
        super.save(newTransaction);

        return GenericResponse.<TransactionDTO>builder()
                .message("Successfully rented product")
                .data(toDTO(newTransaction))
                .build();
    }

    private boolean validRentPeriod(OffsetDateTime fromRentDateTrans, OffsetDateTime toRentDateTrans, OffsetDateTime fromRentDate, OffsetDateTime toRentDate) {
        return fromRentDate.isAfter(toRentDateTrans) ||
                toRentDate.isBefore(fromRentDateTrans) ||
                (fromRentDate.isEqual(toRentDateTrans) && toRentDate.isEqual(fromRentDateTrans)) ||
                (fromRentDate.isEqual(toRentDateTrans) && toRentDate.isAfter(toRentDateTrans)) ||
                (toRentDate.isEqual(fromRentDateTrans) && fromRentDate.isBefore(fromRentDateTrans)) ||
                (toRentDate.isEqual(fromRentDateTrans) && fromRentDate.isEqual(fromRentDateTrans));
    }

    private TransactionDTO toDTO(ProductTransactions productTransaction) {
        return TransactionDTO.builder()
                .id(productTransaction.getId())
                .product(productTransaction.getProduct())
                .fromOwnerId(productTransaction.getFromOwner().getId())
                .toOwnerId(productTransaction.getToOwner().getId())
                .transactionType(productTransaction.getTransactionType())
                .fromRentDate(productTransaction.getFromRentDate())
                .toRentDate(productTransaction.getToRentDate())
                .build();
    }

    private List<TransactionDTO> toDTOList(List<ProductTransactions> productTransactions) {
        return productTransactions.stream().map(this::toDTO).toList();
    }
}
