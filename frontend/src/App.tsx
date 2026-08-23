import { useState, useEffect } from 'react';
import { Sidebar, type Page } from '@/components/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Resources } from '@/pages/Resources';
import { Attendance } from '@/pages/Attendance';
import { Opportunities } from '@/pages/Opportunities';
import { Profile } from '@/pages/Profile';
import { Health } from '@/pages/Health';
import { CampusWallet } from '@/pages/CampusWallet';
import { Chatbot } from '@/pages/Chatbot';

import { api, type Subject, type Deadline } from '@/lib/api';

function App() {
  const [page, setPage] = useState<Page>('dashboard');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    api.subjects.list().then(setSubjects).catch(() => {});
    api.deadlines.list().then(setDeadlines).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-paper-200">
      <Sidebar page={page} setPage={setPage} />

      <main className="px-4 pb-20 pt-16 md:pl-80 md:pr-8 md:pt-10">
        <div key={page} className="animate-page-turn">

          {page === 'dashboard' && (
            <Dashboard
              setPage={setPage}
              subjects={subjects}
              deadlines={deadlines}
              setDeadlines={setDeadlines}
            />
          )}

          {page === 'resources' && (
            <Resources />
          )}

          {page === 'attendance' && (
            <Attendance
              subjects={subjects}
              setSubjects={setSubjects}
            />
          )}

          {page === 'opportunities' && (
            <Opportunities />
          )}
          {page === 'health' && (
            <Health />
          )}
          {page === 'wallet' && (
            <CampusWallet />
          )}

          {page === 'profile' && (
            <Profile setPage={(p) => setPage(p as Page)} />
          )}

          {page === 'chatbot' && (
            <Chatbot />
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
