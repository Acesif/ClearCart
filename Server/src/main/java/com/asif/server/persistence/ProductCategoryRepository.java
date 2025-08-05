package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.product.ProductCategory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductCategoryRepository extends BaseRepository<ProductCategory> {


    @Query("SELECT pc FROM ProductCategory pc WHERE pc.categoryId IN :categoryIds")
    List<ProductCategory> findAllByCategoryIds(@Param("categoryIds") Set<String> categoryIds);
}
