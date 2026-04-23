package com.uade.tpo.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.e_commerce.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
