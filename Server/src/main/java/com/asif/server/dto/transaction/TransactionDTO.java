package com.asif.server.dto.transaction;

import com.asif.server.dto.product.TransactionType;
import lombok.Builder;

import java.util.Date;

@Builder
public record TransactionDTO(
        String id,
        String productId,
        String fromOwnerId,
        String toOwnerId,
        TransactionType transactionType,
        Date fromRentDate,
        Date toRentDate
) {
}

