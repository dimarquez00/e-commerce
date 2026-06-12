package com.uade.tpo.e_commerce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.e_commerce.exception.CategoryNotFoundException;
import com.uade.tpo.e_commerce.model.Category;
import com.uade.tpo.e_commerce.model.dto.CategoryCreateDTO;
import com.uade.tpo.e_commerce.model.dto.CategoryDTO;
import com.uade.tpo.e_commerce.repository.CategoryRepository;

@Service
@Transactional
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    // Lista todas las categorías persistidas como DTOs.
    public List<CategoryDTO> getCategories() {
        List<Category> entityList = categoryRepository.findAll();
        List<CategoryDTO> dtoList = new ArrayList<>();

        for (Category entity : entityList) {
            dtoList.add(entityToDto(entity));
        }

        return dtoList;
    }

    // Obtiene una categoría por id o lanza CategoryNotFoundException.
    public CategoryDTO getCategoryById(Long id) {
        return entityToDto(categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id)));

    }

    // Crea una categoría desde el DTO de alta y devuelve el resultado como DTO.
    public CategoryDTO createCategory(CategoryCreateDTO dto) {
        Category entity = categoryRepository.save(dtoCreateToEntity(dto));
        return entityToDto(entity);
    }

    // Actualiza nombre/datos de la categoría indicada por id; falla si no existe.
    public CategoryDTO updateCategory(CategoryDTO dto, Long id) {
        categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        dto.setId(id);
        categoryRepository.save(dtoToEntity(dto));
        return dto;
    }

    // Elimina la categoría por id y devuelve el DTO de lo borrado; falla si no existe.
    public CategoryDTO deleteCategory(Long id) {
        Category entity = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        categoryRepository.delete(entity);
        return entityToDto(entity);
    }

    // Mapea entidad Category a CategoryDTO para la API.
    private CategoryDTO entityToDto(Category entity) {
        return CategoryDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }

    // Mapea DTO de creación a entidad nueva (sin id asignado por el cliente).
    private Category dtoCreateToEntity(CategoryCreateDTO dto) {
        return Category.builder()
                .name(dto.getName())
                .build();
    }

    // Mapea CategoryDTO (con id) a entidad para persistir actualizaciones.
    private Category dtoToEntity(CategoryDTO dto) {
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .build();
    }
}
