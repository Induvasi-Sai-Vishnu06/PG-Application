import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert } from 'lucide-react';

export default function OwnerPasswordModal() {
  const { isPasswordModalOpen, setIsPasswordModalOpen, authenticateOwner } = usePG();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the owner password.');
      return;
    }

    const success = authenticateOwner(password);
    if (success) {
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password! Only owner SathyaNarayana can access.');
    }
  };

  const handleClose = () => {
    setIsPasswordModalOpen(false);
    setPassword('');
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content auth-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-header-title">
            <Lock size={18} color="#ea580c" />
            <span>Owner Portal Security</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body auth-modal-body">
          <div className="auth-icon-circle">
            <KeyRound size={32} color="#fb923c" />
          </div>

          <h3 className="auth-heading">Owner Password Required</h3>
          <p className="auth-desc">
            This area is strictly restricted. Only owner <strong>SathyaNarayana</strong> can edit room vacancies, change rents, and update food menus.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Enter Owner Password</label>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter password..."
                  className="form-input password-field"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error-chip">
                <ShieldAlert size={14} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block mt-3">
              <Lock size={16} />
              <span>Unlock Owner Dashboard</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .auth-modal-card {
          max-width: 440px;
          text-align: center;
        }

        .auth-header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #fb923c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .auth-modal-body {
          padding: 2rem 1.5rem;
        }

        .auth-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(234, 88, 12, 0.15);
          border: 1px solid rgba(234, 88, 12, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }

        .auth-heading {
          font-size: 1.35rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .auth-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .auth-form {
          text-align: left;
        }

        .password-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-field {
          padding-right: 42px;
        }

        .pwd-toggle-btn {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .pwd-toggle-btn:hover {
          color: #ffffff;
        }

        .auth-error-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          margin-top: 0.6rem;
        }

        .mt-3 {
          margin-top: 1rem;
        }

        .btn-block {
          width: 100%;
          padding: 0.8rem;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
