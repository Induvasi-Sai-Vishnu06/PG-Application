import React from 'react';
import { usePG } from '../../context/PGContext';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Check, 
  Navigation,
  CalendarCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function ContactCard() {
  const { data, setIsVisitModalOpen } = usePG();

  const whatsappUrl = `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
    `Hello ${data.pgInfo.ownerName}, I would like to visit Andhra PG. Please share the exact location pin and vacancy details.`
  )}`;

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${data.pgInfo.name}, ${data.pgInfo.address}`
  )}`;

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Phone size={14} />
            <span>Direct Owner Connect</span>
          </div>
          <h2 className="section-title">Reach Out to Andhra PG</h2>
          <p className="section-subtitle">
            Zero agents or middlemen. Contact PG owner & warden directly via WhatsApp or phone call for immediate room reservations.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column: Owner Contact Card */}
          <div className="owner-profile-card card glass-panel">
            <div className="owner-header">
              <div className="owner-big-avatar">
                <span>SN</span>
              </div>
              <div>
                <div className="owner-designation">{data.pgInfo.ownerRole}</div>
                <h3 className="owner-full-name">{data.pgInfo.ownerName}</h3>
                <span className="owner-status-badge">🟢 Available for calls (8:00 AM - 10:00 PM)</span>
              </div>
            </div>

            <div className="contact-details-list">
              {/* WhatsApp Item */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-row whatsapp-row"
              >
                <div className="item-icon-box whatsapp-bg">
                  <MessageCircle size={20} />
                </div>
                <div className="item-info">
                  <span className="item-label">WhatsApp Owner (Fastest Response)</span>
                  <span className="item-val">+91 {data.pgInfo.phone}</span>
                </div>
                <span className="chat-action-tag">Chat Now &rarr;</span>
              </a>

              {/* Primary Call Item */}
              <a
                href={`tel:${data.pgInfo.phone}`}
                className="contact-item-row"
              >
                <div className="item-icon-box call-bg">
                  <Phone size={20} />
                </div>
                <div className="item-info">
                  <span className="item-label">Primary Mobile Phone (SathyaNarayana)</span>
                  <span className="item-val">{data.pgInfo.phone}</span>
                </div>
                <span className="call-action-tag">Call Now</span>
              </a>

              {/* Alternate Phone */}
              <a
                href={`tel:${data.pgInfo.alternatePhone}`}
                className="contact-item-row"
              >
                <div className="item-icon-box call-bg">
                  <Phone size={20} />
                </div>
                <div className="item-info">
                  <span className="item-label">Alternate Contact Number</span>
                  <span className="item-val">{data.pgInfo.alternatePhone}</span>
                </div>
                <span className="call-action-tag">Call</span>
              </a>

              {/* Address */}
              <div className="contact-item-row address-row">
                <div className="item-icon-box location-bg">
                  <MapPin size={20} />
                </div>
                <div className="item-info">
                  <span className="item-label">PG Address & Location</span>
                  <span className="item-val address-text">{data.pgInfo.address}</span>
                  <span className="landmark-tag">📍 Landmark: {data.pgInfo.landmark}</span>
                </div>
              </div>
            </div>

            {/* Google Map Directions & Visit Buttons */}
            <div className="owner-card-footer">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                <Navigation size={16} />
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>

              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => setIsVisitModalOpen(true)}
              >
                <CalendarCheck size={16} />
                <span>Schedule In-Person Visit Pass</span>
              </button>
            </div>
          </div>

          {/* Right Column: House Rules & Guidelines */}
          <div className="rules-card card">
            <div className="rules-card-top">
              <div className="rules-icon-box">
                <ShieldAlert size={22} color="#f59e0b" />
              </div>
              <div>
                <h3 className="rules-card-title">Hostel Code of Conduct & Rules</h3>
                <span className="rules-card-sub">For a peaceful, disciplined & safe student environment</span>
              </div>
            </div>

            <div className="rules-list">
              {data.houseRules.map((rule, idx) => (
                <div key={idx} className="rule-item">
                  <div className="rule-bullet">
                    <span>{idx + 1}</span>
                  </div>
                  <div className="rule-content">{rule}</div>
                </div>
              ))}
            </div>

            {/* Student Holiday & Vacate WhatsApp Reminder Callout */}
            <div className="holiday-contact-callout glass-panel">
              <MessageCircle size={20} color="#25D366" />
              <div>
                <strong>Student Holiday & Vacating Notice:</strong>
                <p>Hostel students having holidays or vacating must text owner SathyaNarayana sir through WhatsApp in advance.</p>
                <a href="#holiday-notice" className="quick-notice-link">
                  Open Holiday / Vacate Notice Form &rarr;
                </a>
              </div>
            </div>

            <div className="gate-timing-box">
              <Clock size={18} color="#ea580c" />
              <div>
                <strong>Hostel Gate Timings:</strong>
                <span>{data.pgInfo.gateClosingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .owner-profile-card {
          padding: 2rem;
          background: #111a30;
        }

        .owner-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .owner-big-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4);
        }

        .owner-designation {
          font-size: 0.75rem;
          color: #fb923c;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .owner-full-name {
          font-size: 1.45rem;
          color: #ffffff;
          margin: 0.15rem 0 0.35rem 0;
        }

        .owner-status-badge {
          display: inline-block;
          font-size: 0.75rem;
          color: #34d399;
          font-weight: 500;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-bottom: 1.75rem;
        }

        .contact-item-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }
        .contact-item-row:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }

        .whatsapp-row {
          border-color: rgba(37, 211, 102, 0.3);
          background: rgba(37, 211, 102, 0.06);
        }
        .whatsapp-row:hover {
          background: rgba(37, 211, 102, 0.12);
        }

        .item-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .whatsapp-bg {
          background: rgba(37, 211, 102, 0.2);
          color: #25D366;
        }
        .call-bg {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }
        .email-bg {
          background: rgba(168, 85, 247, 0.2);
          color: #c084fc;
        }
        .location-bg {
          background: rgba(234, 88, 12, 0.2);
          color: #fb923c;
        }

        .item-info {
          flex: 1;
        }

        .item-label {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .item-val {
          display: block;
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 600;
        }

        .address-text {
          font-size: 0.85rem;
          line-height: 1.4;
          font-weight: 400;
          color: #cbd5e1;
        }

        .landmark-tag {
          display: block;
          font-size: 0.75rem;
          color: #fbbf24;
          margin-top: 0.2rem;
        }

        .chat-action-tag {
          font-size: 0.8rem;
          color: #25D366;
          font-weight: 700;
        }

        .call-action-tag {
          font-size: 0.8rem;
          color: #60a5fa;
          font-weight: 600;
        }

        .owner-card-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rules-card {
          background: #111a30;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .rules-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .rules-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(245, 158, 11, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rules-card-title {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }

        .rules-card-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
          flex: 1;
        }

        .rule-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .rule-bullet {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(234, 88, 12, 0.2);
          color: #fb923c;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .rule-content {
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.45;
        }

        .gate-timing-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(234, 88, 12, 0.1);
          border: 1px solid rgba(234, 88, 12, 0.25);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: #e2e8f0;
          margin-bottom: 0.75rem;
        }
        .gate-timing-box strong {
          display: block;
          color: #fb923c;
          font-size: 0.8rem;
        }

        .holiday-contact-callout {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: rgba(37, 211, 102, 0.08);
          border: 1px solid rgba(37, 211, 102, 0.25);
          padding: 1rem 1.15rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .holiday-contact-callout strong {
          display: block;
          color: #25D366;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }

        .holiday-contact-callout p {
          font-size: 0.82rem;
          color: #cbd5e1;
          margin: 0 0 0.5rem 0;
          line-height: 1.45;
        }

        .quick-notice-link {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fb923c;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
