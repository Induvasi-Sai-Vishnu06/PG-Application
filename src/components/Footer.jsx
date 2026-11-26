import React from 'react';
import { usePG } from '../context/PGContext';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Heart, 
  ShieldCheck,
  UtensilsCrossed,
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const { data, stats, setActiveView, requestOwnerAccess } = usePG();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-content">
        {/* Brand & Bio */}
        <div className="footer-col brand-col">
          <div className="footer-logo" onClick={scrollToTop}>
            <div className="footer-logo-icon">
              <Building2 size={22} />
            </div>
            <div>
              <div className="footer-logo-title">Andhra <span>PG</span></div>
              <div className="footer-logo-sub">STUDENT HOSTEL & HOMELY MESS</div>
            </div>
          </div>

          <p className="footer-bio">
            Premium student hostel with authentic Andhra homestyle meals (3 times daily), 
            real-time bed availability updates, 300 Mbps high-speed Wi-Fi, and 24/7 security.
          </p>

          <div className="live-stat-badge">
            <span className="live-pulse"></span>
            <span>{stats.vacantBeds} Beds Currently Available</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links">
            <li><a href="#vacancies">Real-Time Vacancy Matrix</a></li>
            <li><a href="#holiday-notice">Holiday & Vacate WhatsApp Notice</a></li>
            <li><a href="#mess-food">Andhra Food & Sunday Non-Veg</a></li>
            <li><a href="#rent-pricing">Rent & Non-AC Pricing (₹6,500)</a></li>
            <li><a href="#facilities">Hostel Amenities & Wi-Fi</a></li>
            <li><a href="#gallery">Hostel & Dining Photos</a></li>
            <li><a href="#contact">Owner SathyaNarayana Contact</a></li>
          </ul>
        </div>

        {/* Hostel Timings & Policies */}
        <div className="footer-col">
          <h4 className="footer-heading">Mess & Gate Timings</h4>
          <ul className="footer-info-list">
            <li>
              <strong>Breakfast:</strong> 7:30 AM - 10:00 AM
            </li>
            <li>
              <strong>Lunch:</strong> 12:30 PM - 2:45 PM
            </li>
            <li>
              <strong>Sunday Lunch:</strong> Non-Veg Chicken & Separate Veg
            </li>
            <li>
              <strong>Dinner:</strong> 7:30 PM - 10:15 PM
            </li>
            <li>
              <strong>Hostel Gate:</strong> Closes at 10:00 PM
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Owner & Location</h4>
          <div className="footer-contact-box">
            <div className="contact-row">
              <Phone size={15} color="#fb923c" />
              <a href={`tel:${data.pgInfo.phone}`}>{data.pgInfo.phone}</a>
              <span style={{ color: '#64748b' }}>/</span>
              <a href={`tel:${data.pgInfo.alternatePhone}`}>{data.pgInfo.alternatePhone}</a>
            </div>
            <div className="contact-row">
              <MessageCircle size={15} color="#25D366" />
              <a 
                href={`https://wa.me/${data.pgInfo.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                +91 {data.pgInfo.phone} (WhatsApp)
              </a>
            </div>
            <div className="contact-row location-row">
              <MapPin size={15} color="#ea580c" />
              <span>Near MORE Super Market, BIET West Gate, Davangere 577004</span>
            </div>

            <button
              type="button"
              className="btn btn-outline-gold btn-sm w-full mt-3"
              onClick={requestOwnerAccess}
            >
              <ShieldCheck size={14} />
              <span>Hostel Owner Portal (Password Protected)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <div className="copyright-text">
            © {new Date().getFullYear()} Andhra PG & Homely Mess. All rights reserved. Built with pride for college students.
          </div>
          <button type="button" className="back-to-top-btn" onClick={scrollToTop} title="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          background-color: #070a12;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 4rem;
          color: #94a3b8;
          font-size: 0.88rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        @media (max-width: 992px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .footer-logo-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #ea580c, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .footer-logo-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .footer-logo-title span { color: #ea580c; }

        .footer-logo-sub {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .footer-bio {
          line-height: 1.6;
          margin-bottom: 1.25rem;
          color: #cbd5e1;
        }

        .live-stat-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .footer-heading {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 1.25rem;
          font-weight: 700;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          background: #ea580c;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #ea580c;
        }

        .footer-info-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-info-list strong {
          color: #ffffff;
        }

        .footer-contact-box {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .contact-row a {
          color: #cbd5e1;
          text-decoration: none;
        }
        .contact-row a:hover {
          color: #fff;
        }

        .location-row {
          align-items: flex-start;
          line-height: 1.4;
        }

        .mt-3 {
          margin-top: 0.75rem;
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.25rem 0;
          background: #05070d;
        }

        .bottom-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-subtle);
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .back-to-top-btn:hover {
          color: #ea580c;
        }
      `}</style>
    </footer>
  );
}
