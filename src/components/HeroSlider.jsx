import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.get('/heroSlides');
        setSlides(res.data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative pt-20 overflow-hidden">
      <div className="relative h-[650px] md:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>
        ))}
        
        <div className="relative z-20 container-max h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h2 className="text-primary text-xl md:text-2xl font-semibold mb-3 animate-slideInLeft">
              {slides[currentSlide]?.title}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-slideInLeft delay-100">
              {slides[currentSlide]?.subtitle}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl animate-slideInLeft delay-200">
              {slides[currentSlide]?.description}
            </p>
            <div className="flex gap-4 animate-slideInLeft delay-300">
              <Link to="/services" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                <i className="fas fa-headset mr-2"></i> {slides[currentSlide]?.cta1 || 'Xizmatlar'}
              </Link>
              <Link to="/news" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                <i className="fas fa-newspaper mr-2"></i> {slides[currentSlide]?.cta2 || 'Yangiliklar'}
              </Link>
            </div>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index ? 'w-10 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        >
          <i className="fas fa-chevron-left text-white text-xl"></i>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
        >
          <i className="fas fa-chevron-right text-white text-xl"></i>
        </button>
      </div>
    </div>
  );
}