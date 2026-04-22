package com.uade.tpo.e_commerce.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.model.dto.OrderDTO;
import com.uade.tpo.e_commerce.model.dto.OrderResponseDTO;

@Service
public class OrderService {
    
    public List<OrderResponseDTO> getOrders() {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'getOrders'");
    }

    public OrderResponseDTO getOrderById(Long id) {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'getOrderById'");
    }

    public OrderResponseDTO createOrder(OrderDTO orderDto) {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'createOrder'");
    }

    public OrderResponseDTO addProduct(Long id, Long productId) {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'addProduct'");
    }

    public OrderResponseDTO removeProduct(Long id, Long productId) {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'removeProduct'");
    }

    public OrderResponseDTO deleteOrder(Long id) {
        // TODO: Implement
        throw new UnsupportedOperationException("Unimplemented method 'deleteOrder'");
    }
}
