package com.asif.server.entity.auth;

import com.asif.server.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    @Pattern(regexp = "^(\\+8801[3-9]\\d{8}|01[3-9]\\d{8})$", message = "Invalid phone number")
    private String phoneNumber;

    @Column(nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Role role;
}
