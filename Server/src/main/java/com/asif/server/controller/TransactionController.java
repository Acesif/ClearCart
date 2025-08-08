package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.dto.transaction.TransactionDTO;
import com.asif.server.service.transactions.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
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
            @Argument @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime fromRentDate,
            @Argument @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime toRentDate,
            Authentication authentication
    ) {
        return transactionService.rentProduct(product, fromRentDate, toRentDate, authentication);
    }


    // see bought
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<List<TransactionDTO>>> seeBought(Authentication authentication) {
        return transactionService.seeMyBoughtItems(authentication);
    }

    // see sold
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<List<TransactionDTO>>> seeSold(Authentication authentication) {
        return transactionService.seeMySoldItems(authentication);
    }

    // see lent
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<List<TransactionDTO>>> seeLent(Authentication authentication) {
        return transactionService.seeMyLentItems(authentication);
    }

    // see borrowed
    @QueryMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<List<TransactionDTO>>> seeBorrowed(Authentication authentication) {
        return transactionService.seeMyBorrowedItems(authentication);
    }
}
