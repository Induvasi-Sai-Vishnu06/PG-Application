import React, { useState } from 'react';
import { usePG } from '../../context/PGContext';
import { Image as ImageIcon, X, ZoomIn, CalendarCheck, MessageCircle } from 'lucide-react';

export default function Gallery() {
  const { data, setIsVisitModalOpen } = usePG();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);

  const categories = ['All', 'Rooms', 'Dining & Food', 'Building & Facilities', 'Washrooms'];

  const filteredImages = activeCategory === 'All'
    ? data.galleryImages
    : data.galleryImages.filter(img => img.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <ImageIcon size={14} />
            <span>Real Hostel & Mess Photos</span>
          </div>
          <h2 className="section-title">Hostel & Dining Gallery</h2>
          <p className="section-subtitle">
            What you see is what you get! Take a photographic tour of our clean bedrooms, Andhra dining hall, modern washrooms, and study areas.
          </p>

          {/* Filter Pills */}
          <div className="gallery-pills">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`g-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map(img => (
            <div
              key={img.id}
              className="gallery-item-card"
              onClick={() => setActiveModalImage(img)}
            >
              <div className="gallery-image-wrapper">
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="gallery-hover-overlay">
                  <div className="zoom-circle">
                    <ZoomIn size={20} />
                  </div>
                  <div className="hover-caption">
                    <span className="caption-cat">{img.category}</span>
                    <span className="caption-title">{img.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalImage && (
          <div className="modal-overlay" onClick={() => setActiveModalImage(null)}>
            <div className="modal-content lightbox-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-cat-tag">{activeModalImage.category}</span>
                  <h3 className="modal-image-title">{activeModalImage.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActiveModalImage(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="lightbox-body">
                <div className="lightbox-img-box">
                  <img src={activeModalImage.url} alt={activeModalImage.title} />
                </div>
                <p className="lightbox-desc">{activeModalImage.desc}</p>
                <div className="lightbox-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setActiveModalImage(null);
                      setIsVisitModalOpen(true);
                    }}
                  >
                    <CalendarCheck size={16} />
                    <span>Schedule Visit To See In Person</span>
                  </button>
                  <a
                    href={`https://wa.me/${data.pgInfo.whatsapp}?text=${encodeURIComponent(
                      `Hi ${data.pgInfo.ownerName}, I saw the photo of ${activeModalImage.title} on your website and want to know more details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Owner</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .gallery-section {
          background-color: var(--bg-main);
          position: relative;
        }

        .gallery-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.5rem;
        }

        .g-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .g-pill:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .g-pill.active {
          background: #ea580c;
          color: #fff;
          border-color: #ea580c;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .gallery-item-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #1e293b;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .gallery-image-wrapper {
          position: relative;
          aspect-ratio: 4 / 3;
          width: 100%;
          overflow: hidden;
        }

        .gallery-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gallery-item-card:hover img {
          transform: scale(1.06);
        }

        .gallery-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(9, 13, 22, 0.9) 0%, rgba(9, 13, 22, 0.2) 60%, transparent 100%);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          transition: opacity 0.3s ease;
        }
        .gallery-item-card:hover .gallery-hover-overlay {
          opacity: 1;
        }

        .zoom-circle {
          align-self: flex-end;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(234, 88, 12, 0.9);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .hover-caption {
          display: flex;
          flex-direction: column;
        }

        .caption-cat {
          font-size: 0.72rem;
          color: #fbbf24;
          font-weight: 700;
          text-transform: uppercase;
        }

        .caption-title {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 600;
        }

        .lightbox-content {
          max-width: 720px;
        }

        .modal-cat-tag {
          font-size: 0.75rem;
          color: #fbbf24;
          font-weight: 700;
          text-transform: uppercase;
        }

        .modal-image-title {
          font-size: 1.2rem;
          color: #ffffff;
        }

        .lightbox-body {
          padding: 1.5rem;
        }

        .lightbox-img-box {
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 1.25rem;
          max-height: 400px;
        }
        .lightbox-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lightbox-desc {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .lightbox-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
