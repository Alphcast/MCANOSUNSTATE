import { Member, ProgramActivity, Announcement, ResourceItem, DonationAccount, LeadershipContact } from '../types';

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
  'Ameer',
  'Ameerah',
  'Naibul Ameer',
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
  '2026 Batch A Stream 1',
  '2026 Batch A Stream 2',
  '2026 Batch B Stream 1',
  '2026 Batch B Stream 2',
  '2026 Batch C Stream 1',
  '2026 Batch C Stream 2'
];

// Verified Real Executive Members
export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'MCAN-OS-2026-0001',
    fullName: 'Brother Luqman Waliyullah Olamide',
    stateCode: 'OS/26A/0001',
    callUpNumber: 'NYSC/MCAN/2026/0001',
    mcanPost: 'Ameer',
    phoneNumber: '09056498489',
    whatsappNumber: '09056498489',
    email: 'ameer.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    gender: 'Male',
    lga: 'Osogbo',
    ppa: 'MCAN Osun State Central Secretariat, Osogbo',
    bloodGroup: 'O+',
    batch: '2026 Batch C Stream 1',
    residence: 'MCAN State Central Lodge, Old Garage, Osogbo',
    registrationDate: '2026-08-01T09:00:00.000Z',
    verified: true,
    verificationHash: 'V9A1B2C3-MCAN-OS-0001',
    emergencyContactName: 'MCAN Osun State Executive Council',
    emergencyContactPhone: '07039101391'
  },
  {
    id: 'MCAN-OS-2026-0002',
    fullName: 'Sister Kofoworola Bilqees',
    stateCode: 'OS/26A/0002',
    callUpNumber: 'NYSC/MCAN/2026/0002',
    mcanPost: 'Ameerah',
    phoneNumber: '09039454686',
    whatsappNumber: '09039454686',
    email: 'ameerah.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    gender: 'Female',
    lga: 'Osogbo',
    ppa: 'MCAN Osun State Secretariat, Osogbo',
    bloodGroup: 'AA',
    batch: '2026 Batch C Stream 1',
    residence: 'MCAN Sisters Lodge, GRA, Osogbo',
    registrationDate: '2026-08-01T09:30:00.000Z',
    verified: true,
    verificationHash: 'V8D4E5F6-MCAN-OS-0002',
    emergencyContactName: 'MCAN Osun State Secretariat',
    emergencyContactPhone: '09056498489'
  },
  {
    id: 'MCAN-OS-2026-0003',
    fullName: 'Brother Abdulsalam Ayinla Abdullah',
    stateCode: 'OS/26A/0003',
    callUpNumber: 'NYSC/MCAN/2026/0003',
    mcanPost: 'General Secretary',
    phoneNumber: '07039101391',
    whatsappNumber: '07039101391',
    email: 'gensec.osun@mcan.org.ng',
    passportUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    gender: 'Male',
    lga: 'Osogbo',
    ppa: 'MCAN Osun State Central Secretariat, Osogbo',
    bloodGroup: 'B+',
    batch: '2026 Batch C Stream 1',
    residence: 'MCAN State Central Lodge, Old Garage, Osogbo',
    registrationDate: '2026-08-01T10:00:00.000Z',
    verified: true,
    verificationHash: 'V7G8H9J0-MCAN-OS-0003',
    emergencyContactName: 'Ameer (Bro. Luqman Waliyullah)',
    emergencyContactPhone: '09056498489'
  }
];

// Official Real Programs (Weekly, Monthly, Annually)
export const INITIAL_PROGRAMS: ProgramActivity[] = [
  // Weekly Programs
  {
    id: 'prog-w-01',
    title: 'Weekly Usrah',
    frequency: 'weekly',
    schedulePattern: 'Every Sunday | 10:00 AM – 1:00 PM',
    time: '10:00 AM – 1:00 PM',
    venue: 'MCAN State Central Mosque, Old Garage, Osogbo & All Zonal Centers',
    description: 'Weekly statewide spiritual Usrah bringing together all Muslim corps members across Osun State for Quranic recitation, soul-enriching lectures on contemporary Islamic living during NYSC, and fraternal networking across all zones.',
    targetAudience: 'All Muslim Corps Members in Osun State',
    category: 'Spiritual',
    coordinator: 'Ameer: 09056498489 (Bro. Luqman Waliyullah Olamide) & General Secretary: 07039101391',
    isUpcoming: true
  },
  {
    id: 'prog-w-02',
    title: 'Fiqh, Hadith and Tawheed Session',
    frequency: 'weekly',
    schedulePattern: 'Weekly | Every Weekend (Saturdays & Sundays, 8:00 PM – 9:30 PM)',
    time: 'Interactive Weekend Study Session (8:00 PM – 9:30 PM)',
    venue: 'Official MCAN Osun State WhatsApp Knowledge Circle',
    description: 'Weekly educational halaqah covering essential principles of Islamic jurisprudence (Fiqh), authentic Prophetic traditions (Hadith), and the core creed of Tawheed, led by knowledgeable scholars and open to all Muslim corps members in Osun State. Contact officials to join: Ameer: 09056498489, Ameerah: 09039454686, General Secretary: 07039101391.',
    targetAudience: 'All Muslim Corps Members in Osun State',
    category: 'Educational',
    coordinator: 'Ameer: 09056498489 (Bro. Luqman Waliyullah Olamide), Ameerah: 09039454686, Gen. Sec: 07039101391',
    isUpcoming: true,
    flyerUrl: '/mcan-fiqh-tawheed-flyer.jpg'
  },

  // Monthly Programs
  {
    id: 'prog-m-01',
    title: 'Monthly Medical CDS (Community Health Outreach)',
    frequency: 'monthly',
    schedulePattern: 'Third Saturday of the Month | 9:00 AM – 2:00 PM',
    time: '9:00 AM – 2:00 PM',
    venue: 'Selected Underserved Host Communities & Primary Health Centres across Osun State LGAs',
    description: 'Flagship monthly Community Development Service outreach led by Muslim corps medical doctors, nurses, pharmacists, and lab scientists providing free medical consultations, hypertension & blood glucose screenings, essential medication dispensation, and health literacy to vulnerable grassroots populations.',
    targetAudience: 'Host Communities, Rural Dwellers & Serving Corps Members',
    category: 'Welfare',
    coordinator: 'Medical CDS Directorate & State Executive Council (Enquiries: 09056498489 / 07039101391)',
    isUpcoming: true
  },
  {
    id: 'prog-m-02',
    title: 'Monthly Tadhkirah (Spiritual Reminder)',
    frequency: 'monthly',
    schedulePattern: 'Last Sunday of the Month | 10:00 AM – 1:00 PM',
    time: '10:00 AM – 1:00 PM',
    venue: 'MCAN State Central Mosque, Old Garage, Osogbo & Zonal Centers',
    description: 'Monthly spiritual gathering and soul-nourishing admonition designed to strengthen faith, address contemporary issues faced by youth during national service, and foster mutual brotherhood across all LGAs. For enquiries and coordination: Ameer: 09056498489 (Bro. Luqman Waliyullah Olamide), General Secretary: 07039101391 (Bro. Abdulsalam Ayinla Abdullah), Ameerah: 09039454686.',
    targetAudience: 'All Muslim Corps Members & Youth',
    category: 'Spiritual',
    coordinator: 'Ameer: 09056498489 (Bro. Luqman Waliyullah Olamide) & Gen. Sec: 07039101391',
    isUpcoming: true,
    flyerUrl: '/mcan-monthly-tadhkirah-flyer.jpg'
  },
  {
    id: 'prog-m-03',
    title: 'Sisters Circle',
    frequency: 'monthly',
    schedulePattern: 'First Sunday of the Month | 10:00 AM Sharp',
    time: '10:00 AM Sharp',
    venue: 'Ode Oga Masjid, Ilesa Road, Osogbo',
    description: 'Special monthly circle dedicated exclusively to female Muslim corps members exploring modesty, spiritual sisterhood, personal development, emotional wellness, and community impact. Venue: Ode Oga Masjid. For enquiries and sponsorship: Ameerah: 09039454686 | Naibatul Ameerah: 07067340931.',
    targetAudience: 'All Female Muslim Corps Members (Corpers & Ex-Corpers)',
    category: 'Welfare',
    coordinator: 'Ameerah: 09039454686 (Sister Kofoworola Bilqees) & Naibatul Ameerah: 07067340931',
    isUpcoming: true,
    flyerUrl: '/mcan-sisters-circle-flyer.jpg'
  },

  // Annually
  {
    id: 'prog-y-01',
    title: 'MCAN Osun State Annual Convention',
    frequency: 'yearly',
    schedulePattern: 'Upcoming: 31st October – 1st November Biidhnillah',
    time: '2-Day Flagship State Gathering (31st Oct – 1st Nov)',
    venue: 'MCAN Osun State Central Secretariat & Conference Hall, Osogbo',
    description: 'The premier annual flagship gathering uniting Muslim corps members from all 30 LGAs in Osun State, alumni, distinguished patrons, and state leaders. Featuring insightful keynote lectures, capacity-building workshops, awards of excellence, and spiritual revival. For enquiries & registration: General Secretary: 07039101391 (Bro. Abdulsalam Ayinla Abdullah), Ameer: 09056498489.',
    targetAudience: 'All Muslim Corps Members, Alumni, Patrons, and the General Ummah',
    category: 'Conference',
    coordinator: 'General Secretary: 07039101391 (Bro. Abdulsalam Ayinla Abdullah) & Ameer: 09056498489',
    isUpcoming: true,
    flyerUrl: '/mcan-convention-flyer.jpg'
  }
];

// Official Real Announcements
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-01',
    title: 'Upcoming: 2026 MCAN Osun State Annual Convention (31st Oct – 1st Nov Biidhnillah)',
    category: 'Yearly',
    content: 'Assalamu Alaykum Warahmatullah! The State Executive Council cordially invites all Muslim Corps Members across the 30 LGAs, alumni, and stakeholders to our Annual State Convention holding on the 31st of October to 1st of November Biidhnillah. Check the Programs section to view and download the official convention flyer!',
    publishedAt: '2026-09-01T08:00:00.000Z',
    pinned: true,
    author: 'General Secretary (Brother Abdulsalam Ayinla Abdullah)'
  },
  {
    id: 'anc-02',
    title: 'Weekly Fiqh, Hadith & Tawheed Study Circles on WhatsApp',
    category: 'Weekly',
    content: 'Join our weekly educational series examining the fundamentals of Fiqh, Hadith, and Islamic Creed (Tawheed) directly on our dedicated state WhatsApp knowledge group. Contact the Ameer (09056498489) or General Secretary (07039101391) to join.',
    publishedAt: '2026-09-02T10:00:00.000Z',
    pinned: true,
    author: 'Ameer (Brother Luqman Waliyullah Olamide)'
  },
  {
    id: 'anc-03',
    title: 'Monthly Tadhkirah (Last Sunday) & Sisters Circle (First Sunday)',
    category: 'Monthly',
    content: 'Mark your calendars for our monthly spiritual gatherings: Sisters Circle holds on the First Sunday of each month coordinated by Ameerah (09039454686), and the statewide Tadhkirah holds on the Last Sunday of every month.',
    publishedAt: '2026-09-03T12:00:00.000Z',
    pinned: false,
    author: 'Ameerah (Sister Kofoworola Bilqees)'
  },
  {
    id: 'anc-04',
    title: 'Official Member Registration & Verifiable Digital ID Card Generation',
    category: 'Urgent',
    content: 'All serving Muslim corps members in Osun State are required to register their accurate NYSC state code on this portal to generate their official front and back ID cards. If you need any assistance, reach out directly to the Ameer (09056498489), Ameerah (09039454686), or General Secretary (07039101391).',
    publishedAt: '2026-09-04T09:00:00.000Z',
    pinned: false,
    author: 'MCAN Osun State Executive Council'
  }
];

// Complete Official Leadership, Staff Advisors, Patrons, and Matron Directory
export const LEADERSHIP_CONTACTS: LeadershipContact[] = [
  // Key Contact Persons (Executives)
  {
    id: 'exec-01',
    name: 'Brother Luqman Waliyullah Olamide',
    role: 'Ameer (State President)',
    category: 'Executive',
    phone: '09056498489',
    whatsapp: '09056498489',
    designation: 'Overall Chapter Leadership & Spiritual Direction'
  },
  {
    id: 'exec-02',
    name: 'Sister Kofoworola Bilqees',
    role: 'Ameerah (State Vice President - Sisters)',
    category: 'Executive',
    phone: '09039454686',
    whatsapp: '09039454686',
    designation: 'Sisters Affairs, Welfare & Sisters Circle Directorate'
  },
  {
    id: 'exec-03',
    name: 'Brother Abdulsalam Ayinla Abdullah',
    role: 'General Secretary',
    category: 'Executive',
    phone: '07039101391',
    whatsapp: '07039101391',
    designation: 'State Secretariat Administration & Communications'
  },
  {
    id: 'exec-04',
    name: 'Naibatul Ameerah',
    role: 'Naibatul Ameerah (Vice President - Sisters)',
    category: 'Executive',
    phone: '07067340931',
    whatsapp: '07067340931',
    designation: 'Sisters Affairs & Sisters Circle Enquiries / Sponsorship'
  },

  // Staff Advisors
  {
    id: 'advisor-01',
    name: 'Mr. Suleiman K.A',
    role: 'Staff Advisor',
    category: 'Staff Advisor',
    phone: '08132080658',
    whatsapp: '08132080658',
    designation: 'Local Government Inspector (LGI)',
    organization: 'NYSC Ede South Local Government'
  },
  {
    id: 'advisor-02',
    name: 'Mr. Kusamato Olakunle',
    role: 'Staff Advisor',
    category: 'Staff Advisor',
    phone: '08039209654',
    whatsapp: '08039209654',
    designation: 'Local Government Inspector (LGI)',
    organization: 'NYSC Atakumosa East Local Government'
  },
  {
    id: 'advisor-03',
    name: 'Mr. Salih Bolaji',
    role: 'Staff Advisor',
    category: 'Staff Advisor',
    designation: 'Local Government Inspector (LGI)',
    organization: 'NYSC Atakumosa West Local Government'
  },

  // Patrons
  {
    id: 'patron-01',
    name: 'Dr. Maruf Ishola',
    role: 'Patron',
    category: 'Patron',
    phone: '08133341010',
    whatsapp: '08133341010',
    designation: 'Naibul Imam, Osogbo Central Community'
  },
  {
    id: 'patron-02',
    name: 'Pharm. Bankole K.T',
    role: 'Patron',
    category: 'Patron',
    phone: '08034373374',
    whatsapp: '08034373374',
    designation: 'Rizqah Pharmacy & Community Leader'
  },
  {
    id: 'patron-03',
    name: 'Imam Luqman Bolaji',
    role: 'Patron',
    category: 'Patron',
    phone: '08130822452',
    whatsapp: '08130822452',
    designation: 'Imam Odowoye Islamic Community'
  },
  {
    id: 'patron-04',
    name: 'Prof. Alabi',
    role: 'Patron',
    category: 'Patron',
    phone: '08034705605',
    whatsapp: '08034705605',
    designation: 'Chairman, Muslim Community',
    organization: 'Fountain University Osogbo (FUO)'
  },
  {
    id: 'patron-05',
    name: 'Mr. Jamiu Olukokun',
    role: 'Patron',
    category: 'Patron',
    phone: '08088421533',
    whatsapp: '08088421533',
    designation: 'Assistant Director (AD), PRS',
    organization: 'NYSC Osun State Headquarters'
  },
  {
    id: 'patron-06',
    name: 'Imam Adebisi Abdulfatah',
    role: 'Patron',
    category: 'Patron',
    phone: '08057073313',
    whatsapp: '08057073313',
    designation: 'Chief Imam',
    organization: 'Osun State House of Assembly (OSHA)'
  },

  // Matron
  {
    id: 'matron-01',
    name: 'Mrs Jimoh Tawakalitu',
    role: 'Matron',
    category: 'Matron',
    phone: '08059734740',
    whatsapp: '08059734740',
    designation: 'Zonal Inspector (ZI), Osogbo Zone',
    organization: 'NYSC Osun State'
  }
];

export const QURAN_VERSES = [
  {
    surah: 'Surah Al-Baqarah',
    reference: '2:261',
    arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ',
    transliteration: 'Masalullazeena yunfiqoona amwaalahum fee sabeelil laahi kamasali habbatin ambatat sab\'a sanaabila fee kulli sumbulatim mi\'atu habbah; wallaahu yudaa\'ifu limany yashaaa\'; wallaahu Waasi\'un \'Aleem.',
    translation: 'The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.',
    focus: 'Multiplication of Reward for Spending in Allah\'s Cause'
  },
  {
    surah: 'Surah Saba',
    reference: '34:39',
    arabic: 'قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ ۚ وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ',
    transliteration: 'Qul inna Rabbee yabsutur rizqa limany yashaaa\'u min \'ibaadihi wa yaqdiru lah; wa maaa anfaqtum min shai\'in fahuwa yukhlifuh; wa Huwa khayrur raaziqeen.',
    translation: 'Say, "Indeed, my Lord extends provision for whom He wills of His servants and restricts [it] for him. But whatever you spend [in His cause] — He will replace it; and He is the best of providers."',
    focus: 'Allah Guarantees Replenishing What You Spend'
  },
  {
    surah: 'Surah Al-Munafiqun',
    reference: '63:10',
    arabic: 'وَأَنفِقُوا مِن مَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ أَحَدَكُمُ الْمَوْتُ فَيَقُولَ رَبِّ لَوْلَا أَخَّرْتَنِي إِلَىٰ أَجَلٍ قَرِيبٍ فَأَصَّدَّقَ وَأَكُن مِّنَ الصَّالِحِينَ',
    transliteration: 'Wa anfiqoo mim maa razaqnaakum min qabli any ya\'tiya ahadakumul mawtu fayaqoola Rabbi law laaa akhkhartaneee ilaaa ajalin qareebin fa assaddaqa wa akum minas saaliheen.',
    translation: 'And spend [in the way of Allah] from what We have provided you before death comes to one of you and he says, "My Lord, if only You would delay me for a brief term so I would give charity and be among the righteous."',
    focus: 'Spending for Allah Before Death'
  },
  {
    surah: 'Surah Al-Hadid',
    reference: '57:18',
    arabic: 'إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ',
    transliteration: 'Innal mussaddiqqeena wal mussaddiqaati wa aqradul laaha qardan hasanay yudaa\'afu lahum wa lahum ajrun kareem.',
    translation: 'Indeed, the men who practice charity and the women who practice charity and [they who] have loaned Allah a goodly loan — it will be multiplied for them, and they will have a noble reward.',
    focus: 'A Goodly Loan with Multiplied Noble Reward'
  }
];

export const PROPHETIC_HADITHS = [
  {
    hadith: 'When a human being dies, their deeds come to an end except for three: a continuous charity (Sadaqah Jariyah), knowledge from which people benefit, or a righteous child who prays for them.',
    source: 'Sahih Muslim (1631)',
    theme: 'Continuous Charity (Sadaqah Jariyah)'
  },
  {
    hadith: 'Charity does not decrease wealth in the least. No one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.',
    source: 'Sahih Muslim (2588)',
    theme: 'Charity Never Decreases Wealth'
  },
  {
    hadith: 'Whoever builds a mosque for Allah, even like the nest of a sandgrouse or smaller, Allah will build for him a house in Paradise.',
    source: 'Sunan Ibn Majah (738)',
    theme: 'House in Jannah for Mosque Support'
  },
  {
    hadith: 'The shade of the believer on the Day of Resurrection will be his charity.',
    source: 'Jami\' at-Tirmidhi (604)',
    theme: 'Shade on the Day of Judgement'
  }
];

export const BANK_ACCOUNTS: DonationAccount[] = [
  {
    bankName: 'Lotus Bank',
    accountNumber: '1014485564',
    accountName: 'MUSLIM CORPERS ASSOCIATION OF NIGERIA OSUN CHAPTER',
    purpose: 'Official MCAN Osun State Chapter Donation Account',
    note: 'Official chapter account dedicated to Da\'wah, NYSC Ede Camp outreach, Mosque & Corpers Lodge development, and welfare in the cause of Allah.'
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
      'Article 5: Duties of Executive Council (Ameer, Ameerah, General Secretary, PRO, Welfare).',
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
      'Osogbo Central Brothers Lodge: No 14, MCAN Close, Opposite Old Garage / Rail Station, Osogbo. Contact: Ameer (09056498489) / General Secretary (07039101391).',
      'Osogbo Sisters Lodge: Plot 5, GRA Extension, Behind Technical College, Osogbo. Contact: Ameerah (09039454686).',
      'Ile-Ife Zonal Lodge: Parakin Area, Near Mayfair, Ile-Ife. Contact: 07039101391.',
      'Ede Sub-Lodge: Cottage Hospital Road, Ede (Near Ede Camp). Contact: 09056498489.',
      'Ilesa Sub-Lodge: Imo Area, Near College of Education, Ilesa. Contact: 07039101391.'
    ]
  }
];
