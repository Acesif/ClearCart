package com.asif.server.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record SignUpInput(
        @NotNull(message = "First name is required") String firstName,
        @NotNull(message = "Last name is required") String lastName,
        @NotNull(message = "Address is required") String address,
        @Pattern(regexp = "^\\+8801[3-9]\\d{8}$|^01[3-9]\\d{8}$", message = "Invalid phone number") String phoneNumber,
        @Email(message = "Invalid email address") String email,
        @NotNull(message = "Password is required") String password) {
}
