package com.asif.server.dto.product;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private String name;
    private String skuCode;
    private String description;
    private BigDecimal price;
    private Integer quantity;
}

