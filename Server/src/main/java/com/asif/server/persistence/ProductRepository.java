package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends BaseRepository<Product> {
    @Query(
            value = """
                SELECT p.*
                FROM products p
                JOIN product_category pc ON p.id = pc.product_id
                JOIN category c ON c.id = pc.category_id
                WHERE c.category_code = :productCategory
            """,
            nativeQuery = true
    )
    Page<Product> findAllByProductCategory(
            @Param("productCategory") String productCategory,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p WHERE p.flag = true AND p.owner.id != :owner")
    Page<Product> findAllProducts(Pageable pageable, String owner);

    @Query("SELECT p FROM Product p where p.owner.id = :ownerId and p.flag = true")
    Page<Product> findAllByOwner(Pageable pageable, String ownerId);
}
