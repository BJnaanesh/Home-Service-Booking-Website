package com.example.payment;

public class PaymentRequest {
    private int amount;
    private Long userId;

    // Getters and setters
    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
