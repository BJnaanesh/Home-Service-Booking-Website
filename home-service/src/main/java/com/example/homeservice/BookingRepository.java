package com.example.homeservice;

import com.example.homeservice.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.user.User;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
}
