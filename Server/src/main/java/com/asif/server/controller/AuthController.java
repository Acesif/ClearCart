package com.asif.server.controller;

import com.asif.server.dto.auth.AuthPayload;
import com.asif.server.dto.auth.LoginInput;
import com.asif.server.dto.auth.SignUpInput;
import com.asif.server.dto.auth.UserDTO;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.entity.auth.User;
import com.asif.server.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class AuthController {
    private final UserService users;

    @MutationMapping
    public Mono<GenericResponse<UserDTO>> signUp(@Argument SignUpInput signupInput) {
        return users.signUp(
                        signupInput.username(),
                        signupInput.email(),
                        signupInput.password()
        );
    }

    @MutationMapping
    public Mono<GenericResponse<AuthPayload>> login(@Argument LoginInput loginInput) {
        return users.login(
                loginInput.username(),
                loginInput.password()
        );
    }

    @QueryMapping
    public Mono<GenericResponse<UserDTO>> user(@Argument String id) {
        return Mono.fromCallable(() -> {
            User user = users.findById(id);
            if (user == null) {
                return GenericResponse.<UserDTO>builder()
                        .message("User not found")
                        .data(null)
                        .build();
            }
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .build();

            return GenericResponse.<UserDTO>builder()
                    .message("User found")
                    .data(userDTO)
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }
}
