import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PG_DATA } from '../data/initialData';

const PGContext = createContext(null);

const STORAGE_KEY = 'andhra_pg_app_v5'; // v5 with candidate/student directory & room editor

export function PGProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load PG data from localStorage', e);
    }
    return INITIAL_PG_DATA;
  });

  const [activeView, setActiveViewInternal] = useState('student'); // 'student' or 'owner'
  const [activeFloorFilter, setActiveFloorFilter] = useState('all');
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [holidayNoticeType, setHolidayNoticeType] = useState('holiday'); // 'holiday' or 'vacate'
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedVisitRoom, setSelectedVisitRoom] = useState(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  // Securely guard view switching: Owner view is strictly password-gated
  const setActiveView = (view) => {
    if (view === 'owner' && !isOwnerAuthenticated) {
      setIsPasswordModalOpen(true);
      return;
    }
    setActiveViewInternal(view);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist PG data', e);
    }
  }, [data]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Password Verification for Owner Portal
  const authenticateOwner = (enteredPassword) => {
    const currentPassword = data.pgInfo.ownerPassword || 'andhra123';
    if (enteredPassword.trim() === currentPassword) {
      setIsOwnerAuthenticated(true);
      setActiveViewInternal('owner');
      setIsPasswordModalOpen(false);
      showToast('Owner access unlocked successfully!');
      return true;
    } else {
      showToast('Incorrect password. Access denied.', 'error');
      return false;
    }
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
    setActiveViewInternal('student');
    showToast('Owner session locked. Switched to Student View.', 'info');
  };

  const updateOwnerPassword = (newPass) => {
    if (!newPass || newPass.length < 4) {
      showToast('Password must be at least 4 characters long', 'error');
      return false;
    }
    setData(prev => ({
      ...prev,
      pgInfo: {
        ...prev.pgInfo,
        ownerPassword: newPass
      }
    }));
    showToast('Owner password updated successfully!');
    return true;
  };

  // Request to switch to owner view (checks authentication)
  const requestOwnerAccess = () => {
    if (isOwnerAuthenticated) {
      setActiveView('owner');
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  // Update Candidate / Student Information in a specified room & bed (Owner Only)
  const updateCandidateInfo = (floorId, roomId, bedId, candidateData) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    const hasName = Boolean(candidateData.studentName && candidateData.studentName.trim());

    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              beds: room.beds.map(bed => {
                if (bed.id !== bedId) return bed;
                const nextOccupied = candidateData.isOccupied !== undefined ? candidateData.isOccupied : hasName;
                return {
                  ...bed,
                  ...candidateData,
                  isOccupied: nextOccupied,
                  studentName: candidateData.studentName || (nextOccupied ? 'Occupied Resident' : '')
                };
              })
            };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Resident information saved for Room ${roomId} (Bed #${bedId.split('-')[1] || bedId})`);
  };

  // Vacate Bed / Remove Candidate (Owner Only)
  const vacateBed = (floorId, roomId, bedId) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              beds: room.beds.map(bed => {
                if (bed.id !== bedId) return bed;
                return {
                  ...bed,
                  isOccupied: false,
                  studentName: '',
                  studentPhone: '',
                  college: '',
                  joiningDate: '',
                  rentStatus: 'Pending',
                  dueAmount: room.rentPerBed || 6500,
                  emergencyContact: '',
                  foodPreference: 'Non-Veg',
                  notes: ''
                };
              })
            };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Bed in Room ${roomId} is now vacant`);
  };

  // Record Rent Payment or change status (Owner Only)
  const recordRentPayment = (floorId, roomId, bedId, rentStatus = 'Paid', dueAmount = 0) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              beds: room.beds.map(bed => {
                if (bed.id !== bedId) return bed;
                return {
                  ...bed,
                  rentStatus,
                  dueAmount: rentStatus === 'Paid' ? 0 : dueAmount
                };
              })
            };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Rent updated to ${rentStatus} for Room ${roomId}`);
  };

  // Toggle single bed occupancy (Owner Only)
  const toggleBedOccupancy = (floorId, roomId, bedId, studentName = '') => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              beds: room.beds.map(bed => {
                if (bed.id !== bedId) return bed;
                const nextState = !bed.isOccupied;
                if (!nextState) {
                  // Vacating
                  return {
                    ...bed,
                    isOccupied: false,
                    studentName: '',
                    studentPhone: '',
                    college: '',
                    joiningDate: '',
                    rentStatus: 'Pending',
                    dueAmount: room.rentPerBed || 6500,
                    emergencyContact: '',
                    notes: ''
                  };
                }
                return {
                  ...bed,
                  isOccupied: true,
                  studentName: studentName || bed.studentName || 'Resident Candidate',
                  rentStatus: bed.rentStatus || 'Paid',
                  dueAmount: bed.rentStatus === 'Pending' ? (room.rentPerBed || 6500) : 0
                };
              })
            };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Updated bed vacancy in Room ${roomId}`);
  };

  // Bulk set room vacancy (Owner Only)
  const setRoomVacancy = (floorId, roomId, isAllOccupied) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return {
              ...room,
              beds: room.beds.map(bed => ({
                ...bed,
                isOccupied: isAllOccupied,
                studentName: isAllOccupied ? 'Occupied' : ''
              }))
            };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Marked Room ${roomId} as ${isAllOccupied ? 'Full' : 'All Beds Vacant'}`);
  };

  // Update room rent (Owner Only)
  const updateRoomRent = (floorId, roomId, newRent) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    const rentNum = parseInt(newRent, 10);
    if (isNaN(rentNum) || rentNum <= 0) return;
    setData(prev => {
      const newFloors = prev.floors.map(floor => {
        if (floor.id !== floorId) return floor;
        return {
          ...floor,
          rooms: floor.rooms.map(room => {
            if (room.id !== roomId) return room;
            return { ...room, rentPerBed: rentNum };
          })
        };
      });
      return { ...prev, floors: newFloors };
    });
    showToast(`Updated Room ${roomId} rent to ₹${rentNum.toLocaleString('en-IN')}`);
  };

  // Update PG Info (Owner Only)
  const updatePgInfo = (fields) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => ({
      ...prev,
      pgInfo: {
        ...prev.pgInfo,
        ...fields
      }
    }));
    showToast('PG Information & Contacts updated successfully!');
  };

  // Update Food Menu (Owner Only)
  const updateFoodMenu = (day, mealType, text) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => ({
      ...prev,
      weeklyFoodMenu: {
        ...prev.weeklyFoodMenu,
        [day]: {
          ...prev.weeklyFoodMenu[day],
          [mealType]: text
        }
      }
    }));
    showToast(`Updated ${day} ${mealType} menu`);
  };

  // Add new student inquiry
  const addInquiry = (inquiry) => {
    const newEntry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      timestamp: 'Just now',
      status: 'New'
    };
    setData(prev => ({
      ...prev,
      initialInquiries: [newEntry, ...(prev.initialInquiries || [])]
    }));
    showToast('Visit pass generated! Owner SathyaNarayana notified.');
  };

  // Update Inquiry Status (Owner Only)
  const updateInquiryStatus = (inquiryId, newStatus) => {
    if (!isOwnerAuthenticated) {
      requestOwnerAccess();
      return;
    }

    setData(prev => ({
      ...prev,
      initialInquiries: (prev.initialInquiries || []).map(inq => 
        inq.id === inquiryId ? { ...inq, status: newStatus } : inq
      )
    }));
    showToast(`Inquiry status updated to ${newStatus}`);
  };

  // Reset to default demo data
  const resetToDefault = () => {
    setData(INITIAL_PG_DATA);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset data to default 2-floor layout', 'info');
  };

  // Dynamic statistics
  const stats = React.useMemo(() => {
    let totalBeds = 0;
    let occupiedBeds = 0;
    let vacantBeds = 0;
    let paidRentCount = 0;
    let pendingRentCount = 0;
    let totalPendingRentAmount = 0;
    let sundayNonVegCount = 0;
    let sundayVegCount = 0;

    data.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        room.beds.forEach(bed => {
          totalBeds++;
          if (bed.isOccupied) {
            occupiedBeds++;
            if (bed.rentStatus === 'Paid') {
              paidRentCount++;
            } else {
              pendingRentCount++;
              totalPendingRentAmount += Number(bed.dueAmount || 0);
            }

            if (bed.foodPreference === 'Veg') {
              sundayVegCount++;
            } else {
              sundayNonVegCount++;
            }
          } else {
            vacantBeds++;
          }
        });
      });
    });

    const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    return {
      totalBeds,
      occupiedBeds,
      vacantBeds,
      occupancyRate,
      totalRooms: data.floors.reduce((acc, f) => acc + f.rooms.length, 0),
      totalFloors: data.floors.length,
      totalResidents: occupiedBeds,
      paidRentCount,
      pendingRentCount,
      totalPendingRentAmount,
      sundayNonVegCount,
      sundayVegCount
    };
  }, [data]);

  return (
    <PGContext.Provider
      value={{
        data,
        stats,
        activeView,
        setActiveView,
        activeFloorFilter,
        setActiveFloorFilter,
        isOwnerAuthenticated,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        authenticateOwner,
        logoutOwner,
        updateOwnerPassword,
        requestOwnerAccess,
        toastMessage,
        showToast,
        toggleBedOccupancy,
        updateCandidateInfo,
        vacateBed,
        recordRentPayment,
        setRoomVacancy,
        updateRoomRent,
        updatePgInfo,
        updateFoodMenu,
        addInquiry,
        updateInquiryStatus,
        resetToDefault,
        selectedVisitRoom,
        setSelectedVisitRoom,
        isVisitModalOpen,
        setIsVisitModalOpen,
        isHolidayModalOpen,
        setIsHolidayModalOpen,
        holidayNoticeType,
        setHolidayNoticeType
      }}
    >
      {children}
    </PGContext.Provider>
  );
}

export function usePG() {
  const context = useContext(PGContext);
  if (!context) {
    throw new Error('usePG must be used within a PGProvider');
  }
  return context;
}
