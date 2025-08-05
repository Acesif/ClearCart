package com.asif.server.dto.product;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.Set;

@Builder
public record ProductDTO(
        String id,
        String title,
        String description,
        BigDecimal price,
        Set<String> productCategoryIds,
        BigDecimal rate,
        RateInterval interval
) {}

