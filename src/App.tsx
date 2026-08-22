import { useState } from 'react';
import { Sidebar, type Page } from '@/components/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Resources } from '@/pages/Resources';
import { Attendance } from '@/pages/Attendance';
import { Opportunities } from '@/pages/Opportunities';
import { Profile } from '@/pages/Profile';
import { Health } from '@/pages/Health';
import { CampusWallet } from '@/pages/CampusWallet';


import {
  subjects as initialSubjects,
  deadlines as initialDeadlines,
  type Subject,
  type Deadline,
} from '@/data/mock';

function App() {
  const [page, setPage] = useState<Page>('dashboard');

  const [subjects, setSubjects] =
    useState<Subject[]>(initialSubjects);

  const [deadlines, setDeadlines] =
    useState<Deadline[]>(initialDeadlines);

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
            <Profile />
          )}

        </div>
      </main>
    </div>
  );
}

export default App;