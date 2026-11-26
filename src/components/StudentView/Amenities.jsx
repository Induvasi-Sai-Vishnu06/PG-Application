import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { 
  Utensils, 
  Wifi, 
  Zap, 
  Sparkles, 
  Shirt, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  Fingerprint, 
  Bike, 
  BookOpen, 
  BedDouble,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Utensils,
  Wifi,
  Zap,
  Sparkles,
  Shirt,
  Flame,
  Droplets,
  ShieldCheck,
  Fingerprint,
  Bike,
  BookOpen,
  BedDouble
};

export default function Amenities() {
  const { data } = usePG();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Food & Mess', 'Connectivity', 'Power & Comfort', 'Hygiene', 'Safety', 'Study'];

  const filteredAmenities = activeCategory === 'All'
    ? data.amenities
    : data.amenities.filter(item => item.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="facilities" className="section amenities-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Complete Comfort & Security</span>
          </div>
          <h2 className="section-title">Hostel Facilities & Amenities</h2>
          <p className="section-subtitle">
            Engineered for focused student studies and stress-free college life. No extra maintenance fees for amenities.
          </p>

          {/* Category Tabs */}
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-grid">
          {filteredAmenities.map((item, idx) => {
            const IconComp = ICON_MAP[item.icon] || Sparkles;

            return (
              <div key={idx} className="amenity-card card">
                <div className="amenity-icon-box">
                  <IconComp size={24} />
                </div>
                <div className="amenity-category-tag">{item.category}</div>
                <h3 className="amenity-title">{item.title}</h3>
                <p className="amenity-desc">{item.desc}</p>
                <div className="amenity-included-chip">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>100% Free Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .amenities-section {
          background-color: var(--bg-card);
          position: relative;
        }

        .category-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }

        .cat-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cat-pill:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .cat-pill.active {
          background: #ea580c;
          color: #fff;
          border-color: #ea580c;
          box-shadow: 0 2px 10px rgba(234, 88, 12, 0.35);
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .amenity-card {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          flex-direction: column;
          padding: 1.75rem 1.5rem;
        }

        .amenity-icon-box {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background: rgba(234, 88, 12, 0.15);
          color: #fb923c;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          border: 1px solid rgba(234, 88, 12, 0.25);
          transition: transform 0.2s ease;
        }
        .amenity-card:hover .amenity-icon-box {
          transform: scale(1.08);
          background: #ea580c;
          color: #fff;
        }

        .amenity-category-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.35rem;
        }

        .amenity-title {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .amenity-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .amenity-included-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: #34d399;
          font-weight: 600;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
}
