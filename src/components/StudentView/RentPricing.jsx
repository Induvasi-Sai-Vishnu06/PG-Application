import React from 'react';
import { usePG } from '../../context/PGContext';
import { 
  Check, 
  Sparkles, 
  CalendarCheck, 
  MessageCircle, 
  ShieldCheck, 
  Zap,
  BadgeCheck
} from 'lucide-react';

export default function RentPricing() {
  const { data, setIsVisitModalOpen, setSelectedVisitRoom } = usePG();

  const handleSelectPlan = (plan) => {
    setSelectedVisitRoom({
      sharingPlan: plan.sharing,
      type: 'NON-AC'
    });
    setIsVisitModalOpen(true);
  };

  const getWhatsAppPlanLink = (plan) => {
    const text = `Hi ${data.pgInfo.ownerName} sir, I am inquiring about the 4-Sharing Non-AC room at Andhra PG (₹${data.pgInfo.costPerCandidate}/month). Are there beds vacant for me to book?`;
    return `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rent-pricing" className="section pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} />
            <span>Zero Brokerage • Direct Owner SathyaNarayana</span>
          </div>
          <h2 className="section-title">Transparent Monthly Rent Plan</h2>
          <p className="section-subtitle">
            Simple, honest, all-inclusive pricing with zero hidden maintenance charges. Every room is a spacious, well-ventilated Non-AC room with attached washroom.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {data.rentPricingList.map((plan, idx) => (
            <div
              key={idx}
              className="pricing-card card popular-card"
            >
              <div className="popular-ribbon">
                <Sparkles size={13} />
                <span>All-Inclusive Student Plan</span>
              </div>

              <div className="pricing-card-header">
                <div className="plan-badge">FIXED MONTHLY RATE</div>
                <h3 className="plan-name">4-Sharing Non-AC Room</h3>
                
                <div className="price-tag-wrap">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">6,500</span>
                  <span className="price-unit">/ candidate per month</span>
                </div>
                <div className="price-subtext">
                  ✨ Includes 3x Daily Andhra Mess Meals + Sunday Chicken / Separate Veg Feast + 5G Wi-Fi
                </div>
              </div>

              <div className="plan-deposit-row">
                <div className="deposit-item">
                  <span className="deposit-label">Security Deposit:</span>
                  <span className="deposit-val">₹2,000 (100% Refundable)</span>
                </div>
                <div className="deposit-item">
                  <span className="deposit-label">Cooling:</span>
                  <span className="deposit-val non-ac-tag">All Rooms Non-AC</span>
                </div>
              </div>

              <div className="plan-features-list">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="feature-item">
                    <div className="check-bullet">
                      <Check size={14} color="#10b981" />
                    </div>
                    <span className="feature-text">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pricing-card-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => handleSelectPlan(plan)}
                >
                  <CalendarCheck size={16} />
                  <span>Schedule a Free Visit Pass</span>
                </button>

                <a
                  href={getWhatsAppPlanLink(plan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm btn-block"
                >
                  <MessageCircle size={15} />
                  <span>Book with SathyaNarayana Sir via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}

          {/* Value Highlights Column */}
          <div className="pricing-breakdown-card card glass-panel">
            <div className="breakdown-header">
              <BadgeCheck size={24} color="#10b981" />
              <div>
                <h3 className="breakdown-title">What Makes ₹6,500 The Best Value?</h3>
                <p className="breakdown-sub">Everything BIET and college students need for a comfortable, stress-free stay:</p>
              </div>
            </div>

            <div className="perk-breakdown-list">
              <div className="perk-row">
                <div className="perk-icon-circle green">🍛</div>
                <div>
                  <strong>Unlimited 3-Time Homely Andhra Meals:</strong>
                  <p>Pure ghee, hot Sona Masoori rice, authentic pappu, gongura, fresh curd, and hot snacks daily.</p>
                </div>
              </div>

              <div className="perk-row">
                <div className="perk-icon-circle orange">🍗</div>
                <div>
                  <strong>Sunday Non-Veg & Separate Veg Feast:</strong>
                  <p>Delicious chicken curry feast every Sunday, with separate pure vegetarian dishes & utensils for veg students.</p>
                </div>
              </div>

              <div className="perk-row">
                <div className="perk-icon-circle blue">⚡</div>
                <div>
                  <strong>Zero Extra Utility Bills:</strong>
                  <p>Electricity for lights, ceiling fans, mobile/laptop chargers, and 24/7 hot water geyser is completely included.</p>
                </div>
              </div>

              <div className="perk-row">
                <div className="perk-icon-circle purple">🌐</div>
                <div>
                  <strong>Dual Floor 5G Wi-Fi:</strong>
                  <p>Dedicated routers on Ground Floor and First Floor ensure buffer-free online studies and coding lab assignments.</p>
                </div>
              </div>

              <div className="perk-row">
                <div className="perk-icon-circle teal">🧺</div>
                <div>
                  <strong>Automatic Washing Machine & Cleaning:</strong>
                  <p>Free laundry access on the terrace and daily room mopping by housekeeping staff.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Electricity & Deposit Policy Card */}
        <div className="pricing-policy-card glass-panel">
          <div className="policy-header">
            <Zap size={20} color="#f59e0b" />
            <h4>Fair & Transparent PG Policies</h4>
          </div>
          <div className="policy-points">
            <div className="policy-point">
              <strong>Fixed Rent:</strong> ₹6,500 per month per candidate for 4-sharing Non-AC room. No extra charges for water, Wi-Fi, or room electricity.
            </div>
            <div className="policy-point">
              <strong>Holiday / Vacating Notice:</strong> Students going on holidays or vacating the hostel must inform owner SathyaNarayana sir via WhatsApp in advance.
            </div>
            <div className="policy-point">
              <strong>Security Deposit:</strong> ₹2,000 (100% refundable on checkout). Zero brokerage or agent commissions.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .pricing-cards-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
          align-items: stretch;
        }

        @media (max-width: 992px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .pricing-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #111a30;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
        }

        .popular-card {
          border-color: #ea580c;
          background: linear-gradient(180deg, #18233e 0%, #111a30 100%);
          box-shadow: 0 10px 35px rgba(234, 88, 12, 0.2);
        }

        .popular-ribbon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ea580c;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.4);
        }

        .plan-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fb923c;
          letter-spacing: 0.06em;
          margin-bottom: 0.4rem;
        }

        .plan-name {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .price-tag-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          margin-bottom: 0.5rem;
        }

        .price-currency {
          font-size: 1.6rem;
          font-weight: 700;
          color: #fbbf24;
        }

        .price-amount {
          font-size: 2.75rem;
          font-weight: 800;
          color: #ffffff;
          font-family: var(--font-heading);
          line-height: 1;
        }

        .price-unit {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .price-subtext {
          font-size: 0.85rem;
          color: #38bdf8;
          line-height: 1.45;
          margin-bottom: 1.25rem;
        }

        .plan-deposit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .deposit-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-right: 0.35rem;
        }

        .deposit-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .non-ac-tag {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .check-bullet {
          margin-top: 0.15rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-text {
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .pricing-card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        /* Breakdown Card */
        .pricing-breakdown-card {
          padding: 2.25rem 2rem;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }

        .breakdown-header {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .breakdown-title {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .breakdown-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .perk-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .perk-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .perk-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          flex-shrink: 0;
        }

        .perk-icon-circle.green { background: rgba(16, 185, 129, 0.15); }
        .perk-icon-circle.orange { background: rgba(234, 88, 12, 0.15); }
        .perk-icon-circle.blue { background: rgba(56, 189, 248, 0.15); }
        .perk-icon-circle.purple { background: rgba(168, 85, 247, 0.15); }
        .perk-icon-circle.teal { background: rgba(20, 184, 166, 0.15); }

        .perk-row strong {
          display: block;
          color: #ffffff;
          font-size: 0.88rem;
          margin-bottom: 0.2rem;
        }

        .perk-row p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        .pricing-policy-card {
          padding: 1.5rem 1.75rem;
          border-radius: var(--radius-lg);
          background: rgba(15, 23, 42, 0.6);
        }

        .policy-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .policy-header h4 {
          font-size: 1rem;
          color: #fbbf24;
          margin: 0;
        }

        .policy-points {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .policy-point {
          font-size: 0.82rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        .policy-point strong {
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
