package com.asif.server.dto.transaction;

import com.asif.server.dto.product.TransactionType;
import com.asif.server.entity.product.Product;
import lombok.Builder;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Builder
public record TransactionDTO(
        String id,
        Product product,
        String fromOwnerId,
        String toOwnerId,
        TransactionType transactionType,
        LocalDateTime fromRentDate,
        LocalDateTime toRentDate
) {
}

