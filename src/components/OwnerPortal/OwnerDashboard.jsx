import React, { useState, useMemo } from 'react';
import { usePG } from '../../context/PGContext';
import CandidateModal from './CandidateModal';
import { 
  Bed, 
  Users, 
  DollarSign, 
  UtensilsCrossed, 
  Settings, 
  Save, 
  RotateCcw, 
  Lock, 
  MessageCircle, 
  Phone, 
  Edit, 
  UserPlus, 
  CheckCircle, 
  Search, 
  Printer, 
  Utensils, 
  Trash2, 
  GraduationCap, 
  Building, 
  Check, 
  X, 
  User, 
  Layers, 
  Bath, 
  Wind
} from 'lucide-react';

export default function OwnerDashboard() {
  const { 
    data, 
    stats, 
    toggleBedOccupancy, 
    updateCandidateInfo,
    vacateBed,
    recordRentPayment,
    setRoomVacancy, 
    updateRoomRent, 
    updatePgInfo, 
    updateFoodMenu, 
    updateInquiryStatus, 
    resetToDefault,
    logoutOwner
  } = usePG();

  const [activeTab, setActiveTab] = useState('vacancy'); // 'vacancy', 'directory', 'rent', 'menu', 'inquiries', 'settings'
  const [selectedFloorId, setSelectedFloorId] = useState('all');

  // Candidate Modal State
  const [editingBedContext, setEditingBedContext] = useState(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);

  // Candidate Directory Filters
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryFloorFilter, setDirectoryFloorFilter] = useState('all');
  const [directoryRentFilter, setDirectoryRentFilter] = useState('all');
  const [directoryFoodFilter, setDirectoryFoodFilter] = useState('all');
  const [showVacantRows, setShowVacantRows] = useState(false);

  // Local state for editing PG info
  const [pgInfoForm, setPgInfoForm] = useState(data.pgInfo);

  // Local state for menu editing
  const [menuEditDay, setMenuEditDay] = useState('Monday');
  const [menuForm, setMenuForm] = useState(data.weeklyFoodMenu[menuEditDay]);

  // When day changes in menu editor
  const handleDayChange = (day) => {
    setMenuEditDay(day);
    setMenuForm(data.weeklyFoodMenu[day]);
  };

  const handleSaveMenu = (e) => {
    e.preventDefault();
    Object.keys(menuForm).forEach(mealType => {
      updateFoodMenu(menuEditDay, mealType, menuForm[mealType]);
    });
  };

  const handleSavePgInfo = (e) => {
    e.preventDefault();
    updatePgInfo(pgInfoForm);
  };

  // Open Candidate Modal for a specific room & bed
  const handleOpenCandidateEdit = (floor, room, bed) => {
    setEditingBedContext({ floor, room, bed });
    setIsCandidateModalOpen(true);
  };

  const handleSaveCandidate = (candidateData) => {
    if (!editingBedContext) return;
    updateCandidateInfo(
      editingBedContext.floor.id,
      editingBedContext.room.id,
      editingBedContext.bed.id,
      candidateData
    );
  };

  const handleVacateCandidate = () => {
    if (!editingBedContext) return;
    vacateBed(
      editingBedContext.floor.id,
      editingBedContext.room.id,
      editingBedContext.bed.id
    );
  };

  // Flatten all beds for the Candidate Directory
  const allBedsFlat = useMemo(() => {
    const list = [];
    data.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        room.beds.forEach(bed => {
          list.push({
            floor,
            room,
            bed
          });
        });
      });
    });
    return list;
  }, [data]);

  // Filtered candidate list
  const filteredCandidates = useMemo(() => {
    return allBedsFlat.filter(({ floor, room, bed }) => {
      // Show/hide vacant
      if (!showVacantRows && !bed.isOccupied) return false;

      // Floor filter
      if (directoryFloorFilter !== 'all' && floor.id !== directoryFloorFilter) return false;

      // Rent status filter
      if (directoryRentFilter !== 'all') {
        if (directoryRentFilter === 'Paid' && bed.rentStatus !== 'Paid') return false;
        if (directoryRentFilter === 'Pending' && bed.rentStatus === 'Paid') return false;
      }

      // Food diet filter
      if (directoryFoodFilter !== 'all') {
        if (bed.foodPreference !== directoryFoodFilter) return false;
      }

      // Search query filter
      if (directorySearch.trim()) {
        const q = directorySearch.toLowerCase().trim();
        const matchName = (bed.studentName || '').toLowerCase().includes(q);
        const matchPhone = (bed.studentPhone || '').includes(q);
        const matchRoom = (room.number || '').toLowerCase().includes(q);
        const matchCollege = (bed.college || '').toLowerCase().includes(q);
        const matchFloor = (floor.name || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchRoom && !matchCollege && !matchFloor) {
          return false;
        }
      }

      return true;
    });
  }, [allBedsFlat, showVacantRows, directoryFloorFilter, directoryRentFilter, directoryFoodFilter, directorySearch]);

  // Calculate monthly collected revenue
  const monthlyRevenue = data.floors.reduce((acc, floor) => {
    return acc + floor.rooms.reduce((rAcc, room) => {
      const occupiedInRoom = room.beds.filter(b => b.isOccupied).length;
      return rAcc + (occupiedInRoom * room.rentPerBed);
    }, 0);
  }, 0);

  const potentialRevenue = data.floors.reduce((acc, floor) => {
    return acc + floor.rooms.reduce((rAcc, room) => {
      return rAcc + (room.beds.length * room.rentPerBed);
    }, 0);
  }, 0);

  const handlePrintDirectory = () => {
    window.print();
  };

  return (
    <section className="owner-portal-section">
      <div className="container">
        {/* Owner Dashboard Top Header */}
        <div className="owner-hero-panel glass-panel">
          <div className="owner-title-area">
            <div className="owner-status-tag">
              <span className="live-pulse"></span>
              <span>Hostel Owner & Warden Control Room</span>
            </div>
            <h1 className="owner-dashboard-heading">{data.pgInfo.name}</h1>
            <p className="owner-dashboard-sub">
              Logged in as <strong>{data.pgInfo.ownerName}</strong> ({data.pgInfo.ownerRole}). Manage live vacancies, update candidate / student details in each room, track rent payments, and edit Andhra mess food.
            </p>
          </div>

          <div className="owner-top-actions">
            <button
              type="button"
              className="btn btn-outline-gold btn-sm"
              onClick={logoutOwner}
              title="Lock portal and return to Student View"
            >
              <Lock size={14} />
              <span>Lock Portal</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={resetToDefault}
              title="Reset all rooms and menu to original demo state"
            >
              <RotateCcw size={14} />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Live KPI Metric Cards */}
        <div className="kpi-metrics-grid">
          <div className="kpi-card card">
            <div className="kpi-icon-box green-icon">
              <Bed size={24} />
            </div>
            <div className="kpi-info">
              <div className="kpi-label">Available Beds (Live Vacancy)</div>
              <div className="kpi-number green-text">{stats.vacantBeds}</div>
              <div className="kpi-sub">{stats.totalBeds} total hostel capacity</div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon-box orange-icon">
              <Users size={24} />
            </div>
            <div className="kpi-info">
              <div className="kpi-label">Active Candidates / Residents</div>
              <div className="kpi-number orange-text">{stats.occupiedBeds}</div>
              <div className="kpi-sub">{stats.occupancyRate}% occupancy rate</div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon-box gold-icon">
              <DollarSign size={24} />
            </div>
            <div className="kpi-info">
              <div className="kpi-label">Monthly Collections (₹6,500/bed)</div>
              <div className="kpi-number gold-text">₹{monthlyRevenue.toLocaleString('en-IN')}</div>
              <div className="kpi-sub">
                {stats.pendingRentCount > 0 ? (
                  <span className="pending-text">⚠️ ₹{stats.totalPendingRentAmount.toLocaleString('en-IN')} due ({stats.pendingRentCount} students)</span>
                ) : (
                  <span className="all-clear-text">✅ All rents cleared (of ₹{potentialRevenue.toLocaleString('en-IN')} potential)</span>
                )}
              </div>
            </div>
          </div>

          <div className="kpi-card card">
            <div className="kpi-icon-box blue-icon">
              <Utensils size={24} />
            </div>
            <div className="kpi-info">
              <div className="kpi-label">Sunday Mess Headcount</div>
              <div className="kpi-number blue-text">
                🍗 {stats.sundayNonVegCount || 0} <span className="sub-diet">/ 🥬 {stats.sundayVegCount || 0}</span>
              </div>
              <div className="kpi-sub">Chicken Feast vs Pure Veg Counter</div>
            </div>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div className="owner-tab-nav">
          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'vacancy' ? 'active' : ''}`}
            onClick={() => setActiveTab('vacancy')}
          >
            <Bed size={16} />
            <span>Room & Bed Manager (Vacancies)</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
            onClick={() => setActiveTab('directory')}
          >
            <Users size={16} />
            <span>Candidate Directory & Fees ({stats.occupiedBeds})</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveTab('rent')}
          >
            <DollarSign size={16} />
            <span>Room Rents & Pricing</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <UtensilsCrossed size={16} />
            <span>Mess Menu Editor</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageCircle size={16} />
            <span>Student Inquiries ({ (data.initialInquiries || []).length })</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            <span>PG Contact & Rules</span>
          </button>
        </div>

        {/* TAB 1: REAL-TIME BED VACANCY & ROOM CANDIDATE MANAGER */}
        {activeTab === 'vacancy' && (
          <div className="tab-pane">
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Real-Time Bed Vacancy & Candidate Controller</h3>
                <p className="pane-subtitle">
                  Click <strong>"Edit Details"</strong> on any bed to update student information, track rent payments, and view Sunday mess preferences. Click <strong>"Vacate"</strong> or <strong>"+ Assign Student"</strong> to manage vacancies instantly.
                </p>
              </div>

              {/* Floor Filter */}
              <div className="floor-quick-filter">
                <span className="filter-label">Filter Floor:</span>
                <select
                  value={selectedFloorId}
                  onChange={e => setSelectedFloorId(e.target.value)}
                  className="form-select select-sm"
                >
                  <option value="all">All Floors (7 Rooms • 28 Beds)</option>
                  {data.floors.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.rooms.length} Rooms)</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blueprint Architecture Layout Details Card */}
            <div className="owner-layout-details-banner card glass-panel">
              <div className="layout-banner-left">
                <div className="layout-banner-icon">
                  <Layers size={26} color="#f97316" />
                </div>
                <div className="layout-banner-content">
                  <div className="layout-banner-badge">Hostel Blueprint Layout Details</div>
                  <h4 className="layout-banner-title">
                    Layout Details: 2 Floors • 7 Non-AC Rooms (28 Total Beds)
                  </h4>
                  <p className="layout-banner-desc">
                    Ground Floor (Rooms G01, G02, G03 = 12 Beds) & First Floor (Rooms 101, 102, 103, 104 = 16 Beds). Every room is a spacious 4-sharing budget Non-AC room with attached western washroom & geyser at ₹6,500/month per bed (3-times daily Andhra mess food included).
                  </p>
                  <div className="layout-amenities-strip">
                    <span className="layout-amenity-chip"><Wind size={13} /> Spacious Non-AC Ventilation</span>
                    <span className="layout-amenity-chip"><Bath size={13} /> Attached Washroom + Geyser</span>
                    <span className="layout-amenity-chip"><Utensils size={13} /> 3 Andhra Meals Daily</span>
                    <span className="layout-amenity-chip"><Building size={13} /> 4 Beds / Room</span>
                  </div>
                </div>
              </div>

              <div className="layout-banner-stats">
                <div className="layout-stat-card vacant-stat">
                  <span className="stat-num">{stats.vacantBeds}</span>
                  <span className="stat-label">Vacant Beds</span>
                  <span className="stat-sub">Available Now</span>
                </div>
                <div className="layout-stat-card occupied-stat">
                  <span className="stat-num">{stats.occupiedBeds}</span>
                  <span className="stat-label">Active Residents</span>
                  <span className="stat-sub">{stats.occupancyRate}% Occupancy</span>
                </div>
                <div className="layout-stat-card capacity-stat">
                  <span className="stat-num">{stats.totalBeds}</span>
                  <span className="stat-label">Total Beds</span>
                  <span className="stat-sub">Across 7 Rooms</span>
                </div>
              </div>
            </div>

            {/* Floor by floor controller */}
            <div className="owner-floors-list">
              {data.floors
                .filter(f => selectedFloorId === 'all' || f.id === selectedFloorId)
                .map(floor => (
                  <div key={floor.id} className="owner-floor-block card">
                    <div className="owner-floor-header">
                      <div className="floor-title-wrap">
                        <span className="floor-badge-tag">{floor.name}</span>
                        <span className="floor-desc-sub">{floor.description}</span>
                      </div>
                      <div className="floor-summary-pill">
                        <span className="vacant-count-num">
                          {floor.rooms.reduce((acc, r) => acc + r.beds.filter(b => !b.isOccupied).length, 0)} Vacant Beds
                        </span>
                        <span> / {floor.rooms.reduce((acc, r) => acc + r.beds.length, 0)} Total Beds</span>
                      </div>
                    </div>

                    <div className="owner-rooms-grid">
                      {floor.rooms.map(room => {
                        const vacantCount = room.beds.filter(b => !b.isOccupied).length;
                        const occupiedCount = room.beds.length - vacantCount;

                        return (
                          <div key={room.id} className="owner-room-box">
                            <div className="room-box-top">
                              <div className="room-header-info">
                                <div className="room-title-line">
                                  <span className="room-pill">ROOM {room.number}</span>
                                  <span className="room-badge-micro">{room.type}</span>
                                  <span className="room-share-badge">{room.sharing}-Sharing</span>
                                  <span className={`room-vacancy-pill ${vacantCount > 0 ? 'pill-has-vacant' : 'pill-is-full'}`}>
                                    {vacantCount > 0 ? `${vacantCount} Vacant` : 'Full'}
                                  </span>
                                </div>
                                <span className="room-meta-sub">
                                  Fixed ₹{room.rentPerBed.toLocaleString('en-IN')}/mo • {occupiedCount}/{room.beds.length} Beds Occupied • Attached Western Bath
                                </span>
                              </div>

                              <div className="quick-room-actions">
                                <button
                                  type="button"
                                  className="quick-btn red-btn"
                                  onClick={() => setRoomVacancy(floor.id, room.id, true)}
                                  title="Mark all 4 beds in this room as occupied"
                                >
                                  Mark Full
                                </button>
                                <button
                                  type="button"
                                  className="quick-btn green-btn"
                                  onClick={() => setRoomVacancy(floor.id, room.id, false)}
                                  title="Mark all 4 beds in this room as vacant"
                                >
                                  Mark Vacant
                                </button>
                              </div>
                            </div>

                            {/* Beds list */}
                            <div className="owner-beds-matrix">
                              {room.beds.map((bed) => {
                                const isOccupied = bed.isOccupied;
                                const cleanPhone = (bed.studentPhone || '').replace(/[^0-9]/g, '');
                                const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                                const isPaid = bed.rentStatus === 'Paid';

                                return (
                                  <div
                                    key={bed.id}
                                    className={`owner-bed-card ${isOccupied ? 'is-occupied' : 'is-vacant'}`}
                                  >
                                    {/* Top Row: Bed # and Status */}
                                    <div className="bed-top-row">
                                      <div className="bed-id-wrap">
                                        <Bed size={13} className="bed-icon-muted" />
                                        <span className="bed-id-label">Bed #{bed.bedNumber}</span>
                                      </div>
                                      <span className={`status-pill ${isOccupied ? 'pill-occupied' : 'pill-vacant'}`}>
                                        {isOccupied ? 'OCCUPIED' : 'VACANT'}
                                      </span>
                                    </div>

                                    {/* Bed Card Body */}
                                    {isOccupied ? (
                                      <div className="bed-card-body">
                                        <div className="candidate-name" title={bed.studentName}>
                                          <User size={13} className="user-icon-subtle" />
                                          <span className="name-truncate">{bed.studentName || 'Occupied Resident'}</span>
                                        </div>
                                        
                                        <div className="candidate-college-tag" title={bed.college || 'Resident'}>
                                          <GraduationCap size={12} />
                                          <span className="college-truncate">{bed.college || 'Student / Resident'}</span>
                                        </div>

                                        <div className="candidate-badges-row">
                                          <span className={`rent-pill ${isPaid ? 'paid' : 'pending'}`}>
                                            {isPaid ? '🟢 Paid' : `🔴 Due: ₹${bed.dueAmount || room.rentPerBed}`}
                                          </span>
                                          <span className="diet-pill">
                                            {bed.foodPreference === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                                          </span>
                                        </div>

                                        <div className="candidate-phone-row">
                                          {bed.studentPhone ? (
                                            <>
                                              <span className="phone-text">📞 {bed.studentPhone}</span>
                                              <div className="contact-quick-icons">
                                                <a
                                                  href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                                                    `Hello ${bed.studentName}, message from ${data.pgInfo.ownerName} (Andhra PG Room ${room.number}, Bed #${bed.bedNumber}).`
                                                  )}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="micro-wa-btn"
                                                  title="Send WhatsApp text to student"
                                                  onClick={e => e.stopPropagation()}
                                                >
                                                  <MessageCircle size={12} />
                                                </a>
                                                <a
                                                  href={`tel:${cleanPhone}`}
                                                  className="micro-call-btn"
                                                  title="Call student"
                                                  onClick={e => e.stopPropagation()}
                                                >
                                                  <Phone size={12} />
                                                </a>
                                              </div>
                                            </>
                                          ) : (
                                            <span className="no-phone-muted">📞 No mobile added</span>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bed-card-body vacant-body">
                                        <div className="vacant-title-line">
                                          <CheckCircle size={13} className="vacant-check-icon" />
                                          <span className="vacant-main-title">Available Bed Space</span>
                                        </div>
                                        
                                        <div className="vacant-meta-line">
                                          <Building size={12} />
                                          <span>4-Sharing Non-AC Room {room.number}</span>
                                        </div>

                                        <div className="candidate-badges-row">
                                          <span className="rent-pill vacant-price">₹{room.rentPerBed.toLocaleString('en-IN')}/mo</span>
                                          <span className="diet-pill vacant-food">🍲 3 Meals</span>
                                        </div>

                                        <div className="vacant-perk-line">
                                          <span>🚿 Attached Bath + Geyser</span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Action Buttons on Bed Card - Always pinned to bottom */}
                                    <div className="bed-card-actions">
                                      {isOccupied ? (
                                        <>
                                          <button
                                            type="button"
                                            className="btn-bed-action edit-btn"
                                            onClick={() => handleOpenCandidateEdit(floor, room, bed)}
                                            title="Edit candidate details in this room"
                                          >
                                            <Edit size={13} />
                                            <span>Edit Details</span>
                                          </button>

                                          <button
                                            type="button"
                                            className="btn-bed-action vacate-btn"
                                            onClick={() => vacateBed(floor.id, room.id, bed.id)}
                                            title="Mark bed as vacant"
                                          >
                                            <Trash2 size={13} />
                                            <span>Vacate</span>
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            className="btn-bed-action assign-btn"
                                            onClick={() => handleOpenCandidateEdit(floor, room, bed)}
                                            title="Assign new candidate to this bed"
                                          >
                                            <UserPlus size={13} />
                                            <span>+ Assign Student</span>
                                          </button>

                                          <button
                                            type="button"
                                            className="btn-bed-action fill-btn"
                                            onClick={() => toggleBedOccupancy(floor.id, room.id, bed.id)}
                                            title="Quick toggle occupancy"
                                          >
                                            <Check size={13} />
                                            <span>Fill</span>
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: CANDIDATE DIRECTORY & FEE REGISTER */}
        {activeTab === 'directory' && (
          <div className="tab-pane">
            {/* Header with Print & Stats */}
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Hostel Candidate Directory & Fee Register</h3>
                <p className="pane-subtitle">
                  Comprehensive resident register across Ground & First Floor. Search candidates, track monthly ₹6,500 rent, and view Sunday mess dietary counts.
                </p>
              </div>

              <div className="directory-top-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handlePrintDirectory}
                  title="Print or export resident register"
                >
                  <Printer size={15} />
                  <span>Print Register</span>
                </button>
              </div>
            </div>

            {/* Mess Kitchen & Collection KPI Strip */}
            <div className="directory-summary-strip card">
              <div className="dir-kpi-item">
                <span className="dir-kpi-title">Active Residents</span>
                <span className="dir-kpi-val orange-text">{stats.occupiedBeds} / {stats.totalBeds}</span>
                <span className="dir-kpi-sub">{stats.vacantBeds} beds available for new admissions</span>
              </div>

              <div className="dir-kpi-item">
                <span className="dir-kpi-title">Paid Rents (This Month)</span>
                <span className="dir-kpi-val green-text">
                  {stats.paidRentCount || 0} Students
                </span>
                <span className="dir-kpi-sub">₹{((stats.paidRentCount || 0) * 6500).toLocaleString('en-IN')} collected</span>
              </div>

              <div className="dir-kpi-item">
                <span className="dir-kpi-title">Pending Rents Due</span>
                <span className="dir-kpi-val red-text">
                  {stats.pendingRentCount || 0} Students
                </span>
                <span className="dir-kpi-sub">₹{(stats.totalPendingRentAmount || 0).toLocaleString('en-IN')} pending collection</span>
              </div>

              <div className="dir-kpi-item">
                <span className="dir-kpi-title">Sunday Mess Headcount</span>
                <span className="dir-kpi-val blue-text">
                  🍗 {stats.sundayNonVegCount || 0} <span className="sub-diet-text">Non-Veg</span> • 🥬 {stats.sundayVegCount || 0} <span className="sub-diet-text">Veg</span>
                </span>
                <span className="dir-kpi-sub">Helps kitchen prepare right food quantity</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="directory-toolbar card">
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by student name, phone, room (e.g. G01, 102), or college..."
                  value={directorySearch}
                  onChange={e => setDirectorySearch(e.target.value)}
                  className="form-input search-field"
                />
                {directorySearch && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => setDirectorySearch('')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="filter-dropdowns-row">
                <select
                  value={directoryFloorFilter}
                  onChange={e => setDirectoryFloorFilter(e.target.value)}
                  className="form-select dir-select"
                >
                  <option value="all">All Floors</option>
                  <option value="floor-ground">Ground Floor (G01-G03)</option>
                  <option value="floor-first">First Floor (101-104)</option>
                </select>

                <select
                  value={directoryRentFilter}
                  onChange={e => setDirectoryRentFilter(e.target.value)}
                  className="form-select dir-select"
                >
                  <option value="all">All Rent Statuses</option>
                  <option value="Paid">🟢 Paid Only</option>
                  <option value="Pending">🔴 Pending Due Only</option>
                </select>

                <select
                  value={directoryFoodFilter}
                  onChange={e => setDirectoryFoodFilter(e.target.value)}
                  className="form-select dir-select"
                >
                  <option value="all">All Diet Types</option>
                  <option value="Non-Veg">🍗 Sunday Non-Veg</option>
                  <option value="Veg">🥬 Pure Vegetarian</option>
                </select>

                <label className="checkbox-toggle-label">
                  <input
                    type="checkbox"
                    checked={showVacantRows}
                    onChange={e => setShowVacantRows(e.target.checked)}
                  />
                  <span>Show Vacant Slots</span>
                </label>
              </div>
            </div>

            {/* Residents Directory Table */}
            <div className="directory-table-card card">
              {filteredCandidates.length === 0 ? (
                <div className="no-candidates-found">
                  <p>No candidates match your search filter.</p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setDirectorySearch('');
                      setDirectoryFloorFilter('all');
                      setDirectoryRentFilter('all');
                      setDirectoryFoodFilter('all');
                      setShowVacantRows(false);
                    }}
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="candidate-directory-table">
                    <thead>
                      <tr>
                        <th>Room & Bed</th>
                        <th>Student Name & Contact</th>
                        <th>College / Course</th>
                        <th>Joining Date</th>
                        <th>Rent (₹6,500)</th>
                        <th>Sunday Food</th>
                        <th>Emergency Phone</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map(({ floor, room, bed }) => {
                        const cleanPhone = (bed.studentPhone || '').replace(/[^0-9]/g, '');
                        const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                        const isOccupied = bed.isOccupied;
                        const isPaid = bed.rentStatus === 'Paid';

                        if (!isOccupied) {
                          return (
                            <tr key={bed.id} className="vacant-row">
                              <td>
                                <span className="room-bed-badge vacant">
                                  Room {room.number} • Bed #{bed.bedNumber}
                                </span>
                              </td>
                              <td colSpan="5">
                                <span className="vacant-label-text">
                                  Empty Vacant Bed ({floor.name}) — Available for New Admission
                                </span>
                              </td>
                              <td>-</td>
                              <td className="text-right">
                                <button
                                  type="button"
                                  className="btn btn-primary-soft btn-sm"
                                  onClick={() => handleOpenCandidateEdit(floor, room, bed)}
                                >
                                  <UserPlus size={13} />
                                  <span>Assign Student</span>
                                </button>
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <tr key={bed.id} className="resident-row">
                            {/* Room & Bed */}
                            <td>
                              <div className="room-bed-cell">
                                <span className="room-bed-badge">
                                  Room {room.number}
                                </span>
                                <span className="bed-number-tag">Bed #{bed.bedNumber}</span>
                                <span className="floor-tiny-name">{floor.name}</span>
                              </div>
                            </td>

                            {/* Candidate Name & Phone */}
                            <td>
                              <div className="candidate-cell">
                                <strong className="candidate-name-text">{bed.studentName}</strong>
                                {bed.studentPhone ? (
                                  <div className="phone-link-row">
                                    <span className="phone-digits">📱 {bed.studentPhone}</span>
                                    <a
                                      href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                                        `Hello ${bed.studentName}, message from SathyaNarayana (Andhra PG, Room ${room.number}).`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="table-wa-icon"
                                      title="WhatsApp student"
                                    >
                                      <MessageCircle size={13} />
                                    </a>
                                    <a
                                      href={`tel:${cleanPhone}`}
                                      className="table-call-icon"
                                      title="Call student"
                                    >
                                      <Phone size={13} />
                                    </a>
                                  </div>
                                ) : (
                                  <span className="no-phone-muted">No phone added</span>
                                )}
                              </div>
                            </td>

                            {/* College */}
                            <td>
                              <span className="college-text">{bed.college || 'BIET Student'}</span>
                            </td>

                            {/* Joining Date */}
                            <td>
                              <span className="date-text">{bed.joiningDate || '-'}</span>
                            </td>

                            {/* Rent Status */}
                            <td>
                              <div className="rent-cell">
                                <span className={`rent-status-pill ${isPaid ? 'paid' : 'pending'}`}>
                                  {isPaid ? '🟢 Paid' : `🔴 Due: ₹${bed.dueAmount || room.rentPerBed}`}
                                </span>
                                {!isPaid && (
                                  <button
                                    type="button"
                                    className="quick-paid-btn"
                                    onClick={() => recordRentPayment(floor.id, room.id, bed.id, 'Paid', 0)}
                                    title="Mark rent as cleared"
                                  >
                                    Mark Paid
                                  </button>
                                )}
                              </div>
                            </td>

                            {/* Sunday Mess Diet */}
                            <td>
                              <span className={`food-diet-tag ${bed.foodPreference === 'Veg' ? 'veg' : 'nonveg'}`}>
                                {bed.foodPreference === 'Veg' ? '🥬 Pure Veg' : '🍗 Non-Veg'}
                              </span>
                            </td>

                            {/* Emergency Contact */}
                            <td>
                              <span className="emergency-text">{bed.emergencyContact || '-'}</span>
                            </td>

                            {/* Action Buttons */}
                            <td className="text-right">
                              <div className="table-actions-group">
                                <button
                                  type="button"
                                  className="action-icon-btn edit"
                                  onClick={() => handleOpenCandidateEdit(floor, room, bed)}
                                  title="Edit student information"
                                >
                                  <Edit size={14} />
                                </button>

                                {cleanPhone && !isPaid && (
                                  <a
                                    href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                                      `Hello ${bed.studentName}, this is SathyaNarayana from Andhra PG. Your monthly hostel rent of ₹${bed.dueAmount || room.rentPerBed || 6500} for Room ${room.number} (Bed #${bed.bedNumber}) is currently pending. Please arrange the payment. Thank you!`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-icon-btn wa"
                                    title="Send WhatsApp rent reminder"
                                  >
                                    <MessageCircle size={14} />
                                  </a>
                                )}

                                <button
                                  type="button"
                                  className="action-icon-btn delete"
                                  onClick={() => vacateBed(floor.id, room.id, bed.id)}
                                  title="Vacate candidate and free bed"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ROOM RENTS & PRICING MANAGER */}
        {activeTab === 'rent' && (
          <div className="tab-pane">
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Room Rent & Pricing Manager</h3>
                <p className="pane-subtitle">
                  Update monthly rent per bed for any room. All rooms are non-ac standard budget rooms with attached washroom at ₹6,500/month.
                </p>
              </div>
            </div>

            <div className="rent-editor-grid">
              {data.floors.map(floor => (
                <div key={floor.id} className="card">
                  <h4 className="floor-card-title">{floor.name}</h4>
                  <div className="rooms-table-wrap">
                    <table className="owner-table">
                      <thead>
                        <tr>
                          <th>Room</th>
                          <th>Sharing</th>
                          <th>Type</th>
                          <th>Current Rent (₹)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {floor.rooms.map(room => (
                          <tr key={room.id}>
                            <td><strong>Room {room.number}</strong></td>
                            <td>{room.sharing}-Sharing</td>
                            <td>{room.type}</td>
                            <td>
                              <input
                                type="number"
                                defaultValue={room.rentPerBed}
                                className="form-input table-input"
                                onBlur={(e) => updateRoomRent(floor.id, room.id, e.target.value)}
                              />
                            </td>
                            <td>
                              <span className="saved-indicator">Auto-saves on blur</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MESS MENU EDITOR */}
        {activeTab === 'menu' && (
          <div className="tab-pane">
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Andhra Mess Weekly Food Menu Editor</h3>
                <p className="pane-subtitle">
                  Select a day of the week to update Breakfast, Lunch, Evening Snacks, and Dinner dishes.
                </p>
              </div>
            </div>

            <div className="menu-editor-layout">
              {/* Day Selector */}
              <div className="menu-days-nav">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`menu-day-btn ${menuEditDay === day ? 'active' : ''}`}
                    onClick={() => handleDayChange(day)}
                  >
                    <span>{day}</span>
                    {day === 'Sunday' && <span className="tiny-tag">Chicken Feast</span>}
                    {day === 'Wednesday' && <span className="tiny-tag">Non-Veg Special</span>}
                  </button>
                ))}
              </div>

              {/* Menu Form */}
              <form onSubmit={handleSaveMenu} className="menu-form-card card">
                <h4 className="editing-day-heading">
                  Editing Menu for: <span className="highlight-text">{menuEditDay}</span>
                </h4>

                <div className="form-group">
                  <label className="form-label">Breakfast (7:30 AM - 10:00 AM)</label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    value={menuForm.breakfast || ''}
                    onChange={e => setMenuForm({ ...menuForm, breakfast: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Lunch (12:30 PM - 2:45 PM)</label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    value={menuForm.lunch || ''}
                    onChange={e => setMenuForm({ ...menuForm, lunch: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Evening Refreshment (5:00 PM - 6:30 PM)</label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    value={menuForm.snack || ''}
                    onChange={e => setMenuForm({ ...menuForm, snack: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Dinner (7:30 PM - 10:15 PM)</label>
                  <textarea
                    rows="2"
                    className="form-textarea"
                    value={menuForm.dinner || ''}
                    onChange={e => setMenuForm({ ...menuForm, dinner: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>Save {menuEditDay} Menu Changes</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="tab-pane">
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Student Inquiries & Free Visit Passes</h3>
                <p className="pane-subtitle">
                  All visit requests submitted by students from the website appear here. Click to chat on WhatsApp or update visit progress.
                </p>
              </div>
            </div>

            <div className="inquiries-list">
              {(data.initialInquiries || []).length === 0 ? (
                <div className="empty-leads card">No inquiries yet. New visit requests will appear here.</div>
              ) : (
                (data.initialInquiries || []).map(inq => {
                  const whatsappChatUrl = `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${inq.name}, I am ${data.pgInfo.ownerName} from Andhra PG. I received your visit request (${inq.sharingPreference}). When would you like to visit our hostel?`
                  )}`;

                  return (
                    <div key={inq.id} className="inquiry-card card">
                      <div className="inquiry-top">
                        <div>
                          <div className="inquiry-student-name">
                            {inq.name}
                            {inq.passCode && <span className="pass-chip">{inq.passCode}</span>}
                          </div>
                          <div className="inquiry-college">{inq.collegeOrCompany || 'College Student'}</div>
                        </div>

                        <div className="inquiry-status-group">
                          <select
                            value={inq.status}
                            onChange={e => updateInquiryStatus(inq.id, e.target.value)}
                            className="status-dropdown"
                          >
                            <option value="New">Status: New</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Visit Scheduled">Status: Visit Scheduled</option>
                            <option value="Joined">Status: Joined PG</option>
                            <option value="Cancelled">Status: Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="inquiry-details-grid">
                        <div>
                          <span className="det-label">Phone / WhatsApp:</span>
                          <span className="det-val">{inq.phone}</span>
                        </div>
                        <div>
                          <span className="det-label">Room Preference:</span>
                          <span className="det-val">{inq.sharingPreference}</span>
                        </div>
                        <div>
                          <span className="det-label">Planned Date:</span>
                          <span className="det-val">{inq.plannedMoveInDate || 'Flexible'}</span>
                        </div>
                        <div>
                          <span className="det-label">Food:</span>
                          <span className="det-val">{inq.foodPreference || 'Non-Veg'}</span>
                        </div>
                      </div>

                      {inq.notes && (
                        <div className="inquiry-note-box">
                          <strong>Student Note:</strong> {inq.notes}
                        </div>
                      )}

                      <div className="inquiry-actions-row">
                        <span className="inquiry-time">{inq.timestamp}</span>

                        <div className="action-btns-group">
                          <a
                            href={whatsappChatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp Student</span>
                          </a>
                          <a
                            href={`tel:${inq.phone}`}
                            className="btn btn-call btn-sm"
                          >
                            <Phone size={14} />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 6: PG SETTINGS & CONTACT */}
        {activeTab === 'settings' && (
          <div className="tab-pane">
            <div className="pane-header glass-panel">
              <div>
                <h3 className="pane-title">Hostel Details & Owner Contact Settings</h3>
                <p className="pane-subtitle">
                  Configure primary owner WhatsApp number, phone number, address, and house rules.
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePgInfo} className="settings-form card">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Hostel Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.name}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Owner / Warden Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.ownerName}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, ownerName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Owner WhatsApp Number (without +)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.whatsapp}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, whatsapp: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Mobile Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.phone}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Alternate Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.alternatePhone}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, alternatePhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gate Closing Time</label>
                  <input
                    type="text"
                    className="form-input"
                    value={pgInfoForm.gateClosingTime}
                    onChange={e => setPgInfoForm({ ...pgInfoForm, gateClosingTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address</label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  value={pgInfoForm.address}
                  onChange={e => setPgInfoForm({ ...pgInfoForm, address: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                <span>Save All Hostel Settings</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Candidate Modal for Editing Student Details in Specified Room & Bed */}
      <CandidateModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        floor={editingBedContext?.floor}
        room={editingBedContext?.room}
        bed={editingBedContext?.bed}
        onSave={handleSaveCandidate}
        onVacate={handleVacateCandidate}
        ownerName={data.pgInfo.ownerName}
      />

      <style>{`
        .owner-portal-section {
          padding: 2.5rem 0 4rem 0;
          background-color: #0b1120;
          min-height: calc(100vh - 120px);
        }

        .owner-hero-panel {
          padding: 2rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          border-left: 4px solid #10b981;
        }

        .owner-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #34d399;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .owner-dashboard-heading {
          font-size: 2.2rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .owner-dashboard-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 720px;
        }

        .kpi-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .kpi-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: #111a30;
          padding: 1.25rem;
        }

        .kpi-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .green-icon { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .orange-icon { background: rgba(234, 88, 12, 0.15); color: #fb923c; }
        .gold-icon { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .blue-icon { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }

        .kpi-info { flex: 1; }

        .kpi-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .kpi-number {
          font-family: var(--font-heading);
          font-size: 1.7rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .sub-diet {
          font-size: 1.1rem;
          color: #34d399;
          font-weight: 700;
        }

        .kpi-sub {
          font-size: 0.75rem;
          color: var(--text-subtle);
        }

        .pending-text {
          color: #f87171;
          font-weight: 600;
        }

        .all-clear-text {
          color: #34d399;
          font-weight: 600;
        }

        .owner-tab-nav {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          overflow-x: auto;
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .owner-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .owner-tab-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.07);
        }
        .owner-tab-btn.active {
          background: #10b981;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .pane-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem 1.75rem;
          margin-bottom: 1.75rem;
        }

        .pane-title {
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }

        .pane-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .floor-quick-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-label {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .select-sm {
          padding: 0.35rem 0.75rem;
          font-size: 0.85rem;
        }

        /* OWNER BLUEPRINT LAYOUT DETAILS BANNER */
        .owner-layout-details-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1.5rem 1.75rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(234, 88, 12, 0.25);
          border-left: 4px solid #ea580c;
        }

        .layout-banner-left {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          flex: 1;
          min-width: 300px;
        }

        .layout-banner-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: rgba(234, 88, 12, 0.15);
          border: 1px solid rgba(234, 88, 12, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .layout-banner-content {
          flex: 1;
        }

        .layout-banner-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #fb923c;
          margin-bottom: 0.35rem;
        }

        .layout-banner-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }

        .layout-banner-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 0.75rem;
          max-width: 740px;
        }

        .layout-amenities-strip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .layout-amenity-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .layout-banner-stats {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .layout-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 105px;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .layout-stat-card .stat-num {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          line-height: 1;
        }

        .layout-stat-card.vacant-stat .stat-num { color: #34d399; }
        .layout-stat-card.occupied-stat .stat-num { color: #fb923c; }
        .layout-stat-card.capacity-stat .stat-num { color: #60a5fa; }

        .layout-stat-card .stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-main);
          margin-top: 0.25rem;
        }

        .layout-stat-card .stat-sub {
          font-size: 0.68rem;
          color: var(--text-subtle);
        }

        /* FLOOR SECTIONS & ROOM GRID */
        .owner-floors-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .owner-floor-block {
          background: #111a30;
          padding: 1.75rem;
        }

        .owner-floor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .floor-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .floor-badge-tag {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: #fb923c;
        }

        .floor-desc-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .floor-summary-pill {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .vacant-count-num {
          color: #34d399;
          font-weight: 700;
        }

        .owner-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
          align-items: stretch;
        }

        @media (max-width: 640px) {
          .owner-rooms-grid {
            grid-template-columns: 1fr;
          }
        }

        .owner-room-box {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .room-box-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .room-header-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .room-title-line {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .room-pill {
          font-weight: 800;
          color: #ffffff;
          font-size: 1.1rem;
          letter-spacing: -0.01em;
        }

        .room-badge-micro {
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .room-share-badge {
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .room-vacancy-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.12rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .room-vacancy-pill.pill-has-vacant {
          background: rgba(16, 185, 129, 0.18);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .room-vacancy-pill.pill-is-full {
          background: rgba(239, 68, 68, 0.18);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.35);
        }

        .room-meta-sub {
          font-size: 0.74rem;
          color: #94a3b8;
          display: block;
        }

        .quick-room-actions {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .quick-btn {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .red-btn { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .red-btn:hover { background: #ef4444; color: #fff; }
        .green-btn { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
        .green-btn:hover { background: #10b981; color: #fff; }

        /* BEDS MATRIX & BALANCED CARDS */
        .owner-beds-matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          flex: 1;
          align-items: stretch;
        }

        @media (max-width: 480px) {
          .owner-beds-matrix {
            grid-template-columns: 1fr;
          }
        }

        .owner-bed-card {
          padding: 0.85rem;
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
          border: 1px solid transparent;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
          height: 100%;
        }

        .owner-bed-card.is-vacant {
          background: rgba(16, 185, 129, 0.06);
          border-color: rgba(16, 185, 129, 0.25);
        }
        .owner-bed-card.is-vacant:hover {
          border-color: rgba(16, 185, 129, 0.45);
        }

        .owner-bed-card.is-occupied {
          background: #0f172a;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .owner-bed-card.is-occupied:hover {
          border-color: rgba(234, 88, 12, 0.35);
        }

        .bed-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.45rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .bed-id-wrap {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .bed-icon-muted {
          color: var(--text-muted);
        }

        .bed-id-label {
          font-weight: 800;
          font-size: 0.82rem;
          color: #ffffff;
        }

        .status-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.03em;
        }
        .pill-vacant { background: #10b981; color: #fff; }
        .pill-occupied { background: #ea580c; color: #fff; }

        .bed-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 0.2rem 0;
          min-height: 105px;
        }

        .candidate-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .user-icon-subtle {
          color: #fb923c;
          flex-shrink: 0;
        }

        .name-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .candidate-college-tag {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          line-height: 1.3;
        }

        .college-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .candidate-badges-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
          margin-top: 0.1rem;
        }

        .rent-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }
        .rent-pill.paid { background: rgba(16, 185, 129, 0.18); color: #34d399; }
        .rent-pill.pending { background: rgba(239, 68, 68, 0.18); color: #f87171; }

        .diet-pill {
          font-size: 0.68rem;
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .candidate-phone-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.73rem;
          color: #94a3b8;
          margin-top: auto;
          padding-top: 0.2rem;
        }

        .contact-quick-icons {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .micro-wa-btn {
          color: #25d366;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          border-radius: 4px;
          background: rgba(37, 211, 102, 0.15);
          transition: transform 0.15s;
        }
        .micro-wa-btn:hover {
          transform: scale(1.15);
        }

        .micro-call-btn {
          color: #60a5fa;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          border-radius: 4px;
          background: rgba(96, 165, 250, 0.15);
          transition: transform 0.15s;
        }
        .micro-call-btn:hover {
          transform: scale(1.15);
        }

        .no-phone-muted {
          font-size: 0.72rem;
          color: var(--text-subtle);
        }

        /* VACANT BODY STYLING */
        .vacant-body {
          justify-content: flex-start;
        }

        .vacant-title-line {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #34d399;
        }

        .vacant-check-icon {
          color: #34d399;
          flex-shrink: 0;
        }

        .vacant-main-title {
          font-weight: 700;
        }

        .vacant-meta-line {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .vacant-price {
          background: rgba(16, 185, 129, 0.18);
          color: #34d399;
          font-weight: 700;
        }

        .vacant-food {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
        }

        .vacant-perk-line {
          font-size: 0.7rem;
          color: #64748b;
          font-style: italic;
          margin-top: auto;
          padding-top: 0.2rem;
        }

        /* ACTIONS PINNED TO BOTTOM */
        .bed-card-actions {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: auto;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-bed-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.35rem 0.55rem;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-bed-action.edit-btn {
          flex: 1;
          background: rgba(59, 130, 246, 0.18);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.35);
        }
        .btn-bed-action.edit-btn:hover {
          background: #3b82f6;
          color: #ffffff;
        }

        .btn-bed-action.vacate-btn {
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.25);
        }
        .btn-bed-action.vacate-btn:hover {
          background: #ef4444;
          color: #ffffff;
        }

        .btn-bed-action.assign-btn {
          flex: 1;
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.4);
        }
        .btn-bed-action.assign-btn:hover {
          background: #10b981;
          color: #ffffff;
        }

        .btn-bed-action.fill-btn {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border-color: rgba(255, 255, 255, 0.1);
          padding: 0.35rem 0.6rem;
        }
        .btn-bed-action.fill-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        /* DIRECTORY TAB STYLES */
        .directory-summary-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
          background: #111a30;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
        }

        .dir-kpi-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .dir-kpi-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .dir-kpi-val {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
        }

        .sub-diet-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .dir-kpi-sub {
          font-size: 0.72rem;
          color: var(--text-subtle);
        }

        .directory-toolbar {
          background: #111a30;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-field {
          padding-left: 2.4rem;
          padding-right: 2rem;
          width: 100%;
        }

        .clear-search-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .filter-dropdowns-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .dir-select {
          padding: 0.4rem 0.8rem;
          font-size: 0.82rem;
          background: #0f172a;
        }

        .checkbox-toggle-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          cursor: pointer;
        }

        .directory-table-card {
          background: #111a30;
          padding: 0;
          overflow: hidden;
        }

        .candidate-directory-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }

        .candidate-directory-table th {
          text-align: left;
          padding: 0.85rem 1rem;
          background: rgba(15, 23, 42, 0.9);
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .candidate-directory-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          vertical-align: middle;
        }

        .candidate-directory-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .room-bed-cell {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .room-bed-badge {
          display: inline-block;
          font-weight: 800;
          color: #fb923c;
          font-size: 0.85rem;
        }

        .room-bed-badge.vacant {
          color: #34d399;
        }

        .bed-number-tag {
          font-size: 0.74rem;
          color: #60a5fa;
          font-weight: 700;
        }

        .floor-tiny-name {
          font-size: 0.68rem;
          color: var(--text-subtle);
        }

        .candidate-cell {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .candidate-name-text {
          color: #ffffff;
          font-size: 0.92rem;
        }

        .phone-link-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .table-wa-icon {
          color: #25d366;
          display: inline-flex;
          align-items: center;
        }

        .table-call-icon {
          color: #60a5fa;
          display: inline-flex;
          align-items: center;
        }

        .college-text {
          color: #cbd5e1;
          font-size: 0.82rem;
        }

        .date-text {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .rent-cell {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: flex-start;
        }

        .rent-status-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .rent-status-pill.paid { background: rgba(16, 185, 129, 0.18); color: #34d399; }
        .rent-status-pill.pending { background: rgba(239, 68, 68, 0.18); color: #f87171; }

        .quick-paid-btn {
          font-size: 0.68rem;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 4px;
          padding: 0.1rem 0.35rem;
          cursor: pointer;
          font-weight: 700;
        }
        .quick-paid-btn:hover {
          background: #10b981;
          color: #fff;
        }

        .food-diet-tag {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .food-diet-tag.nonveg { background: rgba(249, 115, 22, 0.15); color: #fb923c; }
        .food-diet-tag.veg { background: rgba(16, 185, 129, 0.15); color: #34d399; }

        .emergency-text {
          font-size: 0.8rem;
          color: #cbd5e1;
        }

        .table-actions-group {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.4rem;
        }

        .action-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .action-icon-btn.edit {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }
        .action-icon-btn.edit:hover {
          background: #3b82f6;
          color: #fff;
        }

        .action-icon-btn.wa {
          background: rgba(37, 211, 102, 0.15);
          color: #25d366;
          border-color: rgba(37, 211, 102, 0.3);
        }
        .action-icon-btn.wa:hover {
          background: #25d366;
          color: #fff;
        }

        .action-icon-btn.delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .action-icon-btn.delete:hover {
          background: #ef4444;
          color: #fff;
        }

        .vacant-row {
          background: rgba(16, 185, 129, 0.03);
        }

        .vacant-label-text {
          color: #34d399;
          font-size: 0.82rem;
          font-style: italic;
        }

        .btn-primary-soft {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          font-weight: 700;
        }
        .btn-primary-soft:hover {
          background: #10b981;
          color: #fff;
        }

        .no-candidates-found {
          padding: 3rem 1rem;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .text-right {
          text-align: right;
        }

        .rent-editor-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 1.5rem;
          align-items: stretch;
          margin-top: 1rem;
        }

        .rooms-table-wrap {
          overflow-x: auto;
          margin-top: 0.5rem;
        }

        .owner-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.5rem;
        }

        .owner-table th {
          text-align: left;
          padding: 0.75rem 1rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          background: rgba(15, 23, 42, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .owner-table td {
          padding: 0.75rem 1rem;
          font-size: 0.86rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          vertical-align: middle;
        }

        .table-input {
          width: 130px;
          padding: 0.4rem 0.65rem;
          font-size: 0.86rem;
          background: #0f172a;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-sm);
        }

        .saved-indicator {
          font-size: 0.72rem;
          color: #34d399;
          font-weight: 600;
        }

        .floor-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
          color: #fb923c;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .menu-editor-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 1.75rem;
        }

        @media (max-width: 800px) {
          .menu-editor-layout {
            grid-template-columns: 1fr;
          }
        }

        .menu-days-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-day-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background: #111a30;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .menu-day-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
        .menu-day-btn.active {
          background: #ea580c;
          color: #fff;
          border-color: #ea580c;
        }

        .tiny-tag {
          font-size: 0.65rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-full);
        }

        .editing-day-heading {
          font-size: 1.2rem;
          margin-bottom: 1.25rem;
        }

        .inquiries-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .inquiry-card {
          background: #111a30;
          padding: 1.5rem;
        }

        .inquiry-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .inquiry-student-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .pass-chip {
          background: rgba(234, 88, 12, 0.2);
          color: #fb923c;
          border: 1px solid rgba(234, 88, 12, 0.35);
          font-size: 0.75rem;
          font-family: monospace;
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .inquiry-college {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .status-dropdown {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fbbf24;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          outline: none;
        }

        .inquiry-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }

        .det-label {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .det-val {
          color: #ffffff;
          font-weight: 600;
        }

        .inquiry-note-box {
          background: rgba(15, 23, 42, 0.5);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: #cbd5e1;
          margin-bottom: 1rem;
          border-left: 3px solid #38bdf8;
        }

        .inquiry-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .inquiry-time {
          font-size: 0.75rem;
          color: var(--text-subtle);
        }

        .action-btns-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .empty-leads {
          text-align: center;
          padding: 3rem;
          color: var(--text-muted);
        }

        .settings-form {
          background: #111a30;
          padding: 2rem;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .candidate-directory-table, .candidate-directory-table * {
            visibility: visible;
          }
          .candidate-directory-table {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: #000;
            background: #fff;
          }
          .candidate-directory-table th {
            background: #eee;
            color: #000;
          }
          .candidate-directory-table td {
            color: #000;
            border-bottom: 1px solid #ccc;
          }
        }
      `}</style>
    </section>
  );
}
