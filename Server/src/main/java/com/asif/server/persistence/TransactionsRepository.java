package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.Transactions.ProductTransactions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionsRepository extends BaseRepository<ProductTransactions> {

    Boolean existsByProductIdAndFromOwnerId(String productId, String fromUserId);

    ProductTransactions findByProductId(String productId);

    @Query("SELECT t FROM ProductTransactions t WHERE t.toOwner.id = :toOwner AND t.transactionType = 'TRADE'")
    Page<ProductTransactions> findByBoughtItems(@Param("toOwner") String toOwner, Pageable pageable);

    @Query("SELECT t FROM ProductTransactions t WHERE t.fromOwner.id = :fromOwner AND t.transactionType = 'TRADE'")
    Page<ProductTransactions> findBySoldItems(@Param("fromOwner") String fromOwner, Pageable pageable);

    @Query("SELECT t FROM ProductTransactions t WHERE t.toOwner.id = :toOwner AND t.transactionType = 'LOAN'")
    Page<ProductTransactions> findByBorrowedItems(@Param("toOwner") String toOwner, Pageable pageable);

    @Query("SELECT t FROM ProductTransactions t WHERE t.fromOwner.id = :fromOwner AND t.transactionType = 'LOAN'")
    Page<ProductTransactions> findByLentItems(@Param("fromOwner") String fromOwner, Pageable pageable);

    List<ProductTransactions> findAllByProductId(String productId);
}
