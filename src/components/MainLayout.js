"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "../context/AppContext";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const locomotiveInstance = useRef(null);

  const {
    showLiveDemoModal,
    openLiveDemo,
    closeLiveDemo,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  } = useApp();

  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', phone: '' });
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [trxId, setTrxId] = useState('');
  const [paymentProof, setPaymentProof] = useState('');
  const [paymentProofName, setPaymentProofName] = useState('');
  const [activeCertificate, setActiveCertificate] = useState(null);

  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResults, setLookupResults] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [demoStatus, setDemoStatus] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('');

  // Preloader Canvas progress animation
  // Re-runs when leaving /admin — first mount on admin skips canvas so it never
  // completes, which left "View site" stuck on the loading screen.
  useEffect(() => {
    if (isAdminRoute) return;

    if (document.body.classList.contains("page-loaded")) {
      setIsLoaded(true);
      setPreloaderVisible(false);
      return;
    }

    let cancelled = false;
    let animationFrameId;
    let completeTimer;
    let hideTimer;

    const finish = () => {
      if (cancelled) return;
      document.body.classList.add("page-loaded");
      setIsLoaded(true);
      hideTimer = setTimeout(() => {
        if (!cancelled) setPreloaderVisible(false);
      }, 1000);
    };

    const start = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) {
        finish();
        setPreloaderVisible(false);
        return;
      }

      const ctx = canvas.getContext("2d");
      let progress = 0;

      const draw = () => {
        if (cancelled) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

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
          completeTimer = setTimeout(finish, 300);
        }
      };

      draw();
    };

    // Defer so the canvas exists after switching away from admin chrome
    const timer = setTimeout(start, 50);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, [isAdminRoute]);

  // Locomotive Scroll smooth scroll initialization
  useEffect(() => {
    if (!isLoaded) return;

    let scroll;
    // Dynamically import locomotive-scroll
    import("locomotive-scroll").then((LocomotiveScrollModule) => {
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
    if (href.startsWith("#") || href.startsWith("http") || pathname === href) {
      if (pathname === "/" && href.startsWith("#")) {
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
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Products", path: "/products" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Our Team", path: "/team" },
  ];

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 1. Preloader Overlay */}
      {preloaderVisible && (
        <div className="preloader" id="preloader">
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" version="1.1">
            <path d="M0,0 C305.333333,0 625.333333,0 960,0 C1294.66667,0 1614.66667,0 1920,0 L1920,1080 C1614.66667,1080 1294.66667,1080 960,1080 C625.333333,1080 305.333333,1080 0,1080 L0,0 Z"></path>
          </svg>
          <div className="inner">
            <canvas
              ref={canvasRef}
              className="progress-bar"
              id="progress-bar"
              width="200"
              height="200"
            ></canvas>
            <figure>
              <img src="/images/eco-f.png" alt="Image" />
            </figure>
            <small>Loading</small>
          </div>
        </div>
      )}

      {/* 2. Page Transition Overlay */}
      <div className={`page-transition ${isTransitioning ? "active" : ""}`}>
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" version="1.1">
          <path d="M0,0 C305.333333,0 625.333333,0 960,0 C1294.66667,0 1614.66667,0 1920,0 L1920,1080 C1614.66667,980 1294.66667,930 960,930 C625.333333,930 305.333333,980 0,1080 L0,0 Z"></path>
        </svg>
      </div>

      {/* 3. Search Box Panel */}
      <div className={`search-box ${searchActive ? "active" : ""}`}>
        <div className="container">
          <div className="form">
            <h3>SEARCH INITIATIVES</h3>
            <input
              type="search"
              placeholder="Search forest campaigns or updates"
            />
            <input type="submit" value="SEARCH" onClick={toggleSearch} />
          </div>
          <div className="search-events">
            <ul>
              <li>
                <h5>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Tree Plantation Drive – Islamabad
                  </a>
                </h5>
                <small>10 July – 25 July 2025</small>
              </li>
              <li>
                <h5>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Eco Muhafiz Pilot Launch – Margalla Forest
                  </a>
                </h5>
                <small>Feb 2026</small>
              </li>
              <li>
                <h5>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Wildfire Early Detection Workshop – Islamabad
                  </a>
                </h5>
                <small>March 2026</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop Overlay */}
      <div
        className={`side-widget-backdrop ${menuActive ? "active" : ""}`}
        onClick={() => setMenuActive(false)}
      />

      {/* 4. Side Widget Mobile Menu */}
      <aside className={`side-widget ${menuActive ? "active" : ""}`}>
        <svg viewBox="0 0 600 1080" preserveAspectRatio="none" version="1.1">
          <path d="M540,1080H0V0h540c0,179.85,0,359.7,0,539.54C540,719.7,540,899.85,540,1080z"></path>
        </svg>
        <div className="logo">
          <Link href="/" onClick={(e) => navigateWithTransition(e, "/")}>
            ECO·MUHAFIZ
          </Link>
          <button
            onClick={() => setMenuActive(false)}
            aria-label="Close mobile menu"
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "26px",
              cursor: "pointer",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
        <div className="inner">
          <div className="widget">
            <figure>
              <img src="/images/eco-f.png" alt="Eco Muhafiz Device in Forest" />
            </figure>
            <p>
              Powered by AI and solar energy, <strong>Eco Muhafiz</strong>{" "}
              listens for illegal activity and alerts authorities in real-time.
              Designed to protect biodiversity and empower forest rangers, it
              ensures <u>sustainable forest monitoring</u> at scale.
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
                    className={pathname === link.path ? "active" : ""}
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
      <div
        className={`smooth-scroll ${menuActive || searchActive ? "no-transform" : ""}`}
        ref={scrollRef}
      >
        <div className="section-wrapper" data-scroll-section>
          {/* Header Navigation Bar */}
          <nav className="navbar light">
            <div className="logo">
              <Link href="/" onClick={(e) => navigateWithTransition(e, "/")}>
                <img src="/logo.png" alt="Eco Muhafiz logo" />
              </Link>
            </div>
            <div className="site-menu">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className={pathname === link.path ? "active" : ""}
                      onClick={(e) => navigateWithTransition(e, link.path)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="navbar-right-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                className={`hamburger-menu ${menuActive ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <svg
                  className="hamburger"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path className="line line-top" d="M0,9h30" />
                  <path className="line line-center" d="M0,15h30" />
                  <path className="line line-bottom" d="M0,21h30" />
                </svg>
              </div>
              <div className="navbar-button-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={openLiveDemo}
                  className="nav-btn-demo"
                >
                  Live Demo
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="nav-btn-save"
                >
                  Save Forest
                  {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: '#e74c3c',
                      color: '#fff',
                      borderRadius: '50%',
                      padding: '2px 6px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      border: '2px solid #fff',
                      lineHeight: '1.2'
                    }}>
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
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
                  <ul
                    className="footer-menu"
                    style={{ listStyle: "none", padding: 0, margin: 0 }}
                  >
                    <li style={{ marginBottom: "12px" }}>
                      <Link
                        href="/about"
                        onClick={(e) => navigateWithTransition(e, "/about")}
                      >
                        About Us
                      </Link>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <Link
                        href="/contact"
                        onClick={(e) => navigateWithTransition(e, "/contact")}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <Link
                        href="/products"
                        onClick={(e) => navigateWithTransition(e, "/products")}
                      >
                        Our Products
                      </Link>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <Link
                        href="/team"
                        onClick={(e) => navigateWithTransition(e, "/team")}
                      >
                        Our Team
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <h6 className="widget-title">Connect With Us</h6>
                  <ul
                    className="social-media"
                    style={{ listStyle: "none", padding: 0, margin: 0 }}
                  >
                    <li style={{ marginBottom: "12px" }}>
                      <a
                        href="https://www.instagram.com/eco.muhafizz?igsh=eDE3amd3ZzRtc2Fy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-instagram"
                          style={{ marginRight: "8px" }}
                        ></i>{" "}
                        Instagram
                      </a>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <a
                        href="https://www.linkedin.com/company/ecomuhafiz/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-linkedin-in"
                          style={{ marginRight: "8px" }}
                        ></i>{" "}
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <h6 className="widget-title">Get in Touch</h6>
                  <address
                    className="address"
                    style={{
                      lineHeight: 1.8,
                      color: "rgba(255, 255, 255, 0.7)",
                      fontStyle: "normal",
                    }}
                  >
                    NSTP, NUST Campus,
                    <br />
                    H-12 Sector, Islamabad, Pakistan
                    <br />
                    <span style={{ display: 'block', marginTop: '10px' }}>
                      Email: <a href="mailto:info@ecomuhafiz.com" style={{ color: 'var(--accent-light, #94ffc4)', textDecoration: 'underline' }}>info@ecomuhafiz.com</a>
                    </span>
                  </address>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="container d-flex justify-content-between align-items-center flex-wrap">
                <span className="copyright">
                  © 2026 Eco Muhafiz | Climate & Forest Protection Initiative
                </span>
                <span className="creation">
                  Backed by Muren AI{" "}
                  <a
                    href="https://www.muren.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent-green)" }}
                  >
                    muren.ai
                  </a>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* 6. Live Demo Registration Modal */}
      {showLiveDemoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="modal-responsive-card" style={{
            background: 'linear-gradient(135deg, #16382c 0%, #0c2018 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '36px 28px',
            width: '92%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <button
              onClick={closeLiveDemo}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <h3 style={{ color: '#fff', fontSize: '28px', marginBottom: '10px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
              Access Live Cockpit
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '25px' }}>
              Register your interest to view the live dashboard streams and analytical reports.
            </p>

            {demoStatus === 'success' ? (
              <div style={{ color: '#2ecc71', background: 'rgba(46, 204, 113, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(46, 204, 113, 0.2)', textAlign: 'center' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '40px', marginBottom: '15px' }}></i>
                <h4>Access Granted!</h4>
                <p>Redirecting you to the cockpit dashboard...</p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setDemoStatus('submitting');
                setTimeout(() => {
                  setDemoStatus('success');
                  setTimeout(() => {
                    closeLiveDemo();
                    setDemoStatus('');
                    window.open('http://localhost:3001', '_blank');
                  }, 1500);
                }, 1000);
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={demoStatus === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '15px',
                    background: 'var(--accent-green, #10b981)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: '0.3s ease'
                  }}
                >
                  {demoStatus === 'submitting' ? 'Authenticating...' : 'Enter Cockpit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. Save Forest E-Commerce Cart Drawer */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 10000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            maxWidth: '480px',
            height: '100%',
            backgroundColor: '#ffffff',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10001,
            animation: 'slideInRight 0.3s ease-out'
          }}>
            {/* Header */}
            <div style={{
              padding: '25px',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fffbf7'
            }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-dark, #0f2c20)', fontSize: '20px', fontWeight: '700' }}>
                  Sponsor Protection
                </h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'rgba(30,43,37,0.6)' }}>
                  Help us fund deployment of climate technology
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  fontSize: '28px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                &times;
              </button>
            </div>

            {/* Cart Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '25px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '80px' }}>
                  <i className="fas fa-seedling" style={{ fontSize: '64px', color: 'rgba(16, 185, 129, 0.2)', marginBottom: '20px' }}></i>
                  <h5 style={{ color: 'var(--text-dark, #0f2c20)', fontSize: '18px', fontWeight: '600' }}>Your sponsorship is empty</h5>
                  <p style={{ color: '#666', fontSize: '14px', maxWidth: '300px', margin: '10px auto' }}>
                    Select devices or protect hectares of forest to launch your contribution today!
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/products');
                    }}
                    style={{
                      background: 'var(--accent-green, #10b981)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      marginTop: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '30px' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex',
                        padding: '15px 0',
                        borderBottom: '1px solid rgba(0,0,0,0.06)'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--text-dark, #0f2c20)' }}>{item.title}</h6>
                          <small style={{ color: '#777' }}>Sponsorship tier</small>
                          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                border: '1px solid #ccc',
                                background: '#fff',
                                width: '28px',
                                height: '28px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              -
                            </button>
                            <span style={{ margin: '0 12px', fontSize: '15px', fontWeight: '600' }}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                border: '1px solid #ccc',
                                background: '#fff',
                                width: '28px',
                                height: '28px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-green, #10b981)' }}>
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#e74c3c',
                              cursor: 'pointer',
                              fontSize: '13px',
                              padding: 0,
                              textAlign: 'right'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Coming Soon Sponsorship Notice */}
                  <div style={{ background: '#fcfcfc', border: '1px solid #eee', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                      <span style={{ fontWeight: '600', color: '#555' }}>Total Sponsorship</span>
                      <span style={{ fontWeight: '800', fontSize: '18px', color: '#152c20' }}>
                        PKR {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '24px', textAlign: 'center', marginTop: '15px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: '22px' }}>
                        <i className="fas fa-rocket"></i>
                      </div>
                      <h5 style={{ color: '#0f2c20', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>
                        Direct Online Payment — Coming Soon!
                      </h5>
                      <p style={{ color: '#2c4c3e', fontSize: '13px', lineHeight: '1.6', margin: '0 0 18px 0' }}>
                        Online payment gateway and automated digital sponsorship certificates are coming soon. For direct reserve sponsorship or institutional deployment, please contact our team.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          router.push('/contact');
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 18px',
                          background: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                      >
                        Contact Team for Sponsorship
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. Checkout Success & Certificate Modal */}
      {isCheckoutSuccessOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10002,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="modal-responsive-card" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f7f9f8 100%)',
            border: '6px double #16382c',
            borderRadius: '24px',
            padding: '32px 24px',
            width: '92%',
            maxWidth: '580px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button
              onClick={() => {
                setIsCheckoutSuccessOpen(false);
                clearCart();
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#666',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <div style={{ color: '#16382c', marginBottom: '15px' }}>
              <i className="fas fa-award" style={{ fontSize: '56px', color: '#10b981' }}></i>
            </div>
            <h2 className="modal-responsive-title" style={{ fontFamily: 'Cinzel, serif', color: '#16382c', fontWeight: 'bold', fontSize: '24px', margin: '0 0 5px 0' }}>
              Certificate of Protection
            </h2>
            <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#777', margin: '0 0 20px 0' }}>
              Eco Muhafiz Climate Intelligence Initiative
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '15px', color: '#555', margin: '0 0 15px 0' }}>
              This official document is proudly presented to
            </p>
            <h3 style={{ fontFamily: 'var(--font-sans)', color: '#0f2c20', fontWeight: '700', fontSize: '22px', borderBottom: '2px solid #10b981', display: 'inline-block', paddingBottom: '4px', margin: '0 0 15px 0' }}>
              {activeCertificate?.contributorName || checkoutForm.name || 'Our Valued Supporter'}
            </h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              In recognition of sponsoring and enabling climate technology deployments to safeguard Pakistan&apos;s forests, wildlife, and biodiversity.
            </p>

            <div style={{ background: '#f8faf9', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'left' }}>
                <small style={{ display: 'block', color: '#888', fontSize: '11px' }}>CERTIFICATE CODE</small>
                <strong style={{ fontSize: '13px', color: '#0f2c20', letterSpacing: '0.5px' }}>
                  {activeCertificate?.certificateCode || 'EM-CERT-VERIFIED'}
                </strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <small style={{ display: 'block', color: '#888', fontSize: '11px' }}>MRV STATUS</small>
                <strong style={{ fontSize: '13px', color: '#10b981' }}>VERIFIED &amp; AUDITED</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.print()}
                style={{
                  padding: '10px 20px',
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  flex: '1 1 auto',
                  minWidth: '160px'
                }}
              >
                <i className="fas fa-print" style={{ marginRight: '6px' }}></i> Print / Save Certificate
              </button>
              <button
                onClick={() => {
                  setIsCheckoutSuccessOpen(false);
                  clearCart();
                }}
                style={{
                  padding: '10px 20px',
                  background: '#0f2c20',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  flex: '1 1 auto',
                  minWidth: '100px'
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Supporter Certificate Lookup Modal */}
      {isLookupModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10003,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '35px',
            width: '90%',
            maxWidth: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => {
                setIsLookupModalOpen(false);
                setLookupResults(null);
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: '22px' }}>
                <i className="fas fa-award"></i>
              </div>
              <h3 style={{ margin: 0, color: '#0f2c20', fontSize: '22px', fontWeight: '700' }}>
                Retrieve Your Certificates
              </h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666' }}>
                Enter your supporter email address to view &amp; reprint your Certificates of Protection.
              </p>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!lookupEmail) return;
              setLookupLoading(true);
              try {
                const res = await fetch(`/api/sponsorships?email=${encodeURIComponent(lookupEmail)}`);
                const data = await res.json();
                setLookupResults(data.sponsorships || []);
              } catch (err) {
                console.error('Lookup error:', err);
                setLookupResults([]);
              }
              setLookupLoading(false);
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="email"
                  placeholder="Enter email address..."
                  required
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  style={{
                    padding: '12px 20px',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {lookupLoading ? 'Searching...' : 'Find'}
                </button>
              </div>
            </form>

            {/* Results Display */}
            {lookupResults && (
              <div style={{ marginTop: '20px' }}>
                {lookupResults.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', background: '#fafafa', borderRadius: '12px', color: '#666', fontSize: '14px' }}>
                    No certificate records found for <strong>{lookupEmail}</strong>.
                  </div>
                ) : (
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
                      Found {lookupResults.length} Certificate(s):
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {lookupResults.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: '12px',
                            padding: '15px',
                            background: '#f0fdf4',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <strong style={{ display: 'block', fontSize: '14px', color: '#0f2c20' }}>
                              {item.certificateCode}
                            </strong>
                            <small style={{ color: '#666' }}>
                              Sponsored: ${item.amount} • {new Date(item.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <button
                            onClick={() => {
                              setActiveCertificate({
                                contributorName: item.contributorName,
                                contributorEmail: item.contributorEmail,
                                amount: item.amount,
                                certificateCode: item.certificateCode,
                                date: item.createdAt,
                              });
                              setIsLookupModalOpen(false);
                              setIsCheckoutSuccessOpen(true);
                            }}
                            style={{
                              padding: '8px 14px',
                              background: '#0f2c20',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
