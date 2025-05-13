package com.example.homeservice;

import com.example.homeservice.Booking;
import com.example.user.User;
import com.example.user.UserService;
import com.example.homeservice.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class BookingController {

	 @Autowired
	    private BookingRepository bookingRepository;

	    @Autowired
	    private UserService userservice;

	    // Create a new booking
	    @PostMapping
	    public Booking createBooking(@RequestBody BookingRequest bookingRequest) {
	        // Find the user by username
	    	User user = userservice.findByUsername(bookingRequest.getUsername());
	        if (user == null) {
	            throw new RuntimeException("User not found: " + bookingRequest.getUsername());
	        }

	        // Create a new booking
	        Booking booking = new Booking();
	        booking.setCustomer(user);
	        booking.setServiceType(bookingRequest.getServiceType());
	        booking.setPrice(bookingRequest.getPrice());
	        booking.setDate(bookingRequest.getDate());
	        booking.setTime(bookingRequest.getTime());
	        booking.setAddress(bookingRequest.getAddress());
	        booking.setStatus(bookingRequest.getStatus());
	        
	        // Save booking
	        return bookingRepository.save(booking);
	    }

//	    // Get bookings by username
	    @GetMapping("/{username}")
	    public List<Booking> getBookingsByUsername(@PathVariable String username) {
	        User user = userservice.findByUsername(username);
	        if (user == null) {
	            throw new RuntimeException("User not found: " + username);
	        }
	        return bookingRepository.findByCustomer(user);
	    }
	    
//	    @PutMapping("/cancel/{bookingId}")
//	    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
//	        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
//	        if (optionalBooking.isPresent()) {
//	            Booking booking = optionalBooking.get();
//	            booking.setStatus("Cancelled");
//	            bookingRepository.save(booking);
//	            return ResponseEntity.ok("Booking cancelled successfully");
//	        } else {
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
//	        }
//	    }

	}