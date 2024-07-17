import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getPosts, createReview } from "../data/repositoryapi";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
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

  const resetPostContent = () => {
    setPost("");
    setErrorMessage(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if(post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    const newreview = { comments: post };
    await createReview(newreview);

    // Add post to locally stored posts.
    setPosts([...posts, newreview]);

    resetPostContent();

    navigate("/Vreview");
  };

  return (
    <div className="review-container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend><strong>Review a product</strong></legend>
          <div className="form-group" style={{ marginBottom: "60px" }}>
            <ReactQuill theme="snow" value={post} onChange={setPost} style={{ height: "180px" }} />
          </div>
          {errorMessage !== null &&
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          }
          <div className="form-group">
            <input type="button" className="btn btn-danger mr-5" value="Cancel" onClick={resetPostContent} />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>User reviews</h1>
      <div className="reviews-section">
        {isLoading ?
          <div>Loading reviews...</div>
          :
          posts.length === 0 ?
            <span className="text-muted">No reviews have been submitted.</span>
            :
            posts.map((x, index) =>
              <div key={index} className="review-card border my-3 p-3">
                <h6 className="text-primary">Product : {x.productID}</h6>
                <h6 className="text-primary">Comment : {x.comments}</h6>
                <h6 className="text-primary"> Rating : {x.rating}</h6>

                <div className="review-text" dangerouslySetInnerHTML={{ __html: x.text }} />
              </div>
            )
        }
      </div>
    </div>
  );
};