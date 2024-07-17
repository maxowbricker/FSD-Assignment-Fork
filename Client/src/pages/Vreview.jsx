
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { getPosts } from "../data/repositoryapi";

export default function Review() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, []);
// page just to view the reviews without having to be logged in 

  return (
    <div className="review-container">
    <div>
      <h1>User reviews</h1>
      <div className="reviews-section">
        {isLoading ? (
          <div>Loading reviews...</div>
        ) : posts.length === 0 ? (
          <span className="text-muted">No reviews have been submitted.</span>
        ) : (
          posts.map((x, index) => (
            <div key={index} className="review-card border my-3 p-3">
              <h6 className="text-primary">User: {x.email}</h6>
              <h6 className="text-primary">Product: {x.productID}</h6>
              <h6 className="text-primary">Comment: {x.comments}</h6>
              <h6 className="text-primary">Rating: {x.rating}</h6>
              <div className="review-text" dangerouslySetInnerHTML={{ __html: x.text }} />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};