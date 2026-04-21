package com.uade.tpo.e_commerce.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="products")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer stock;

    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    @Builder.Default
    private List<Order> orders = new ArrayList<>();

    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    @Builder.Default
    private List<Order> caterogies = new ArrayList<>();
    
}
