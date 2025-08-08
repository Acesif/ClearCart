package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.dto.transaction.TransactionDTO;
import com.asif.server.service.transactions.TransactionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.Date;

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
            @Argument Date fromRentDate,
            @Argument Date toRentDate,
            Authentication authentication
    ) {
        return transactionService.rentProduct(product, fromRentDate, toRentDate, authentication);
    }

    // see bought

    // see rented

    // see sold
}
