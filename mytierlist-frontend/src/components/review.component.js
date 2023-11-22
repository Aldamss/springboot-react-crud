import React, { Component } from "react";
import ReviewDataService from "../services/review.service";
import { withRouter } from '../common/with-router';

class Review extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onChangeTier = this.onChangeTier.bind(this);
        this.getReview = this.getReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
        this.deleteReview = this.deleteReview.bind(this);

        this.state = {
            currentReview: {
                id: null,
                title: "",
                note: "",
                tier: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getReview(this.props.router.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReview: {
                    ...prevState.currentReview,
                    title: title
                }
            };
        });
    }

    onChangeNote(e) {
        const note = e.target.value;

        this.setState(prevState => ({
            currentReview: {
                ...prevState.currentReview,
                note: note
            }
        }));
    }

    onChangeTier(e) {
        const tier = e.target.value

        this.setState(prevState => ({
            currentReview: {
                ...prevState.currentReview,
                tier: tier
            }
        }));
    }

    getReview(id) {
        ReviewDataService.get(id)
            .then(response => {
                this.setState({
                    currentReview: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateReview() {
        ReviewDataService.update(
            this.state.currentReview.id,
            this.state.currentReview
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Review was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteReview() {
        ReviewDataService.delete(this.state.currentReview.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navigate('/Reviews');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentReview } = this.state;

        const Tier = {
            F: "F",
            E: "E",
            D: "D",
            C: "C",
            B: "B",
            A: "A",
            S: "S"
        };

        return (
            <div>
                {currentReview ? (
                    <div className="edit-form">
                        <h4>Review</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentReview.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentReview.note}
                                    onChange={this.onChangeNote}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tier">Tier</label>
                                <select
                                    className="form-control"
                                    id="tier"
                                    required
                                    value={currentReview.tier}
                                    onChange={this.onChangeTier}
                                    name="description"
                                >
                                    <option value="">Select a tier</option>
                                    <option value="F">F</option>
                                    <option value="E">E</option>
                                    <option value="D">D</option>
                                    <option value="C">C</option>
                                    <option value="B">B</option>
                                    <option value="A">A</option>
                                    <option value="S">S</option>
                                </select>
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteReview}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateReview}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Review...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Review);