package com.uade.tpo.e_commerce.exception;


public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("No se encontró la categoria con id: " + id);
    }
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
