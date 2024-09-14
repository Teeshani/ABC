// src/components/Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css'; // Ensure you have styling for the carousel

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carousels');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched carousel data:', data); // Check the data structure
        setCarouselItems(data);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  // Carousel functionality to navigate between slides
  useEffect(() => {
    if (!carouselItems.length) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    function showSlide(n) {
      slides.forEach((slide) => (slide.style.opacity = '0'));
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].style.opacity = '1';
    }

    const handlePrevClick = () => {
      showSlide(currentSlide - 1);
      resetSlideInterval();
    };

    const handleNextClick = () => {
      showSlide(currentSlide + 1);
      resetSlideInterval();
    };

    if (prevBtnRef.current && nextBtnRef.current) {
      prevBtnRef.current.addEventListener('click', handlePrevClick);
      nextBtnRef.current.addEventListener('click', handleNextClick);
    }

    setTimeout(() => showSlide(0), 50);

    let slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 3000);

    function resetSlideInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 3000);
    }

    // Cleanup function to remove event listeners and interval
    return () => {
      if (prevBtnRef.current) prevBtnRef.current.removeEventListener('click', handlePrevClick);
      if (nextBtnRef.current) nextBtnRef.current.removeEventListener('click', handleNextClick);
      clearInterval(slideInterval);
    };
  }, [carouselItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="carousel">
      <div id="carousel-container">
        {carouselItems.map((item, index) => (
          <div className="carousel-slide" key={index}>
            <img src={`http://localhost:5000/images/${item.image_path}`} alt={item.alt_text} />
            <div className="carousel-overlay">
              <h3>{item.overlay_title}</h3>
              <p>{item.overlay_content}</p>
              <a href={item.button_link} className="carousel-btn">{item.button_text}</a>
            </div>
          </div>
        ))}
        <button ref={prevBtnRef} id="prevBtn">&#10094;</button>
        <button ref={nextBtnRef} id="nextBtn">&#10095;</button>
      </div>
    </section>
  );
};

export default Carousel;
