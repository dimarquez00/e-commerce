package com.uade.tpo.e_commerce.model.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Builder.Default;

@Data
@Builder
@AllArgsConstructor
public class ProductCreateDTO {

    private String name;

    private String description;

    private Double price;

    private Integer stock;

    @Default
    private List<Long> categories = new ArrayList<>();

}
