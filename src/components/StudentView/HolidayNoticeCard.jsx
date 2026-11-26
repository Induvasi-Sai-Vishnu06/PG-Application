import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { 
  MessageCircle, 
  Plane, 
  LogOut, 
  Send, 
  Calendar, 
  User, 
  DoorOpen, 
  CheckCircle2, 
  AlertCircle,
  Phone
} from 'lucide-react';

export default function HolidayNoticeCard() {
  const { data } = usePG();

  const [noticeType, setNoticeType] = useState('holiday'); // 'holiday' or 'vacate'
  const [studentName, setStudentName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [vacateDate, setVacateDate] = useState('');
  const [upiOrReason, setUpiOrReason] = useState('');

  // Prepare Holiday WhatsApp Message
  const getHolidayWhatsAppUrl = (phone) => {
    const text = `Hello SathyaNarayana sir,
I am ${studentName || '[Student Name]'}, staying in Room ${roomNumber || '[Room Number]'} at Andhra PG.
I am writing to inform you that I will be away on holidays from ${fromDate || '[Start Date]'} to ${toDate || '[Return Date]'}.
Note/Reason: ${upiOrReason || 'College holidays / Visiting hometown'}.
Thank you sir!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Prepare Vacating WhatsApp Message
  const getVacateWhatsAppUrl = (phone) => {
    const text = `Hello SathyaNarayana sir,
I am ${studentName || '[Student Name]'}, residing in Room ${roomNumber || '[Room Number]'} at Andhra PG.
As per hostel guidelines, I am submitting my 15-day notice to vacate the PG by ${vacateDate || '[Vacating Date]'}.
Reason/Handover Note: ${upiOrReason || 'Semester completed / Relocating'}.
Kindly arrange the room inspection and refund of my security deposit (₹2,000).
Thank you for the homely stay!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleSend = (phone = data.pgInfo.whatsapp) => {
    if (!studentName.trim() || !roomNumber.trim()) {
      alert('Please enter your Name and Room Number first.');
      return;
    }

    const url = noticeType === 'holiday' 
      ? getHolidayWhatsAppUrl(phone) 
      : getVacateWhatsAppUrl(phone);

    window.open(url, '_blank');
  };

  return (
    <section id="holiday-notice" className="section holiday-notice-section">
      <div className="container">
        <div className="holiday-card card glass-panel">
          <div className="holiday-header">
            <div className="holiday-badge">
              <MessageCircle size={15} />
              <span>Mandatory Student Intimation</span>
            </div>
            <h2 className="holiday-title">Going on Holidays or Vacating the PG?</h2>
            <p className="holiday-sub">
              As per Andhra PG rules, all students must inform owner <strong>SathyaNarayana sir</strong> in advance via WhatsApp before leaving for vacations or vacating.
            </p>

            {/* Toggle Notice Type */}
            <div className="notice-type-toggle">
              <button
                type="button"
                className={`type-btn ${noticeType === 'holiday' ? 'active' : ''}`}
                onClick={() => setNoticeType('holiday')}
              >
                <Plane size={16} />
                <span>Going on Holidays / Leave</span>
              </button>
              <button
                type="button"
                className={`type-btn ${noticeType === 'vacate' ? 'active' : ''}`}
                onClick={() => setNoticeType('vacate')}
              >
                <LogOut size={16} />
                <span>Vacating PG (15-Day Notice)</span>
              </button>
            </div>
          </div>

          <div className="notice-form-grid">
            {/* Common Inputs */}
            <div className="form-group">
              <label className="form-label">Student Full Name *</label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input
                  type="text"
                  placeholder="e.g. Sai Teja"
                  className="form-input with-icon-input"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Room Number *</label>
              <div className="input-with-icon">
                <DoorOpen size={16} className="field-icon" />
                <select
                  className="form-select with-icon-input"
                  value={roomNumber}
                  onChange={e => setRoomNumber(e.target.value)}
                >
                  <option value="">Select your Room...</option>
                  <optgroup label="Ground Floor">
                    <option value="G01">Room G01 (Ground Floor)</option>
                    <option value="G02">Room G02 (Ground Floor)</option>
                    <option value="G03">Room G03 (Ground Floor)</option>
                  </optgroup>
                  <optgroup label="First Floor">
                    <option value="101">Room 101 (First Floor)</option>
                    <option value="102">Room 102 (First Floor)</option>
                    <option value="103">Room 103 (First Floor)</option>
                    <option value="104">Room 104 (First Floor)</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {noticeType === 'holiday' ? (
              <>
                <div className="form-group">
                  <label className="form-label">Leaving Date (From)</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="field-icon" />
                    <input
                      type="date"
                      className="form-input with-icon-input"
                      value={fromDate}
                      onChange={e => setFromDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Expected Return Date (To)</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="field-icon" />
                    <input
                      type="date"
                      className="form-input with-icon-input"
                      value={toDate}
                      onChange={e => setToDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group span-2">
                  <label className="form-label">Purpose / College Reason</label>
                  <input
                    type="text"
                    placeholder="e.g. Semester End Holidays / Deepavali Vacation / Exam Leave"
                    className="form-input"
                    value={upiOrReason}
                    onChange={e => setUpiOrReason(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Planned Vacating Date (15 Days Notice)</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="field-icon" />
                    <input
                      type="date"
                      className="form-input with-icon-input"
                      value={vacateDate}
                      onChange={e => setVacateDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason / Deposit Refund UPI ID</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech completed / UPI ID for deposit refund"
                    className="form-input"
                    value={upiOrReason}
                    onChange={e => setUpiOrReason(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Row */}
          <div className="notice-actions-wrap">
            <button
              type="button"
              className="btn btn-whatsapp btn-lg"
              onClick={() => handleSend(data.pgInfo.whatsapp)}
            >
              <MessageCircle size={20} />
              <span>Send Notice to SathyaNarayana Sir ({data.pgInfo.phone})</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => handleSend(data.pgInfo.alternateWhatsapp)}
            >
              <MessageCircle size={18} color="#25D366" />
              <span>Send to Alternate WhatsApp ({data.pgInfo.alternatePhone})</span>
            </button>
          </div>

          <div className="holiday-rule-subtext">
            ℹ️ Informing in advance helps the kitchen staff manage meal preparations accurately and avoids food wastage.
          </div>
        </div>
      </div>

      <style>{`
        .holiday-notice-section {
          background-color: var(--bg-main);
          padding-top: 1rem;
          padding-bottom: 3.5rem;
        }

        .holiday-card {
          padding: 2.5rem;
          background: linear-gradient(180deg, #131d36 0%, #0d1527 100%);
          border: 1px solid rgba(234, 88, 12, 0.3);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .holiday-card {
            padding: 1.5rem;
          }
        }

        .holiday-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 2rem auto;
        }

        .holiday-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.35);
          color: #25D366;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .holiday-title {
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 600px) {
          .holiday-title {
            font-size: 1.5rem;
          }
        }

        .holiday-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .notice-type-toggle {
          display: inline-flex;
          align-items: center;
          background: #090e1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          padding: 4px;
          margin-top: 1.25rem;
        }

        .type-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-full);
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .type-btn.active {
          background: #ea580c;
          color: #ffffff;
          box-shadow: 0 2px 10px rgba(234, 88, 12, 0.4);
        }

        .notice-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          max-width: 760px;
          margin: 0 auto 2rem auto;
        }

        @media (max-width: 700px) {
          .notice-form-grid {
            grid-template-columns: 1fr;
          }
          .span-2 {
            grid-column: span 1 !important;
          }
        }

        .span-2 {
          grid-column: span 2;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .with-icon-input {
          padding-left: 38px;
        }

        .notice-actions-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .holiday-rule-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
        }
      `}</style>
    </section>
  );
}
