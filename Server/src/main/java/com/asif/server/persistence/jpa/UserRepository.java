package com.asif.server.persistence.jpa;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.User;

import java.util.Optional;

public interface UserRepository extends BaseRepository<User> {

    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
