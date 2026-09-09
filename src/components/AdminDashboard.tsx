import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Building,
  TrendingUp,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  EyeOff,
  Lock,
  User,
  LogOut,
  Search,
  Filter,
  Bell,
  HeartHandshake,
  ArrowLeft
} from 'lucide-react';
import { Member, Announcement } from '../types';
import { OSUN_LGAS, MCAN_POSTS, BATCH_LIST } from '../data/constants';

interface AdminDashboardProps {
  members: Member[];
  onRefreshMembers: () => void;
  onViewMemberCard: (member: Member) => void;
  announcements: Announcement[];
  onRefreshAnnouncements: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (status: boolean) => void;
  onNavigateToHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  members,
  onRefreshMembers,
  onViewMemberCard,
  announcements,
  onRefreshAnnouncements,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  onNavigateToHome
}) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check saved admin session on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mcan_admin_auth') === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch {}
  }, [setIsAdminLoggedIn]);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [filterLga, setFilterLga] = useState('ALL');
  const [filterPost, setFilterPost] = useState('ALL');
  const [filterBatch, setFilterBatch] = useState('ALL');

  // New Announcement Modal state
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [ancTitle, setAncTitle] = useState('');
  const [ancCategory, setAncCategory] = useState<'Urgent' | 'Weekly' | 'Monthly' | 'Yearly' | 'General' | 'Camp'>('General');
  const [ancContent, setAncContent] = useState('');
  const [ancAuthor, setAncAuthor] = useState('State Executive Council');
  const [ancPinned, setAncPinned] = useState(false);
  const [isPostingAnc, setIsPostingAnc] = useState(false);

  // Donations list state
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetch('/api/donations')
        .then((r) => r.json())
        .then((d) => setDonations(d.data || []))
        .catch(() => {});
    }
  }, [isAdminLoggedIn]);

  // Handle Admin Login with USERNAME: MCANOSUN and PASSWORD: MCANOSUN123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = adminUsername.trim().toUpperCase();
    const cleanPass = adminPassword.trim();

    if (cleanUser === 'MCANOSUN' && (cleanPass === 'MCANOSUN123' || cleanPass === 'mcanosun123')) {
      setIsAdminLoggedIn(true);
      setAuthError(null);
      try {
        sessionStorage.setItem('mcan_admin_auth', 'true');
      } catch {}
    } else {
      setAuthError('Invalid username or password. Authorized credentials: Username: MCANOSUN | Password: MCANOSUN123');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('mcan_admin_auth');
    } catch {}
    setIsAdminLoggedIn(false);
  };

  // Toggle Member Verification Status
  const handleToggleVerify = async (member: Member) => {
    try {
      await fetch(`/api/members/${member.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !member.verified })
      });
      onRefreshMembers();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Delete Member Record
  const handleDeleteMember = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from MCAN Osun State database?`)) {
      return;
    }
    try {
      await fetch(`/api/members/${id}`, { method: 'DELETE' });
      onRefreshMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  // Post New Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancTitle || !ancContent) return;

    setIsPostingAnc(true);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: ancTitle,
          category: ancCategory,
          content: ancContent,
          author: ancAuthor,
          pinned: ancPinned
        })
      });
      if (res.ok) {
        onRefreshAnnouncements();
        setShowAddAnnouncement(false);
        setAncTitle('');
        setAncContent('');
      }
    } catch (err) {
      console.error('Error posting announcement:', err);
    } finally {
      setIsPostingAnc(false);
    }
  };

  // Delete Announcement
  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
      onRefreshAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Membership ID',
      'Full Name',
      'State Code',
      'MCAN Post',
      'Phone Number',
      'Email',
      'Gender',
      'Osun LGA',
      'PPA',
      'Batch',
      'Blood Group',
      'Verified',
      'Registration Date'
    ];

    const rows = members.map((m) => [
      `"${m.id}"`,
      `"${m.fullName.replace(/"/g, '""')}"`,
      `"${m.stateCode}"`,
      `"${m.mcanPost}"`,
      `"${m.phoneNumber}"`,
      `"${m.email || ''}"`,
      `"${m.gender}"`,
      `"${m.lga}"`,
      `"${(m.ppa || '').replace(/"/g, '""')}"`,
      `"${m.batch}"`,
      `"${m.bloodGroup || ''}"`,
      m.verified ? 'YES' : 'NO',
      `"${m.registrationDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MCAN_Osun_Members_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.stateCode.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.phoneNumber.includes(q) ||
      m.ppa.toLowerCase().includes(q);

    const matchesLga = filterLga === 'ALL' || m.lga === filterLga;
    const matchesPost = filterPost === 'ALL' || m.mcanPost === filterPost;
    const matchesBatch = filterBatch === 'ALL' || m.batch === filterBatch;

    return matchesSearch && matchesLga && matchesPost && matchesBatch;
  });

  // Calculate Statistics
  const totalCount = members.length;
  const verifiedCount = members.filter((m) => m.verified).length;
  const maleCount = members.filter((m) => m.gender === 'Male').length;
  const femaleCount = members.filter((m) => m.gender === 'Female').length;

  const lgaMap: Record<string, number> = {};
  members.forEach((m) => {
    lgaMap[m.lga] = (lgaMap[m.lga] || 0) + 1;
  });
  const topLgas = Object.entries(lgaMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // If not logged in, show clean authentication screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
        {/* Return to Website link */}
        {onNavigateToHome && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Main Website</span>
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-md p-6 sm:p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-white p-1 mx-auto mb-4 shadow-md border-2 border-emerald-700/60 flex items-center justify-center">
            <img
              src="/mcan-logo.png"
              alt="MCAN Official Seal"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono mb-2">
            <Lock className="w-3 h-3 text-emerald-700" />
            <span>Route: /admin</span>
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            MCAN Osun Executive Portal
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-6">
            Sign in with authorized executive credentials to manage member records, database verifications, and chapter announcements.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl text-left border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="MCANOSUN"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 font-mono text-sm uppercase text-gray-900 font-bold"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm font-medium text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>Authenticate & Open Dashboard</span>
            </button>
          </form>

          {/* Credentials Guide */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-500">
            <div className="text-gray-600 font-semibold mb-1.5">Authorized Credentials:</div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-700 font-mono text-[11px] space-y-1">
              <div>Username: <strong className="text-emerald-800">MCANOSUN</strong></div>
              <div>Password: <strong className="text-emerald-800">MCANOSUN123</strong></div>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdminUsername('MCANOSUN');
                setAdminPassword('MCANOSUN123');
              }}
              className="mt-2.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              Click to autofill credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/mcan-logo.png"
            alt="MCAN Official Seal"
            className="w-14 h-14 rounded-full object-contain bg-white p-0.5 border border-emerald-600/40 shadow-xs shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono">
                Route: /admin
              </span>
              <span className="text-xs text-gray-500">• Executive Database Console</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
              MCAN Osun State Chapter Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {onNavigateToHome && (
            <button
              onClick={onNavigateToHome}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Main Website</span>
            </button>
          )}

          <button
            onClick={() => setShowAddAnnouncement(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Announcement</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Registered</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-gray-900">{totalCount}</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">Corps members in database</div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Records</span>
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-emerald-800">{verifiedCount}</div>
          <div className="text-xs text-gray-500 font-medium mt-1">
            {totalCount > 0 ? `${Math.round((verifiedCount / totalCount) * 100)}% verified` : '0%'}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Brothers vs Sisters</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-gray-900">
            {maleCount} <span className="text-gray-400 font-normal">/</span> {femaleCount}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Male / Female distribution</div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">LGAs Represented</span>
            <Building className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-black text-gray-900">
            {Object.keys(lgaMap).length} <span className="text-sm font-bold text-gray-400">/ 30</span>
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Local Govt Areas</div>
        </div>
      </div>

      {/* Member Management Table Card */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs overflow-hidden">
        {/* Table Filters Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, code, phone..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* LGA Filter */}
            <select
              value={filterLga}
              onChange={(e) => setFilterLga(e.target.value)}
              className="px-2.5 py-2 rounded-xl border border-gray-200 text-xs bg-white font-medium"
            >
              <option value="ALL">All LGAs</option>
              {OSUN_LGAS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            {/* Post Filter */}
            <select
              value={filterPost}
              onChange={(e) => setFilterPost(e.target.value)}
              className="px-2.5 py-2 rounded-xl border border-gray-200 text-xs bg-white font-medium"
            >
              <option value="ALL">All Posts</option>
              {MCAN_POSTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Batch Filter */}
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="px-2.5 py-2 rounded-xl border border-gray-200 text-xs bg-white font-medium"
            >
              <option value="ALL">All Batches</option>
              {BATCH_LIST.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">State Code / ID</th>
                <th className="py-3 px-4">Post</th>
                <th className="py-3 px-4">LGA & PPA</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Verified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Member photo + name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img
                            src={m.passportUrl}
                            alt={m.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{m.fullName}</div>
                          <div className="text-gray-400 font-mono text-[11px]">{m.gender} • {m.batch}</div>
                        </div>
                      </div>
                    </td>

                    {/* State Code */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-emerald-950">{m.stateCode}</div>
                      <div className="font-mono text-gray-400 text-[10px]">{m.id}</div>
                    </td>

                    {/* Post */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px]">
                        {m.mcanPost}
                      </span>
                    </td>

                    {/* LGA & PPA */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-gray-800">{m.lga} LGA</div>
                      <div className="text-gray-500 truncate text-[11px]">{m.ppa}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-3 px-4 font-mono text-gray-700">
                      <div>{m.phoneNumber}</div>
                    </td>

                    {/* Verified Status */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleVerify(m)}
                        title="Click to toggle verification status"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          m.verified
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {m.verified ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{m.verified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewMemberCard(m)}
                          title="View and Print ID Card"
                          className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-50"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(m.id, m.fullName)}
                          title="Delete Member"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No member records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements Manager & Donations Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Announcements List */}
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-gray-900 text-base">Active Broadcast Announcements</h3>
            </div>
            <button
              onClick={() => setShowAddAnnouncement(true)}
              className="text-xs text-emerald-800 font-bold hover:underline"
            >
              + New Broadcast
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((anc) => (
              <div
                key={anc.id}
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-sm">
                      {anc.category}
                    </span>
                    {anc.pinned && (
                      <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded-sm">
                        PINNED
                      </span>
                    )}
                    <span className="text-gray-400">
                      {new Date(anc.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900">{anc.title}</h4>
                  <p className="text-gray-600 line-clamp-2">{anc.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteAnnouncement(anc.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Donations Notification Log */}
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className="w-4 h-4 text-emerald-800" />
            <h3 className="font-bold text-gray-900 text-base">Recent Donation Notifications</h3>
          </div>

          <div className="space-y-3">
            {donations.length > 0 ? (
              donations.map((don) => (
                <div
                  key={don.id}
                  className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 text-xs flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-gray-900">{don.donorName}</div>
                    <div className="text-gray-500 font-medium">
                      {don.purpose} • <span className="font-bold text-emerald-800">{don.bankUsed}</span>
                    </div>
                    <div className="text-gray-400 font-mono text-[10px]">
                      Ref: {don.transactionRef}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-emerald-900 font-mono">
                      ₦{don.amount?.toLocaleString()}
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {don.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">
                No transfer notifications recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Post New Announcement */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">Post New Chapter Announcement</h3>
              <button
                onClick={() => setShowAddAnnouncement(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={ancTitle}
                  onChange={(e) => setAncTitle(e.target.value)}
                  placeholder="e.g. Weekly Sunday Usrah Venue Update"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={ancCategory}
                    onChange={(e: any) => setAncCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  >
                    <option value="Urgent">Urgent Alert</option>
                    <option value="Weekly">Weekly Program</option>
                    <option value="Monthly">Monthly Program</option>
                    <option value="Yearly">Yearly Program</option>
                    <option value="Camp">Ede Camp</option>
                    <option value="General">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Author Title</label>
                  <input
                    type="text"
                    value={ancAuthor}
                    onChange={(e) => setAncAuthor(e.target.value)}
                    placeholder="e.g. State PRO"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Content *</label>
                <textarea
                  rows={4}
                  required
                  value={ancContent}
                  onChange={(e) => setAncContent(e.target.value)}
                  placeholder="Details of the announcement..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinAnc"
                  checked={ancPinned}
                  onChange={(e) => setAncPinned(e.target.checked)}
                  className="rounded-sm border-gray-300 text-emerald-800 focus:ring-emerald-600"
                />
                <label htmlFor="pinAnc" className="font-semibold text-gray-700 cursor-pointer">
                  Pin to top banner & ticker
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddAnnouncement(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPostingAnc}
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-900"
                >
                  {isPostingAnc ? 'Posting...' : 'Publish Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
