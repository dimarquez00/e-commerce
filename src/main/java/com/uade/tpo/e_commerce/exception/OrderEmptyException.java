package com.uade.tpo.e_commerce.exception;


public class OrderEmptyException extends RuntimeException{
    public OrderEmptyException(Long id) {
        super("El pedido (" + id + ") está vacio.");
    }
    public OrderEmptyException(String message) {
        super(message);
    }

}
