import React, { Component } from "react";
import ReviewDataService from "../services/review.service";
import { Link } from "react-router-dom";

export default class ReviewsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveReviews = this.retrieveReviews.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveReview = this.setActiveReview.bind(this);
        this.removeAllReviews = this.removeAllReviews.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            reviews: [],
            currentReview: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveReviews();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveReviews() {
        ReviewDataService.getAll()
            .then(response => {
                this.setState({
                    reviews: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveReviews();
        this.setState({
            currentReview: null,
            currentIndex: -1
        });
    }

    setActiveReview(review, index) {
        this.setState({
            currentReview: review,
            currentIndex: index
        });
    }

    removeAllReviews() {
        ReviewDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        ReviewDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    reviews: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, reviews, currentReview, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <h4>Reviews List</h4>

                    <ul className="list-group">
                        {reviews &&
                            reviews.map((review, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveReview(review, index)}
                                    key={index}
                                >
                                    <div className="row">
                                        <div className="col-md-1">{review.title}</div>
                                        <div className="col">{review.note}</div>
                                        <div className="col-md-1">{review.tier}</div>
                                        <div className="col-md-1">
                                            <Link to={"/reviews/" + review.id} className="badge badge-warning">
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllReviews}
                    >
                        Remove All
                    </button>
                </div>
                {/* <div className="col-md-6">
                    {currentReview ? (
                        <div>
                            <h4>Review</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentReview.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Note:</strong>
                                </label>{" "}
                                {currentReview.note}
                            </div>
                            <div>
                                <label>
                                    <strong>Tier:</strong>
                                </label>{" "}
                                {currentReview.tier}
                            </div>

                            <Link
                                to={"/reviews/" + currentReview.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Review...</p>
                        </div>
                    )}
                </div> */}
            </div>
        );
    }
}