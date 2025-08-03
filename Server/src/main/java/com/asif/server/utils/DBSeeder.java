package com.asif.server.utils;

import com.asif.server.entity.Role;
import com.asif.server.persistence.jpa.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DBSeeder {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void setUpRoles() {
        List<Role> roles = roleRepository.findAll();
        if (roles.isEmpty()) {
            List<Role> roleList = new ArrayList<>();
            Role admin = Role.builder()
                    .flag(true)
                    .name("ADMIN")
                    .build();
            roleList.add(admin);

            Role user = Role.builder()
                    .flag(true)
                    .name("USER")
                    .build();
            roleList.add(user);

            roleRepository.saveAll(roleList);
        }
    }
}
