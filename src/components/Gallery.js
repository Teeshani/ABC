// frontend/src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import './Gallery.css'; 
import dish1Image from '../assets/images/grid1.jpg';

import dish4Image from '../assets/images/grid4.jpg';


const Gallery = () => {
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gallery'); // Ensure the backend endpoint is correct
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
    <div className='mainmenu-items'>
      {/* Menu Introduction Section */}
      <section className="menu-in">
        <div className="intro-c">
          <h2>Discover Our Gallery</h2>
          <p>
            Welcome to a visual feast that celebrates the artistry and flavor of
            our Signature Cuisine. Our culinary team takes pride in crafting
            dishes that not only tantalize the taste buds but also captivate the
            eyes. Each creation is a masterpiece, a symphony of colors, textures,
            and exquisite flavors meticulously curated to elevate your dining
            experience. Explore the gallery and savor the visual allure of our
            culinary craftsmanship.
          </p>
        </div>

        {/* Static images */}
        <div className="images-g">
        <img src={dish1Image} alt="Dish 1" />
        
          <img src={dish4Image} alt="Dish 4" />
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
