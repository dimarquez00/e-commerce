package com.uade.tpo.e_commerce.service;

import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.e_commerce.model.Address;
import com.uade.tpo.e_commerce.model.Role;
import com.uade.tpo.e_commerce.model.User;
import com.uade.tpo.e_commerce.model.dto.AddressCreateDTO;
import com.uade.tpo.e_commerce.model.dto.AuthenticationLogInRequestDTO;
import com.uade.tpo.e_commerce.model.dto.AuthenticationRegisterRequestDTO;
import com.uade.tpo.e_commerce.model.dto.AuthenticationResponse;
import com.uade.tpo.e_commerce.repository.UserRepository;
import com.uade.tpo.e_commerce.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {
     
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // Registra un usuario nuevo (valida email único), persiste con contraseña hasheada y devuelve JWT.
    public AuthenticationResponse register (AuthenticationRegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El email ya esta en uso.");
        }

        User entity = User.builder()
                .name(dto.getName())
                .dateOB(dto.getDateOB())
                .email(dto.getEmail())
                .address(adressDtoCreateToEntity(dto.getAddress()))
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(entity);
        
        String jwtToken = jwtUtil.generateToken(entity.getEmail(), Set.of(entity.getRole().name()));
        return AuthenticationResponse.builder().accesToken(jwtToken).build();
    }

    // Valida credenciales con Spring Security y devuelve un JWT si el login es correcto.
    public AuthenticationResponse authenticate(AuthenticationLogInRequestDTO dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        User entity = userRepository.findByEmail(dto.getEmail()).orElseThrow();
        
        // Set<String> roles = user.getAuthorities().stream()
        //                         .map(grantedAuthority -> grantedAuthority.getAuthority())
        //                         .collect(Collectors.toSet());
        
        String jwtToken = jwtUtil.generateToken(entity.getEmail(), Set.of(entity.getRole().name()));
        return AuthenticationResponse.builder().accesToken(jwtToken).build();
    }

    // Convierte el DTO de dirección del registro en entidad Address para persistirla con el usuario.
    private Address adressDtoCreateToEntity (AddressCreateDTO dto) {
        return Address.builder()
                .street(dto.getStreet())
                .city(dto.getCity())
                .province(dto.getProvince())
                .postalCode(dto.getPostalCode())
                .build();
    }

}
