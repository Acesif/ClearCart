package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.dto.transaction.TransactionDTO;
import com.asif.server.service.transactions.TransactionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Controller
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<TransactionDTO>> buyProduct(
            @Argument ProductDTO product,
            Authentication authentication
    ) {
        return transactionService.buyProduct(product, authentication);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<TransactionDTO>> rentProduct(
            @Argument ProductDTO product,
            @Argument LocalDate fromRentDate,
            @Argument LocalDate toRentDate,
            Authentication authentication
    ) {
        return transactionService.rentProduct(product, fromRentDate, toRentDate, authentication);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<Page<TransactionDTO>> seeBought(
            @Argument int page,
            @Argument int limit,
            @Argument(name = "sortDirection") Sort.Direction direction,
            Authentication authentication
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return transactionService.seeMyBoughtItems(page, limit, sortDir, authentication);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<Page<TransactionDTO>> seeSold(
            @Argument int page,
            @Argument int limit,
            @Argument(name = "sortDirection") Sort.Direction direction,
            Authentication authentication
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return transactionService.seeMySoldItems(page, limit, sortDir, authentication);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<Page<TransactionDTO>> seeLent(
            @Argument int page,
            @Argument int limit,
            @Argument(name = "sortDirection") Sort.Direction direction,
            Authentication authentication
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return transactionService.seeMyLentItems(page, limit, sortDir, authentication);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<Page<TransactionDTO>> seeBorrowed(
            @Argument int page,
            @Argument int limit,
            @Argument(name = "sortDirection") Sort.Direction direction,
            Authentication authentication
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return transactionService.seeMyBorrowedItems(page, limit, sortDir, authentication);
    }

    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<List<TransactionDTO>>> getTransactionsByProductId(@Argument String productId) {
        return transactionService.getTransactionsByProductId(productId);
    }
}
