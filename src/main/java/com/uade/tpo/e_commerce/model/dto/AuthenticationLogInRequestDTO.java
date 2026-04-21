package com.uade.tpo.e_commerce.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationLogInRequestDTO {
    private String email;
    private String password;

}
