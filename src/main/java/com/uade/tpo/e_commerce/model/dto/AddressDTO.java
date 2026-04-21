package com.uade.tpo.e_commerce.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AddressDTO {
    
    private Long id;

    private String street;

    private String city;

    private String province;

    private String postalCode;

}
