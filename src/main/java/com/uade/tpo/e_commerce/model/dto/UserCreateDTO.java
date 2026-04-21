package com.uade.tpo.e_commerce.model.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserCreateDTO {
    
    private String name;
    
    private LocalDate dateOB;
    
    private String email;

    private AddressCreateDTO address;

}
