import React from 'react';
import { usePG } from '../../context/PGContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Reviews() {
  const { data } = usePG();

  return (
    <section className="section reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>Student & Parent Testimonials</span>
          </div>
          <h2 className="section-title">Loved by 160+ College Residents</h2>
          <p className="section-subtitle">
            See what students from GITAM, Gayatri Vidya Parishad, and tech interns say about the food and living environment at Andhra PG.
          </p>
        </div>

        {/* Rating Overview Summary */}
        <div className="rating-summary-card glass-panel">
          <div className="rating-score-box">
            <div className="big-rating-number">4.8</div>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div className="total-reviews-count">Based on 164 Google Verified Reviews</div>
          </div>

          <div className="rating-bars-box">
            <div className="score-meter">
              <span className="meter-label">Andhra Mess Food Quality</span>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '98%' }}></div></div>
              <span className="meter-val">4.9 / 5</span>
            </div>
            <div className="score-meter">
              <span className="meter-label">Daily Cleanliness & Hygiene</span>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '96%' }}></div></div>
              <span className="meter-val">4.8 / 5</span>
            </div>
            <div className="score-meter">
              <span className="meter-label">5G Wi-Fi Speed & Uptime</span>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '97%' }}></div></div>
              <span className="meter-val">4.8 / 5</span>
            </div>
            <div className="score-meter">
              <span className="meter-label">Security & Owner Friendliness</span>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '100%' }}></div></div>
              <span className="meter-val">5.0 / 5</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {data.reviews.map((rev, index) => (
            <div key={index} className="review-card card">
              <div className="quote-icon">
                <Quote size={28} color="rgba(234, 88, 12, 0.3)" />
              </div>

              <div className="stars-line">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="review-comment">"{rev.comment}"</p>

              <div className="reviewer-profile">
                <div className="reviewer-avatar">{rev.avatar}</div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{rev.name}</div>
                  <div className="reviewer-role">{rev.role}</div>
                </div>
                <div className="review-date">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-section {
          background-color: var(--bg-card);
          position: relative;
        }

        .rating-summary-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          padding: 2rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        @media (max-width: 820px) {
          .rating-summary-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        .rating-score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding-right: 2rem;
        }

        @media (max-width: 820px) {
          .rating-score-box {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-right: 0;
            padding-bottom: 1.5rem;
          }
        }

        .big-rating-number {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0.5rem;
        }

        .total-reviews-count {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .rating-bars-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .score-meter {
          display: grid;
          grid-template-columns: 180px 1fr 60px;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 600px) {
          .score-meter {
            grid-template-columns: 130px 1fr 50px;
            font-size: 0.78rem;
          }
        }

        .meter-label {
          font-size: 0.85rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .meter-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .meter-fill {
          height: 100%;
          background: linear-gradient(90deg, #ea580c, #f59e0b);
          border-radius: var(--radius-full);
        }

        .meter-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          text-align: right;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .review-card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .quote-icon {
          position: absolute;
          top: 1rem;
          right: 1.25rem;
        }

        .stars-line {
          display: flex;
          gap: 0.2rem;
          margin-bottom: 1rem;
        }

        .review-comment {
          font-size: 0.92rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .reviewer-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .reviewer-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ea580c;
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reviewer-info {
          flex: 1;
        }

        .reviewer-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .reviewer-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .review-date {
          font-size: 0.72rem;
          color: var(--text-subtle);
        }
      `}</style>
    </section>
  );
}
