export const INITIAL_PG_DATA = {
  pgInfo: {
    name: "Andhra PG & Homely Mess",
    brandSubtitle: "Authentic Andhra Homely Flavors • Best Stay for BIET Students",
    tagline: "Feel at Home with Real Andhra Pappu, High-Speed Wi-Fi & Homely Discipline",
    ownerName: "SathyaNarayana",
    ownerRole: "PG Owner & Warden",
    phone: "7760348003",
    whatsapp: "917760348003",
    alternatePhone: "6364316016",
    alternateWhatsapp: "916364316016",
    email: "andhrapgdavangere@gmail.com",
    address: "Near MORE Super Market, BIET West Gate, Davangere, Karnataka 577004",
    landmark: "Near MORE Super Market • Just 2 Mins Walk from BIET West Gate",
    collegeNearby: "Bapuji Institute of Engineering and Technology (BIET)",
    rating: 4.9,
    reviewCount: 148,
    costPerCandidate: 6500,
    roomType: "Non-AC (All Rooms)",
    gateClosingTime: "10:00 PM (Prior permission required for late college submissions)",
    securityDeposit: "₹2,000 (100% Refundable on checkout)",
    noticePeriod: "15 Days WhatsApp Notice Required Before Vacating",
    ownerPassword: "andhra123" // Secure Owner Portal Password
  },

  floors: [
    {
      id: "floor-ground",
      name: "Ground Floor",
      description: "Dining Hall, Warden Desk & 3 Spacious 4-Sharing Rooms",
      rooms: [
        {
          id: "G01",
          number: "G01",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: false,
          rentPerBed: 6500,
          beds: [
            {
              id: "G01-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "Sai Kiran",
              studentPhone: "9845123451",
              college: "BIET Davangere - CSE (3rd Year)",
              joiningDate: "2026-07-15",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9845098765 (Father - Venkatesh)",
              foodPreference: "Non-Veg",
              notes: "Room Representative. Attends 8 AM lab sessions."
            },
            {
              id: "G01-2",
              bedNumber: 2,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "G01-3",
              bedNumber: 3,
              isOccupied: true,
              studentName: "M. Venkatesh",
              studentPhone: "9731245678",
              college: "BIET Davangere - Mech (4th Year)",
              joiningDate: "2026-06-10",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9731298711 (Parent)",
              foodPreference: "Non-Veg",
              notes: "Has a two-wheeler parked near PG gate."
            },
            {
              id: "G01-4",
              bedNumber: 4,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            }
          ]
        },
        {
          id: "G02",
          number: "G02",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: false,
          rentPerBed: 6500,
          beds: [
            {
              id: "G02-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "Praveen Kumar",
              studentPhone: "9900112233",
              college: "BIET Davangere - Civil (2nd Year)",
              joiningDate: "2026-08-01",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9900114455 (Brother)",
              foodPreference: "Veg",
              notes: "Strict Andhra pure vegetarian meals counter."
            },
            {
              id: "G02-2",
              bedNumber: 2,
              isOccupied: true,
              studentName: "M. Dinesh",
              studentPhone: "9448123890",
              college: "BIET Davangere - ECE (3rd Year)",
              joiningDate: "2026-07-20",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "9448001122 (Father)",
              foodPreference: "Non-Veg",
              notes: "Rent due on 5th of every month."
            },
            {
              id: "G02-3",
              bedNumber: 3,
              isOccupied: true,
              studentName: "Chaitanya K.",
              studentPhone: "8197123456",
              college: "BIET Davangere - MBA (1st Year)",
              joiningDate: "2026-08-10",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "8197998877 (Father)",
              foodPreference: "Non-Veg",
              notes: "Evening study library access required."
            },
            {
              id: "G02-4",
              bedNumber: 4,
              isOccupied: true,
              studentName: "S. Rohit",
              studentPhone: "7892113344",
              college: "BIET Davangere - EEE (2nd Year)",
              joiningDate: "2026-08-15",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "7892556677 (Parent)",
              foodPreference: "Veg",
              notes: "Pure veg diet. Separate utensils."
            }
          ]
        },
        {
          id: "G03",
          number: "G03",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: false,
          rentPerBed: 6500,
          beds: [
            {
              id: "G03-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "Naveen Reddy",
              studentPhone: "9611224455",
              college: "BIET Davangere - CSE (2nd Year)",
              joiningDate: "2026-08-05",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9611889900 (Uncle)",
              foodPreference: "Non-Veg",
              notes: "Room key set provided."
            },
            {
              id: "G03-2",
              bedNumber: 2,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "G03-3",
              bedNumber: 3,
              isOccupied: true,
              studentName: "Tarun Varma",
              studentPhone: "9035112233",
              college: "BIET Davangere - AI & DS (1st Year)",
              joiningDate: "2026-09-01",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "9035778899 (Father)",
              foodPreference: "Non-Veg",
              notes: "New admission. Security deposit paid."
            },
            {
              id: "G03-4",
              bedNumber: 4,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            }
          ]
        }
      ]
    },
    {
      id: "floor-first",
      name: "First Floor",
      description: "Quiet Upper Floor with 4 Spacious 4-Sharing Rooms & Ventilation",
      rooms: [
        {
          id: "101",
          number: "101",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: true,
          rentPerBed: 6500,
          beds: [
            {
              id: "101-1",
              bedNumber: 1,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "101-2",
              bedNumber: 2,
              isOccupied: true,
              studentName: "K. Karthik",
              studentPhone: "9886112244",
              college: "BIET Davangere - ISE (3rd Year)",
              joiningDate: "2026-07-01",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9886445566 (Father)",
              foodPreference: "Non-Veg",
              notes: "Balcony room access."
            },
            {
              id: "101-3",
              bedNumber: 3,
              isOccupied: true,
              studentName: "Deepak Naidu",
              studentPhone: "9741223344",
              college: "BIET Davangere - MCA (2nd Year)",
              joiningDate: "2026-08-01",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9741889900 (Mother)",
              foodPreference: "Veg",
              notes: "Pure veg preference on Sundays."
            },
            {
              id: "101-4",
              bedNumber: 4,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            }
          ]
        },
        {
          id: "102",
          number: "102",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: true,
          rentPerBed: 6500,
          beds: [
            {
              id: "102-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "R. Harsha",
              studentPhone: "9632114455",
              college: "BIET Davangere - Civil (4th Year)",
              joiningDate: "2026-06-15",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9632889911 (Parent)",
              foodPreference: "Non-Veg",
              notes: "Final year project work."
            },
            {
              id: "102-2",
              bedNumber: 2,
              isOccupied: true,
              studentName: "Anil Chowdary",
              studentPhone: "9535116677",
              college: "BIET Davangere - CSE (3rd Year)",
              joiningDate: "2026-07-10",
              rentStatus: "Partially Paid",
              dueAmount: 3000,
              emergencyContact: "9535990022 (Father)",
              foodPreference: "Non-Veg",
              notes: "Paid ₹3,500 advance. Balance ₹3,000 pending."
            },
            {
              id: "102-3",
              bedNumber: 3,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "102-4",
              bedNumber: 4,
              isOccupied: true,
              studentName: "B. Mohan",
              studentPhone: "9148112233",
              college: "BIET Davangere - Mech (2nd Year)",
              joiningDate: "2026-08-20",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9148667788 (Brother)",
              foodPreference: "Non-Veg",
              notes: "Regular resident."
            }
          ]
        },
        {
          id: "103",
          number: "103",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: false,
          rentPerBed: 6500,
          beds: [
            {
              id: "103-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "P. Rajesh",
              studentPhone: "8861114433",
              college: "BIET Davangere - ECE (4th Year)",
              joiningDate: "2026-07-01",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "8861556677 (Parent)",
              foodPreference: "Non-Veg",
              notes: "Campus placement prep."
            },
            {
              id: "103-2",
              bedNumber: 2,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "103-3",
              bedNumber: 3,
              isOccupied: true,
              studentName: "G. Suresh",
              studentPhone: "8088112244",
              college: "BIET Davangere - EEE (3rd Year)",
              joiningDate: "2026-08-01",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "8088778899 (Father)",
              foodPreference: "Veg",
              notes: "Vegetarian mess counter. Rent reminder sent."
            },
            {
              id: "103-4",
              bedNumber: 4,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            }
          ]
        },
        {
          id: "104",
          number: "104",
          sharing: 4,
          type: "Non-AC",
          attachedBath: true,
          balcony: true,
          rentPerBed: 6500,
          beds: [
            {
              id: "104-1",
              bedNumber: 1,
              isOccupied: true,
              studentName: "Vijay Anand",
              studentPhone: "7019113355",
              college: "BIET Davangere - CSE (1st Year)",
              joiningDate: "2026-09-01",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "7019778800 (Father)",
              foodPreference: "Non-Veg",
              notes: "Corner bed near window. Laptop registered."
            },
            {
              id: "104-2",
              bedNumber: 2,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "104-3",
              bedNumber: 3,
              isOccupied: false,
              studentName: "",
              studentPhone: "",
              college: "",
              joiningDate: "",
              rentStatus: "Pending",
              dueAmount: 6500,
              emergencyContact: "",
              foodPreference: "Non-Veg",
              notes: ""
            },
            {
              id: "104-4",
              bedNumber: 4,
              isOccupied: true,
              studentName: "Surya Prakash",
              studentPhone: "9449112233",
              college: "BIET Davangere - Chemical (2nd Year)",
              joiningDate: "2026-08-15",
              rentStatus: "Paid",
              dueAmount: 0,
              emergencyContact: "9449889922 (Parent)",
              foodPreference: "Non-Veg",
              notes: "Regular resident."
            }
          ]
        }
      ]
    }
  ],

  rentPricingList: [
    {
      sharing: "4-Sharing Standard Room (All Rooms)",
      badge: "Standard Fixed Plan",
      popular: true,
      price: "₹6,500",
      deposit: "₹2,000 (100% Refundable)",
      features: [
        "Fixed Rent: ₹6,500 / month per candidate (Non-AC)",
        "Includes 3-Times Daily Authentic Andhra Mess Food",
        "Sunday Special Chicken Feast / Separate Vegetarian Feast",
        "High-Speed 5G Wi-Fi with repeaters on both floors",
        "Individual Wooden/Steel Wardrobe with independent lock",
        "Box Bed with comfortable mattress & pillow",
        "Daily Room Cleaning & Floor Mopping",
        "24/7 Hot Water Geyser in attached washroom",
        "Free Automatic Washing Machine access on terrace",
        "RO Filtered Pure Cold & Normal Drinking Water",
        "Covered Two-Wheeler Parking inside gated premises"
      ]
    }
  ],

  weeklyFoodMenu: {
    Monday: {
      breakfast: "Hot Ghee Idli & Crispy Medu Vada with Peanut Chutney & Tomato Chutney + Hot Tea",
      lunch: "Steamed Sona Masoori Rice, Andhra Gongura Pappu, Cabbage Poriyal, Tomato Rasam, Fresh Curd, Appadam",
      dinner: "Hot Phulkas / Chapatis, Aloo Gobi Masala Curry, Steamed Rice, Dal Tadka, Spiced Majjiga (Buttermilk)",
      snack: "Hot Masala Chai / Filter Coffee & Onion Pakodi"
    },
    Tuesday: {
      breakfast: "Hot Ghee Upma & Authentic MLA Pesarattu with Ginger (Allam) Pachadi & Coconut Chutney",
      lunch: "Steamed Rice, Andhra Tomato Pappu with Pure Ghee, Bendakaya (Okra) Cashew Fry, Drumstick Sambar, Curd & Avakaya",
      dinner: "Methi Poori / Chapatis, Mixed Vegetable Kurma, Steamed Rice, Palak Sambar, Curd",
      snack: "Hot Filter Coffee / Tea & Crispy Punugulu with Chutney"
    },
    Wednesday: {
      breakfast: "Mysore Bonda (Crispy outside, fluffy inside) with Red Coconut Chutney & Tea",
      lunch: "Steamed Rice, Dosakaya Pappu (Yellow Cucumber Dal), Crispy Potato Roast, Pepper Charu, Fresh Curd",
      dinner: "Vegetable Fried Rice / Chapatis, Dal Makhani, Steamed Rice, Fresh Curd",
      snack: "Hot Tea & Andhra Style Mirchi Bajji (Chilli Fritters)"
    },
    Thursday: {
      breakfast: "Crispy Karam Dosa & Plain Dosa with Potato Masala, Drumstick Sambar & 2 Chutneys",
      lunch: "Mudda Pappu with Pure Ghee & Hot Rice, Avakaya Pickle, Dondakaya (Tindora) Fry, Majjiga Pulusu, Sweet Boondi",
      dinner: "Fresh Phulkas, Paneer Butter Masala, Jeera Rice, Dal Fry, Fresh Curd",
      snack: "Filter Coffee & Boiled Sweet Corn / Groundnut Sundal"
    },
    Friday: {
      breakfast: "Fluffy Hot Pooris with Bombay Potato Chana Gravy, Semiya Kheer & Tea",
      lunch: "Steamed Sona Masoori Rice, Andhra Palak Pappu (Spinach Dal), Soya Meal Maker & Potato Masala Curry, Tomato Charu, Fresh Curd & Appadam",
      dinner: "Soft Chapatis, Chana Masala Curry, Bagara Rice, Dal Tadka, Cold Buttermilk",
      snack: "Masala Chai & Corn Samosas"
    },
    Saturday: {
      breakfast: "Crispy Rava Onion Dosa / Uttapam with Coconut Chutney & Tomato Chutney",
      lunch: "Steamed Rice, Tomato Dal, Bangaladumpa (Potato) Roast, Sambar, Appadalu, Fresh Curd",
      dinner: "Phulkas, Mix Vegetable Kadai, Lemon Rice / Curd Rice with Pomegranate, Pickle",
      snack: "Tea / Coffee & Banana Bajji"
    },
    Sunday: {
      isSundaySpecial: true,
      breakfast: "Chole Bhature / Soft Idli with Vada, Sambar & Filter Coffee",
      lunch: "🍗 SUNDAY NON-VEG FEAST: Delicious Andhra Chicken Curry with Steamed Sona Masoori Rice, Egg & Pepper Rasam | 🥗 100% SEPARATE VEGETARIAN DISHES & COUNTER: Paneer Butter Masala / Veg Dum Biryani, Mixed Veg Kurma, Salad, Fresh Curd & Hot Gulab Jamun (Cooked with separate utensils)",
      dinner: "Light Soft Chapatis, Mixed Dal Fry, Steamed Rice, Tomato Rasam, Spiced Majjiga",
      snack: "Evening Special Tea & Davangere Mirchi Bajji / Mixture"
    }
  },

  messTimings: [
    { title: "Morning Tea & Coffee", time: "6:30 AM - 8:30 AM", notes: "Filter coffee & Ginger tea" },
    { title: "Healthy Breakfast", time: "7:30 AM - 9:45 AM", notes: "Hot breakfast with sambar & chutneys" },
    { title: "Lunch Hours", time: "12:30 PM - 2:30 PM", notes: "Early College lunch box packing at 7:45 AM!" },
    { title: "Evening Snacks", time: "5:00 PM - 6:30 PM", notes: "Freshly made hot snacks & tea" },
    { title: "Delicious Dinner", time: "7:30 PM - 10:00 PM", notes: "Fresh rotis, hot curries & rice" }
  ],

  amenities: [
    {
      category: "Food & Mess",
      icon: "Utensils",
      title: "3 Times Homely Andhra Food",
      desc: "Unlimited authentic Andhra meals with pure ghee, podi, gongura & pickles. Sunday Chicken & separate Pure Veg feast."
    },
    {
      category: "Connectivity",
      icon: "Wifi",
      title: "High-Speed 5G Wi-Fi",
      desc: "Dedicated Wi-Fi routers on Ground & First floor for smooth college studies and project work."
    },
    {
      category: "Hygiene",
      icon: "Sparkles",
      title: "Daily Housekeeping",
      desc: "Daily room mopping, corridor cleaning, dustbins clearance, and regular bathroom sanitization."
    },
    {
      category: "Laundry",
      icon: "Shirt",
      title: "Automatic Washing Machine",
      desc: "Modern washing machine on the terrace with dedicated clothes drying area."
    },
    {
      category: "Hot Water",
      icon: "Flame",
      title: "24/7 Hot Water Geyser",
      desc: "Instant hot water geysers in attached washrooms for morning college readiness."
    },
    {
      category: "Drinking Water",
      icon: "Droplets",
      title: "Multi-Stage RO Mineral Water",
      desc: "Clean drinking water dispensaries with normal and chilled water on both floors."
    },
    {
      category: "Safety",
      icon: "ShieldCheck",
      title: "24/7 CCTV & Security",
      desc: "CCTV cameras in common entrances and safe residential locality near BIET West Gate."
    },
    {
      category: "Parking",
      icon: "Bike",
      title: "Covered Two-Wheeler Parking",
      desc: "Safe parking space for bikes and scooters inside the gated premises."
    },
    {
      category: "Furnishing",
      icon: "BedDouble",
      title: "Box Bed & Private Wardrobe",
      desc: "Comfortable mattress, pillow, and individual steel/wooden wardrobe with lock and key."
    }
  ],

  galleryImages: [
    {
      id: 1,
      category: "Rooms",
      title: "Clean 4-Sharing Student Room",
      desc: "Spacious room with 4 separate beds, personal wardrobes, and attached washroom.",
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      category: "Dining & Food",
      title: "Sunday Special Chicken & Separate Veg Meal",
      desc: "Served hot with Andhra chicken curry or paneer butter masala, rasam, curd and sweet.",
      url: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      category: "Dining & Food",
      title: "Hostel Dining Hall",
      desc: "Clean seating area with stainless steel tables and RO drinking water dispenser.",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      category: "Building & Facilities",
      title: "Hostel Building Near BIET West Gate",
      desc: "Quiet, convenient 2-storey building just 2 minutes walk from BIET college and MORE super market.",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      category: "Washrooms",
      title: "Attached Clean Bathroom with Geyser",
      desc: "Tiled modern washrooms with continuous 24/7 hot water supply.",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      category: "Building & Facilities",
      title: "Terrace Clothes Drying & Washing Area",
      desc: "Automatic washing machine and spacious rooftop with clothes drying lines.",
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    }
  ],

  initialInquiries: [
    {
      id: "inq-1",
      name: "T. Aditya Reddy",
      phone: "+91 97042 11890",
      collegeOrCompany: "BIET Davangere (CSE 2nd Year)",
      sharingPreference: "4-Sharing Non-AC (₹6,500)",
      plannedMoveInDate: "2026-10-05",
      foodPreference: "Non-Veg",
      notes: "Looking for room in 1st floor near BIET gate",
      timestamp: "Today, 11:20 AM",
      status: "New"
    },
    {
      id: "inq-2",
      name: "S. Manikanta",
      phone: "+91 89192 33411",
      collegeOrCompany: "BIET Davangere (ECE)",
      sharingPreference: "4-Sharing Non-AC (₹6,500)",
      plannedMoveInDate: "2026-10-01",
      foodPreference: "Veg",
      notes: "Need morning lunch box packing for 8 AM college lab",
      timestamp: "Yesterday, 4:45 PM",
      status: "Contacted"
    }
  ],

  reviews: [
    {
      name: "P. Kiran Kumar",
      role: "BIET Davangere, 3rd Year CSE",
      avatar: "KK",
      rating: 5,
      date: "September 2026",
      comment: "Best PG for BIET students! Just a 2-minute walk from West Gate. The Andhra food is authentic — Gongura Pappu and Sunday Chicken taste homely. SathyaNarayana sir is very cooperative and maintains discipline."
    },
    {
      name: "R. Chetan",
      role: "BIET Mechanical Student",
      avatar: "RC",
      rating: 5,
      date: "August 2026",
      comment: "Clean 4-sharing rooms at ₹6500 with 3 times food is the best value in Davangere. Sunday non-veg is great, and my vegetarian roommate gets delicious paneer cooked separately."
    },
    {
      name: "M. Venkatesh",
      role: "BIET Civil Engineering",
      avatar: "MV",
      rating: 5,
      date: "September 2026",
      comment: "SathyaNarayana uncle is very supportive. Whenever we go home for holidays, we just text on WhatsApp. Location is prime right opposite MORE super market."
    }
  ],

  houseRules: [
    "Hostel Gate closes at 10:00 PM sharp for student safety and study discipline.",
    "IMPORTANT: If you are going on college holidays or vacating the hostel, inform owner SathyaNarayana sir in advance via WhatsApp.",
    "Strictly No Smoking, No Alcohol, and No Substance abuse inside PG premises.",
    "Sunday Non-Veg is prepared fresh with high hygiene; vegetarian meals are strictly prepared and served separately.",
    "Day visitors/parents permitted in the ground floor reception area between 9:00 AM to 7:00 PM.",
    "Switch off geysers, lights, and fans when leaving the room."
  ]
};
