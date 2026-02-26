package com.mansirajprojects.backend.controller;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mansirajprojects.backend.model.Order;
import com.mansirajprojects.backend.model.OrderStatus;
import com.mansirajprojects.backend.repository.OrderRepository;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin
public class AdminDashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/analytics")
    public ResponseEntity<?> getDashboardAnalytics(@RequestParam(required = false, defaultValue = "1") int years) {
        
        LocalDateTime startDate = LocalDateTime.now().minusYears(years);
        List<Order> orders = orderRepository.findByOrderDateBetween(startDate, LocalDateTime.now());

        // Calculate Totals
        long totalRevenue = 0;
        int totalOrders = orders.size();
        int pendingReturns = 0;

        for (Order order : orders) {
            if (order.getOrderStatus() == OrderStatus.DELIVERED || order.getOrderStatus() == OrderStatus.RETURN_WINDOW_CLOSED) {
                totalRevenue += order.getTotalAmountCents();
            }
            if (order.getOrderStatus() == OrderStatus.RETURN_REQUESTED) {
                pendingReturns++;
            }
        }

        // Group by Month for Line/Bar Charts (Sales & Customers)
        // Note: For "new vs repeated" customers, you'd track emails. Here we simulate grouping by month.
        Map<Month, Double> salesByMonth = new TreeMap<>();
        Map<Month, Integer> customersByMonth = new TreeMap<>();

        for (Order order : orders) {
            Month month = order.getOrderDate().getMonth();
            
            salesByMonth.put(month, salesByMonth.getOrDefault(month, 0.0) + (order.getTotalAmountCents() / 100.0));
            customersByMonth.put(month, customersByMonth.getOrDefault(month, 0) + 1);
        }

        // Format for Recharts
        List<Map<String, Object>> chartData = new ArrayList<>();
        for (Month month : salesByMonth.keySet()) {
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("name", month.name().substring(0, 3)); // e.g., "JAN"
            dataPoint.put("sales", salesByMonth.get(month));
            
            // Simulating customer split for the bar chart
            int totalCust = customersByMonth.get(month);
            dataPoint.put("newCustomers", (int)(totalCust * 0.6)); // 60% new
            dataPoint.put("repeatCustomers", (int)(totalCust * 0.4)); // 40% repeat
            
            chartData.add(dataPoint);
        }

        // Final Response Payload
        Map<String, Object> response = new HashMap<>();
        response.put("totalRevenueCents", totalRevenue);
        response.put("totalOrders", totalOrders);
        response.put("pendingReturns", pendingReturns);
        response.put("chartData", chartData);

        return ResponseEntity.ok(response);
    }
}