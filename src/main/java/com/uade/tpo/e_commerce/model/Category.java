package com.uade.tpo.e_commerce.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "categories")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // @ManyToMany(fetch = FetchType.LAZY)
    // @JoinTable(
    //     name = "category_products",
    //     joinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"),
    //     inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id")
    // )
    // @Default
    // private List<Product> products = new ArrayList<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    @Default
    private List<Product> products = new ArrayList<>();

}
