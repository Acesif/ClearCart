package com.asif.server.service.users;

import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.entity.auth.Role;
import com.asif.server.persistence.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Mono<GenericResponse<Role>> addRole(Role role) {
        return Mono.fromCallable(() -> {
            Optional<Role> returnedRole = roleRepository.findByName(role.getName());
            if (returnedRole.isPresent()) {
                return GenericResponse.<Role>builder()
                        .message("Role already exists")
                        .data(returnedRole.get())
                        .build();
            }
            Role savedRole = roleRepository.save(role);
            return GenericResponse.<Role>builder()
                    .message("Role created")
                    .data(savedRole)
                    .build();
        }).subscribeOn(Schedulers.boundedElastic());
    }

    public GenericResponse<List<Role>> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return GenericResponse.<List<Role>>builder()
                .message("All roles returned")
                .data(roles)
                .build();
    }

    public Mono<GenericResponse<Role>> getRoleByName(String name) {
        return Mono.fromCallable(() -> {
            Optional<Role> role = roleRepository.findByName(name);
            if (role.isPresent()) {
                return GenericResponse.<Role>builder()
                        .message("Role found")
                        .data(role.get())
                        .build();
            }
            return GenericResponse.<Role>builder()
                    .message("Role not found")
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }
}
