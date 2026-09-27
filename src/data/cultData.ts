export interface WorkoutFormat {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  calories: string;
  duration: string;
  intensity: 'Medium' | 'High' | 'Very High' | 'Moderate';
  focus: string;
  image: string;
  popularFor: string;
}

export interface CultCenter {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  image: string;
  timings: string;
  amenities: string[];
  formatsAvailable: string[];
  phone: string;
}

export interface ClassSlot {
  id: string;
  formatId: string;
  formatName: string;
  centerId: string;
  centerName: string;
  city: string;
  dateKey: string; // 'today', 'tomorrow', 'day2', 'day3'
  dateLabel: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  trainerName: string;
  trainerRole: string;
  trainerImage: string;
  spotsLeft: number;
  totalSpots: number;
  intensity: string;
  calories: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  color: string;
  prices: {
    months3: number;
    months12: number;
    months14Festive: number;
  };
  originalPrices: {
    months3: number;
    months12: number;
    months14Festive: number;
  };
  emiStartsFrom: string;
  features: string[];
  freebies: string[];
  pauseDays: number;
}

export interface TransformationStory {
  id: string;
  name: string;
  city: string;
  center: string;
  duration: string;
  highlightMetric: string;
  quote: string;
  workoutPreference: string;
  trainerAssigned: string;
  stats: {
    weightChange: string;
    bodyFatChange: string;
    energyScore: string;
  };
}

export const CULT_CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi-NCR',
  'Hyderabad',
  'Pune',
  'Chennai'
] as const;

export type CultCity = (typeof CULT_CITIES)[number];

// High fidelity generated images paths
export const CULT_IMAGES = {
  hero: '/src/assets/images/cult_hero_gym_1790493514465.jpg',
  strength: '/src/assets/images/cult_strength_class_1790493531949.jpg',
  dance: '/src/assets/images/cult_dance_fitness_1790493544004.jpg',
  boxing: '/src/assets/images/cult_boxing_combat_1790493557109.jpg',
  gymFloor: '/src/assets/images/cult_elite_gym_floor_1790493573344.jpg',
};

export const WORKOUT_FORMATS: WorkoutFormat[] = [
  {
    id: 'hrx',
    name: 'HRX Workout',
    subtitle: 'By Hrithik Roshan & Cult Athletes',
    description: 'Scientifically crafted high-intensity functional training designed to improve stamina, joint mobility, core stability, and total-body leanness.',
    calories: '550 - 650 kcal',
    duration: '50 mins',
    intensity: 'High',
    focus: 'Functional Strength, Hypertrophy & Posture',
    image: CULT_IMAGES.strength,
    popularFor: 'Athletic conditioning & rapid fat torching',
  },
  {
    id: 'strength_conditioning',
    name: 'Strength & Conditioning (S&C)',
    subtitle: 'Compound power & raw capacity',
    description: 'Kettlebells, Olympic bumper plates, rowers, and bodyweight progressions. Progressive overload combined with metcon intervals to build defined muscle.',
    calories: '600 - 750 kcal',
    duration: '50 mins',
    intensity: 'Very High',
    focus: 'Power, Hypertrophy & VO2 Max',
    image: CULT_IMAGES.hero,
    popularFor: 'Muscle definition and explosive performance',
  },
  {
    id: 'dance_fitness',
    name: 'Dance Fitness',
    subtitle: 'High-octane party workout',
    description: 'Cardio interval training disguised as a celebration. Move to curated Bollywood, Latin, and Hip-Hop beats with effortless calorie burn and infectious group energy.',
    calories: '500 - 600 kcal',
    duration: '50 mins',
    intensity: 'Medium',
    focus: 'Cardiovascular Endurance, Rhythm & Mood Lift',
    image: CULT_IMAGES.dance,
    popularFor: 'Fun high-calorie burn without heavy weights',
  },
  {
    id: 'cult_boxing',
    name: 'Boxing & Combat',
    subtitle: 'Aqua bags & strike conditioning',
    description: 'Technical jab-cross-hook combos on shock-absorbing water aqua bags, agility footwork drills, and core rotational power. Zero sparring, 100% intensity.',
    calories: '600 - 700 kcal',
    duration: '50 mins',
    intensity: 'Very High',
    focus: 'Upper Body Tone, Agility & Core Rotation',
    image: CULT_IMAGES.boxing,
    popularFor: 'Stress relief & rapid shoulder/arm toning',
  },
  {
    id: 'yoga_mobility',
    name: 'Yoga & Recovery',
    subtitle: 'Vinyasa flow & deep myofascial release',
    description: 'Dynamic breath-synchronized flows to expand range of motion, decompress spine and tight hip flexors from desk work, ending with guided mindfulness.',
    calories: '300 - 400 kcal',
    duration: '50 mins',
    intensity: 'Moderate',
    focus: 'Spinal Decompression, Flexibility & Mental Clarity',
    image: CULT_IMAGES.strength,
    popularFor: 'Injury prevention, mobility & peace of mind',
  },
  {
    id: 'elite_gym',
    name: 'Cult Gym Floor',
    subtitle: 'Free weights, Olympic rigs & bio-machines',
    description: 'Unlimited access to precision strength zones: Olympic deadlift platforms, Hammer Strength plate-loaded equipment, dumbbells up to 50kg, and expert floor trainers.',
    calories: '400 - 700 kcal',
    duration: 'Open Access',
    intensity: 'High',
    focus: 'Hypertrophy, Powerlifting & Body Sculpting',
    image: CULT_IMAGES.gymFloor,
    popularFor: 'Self-paced personalized weightlifting',
  },
];

export const CULT_CENTERS: CultCenter[] = [
  {
    id: 'blr-hsr',
    name: 'Cult HSR Layout 27th Main',
    city: 'Bengaluru',
    area: 'HSR Layout Sector 1',
    address: 'Plot 412, 27th Main Road, Sector 1, HSR Layout, Bengaluru, Karnataka 560102',
    rating: 4.9,
    reviewsCount: 1840,
    distance: '1.2 km away',
    image: CULT_IMAGES.hero,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Olympic Deadlift Platform', 'Biomechanical Turf Track', 'Steam & Hot Showers', 'Smart Digital Lockers', 'Valet Parking', 'Free High-Speed Wi-Fi', 'Juice & Protein Bar'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Boxing & Combat', 'Yoga', 'Cult Gym Floor'],
    phone: '+91 80 4710 8800',
  },
  {
    id: 'blr-indiranagar',
    name: 'Cult Indiranagar 100ft Road',
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: '840, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    rating: 4.9,
    reviewsCount: 2310,
    distance: '3.4 km away',
    image: CULT_IMAGES.gymFloor,
    timings: '6:00 AM – 11:00 PM',
    amenities: ['Aqua Bag Boxing Studio', 'Custom Dumbbell Rack to 50kg', 'Luxury Shower Suites', 'Technogym Bio-Rigs', 'Biometric Turnstiles', 'Cult Cafe Lounge'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Boxing & Combat', 'Dance Fitness', 'Cult Gym Floor'],
    phone: '+91 80 4710 8801',
  },
  {
    id: 'blr-koramangala',
    name: 'Cult Koramangala 80ft Road',
    city: 'Bengaluru',
    area: 'Koramangala 4th Block',
    address: '114, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    rating: 4.8,
    reviewsCount: 1950,
    distance: '2.8 km away',
    image: CULT_IMAGES.strength,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Indoor Sprint Turf', 'Steam Bath & Sauna', 'Eleiko Calibrated Plates', 'Smart Keyless Access', 'Air-Conditioned Studio'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Yoga & Mobility'],
    phone: '+91 80 4710 8802',
  },
  {
    id: 'mum-bandra',
    name: 'Cult Bandra West Linking Road',
    city: 'Mumbai',
    area: 'Bandra West',
    address: '3rd Floor, Kenilworth Mall, Linking Road, Bandra West, Mumbai, Maharashtra 400050',
    rating: 4.9,
    reviewsCount: 2100,
    distance: '1.8 km away',
    image: CULT_IMAGES.hero,
    timings: '6:00 AM – 11:00 PM',
    amenities: ['Rooftop Conditioning Deck', 'Hammer Strength ISO Machines', 'Steam & Recovery Room', 'Celebrity Master Trainers', 'Valet Parking'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Boxing & Combat', 'Dance Fitness', 'Cult Gym Floor'],
    phone: '+91 22 6912 3400',
  },
  {
    id: 'mum-lowerparel',
    name: 'Cult Lower Parel High Street',
    city: 'Mumbai',
    area: 'Lower Parel',
    address: 'Unit 4A, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013',
    rating: 4.8,
    reviewsCount: 1720,
    distance: '4.1 km away',
    image: CULT_IMAGES.gymFloor,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Precision Cardio Hub', 'Steam & Shower Suites', 'Digital Locker Grid', 'Express Corporate Slots', 'Towel Service'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Yoga & Mobility', 'Cult Gym Floor'],
    phone: '+91 22 6912 3401',
  },
  {
    id: 'del-cyberhub',
    name: 'Cult Cyber Hub Gurugram',
    city: 'Delhi-NCR',
    area: 'DLF Cyber City Phase 2',
    address: 'Building 10C, Ground Floor, DLF Cyber Hub, Gurugram, Haryana 122002',
    rating: 4.9,
    reviewsCount: 2890,
    distance: '0.8 km away',
    image: CULT_IMAGES.hero,
    timings: '6:00 AM – 11:00 PM',
    amenities: ['12,000 sq ft Mega Floor', 'Rowing & Ski-Erg Bay', 'Steam Room & Cold Mist Shower', 'Executive Workstations & Wi-Fi', 'Nutrition Bar'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Boxing & Combat', 'Dance Fitness', 'Cult Gym Floor'],
    phone: '+91 124 456 7890',
  },
  {
    id: 'del-cp',
    name: 'Cult Connaught Place Central',
    city: 'Delhi-NCR',
    area: 'Connaught Place',
    address: 'Block E, Inner Circle, Connaught Place, New Delhi, Delhi 110001',
    rating: 4.8,
    reviewsCount: 1450,
    distance: '3.2 km away',
    image: CULT_IMAGES.strength,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Heritage Vault Studio', 'Olympic Lifting Platforms', 'Steam & Change Rooms', 'High-Speed Wi-Fi', 'Parking Facility'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Yoga & Mobility'],
    phone: '+91 11 4321 9800',
  },
  {
    id: 'hyd-jubilee',
    name: 'Cult Jubilee Hills Road No. 36',
    city: 'Hyderabad',
    area: 'Jubilee Hills',
    address: 'Road No. 36, Near Peddamma Temple Metro, Jubilee Hills, Hyderabad, Telangana 500033',
    rating: 4.9,
    reviewsCount: 2410,
    distance: '2.1 km away',
    image: CULT_IMAGES.gymFloor,
    timings: '6:00 AM – 11:00 PM',
    amenities: ['Sprawling 10,000 sq ft Studio', 'Assault Bikes & Rowers', 'Steam & Grooming Station', 'Valet Parking', 'Protein Shake Bar'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Boxing & Combat', 'Dance Fitness', 'Cult Gym Floor'],
    phone: '+91 40 4910 5500',
  },
  {
    id: 'pun-koregaon',
    name: 'Cult Koregaon Park North Main',
    city: 'Pune',
    area: 'Koregaon Park',
    address: 'Lane 6, North Main Road, Koregaon Park, Pune, Maharashtra 411001',
    rating: 4.9,
    reviewsCount: 1670,
    distance: '1.5 km away',
    image: CULT_IMAGES.hero,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Lush Green Courtyard Studio', 'Woodway Curve Treadmills', 'Steam & Recovery Spa', 'Specialty Coffee Bar', 'Smart Locker Storage'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Yoga & Mobility', 'Cult Gym Floor'],
    phone: '+91 20 6710 4400',
  },
  {
    id: 'chn-adyar',
    name: 'Cult Adyar LB Road',
    city: 'Chennai',
    area: 'Adyar',
    address: 'Lattice Bridge Road, Near Adyar Signal, Adyar, Chennai, Tamil Nadu 600020',
    rating: 4.8,
    reviewsCount: 1530,
    distance: '2.4 km away',
    image: CULT_IMAGES.strength,
    timings: '6:00 AM – 10:30 PM',
    amenities: ['Olympic Deadlift Zone', 'Air-Conditioned Dance Floor', 'Steam & Luxury Showers', 'Biometric Smart Access', 'Covered Parking'],
    formatsAvailable: ['HRX Workout', 'Strength & Conditioning', 'Dance Fitness', 'Yoga & Mobility', 'Cult Gym Floor'],
    phone: '+91 44 4810 6600',
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'elite',
    name: 'cultpass ELITE',
    tagline: 'Unlimited access to Cult Centers, all group classes & Elite gyms nationwide.',
    badge: 'MOST POPULAR',
    isPopular: true,
    color: '#ff3278',
    prices: {
      months3: 10490,
      months12: 17490,
      months14Festive: 18990,
    },
    originalPrices: {
      months3: 15990,
      months12: 29990,
      months14Festive: 34990,
    },
    emiStartsFrom: '₹1,458 / month',
    features: [
      'Unlimited access to ALL Cult Centers across India',
      'Unlimited HRX, Strength, Boxing, Dance & Yoga group classes',
      'Unlimited entry to Cult Gym Floors with certified floor coaches',
      'Free pass pause up to 45 days (travel or illness)',
      'Free Cult.fit at-home live & on-demand workout sessions',
      'Book slots up to 4 days in advance via App',
      'Complimentary Cult FitKit & smart body composition scan',
    ],
    freebies: ['1 Free Session with Master Trainer', '45 Days Extension Pause', 'Cult Sports Bag'],
    pauseDays: 45,
  },
  {
    id: 'pro',
    name: 'cultpass PRO',
    tagline: 'Unlimited access to 450+ Cult PRO gyms with state-of-the-art machinery.',
    badge: 'BEST VALUE GYMS',
    isPopular: false,
    color: '#ff7733',
    prices: {
      months3: 7490,
      months12: 12990,
      months14Festive: 13990,
    },
    originalPrices: {
      months3: 11990,
      months12: 21990,
      months14Festive: 24990,
    },
    emiStartsFrom: '₹1,083 / month',
    features: [
      'Unlimited access to 450+ Cult PRO gyms in your city',
      '2 Cult group class sessions per month included',
      'Full access to Olympic free weights & cardio machines',
      'Floor trainers available for guidance & form checks',
      'Free pass pause up to 30 days',
      'Cult.fit smart app workout logger & progress tracker',
    ],
    freebies: ['Free Body Composition Analysis', '30 Days Membership Pause'],
    pauseDays: 30,
  },
  {
    id: 'play',
    name: 'cultpass PLAY',
    tagline: 'Unlimited sports access: Badminton, Swimming, Table Tennis & Pickleball.',
    badge: 'SPORTS & GAMES',
    isPopular: false,
    color: '#10b981',
    prices: {
      months3: 8490,
      months12: 14490,
      months14Festive: 15490,
    },
    originalPrices: {
      months3: 13990,
      months12: 24990,
      months14Festive: 27990,
    },
    emiStartsFrom: '₹1,208 / month',
    features: [
      'Unlimited court booking across premium sports facilities',
      'Badminton, Olympic-size Swimming Pools & Pickleball',
      'Certified coaches on-court for technique tips',
      'Equipment rental perks at participating sports hubs',
      'Matchmaking with players at your exact skill rating',
      'Free pass pause up to 30 days',
    ],
    freebies: ['Complimentary Yonex Racket Grip', 'Skill Assessment Session'],
    pauseDays: 30,
  },
  {
    id: 'home',
    name: 'cultpass HOME',
    tagline: 'Live interactive home workouts, celebrity masterclasses & guided yoga.',
    badge: 'AT-HOME FITNESS',
    isPopular: false,
    color: '#8b5cf6',
    prices: {
      months3: 2490,
      months12: 4490,
      months14Festive: 4990,
    },
    originalPrices: {
      months3: 4990,
      months12: 8990,
      months14Festive: 9990,
    },
    emiStartsFrom: '₹374 / month',
    features: [
      'Unlimited live interactive audio/video workout streams',
      'Energy meter & real-time calorie tracking on mobile/TV',
      'Celebrity masterclasses (Hrithik Roshan, Tiger Shroff & more)',
      'Guided meditations and sleep stories',
      'Personalized at-home dumbbell and bodyweight programs',
    ],
    freebies: ['Nutrition Consultation Blueprint'],
    pauseDays: 15,
  },
];

export const MOCK_CLASS_SLOTS: ClassSlot[] = [
  {
    id: 'slot-1',
    formatId: 'hrx',
    formatName: 'HRX Workout',
    centerId: 'blr-hsr',
    centerName: 'Cult HSR Layout 27th Main',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '06:00 AM - 06:50 AM',
    period: 'morning',
    trainerName: 'Rohan Deshmukh',
    trainerRole: 'Master Cult Trainer · ACE Certified',
    trainerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 3,
    totalSpots: 24,
    intensity: 'High',
    calories: '600 kcal',
  },
  {
    id: 'slot-2',
    formatId: 'strength_conditioning',
    formatName: 'Strength & Conditioning',
    centerId: 'blr-hsr',
    centerName: 'Cult HSR Layout 27th Main',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:00 AM - 07:50 AM',
    period: 'morning',
    trainerName: 'Ananya Sharma',
    trainerRole: 'Lead S&C Coach · Crossfit L2',
    trainerImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 2,
    totalSpots: 22,
    intensity: 'Very High',
    calories: '680 kcal',
  },
  {
    id: 'slot-3',
    formatId: 'dance_fitness',
    formatName: 'Dance Fitness',
    centerId: 'blr-hsr',
    centerName: 'Cult HSR Layout 27th Main',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '08:00 AM - 08:50 AM',
    period: 'morning',
    trainerName: 'Karthik Rao',
    trainerRole: 'Senior Dance Fitness Lead',
    trainerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 6,
    totalSpots: 30,
    intensity: 'Medium',
    calories: '520 kcal',
  },
  {
    id: 'slot-4',
    formatId: 'cult_boxing',
    formatName: 'Boxing & Combat',
    centerId: 'blr-indiranagar',
    centerName: 'Cult Indiranagar 100ft Road',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '06:00 PM - 06:50 PM',
    period: 'evening',
    trainerName: 'Vikram Rajput',
    trainerRole: 'National Boxing Gold Medalist',
    trainerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 4,
    totalSpots: 20,
    intensity: 'Very High',
    calories: '650 kcal',
  },
  {
    id: 'slot-5',
    formatId: 'hrx',
    formatName: 'HRX Workout',
    centerId: 'blr-indiranagar',
    centerName: 'Cult Indiranagar 100ft Road',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:00 PM - 07:50 PM',
    period: 'evening',
    trainerName: 'Megha Sen',
    trainerRole: 'Cult Athlete & Calisthenics Coach',
    trainerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 1,
    totalSpots: 25,
    intensity: 'High',
    calories: '620 kcal',
  },
  {
    id: 'slot-6',
    formatId: 'yoga_mobility',
    formatName: 'Yoga & Recovery',
    centerId: 'blr-koramangala',
    centerName: 'Cult Koramangala 80ft Road',
    city: 'Bengaluru',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:30 PM - 08:20 PM',
    period: 'evening',
    trainerName: 'Divya Nambiar',
    trainerRole: 'RYT 500 Yoga Master',
    trainerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 8,
    totalSpots: 24,
    intensity: 'Moderate',
    calories: '340 kcal',
  },
  {
    id: 'slot-7',
    formatId: 'hrx',
    formatName: 'HRX Workout',
    centerId: 'mum-bandra',
    centerName: 'Cult Bandra West Linking Road',
    city: 'Mumbai',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '06:30 AM - 07:20 AM',
    period: 'morning',
    trainerName: 'Sameer Merchant',
    trainerRole: 'Master Functional Trainer',
    trainerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 5,
    totalSpots: 26,
    intensity: 'High',
    calories: '610 kcal',
  },
  {
    id: 'slot-8',
    formatId: 'cult_boxing',
    formatName: 'Boxing & Combat',
    centerId: 'mum-bandra',
    centerName: 'Cult Bandra West Linking Road',
    city: 'Mumbai',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:00 PM - 07:50 PM',
    period: 'evening',
    trainerName: 'Farhan Zaidi',
    trainerRole: 'Pro Combat Coach',
    trainerImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 3,
    totalSpots: 20,
    intensity: 'Very High',
    calories: '670 kcal',
  },
  {
    id: 'slot-9',
    formatId: 'strength_conditioning',
    formatName: 'Strength & Conditioning',
    centerId: 'del-cyberhub',
    centerName: 'Cult Cyber Hub Gurugram',
    city: 'Delhi-NCR',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:00 AM - 07:50 AM',
    period: 'morning',
    trainerName: 'Varun Bakshi',
    trainerRole: 'CSCS & Olympic Weightlifting',
    trainerImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 2,
    totalSpots: 28,
    intensity: 'Very High',
    calories: '700 kcal',
  },
  {
    id: 'slot-10',
    formatId: 'dance_fitness',
    formatName: 'Dance Fitness',
    centerId: 'del-cyberhub',
    centerName: 'Cult Cyber Hub Gurugram',
    city: 'Delhi-NCR',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '06:30 PM - 07:20 PM',
    period: 'evening',
    trainerName: 'Pooja Verma',
    trainerRole: 'Choreographer & Cardio Specialist',
    trainerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 7,
    totalSpots: 32,
    intensity: 'Medium',
    calories: '540 kcal',
  },
  {
    id: 'slot-11',
    formatId: 'hrx',
    formatName: 'HRX Workout',
    centerId: 'hyd-jubilee',
    centerName: 'Cult Jubilee Hills Road No. 36',
    city: 'Hyderabad',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '06:30 AM - 07:20 AM',
    period: 'morning',
    trainerName: 'Praneeth Varma',
    trainerRole: 'Master Functional Specialist',
    trainerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 4,
    totalSpots: 25,
    intensity: 'High',
    calories: '610 kcal',
  },
  {
    id: 'slot-12',
    formatId: 'strength_conditioning',
    formatName: 'Strength & Conditioning',
    centerId: 'pun-koregaon',
    centerName: 'Cult Koregaon Park North Main',
    city: 'Pune',
    dateKey: 'today',
    dateLabel: 'Today, 27 Sep',
    time: '07:00 AM - 07:50 AM',
    period: 'morning',
    trainerName: 'Aditya Kulkarni',
    trainerRole: 'Lead S&C Specialist',
    trainerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    spotsLeft: 5,
    totalSpots: 24,
    intensity: 'Very High',
    calories: '690 kcal',
  }
];

export const TRANSFORMATION_STORIES: TransformationStory[] = [
  {
    id: 'story-1',
    name: 'Kavita Menon',
    city: 'Bengaluru',
    center: 'Cult Indiranagar',
    duration: '6 Months',
    highlightMetric: '-16 kg & +24% Lean Muscle',
    quote: 'Before Cult, gyms felt intimidating. The group energy in HRX and Dance Fitness made me look forward to working out 5 days a week. It transformed not just my body, but my daily stamina at work.',
    workoutPreference: 'HRX + Strength & Conditioning',
    trainerAssigned: 'Rohan Deshmukh',
    stats: {
      weightChange: '74 kg → 58 kg',
      bodyFatChange: '33% → 21%',
      energyScore: '9.8 / 10',
    },
  },
  {
    id: 'story-2',
    name: 'Arjun Nambiar',
    city: 'Mumbai',
    center: 'Cult Bandra West',
    duration: '8 Months',
    highlightMetric: '-12% Body Fat & 140kg Deadlift',
    quote: 'The coaching standard at Cult is unmatched. The trainers correct your form on every squat and clean. I broke through a 2-year plateau and gained immense core strength without injuries.',
    workoutPreference: 'Strength & Conditioning + Boxing',
    trainerAssigned: 'Sameer Merchant',
    stats: {
      weightChange: '86 kg → 76 kg',
      bodyFatChange: '26% → 14%',
      energyScore: '9.9 / 10',
    },
  },
  {
    id: 'story-3',
    name: 'Shweta Rao',
    city: 'Delhi-NCR',
    center: 'Cult Cyber Hub Gurugram',
    duration: '4 Months',
    highlightMetric: '-8 kg & Chronic Back Pain Gone',
    quote: 'Desk posture had wrecked my lower back. Combining Cult Yoga with low-impact functional S&C reversed years of strain. The app scheduling makes consistency completely frictionless.',
    workoutPreference: 'Yoga & Mobility + HRX',
    trainerAssigned: 'Divya Nambiar',
    stats: {
      weightChange: '65 kg → 57 kg',
      bodyFatChange: '29% → 20%',
      energyScore: '9.7 / 10',
    },
  },
];

export const PROMO_COUPONS = [
  {
    code: 'CULTFEST',
    discount: 2000,
    description: 'Festive Season special discount: ₹2,000 OFF on 12 & 14 months plans',
    minMonths: 12,
  },
  {
    code: 'GETFIT50',
    discount: 1500,
    description: 'New member fitness kickstart: ₹1,500 OFF on all 3+ months passes',
    minMonths: 3,
  },
  {
    code: 'FITINDIA',
    discount: 1000,
    description: 'Community boost voucher: Flat ₹1,000 instant discount',
    minMonths: 3,
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does the Cult 1-Day Free Trial work?',
    a: 'You can book a 1-day complimentary VIP trial pass to any Cult center in your city. Choose your preferred workout format (HRX, S&C, Boxing, Dance, or Gym floor) and time slot. When you arrive, present your digital QR pass at the reception to enter.',
  },
  {
    q: 'Can I use my Cultpass ELITE in different cities when traveling?',
    a: 'Yes! Cultpass ELITE gives you truly borderless access to all 600+ Cult centers and partner gyms across India. Whether you are in Bengaluru, Mumbai, Delhi, Hyderabad, or Pune, you can book slots seamlessly.',
  },
  {
    q: 'What if I need to pause my membership for vacation or exams?',
    a: 'All Cultpass plans come with free pause days built-in (45 days for ELITE, 30 days for PRO). You can pause and resume your membership right from the app with zero paperwork or penalty fees.',
  },
  {
    q: 'What should I carry for my first workout class?',
    a: 'Wear comfortable athletic workout apparel, clean cross-training or running shoes, and a water bottle. Cult studios provide chilled water dispensers, shower suites, fresh towels (at select centers), and secure lockers.',
  },
  {
    q: 'Are the group workout classes suitable for beginners?',
    a: 'Absolutely. Every Cult workout is designed with scalable intensity. Our certified trainers provide beginner, intermediate, and advanced variations for every movement so you never feel out of your depth.',
  },
];
