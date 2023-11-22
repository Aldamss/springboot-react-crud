import logo from './logo.svg';

import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import AddReview from "./components/add-review.component";
import Review from "./components/review.component";
import ReviewsList from "./components/reviews-list.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/reviews" className="navbar-brand">
            MyTierList
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/reviews"} className="nav-link">
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ReviewsList />} />
            <Route path="/reviews" element={<ReviewsList />} />
            <Route path="/add" element={<AddReview />} />
            <Route path="/reviews/:id" element={<Review />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
