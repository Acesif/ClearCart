package com.asif.server.service.users;

import com.asif.server.dto.auth.AuthPayload;
import com.asif.server.dto.auth.UserDTO;
import com.asif.server.entity.Role;
import com.asif.server.entity.User;
import com.asif.server.persistence.jpa.RoleRepository;
import com.asif.server.persistence.jpa.UserRepository;
import com.asif.server.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwt;
    private final PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public Mono<User> signUp(String username, String email, String rawPassword) {
        return Mono.fromCallable(() -> {
            if (userRepository.existsByUsername(username)) {
                throw new IllegalArgumentException("username taken");
            }
            if (userRepository.existsByEmail(email)) {
                throw new IllegalArgumentException("email taken");
            }

            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(encoder.encode(rawPassword))
                    .flag(true)
                    .build();

            Optional<Role> role = roleRepository.findByName("USER");
            role.ifPresent(value -> user.setRoles(Set.of(value)));

            return userRepository.save(user);

        }).subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<AuthPayload> login(String username, String rawPassword) {
        return Mono.fromCallable(() ->
                        userRepository.findByUsername(username)
                        .filter(u -> encoder.matches(rawPassword, u.getPassword()))
                        .orElseThrow(() -> new IllegalArgumentException("invalid credentials"))
                ).subscribeOn(Schedulers.boundedElastic())
                .map(user -> {
                    Set<Role> roles = user.getRoles();
                    String token = jwt.createToken(user.getUsername(), roles);
                    UserDTO dto = UserDTO.builder()
                            .id(user.getId())
                            .username(user.getUsername())
                            .email(user.getEmail())
                            .roles(roles)
                            .build();
                    return AuthPayload.builder()
                            .user(dto)
                            .accessToken(token)
                            .expiresInSeconds(60L * 60L)
                            .build();
                });
    }

    public static UserDTO toDto(User user) {
        Set<Role> roles = user.getRoles();
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roles)
                .build();
    }
}
