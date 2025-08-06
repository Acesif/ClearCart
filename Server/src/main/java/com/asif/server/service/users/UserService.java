package com.asif.server.service.users;

import com.asif.server.base.BaseRepository;
import com.asif.server.base.BaseService;
import com.asif.server.dto.auth.*;
import com.asif.server.dto.commons.GenericResponse;
import com.asif.server.entity.auth.Role;
import com.asif.server.entity.auth.User;
import com.asif.server.persistence.UserRepository;
import com.asif.server.service.jwt.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Optional;

import static com.asif.server.utils.ExtractAuth.extractUserInformation;

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

    public Mono<GenericResponse<UserDTO>> signUp(SignUpInput signUpInput) {
        return Mono.fromCallable(() -> {
            if (userRepository.existsByEmail(signUpInput.email())) {
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
                        .firstName(signUpInput.firstName())
                        .lastName(signUpInput.lastName())
                        .phoneNumber(signUpInput.phoneNumber())
                        .address(signUpInput.address())
                        .email(signUpInput.email())
                        .password(encoder.encode(signUpInput.password()))
                        .build();

                return roleService.getRoleByName("ROLE_USER")
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

    public Mono<GenericResponse<AuthPayload>> login(LoginInput loginInput) {
        return Mono.fromCallable(() -> {
                    Optional<User> user = userRepository.findByEmail(loginInput.email());
                    if (user.isEmpty()) {
                        return GenericResponse.<AuthPayload>builder()
                                .message("Account does not exist")
                                .build();
                    }
                    User userEntity = user.get();
                    if (!encoder.matches(loginInput.password(), userEntity.getPassword())) {
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

    private UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .email(user.getEmail())
                .build();
    }

    public Mono<GenericResponse<UserDTO>> getMyInfo(Authentication authentication) {
        return Mono.fromCallable(() -> {

            UserInformation userInformation = extractUserInformation(authentication);
            User user = findById(userInformation.userId());
            if (user == null) {
                return GenericResponse.<UserDTO>builder()
                        .message("User not found")
                        .data(null)
                        .build();
            }
            UserDTO userDTO = toDto(user);

            return GenericResponse.<UserDTO>builder()
                    .message("User found")
                    .data(userDTO)
                    .build();

        }).subscribeOn(Schedulers.boundedElastic());
    }
}
