package com.uade.tpo.e_commerce.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.uade.tpo.e_commerce.model.User;

// Extiende JpaRepository para manejar usuarios
public interface UserRepository extends JpaRepository<User, Long>{

    // Busca usuario por su mail
    Optional<User> findByEmail(String email);

    // Verifica si existe el usuario con ese mismo mail
    Boolean existsByEmail(String email);


}