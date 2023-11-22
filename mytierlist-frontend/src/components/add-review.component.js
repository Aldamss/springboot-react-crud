import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class AddReview extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onChangeTier = this.onChangeTier.bind(this);
        this.saveReview = this.saveReview.bind(this);
        this.newReview = this.newReview.bind(this);

        this.state = {
            id: null,
            title: "",
            note: "",
            tier: "",

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeNote(e) {
        this.setState({
            note: e.target.value
        });
    }

    onChangeTier(e) {
        this.setState({
            tier: e.target.value
        });
    }

    saveReview() {
        var data = {
            title: this.state.title,
            note: this.state.note,
            tier: this.state.tier
        };
        console.log(data);
        ReviewDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    note: response.data.note,
                    tier: response.data.tier,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newReview() {
        this.setState({
            id: null,
            title: "",
            note: "",
            tier: "",

            submitted: false
        });
    }

    render() {
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
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Note</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.note}
                                onChange={this.onChangeNote}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tier">Tier</label>
                            <select
                                className="form-control"
                                id="tier"
                                required
                                value={this.state.tier}
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

                        <button onClick={this.saveReview} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}