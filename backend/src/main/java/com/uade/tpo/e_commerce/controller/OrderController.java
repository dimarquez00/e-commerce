package com.uade.tpo.e_commerce.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.e_commerce.model.dto.OrderDTO;
import com.uade.tpo.e_commerce.model.dto.OrderResponseDTO;
import com.uade.tpo.e_commerce.service.OrderService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @GetMapping()
    public ResponseEntity<List<OrderResponseDTO>> getOrders() {
        return ResponseEntity.ok(orderService.getOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderDTO orderDto) {
        // Order result = orderService.createOrder(orderRequest.getUser(), orderRequest.getProducts(), orderRequest.getTotal());
        OrderResponseDTO result = orderService.createOrder(orderDto);
        return ResponseEntity.created(URI.create("/api/orders/" + result.getId())).body(result);
    }

    @PostMapping("/{id}/products/{productId}")
    public ResponseEntity<OrderResponseDTO> addProduct(@PathVariable Long id, @PathVariable Long productId) {
        return ResponseEntity.ok(orderService.addProduct(id, productId));
    }

    @DeleteMapping("/{id}/products/{productId}")
    public ResponseEntity<OrderResponseDTO> removeProduct(@PathVariable Long id, @PathVariable Long productId) {
        return ResponseEntity.ok(orderService.removeProduct(id, productId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> deleteOrder(@PathVariable Long id) {
        OrderResponseDTO result = orderService.deleteOrder(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> confirmOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.confirmOrder(id));
    }
    
}
