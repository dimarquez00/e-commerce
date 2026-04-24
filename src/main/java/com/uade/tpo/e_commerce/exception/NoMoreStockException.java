package com.uade.tpo.e_commerce.exception;

public class NoMoreStockException extends RuntimeException {
    public NoMoreStockException(Long id) {
        super("El producto (" + id + ") no tiene stock.");
    }
    public NoMoreStockException(String message) {
        super(message);
    }
}
