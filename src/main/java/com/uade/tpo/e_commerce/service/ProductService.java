package com.uade.tpo.e_commerce.service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.e_commerce.exception.CategoryNotFoundException;
import com.uade.tpo.e_commerce.exception.ProductNotFoundException;
import com.uade.tpo.e_commerce.model.Product;
import com.uade.tpo.e_commerce.model.Category;
import com.uade.tpo.e_commerce.model.dto.ProductCreateDTO;
import com.uade.tpo.e_commerce.model.dto.ProductDTO;
import com.uade.tpo.e_commerce.repository.CategoryRepository;
import com.uade.tpo.e_commerce.repository.ProductRepository;

@Service
@Transactional
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Lista todos los productos como DTOs.
    public List<ProductDTO> getProducts() {
        List<Product> entityList = productRepository.findAll();
        List<ProductDTO> dtoList = new ArrayList<>();

        for (Product entity : entityList) {
            dtoList.add(entityToDto(entity));
        }

        return dtoList;
    }

    // Obtiene un producto por id o lanza ProductNotFoundException.
    public ProductDTO getProductById(Long id) throws ProductNotFoundException {
        Product entity = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        return entityToDto(entity);
    }

    // Crea un producto desde el DTO de alta y devuelve el resultado como DTO.
    public ProductDTO createProduct(ProductCreateDTO dto) {
        Product entity = productRepository.save(dtoCreateToEntity(dto));
        return entityToDto(entity);
    }

    // Actualiza datos del producto indicado por id; falla si no existe.
    public ProductDTO updateProduct(ProductDTO dto, Long id) {
        productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        dto.setId(id);
        productRepository.save(dtoToEntity(dto));
        return dto;
    }

    // Elimina el producto por id y devuelve el DTO de lo borrado; falla si no existe.
    public ProductDTO deleteProduct(Long id) {
        Product deleted = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        productRepository.delete(deleted);
        return entityToDto(deleted); 
    }

    // Mapea entidad Product a ProductDTO para la API.
    private ProductDTO entityToDto(Product entity) {
        return ProductDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .stock(entity.getStock())
                .categories(CategoryEntityToIds(entity.getCategories()))
                .build();
    }

    // Mapea ProductDTO (con id) a entidad para persistir actualizaciones.
    private Product dtoToEntity(ProductDTO dto) {
        return Product.builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .categories(CategoryIdsToEntity(dto.getCategories()))
                .build();
    }

    // Mapea DTO de creación a entidad nueva (sin id asignado por el cliente).
    private Product dtoCreateToEntity(ProductCreateDTO dto) {
        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .categories(CategoryIdsToEntity(dto.getCategories()))
                .build();
    }

    private List<Long> CategoryEntityToIds(List<Category> entity) {
        return entity.stream()
                .map(Category::getId)
                .collect(Collectors.toList());
    }

    private List<Category> CategoryIdsToEntity(List<Long> ids) {
        return ids.stream()
                .map(id -> categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id)))
                .collect(Collectors.toList());
    }

}
