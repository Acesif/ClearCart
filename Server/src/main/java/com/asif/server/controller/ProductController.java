package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @MutationMapping
    public Mono<GenericResponse<ProductDTO>> addProduct(
            @Argument ProductDTO product,
            Principal principal
    ) {
        String userId =  principal.getName();
        System.out.println(userId);
        return productService.createProduct(product);
    }

    @MutationMapping
    public Mono<GenericResponse<ProductDTO>> deleteProduct(@Argument String id) {
       return productService.deleteProduct(id);
    }
}
