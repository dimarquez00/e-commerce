package com.uade.tpo.e_commerce.exception;

public class OrderConfirmedException extends RuntimeException {
    public OrderConfirmedException(Long id) {
        super("El pedido (" + id + ") está confirmado, ya no se puede moficar.");
    }
    public OrderConfirmedException(String message) {
        super(message);
    }
}
