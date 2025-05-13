package com.example.payment;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173") // adjust for frontend host
public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository,
                             @Value("${stripe.secret.key}") String secretKey) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
    }

    @PostMapping("/create-payment-intent")
    public PaymentResponse createPaymentIntent(@RequestBody PaymentRequest request) throws StripeException {
        int amountInCents = request.getAmount() * 100;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) amountInCents)
                .setCurrency("usd")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        // Save in DB
        Payment payment = new Payment(
                request.getUserId(),
                request.getAmount(),
                paymentIntent.getId(),
                paymentIntent.getClientSecret()
        );
        paymentRepository.save(payment);

        return new PaymentResponse(paymentIntent.getClientSecret());
    }
}
