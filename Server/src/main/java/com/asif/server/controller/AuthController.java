package com.asif.server.controller;

import com.asif.server.dto.auth.AuthPayload;
import com.asif.server.dto.auth.LoginInput;
import com.asif.server.dto.auth.SignUpInput;
import com.asif.server.dto.auth.UserDTO;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

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
}
