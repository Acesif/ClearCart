package com.asif.server.utils;

import com.asif.server.dto.product.RateInterval;
import com.asif.server.entity.auth.Role;
import com.asif.server.entity.auth.User;
import com.asif.server.entity.product.Product;
import com.asif.server.entity.product.ProductCategory;
import com.asif.server.persistence.ProductCategoryRepository;
import com.asif.server.persistence.ProductRepository;
import com.asif.server.persistence.RoleRepository;
import com.asif.server.persistence.UserRepository;
import com.asif.server.service.product.ProductService;
import com.asif.server.service.users.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DBSeeder {

    private final RoleRepository roleRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final ProductService productService;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void seedDatabase() {
        setUpRoles();
        setUpCategories();
        setUpUsersAndProducts();
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
                            .categoryCode("ELC")
                            .name("Electronics")
                            .build(),
                    ProductCategory.builder()
                            .categoryCode("FNT")
                            .name("Furniture")
                            .build(),
                    ProductCategory.builder()
                            .categoryCode("HAP")
                            .name("Home Appliances")
                            .build(),
                    ProductCategory.builder()
                            .categoryCode("SPG")
                            .name("Sporting Goods")
                            .build(),
                    ProductCategory.builder()
                            .categoryCode("OTD")
                            .name("Outdoor")
                            .build(),
                    ProductCategory.builder()
                            .categoryCode("TOY")
                            .name("Toys")
                            .build()
            );
            productCategoryRepository.saveAll(categories);
        }
    }

    private void setUpUsersAndProducts() {
        List<String> dummyEmails = List.of(
                "user1@example.com",
                "user2@example.com",
                "user3@example.com"
        );

        dummyEmails.forEach(email -> {
            if (!userRepository.existsByEmail(email)) {
                User user = User.builder()
                        .firstName("First" + email.split("@")[0])
                        .lastName("Last" + email.split("@")[0])
                        .email(email)
                        .password(passwordEncoder.encode("dummyPassword"))
                        .phoneNumber("1234567890")
                        .address("123 Fake St")
                        .role(roleRepository.findByName("ROLE_USER").orElseThrow())
                        .build();
                userService.save(user);
            }
        });

        List<ProductCategory> categories = productCategoryRepository.findAll();
        int productSize = productRepository.findAll().size();

        List<User> users = userRepository.findAll();

        if (productSize == 0) {
            for (int i = 0; i < 50; i++) {
                List<ProductCategory> assignedCategories = getRandomCategories(categories);

                User randomOwner = users.get(ThreadLocalRandom.current().nextInt(users.size()));

                Product product = Product.builder()
                        .title("Product " + (i + 1))
                        .description("Description for product " + (i + 1))
                        .price(BigDecimal.valueOf(ThreadLocalRandom.current().nextInt(100, 1100)))
                        .rate(BigDecimal.valueOf(ThreadLocalRandom.current().nextInt(10, 60)))
                        .interval(randomEnum())
                        .productCategory(assignedCategories)
                        .isDraft(false)
                        .owner(randomOwner)
                        .build();
                productService.save(product);
            }
        }
    }

    private List<ProductCategory> getRandomCategories(List<ProductCategory> categories) {
        int categoryCount = ThreadLocalRandom.current().nextInt(1, 4);
        return categories.stream()
                .skip(ThreadLocalRandom.current().nextInt(categories.size()))
                .limit(categoryCount)
                .collect(Collectors.toList());
    }

    private RateInterval randomEnum() {
        RateInterval[] enumConstants = RateInterval.class.getEnumConstants();
        return enumConstants[ThreadLocalRandom.current().nextInt(enumConstants.length)];
    }

}
