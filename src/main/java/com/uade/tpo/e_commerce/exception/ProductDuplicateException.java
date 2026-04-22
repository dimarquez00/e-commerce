package com.uade.tpo.e_commerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Producto ya existe.")
public class ProductDuplicateException extends Exception{
    
}
