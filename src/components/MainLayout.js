'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const locomotiveInstance = useRef(null);

  // Preloader Canvas progress animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let progress = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const radius = x - 2;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (progress / 100) * (2 * Math.PI);
      
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.stroke();
      
      if (progress < 100) {
        progress += 3;
        if (progress > 100) progress = 100;
        animationFrameId = requestAnimationFrame(draw);
      } else {
        // Wait briefly after 100% then trigger page loaded
        setTimeout(() => {
          document.body.classList.add('page-loaded');
          setIsLoaded(true);
          
          // Wait for transition to complete before unmounting preloader from DOM
          setTimeout(() => {
            setPreloaderVisible(false);
          }, 1000);
        }, 300);
      }
    };
    
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Locomotive Scroll smooth scroll initialization
  useEffect(() => {
    if (!isLoaded) return;
    
    let scroll;
    // Dynamically import locomotive-scroll
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      
      scroll = new LocomotiveScroll();
      locomotiveInstance.current = scroll;
    });

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, [isLoaded, pathname]);


  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  // Custom Navigation transition helper
  const navigateWithTransition = (e, href) => {
    if (href.startsWith('#') || href.startsWith('http') || pathname === href) {
      if (pathname === '/' && href.startsWith('#')) {
        // Handle smooth scroll on same page if locomotive is active
        if (locomotiveInstance.current) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            locomotiveInstance.current.scrollTo(target);
          }
        }
      }
      return;
    }
    
    e.preventDefault();
    setMenuActive(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push(href);
      // Wait for route load then fade transition back
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 800);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Products', path: '/products' },
    { name: 'Our Team', path: '/team' },
  ];

  return (
    <>
      {/* 1. Preloader Overlay */}
      {preloaderVisible && (
        <div className="preloader" id="preloader">
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" version="1.1">
            <path d="M0,0 C305.333333,0 625.333333,0 960,0 C1294.66667,0 1614.66667,0 1920,0 L1920,1080 C1614.66667,1080 1294.66667,1080 960,1080 C625.333333,1080 305.333333,1080 0,1080 L0,0 Z"></path>
          </svg>
          <div className="inner">
            <canvas ref={canvasRef} className="progress-bar" id="progress-bar" width="200" height="200"></canvas>
            <figure><img src="/images/eco-f.png" alt="Image" /></figure>
            <small>Loading</small>
          </div>
        </div>
      )}

      {/* 2. Page Transition Overlay */}
      <div className={`page-transition ${isTransitioning ? 'active' : ''}`}>
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" version="1.1">
          <path d="M0,0 C305.333333,0 625.333333,0 960,0 C1294.66667,0 1614.66667,0 1920,0 L1920,1080 C1614.66667,980 1294.66667,930 960,930 C625.333333,930 305.333333,980 0,1080 L0,0 Z"></path>
        </svg>
      </div>

      {/* 3. Search Box Panel */}
      <div className={`search-box ${searchActive ? 'active' : ''}`}>
        <div className="container">
          <div className="form">
            <h3>SEARCH INITIATIVES</h3>
            <input type="search" placeholder="Search forest campaigns or updates" />
            <input type="submit" value="SEARCH" onClick={toggleSearch} />
          </div>
          <div className="search-events">
            <ul>
              <li>
                <h5><a href="#" onClick={(e) => e.preventDefault()}>Tree Plantation Drive – Islamabad</a></h5>
                <small>10 July – 25 July 2025</small>
              </li>
              <li>
                <h5><a href="#" onClick={(e) => e.preventDefault()}>Eco Muhafiz Pilot Launch – Margalla Forest</a></h5>
                <small>Feb 2026</small>
              </li>
              <li>
                <h5><a href="#" onClick={(e) => e.preventDefault()}>Wildfire Early Detection Workshop – Islamabad</a></h5>
                <small>March 2026</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Side Widget Mobile Menu */}
      <aside className={`side-widget ${menuActive ? 'active' : ''}`}>
        <svg viewBox="0 0 600 1080" preserveAspectRatio="none" version="1.1">
          <path d="M540,1080H0V0h540c0,179.85,0,359.7,0,539.54C540,719.7,540,899.85,540,1080z"></path>
        </svg>
        <div className="logo">
          <Link href="/" onClick={(e) => navigateWithTransition(e, '/')}>
            <img src="/images/eco-f.png" alt="Eco Muhafiz logo" />
          </Link>
        </div>
        <div className="inner">
          <div className="widget">
            <figure><img src="/images/eco-f.png" alt="Eco Muhafiz Device in Forest" /></figure>
            <p>
              Powered by AI and solar energy, <strong>Eco Muhafiz</strong> listens for illegal activity and alerts authorities in real-time.
              Designed to protect biodiversity and empower forest rangers, it ensures <u>sustainable forest monitoring</u> at scale.
            </p>
          </div>
          <div className="widget">
            <h6 className="widget-title">Field Operation Hours</h6>
            <p>
              Monday ‒ Friday: 08:00 ‒ 18:00<br />
              Weekend Monitoring: 09:00 ‒ 16:00
            </p>
          </div>
        </div>
        <div className="display-mobile">
          <div className="site-menu">
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className={pathname === link.path ? 'active' : ''}
                    onClick={(e) => navigateWithTransition(e, link.path)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* 5. Smooth Scroll Section Wrapper */}
      <div className={`smooth-scroll ${menuActive || searchActive ? 'no-transform' : ''}`} ref={scrollRef}>
        <div className="section-wrapper" data-scroll-section>
          
          {/* Header Navigation Bar */}
          <nav className="navbar light">
            <div className="logo">
              <Link href="/" onClick={(e) => navigateWithTransition(e, '/')}>
                ECO·MUHAFIZ
              </Link>
            </div>
            <div className="site-menu">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.path} 
                      className={pathname === link.path ? 'active' : ''}
                      onClick={(e) => navigateWithTransition(e, link.path)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`hamburger-menu ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
              <svg className="hamburger" width="30" height="30" viewBox="0 0 30 30">
                <path className="line line-top" d="M0,9h30" />
                <path className="line line-center" d="M0,15h30" />
                <path className="line line-bottom" d="M0,21h30" />
              </svg>
            </div>
            <div className="navbar-button">
              {pathname === '/' ? (
                <a href="#cockpit" onClick={(e) => navigateWithTransition(e, '#cockpit')}>Live Demo</a>
              ) : (
                <Link href="/" onClick={(e) => navigateWithTransition(e, '/')}>Live Demo</Link>
              )}
            </div>
          </nav>

          {/* Children Pages */}
          {children}

          {/* Shared Footer component */}
          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <h6 className="widget-title">About Eco Muhafiz</h6>
                  <ul className="footer-menu" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '12px' }}>
                      <Link href="/about" onClick={(e) => navigateWithTransition(e, '/about')}>About Us</Link>
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <Link href="/contact" onClick={(e) => navigateWithTransition(e, '/contact')}>Contact Us</Link>
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <Link href="/products" onClick={(e) => navigateWithTransition(e, '/products')}>Our Products</Link>
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <Link href="/team" onClick={(e) => navigateWithTransition(e, '/team')}>Our Team</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <h6 className="widget-title">Connect With Us</h6>
                  <ul className="social-media" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '12px' }}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f" style={{ marginRight: '8px' }}></i> /eco.muhafiz
                      </a>
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-twitter" style={{ marginRight: '8px' }}></i> /eco_muhafiz
                      </a>
                    </li>
                    <li style={{ marginBottom: '12px' }}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-youtube" style={{ marginRight: '8px' }}></i> /ecoMuhafizOfficial
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <h6 className="widget-title">Get in Touch</h6>
                  <address className="address" style={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'normal' }}>
                    NSTP, NUST Campus,<br />
                    H-12 Sector, Islamabad, Pakistan<br />
                    <strong>Phone:</strong> +92 (300) 000 0000
                  </address>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="container d-flex justify-content-between align-items-center flex-wrap">
                <span className="copyright">© 2026 Eco Muhafiz | Climate & Forest Protection Initiative</span>
                <span className="creation">
                  Backed by Muren AI <a href="https://www.muren.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-green)' }}>muren.ai</a>
                </span>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
