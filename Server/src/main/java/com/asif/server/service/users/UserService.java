package com.asif.server.service.users;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.auth.AuthPayload;
import com.asif.server.dto.auth.UserDTO;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.entity.auth.Role;
import com.asif.server.entity.auth.User;
import com.asif.server.persistence.jpa.UserRepository;
import com.asif.server.service.jwt.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Optional;

@Service
public class UserService extends BaseService<User> {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final JwtService jwt;
    private final BCryptPasswordEncoder encoder;

    public UserService(
            BaseRepository<User> baseRepository,
            UserRepository userRepository,
            RoleService roleService,
            JwtService jwt, BCryptPasswordEncoder encoder
    ) {
        super(baseRepository);
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.jwt = jwt;
        this.encoder = encoder;
    }

    public Mono<GenericResponse<UserDTO>> signUp(String username, String email, String rawPassword) {
        return Mono.fromCallable(() -> {
            if (userRepository.existsByUsername(username)) {
                return Optional.of(GenericResponse.<UserDTO>builder()
                        .message("Username is already taken")
                        .build()
                );
            }
            if (userRepository.existsByEmail(email)) {
                return Optional.of(GenericResponse.<UserDTO>builder()
                        .message("Email is already taken")
                        .build()
                );
            }
            return Optional.<GenericResponse<UserDTO>>empty();
        })
        .subscribeOn(Schedulers.boundedElastic())
        .flatMap(opt -> opt
        .map(Mono::just)
            .orElseGet(() -> {
                User user = User.builder()
                        .username(username)
                        .email(email)
                        .password(encoder.encode(rawPassword))
                        .flag(true)
                        .build();

                return roleService.getRoleByName("USER")
                        .map(GenericResponse::getData)
                        .map(role -> {
                            user.setRole(role);
                            return user;
                        })
                        .flatMap(u -> Mono.fromCallable(() -> super.save(u))
                                .subscribeOn(Schedulers.boundedElastic()))
                        .map(saved -> GenericResponse.<UserDTO>builder()
                                .message("User created successfully")
                                .data(toDto(saved))
                                .build());
            })
        );
    }

    public Mono<GenericResponse<AuthPayload>> login(String username, String rawPassword) {
        return Mono.fromCallable(() -> {
                    Optional<User> user = userRepository.findByUsername(username);
                    if (user.isEmpty()) {
                        return GenericResponse.<AuthPayload>builder()
                                .message("Account does not exist")
                                .build();
                    }
                    User userEntity = user.get();
                    if (!encoder.matches(rawPassword, userEntity.getPassword())) {
                        return GenericResponse.<AuthPayload>builder()
                                .message("Incorrect password")
                                .data(null)
                                .build();
                    }

                    Role role = userEntity.getRole();
                    String token = jwt.createToken(userEntity.getId(), role);
                    UserDTO dto = toDto(userEntity);
                    return GenericResponse.<AuthPayload>builder()
                            .message("Successfully Logged in")
                            .data(
                                    AuthPayload.builder()
                                            .user(dto)
                                            .accessToken(token)
                                            .expiresInSeconds(3600L)
                                            .build()
                            )
                            .build();
                }).subscribeOn(Schedulers.boundedElastic());
    }

    public static UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
