package com.asif.server.dto.product;

import lombok.Builder;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Builder
public record ProductDTO(
        String id,
        String title,
        String description,
        BigDecimal price,
        List<String> productCategoryIds,
        BigDecimal rate,
        RateInterval interval,
        Boolean isDraft,
        String owner
) {}

