package com.asif.server.utils;

import com.asif.server.entity.auth.Role;
import com.asif.server.entity.product.ProductCategory;
import com.asif.server.persistence.ProductCategoryRepository;
import com.asif.server.persistence.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DBSeeder {

    private final RoleRepository roleRepository;
    private final ProductCategoryRepository productCategoryRepository;

    @PostConstruct
    public void seedDatabase() {
        setUpRoles();
        setUpCategories();
    }

    private void setUpRoles() {
        if (roleRepository.findAll().isEmpty()) {
            List<Role> roleList = List.of(
                    Role.builder()
                            .name("ROLE_ADMIN")
                            .build(),
                    Role.builder()
                            .name("ROLE_USER")
                            .build()
            );
            roleRepository.saveAll(roleList);
        }
    }

    private void setUpCategories() {
        if (productCategoryRepository.findAll().isEmpty()) {
            List<ProductCategory> categories = List.of(
                    ProductCategory.builder()
                            .categoryId("ELC")
                            .name("Electronics")
                            .build(),
                    ProductCategory.builder()
                            .categoryId("FNT")
                            .name("Furniture")
                            .build(),
                    ProductCategory.builder()
                            .categoryId("HAP")
                            .name("Home Appliances")
                            .build(),
                    ProductCategory.builder()
                            .categoryId("SPG")
                            .name("Sporting Goods")
                            .build(),
                    ProductCategory.builder()
                            .categoryId("OTD")
                            .name("Outdoor")
                            .build(),
                    ProductCategory.builder()
                            .categoryId("TOY")
                            .name("Toys")
                            .build()
            );
            productCategoryRepository.saveAll(categories);
        }
    }
}
