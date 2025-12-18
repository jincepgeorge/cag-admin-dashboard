/**
 * Christ AG Kazhakkuttom Home Page Component
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import churchLogo from '../../assets/cag-logo.png';
import pastorImage from '../../assets/pastor-jobin.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    const elements = document.querySelectorAll('.about-card, .service-item, .ministry-card, .testimonial-card, .contact-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll to top button visibility and parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTopBtn = document.querySelector('.scroll-to-top');
      if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }

      // Parallax effect for hero
      const heroContent = document.querySelector('.hero-content');
      if (heroContent && window.pageYOffset < window.innerHeight) {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="church-header">
            <img src={churchLogo} alt="Christ AG Church Logo" className="hero-logo" />
            <h1 className="church-name">Christ AG Church</h1>
            <p className="church-location">Kazhakkuttom, Thiruvananthapuram</p>
          </div>
          <p className="church-tagline">
            "For where two or three gather in my name, there am I with them." - Matthew 18:20
          </p>
          
          <div className="hero-cta">
            <button className="primary-cta" onClick={() => window.scrollTo({ top: document.querySelector('.services-section').offsetTop, behavior: 'smooth' })}>
              Explore Our Services
            </button>
            <button className="secondary-cta" onClick={() => window.scrollTo({ top: document.querySelector('.contact-section').offsetTop, behavior: 'smooth' })}>
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="info-banner">
        <div className="info-content">
          <div className="info-item">
            <div className="info-icon">👥</div>
            <div className="info-text">
              <h4>500+</h4>
              <p>Active Members</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📅</div>
            <div className="info-text">
              <h4>Weekly</h4>
              <p>Events & Services</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">🎯</div>
            <div className="info-text">
              <h4>15+</h4>
              <p>Years of Ministry</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">❤️</div>
            <div className="info-text">
              <h4>United</h4>
              <p>In Christ's Love</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Welcome to Our Church Family</h2>
          
          {/* Pastor Introduction */}
          <div className="pastor-section">
            <div className="pastor-card">
              <div className="pastor-image-container">
                <img 
                  src={pastorImage} 
                  alt="Pastor Jobin Elisha" 
                  className="pastor-image"
                />
                <div className="pastor-icon-badge">✝️</div>
              </div>
              <h3>Pastor Jobin Elisha</h3>
              <p className="pastor-title">Senior Pastor</p>
              <p className="pastor-message">
                "Welcome to Christ AG Church! We are a family united in faith, committed to worshiping God, 
                growing together, and serving our community with Christ's love."
              </p>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">⛪</div>
              <h3>Our Mission</h3>
              <p>To spread the love of Christ and build a community of faith, hope, and love in Kazhakkuttom and beyond.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">📖</div>
              <h3>Our Vision</h3>
              <p>Empowering believers to live purpose-driven lives through worship, fellowship, and service to God and community.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">❤️</div>
              <h3>Our Values</h3>
              <p>Faith, Unity, Service, and Love guide everything we do as we walk together in Christ's footsteps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-content">
          <h2>Weekly Services & Events</h2>
          <div className="services-grid">
            {/* Sunday Services */}
            <div className="service-item">
              <div className="service-day">Sunday</div>
              <div className="service-details">
                <h4>🙏 English Service</h4>
                <p>7:00 AM - 8:45 AM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Sunday</div>
              <div className="service-details">
                <h4>📖 Sunday School & Bible Study</h4>
                <p>9:00 AM - 9:40 AM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Sunday</div>
              <div className="service-details">
                <h4>🙏 Malayalam Service</h4>
                <p>9:45 AM - 12:30 PM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Sunday</div>
              <div className="service-details">
                <h4>🙏 Hindi Service</h4>
                <p>4:00 PM - 5:30 PM</p>
              </div>
            </div>
            
            {/* Weekday Services */}
            <div className="service-item">
              <div className="service-day">Tuesday</div>
              <div className="service-details">
                <h4>👥 Area Meeting</h4>
                <p>7:00 PM - 9:00 PM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Wednesday</div>
              <div className="service-details">
                <h4>👶 Prayer for the Children</h4>
                <p>10:00 AM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Thursday</div>
              <div className="service-details">
                <h4>✨ Faith Alive English Service</h4>
                <p>Gathering</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Friday</div>
              <div className="service-details">
                <h4>🙏 Fasting Prayer</h4>
                <p>10:00 AM - 1:00 PM</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-day">Saturday</div>
              <div className="service-details">
                <h4>🎵 Worship Night</h4>
                <p>6:45 PM - 8:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="ministries-section">
        <div className="ministries-content">
          <h2>Our Ministries</h2>
          <div className="ministries-grid">
            <div className="ministry-card">
              <div className="ministry-icon">👶</div>
              <h4>Children's Ministry</h4>
              <p>Nurturing young hearts with Bible stories, worship, and Christian values in a fun and engaging environment.</p>
            </div>
            <div className="ministry-card">
              <div className="ministry-icon">🎓</div>
              <h4>Youth Ministry</h4>
              <p>Empowering young people to grow in faith, build friendships, and discover their purpose in Christ.</p>
            </div>
            <div className="ministry-card">
              <div className="ministry-icon">🎵</div>
              <h4>Worship Ministry</h4>
              <p>Leading the congregation in heartfelt praise and worship through music, song, and creative expression.</p>
            </div>
            <div className="ministry-card">
              <div className="ministry-icon">👨‍👩‍👧‍👦</div>
              <h4>Family Ministry</h4>
              <p>Strengthening families through biblical teaching, support groups, and community fellowship activities.</p>
            </div>
            <div className="ministry-card">
              <div className="ministry-icon">🌍</div>
              <h4>Outreach Ministry</h4>
              <p>Sharing God's love beyond our walls through community service, missions, and evangelism programs.</p>
            </div>
            <div className="ministry-card">
              <div className="ministry-icon">🙏</div>
              <h4>Prayer Ministry</h4>
              <p>Interceding for our church, community, and nation through organized prayer meetings and chains.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <h2>Life Transformations</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>This church has been a blessing to our family. The loving community and powerful worship have strengthened our faith journey.</p>
              <div className="testimonial-author">
                <strong>Br Leji</strong>
                <span>Member since 2018</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>The youth ministry changed my life! I found true friends and discovered my calling to serve God through this wonderful church family.</p>
              <div className="testimonial-author">
                <strong>Br Enos</strong>
                <span>Youth Ministry</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p>The biblical teaching and genuine fellowship here have helped me grow spiritually. This is truly a Christ-centered community.</p>
              <div className="testimonial-author">
                <strong>Sis Shruthy</strong>
                <span>Member since 2015</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Visit Us or Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <h4>Address</h4>
              <p>2nd Floor, Mak Tower, 5705/4<br/>National Highway<br/>Near Kartika Park Hotel, Kazhakuttam<br/>Thiruvananthapuram, Kerala 695582</p>
              <a href="https://maps.app.goo.gl/Wx4TuyxxA675yHzW7" target="_blank" rel="noopener noreferrer" className="map-link">
                🗺️ Open in Google Maps
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <h4>Phone</h4>
              <p>
                <a href="tel:+919847998584" className="phone-link">+91 9847998584</a>
                <br/>
                <a href="https://wa.me/919847998584" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                  💬 WhatsApp Us
                </a>
                <br/>Office Hours:<br/>Mon-Sat: 9 AM - 5 PM
              </p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <h4>Email</h4>
              <p>info@christagkazhakkuttom.org<br/>prayer@christagkazhakkuttom.org</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🌐</div>
              <h4>Connect Online</h4>
              <p>Facebook | YouTube | Instagram<br/>Join our online community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="portal-access-section">
        <div className="portal-access-content">
          <h3>Member & Staff Portal Access</h3>
          <p>Access your personal dashboard and church management tools</p>
          <div className="portal-links">
            <button className="portal-link-btn admin-link" onClick={() => navigate('/login')}>
              <span className="portal-link-icon">👨‍💼</span>
              <span className="portal-link-text">Admin Login</span>
            </button>
            <button className="portal-link-btn member-link" onClick={() => navigate('/member-portal/login')}>
              <span className="portal-link-icon">🙏</span>
              <span className="portal-link-text">Member Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={churchLogo} alt="Christ AG Church" />
            <p>Christ AG Church, Kazhakkuttom</p>
          </div>
          <div className="footer-nav">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-link">Home</button>
              <button onClick={() => window.scrollTo({ top: document.querySelector('.about-section').offsetTop, behavior: 'smooth' })} className="footer-link">About Us</button>
              <button onClick={() => window.scrollTo({ top: document.querySelector('.services-section').offsetTop, behavior: 'smooth' })} className="footer-link">Services</button>
              <button onClick={() => window.scrollTo({ top: document.querySelector('.ministries-section').offsetTop, behavior: 'smooth' })} className="footer-link">Ministries</button>
            </div>
            <div className="footer-section">
              <h4>Portal Access</h4>
              <button onClick={() => navigate('/login')} className="footer-link">Admin Login</button>
              <button onClick={() => navigate('/member-portal/login')} className="footer-link">Member Login</button>
            </div>
            <div className="footer-section">
              <h4>Connect With Us</h4>
              <p className="footer-text">Facebook | Instagram<br/>YouTube | Twitter</p>
            </div>
          </div>
          <p className="footer-copyright">
            © 2025 Christ AG Church Kazhakkuttom. All rights reserved. | Built with ❤️ for God's Glory
          </p>
          </div>
      </footer>

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <span>↑</span>
      </button>
    </div>
  );
}
export default HomePage;