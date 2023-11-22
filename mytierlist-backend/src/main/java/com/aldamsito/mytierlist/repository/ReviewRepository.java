package com.aldamsito.mytierlist.repository;

        import java.util.List;

        import com.aldamsito.mytierlist.model.Tier;
        import org.springframework.data.jpa.repository.JpaRepository;

        import com.aldamsito.mytierlist.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTier(Tier tier);
    List<Review> findByTitleContaining(String title);
}