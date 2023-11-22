package com.aldamsito.mytierlist.controller;

import com.aldamsito.mytierlist.model.Review;
import com.aldamsito.mytierlist.model.Tier;
import com.aldamsito.mytierlist.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ReviewController {
    @Autowired
    ReviewRepository reviewRepository;

    @GetMapping("/test")
    public ResponseEntity<String> getReview() {
        // Your code to handle this endpoint
        return new ResponseEntity<>("Test response", HttpStatus.OK);
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@RequestParam(required = false) String title) {
        try {
            List<Review> reviews = new ArrayList<Review>();

            if (title == null)
                reviewRepository.findAll().forEach(reviews::add);
            else
                reviewRepository.findByTitleContaining(title).forEach(reviews::add);

            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable("id") long id) {
        Optional<Review> reviewData = reviewRepository.findById(id);

        if (reviewData.isPresent()) {
            return new ResponseEntity<>(reviewData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        try {
            Review _review = reviewRepository.save(new Review(review.getTitle(), review.getNote(), review.getTier()));
            return new ResponseEntity<>(_review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") long id, @RequestBody Review review) {
        Optional<Review> reviewData = reviewRepository.findById(id);

        if (reviewData.isPresent()) {
            Review _review = reviewData.get();
            _review.setTitle(review.getTitle());
            _review.setNote(review.getNote());
            _review.setTier(review.getTier());
            return new ResponseEntity<>(reviewRepository.save(_review), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") long id) {
        try {
            reviewRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reviews")
    public ResponseEntity<HttpStatus> deleteAllReviews() {
        try {
            reviewRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews/tier")
    public ResponseEntity<List<Review>> findByTier(Tier tier) {
        try {
            List<Review> reviews = reviewRepository.findByTier(tier);

            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
