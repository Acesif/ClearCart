package com.asif.server.service.product;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.auth.UserInformation;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.dto.product.ProductDTO;
import com.asif.server.entity.product.Product;
import com.asif.server.entity.product.ProductCategory;
import com.asif.server.persistence.ProductCategoryRepository;
import com.asif.server.persistence.ProductRepository;
import com.asif.server.persistence.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.stream.Collectors;

import static com.asif.server.utils.ExtractAuth.extractUserInformation;

@Service
public class ProductService extends BaseService<Product> {

    private final UserRepository userRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;

    public ProductService(BaseRepository<Product> baseRepository, UserRepository userRepository, ProductCategoryRepository productCategoryRepository, ProductRepository productRepository) {
        super(baseRepository);
        this.userRepository = userRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.productRepository = productRepository;
    }

    public Mono<GenericResponse<ProductDTO>> createProduct(ProductDTO product, Authentication authentication) {
        return Mono.fromCallable(() -> {

            UserInformation userInformation = extractUserInformation(authentication);

            List<ProductCategory> categories = productCategoryRepository.findAllByCategoryIds(product.productCategoryIds());

            Product toSave = Product.builder()
                    .title(product.title())
                    .price(product.price())
                    .description(product.description())
                    .productCategory(categories)
                    .owner(userRepository.getUserById(userInformation.userId()))
                    .rate(product.rate())
                    .interval(product.interval())
                    .flag(false)
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
            UserInformation userInformation = extractUserInformation(authentication);

            if (userInformation.userId().equals(toUpdate.getOwner().getId()) && toUpdate.getFlag()) {

                List<ProductCategory> categories = productCategoryRepository.findAllByCategoryIds(product.productCategoryIds());

                toUpdate.setTitle(product.title());
                toUpdate.setPrice(product.price());
                toUpdate.setDescription(product.description());
                toUpdate.setProductCategory(categories);
                toUpdate.setOwner(toUpdate.getOwner());
                toUpdate.setRate(product.rate());
                toUpdate.setInterval(product.interval());
                toUpdate.setIsDraft(product.isDraft());

                Product updated = super.update(toUpdate);
                ProductDTO response = toDTO(updated);

                return GenericResponse.<ProductDTO>builder()
                        .message("Product updated")
                        .data(response)
                        .build();
            }
            return GenericResponse.<ProductDTO>builder()
                    .message("Not authorized to update this product")
                    .data(product)
                    .build();

            }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<GenericResponse<Void>> deleteProduct(String id, Authentication authentication) {
        return Mono.fromCallable(() -> {

            Product toDelete = super.findById(id);

            UserInformation userInformation = extractUserInformation(authentication);
            if (userInformation.userId().equals(toDelete.getOwner().getId())) {
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
            }
            return GenericResponse.<Void>builder()
                    .message("Not authorized to delete product")
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<Page<ProductDTO>> getAllProducts(int page, int limit, Sort.Direction direction) {
        return Mono.fromCallable(() -> {
                Page<Product> productPage = super.findAll(page, limit, direction);
            return getProductDTOS(productPage);
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<Page<ProductDTO>> getAllProductsByCategory(int page, int limit, Sort.Direction direction, String category) {
        return Mono.fromCallable(() -> {
            Page<Product> productPage = productRepository.findAllByProductCategory(
                    category,
                    PageRequest.of(page, limit, Sort.by(direction, "createDate"))
            );
            return getProductDTOS(productPage);
        }).subscribeOn(Schedulers.boundedElastic());
    }

    private Page<ProductDTO> getProductDTOS(Page<Product> productPage) {
        List<ProductDTO> products = productPage.getContent().stream()
                .map(product -> {
                    List<String> categoryNames = product.getProductCategory()
                            .stream()
                            .map(ProductCategory::getName)
                            .toList();

                    return ProductDTO.builder()
                            .id(product.getId())
                            .title(product.getTitle())
                            .description(product.getDescription())
                            .price(product.getPrice())
                            .productCategoryIds(categoryNames)
                            .rate(product.getRate())
                            .interval(product.getInterval())
                            .isDraft(product.getIsDraft())
                            .build();
                })
                .filter(p -> !p.isDraft())
                .toList();
        return new PageImpl<>(products, productPage.getPageable(), productPage.getTotalElements());
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
                        .collect(Collectors.toList())
                        : List.of())
                .rate(product.getRate())
                .interval(product.getInterval())
                .build();
    }

}
