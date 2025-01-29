import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyCollection.css";

const MyCollection = () => {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    const images = JSON.parse(localStorage.getItem("savedImages")) || [];
    setSavedImages(images);
  }, []);

  return (
    <div className="my-collection">
      <nav className="nav-bar">
              <div className="nav-content">
                <div className="nav-title">Meme Generator</div>
                <ol className="nav-list">
                  <li>
                    <Link to="/home" className="link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/mycol" className="link">
                      My Collection
                    </Link>
                  </li>
                <li>
              <Link to="/" className="link">
                Logout
              </Link>
            </li>
          </ol>
        </div>
      </nav>

      <div className="collection-content">
        {savedImages.length === 0 ? (
          <p>No images saved yet.</p>
        ) : (
          <div className="image-gallery">
            {savedImages.map((src, index) => (
              <img key={index} src={src} alt={`Saved Image ${index + 1}`} className="saved-image" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
