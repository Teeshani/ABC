import React, { useState, useEffect } from 'react';
import './Testimonials.css'; // Import the CSS file for styling if needed

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "This is the best dining experience I've ever had. The ambiance and the food were just amazing!",
      author: 'Jane Doe',
    },
    {
      id: 2,
      text: 'Signature Cuisine is top-notch! I recommend it to all my friends.',
      author: 'John Smith',
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const showNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const showPreviousTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showNextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials-section">
      <h2>What Our Guests Say</h2>
      <div id="testimonials-carousel">
        <div className="testimonials-slide">
          <p>"{testimonials[currentTestimonial].text}"</p>
          <h4>- {testimonials[currentTestimonial].author}</h4>
        </div>
        <button id="prevTestimonial" onClick={showPreviousTestimonial}>
          &#10094;
        </button>
        <button id="nextTestimonial" onClick={showNextTestimonial}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
