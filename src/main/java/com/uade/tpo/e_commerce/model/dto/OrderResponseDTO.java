package com.uade.tpo.e_commerce.model.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderResponseDTO {
    
    private Long id;

    private LocalDate date;

    private Long userId;

	private List<Long> products;

    private Double total;

    private String state;

}
