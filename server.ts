import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { INITIAL_MEMBERS, INITIAL_ANNOUNCEMENTS, INITIAL_PROGRAMS } from './src/data/constants.ts';
import { Member, Announcement, ProgramActivity } from './src/types.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const DATA_DIR = path.join(process.cwd(), 'data');
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json');
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, 'announcements.json');
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadMembers(): Member[] {
  try {
    if (fs.existsSync(MEMBERS_FILE)) {
      const content = fs.readFileSync(MEMBERS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading members file:', err);
  }
  // Initialize with seed data
  saveMembers(INITIAL_MEMBERS);
  return INITIAL_MEMBERS;
}

function saveMembers(members: Member[]) {
  try {
    fs.writeFileSync(MEMBERS_FILE, JSON.stringify(members, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving members file:', err);
  }
}

function loadAnnouncements(): Announcement[] {
  try {
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      const content = fs.readFileSync(ANNOUNCEMENTS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading announcements file:', err);
  }
  saveAnnouncements(INITIAL_ANNOUNCEMENTS);
  return INITIAL_ANNOUNCEMENTS;
}

function saveAnnouncements(announcements: Announcement[]) {
  try {
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving announcements file:', err);
  }
}

interface DonationRecord {
  id: string;
  donorName: string;
  phone: string;
  amount: number;
  purpose: string;
  bankUsed: string;
  transactionRef: string;
  date: string;
  status: 'Pending' | 'Confirmed';
}

function loadDonations(): DonationRecord[] {
  try {
    if (fs.existsSync(DONATIONS_FILE)) {
      const content = fs.readFileSync(DONATIONS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading donations file:', err);
  }
  return [
    {
      id: 'DON-01',
      donorName: 'Bro. Ridwan Olatunji (Ex-Corper)',
      phone: '08031122334',
      amount: 25000,
      purpose: 'Mosque & Corpers Lodge Expansion Project',
      bankUsed: 'Stanbic IBTC Bank',
      transactionRef: 'STAN-TXN-984210',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'Confirmed'
    },
    {
      id: 'DON-02',
      donorName: 'Anonymous Sister',
      phone: '08120000000',
      amount: 10000,
      purpose: 'Official Zakat & Sadaqah Fund',
      bankUsed: 'Jaiz Bank Plc',
      transactionRef: 'JAIZ-SAD-44129',
      date: new Date(Date.now() - 86400000 * 4).toISOString(),
      status: 'Confirmed'
    }
  ];
}

function saveDonations(donations: DonationRecord[]) {
  try {
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving donations file:', err);
  }
}

// In-memory or persisted programs list
let programsData: ProgramActivity[] = [...INITIAL_PROGRAMS];

// === API ROUTES ===

// 1. Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Members API
app.get('/api/members', (req, res) => {
  const members = loadMembers();
  const { search, lga, post, batch } = req.query;

  let filtered = [...members];

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.stateCode.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.phoneNumber.includes(q) ||
        m.ppa.toLowerCase().includes(q)
    );
  }

  if (lga && typeof lga === 'string' && lga !== 'ALL') {
    filtered = filtered.filter((m) => m.lga.toLowerCase() === lga.toLowerCase());
  }

  if (post && typeof post === 'string' && post !== 'ALL') {
    filtered = filtered.filter((m) => m.mcanPost.toLowerCase() === post.toLowerCase());
  }

  if (batch && typeof batch === 'string' && batch !== 'ALL') {
    filtered = filtered.filter((m) => m.batch.toLowerCase() === batch.toLowerCase());
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// 3. Register a new member & generate ID
app.post('/api/members', (req, res) => {
  try {
    const {
      fullName,
      stateCode,
      callUpNumber,
      mcanPost,
      phoneNumber,
      whatsappNumber,
      email,
      passportUrl,
      gender,
      lga,
      ppa,
      bloodGroup,
      batch,
      residence,
      emergencyContactName,
      emergencyContactPhone
    } = req.body;

    if (!fullName || !stateCode || !mcanPost || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, stateCode, mcanPost, and phoneNumber are mandatory.'
      });
    }

    // Clean state code format: ensure uppercase, standard slashes
    // Expected: OS/26C/XXXX or OS//26C/XXXX
    let formattedStateCode = String(stateCode).trim().toUpperCase();
    formattedStateCode = formattedStateCode.replace(/\/+/g, '/');

    const members = loadMembers();

    // Check if State Code already registered
    const existing = members.find(
      (m) => m.stateCode.toUpperCase() === formattedStateCode.toUpperCase()
    );
    if (existing) {
      return res.status(409).json({
        success: false,
        error: `A member with state code ${formattedStateCode} is already registered as ${existing.fullName}. You can search and reprint your ID card directly!`,
        existingMember: existing
      });
    }

    const currentYear = new Date().getFullYear();
    const countSeq = (members.length + 1).toString().padStart(4, '0');
    const newId = `MCAN-OS-${currentYear}-${countSeq}`;
    const randomSalt = Math.random().toString(36).substring(2, 6).toUpperCase();
    const verificationHash = `V${randomSalt}-${newId}`;

    const newMember: Member = {
      id: newId,
      fullName: fullName.trim(),
      stateCode: formattedStateCode,
      callUpNumber: callUpNumber ? callUpNumber.trim() : undefined,
      mcanPost: mcanPost || 'Corps Member',
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber ? whatsappNumber.trim() : phoneNumber.trim(),
      email: email ? email.trim() : undefined,
      passportUrl: passportUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      gender: gender || 'Male',
      lga: lga || 'Osogbo',
      ppa: ppa ? ppa.trim() : 'Place of Primary Assignment, Osun State',
      bloodGroup: bloodGroup || 'O+',
      batch: batch || '2026 Batch C Stream 1',
      residence: residence || 'Osun State',
      registrationDate: new Date().toISOString(),
      verified: true,
      verificationHash,
      emergencyContactName: emergencyContactName ? emergencyContactName.trim() : undefined,
      emergencyContactPhone: emergencyContactPhone ? emergencyContactPhone.trim() : undefined
    };

    members.unshift(newMember);
    saveMembers(members);

    res.status(201).json({
      success: true,
      message: 'Member registered successfully and MCAN ID Card generated!',
      member: newMember
    });
  } catch (err: any) {
    console.error('Error registering member:', err);
    res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
});

// 4. Verification Endpoint (Public, secure database check)
app.get('/api/verify/:code', (req, res) => {
  const code = req.params.code.trim();
  const members = loadMembers();

  // Normalize code check: can match stateCode, ID, or verificationHash
  const cleanCode = code.replace(/\/+/g, '/').toUpperCase();

  const found = members.find(
    (m) =>
      m.verificationHash.toUpperCase() === cleanCode ||
      m.id.toUpperCase() === cleanCode ||
      m.stateCode.replace(/\/+/g, '/').toUpperCase() === cleanCode
  );

  if (!found) {
    return res.status(404).json({
      success: false,
      verified: false,
      message: 'Record Not Found: No registered MCAN Osun corps member matches this identifier.'
    });
  }

  res.json({
    success: true,
    verified: true,
    member: {
      id: found.id,
      fullName: found.fullName,
      stateCode: found.stateCode,
      mcanPost: found.mcanPost,
      gender: found.gender,
      lga: found.lga,
      ppa: found.ppa,
      batch: found.batch,
      phoneNumber: found.phoneNumber,
      registrationDate: found.registrationDate,
      verified: found.verified,
      verificationHash: found.verificationHash,
      passportUrl: found.passportUrl
    },
    verificationTimestamp: new Date().toISOString(),
    issuingAuthority: 'Muslim Corpers Association of Nigeria (MCAN), Osun State Chapter Secretariat'
  });
});

// 5. Single member details
app.get('/api/members/:id', (req, res) => {
  const members = loadMembers();
  const found = members.find((m) => m.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, error: 'Member not found' });
  }
  res.json({ success: true, member: found });
});

// 6. Update member (Admin)
app.patch('/api/members/:id', (req, res) => {
  const members = loadMembers();
  const idx = members.findIndex((m) => m.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Member not found' });
  }

  members[idx] = {
    ...members[idx],
    ...req.body,
    id: members[idx].id // Protect immutable ID
  };

  saveMembers(members);
  res.json({ success: true, member: members[idx] });
});

// 7. Delete member (Admin)
app.delete('/api/members/:id', (req, res) => {
  let members = loadMembers();
  const initialLength = members.length;
  members = members.filter((m) => m.id !== req.params.id);
  if (members.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Member not found' });
  }
  saveMembers(members);
  res.json({ success: true, message: 'Member record deleted successfully' });
});

// 8. Statistics API
app.get('/api/stats', (_req, res) => {
  const members = loadMembers();
  const totalMembers = members.length;
  const verifiedCount = members.filter((m) => m.verified).length;

  const maleCount = members.filter((m) => m.gender === 'Male').length;
  const femaleCount = members.filter((m) => m.gender === 'Female').length;

  // LGA breakdown
  const lgaDistribution: Record<string, number> = {};
  members.forEach((m) => {
    lgaDistribution[m.lga] = (lgaDistribution[m.lga] || 0) + 1;
  });

  // Post breakdown
  const postDistribution: Record<string, number> = {};
  members.forEach((m) => {
    postDistribution[m.mcanPost] = (postDistribution[m.mcanPost] || 0) + 1;
  });

  // Batch breakdown
  const batchDistribution: Record<string, number> = {};
  members.forEach((m) => {
    batchDistribution[m.batch] = (batchDistribution[m.batch] || 0) + 1;
  });

  res.json({
    success: true,
    stats: {
      totalMembers,
      verifiedCount,
      gender: { male: maleCount, female: femaleCount },
      lgaDistribution,
      postDistribution,
      batchDistribution,
      lastUpdated: new Date().toISOString()
    }
  });
});

// 9. Announcements API (Real-time updates)
app.get('/api/announcements', (_req, res) => {
  const announcements = loadAnnouncements();
  res.json({ success: true, data: announcements });
});

app.post('/api/announcements', (req, res) => {
  const { title, category, content, author, pinned } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, error: 'Title and content are required' });
  }
  const announcements = loadAnnouncements();
  const newAnc: Announcement = {
    id: `anc-${Date.now()}`,
    title: title.trim(),
    category: category || 'General',
    content: content.trim(),
    publishedAt: new Date().toISOString(),
    pinned: Boolean(pinned),
    author: author ? author.trim() : 'MCAN Osun Executive'
  };
  announcements.unshift(newAnc);
  saveAnnouncements(announcements);
  res.status(201).json({ success: true, announcement: newAnc });
});

app.delete('/api/announcements/:id', (req, res) => {
  let announcements = loadAnnouncements();
  announcements = announcements.filter((a) => a.id !== req.params.id);
  saveAnnouncements(announcements);
  res.json({ success: true, message: 'Announcement deleted' });
});

// 10. Programs API (Weekly, Monthly, Yearly)
app.get('/api/programs', (_req, res) => {
  res.json({ success: true, data: programsData });
});

app.post('/api/programs', (req, res) => {
  const { title, frequency, schedulePattern, time, venue, description, targetAudience, category, coordinator } = req.body;
  if (!title || !frequency || !venue) {
    return res.status(400).json({ success: false, error: 'Title, frequency and venue are required' });
  }
  const newProg: ProgramActivity = {
    id: `prog-${Date.now()}`,
    title: title.trim(),
    frequency: frequency as any,
    schedulePattern: schedulePattern || time || 'Scheduled',
    time: time || '10:00 AM',
    venue: venue.trim(),
    description: description ? description.trim() : '',
    targetAudience: targetAudience || 'All Muslim Corps Members',
    category: category || 'Spiritual',
    coordinator: coordinator || 'MCAN Osun Executive',
    isUpcoming: true
  };
  programsData.unshift(newProg);
  res.status(201).json({ success: true, program: newProg });
});

// 11. Donations API
app.get('/api/donations', (_req, res) => {
  const donations = loadDonations();
  res.json({ success: true, data: donations });
});

app.post('/api/donations/notify', (req, res) => {
  const { donorName, phone, amount, purpose, bankUsed, transactionRef } = req.body;
  if (!donorName || !amount || !bankUsed) {
    return res.status(400).json({ success: false, error: 'Donor name, amount, and bank are required' });
  }
  const donations = loadDonations();
  const newDonation: DonationRecord = {
    id: `DON-${Date.now().toString().slice(-6)}`,
    donorName: donorName.trim(),
    phone: phone ? phone.trim() : '',
    amount: Number(amount) || 0,
    purpose: purpose || 'Official Zakat & Sadaqah Fund',
    bankUsed,
    transactionRef: transactionRef ? transactionRef.trim() : `REF-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString(),
    status: 'Pending'
  };
  donations.unshift(newDonation);
  saveDonations(donations);
  res.status(201).json({ success: true, message: 'Donation notification received. May Allah accept it and reward you abundantly!', donation: newDonation });
});

// Explicit API 404 handler
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Explicit API error handler for bodyParser and route exceptions
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api')) {
    console.error('API Error intercepted:', err?.message || err);
    res.status(err?.status || 500).json({
      success: false,
      error: err?.type === 'entity.too.large'
        ? 'Uploaded payload or photo size is too large. Please use a compressed photo.'
        : (err?.message || 'An unexpected error occurred on the server.')
    });
    return;
  }
  next(err);
});

// === SERVER BOOTSTRAP WITH VITE MIDDLEWARE ===
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MCAN Osun State Portal Server running on http://localhost:${PORT}`);
  });
}

startServer();
