import { Member, ProgramActivity, Announcement, ResourceItem, DonationAccount } from '../types';

export const OSUN_LGAS = [
  'Aiyedaade',
  'Aiyedire',
  'Atakunmosa East',
  'Atakunmosa West',
  'Boluwaduro',
  'Boripe',
  'Ede North',
  'Ede South',
  'Egbedore',
  'Ejigbo',
  'Ife Central',
  'Ife East',
  'Ife North',
  'Ife South',
  'Ifedayo',
  'Ifelodun',
  'Ila',
  'Ilesa East',
  'Ilesa West',
  'Irepodun',
  'Irewole',
  'Isokan',
  'Iwo',
  'Obokun',
  'Odo Otin',
  'Ola Oluwa',
  'Olorunda',
  'Oriade',
  'Orolu',
  'Osogbo'
];

export const MCAN_POSTS = [
  'Amir',
  'Amira',
  'Naibul Amir',
  'General Secretary',
  'Assistant General Secretary',
  'Public Relations Officer (PRO)',
  'Imam',
  'Naibul Imam',
  'Financial Secretary',
  'Treasurer',
  'Welfare Director',
  'Organizing Secretary',
  'Da\'wah Director',
  'Library & ICT Officer',
  'Corps Member'
];

export const BATCH_LIST = [
  '2024 Batch A Stream 1',
  '2024 Batch A Stream 2',
  '2024 Batch B Stream 1',
  '2024 Batch B Stream 2',
  '2024 Batch C Stream 1',
  '2024 Batch C Stream 2'
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'MCAN-OS-2024-0001',
    fullName: 'Ustadh Ibrahim Babatunde Alabi',
    stateCode: 'OS/24A/1042',
    callUpNumber: 'NYSC/UNI/2024/091244',
    mcanPost: 'Amir',
    phoneNumber: '08034567890',
    whatsappNumber: '08034567890',
    email: 'amir.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    gender: 'Male',
    lga: 'Osogbo',
    ppa: 'Osun State Ministry of Works and Transport, Osogbo',
    bloodGroup: 'O+',
    batch: '2024 Batch A Stream 1',
    residence: 'MCAN State Central Lodge, Old Garage, Osogbo',
    registrationDate: '2024-03-15T09:30:00.000Z',
    verified: true,
    verificationHash: 'V8A9B2K4-MCAN-OS-0001',
    emergencyContactName: 'Dr. Abdul-Gafar Alabi',
    emergencyContactPhone: '08023412345'
  },
  {
    id: 'MCAN-OS-2024-0002',
    fullName: 'Hajia Fatima Zahra Opeyemi',
    stateCode: 'OS/24A/2115',
    callUpNumber: 'NYSC/OAU/2024/104882',
    mcanPost: 'Amira',
    phoneNumber: '08149876543',
    whatsappNumber: '08149876543',
    email: 'amira.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    gender: 'Female',
    lga: 'Olorunda',
    ppa: 'Fakunle Comprehensive High School, Osogbo',
    bloodGroup: 'AA',
    batch: '2024 Batch A Stream 1',
    residence: 'MCAN Sisters Lodge, GRA, Osogbo',
    registrationDate: '2024-03-16T11:15:00.000Z',
    verified: true,
    verificationHash: 'V3C8D7P1-MCAN-OS-0002',
    emergencyContactName: 'Alhaja Mariam Opeyemi',
    emergencyContactPhone: '08098765432'
  },
  {
    id: 'MCAN-OS-2024-0003',
    fullName: 'Mallam Ridwanullah Adebayo Lawal',
    stateCode: 'OS/24A/0891',
    callUpNumber: 'NYSC/ILR/2024/078129',
    mcanPost: 'Imam',
    phoneNumber: '07061122334',
    whatsappNumber: '07061122334',
    email: 'imam.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    gender: 'Male',
    lga: 'Ede North',
    ppa: 'Federal Polytechnic Ede Secondary School',
    bloodGroup: 'B+',
    batch: '2024 Batch A Stream 1',
    residence: 'MCAN Ede Sub-Lodge, Cottage Area, Ede',
    registrationDate: '2024-03-18T14:20:00.000Z',
    verified: true,
    verificationHash: 'V9M2L4K8-MCAN-OS-0003',
    emergencyContactName: 'Sheikh Lawal Adebayo',
    emergencyContactPhone: '08033221144'
  },
  {
    id: 'MCAN-OS-2024-0004',
    fullName: 'Sulaimon Kehinde Idris',
    stateCode: 'OS/24A/3402',
    callUpNumber: 'NYSC/UNILAG/2024/119023',
    mcanPost: 'Public Relations Officer (PRO)',
    phoneNumber: '08123344556',
    whatsappNumber: '08123344556',
    email: 'pro.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    gender: 'Male',
    lga: 'Ife Central',
    ppa: 'Obafemi Awolowo University Teaching Hospital (OAUTHC)',
    bloodGroup: 'O+',
    batch: '2024 Batch A Stream 2',
    residence: 'MCAN Ile-Ife Lodge, Parakin, Ife',
    registrationDate: '2024-04-02T10:00:00.000Z',
    verified: true,
    verificationHash: 'V5X7Z2W9-MCAN-OS-0004',
    emergencyContactName: 'Alhaji Idris Kehinde',
    emergencyContactPhone: '08022334455'
  }
];

export const INITIAL_PROGRAMS: ProgramActivity[] = [
  // Weekly Programs
  {
    id: 'prog-w-01',
    title: 'Statewide Sunday Usrah & Spiritual Upliftment',
    frequency: 'weekly',
    schedulePattern: 'Every Sunday | 10:00 AM – 1:00 PM',
    time: '10:00 AM – 1:00 PM',
    venue: 'MCAN Central Mosque, Old Garage, Osogbo & All Zonal Centers',
    description: 'Weekly spiritual circle featuring Quranic exegesis (Tafseer), Fiqh of worship, contemporary Islamic lectures, Arabic morphology, and sister halaqah sessions.',
    targetAudience: 'All Muslim Corps Members & Muslim Youth in Osun',
    category: 'Spiritual',
    coordinator: 'Brotherhood & Sisterhood Welfare Committee',
    isUpcoming: true
  },
  {
    id: 'prog-w-02',
    title: 'Tahajjud & Special Adhkar Night (Qiyam-ul-Layl)',
    frequency: 'weekly',
    schedulePattern: 'Every Thursday Night | 11:30 PM – Fajr Prayer',
    time: '11:30 PM – 5:45 AM',
    venue: 'MCAN State Central Lodge Mosque, Osogbo',
    description: 'Night vigil devoted to prolonged Quran recitation, sincere supplications (Du\'a) for the Ummah, and individual spiritual rejuvenation before Salatul Fajr.',
    targetAudience: 'Lodge Residents & Interested Corps Members',
    category: 'Spiritual',
    coordinator: 'State Imam (Mallam Ridwanullah Lawal)',
    isUpcoming: true
  },
  {
    id: 'prog-w-03',
    title: 'Arabic Language, Tajweed & Hadith Circle',
    frequency: 'weekly',
    schedulePattern: 'Every Tuesday & Wednesday | 5:00 PM – 6:30 PM',
    time: '5:00 PM – 6:30 PM',
    venue: 'Virtual (Google Meet) & MCAN Library, Osogbo',
    description: 'Foundational and intermediate Arabic phonetics, correct Quran recitation rules with Ijazah certified instructors, and study of Nawawi\'s 40 Hadith.',
    targetAudience: 'All Corps Members aiming to master Quran recitation',
    category: 'Educational',
    coordinator: 'Education & ICT Directorate',
    isUpcoming: false
  },
  {
    id: 'prog-w-04',
    title: 'Sisters\' Exclusive Halaqah & Skills Empowerment',
    frequency: 'weekly',
    schedulePattern: 'Every Saturday | 11:00 AM – 1:30 PM',
    time: '11:00 AM – 1:30 PM',
    venue: 'MCAN Sisters Lodge, GRA, Osogbo',
    description: 'Enlightening discussions on Muslim womanhood, bridal fiqh, modest fashion, mental health, emotional wellness, and practical baking/craft skills.',
    targetAudience: 'All Muslim Female Corps Members (Corpers & Ex-Corpers)',
    category: 'Welfare',
    coordinator: 'Amira (Hajia Fatima Zahra)',
    isUpcoming: true
  },

  // Monthly Programs
  {
    id: 'prog-m-01',
    title: 'State Executive Council (SEC) & Zonal Leaders Meeting',
    frequency: 'monthly',
    schedulePattern: '1st Saturday of Every Month | 10:00 AM – 2:00 PM',
    time: '10:00 AM – 2:00 PM',
    venue: 'MCAN Secretariat Boardroom, Osogbo',
    description: 'Review of monthly zonal reports from 30 LGAs, financial audits, welfare interventions, and strategic planning for upcoming state initiatives.',
    targetAudience: 'State Excos, Zonal Amir/Amiras, and Committee Heads',
    category: 'Conference',
    coordinator: 'General Secretary',
    isUpcoming: true
  },
  {
    id: 'prog-m-02',
    title: 'Osun MCAN Community Health Caravan & Free Medical Outreach',
    frequency: 'monthly',
    schedulePattern: '3rd Saturday of Every Month | 9:00 AM – 3:00 PM',
    time: '9:00 AM – 3:00 PM',
    venue: 'Rotational across Rural LGAs (Current: Ejigbo Central Market)',
    description: 'Free blood pressure screening, diabetes check, eye consultation, malaria testing, medication dispensation, and hygiene awareness delivered by Corps Medical personnel.',
    targetAudience: 'Host Communities & Underprivileged Villagers',
    category: 'Welfare',
    coordinator: 'Medical & Community Development CDS Wing',
    isUpcoming: true
  },
  {
    id: 'prog-m-03',
    title: 'Monthly Da\'wah Outreaches & Prison Visitation',
    frequency: 'monthly',
    schedulePattern: 'Last Friday of Every Month | 2:00 PM – 5:00 PM',
    time: '2:00 PM – 5:00 PM',
    venue: 'Ilesa Maximum Custodial Centre & Osogbo Correctional Facility',
    description: 'Donation of toiletries, clothing, Quran translations, and inspirational Islamic guidance to inmates, coordinated alongside legal aid interventions.',
    targetAudience: 'Inmates, Prison Officials & Volunteers',
    category: 'Dawah',
    coordinator: 'Da\'wah & Welfare Directorate',
    isUpcoming: false
  },

  // Yearly Programs
  {
    id: 'prog-y-01',
    title: 'Annual Osun MCAN State Islamic Conference (AOSIC)',
    frequency: 'yearly',
    schedulePattern: 'Annual 3-Day Residential Gathering | November (3rd Weekend)',
    time: '3-Day Immersive Camp (Friday afternoon to Sunday afternoon)',
    venue: 'Auditorium Hall, Osun State College of Education, Ilesa',
    description: 'Flagship annual gathering uniting over 1,500 Muslim corpers, seasoned national scholars, career mentors, and Islamic intellectuals for lectures, workshops, networking, and spiritual revival.',
    targetAudience: 'All Muslim Corps Members, Alumni, and General Public',
    category: 'Conference',
    coordinator: 'Conference Planning Committee & Amir',
    isUpcoming: true
  },
  {
    id: 'prog-y-02',
    title: 'NYSC Ede Orientation Camp Da\'wah & Welcome Caravan',
    frequency: 'yearly',
    schedulePattern: 'Held 3 Times Annually (Every NYSC Orientation Stream)',
    time: '21 Days Continuous Operation',
    venue: 'MCAN Camp Mosque & Pavilion, NYSC Permanent Camp, Ede, Osun',
    description: 'Warm reception of prospective corps members right at the camp gate, provision of ablution slippers, hijab sanitization, daily camp Tahajjud, and post-camp accommodation guidance.',
    targetAudience: 'All Muslim PCMs posted to Osun State',
    category: 'Camp',
    coordinator: 'Camp Da\'wah Committee (CDC)',
    isUpcoming: true
  },
  {
    id: 'prog-y-03',
    title: 'Passing Out Parade (POP) Walimat-ul-Wida\' & Send-Forth',
    frequency: 'yearly',
    schedulePattern: 'Held at the culmination of each Batch Service Year',
    time: '10:00 AM – 3:30 PM',
    venue: 'Aurora Conference Centre, Ring Road, Osogbo',
    description: 'Special graduation luncheon, honoring outgoing serving corps members with certificates of service, awards of excellence, and comprehensive post-NYSC career/marriage masterclasses.',
    targetAudience: 'Outgoing Corpers, Alumni, Patrons & Guests',
    category: 'Welfare',
    coordinator: 'Walimah Committee',
    isUpcoming: false
  },
  {
    id: 'prog-y-04',
    title: 'Grand Ramadan Iftar & Daily Taraweeh Feeding Project',
    frequency: 'yearly',
    schedulePattern: 'Throughout the 29/30 Days of Holy Month of Ramadan',
    time: 'Daily from 6:30 PM (Maghrib) to 9:30 PM',
    venue: 'MCAN State Central Mosque, Osogbo & Ede Lodge',
    description: 'Community feeding initiative providing warm, wholesome meals, fruits, and dates to over 200 corpers and indigent Muslims daily during Ramadan.',
    targetAudience: 'All Muslim Corpers & Neighbors',
    category: 'Welfare',
    coordinator: 'Ramadan Feeding Project Committee',
    isUpcoming: false
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-01',
    title: 'Urgent: Registration for 2024 Batch B Corpers & ID Card Issuance',
    category: 'Urgent',
    content: 'All Muslim Corps Members recently deployed or redeployed to Osun State are hereby notified to complete their official MCAN Membership Registration on this portal. Ensure you upload a sharp passport photo and verify your state code (OS/24B/XXXX) to immediately generate your verifiable Front & Back digital ID card.',
    publishedAt: '2024-08-28T08:00:00.000Z',
    pinned: true,
    author: 'State Public Relations Officer (PRO)'
  },
  {
    id: 'anc-02',
    title: 'Weekly Sunday Usrah Theme: Navigating PPA Challenges through Prophetic Patience',
    category: 'Weekly',
    content: 'Assalamu Alaykum Warahmatullah. This Sunday\'s Usrah will hold at MCAN Central Mosque, Osogbo. Guest Speaker: Dr. Sheikh Luqman Olayiwola (Head of Arabic Dept, Fountain University). Time: 10:00 AM prompt. Free transportation provided from Ede and Ife junctions.',
    publishedAt: '2024-08-30T16:00:00.000Z',
    pinned: true,
    author: 'Education & Da\'wah Directorate'
  },
  {
    id: 'anc-03',
    title: 'Notice on MCAN Corpers Lodge Accommodation Vacancies in Osogbo & Ede',
    category: 'General',
    content: 'Limited spaces are currently open for male and female Muslim corpers seeking serene, prayer-centered, and affordable lodge accommodation close to state government secretariats and major schools. Visit the Secretariat or contact the Welfare Director.',
    publishedAt: '2024-08-25T12:00:00.000Z',
    pinned: false,
    author: 'Welfare Director'
  },
  {
    id: 'anc-04',
    title: 'Upcoming Monthly Medical CDS in Ejigbo Local Government',
    category: 'Monthly',
    content: 'All Muslim Doctors, Pharmacists, Medical Laboratory Scientists, and Nurses in 2024 Batch A & B are requested to join the prep briefing for our upcoming medical caravan to Ejigbo Central Market.',
    publishedAt: '2024-08-20T10:00:00.000Z',
    pinned: false,
    author: 'Medical CDS Team'
  }
];

export const QURAN_VERSES = [
  {
    surah: 'Surah Al-Baqarah',
    reference: '2:261',
    arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ',
    transliteration: 'Masalullazeena yunfiqoona amwaalahum fee sabeelil laahi kamasali habbatin ambatat sab\'a sanaabila fee kulli sumbulatim mi\'atu habbah; wallaahu yudaa\'ifu limany yashaaa\'; wallaahu Waasi\'un \'Aleem.',
    translation: 'The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.',
    focus: 'Multiplication of Reward for Charity'
  },
  {
    surah: 'Surah Al-Baqarah',
    reference: '2:274',
    arabic: 'الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
    transliteration: 'Allazeena yunfiqoona amwaalahum billaili wannahaari sirranw wa \'alaaniyatan falahum ajruhum \'inda Rabbihim wa laa khawfun \'alaihim wa laa hum yahzanoon.',
    translation: 'Those who spend their wealth [in Allah\'s way] by night and by day, secretly and publicly, will have their reward with their Lord, and no fear shall come upon them, nor shall they grieve.',
    focus: 'Peace & Freedom from Fear'
  },
  {
    surah: 'Surah At-Tawbah',
    reference: '9:60',
    arabic: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ',
    transliteration: 'Innamas Sadaqaatu lilfuqaraaa\'i walmasaakeeni wal \'aamileena \'alaihaa walmu\'allafati quloobuhum wa fir riqaabi walghaarimeena wa fee sabeelil laahi wabnis sabeel; fareedatam minal laah; wallaahu \'Aleemun Hakeem.',
    translation: 'Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together [for Islam] and for freeing captives and for those in debt and for the cause of Allah and for the [stranded] traveler — an obligation [imposed] by Allah. And Allah is Knowing and Wise.',
    focus: 'Sacred Categories & Obligation of Zakat'
  },
  {
    surah: 'Surah Al-Hadid',
    reference: '57:18',
    arabic: 'إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ',
    transliteration: 'Innal mussaddiqqeena wal mussaddiqaati wa aqradul laaha qardan hasanay yudaa\'afu lahum wa lahum ajrun kareem.',
    translation: 'Indeed, the men who practice charity and the women who practice charity and [they who] have loaned Allah a goodly loan — it will be multiplied for them, and they will have a noble reward.',
    focus: 'A Goodly Loan to the Almighty'
  }
];

export const BANK_ACCOUNTS: DonationAccount[] = [
  {
    bankName: 'Jaiz Bank Plc',
    accountNumber: '0004928192',
    accountName: 'Muslim Corpers Association of Nigeria (MCAN) Osun State',
    purpose: 'Official Zakat & Sadaqah Fund',
    note: 'Strictly disbursed across legitimate Zakat heads under scholarly supervision.'
  },
  {
    bankName: 'Stanbic IBTC Bank',
    accountNumber: '0038472910',
    accountName: 'MCAN Osun Chapter Development Fund',
    purpose: 'Mosque & Corpers Lodge Expansion Project',
    note: 'Dedicated to capital development, borehole maintenance & lodge solar power.'
  },
  {
    bankName: 'TAJBank Ltd',
    accountNumber: '0019283746',
    accountName: 'MCAN Osun State Dawah Committee',
    purpose: 'NYSC Ede Orientation Camp Da\'wah & Welfare',
    note: 'Sponsoring Ramadan meals, camp hijabs, Quran distributions & rural outreach.'
  }
];

export const PORTAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'NYSC Ede Camp Survival Guide for Muslim Corpers',
    category: 'Camp Guide',
    format: 'Guide',
    readTime: '8 min read',
    description: 'Comprehensive manual detailing prayer time navigation during parade rehearsals, halal dietary advice at the camp mami market, modest sportswear tips, and staying spiritually vibrant in camp.',
    details: [
      'Locating the MCAN Camp Mosque inside Ede Orientation Camp (behind the parade ground pavilion).',
      'Etiquette of seeking permission from Platoon commanders during Asr and Maghrib drills.',
      'Maintaining modesty in standard NYSC white-on-white and crested vest attires.',
      'Safeguarding valuables and joining the Camp MCAN Choir / Da\'wah / Media Platoon.'
    ]
  },
  {
    id: 'res-02',
    title: 'Essential Morning & Evening Prophetic Adhkar (Hisnul Muslim)',
    category: 'Spiritual & Dua',
    format: 'Table',
    readTime: 'Daily Reference',
    description: 'Complete Arabic text, English transliteration, and spiritual benefits of authentic morning and evening supplications from Sahih hadith compilations for corps members on transit and at PPA.',
    details: [
      'Ayat-ul-Kursi & Al-Mu\'awwidhat (Surah Al-Ikhlas, Al-Falaq, An-Nas x3).',
      'Asbahna wa-asbahal-mulku lillah wal-hamdu lillah.',
      'Radheetu billahi Rabba, wa bil-Islami deena, wa bi-Muhammadin nabiyya.',
      'Bismillahi alladhi la yadurru ma\'a ismihi shay\'un fil-ardi wa la fis-samaa.'
    ]
  },
  {
    id: 'res-03',
    title: 'Osun State Solat & Sahur Timetable (Osogbo, Ife, Ede, Ilesa)',
    category: 'Prayer Timetable',
    format: 'Table',
    readTime: 'Standard Schedule',
    description: 'Accurate geographic prayer times customized for Osun State latitude & longitude (Coordinates: 7.7827° N, 4.5418° E), factoring seasonal twilight variations.',
    details: [
      'Fajr (Dawn): 05:15 AM – 05:30 AM',
      'Dhuhr (Noon): 12:42 PM – 12:50 PM',
      'Asr (Afternoon): 04:02 PM – 04:15 PM',
      'Maghrib (Sunset): 06:48 PM – 06:55 PM',
      'Isha (Night): 08:00 PM – 08:10 PM'
    ]
  },
  {
    id: 'res-04',
    title: 'MCAN Constitution & Corps Member By-Laws (2020 Revised Edition)',
    category: 'MCAN Constitution',
    format: 'PDF',
    readTime: 'Official Document',
    description: 'Aims, objectives, leadership structure, financial transparency mandates, elections protocol, and rights of every registered Muslim corps member in Nigeria.',
    details: [
      'Article 2: Motto: "In the name of Allah, Service to Humanity and the Nation".',
      'Article 5: Duties of Executive Council (Amir, Amira, Imam, PRO, Welfare).',
      'Article 9: Management of MCAN Corpers Lodge and Sub-secretariats in Osun LGAs.',
      'Article 12: Dispute Resolution and Shari\'ah Arbitration.'
    ]
  },
  {
    id: 'res-05',
    title: 'Directory of MCAN Corpers Lodges in Osun State',
    category: 'Lodge Directory',
    format: 'Directory',
    readTime: 'Directory',
    description: 'Verified accommodation contacts, addresses, and caretakers for brotherhood and sisterhood lodges across Osun major towns.',
    details: [
      'Osogbo Central Brothers Lodge: No 14, MCAN Close, Opposite Old Garage / Rail Station, Osogbo. Contact: 08034567890.',
      'Osogbo Sisters Lodge: Plot 5, GRA Extension, Behind Technical College, Osogbo. Contact: 08149876543.',
      'Ile-Ife Zonal Lodge: Parakin Area, Near Mayfair, Ile-Ife. Contact: 08123344556.',
      'Ede Sub-Lodge: Cottage Hospital Road, Ede (Near Ede Camp). Contact: 07061122334.',
      'Ilesa Sub-Lodge: Imo Area, Near College of Education, Ilesa. Contact: 08051239876.'
    ]
  }
];
