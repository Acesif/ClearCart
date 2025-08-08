package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.Transactions.ProductTransactions;

public interface TransactionsRepository extends BaseRepository<ProductTransactions> {

    Boolean existsByProductIdAndFromOwnerId(String productId, String fromUserId);

    ProductTransactions findByProductId(String productId);
}
