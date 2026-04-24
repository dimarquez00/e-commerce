package com.uade.tpo.e_commerce.exception;

public class EmailInUseException extends  RuntimeException{
    public EmailInUseException(String email) {
        super("El email (" + email + ") ya está en uso.");
    }
    // public EmailInUseException(String message) {
    //     super(message);
    // }

}
