package com.uade.tpo.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.e_commerce.model.Order;

// Extiende JpaRepository para acceder a la base de datos
public interface OrderRepository extends JpaRepository<Order, Long> { // Proporciona metodos CRUD automaticamente

    // Busca solamente las ordenes que pertenecen al usuario logueado
    List<Order> findByUserEmail(String email);

}