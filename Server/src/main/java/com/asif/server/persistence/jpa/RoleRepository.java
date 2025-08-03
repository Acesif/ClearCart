package com.asif.server.persistence.jpa;

import com.asif.server.base.BaseRepository;
import com.asif.server.entity.auth.Role;

import java.util.Optional;

public interface RoleRepository extends BaseRepository<Role> {
    Optional<Role> findByName(String name);
}
