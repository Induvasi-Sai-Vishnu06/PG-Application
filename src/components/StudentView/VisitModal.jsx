import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import {
  X,
  CalendarCheck,
  CheckCircle,
  MessageCircle,
  Building,
  User,
  Phone,
  GraduationCap,
  Sparkles,
  Utensils
} from 'lucide-react';

export default function VisitModal() {
  const {
    data,
    isVisitModalOpen,
    setIsVisitModalOpen,
    selectedVisitRoom,
    setSelectedVisitRoom,
    addInquiry
  } = usePG();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    collegeOrCompany: '',
    sharingPreference: selectedVisitRoom?.sharing ? `${selectedVisitRoom.sharing}-Sharing (${selectedVisitRoom.type})` : '4-Sharing (Budget Non-AC)',
    plannedMoveInDate: '',
    foodPreference: 'Non-Veg (Chicken/Egg + Veg)',
    notes: selectedVisitRoom?.number ? `Inquiring for Room ${selectedVisitRoom.number} (${selectedVisitRoom.floorName || ''})` : ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [passCode, setPassCode] = useState('');

  if (!isVisitModalOpen) return null;

  const handleClose = () => {
    setIsVisitModalOpen(false);
    setSelectedVisitRoom(null);
    setIsSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill your name and mobile number.');
      return;
    }

    const generatedPass = `APG-${Math.floor(1000 + Math.random() * 9000)}`;
    setPassCode(generatedPass);

    addInquiry({
      ...formData,
      passCode: generatedPass
    });

    setIsSuccess(true);
  };

  const getWhatsAppConfirmationUrl = () => {
    const text = `Hello ${data.pgInfo.ownerName}, I scheduled a visit for Andhra PG.
My Visit Pass: ${passCode}
Name: ${formData.name}
Phone: ${formData.phone}
College/Work: ${formData.collegeOrCompany || 'Student'}
Room Preference: ${formData.sharingPreference}
Planned Date: ${formData.plannedMoveInDate || 'This Week'}
Food: ${formData.foodPreference}
Note: ${formData.notes || 'None'}

Please confirm if you will be available for showing the room!`;

    return `https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content visit-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="modal-badge-chip">
              <CalendarCheck size={14} />
              <span>Free Hostel Visit & Tour</span>
            </span>
            <h3 className="modal-title">
              {isSuccess ? 'Visit Pass Generated!' : 'Schedule Free PG Visit'}
            </h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {isSuccess ? (
            <div className="success-state-box">
              <div className="success-icon-wrap">
                <CheckCircle size={52} color="#10b981" />
              </div>
              <h4 className="success-heading">Visit Request Confirmed!</h4>
              <p className="success-desc">
                Your free visit request has been logged in the Andhra PG Owner Portal. Warden {data.pgInfo.ownerName} has been notified.
              </p>

              {/* Pass Card */}
              <div className="pass-card glass-panel">
                <div className="pass-top">
                  <span>OFFICIAL VISITOR PASS</span>
                  <span className="pass-status">ACTIVE</span>
                </div>
                <div className="pass-code">{passCode}</div>
                <div className="pass-details">
                  <div><strong>Student:</strong> {formData.name}</div>
                  <div><strong>Contact:</strong> {formData.phone}</div>
                  <div><strong>Preference:</strong> {formData.sharingPreference}</div>
                  <div><strong>Address:</strong> {data.pgInfo.address.split(',')[0]}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="success-actions">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full"
                >
                  <MessageCircle size={18} />
                  <span>Send Pass to Owner on WhatsApp</span>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={handleClose}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="visit-form">
              {selectedVisitRoom && (
                <div className="selected-room-banner">
                  <Building size={16} color="#fb923c" />
                  <span>
                    Selected: <strong>{selectedVisitRoom.number ? `Room ${selectedVisitRoom.number} (${selectedVisitRoom.sharing}-Sharing ${selectedVisitRoom.type})` : selectedVisitRoom.sharingPlan}</strong>
                  </span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sai Teja"
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9848012345"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">College / Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. GITAM / GVP / TCS / Intern"
                    className="form-input"
                    value={formData.collegeOrCompany}
                    onChange={e => setFormData({ ...formData, collegeOrCompany: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Sharing Preference</label>
                  <select
                    className="form-select"
                    value={formData.sharingPreference}
                    onChange={e => setFormData({ ...formData, sharingPreference: e.target.value })}
                  >
                    <option value="4-Sharing (Budget Non-AC)">4-Sharing (Budget Non-AC)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Visit / Move-In Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.plannedMoveInDate}
                    onChange={e => setFormData({ ...formData, plannedMoveInDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Food Preference</label>
                  <select
                    className="form-select"
                    value={formData.foodPreference}
                    onChange={e => setFormData({ ...formData, foodPreference: e.target.value })}
                  >
                    <option value="Non-Veg (Chicken/Egg + Veg)">Andhra Non-Veg (Wed & Sun Feast + Veg)</option>
                    <option value="Pure Veg">Pure Andhra Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Notes / Requirements</label>
                <textarea
                  rows="2"
                  placeholder="e.g. morning lunch box packing"
                  className="form-textarea"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary btn-block">
                  <Sparkles size={16} />
                  <span>Generate Free Visit Pass</span>
                </button>
                <p className="form-privacy-note">
                  🔒 Zero spam. Your phone number is only shared directly with the PG Owner.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .visit-modal-card {
          max-width: 580px;
        }

        .modal-header-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .modal-badge-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #fb923c;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .modal-title {
          font-size: 1.35rem;
          color: #ffffff;
        }

        .selected-room-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(234, 88, 12, 0.12);
          border: 1px solid rgba(234, 88, 12, 0.3);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: #cbd5e1;
          margin-bottom: 1.25rem;
        }
        .selected-room-banner strong {
          color: #fb923c;
        }

        .form-footer {
          margin-top: 1.5rem;
        }

        .btn-block {
          width: 100%;
          padding: 0.85rem;
          font-size: 1rem;
        }

        .form-privacy-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          margin-top: 0.75rem;
        }

        .success-state-box {
          text-align: center;
          padding: 1rem 0;
        }

        .success-icon-wrap {
          margin-bottom: 1rem;
        }

        .success-heading {
          font-size: 1.45rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .success-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
        }

        .pass-card {
          background: #0f172a;
          border: 2px dashed rgba(234, 88, 12, 0.5);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .pass-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .pass-status {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .pass-code {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: #fb923c;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          text-align: center;
        }

        .pass-details {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #cbd5e1;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.75rem;
        }

        .pass-details strong {
          color: #ffffff;
        }

        .success-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
