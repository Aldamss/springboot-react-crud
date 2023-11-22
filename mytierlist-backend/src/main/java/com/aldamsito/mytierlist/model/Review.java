package com.aldamsito.mytierlist.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "note")
    private String note;

    @Column(name = "tier")
    @Enumerated(EnumType.STRING)
    private Tier tier;

    public Review() {}

    public Review( String title, String note, Tier tier) {
        this.id = id;
        this.title = title;
        this.note = note;
        this.tier = tier;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Tier getTier() {
        return tier;
    }

    public void setTier(Tier tier) {
        this.tier = tier;
    }

    @Override
    public String toString() {
        return "Review [" + "id=" + id + ", title='" + title + '\'' + ", note='" + note + '\'' + ", score=" + tier + ']';
    }
}
