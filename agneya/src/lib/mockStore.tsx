import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

export interface Complaint {
  id: string;
  citizenId: string;
  title: string;
  description?: string;
  summary: string;
  aiSummary?: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'under_process' | 'solved' | 'rejected';
  trackId: string;
  imageUrl?: string;
  fakeScore: number;
  fakeReason?: string;
  workerId?: string;
  assignmentSuggestion?: string;
  assignmentType?: 'ai' | 'manual';
  createdAt: number;
  updatedAt: number;
  address?: string;
  block?: string;
  eventType?: string;
}

export interface Worker {
  id: string;
  name: string;
  department: string;
  status: 'assigned' | 'free';
  tasksCount: number;
}

interface MockStore {
  user: any;
  profile: any;
  complaints: Complaint[];
  workers: Worker[];
  language: Language;
  t: (key: keyof typeof translations['en']) => string;
  setLanguage: (lang: Language) => void;
  login: (role: string, name: string) => void;
  logout: () => void;
  addComplaint: (complaint: Partial<Complaint>) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
}

const StoreContext = createContext<MockStore | null>(null);

export const MockStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('agneya_lang') as Language) || 'en';
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('agneya_complaints');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: 'c1',
        citizenId: 'user_mock',
        title: 'Major Pothole causing traffic congestion',
        summary: 'Large pothole on main road causing several vehicles to slow down.',
        aiSummary: 'Infrastructure Hazard. High priority for traffic safety.',
        category: 'Ministry of Infrastructure',
        severity: 'high',
        status: 'under_process',
        trackId: 'AG-102',
        fakeScore: 0.05,
        imageUrl: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 3600000 * 24,
        updatedAt: Date.now() - 3600000 * 23,
        address: 'Indiranagar, Bangalore',
        block: 'Block 4',
        workerId: 'worker_1',
        assignmentType: 'ai'
      },
      {
        id: 'c2',
        citizenId: 'user_mock_2',
        title: 'Critical street light outage',
        summary: 'Corner light near the park has been flickering and is now completely out.',
        aiSummary: 'Safety risk due to low visibility. Verified via neighborhood reports.',
        category: 'Ministry of Power',
        severity: 'medium',
        status: 'reported',
        trackId: 'AG-305',
        fakeScore: 0.1,
        imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6b66b721?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 7200000,
        updatedAt: Date.now() - 7200000,
        address: 'Sector 12, Janakpuri',
        block: 'Lane 2',
        assignmentType: 'manual'
      },
      {
        id: 'c3',
        citizenId: 'user_mock',
        title: 'Illegal Industrial Dumping',
        summary: 'Seen a truck dumping building waste near the lake area.',
        aiSummary: 'Environmental violation. AI flagged potential identity mismatch in reporting node.',
        category: 'Ministry of Environment',
        severity: 'low',
        status: 'reported',
        trackId: 'AG-442',
        fakeScore: 0.85,
        fakeReason: 'Identical image and metadata detected in 12 reports submitted via anonymous nodes within 5 seconds. High probability of scripted bot activity.',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 86400000 * 2,
        updatedAt: Date.now() - 86400000 * 2,
        address: 'Hebbal Lake Area',
        block: 'East Zone'
      },
      {
        id: 'c4',
        citizenId: 'worker_1',
        title: 'Emergency: Main Water line burst',
        summary: 'Main line burst causing water flooding in local households.',
        aiSummary: 'Utility Emergency. High-speed fluid leak detected.',
        category: 'Ministry of Water',
        severity: 'critical',
        status: 'under_process',
        trackId: 'AG-991',
        fakeScore: 0.01,
        fakeReason: 'Satellite telemetry and local pressure sensors confirm a significant drop at MG Road node. Multiple citizen verify visually.',
        imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 15 * 60000,
        updatedAt: Date.now() - 10 * 60000,
        address: 'MG Road Junction',
        block: 'Central',
        workerId: 'worker_1',
        assignmentType: 'ai'
      },
      {
        id: 'c5',
        citizenId: 'user_mock',
        title: 'Open Sewers after heavy monsoons',
        summary: 'Manhole cover missing since heavy rains last night. Extremely dangerous.',
        aiSummary: 'High danger for pedestrians. Confirmed via multiple IoT sensor triggers.',
        category: 'Ministry of Urban Development',
        severity: 'critical',
        status: 'under_process',
        trackId: 'AG-007',
        fakeScore: 0.02,
        imageUrl: 'https://images.unsplash.com/photo-1525494627253-3398935c754d?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 2 * 3600000,
        updatedAt: Date.now() - 1 * 3600000,
        address: 'Koramangala 5th Block',
        block: 'Block 5',
        workerId: 'worker_1',
        assignmentType: 'ai'
      },
      {
        id: 'c6',
        citizenId: 'user_mock',
        title: 'Live snapping electrical wire',
        summary: 'Wire from the pole has snapped partially and hanging low over public path.',
        aiSummary: 'Life-threatening electrical hazard. High thermal signature detected on local grid.',
        category: 'Ministry of Power',
        severity: 'critical',
        status: 'under_process',
        trackId: 'AG-221',
        fakeScore: 0.03,
        imageUrl: 'https://images.unsplash.com/photo-1470068532454-9ed397dc2391?q=80&w=1000&auto=format&fit=crop',
        createdAt: Date.now() - 30 * 60000,
        updatedAt: Date.now() - 5 * 60000,
        address: 'HSR Layout, Sector 2',
        block: 'Sector 2',
        workerId: 'worker_1',
        assignmentType: 'manual'
      }
    ];
  });

  const [workers, setWorkers] = useState<Worker[]>([
    { id: 'worker_1', name: 'R. Shinde', department: 'Response', status: 'assigned', tasksCount: 4 },
    { id: 'worker_2', name: 'John Doe', department: 'Roadways', status: 'free', tasksCount: 0 },
    { id: 'worker_3', name: 'Anita Kumar', department: 'Sanitation', status: 'assigned', tasksCount: 1 },
    { id: 'worker_4', name: 'K. Rahul', department: 'Electricity', status: 'free', tasksCount: 0 }
  ]);

  useEffect(() => {
    localStorage.setItem('agneya_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('agneya_lang', language);
  }, [language]);

  const t = (key: keyof typeof translations['en']) => {
    return (translations[language] as any)[key] || translations['en'][key];
  };

  const login = (role: string, name: string) => {
    const isWorker = role === 'worker';
    const mockUser = { uid: isWorker ? 'worker_1' : `user_${Math.random().toString(36).substr(2, 9)}`, displayName: name };
    const mockProfile = { 
      uid: mockUser.uid, 
      role, 
      name: isWorker ? 'R. Shinde' : name, 
      department: isWorker ? 'Response' : null,
      language: language
    };
    setUser(mockUser);
    setProfile(mockProfile);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
  };

  const addComplaint = (data: Partial<Complaint>) => {
    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      citizenId: user?.uid || 'guest',
      title: data.title || 'Untitled Issue',
      summary: data.summary || '',
      category: data.category || 'Ministry of Infrastructure',
      severity: data.severity || 'medium',
      status: 'reported',
      trackId: 'AG-' + Math.floor(Math.random() * 1000),
      fakeScore: data.fakeScore || 0.1,
      fakeReason: data.fakeReason || 'Verified via citizen network.',
      imageUrl: data.imageUrl || `https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1000&auto=format&fit=crop`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...data
    } as Complaint;
    setComplaints([newComplaint, ...complaints]);
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c));
  };

  return (
    <StoreContext.Provider value={{ 
      user, profile, complaints, workers, language, t, setLanguage, login, logout, addComplaint, updateComplaint 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useMockStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useMockStore must be used within MockStoreProvider');
  return context;
};
