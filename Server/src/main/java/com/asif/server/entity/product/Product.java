package com.asif.server.entity.product;

import com.asif.server.base.BaseEntity;
import com.asif.server.dto.product.RateInterval;
import com.asif.server.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<ProductCategory> productCategory;

    @ManyToOne
    @JoinColumn(name = "owner", referencedColumnName = "id")
    private User owner;

    @Column(precision = 10, scale = 2)
    private BigDecimal rate;

    @Column(name = "rate_interval")
    @Enumerated(EnumType.STRING)
    private RateInterval interval;
}
