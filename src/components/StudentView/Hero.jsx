import React from 'react';
import { usePG } from '../../context/PGContext';
import { 
  Bed, 
  UtensilsCrossed, 
  Wifi, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  CalendarCheck,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Hero() {
  const { data, stats, setIsVisitModalOpen } = usePG();

  const whatsappUrl = `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
    `Hi ${data.pgInfo.ownerName}, I am a student looking for PG accommodation. Please share vacancy details for Andhra PG.`
  )}`;

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="hero-grid-pattern"></div>

      <div className="container hero-container">
        {/* Left Column: Core Value Proposition */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-pulse"></span>
            <span>Real-Time Bed Vacancy Live Sync</span>
            <span className="hero-badge-tag">{stats.vacantBeds} Beds Free</span>
          </div>

          <h1 className="hero-title">
            Stay Homely. <br />
            Eat Authentic <span className="highlight-text">Andhra Mess.</span>
          </h1>

          <p className="hero-description">
            The most preferred hostel for college students & young IT professionals. 
            Enjoy unlimited 3-time Andhra meals with pure ghee, gongura, and crispy snacks, 
            instant 5G Wi-Fi, 24/7 power backup, and transparent real-time room availability.
          </p>

          {/* Quick Perks List */}
          <div className="hero-perks">
            <div className="perk-item">
              <CheckCircle2 size={16} color="#10b981" />
              <span>3x Daily Andhra Homely Meals</span>
            </div>
            <div className="perk-item">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Zero Brokerage & Transparent Rent</span>
            </div>
            <div className="perk-item">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Direct Owner WhatsApp & Calling</span>
            </div>
            <div className="perk-item">
              <CheckCircle2 size={16} color="#10b981" />
              <span>High Speed 5G Wi-Fi on Every Floor</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <a href="#vacancies" className="btn btn-primary btn-lg">
              <Bed size={20} />
              <span>Check Vacant Rooms</span>
              <ChevronRight size={18} />
            </a>

            <button
              type="button"
              className="btn btn-outline-gold btn-lg"
              onClick={() => setIsVisitModalOpen(true)}
            >
              <CalendarCheck size={18} />
              <span>Schedule Free Visit</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Owner</span>
            </a>
          </div>

          {/* Location Landmark note */}
          <div className="hero-location-note">
            <MapPin size={16} color="#ea580c" />
            <span>
              <strong>Prime Location:</strong> {data.pgInfo.landmark} — {data.pgInfo.address.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Right Column: Hero Live Snapshot Card */}
        <div className="hero-card-col">
          <div className="hero-feature-card glass-panel">
            <div className="card-top-bar">
              <div className="hostel-badge">
                <Sparkles size={16} color="#f59e0b" />
                <span>Verified Hostel Listing</span>
              </div>
              <div className="rating-pill">
                ⭐ {data.pgInfo.rating} <span>({data.pgInfo.reviewCount}+ students)</span>
              </div>
            </div>

            <div className="hero-card-image-box">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                alt="Andhra PG Building and Student Rooms"
                className="hero-img"
              />
              <div className="image-overlay-badge">
                <span className="live-pulse"></span>
                <span>Active Booking Open</span>
              </div>
            </div>

            <div className="hero-live-stats-matrix">
              <div className="stat-box">
                <div className="stat-number green-text">{stats.vacantBeds}</div>
                <div className="stat-label">Available Beds Now</div>
              </div>
              <div className="stat-box">
                <div className="stat-number gold-text">₹6,500</div>
                <div className="stat-label">Fixed Rent / Mo (Non-AC)</div>
              </div>
              <div className="stat-box">
                <div className="stat-number orange-text">3x Daily</div>
                <div className="stat-label">Andhra Homely Mess</div>
              </div>
              <div className="stat-box">
                <div className="stat-number blue-text">300 Mbps</div>
                <div className="stat-label">5G High-Speed Wi-Fi</div>
              </div>
            </div>

            {/* Quick Owner Connect Callout */}
            <div className="owner-connect-callout">
              <div className="owner-avatar">
                <span>SN</span>
              </div>
              <div className="owner-info">
                <div className="owner-name">{data.pgInfo.ownerName} (Owner)</div>
                <div className="owner-title">{data.pgInfo.phone} • {data.pgInfo.alternatePhone}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <a href={`tel:${data.pgInfo.phone}`} className="call-round-btn" title={`Call ${data.pgInfo.phone}`}>
                  <PhoneCall size={16} />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="call-round-btn whatsapp-round" title="WhatsApp Owner">
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 4.5rem 0 3.5rem 0;
          overflow: hidden;
          background: radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.12) 0%, transparent 45%),
                      radial-gradient(circle at 90% 80%, rgba(30, 58, 138, 0.15) 0%, transparent 50%),
                      #090d16;
        }

        .hero-bg-glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 350px;
          background: radial-gradient(circle, rgba(234, 88, 12, 0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .hero-badge-tag {
          background: #10b981;
          color: #ffffff;
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .hero-title {
          font-size: 3.2rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.3rem;
          }
        }

        .highlight-text {
          background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.1rem;
          color: #cbd5e1;
          line-height: 1.65;
          margin-bottom: 1.75rem;
          max-width: 620px;
        }

        .hero-perks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 600px) {
          .hero-perks {
            grid-template-columns: 1fr;
          }
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #e2e8f0;
          font-weight: 500;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .hero-location-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.06);
          width: fit-content;
        }

        .hero-feature-card {
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          position: relative;
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .hostel-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .rating-pill {
          font-size: 0.82rem;
          font-weight: 600;
          color: #fff;
        }
        .rating-pill span {
          color: var(--text-muted);
          font-weight: 400;
        }

        .hero-card-image-box {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 1.25rem;
          aspect-ratio: 16 / 9;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .hero-feature-card:hover .hero-img {
          transform: scale(1.03);
        }

        .image-overlay-badge {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: #34d399;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .hero-live-stats-matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .stat-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          text-align: center;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0.2rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .green-text { color: #34d399; }
        .gold-text { color: #fbbf24; }
        .orange-text { color: #fb923c; }
        .blue-text { color: #60a5fa; }

        .owner-connect-callout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(234, 88, 12, 0.1);
          border: 1px solid rgba(234, 88, 12, 0.25);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }

        .owner-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ea580c;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .owner-info {
          flex: 1;
          margin-left: 0.75rem;
        }

        .owner-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #ffffff;
        }

        .owner-title {
          font-size: 0.75rem;
          color: #fb923c;
        }

        .call-round-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }
        .call-round-btn:hover {
          transform: scale(1.08);
          background: #1d4ed8;
        }

        .whatsapp-round {
          background: #25D366;
        }
        .whatsapp-round:hover {
          background: #1ebd5a;
        }
      `}</style>
    </section>
  );
}
