package com.asif.server.persistence;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.auth.User;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends BaseRepository<User> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    User getUserById(String id);
}
