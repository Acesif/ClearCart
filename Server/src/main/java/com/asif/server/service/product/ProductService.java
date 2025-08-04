package com.asif.server.service.product;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.entity.product.Product;
import com.asif.server.entity.product.ProductCategory;
import com.asif.server.persistence.ProductCategoryRepository;
import com.asif.server.persistence.ProductRepository;
import com.asif.server.persistence.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService extends BaseService<Product> {

    private final UserRepository userRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(BaseRepository<Product> baseRepository, UserRepository userRepository, ProductCategoryRepository productCategoryRepository) {
        super(baseRepository);
        this.userRepository = userRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    public Mono<GenericResponse<ProductDTO>> createProduct(ProductDTO product) {
        return Mono.fromCallable(() -> {

            Product toSave = Product.builder()
                    .flag(true)
                    .title(product.title())
                    .price(product.price())
                    .description(product.description())
                    .productCategory(productCategoryRepository.findAllById(product.productCategoryIds()))
                    .owner(userRepository.getUserById(product.ownerId()))
                    .rate(product.rate())
                    .interval(product.interval())
                    .build();
            Product savedProduct = super.save(toSave);

            ProductDTO response = toDTO(savedProduct);

            return GenericResponse.<ProductDTO>builder()
                    .message("Product created")
                    .data(response)
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<ProductDTO>> deleteProduct(String id) {
        return Mono.fromCallable(() -> {
                Product deletedProduct = delete(id);
                if (deletedProduct.getFlag()) {
                    return GenericResponse.<ProductDTO>builder()
                            .message("Failed to delete product")
                            .data(null)
                            .build();
                }

                ProductDTO productDTO = toDTO(deletedProduct);

                return GenericResponse.<ProductDTO>builder()
                        .message("Product deleted")
                        .data(productDTO)
                        .build();
            }).subscribeOn(Schedulers.boundedElastic());
    }

    private ProductDTO toDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .productCategoryIds(product.getProductCategory() != null
                        ? product.getProductCategory().stream()
                        .map(ProductCategory::getId)
                        .collect(Collectors.toSet())
                        : Set.of())
                .ownerId(product.getOwner() != null ? product.getOwner().getId() : null)
                .rate(product.getRate())
                .interval(product.getInterval())
                .build();
    }

}
