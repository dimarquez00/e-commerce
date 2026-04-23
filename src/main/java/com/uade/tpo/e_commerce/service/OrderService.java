package com.uade.tpo.e_commerce.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.e_commerce.exception.OrderNotFoundException;
import com.uade.tpo.e_commerce.exception.ProductNotFoundException;
import com.uade.tpo.e_commerce.exception.UserNotFoundException;
import com.uade.tpo.e_commerce.model.Order;
import com.uade.tpo.e_commerce.model.Product;
import com.uade.tpo.e_commerce.model.User;
import com.uade.tpo.e_commerce.model.dto.OrderDTO;
import com.uade.tpo.e_commerce.model.dto.OrderResponseDTO;
import com.uade.tpo.e_commerce.repository.OrderRepository;
import com.uade.tpo.e_commerce.repository.ProductRepository;
import com.uade.tpo.e_commerce.repository.UserRepository;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Lista todos los pedidos como DTOs de respuesta (ids de productos y total).
    public List<OrderResponseDTO> getOrders() {
        List<Order> entityList = orderRepository.findAll();
        List<OrderResponseDTO> dtoList = new ArrayList<>();

        for (Order entity : entityList) {
            dtoList.add(entityToResponseDto(entity));
        }

        return dtoList;
    }

    // Obtiene un pedido por id o lanza OrderNotFoundException.
    public OrderResponseDTO getOrderById(Long id) {
        return entityToResponseDto(orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id)));
    }

    // Crea un pedido vacío para el usuario indicado (fecha hoy, total 0); valida usuario.
    public OrderResponseDTO createOrder(OrderDTO dto) {
        if (dto.getUserId()==null) {
            throw new UserNotFoundException("Id de usuario vacio");
            
        }

        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new UserNotFoundException(dto.getUserId()));

        Order order = new Order();
        order.setDate(LocalDate.now());
        order.setUser(user);
        order.setTotal(0.0);
        orderRepository.save(order);
        return entityToResponseDto(order);
    }

    // Agrega un producto al pedido y suma su precio al total.
    public OrderResponseDTO addProduct(Long orderId, Long productId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));

        order.getProducts().add(product);
        order.setTotal(order.getTotal() + product.getPrice());
        return entityToResponseDto(orderRepository.save(order));
    }

    // Quita un producto del pedido y resta su precio del total.
    public OrderResponseDTO removeProduct(Long orderId, Long productId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException(productId));

        order.getProducts().remove(product);
        order.setTotal(order.getTotal() - product.getPrice());
        return entityToResponseDto(orderRepository.save(order));
    }

    // Elimina el pedido por id y devuelve el DTO de lo borrado; falla si no existe.
    public OrderResponseDTO deleteOrder(Long id) {
        Order deleted = orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id));
        orderRepository.delete(deleted);
        return entityToResponseDto(deleted); 
    }

    // Mapea Order a OrderResponseDTO (ids de usuario y productos, total).
    private OrderResponseDTO entityToResponseDto(Order entity) {
        return OrderResponseDTO.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .userId(entity.getUser().getId())
                .products(entity.getProducts().stream().map(Product::getId).collect(Collectors.toList()))
                .total(entity.getTotal())
                .build();
    }

}
