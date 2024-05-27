// src/BackgroundSlideshow.js
import React, { useEffect, useState } from 'react';
import './BackgroundSlideshow.css';

const images = [
  '/1 satanstodoapp background photo.jpg',
  '/2 satanstodoapp background photo.jpg',
  '/3 satanstodoapp background photo.jpg',
  '/4 satanstodoapp background photo.jpg',
  '/5 1 satanstodoapp background photo.jpg',
  '/6 satanstodoapp background photo.jpg',
  '/7 satanstodoapp background photo.jpg',
  '/8 satanstodoapp background photo.jpg',
  '/9 satanstodoapp background photo.jpg',
  '/10 satanstodoapp background photo.jpg',
  '/11 satanstodoapp background photo.jpg',
  '/12 satanstodoapp background photo.jpg',
  '/13 satanstodoapp background photo.jpg',
  '/14 satanstodoapp background photo.jpg',
  '/15 satanstodoapp background photo.jpg',
  '/16 satanstodoapp background photo.jpg'
];

const BackgroundSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-slideshow">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundSlideshow;
