package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<ProductDTO>> addProduct(
            @Argument ProductDTO product,
            Authentication authentication
    ) {
        return productService.createProduct(product, authentication);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<Void>> deleteProduct(@Argument String id, Authentication authentication) {
       return productService.deleteProduct(id, authentication);
    }

    @MutationMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<GenericResponse<ProductDTO>> updateProduct(@Argument ProductDTO product, Authentication authentication) {
        return productService.updateProduct(product, authentication);
    }

    @QueryMapping
    public Mono<Page<ProductDTO>> getAllProducts(
            @Argument int page,
            @Argument int limit,
            @Argument(name = "sortDirection") Sort.Direction direction
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return productService.getAllProducts(page, limit, sortDir);
    }

    @QueryMapping
    public Mono<Page<ProductDTO>> getByCategory(
            @Argument int page,
            @Argument int limit,
            @Argument String categoryCode,
            @Argument(name = "sortDirection") Sort.Direction direction
    ) {
        Sort.Direction sortDir = direction != null ? direction : Sort.Direction.ASC;
        return productService.getAllProductsByCategory(page, limit, sortDir, categoryCode);
    }

    @QueryMapping
    public Mono<List<String>> getAllCategories() {
        return productService.getAllCategories();
    }

    @QueryMapping
    public Mono<GenericResponse<ProductDTO>> getProduct(@Argument String id) {
        return productService.getProductById(id);
    }
}
