package com.asif.server.service.product;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.auth.UserInformation;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.entity.product.Product;
import com.asif.server.entity.product.ProductCategory;
import com.asif.server.persistence.ProductCategoryRepository;
import com.asif.server.persistence.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.asif.server.utils.ExtractAuth.extractUserInformation;

@Service
public class ProductService extends BaseService<Product> {

    private final UserRepository userRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(BaseRepository<Product> baseRepository, UserRepository userRepository, ProductCategoryRepository productCategoryRepository) {
        super(baseRepository);
        this.userRepository = userRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    public Mono<GenericResponse<ProductDTO>> createProduct(ProductDTO product, Authentication authentication) {
        return Mono.fromCallable(() -> {

            UserInformation userInformation = extractUserInformation(authentication);

            List<ProductCategory> categories = productCategoryRepository.findAllByCategoryIds(product.productCategoryIds());

            Product toSave = Product.builder()
                    .flag(true)
                    .title(product.title())
                    .price(product.price())
                    .description(product.description())
                    .productCategory(categories)
                    .owner(userRepository.getUserById(userInformation.userId()))
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

    public Mono<GenericResponse<ProductDTO>> updateProduct(ProductDTO product, Authentication authentication) {
        return Mono.fromCallable(() -> {
                Product toUpdate = super.findById(product.id());

                toUpdate.setTitle(product.title());
                toUpdate.setPrice(product.price());
                toUpdate.setDescription(product.description());
                toUpdate.setProductCategory(
                        productCategoryRepository
                                .findAllByCategoryIds(
                                        product.productCategoryIds()
                                )
                );
                toUpdate.setOwner(toUpdate.getOwner());
                toUpdate.setRate(product.rate());
                toUpdate.setInterval(product.interval());

                Product updated = super.update(toUpdate);
                ProductDTO response = toDTO(updated);

                return GenericResponse.<ProductDTO>builder()
                        .message("Product updated")
                        .data(response)
                        .build();

            }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<Void>> deleteProduct(String id) {
        return Mono.fromCallable(() -> {
                Product deletedProduct = delete(id);
                if (deletedProduct.getFlag()) {
                    return GenericResponse.<Void>builder()
                            .message("Failed to delete product")
                            .data(null)
                            .build();
                }

                return GenericResponse.<Void>builder()
                        .message("Product deleted")
                        .data(null)
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
                .rate(product.getRate())
                .interval(product.getInterval())
                .build();
    }

}
