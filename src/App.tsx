import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { RegistrationSection } from './components/RegistrationSection';
import { VerificationSection } from './components/VerificationSection';
import { ProgramsSection } from './components/ProgramsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { DonationSection } from './components/DonationSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { IdCardCanvas } from './components/IdCardCanvas';
import { Member, Announcement, ProgramActivity } from './types';
import { INITIAL_MEMBERS, INITIAL_ANNOUNCEMENTS, INITIAL_PROGRAMS } from './data/constants';
import { X } from 'lucide-react';
import { safeFetchJson } from './utils/api';
import { getLocalMembers } from './utils/memberStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [programs, setPrograms] = useState<ProgramActivity[]>(INITIAL_PROGRAMS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Direct verification param from QR scan or URL
  const [initialVerifyCode, setInitialVerifyCode] = useState<string>('');

  // Selected member for modal card reprint / viewing
  const [selectedCardMember, setSelectedCardMember] = useState<Member | null>(null);

  // Load backend data with safe fallback
  const refreshMembers = async () => {
    try {
      const res = await safeFetchJson<{ data?: Member[] }>('/api/members');
      const serverList = res.ok && res.data?.data ? res.data.data : INITIAL_MEMBERS;
      const localList = getLocalMembers();

      // Merge and deduplicate by id and stateCode
      const map = new Map<string, Member>();
      [...serverList, ...localList].forEach((m) => {
        if (m.id) map.set(m.id, m);
        if (m.stateCode) map.set(m.stateCode.toUpperCase(), m);
      });

      const merged = Array.from(new Set(map.values()));
      setMembers(merged.length > 0 ? merged : INITIAL_MEMBERS);
    } catch (err) {
      console.warn('Fallback: loading local members:', err);
      const localList = getLocalMembers();
      setMembers(localList.length > 0 ? [...localList, ...INITIAL_MEMBERS] : INITIAL_MEMBERS);
    }
  };

  const refreshAnnouncements = async () => {
    try {
      const res = await safeFetchJson<{ data?: Announcement[] }>('/api/announcements');
      if (res.ok && res.data?.data) {
        setAnnouncements(res.data.data);
      }
    } catch (err) {
      console.warn('Error fetching announcements:', err);
    }
  };

  const refreshPrograms = async () => {
    try {
      const res = await safeFetchJson<{ data?: ProgramActivity[] }>('/api/programs');
      if (res.ok && res.data?.data) {
        setPrograms(res.data.data);
      }
    } catch (err) {
      console.warn('Error fetching programs:', err);
    }
  };

  useEffect(() => {
    refreshMembers();
    refreshAnnouncements();
    refreshPrograms();

    // Check URL route (e.g. /admin, ?verify=CODE, or ?tab=register)
    const parseRoute = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();

      // Dedicated /admin route
      if (pathname === '/admin' || pathname.startsWith('/admin') || params.get('tab') === 'admin' || hash === '#admin') {
        setActiveTab('admin');
        return;
      }

      const verifyParam = params.get('verify');
      if (verifyParam) {
        setInitialVerifyCode(verifyParam);
        setActiveTab('verify');
        return;
      }

      const tabParam = params.get('tab');
      if (tabParam && ['home', 'register', 'verify', 'programs', 'resources', 'donate'].includes(tabParam)) {
        setActiveTab(tabParam);
        return;
      }

      // Friendly path aliases if typed directly
      if (pathname === '/register') setActiveTab('register');
      else if (pathname === '/verify') setActiveTab('verify');
      else if (pathname === '/programs') setActiveTab('programs');
      else if (pathname === '/resources') setActiveTab('resources');
      else if (pathname === '/donate') setActiveTab('donate');
      else setActiveTab('home');
    };

    parseRoute();
    window.addEventListener('popstate', parseRoute);
    return () => window.removeEventListener('popstate', parseRoute);
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Synchronize browser history and URL cleanly
    try {
      if (tab === 'admin') {
        window.history.pushState({ tab: 'admin' }, '', '/admin');
      } else if (tab === 'home') {
        window.history.pushState({ tab: 'home' }, '', '/');
      } else {
        window.history.pushState({ tab }, '', `/?tab=${tab}`);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-emerald-800 selection:text-amber-300">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        announcements={announcements}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={handleNavigate}
            announcements={announcements}
            programs={programs}
            totalMembers={members.length}
          />
        )}

        {activeTab === 'register' && (
          <RegistrationSection
            onMemberRegistered={(newMember) => {
              setMembers((prev) => [newMember, ...prev.filter((m) => m.id !== newMember.id)]);
            }}
          />
        )}

        {activeTab === 'verify' && (
          <VerificationSection
            initialCode={initialVerifyCode}
            onViewCard={(member) => setSelectedCardMember(member)}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsSection programs={programs} />
        )}

        {activeTab === 'resources' && (
          <ResourcesSection />
        )}

        {activeTab === 'donate' && (
          <DonationSection />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            members={members}
            onRefreshMembers={refreshMembers}
            onViewMemberCard={(member) => setSelectedCardMember(member)}
            announcements={announcements}
            onRefreshAnnouncements={refreshAnnouncements}
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            onNavigateToHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Modal for Viewing & Reprinting ID Card */}
      {selectedCardMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedCardMember(null)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors z-10"
              title="Close Card View"
            >
              <X className="w-5 h-5" />
            </button>

            <IdCardCanvas member={selectedCardMember} />
          </div>
        </div>
      )}

      {/* Official Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
