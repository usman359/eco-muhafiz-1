'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function SatelliteSlider() {
  const [position, setPosition] = useState(50); // percentage (0 to 100)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Initial delay load to ensure container layout is fully populated
    const timer = setTimeout(updateDimensions, 500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const handleMove = (clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setPosition(percentage);
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <div 
      className="slider-compare-container" 
      id="sliderCompare" 
      ref={containerRef}
    >
      <img 
        className="slider-compare-img" 
        src="/images/satellite_base_obs.png" 
        alt="Satellite Regular Map" 
      />
      <div 
        className="slider-compare-overlay" 
        id="compareOverlay" 
        style={{ width: `${position}%` }}
      >
        <img 
          src="/images/satellite_ai_obs.png" 
          alt="Satellite AI Analyzed Map" 
          style={{
            width: dimensions.width ? `${dimensions.width}px` : '100%',
            height: dimensions.height ? `${dimensions.height}px` : '100%',
          }}
        />
      </div>
      <div 
        className="slider-compare-handle" 
        id="compareHandle" 
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{ left: `${position}%` }}
      >
        <div className="slider-compare-button">
          <i className="fas fa-arrows-alt-h"></i>
        </div>
      </div>
      <div className="slider-label label-left">Satellite Image</div>
      <div className="slider-label label-right">Canopy Health (AI Analysis)</div>
    </div>
  );
}
