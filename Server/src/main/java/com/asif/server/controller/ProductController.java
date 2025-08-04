package com.asif.server.controller;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.entity.product.Product;
import com.asif.server.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

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
       return Mono.fromCallable(() -> {
           Product deletedProduct = productService.delete(id);
           if (deletedProduct.getFlag()) {
               return GenericResponse.<ProductDTO>builder()
                       .message("Failed to delete product")
                       .data(null)
                       .build();
           }

           ProductDTO productDTO = ProductDTO.builder()
                   .name(deletedProduct.getName())
                   .description(deletedProduct.getDescription())
                   .price(deletedProduct.getPrice())
                   .skuCode(deletedProduct.getSkuCode())
                   .quantity(deletedProduct.getQuantity())
                   .build();

           return GenericResponse.<ProductDTO>builder()
                   .message("Product deleted")
                   .data(productDTO)
                   .build();
       }).subscribeOn(Schedulers.boundedElastic());
    }
}
