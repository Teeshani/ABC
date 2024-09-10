// frontend/src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import './Gallery.css'; 



const Gallery = () => {
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gallery'); 
        const data = await response.json();
        setGalleryData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gallery data.');
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Menu Introduction Section */}
      <section className="menu-in">
        <div className="intro-c">
          <h2> Gallery</h2>
          <p>
          This showcases visual content such as photos and videos that highlight a restaurant's ambiance, 
          dishes, drinks, events, and special features. The gallery typically includes high-quality images 
          of the interior and exterior design, popular menu items, and any unique elements like chef specials
          or seasonal themes. This section is essential for providing potential customers a virtual glimpse 
          into the dining experience, creating an inviting atmosphere, and encouraging them to visit or place
          an order online. 
          </p>
        </div>

      
      </section>

      {/* Gallery Main Section */}
      <main className="gallery-main">
        <section className="gallery">
          {Object.entries(galleryData).map(([heading, images]) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <div className="image-grid">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/gallery/${image.filename}`}
                    alt={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Gallery;
