import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  Utensils, 
  MessageCircle, 
  Check, 
  Trash2, 
  ShieldAlert,
  Building,
  Bed,
  FileText
} from 'lucide-react';

export default function CandidateModal({
  isOpen,
  onClose,
  floor,
  room,
  bed,
  onSave,
  onVacate,
  ownerName = "SathyaNarayana"
}) {
  const [form, setForm] = useState({
    studentName: bed?.studentName || '',
    studentPhone: bed?.studentPhone || '',
    college: bed?.college || '',
    joiningDate: bed?.joiningDate || '',
    rentStatus: bed?.rentStatus || 'Paid',
    dueAmount: bed?.dueAmount !== undefined ? bed.dueAmount : 0,
    emergencyContact: bed?.emergencyContact || '',
    foodPreference: bed?.foodPreference || 'Non-Veg',
    notes: bed?.notes || ''
  });

  const [showVacateConfirm, setShowVacateConfirm] = useState(false);

  // Sync form when bed changes
  useEffect(() => {
    if (bed) {
      setForm({
        studentName: bed.studentName || '',
        studentPhone: bed.studentPhone || '',
        college: bed.college || '',
        joiningDate: bed.joiningDate || '',
        rentStatus: bed.rentStatus || (bed.isOccupied ? 'Paid' : 'Pending'),
        dueAmount: bed.dueAmount !== undefined ? bed.dueAmount : (bed.isOccupied ? 0 : (room?.rentPerBed || 6500)),
        emergencyContact: bed.emergencyContact || '',
        foodPreference: bed.foodPreference || 'Non-Veg',
        notes: bed.notes || ''
      });
      setShowVacateConfirm(false);
    }
  }, [bed, room]);

  if (!isOpen || !bed || !room || !floor) return null;

  const handleRentStatusChange = (status) => {
    let due = form.dueAmount;
    if (status === 'Paid') {
      due = 0;
    } else if (status === 'Pending') {
      due = room.rentPerBed || 6500;
    } else if (status === 'Partially Paid' && due === 0) {
      due = Math.round((room.rentPerBed || 6500) / 2);
    }
    setForm(prev => ({
      ...prev,
      rentStatus: status,
      dueAmount: due
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.studentName.trim()) {
      alert('Please enter the candidate/student name.');
      return;
    }

    onSave({
      ...form,
      isOccupied: true,
      studentName: form.studentName.trim(),
      dueAmount: Number(form.dueAmount) || 0
    });
    onClose();
  };

  const handleVacateConfirm = () => {
    onVacate();
    setShowVacateConfirm(false);
    onClose();
  };

  const cleanPhone = (form.studentPhone || '').replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  const whatsappReminderUrl = cleanPhone 
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        `Hello ${form.studentName || 'Resident'}, I am ${ownerName} from Andhra PG (Room ${room.number}, Bed #${bed.bedNumber}). Your monthly hostel rent of ₹${form.dueAmount || room.rentPerBed || 6500} is due. Please clear it at your earliest convenience. Thank you!`
      )}`
    : null;

  return (
    <div className="candidate-modal-overlay" onClick={onClose}>
      <div 
        className="candidate-modal-content card" 
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-modal-title"
      >
        {/* Header */}
        <div className="candidate-modal-header">
          <div className="header-badge-row">
            <span className="room-badge">
              <Building size={14} />
              {floor.name} • Room {room.number}
            </span>
            <span className="bed-badge">
              <Bed size={14} />
              Bed #{bed.bedNumber} ({room.type})
            </span>
            <span className={`status-badge ${bed.isOccupied ? 'occupied' : 'vacant'}`}>
              {bed.isOccupied ? 'Currently Occupied' : 'Vacant Bed'}
            </span>
          </div>

          <h2 id="candidate-modal-title" className="modal-title">
            {bed.isOccupied ? `Edit Resident Details: ${bed.studentName || 'Candidate'}` : `Assign Candidate to Bed #${bed.bedNumber}`}
          </h2>
          <p className="modal-subtitle">
            Owner & Warden SathyaNarayana can update student contact, fee status, and mess diet.
          </p>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Vacate Confirmation Banner if triggered */}
        {showVacateConfirm && (
          <div className="vacate-confirm-box">
            <div className="confirm-icon">
              <ShieldAlert size={22} color="#ef4444" />
            </div>
            <div className="confirm-text">
              <strong>Confirm Vacate Resident?</strong>
              <p>This will remove {form.studentName || 'the student'} and immediately mark Bed #{bed.bedNumber} in Room {room.number} as <strong>Vacant (Available for new students)</strong>.</p>
            </div>
            <div className="confirm-actions">
              <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={handleVacateConfirm}
              >
                Yes, Vacate Bed
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowVacateConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="candidate-form">
          <div className="form-section-title">
            <User size={16} />
            <span>Student Personal & College Information</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="studentName">
                Candidate / Student Full Name <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  id="studentName"
                  type="text"
                  required
                  placeholder="e.g. Sai Kiran / Praveen Kumar"
                  className="form-input"
                  value={form.studentName}
                  onChange={e => setForm({ ...form, studentName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="studentPhone">
                Mobile / WhatsApp Number
              </label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  id="studentPhone"
                  type="tel"
                  placeholder="e.g. 9845123451"
                  className="form-input"
                  value={form.studentPhone}
                  onChange={e => setForm({ ...form, studentPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="college">
                College / Branch / Year
              </label>
              <div className="input-with-icon">
                <GraduationCap size={16} className="input-icon" />
                <input
                  id="college"
                  type="text"
                  placeholder="e.g. BIET Davangere - CSE (3rd Year)"
                  className="form-input"
                  value={form.college}
                  onChange={e => setForm({ ...form, college: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="joiningDate">
                Admission / Joining Date
              </label>
              <div className="input-with-icon">
                <Calendar size={16} className="input-icon" />
                <input
                  id="joiningDate"
                  type="date"
                  className="form-input"
                  value={form.joiningDate}
                  onChange={e => setForm({ ...form, joiningDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-section-title">
            <CreditCard size={16} />
            <span>Monthly Rent & Fee Tracking (Fixed ₹{room.rentPerBed || 6500}/mo Non-AC)</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Monthly Rent Status</label>
              <div className="status-radio-group">
                <label className={`status-radio-label ${form.rentStatus === 'Paid' ? 'active-paid' : ''}`}>
                  <input
                    type="radio"
                    name="rentStatus"
                    value="Paid"
                    checked={form.rentStatus === 'Paid'}
                    onChange={() => handleRentStatusChange('Paid')}
                  />
                  <span>🟢 Paid (No Dues)</span>
                </label>

                <label className={`status-radio-label ${form.rentStatus === 'Pending' ? 'active-pending' : ''}`}>
                  <input
                    type="radio"
                    name="rentStatus"
                    value="Pending"
                    checked={form.rentStatus === 'Pending'}
                    onChange={() => handleRentStatusChange('Pending')}
                  />
                  <span>🔴 Full Pending</span>
                </label>

                <label className={`status-radio-label ${form.rentStatus === 'Partially Paid' ? 'active-partial' : ''}`}>
                  <input
                    type="radio"
                    name="rentStatus"
                    value="Partially Paid"
                    checked={form.rentStatus === 'Partially Paid'}
                    onChange={() => handleRentStatusChange('Partially Paid')}
                  />
                  <span>🟡 Partially Paid</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dueAmount">
                Pending / Due Amount (₹)
              </label>
              <div className="input-with-icon">
                <CreditCard size={16} className="input-icon" />
                <input
                  id="dueAmount"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0"
                  className="form-input"
                  value={form.dueAmount}
                  onChange={e => setForm({ ...form, dueAmount: e.target.value })}
                />
              </div>
              <span className="form-hint">
                Monthly cost: ₹{room.rentPerBed || 6500}. Set to 0 when candidate has paid.
              </span>
            </div>
          </div>

          <div className="form-section-title">
            <Utensils size={16} />
            <span>Mess Dietary Preference & Emergency Contact</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Sunday Mess Food Preference</label>
              <div className="food-diet-selector">
                <label className={`food-radio-card ${form.foodPreference === 'Non-Veg' ? 'selected-nonveg' : ''}`}>
                  <input
                    type="radio"
                    name="foodPreference"
                    value="Non-Veg"
                    checked={form.foodPreference === 'Non-Veg'}
                    onChange={() => setForm({ ...form, foodPreference: 'Non-Veg' })}
                  />
                  <div className="food-opt-content">
                    <span className="food-emoji">🍗</span>
                    <div>
                      <strong>Non-Veg</strong>
                      <span className="opt-sub">Sunday Chicken Curry Feast</span>
                    </div>
                  </div>
                </label>

                <label className={`food-radio-card ${form.foodPreference === 'Veg' ? 'selected-veg' : ''}`}>
                  <input
                    type="radio"
                    name="foodPreference"
                    value="Veg"
                    checked={form.foodPreference === 'Veg'}
                    onChange={() => setForm({ ...form, foodPreference: 'Veg' })}
                  />
                  <div className="food-opt-content">
                    <span className="food-emoji">🥬</span>
                    <div>
                      <strong>Pure Vegetarian</strong>
                      <span className="opt-sub">Separate Veg Cooking Counter</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="emergencyContact">
                Emergency / Parent Contact
              </label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  id="emergencyContact"
                  type="text"
                  placeholder="e.g. 9845098765 (Father's Name)"
                  className="form-input"
                  value={form.emergencyContact}
                  onChange={e => setForm({ ...form, emergencyContact: e.target.value })}
                />
              </div>
              <span className="form-hint">Required for hostel warden record & emergency safety</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="notes">
              Special Notes / Room Key / Vehicle Details
            </label>
            <div className="input-with-icon">
              <FileText size={16} className="input-icon top-align" />
              <textarea
                id="notes"
                rows="2"
                placeholder="e.g. Room key issued. Has 2-wheeler. Attends 8 AM labs."
                className="form-textarea padded-area"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
              ></textarea>
            </div>
          </div>

          {/* Quick Communication Bar */}
          {cleanPhone && (
            <div className="quick-comm-panel">
              <div className="comm-label">Quick Resident Communication:</div>
              <div className="comm-buttons">
                {whatsappReminderUrl && (
                  <a
                    href={whatsappReminderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={14} />
                    <span>Send WhatsApp Fee / Notice Text</span>
                  </a>
                )}
                <a
                  href={`tel:${cleanPhone}`}
                  className="btn btn-call btn-sm"
                >
                  <Phone size={14} />
                  <span>Call {form.studentName || 'Student'}</span>
                </a>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="candidate-modal-footer">
            <div className="left-actions">
              {bed.isOccupied && !showVacateConfirm && (
                <button
                  type="button"
                  className="btn btn-danger-outline btn-sm"
                  onClick={() => setShowVacateConfirm(true)}
                  title="Remove candidate from this bed and mark as vacant"
                >
                  <Trash2 size={15} />
                  <span>Vacate Bed (Mark Vacant)</span>
                </button>
              )}
            </div>

            <div className="right-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Check size={16} />
                <span>Save Resident Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .candidate-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 9, 20, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1200;
          padding: 1.25rem;
          overflow-y: auto;
        }

        .candidate-modal-content {
          width: 100%;
          max-width: 720px;
          background: #111a30;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          padding: 2rem;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          max-height: 90vh;
          overflow-y: auto;
        }

        .candidate-modal-header {
          position: relative;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-badge-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }

        .room-badge, .bed-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(249, 115, 22, 0.15);
          color: #fb923c;
          border: 1px solid rgba(249, 115, 22, 0.3);
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .bed-badge {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }

        .status-badge {
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .status-badge.occupied {
          background: rgba(234, 88, 12, 0.2);
          color: #fdba74;
          border: 1px solid rgba(234, 88, 12, 0.4);
        }

        .status-badge.vacant {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .modal-title {
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .modal-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .modal-close-btn {
          position: absolute;
          top: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .vacate-confirm-box {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .confirm-icon {
          flex-shrink: 0;
        }

        .confirm-text {
          flex: 1;
          font-size: 0.88rem;
          color: #fca5a5;
        }

        .confirm-text strong {
          color: #f87171;
          display: block;
          margin-bottom: 0.25rem;
        }

        .confirm-text p {
          margin: 0;
          color: #fecaca;
        }

        .confirm-actions {
          display: flex;
          gap: 0.5rem;
        }

        .form-section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fbbf24;
          margin: 1.35rem 0 0.85rem 0;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(245, 158, 11, 0.2);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-normal);
          margin-bottom: 0.35rem;
        }

        .req {
          color: #ef4444;
          margin-left: 0.2rem;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-icon.top-align {
          top: 0.85rem;
        }

        .input-with-icon .form-input {
          padding-left: 2.5rem;
          width: 100%;
        }

        .padded-area {
          padding-left: 2.5rem;
          width: 100%;
        }

        .form-hint {
          display: block;
          font-size: 0.72rem;
          color: var(--text-subtle);
          margin-top: 0.3rem;
        }

        .status-radio-group {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.4rem;
        }

        .status-radio-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.55rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-radio-label input {
          accent-color: #10b981;
        }

        .status-radio-label.active-paid {
          background: rgba(16, 185, 129, 0.18);
          border-color: #10b981;
          color: #34d399;
        }

        .status-radio-label.active-pending {
          background: rgba(239, 68, 68, 0.18);
          border-color: #ef4444;
          color: #f87171;
        }

        .status-radio-label.active-partial {
          background: rgba(245, 158, 11, 0.18);
          border-color: #f59e0b;
          color: #fbbf24;
        }

        .food-diet-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .food-radio-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        .food-radio-card input {
          margin-top: 0.25rem;
          accent-color: #f97316;
        }

        .food-opt-content {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .food-emoji {
          font-size: 1.4rem;
        }

        .food-opt-content strong {
          display: block;
          font-size: 0.85rem;
          color: #ffffff;
        }

        .opt-sub {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .food-radio-card.selected-nonveg {
          background: rgba(249, 115, 22, 0.15);
          border-color: #f97316;
        }

        .food-radio-card.selected-veg {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
        }

        .quick-comm-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          margin: 1.25rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .comm-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .comm-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .candidate-modal-footer {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .right-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-danger-outline {
          background: transparent;
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-danger-outline:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
        }

        .btn-whatsapp {
          background: #25d366;
          color: #ffffff;
          font-weight: 600;
          border: none;
        }

        .btn-whatsapp:hover {
          background: #1eb857;
        }

        .btn-call {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.4);
          font-weight: 600;
        }

        .btn-call:hover {
          background: rgba(59, 130, 246, 0.35);
        }
      `}</style>
    </div>
  );
}
