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

import java.util.Date;

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
            Date today = new Date();
            if (existingTransactions != null && today.equals(existingTransactions.getToRentDate()) && today.before(existingTransactions.getToRentDate())) {
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
            Date fromRentDate,
            Date toRentDate,
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
            if (existingTransaction.getFlag()) {
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

    private GenericResponse<TransactionDTO> rentProductHelperMethod(Date fromRentDate, Date toRentDate, UserInformation userInformation, Product productEntity) {
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

        return GenericResponse.<TransactionDTO>builder()
                .message("Successfully rented product")
                .data(toDTO(newTransaction))
                .build();
    }

    private boolean validRentPeriod(Date fromRentDateTrans, Date toRentDateTrans, Date fromRentDate, Date toRentDate) {
        return (fromRentDate.after(toRentDateTrans) ||
                toRentDate.before(fromRentDateTrans) ||
                (fromRentDate.equals(toRentDateTrans) && toRentDate.equals(toRentDateTrans)) ||
                (fromRentDate.equals(toRentDateTrans) && toRentDate.after(toRentDateTrans)) ||
                (toRentDate.equals(fromRentDateTrans) && fromRentDate.before(fromRentDateTrans)) ||
                (toRentDate.equals(fromRentDateTrans) && fromRentDate.equals(fromRentDateTrans))
        );
    }

    private TransactionDTO toDTO(ProductTransactions productTransaction) {
        return TransactionDTO.builder()
                .id(productTransaction.getId())
                .productId(productTransaction.getProduct().getId())
                .fromOwnerId(productTransaction.getFromOwner().getId())
                .toOwnerId(productTransaction.getToOwner().getId())
                .transactionType(productTransaction.getTransactionType())
                .fromRentDate(productTransaction.getFromRentDate())
                .toRentDate(productTransaction.getToRentDate())
                .build();
    }

}
