package com.asif.server.entity.product;

import com.asif.server.base.BaseEntity;
import com.asif.server.dto.product.RateInterval;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@MappedSuperclass
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductBase extends BaseEntity {

    @Column(length = 50)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal rate;

    @Column(name = "rate_interval")
    @Enumerated(EnumType.STRING)
    private RateInterval interval;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDraft = true;
}

