package com.asif.server.entity.product;

import com.asif.server.base.BaseEntity;
import com.asif.server.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends ProductBase {

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<ProductCategory> productCategory;

    @ManyToOne
    @JoinColumn(name = "owner", referencedColumnName = "id")
    private User owner;
}
