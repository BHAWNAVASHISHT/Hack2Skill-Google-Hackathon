/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MockStoreProvider, useMockStore } from './lib/mockStore';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CitizenDashboard from './pages/citizen/Dashboard';
import FileComplaint from './pages/citizen/FileComplaint';
import TrackComplaint from './pages/citizen/TrackComplaint';
import WorkerDashboard from './pages/worker/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ComplaintDetails from './pages/admin/ComplaintDetails';
import SocialBuster from './pages/SocialBuster';
import SafetyAid from './pages/citizen/SafetyAid';
import WorkerProfile from './pages/admin/WorkerProfile';
import AssignmentFlow from './pages/admin/AssignmentFlow';

import { Toaster } from 'sonner';

function AppRoutes() {
  const { profile } = useMockStore();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      
      {/* Citizen Routes */}
      <Route path="/citizen" element={profile?.role === 'citizen' ? <CitizenDashboard /> : <Navigate to="/login" />} />
      <Route path="/citizen/safety" element={<SafetyAid />} />
      <Route path="/citizen/file" element={profile?.role === 'citizen' ? <FileComplaint /> : <Navigate to="/login" />} />
      <Route path="/citizen/track/:id" element={profile?.role === 'citizen' ? <TrackComplaint /> : <Navigate to="/login" />} />

      {/* Worker Routes */}
      <Route path="/worker" element={profile?.role === 'worker' ? <WorkerDashboard /> : <Navigate to="/login" />} />
      <Route path="/worker/complaint/:id" element={profile?.role === 'worker' ? <ComplaintDetails /> : <Navigate to="/login" />} />

      {/* Admin Routes */}
      <Route path="/admin" element={profile?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/admin/workforce/profile/:id" element={profile?.role === 'admin' ? <WorkerProfile /> : <Navigate to="/login" />} />
      <Route path="/admin/workforce/reroute/:id" element={profile?.role === 'admin' ? <AssignmentFlow /> : <Navigate to="/login" />} />
      <Route path="/social-buster" element={<SocialBuster />} />
      <Route path="/admin/complaint/:id" element={profile?.role === 'admin' ? <ComplaintDetails /> : <Navigate to="/login" />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <MockStoreProvider>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MockStoreProvider>
  );
}
