import React, { useState } from 'react';
import { usePG } from '../context/PGContext';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  UserCheck, 
  Compass, 
  Menu, 
  X,
  Sparkles,
  Bed,
  UtensilsCrossed,
  DollarSign,
  Lock,
  LogOut,
  MapPin
} from 'lucide-react';

export default function Header() {
  const { 
    data, 
    stats, 
    activeView, 
    setActiveView, 
    isOwnerAuthenticated, 
    requestOwnerAccess, 
    logoutOwner,
    setIsVisitModalOpen 
  } = usePG();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
    `Hello SathyaNarayana sir, I am a BIET/college student inquiring about room vacancy at Andhra PG Davangere.`
  )}`;

  return (
    <header className="header-wrapper">
      {/* Top Notification Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="live-status-chip">
            <span className="live-pulse"></span>
            <span className="live-text">
              <strong>LIVE VACANCY:</strong> {stats.vacantBeds} beds available across 2 floors (Ground & 1st Floor)
            </span>
          </div>

          <div className="top-contact-links">
            <span className="location-quick-chip">
              <MapPin size={12} color="#fb923c" />
              Near MORE Super Market • BIET West Gate
            </span>
            <a href={`tel:${data.pgInfo.phone}`} className="top-link" title="Call Owner SathyaNarayana">
              <Phone size={13} />
              <span>{data.pgInfo.phone}</span>
            </a>
            <a href={`tel:${data.pgInfo.alternatePhone}`} className="top-link" title="Call Alternate Number">
              <Phone size={13} />
              <span>{data.pgInfo.alternatePhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar container">
        <div className="brand-logo" onClick={() => setActiveView('student')} role="button">
          <div className="logo-icon-box">
            <Building2 className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Andhra <span className="brand-highlight">PG</span>
            </div>
            <div className="brand-tagline">DAVANGERE • BIET WEST GATE</div>
          </div>
        </div>

        {/* Desktop Navigation Links (when in Student View) */}
        {activeView === 'student' ? (
          <div className="nav-links desktop-only">
            <a href="#vacancies" className="nav-link">
              <Bed size={16} />
              <span>Rooms ({stats.vacantBeds} Vacant)</span>
            </a>
            <a href="#holiday-notice" className="nav-link notice-highlight-link">
              <MessageCircle size={15} color="#25D366" />
              <span>Holiday/Vacate Notice</span>
            </a>
            <a href="#mess-food" className="nav-link">
              <UtensilsCrossed size={16} />
              <span>Food & Sunday Feast</span>
            </a>
            <a href="#rent-pricing" className="nav-link">
              <DollarSign size={16} />
              <span>Rent (₹6,500)</span>
            </a>
            <a href="#facilities" className="nav-link">Facilities</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        ) : (
          <div className="owner-active-tag desktop-only">
            <ShieldCheck size={18} color="#10b981" />
            <span>Owner Management Session Active (SathyaNarayana)</span>
          </div>
        )}

        {/* View Switcher & Action Buttons */}
        <div className="header-actions">
          {/* User Mode Switcher Pill with Security */}
          <div className="role-switcher">
            <button
              type="button"
              className={`role-btn ${activeView === 'student' ? 'active-role' : ''}`}
              onClick={() => setActiveView('student')}
              title="Browse as a student looking for room"
            >
              <Compass size={15} />
              <span className="role-label">Student View</span>
            </button>

            {isOwnerAuthenticated && activeView === 'owner' ? (
              <button
                type="button"
                className="role-btn active-role owner-role"
                onClick={logoutOwner}
                title="Lock Owner Portal & Return to Student View"
              >
                <LogOut size={14} />
                <span className="role-label">Lock Portal</span>
              </button>
            ) : (
              <button
                type="button"
                className={`role-btn ${activeView === 'owner' ? 'active-role owner-role' : ''}`}
                onClick={requestOwnerAccess}
                title="Secure Owner Portal (Password Protected)"
              >
                <Lock size={13} color="#fb923c" />
                <span className="role-label">Owner Portal</span>
              </button>
            )}
          </div>

          {/* Quick Direct Connect Buttons */}
          <div className="quick-connect desktop-only">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              title="Chat with SathyaNarayana on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${data.pgInfo.phone}`}
              className="btn btn-call btn-sm"
              title={`Call ${data.pgInfo.phone}`}
            >
              <Phone size={15} />
              <span>{data.pgInfo.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-panel">
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-role">
              <span className="drawer-role-label">Select Mode:</span>
              <div className="role-switcher mobile-switcher">
                <button
                  type="button"
                  className={`role-btn ${activeView === 'student' ? 'active-role' : ''}`}
                  onClick={() => {
                    setActiveView('student');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Compass size={15} />
                  <span>Student View</span>
                </button>
                <button
                  type="button"
                  className={`role-btn ${activeView === 'owner' ? 'active-role owner-role' : ''}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    requestOwnerAccess();
                  }}
                >
                  <Lock size={14} />
                  <span>Owner Portal 🔒</span>
                </button>
              </div>
            </div>

            {activeView === 'student' && (
              <div className="mobile-nav-items">
                <a href="#vacancies" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <Bed size={18} />
                  <span>Rooms ({stats.vacantBeds} Beds Vacant)</span>
                </a>
                <a href="#holiday-notice" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <MessageCircle size={18} color="#25D366" />
                  <span>Holiday & Vacating WhatsApp Notice</span>
                </a>
                <a href="#mess-food" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <UtensilsCrossed size={18} />
                  <span>Andhra Mess & Sunday Non-Veg</span>
                </a>
                <a href="#rent-pricing" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <DollarSign size={18} />
                  <span>Fixed Rent (₹6,500/Month)</span>
                </a>
                <a href="#facilities" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <Sparkles size={18} />
                  <span>Hostel Facilities</span>
                </a>
                <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <span>SathyaNarayana Contact & Address</span>
                </a>
              </div>
            )}

            <div className="mobile-drawer-cta">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsVisitModalOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Schedule Visit Pass
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={16} />
                <span>WhatsApp SathyaNarayana</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-wrapper {
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(9, 13, 22, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .top-banner {
          background: linear-gradient(90deg, #182238 0%, #1a162b 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.35rem 0;
          font-size: 0.78rem;
        }

        .top-banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .live-status-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e2e8f0;
        }

        .live-text strong {
          color: #34d399;
          letter-spacing: 0.03em;
        }

        .top-contact-links {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }

        .location-quick-chip {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #fbbf24;
          font-weight: 500;
        }

        .top-link {
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .top-link:hover {
          color: #38bdf8;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .logo-icon-box {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(234, 88, 12, 0.4);
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        .brand-highlight {
          color: #ea580c;
        }

        .brand-tagline {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .owner-active-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .role-switcher {
          display: flex;
          align-items: center;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          padding: 3px;
        }

        .role-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-btn.active-role {
          background: #ea580c;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.35);
        }

        .role-btn.active-role.owner-role {
          background: #10b981;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
        }

        .quick-connect {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-toggle-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          padding: 0.45rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: none;
        }

        .mobile-only {
          display: none;
        }

        .desktop-only {
          display: flex;
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .top-contact-links {
            display: none;
          }
        }

        .mobile-drawer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          background: #111a30;
        }

        .mobile-drawer-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .drawer-role-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .mobile-switcher {
          width: 100%;
          justify-content: space-between;
        }
        .mobile-switcher .role-btn {
          flex: 1;
          justify-content: center;
        }

        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #e2e8f0;
          text-decoration: none;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          font-size: 0.95rem;
        }

        .mobile-drawer-cta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </header>
  );
}
