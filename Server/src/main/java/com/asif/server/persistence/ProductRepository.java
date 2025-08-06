package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends BaseRepository<Product> {

    @Query("""
        SELECT p
        FROM Product p
        JOIN p.productCategory c
        WHERE c.categoryId = :productCategory
    """)
    Page<Product> findAllByProductCategory(@Param("productCategory") String productCategory, Pageable pageable);

}
