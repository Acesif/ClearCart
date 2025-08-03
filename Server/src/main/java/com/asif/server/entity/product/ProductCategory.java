package com.asif.server.entity.product;

import com.asif.server.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ProductCategory extends BaseEntity {

    @Column(nullable = false)
    private String categoryId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;
}
