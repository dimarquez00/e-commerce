package com.uade.tpo.e_commerce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.e_commerce.exception.UserNotFoundException;
import com.uade.tpo.e_commerce.model.Address;
import com.uade.tpo.e_commerce.model.User;
import com.uade.tpo.e_commerce.model.dto.AddressCreateDTO;
import com.uade.tpo.e_commerce.model.dto.AddressDTO;
import com.uade.tpo.e_commerce.model.dto.UserCreateDTO;
import com.uade.tpo.e_commerce.model.dto.UserDTO;
import com.uade.tpo.e_commerce.repository.UserRepository;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    // Lista todos los usuarios como DTOs (incluye dirección anidada).
    public List<UserDTO> getUsers() {
        List<User> entityList = userRepository.findAll();
        List<UserDTO> dtoList = new ArrayList<>();

        for (User entity : entityList) {
            dtoList.add(entityToDto(entity));
        }

        return dtoList;
    }

    // Obtiene un usuario por id o lanza UserNotFoundException.
    public UserDTO getUserById(Long id) {
        User entity = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return entityToDto(entity);
    }

    // Crea un usuario desde el DTO de alta (con dirección) y devuelve UserDTO.
    public UserDTO createUser(UserCreateDTO dto) {
        User entity = userRepository.save(dtoCreateToEntity(dto));
        return entityToDto(entity);
    }

    // Actualiza usuario y mantiene el id de la dirección existente; falla si no existe el usuario.
    public UserDTO updateUser(UserDTO dto, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        dto.setId(id);

        AddressDTO addressDTO = dto.getAddress();
        addressDTO.setId(user.getAddress().getId());
        dto.setAddress(addressDTO);

        userRepository.save(dtoToEntity(dto));
        return dto;
    }

    // Elimina el usuario por id y devuelve el DTO de lo borrado; falla si no existe.
    public UserDTO deleteUser(Long id) {
        User deleted = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        userRepository.delete(deleted);
        return entityToDto(deleted); 
    }

    // Mapea entidad User a UserDTO (incluye dirección).
    private UserDTO entityToDto(User entity) {
        return UserDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .dateOB(entity.getDateOB())
                .email(entity.getEmail())
                .address(adressEntityToDto(entity.getAddress()))
                .build();
    }

    // Mapea UserDTO a entidad para persistir (dirección con id para actualización).
    private User dtoToEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .dateOB(dto.getDateOB())
                .email(dto.getEmail())
                .address(adressDtoToEntity(dto.getAddress()))
                .build();
    }

    // Mapea DTO de creación a entidad nueva (dirección sin id previo del cliente).
    private User dtoCreateToEntity(UserCreateDTO dto) {
        return User.builder()
                .name(dto.getName())
                .dateOB(dto.getDateOB())
                .email(dto.getEmail())
                .address(adressDtoCreateToEntity(dto.getAddress()))
                .build();
    }

    // Mapea Address persistida a AddressDTO.
    private AddressDTO adressEntityToDto (Address entity) {
        return AddressDTO.builder()
                .id(entity.getId())
                .street(entity.getStreet())
                .city(entity.getCity())
                .province(entity.getProvince())
                .postalCode(entity.getPostalCode())
                .build();
    }

    // Mapea AddressDTO a entidad Address (incluye id para actualizar la misma fila).
    private Address adressDtoToEntity (AddressDTO dto) {
        return Address.builder()
                .id(dto.getId())
                .street(dto.getStreet())
                .city(dto.getCity())
                .province(dto.getProvince())
                .postalCode(dto.getPostalCode())
                .build();
    }

    // Mapea DTO de alta de dirección a entidad nueva para un usuario recién creado.
    private Address adressDtoCreateToEntity (AddressCreateDTO dto) {
        return Address.builder()
                .street(dto.getStreet())
                .city(dto.getCity())
                .province(dto.getProvince())
                .postalCode(dto.getPostalCode())
                .build();
    }

}
