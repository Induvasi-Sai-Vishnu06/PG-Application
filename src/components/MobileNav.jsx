import React from 'react';
import { usePG } from '../context/PGContext';
import { Bed, UtensilsCrossed, DollarSign, Phone, MessageCircle } from 'lucide-react';

export default function MobileNav() {
  const { data, stats, activeView } = usePG();

  if (activeView !== 'student') return null;

  const whatsappUrl = `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
    `Hello ${data.pgInfo.ownerName}, I am browsing Andhra PG on my phone. Are there beds vacant?`
  )}`;

  return (
    <div className="mobile-bottom-bar mobile-only">
      <a href="#vacancies" className="mobile-bar-item">
        <div className="bar-icon-wrap">
          <Bed size={20} />
          {stats.vacantBeds > 0 && <span className="bar-badge">{stats.vacantBeds}</span>}
        </div>
        <span>Vacancy</span>
      </a>

      <a href="#holiday-notice" className="mobile-bar-item notice-item">
        <div className="bar-icon-wrap">
          <MessageCircle size={20} />
          <span className="notice-dot"></span>
        </div>
        <span>Notice</span>
      </a>

      <a href="#mess-food" className="mobile-bar-item">
        <div className="bar-icon-wrap">
          <UtensilsCrossed size={20} />
        </div>
        <span>Food</span>
      </a>

      <a href="#rent-pricing" className="mobile-bar-item">
        <div className="bar-icon-wrap">
          <DollarSign size={20} />
        </div>
        <span>₹6,500</span>
      </a>

      <a href={`tel:${data.pgInfo.phone}`} className="mobile-bar-item call-item" title="Call SathyaNarayana">
        <div className="bar-icon-wrap">
          <Phone size={20} />
        </div>
        <span>Call</span>
      </a>

      <style>{`
        .mobile-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0.5rem 0.25rem 0.6rem 0.25rem;
          z-index: 998;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
        }

        .mobile-bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 600;
          transition: color 0.2s;
          flex: 1;
        }

        .bar-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bar-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background: #10b981;
          color: #fff;
          font-size: 0.6rem;
          padding: 0.05rem 0.35rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .notice-item {
          color: #25D366;
        }

        .notice-dot {
          position: absolute;
          top: -2px;
          right: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #25D366;
          border: 1px solid #0f172a;
        }

        .mobile-bar-item:hover, .mobile-bar-item:active {
          color: #ea580c;
        }

        .call-item {
          color: #60a5fa;
        }

        .whatsapp-item {
          color: #25D366;
        }
      `}</style>
    </div>
  );
}
