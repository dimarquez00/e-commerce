package com.uade.tpo.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uade.tpo.e_commerce.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}