package com.uade.tpo.e_commerce.exception;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(Long id) {
        super("No se encontró el pedido con id: " + id);
    }
    public OrderNotFoundException(String message) {
        super(message);
    }
}
