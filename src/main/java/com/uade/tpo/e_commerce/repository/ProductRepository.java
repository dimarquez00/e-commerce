package com.uade.tpo.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uade.tpo.e_commerce.model.Product;

// Extiende JpaRepository para acceder a la base de datos
public interface ProductRepository extends JpaRepository<Product, Long> { // Proporciona metodos CRUD automaticamente

}