import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import "./Reviews.css";

import React from "react";
import axios from "axios";

const Reviews = ({ getMovieData, movie }) => {
    let params = useParams();
    const movieId = params.movieId;

    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    useEffect(() => {
        loadReviews();
    }, [movieId]);

    const handleInputChange = (e) => {
        setReviewText(e.target.value);
    };

    // ----------- Adding the review -----------

    const addReview = async (e) => {
        e.preventDefault();

        console.log(
            `Going to add a review... for ${movieId} with the review ${reviewText}`
        );

        try {
            await axios.post("http://localhost:8080/api/v1/reviews", {
                reviewBody: reviewText,
                imdbId: movieId,
            });

            console.log("Review added successfully...");

            loadReviews();
        } catch (err) {
            console.log("Error reporting...");
            console.error("Error adding review:", err);
        }
    };

    // ----------- Loading the reviews -----------

    const loadReviews = async () => {
        const result = await axios.get(
            `http://localhost:8080/apis/v1/movies/${movieId}`
        );

        setReviews(result.data.reviewIds);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    {movie?.title}
                    <img
                        src={movie?.poster}
                        alt=""
                        className="review-page-image"
                    />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm
                                        handleSubmit={addReview}
                                        revText={reviewText}
                                        onInputChange={handleInputChange}
                                        labelText="Write a Review?"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {reviews.map((r) => {
                        return (
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        );
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
