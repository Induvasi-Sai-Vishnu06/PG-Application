import React from 'react';
import { PGProvider, usePG } from './context/PGContext';
import Header from './components/Header';
import Hero from './components/StudentView/Hero';
import VacancyMatrix from './components/StudentView/VacancyMatrix';
import FoodMenu from './components/StudentView/FoodMenu';
import RentPricing from './components/StudentView/RentPricing';
import HolidayNoticeCard from './components/StudentView/HolidayNoticeCard';
import Amenities from './components/StudentView/Amenities';
import Gallery from './components/StudentView/Gallery';
import Reviews from './components/StudentView/Reviews';
import ContactCard from './components/StudentView/ContactCard';
import VisitModal from './components/StudentView/VisitModal';
import OwnerDashboard from './components/OwnerPortal/OwnerDashboard';
import OwnerPasswordModal from './components/OwnerPortal/OwnerPasswordModal';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import { CheckCircle2, Info, AlertTriangle, Lock } from 'lucide-react';

function MainApp() {
  const { activeView, isOwnerAuthenticated, requestOwnerAccess, toastMessage } = usePG();

  return (
    <div className="app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            {toastMessage.type === 'info' ? (
              <Info size={18} color="#38bdf8" />
            ) : (
              <CheckCircle2 size={18} color="#10b981" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Header />

      {/* View Switcher: Student Mode vs Owner Mode */}
      <main>
        {activeView === 'student' ? (
          <>
            <Hero />
            <VacancyMatrix />
            <HolidayNoticeCard />
            <FoodMenu />
            <RentPricing />
            <Amenities />
            <Gallery />
            <Reviews />
            <ContactCard />
          </>
        ) : isOwnerAuthenticated ? (
          <OwnerDashboard />
        ) : (
          <section className="section owner-locked-gate">
            <div className="container">
              <div 
                className="card glass-panel" 
                style={{ 
                  maxWidth: 520, 
                  margin: '4rem auto', 
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(234, 88, 12, 0.3)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div 
                  style={{ 
                    width: 68, 
                    height: 68, 
                    borderRadius: '50%', 
                    background: 'rgba(234, 88, 12, 0.15)', 
                    border: '1px solid rgba(234, 88, 12, 0.4)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1.5rem auto' 
                  }}
                >
                  <Lock size={32} color="#ea580c" />
                </div>
                <h2 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                  Owner Portal Secured
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  This interface is strictly restricted and handled by owner <strong>SathyaNarayana</strong>. Only the owner can edit room vacancies and manage the PG.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={requestOwnerAccess}
                >
                  <Lock size={18} />
                  <span>Enter Owner Password</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Interactive Visit Modal */}
      <VisitModal />

      {/* Secured Owner Password Modal */}
      <OwnerPasswordModal />

      {/* Sticky Bottom Navigation for Mobile */}
      <MobileNav />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PGProvider>
      <MainApp />
    </PGProvider>
  );
}
