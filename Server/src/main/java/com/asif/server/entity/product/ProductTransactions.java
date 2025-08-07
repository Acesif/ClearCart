package com.asif.server.entity.product;

import com.asif.server.dto.product.TransactionType;
import com.asif.server.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "product_transactions")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductTransactions extends ProductBase {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_owner", referencedColumnName = "id")
    private User fromOwner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_owner", referencedColumnName = "id")
    private User toOwner;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;
}
