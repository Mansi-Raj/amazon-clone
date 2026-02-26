package com.mansirajprojects.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderStatus;
import com.mansirajprojects.backend.repository.OrderRepository;

@Service
public class OrderSchedulerService {

    @Autowired
    private OrderRepository orderRepository;

    // Runs every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void closeReturnWindows() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        
        // Find orders delivered more than 7 days ago that are still marked as DELIVERED
        List<Order> ordersToUpdate = orderRepository.findByOrderStatusAndDeliveryDateBefore(
                OrderStatus.DELIVERED, sevenDaysAgo);

        for (Order order : ordersToUpdate) {
            order.setOrderStatus(OrderStatus.RETURN_WINDOW_CLOSED);
        }
        
        orderRepository.saveAll(ordersToUpdate);
        System.out.println("Closed return window for " + ordersToUpdate.size() + " orders.");
    }
}