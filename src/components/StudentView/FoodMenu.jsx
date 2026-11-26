import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { 
  UtensilsCrossed, 
  Coffee, 
  Sun, 
  Moon, 
  Cookie, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Heart,
  Droplets,
  Flame
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function FoodMenu() {
  const { data } = usePG();
  
  // Find current day name
  const currentDayIndex = new Date().getDay();
  // Sunday is 0 in JS, let's map: 1=Mon, 2=Tue... 0=Sun
  const todayName = DAYS[currentDayIndex === 0 ? 6 : currentDayIndex - 1];
  
  const [selectedDay, setSelectedDay] = useState(todayName || 'Monday');

  const menu = data.weeklyFoodMenu[selectedDay] || data.weeklyFoodMenu.Monday;

  return (
    <section id="mess-food" className="section food-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <UtensilsCrossed size={14} />
            <span>Unlimited 3-Time Homely Andhra Mess</span>
          </div>
          <h2 className="section-title">Authentic Andhra Food Menu</h2>
          <p className="section-subtitle">
            Prepared with pure homemade ghee, fresh vegetables, fragrant Sona Masoori rice, and traditional Andhra pachadis. Veg & Non-Veg catered with love!
          </p>
        </div>

        {/* Mess Special Highlights Bar */}
        <div className="food-highlights-bar glass-panel">
          <div className="highlight-pill">
            <Heart size={18} color="#ef4444" />
            <div>
              <strong>Homely Telugu Taste:</strong>
              <span>Unlimited Ghee, Gunpowder Podi, Pappu & Gongura</span>
            </div>
          </div>
          <div className="highlight-pill">
            <Flame size={18} color="#f97316" />
            <div>
              <strong>Sunday Non-Veg Special:</strong>
              <span>Chicken Curry Feast served every Sunday</span>
            </div>
          </div>
          <div className="highlight-pill">
            <Droplets size={18} color="#10b981" />
            <div>
              <strong>Separate Veg Dishes:</strong>
              <span>100% separate cooking counter & utensils for vegetarians</span>
            </div>
          </div>
          <div className="highlight-pill">
            <Clock size={18} color="#38bdf8" />
            <div>
              <strong>College Tiffin Box:</strong>
              <span>Hot Lunch Box Packed at 7:45 AM for 8 AM Classes</span>
            </div>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="day-selector-wrapper">
          <div className="day-selector">
            {DAYS.map(day => {
              const isToday = day === todayName;
              const isSelected = day === selectedDay;
              const isSpecial = day === 'Sunday';

              return (
                <button
                  key={day}
                  type="button"
                  className={`day-btn ${isSelected ? 'active-day' : ''} ${isSpecial ? 'special-day' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="day-name">{day}</span>
                  {isToday && <span className="today-badge">Today</span>}
                  {day === 'Sunday' && <span className="feast-badge">🍗 Non-Veg & Veg 🥗</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Meals Grid */}
        <div className="meals-grid">
          {/* Breakfast Card */}
          <div className="meal-card card">
            <div className="meal-card-top">
              <div className="meal-icon-box breakfast-icon">
                <Coffee size={22} />
              </div>
              <div className="meal-info">
                <div className="meal-type">BREAKFAST</div>
                <div className="meal-time">7:30 AM - 10:00 AM</div>
              </div>
            </div>
            <div className="meal-description">
              {menu.breakfast}
            </div>
            <div className="meal-footer">
              <span className="meal-tag">Served with Hot Sambar & 2 Chutneys</span>
            </div>
          </div>

          {/* Lunch Card */}
          <div className="meal-card card highlight-meal-card">
            <div className="meal-card-top">
              <div className="meal-icon-box lunch-icon">
                <Sun size={22} />
              </div>
              <div className="meal-info">
                <div className="meal-type">{selectedDay === 'Sunday' ? 'SUNDAY SPECIAL LUNCH (NON-VEG + SEPARATE VEG)' : 'LUNCH (UNLIMITED)'}</div>
                <div className="meal-time">12:30 PM - 2:45 PM</div>
              </div>
            </div>
            <div className="meal-description">
              {selectedDay === 'Sunday' ? (
                <div className="sunday-split-menu">
                  <div className="split-counter non-veg">
                    <span className="counter-tag nv-tag">🍗 SUNDAY NON-VEG FEAST</span>
                    <p>Delicious Andhra Chicken Curry, Boiled Egg, Pepper Charu / Rasam, Steamed Sona Masoori Rice, Crispy Appadam & Curd.</p>
                  </div>
                  <div className="split-counter veg">
                    <span className="counter-tag v-tag">🥗 SEPARATE VEGETARIAN DISHES (Separate Counter)</span>
                    <p>Paneer Butter Masala / Veg Dum Biryani, Mixed Veg Kurma, Fresh Curd, Salad & Hot Gulab Jamun (cooked with separate utensils).</p>
                  </div>
                </div>
              ) : (
                menu.lunch
              )}
            </div>
            <div className="meal-footer">
              <span className="meal-tag gold">Pure Ghee, Avakaya & Fresh Curd Daily</span>
            </div>
          </div>

          {/* Evening Snack & Tea Card */}
          <div className="meal-card card">
            <div className="meal-card-top">
              <div className="meal-icon-box snack-icon">
                <Cookie size={22} />
              </div>
              <div className="meal-info">
                <div className="meal-type">EVENING REFRESHMENT</div>
                <div className="meal-time">5:00 PM - 6:30 PM</div>
              </div>
            </div>
            <div className="meal-description">
              {menu.snack}
            </div>
            <div className="meal-footer">
              <span className="meal-tag">South Indian Filter Coffee & Ginger Tea</span>
            </div>
          </div>

          {/* Dinner Card */}
          <div className="meal-card card">
            <div className="meal-card-top">
              <div className="meal-icon-box dinner-icon">
                <Moon size={22} />
              </div>
              <div className="meal-info">
                <div className="meal-type">DINNER</div>
                <div className="meal-time">7:30 PM - 10:15 PM</div>
              </div>
            </div>
            <div className="meal-description">
              {menu.dinner}
            </div>
            <div className="meal-footer">
              <span className="meal-tag">Soft Phulkas, Rice & Spiced Majjiga</span>
            </div>
          </div>
        </div>

        {/* Mess Timings Schedule Table */}
        <div className="mess-timing-card glass-panel">
          <div className="timing-header">
            <Clock size={20} color="#fbbf24" />
            <h3>Hostel Mess Schedule & Dining Rules</h3>
          </div>
          <div className="timings-grid">
            {data.messTimings.map((item, idx) => (
              <div key={idx} className="timing-item">
                <div className="timing-title">{item.title}</div>
                <div className="timing-hours">{item.time}</div>
                <div className="timing-notes">{item.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .food-section {
          background: linear-gradient(180deg, #090d16 0%, #111728 50%, #090d16 100%);
          position: relative;
        }

        .food-highlights-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .highlight-pill {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .highlight-pill strong {
          display: block;
          font-size: 0.9rem;
          color: #ffffff;
          margin-bottom: 0.15rem;
        }

        .highlight-pill span {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .day-selector-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2.25rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .day-selector {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          padding: 5px;
        }

        .day-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 0.6rem 1.15rem;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .day-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .day-btn.active-day {
          background: #ea580c;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
        }

        .today-badge {
          background: #10b981;
          color: #fff;
          font-size: 0.65rem;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-full);
        }

        .feast-badge {
          background: #f59e0b;
          color: #000;
          font-size: 0.65rem;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .meals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .meal-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #121a2d;
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .highlight-meal-card {
          border-color: rgba(234, 88, 12, 0.4);
          background: linear-gradient(180deg, #18233e 0%, #121a2d 100%);
          box-shadow: 0 8px 30px rgba(234, 88, 12, 0.15);
        }

        .meal-card-top {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }

        .meal-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .breakfast-icon {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .lunch-icon {
          background: rgba(234, 88, 12, 0.18);
          color: #fb923c;
        }
        .snack-icon {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
        }
        .dinner-icon {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }

        .meal-type {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          color: #ffffff;
          letter-spacing: 0.03em;
        }

        .meal-time {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .meal-description {
          font-size: 0.95rem;
          color: #e2e8f0;
          line-height: 1.55;
          margin-bottom: 1.5rem;
          min-height: 70px;
        }

        .sunday-split-menu {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .split-counter {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .split-counter.non-veg {
          border-color: rgba(234, 88, 12, 0.35);
          background: rgba(234, 88, 12, 0.08);
        }

        .split-counter.veg {
          border-color: rgba(16, 185, 129, 0.35);
          background: rgba(16, 185, 129, 0.08);
        }

        .counter-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 0.35rem;
        }

        .nv-tag {
          color: #fb923c;
        }

        .v-tag {
          color: #34d399;
        }

        .split-counter p {
          font-size: 0.88rem;
          color: #f1f5f9;
          line-height: 1.45;
          margin: 0;
        }

        .meal-footer {
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .meal-tag {
          display: inline-block;
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .meal-tag.gold {
          color: #fbbf24;
          font-weight: 600;
        }

        .mess-timing-card {
          padding: 1.75rem;
        }

        .timing-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .timing-header h3 {
          font-size: 1.15rem;
          color: #fff;
        }

        .timings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
        }

        .timing-item {
          background: rgba(15, 23, 42, 0.5);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .timing-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .timing-hours {
          color: #fb923c;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .timing-notes {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
