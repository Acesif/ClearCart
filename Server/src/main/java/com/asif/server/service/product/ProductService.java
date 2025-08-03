package com.asif.server.service.product;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.entity.product.Product;
import com.asif.server.persistence.jpa.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class ProductService extends BaseService<Product> {

    private final ProductRepository productRepository;

    public ProductService(BaseRepository<Product> baseRepository, ProductRepository productRepository) {
        super(baseRepository);
        this.productRepository = productRepository;
    }

    public Mono<GenericResponse<ProductDTO>> createProduct(ProductDTO product) {
        return Mono.fromCallable(() -> {
            Boolean exists = productRepository.existsBySkuCodeAndFlag(product.getSkuCode(), true);
            if (!exists) {
                Product toSave = Product.builder()
                        .name(product.getName())
                        .price(product.getPrice())
                        .flag(true)
                        .description(product.getDescription())
                        .quantity(product.getQuantity())
                        .skuCode(product.getSkuCode())
                        .build();
                Product savedProduct = super.save(toSave);

                ProductDTO response = ProductDTO.builder()
                        .skuCode(savedProduct.getSkuCode())
                        .name(savedProduct.getName())
                        .price(savedProduct.getPrice())
                        .description(savedProduct.getDescription())
                        .quantity(savedProduct.getQuantity())
                        .build();

                return GenericResponse.<ProductDTO>builder()
                        .message("Product created")
                        .data(response)
                        .build();
            }
            return GenericResponse.<ProductDTO>builder()
                    .data(null)
                    .message("Product already exists")
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }
}
