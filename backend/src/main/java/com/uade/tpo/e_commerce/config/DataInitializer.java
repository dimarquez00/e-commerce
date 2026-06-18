package com.uade.tpo.e_commerce.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.uade.tpo.e_commerce.model.Address;
import com.uade.tpo.e_commerce.model.Role;
import com.uade.tpo.e_commerce.model.User;
import com.uade.tpo.e_commerce.repository.UserRepository;

// Esta clase se encarga de crear un usuario con rol de admin por defecto al iniciar la aplicación
@Configuration
public class DataInitializer {

    // Se ejecuta una sola vez al iniciar la aplicación
    @Bean
    public CommandLineRunner seedAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Si ya existe un usuario con ese email no hace nada
            if (userRepository.findByEmail("admin@admin.com").isPresent()) {
                return;
            }

            Address defaultAddress = Address.builder()
                    .street("Admin 123")
                    .city("Buenos Aires")
                    .province("Buenos Aires")
                    .postalCode("1000")
                    .build();

            User admin = User.builder()
                    .name("Admin")
                    .email("admin@admin.com")
                    .password(passwordEncoder.encode("admin"))
                    .role(Role.ADMIN)
                    .dateOB(LocalDate.of(2000, 1, 1))
                    .address(defaultAddress)
                    .build();

            userRepository.save(admin);
            System.out.println("Usuario admin creado: admin@admin.com / admin");
        };
    }
}
