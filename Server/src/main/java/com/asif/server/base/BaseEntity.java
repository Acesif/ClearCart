package com.asif.server.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseEntity implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    protected String id;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Dhaka")
    @Column(nullable = false)
    @CreationTimestamp
    protected Date createDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Dhaka")
    @UpdateTimestamp
    protected Date updateDate;

    @Column(nullable = false, columnDefinition = "boolean default true")
    protected Boolean flag;
}
