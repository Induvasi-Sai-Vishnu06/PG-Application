import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { 
  Bed, 
  Layers, 
  Wind, 
  Bath, 
  Building, 
  MessageCircle, 
  CalendarCheck, 
  Lock
} from 'lucide-react';

export default function VacancyMatrix() {
  const { 
    data, 
    stats, 
    activeFloorFilter, 
    setActiveFloorFilter,
    setSelectedVisitRoom,
    setIsVisitModalOpen,
    requestOwnerAccess
  } = usePG();

  const [onlyVacant, setOnlyVacant] = useState(false);

  // Filter floors and rooms
  const filteredFloors = data.floors.map(floor => {
    if (activeFloorFilter !== 'all' && floor.id !== activeFloorFilter) {
      return null;
    }

    const filteredRooms = floor.rooms.filter(room => {
      if (onlyVacant) {
        const hasVacantBed = room.beds.some(b => !b.isOccupied);
        if (!hasVacantBed) return false;
      }
      return true;
    });

    return {
      ...floor,
      rooms: filteredRooms
    };
  }).filter(Boolean);

  const handleInquireRoom = (room, floorName) => {
    setSelectedVisitRoom({
      ...room,
      floorName
    });
    setIsVisitModalOpen(true);
  };

  const getWhatsAppRoomLink = (room, floorName) => {
    const text = `Hello SathyaNarayana sir, I am interested in Room ${room.number} (${floorName}, 4-Sharing Non-AC, ₹${room.rentPerBed.toLocaleString('en-IN')}/month). Is a bed currently vacant for me?`;
    return `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="vacancies" className="section vacancy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="live-pulse"></span>
            <span>Real-Time Bed Availability Matrix</span>
          </div>
          <h2 className="section-title">Explore Rooms & Live Vacancies</h2>
          <p className="section-subtitle">
            Transparent, bed-by-bed live vacancy status across both floors. Updated exclusively by owner <strong>SathyaNarayana</strong>.
          </p>
        </div>

        {/* Blueprint Layout Notice Banner */}
        <div className="blueprint-notice glass-panel">
          <div className="notice-icon">
            <Layers size={22} color="#f97316" />
          </div>
          <div className="notice-text">
            <div className="notice-title">
              Hostel Layout: 2 Floors & 7 Non-AC Rooms (28 Beds Total)
            </div>
            <div className="notice-desc">
              Ground Floor (3 Rooms • 12 Beds) & First Floor (4 Rooms • 16 Beds). Each room is a spacious 4-sharing Non-AC room with attached washroom at ₹6,500/month per candidate.
            </div>
          </div>
          <div className="notice-stats">
            <div className="quick-pill green">
              <strong>{stats.vacantBeds}</strong> Vacant Beds
            </div>
            <div className="quick-pill blue">
              <strong>{stats.occupiedBeds}</strong> Occupied
            </div>
            <div className="quick-pill orange">
              <strong>{stats.occupancyRate}%</strong> Occupancy
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="filter-toolbar glass-panel">
          {/* Floor Tabs */}
          <div className="floor-tabs">
            <button
              type="button"
              className={`floor-tab ${activeFloorFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFloorFilter('all')}
            >
              All Floors (7 Rooms)
            </button>
            {data.floors.map(floor => (
              <button
                key={floor.id}
                type="button"
                className={`floor-tab ${activeFloorFilter === floor.id ? 'active' : ''}`}
                onClick={() => setActiveFloorFilter(floor.id)}
              >
                {floor.name} ({floor.rooms.length} Rooms)
              </button>
            ))}
          </div>

          {/* Quick Filters & Info */}
          <div className="filter-controls">
            <div className="filter-chip-info">
              <span className="fixed-chip">Fixed ₹6,500/mo</span>
              <span className="nonac-chip">Non-AC Rooms</span>
            </div>

            {/* Only Vacant Toggle */}
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={onlyVacant}
                onChange={(e) => setOnlyVacant(e.target.checked)}
                className="checkbox-input"
              />
              <span>Show Only Vacant Beds</span>
            </label>
          </div>
        </div>

        {/* Legend */}
        <div className="matrix-legend">
          <div className="legend-item">
            <span className="legend-indicator vacant"></span>
            <span>Available Bed (Click to Reserve)</span>
          </div>
          <div className="legend-item">
            <span className="legend-indicator occupied"></span>
            <span>Occupied Bed</span>
          </div>
          <div className="legend-item">
            <Wind size={15} color="#38bdf8" />
            <span>Spacious Non-AC Ventilation</span>
          </div>
          <div className="legend-item">
            <Bath size={15} color="#a78bfa" />
            <span>Attached Washroom + Geyser</span>
          </div>
        </div>

        {/* Floor-by-Floor Room Visualizer */}
        <div className="floors-container">
          {filteredFloors.map(floor => (
            <div key={floor.id} className="floor-block">
              <div className="floor-header">
                <div className="floor-title-box">
                  <div className="floor-badge">
                    <Building size={16} />
                    <span>{floor.name}</span>
                  </div>
                  <span className="floor-desc">{floor.description}</span>
                </div>
                <div className="floor-summary">
                  <span className="vacant-highlight">
                    {floor.rooms.reduce((acc, r) => acc + r.beds.filter(b => !b.isOccupied).length, 0)} Vacant Beds
                  </span>
                  <span> on this floor</span>
                </div>
              </div>

              {floor.rooms.length === 0 ? (
                <div className="no-rooms-notice">
                  No rooms match your filter criteria on {floor.name}.
                </div>
              ) : (
                <div className="rooms-grid">
                  {floor.rooms.map(room => {
                    const vacantCount = room.beds.filter(b => !b.isOccupied).length;
                    const isFullyOccupied = vacantCount === 0;

                    return (
                      <div 
                        key={room.id} 
                        className={`room-card card ${isFullyOccupied ? 'fully-occupied' : 'has-vacancies'}`}
                      >
                        {/* Room Card Header */}
                        <div className="room-card-top">
                          <div className="room-number-wrap">
                            <span className="room-label">ROOM</span>
                            <span className="room-number">{room.number}</span>
                          </div>

                          <div className="room-tags">
                            <span className="pill-type non-ac-pill">
                              <Wind size={12} />
                              Non-AC
                            </span>
                            {room.attachedBath && (
                              <span className="pill-amenity" title="Attached Western Washroom with Geyser">
                                <Bath size={12} />
                                Attached Bath
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Room Rent & Sharing */}
                        <div className="room-pricing-row">
                          <div className="sharing-badge">
                            4-Sharing Non-AC
                          </div>
                          <div className="rent-tag">
                            <span className="rent-amount">₹6,500</span>
                            <span className="rent-period">/bed/mo</span>
                          </div>
                        </div>
                        <div className="food-included-subtext">
                          🍲 Includes 3-times daily Andhra mess meals & Wi-Fi
                        </div>

                        {/* Visual Bed Grid */}
                        <div className="bed-matrix-box">
                          <div className="bed-matrix-title">
                            <span>Bed Availability:</span>
                            <span className={vacantCount > 0 ? 'vacant-count-green' : 'vacant-count-red'}>
                              {vacantCount > 0 ? `${vacantCount} of ${room.beds.length} Available` : 'Fully Occupied'}
                            </span>
                          </div>

                          <div className="beds-layout">
                            {room.beds.map((bed, index) => {
                              const isVacant = !bed.isOccupied;
                              return (
                                <div
                                  key={bed.id}
                                  className={`bed-slot ${isVacant ? 'slot-vacant' : 'slot-occupied'}`}
                                  title={isVacant ? `Bed #${bed.bedNumber} is Available! Click to reserve.` : `Bed #${bed.bedNumber} is Occupied`}
                                  onClick={() => isVacant && handleInquireRoom(room, floor.name)}
                                >
                                  <div className="bed-icon-wrapper">
                                    <Bed size={18} />
                                    <span className="bed-number-chip">{index + 1}</span>
                                  </div>
                                  <span className="bed-status-text">
                                    {isVacant ? 'VACANT' : 'OCCUPIED'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Room Card Actions */}
                        <div className="room-card-actions">
                          {vacantCount > 0 ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm flex-1"
                                onClick={() => handleInquireRoom(room, floor.name)}
                              >
                                <CalendarCheck size={14} />
                                <span>Book Visit</span>
                              </button>
                              <a
                                href={getWhatsAppRoomLink(room, floor.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp btn-sm"
                                title="Inquire room on WhatsApp"
                              >
                                <MessageCircle size={14} />
                                <span>WhatsApp</span>
                              </a>
                            </>
                          ) : (
                            <a
                              href={`https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
                                `Hi SathyaNarayana sir, I noticed Room ${room.number} is currently full. Can you notify me when a bed becomes vacant?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary btn-sm w-full"
                            >
                              <span>Join Waiting List on WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Secured Owner Edit Callout */}
        <div className="owner-security-callout card glass-panel">
          <div className="security-callout-icon">
            <Lock size={22} color="#fb923c" />
          </div>
          <div className="security-callout-text">
            <h4>Owner-Only Vacancy Management</h4>
            <p>
              Vacancies are strictly managed by owner <strong>SathyaNarayana</strong>. Only the authenticated owner can toggle bed availability or assign occupants.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-gold btn-sm"
            onClick={requestOwnerAccess}
          >
            <Lock size={14} />
            <span>Owner Login to Edit Vacancies</span>
          </button>
        </div>
      </div>

      <style>{`
        .vacancy-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .blueprint-notice {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1.75rem;
          margin-bottom: 2.25rem;
          border-left: 4px solid var(--primary);
        }

        @media (max-width: 860px) {
          .blueprint-notice {
            flex-direction: column;
            align-items: flex-start;
          }
          .notice-stats {
            width: 100%;
            justify-content: flex-start;
          }
        }

        .notice-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(234, 88, 12, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notice-text {
          flex: 1;
        }

        .notice-title {
          font-weight: 700;
          color: #ffffff;
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }

        .notice-desc {
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.4;
        }

        .notice-stats {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .quick-pill {
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
        }
        .quick-pill strong {
          font-size: 0.95rem;
          margin-right: 0.2rem;
        }
        .quick-pill.green {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .quick-pill.blue {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .quick-pill.orange {
          background: rgba(249, 115, 22, 0.15);
          color: #fb923c;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }

        .filter-toolbar {
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .floor-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .floor-tab {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .floor-tab.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: 0 2px 10px rgba(234, 88, 12, 0.3);
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-chip-info {
          display: flex;
          gap: 0.5rem;
        }

        .fixed-chip {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .nonac-chip {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #ffffff;
          cursor: pointer;
          user-select: none;
        }

        .matrix-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.25);
          border-radius: var(--radius-lg);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .legend-indicator {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
        .legend-indicator.vacant { background: #10b981; }
        .legend-indicator.occupied { background: #334155; }

        .floors-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .floor-block {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-xl);
          padding: 1.75rem;
        }

        .floor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .floor-title-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .floor-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(234, 88, 12, 0.2);
          color: #fb923c;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.95rem;
        }

        .floor-desc {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .floor-summary {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .vacant-highlight {
          color: #34d399;
          font-weight: 700;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .room-card {
          background: #111a30;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .room-card:hover {
          transform: translateY(-2px);
          border-color: rgba(234, 88, 12, 0.4);
        }

        .room-card.has-vacancies {
          border-top: 3px solid #10b981;
        }

        .room-card.fully-occupied {
          border-top: 3px solid #475569;
          opacity: 0.85;
        }

        .room-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .room-number-wrap {
          display: flex;
          flex-direction: column;
        }

        .room-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .room-number {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .room-tags {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: flex-end;
        }

        .pill-type {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
        }

        .non-ac-pill {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .pill-amenity {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          background: rgba(167, 139, 250, 0.15);
          color: #c4b5fd;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .room-pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }

        .sharing-badge {
          font-size: 0.8rem;
          color: #fb923c;
          font-weight: 600;
        }

        .rent-amount {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }

        .rent-period {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-left: 0.2rem;
        }

        .food-included-subtext {
          font-size: 0.74rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .bed-matrix-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          margin-bottom: 1.15rem;
        }

        .bed-matrix-title {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 0.6rem;
          color: var(--text-muted);
        }

        .vacant-count-green {
          color: #34d399;
          font-weight: 700;
        }

        .vacant-count-red {
          color: #ef4444;
          font-weight: 700;
        }

        .beds-layout {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .bed-slot {
          padding: 0.5rem 0.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .slot-vacant {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
        }

        .slot-vacant:hover {
          background: rgba(16, 185, 129, 0.28);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .slot-occupied {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #64748b;
          cursor: default;
        }

        .bed-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bed-number-chip {
          position: absolute;
          top: -6px;
          right: -8px;
          font-size: 0.58rem;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.05rem 0.25rem;
          border-radius: 50%;
        }

        .bed-status-text {
          font-size: 0.62rem;
          font-weight: 700;
        }

        .room-card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
        }

        .owner-security-callout {
          margin-top: 2.5rem;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          border: 1px solid rgba(234, 88, 12, 0.3);
          background: linear-gradient(90deg, rgba(234, 88, 12, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%);
        }

        .security-callout-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(234, 88, 12, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .security-callout-text {
          flex: 1;
        }

        .security-callout-text h4 {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .security-callout-text p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </section>
  );
}
