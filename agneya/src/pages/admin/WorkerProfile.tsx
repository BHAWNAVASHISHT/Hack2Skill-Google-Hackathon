import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Mail, Phone, MapPin, Briefcase, 
  Clock, Shield, Star, Award, TrendingUp, AlertCircle
} from 'lucide-react';
import { useMockStore } from '../../lib/mockStore';

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, complaints } = useMockStore();
  
  const worker = workers.find(w => w.id === id);
  const workerTasks = complaints.filter(c => c.workerId === id);
  const solvedCount = workerTasks.filter(c => c.status === 'solved').length;

  if (!worker) return <div className="flex items-center justify-center p-20">Worker Link Severed. 404 Node.</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="h-20 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-50">
        <button onClick={() => navigate('/admin')} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
          <ArrowLeft className="w-8 h-8" />
        </button>
        <div className="ml-4">
           <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Personnel Dossier</div>
           <h1 className="text-xl font-black text-slate-900 tracking-tight">{worker.name}</h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto w-full p-6 md:p-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Col: Info Card */}
            <div className="flex flex-col gap-8">
               <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="flex flex-col items-center text-center gap-6">
                     <div className="w-32 h-32 bg-slate-950 text-white rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-2xl border-4 border-white">
                        {worker.name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{worker.name}</h2>
                        <p className="text-sm font-black text-primary uppercase tracking-widest mt-1">{worker.department}</p>
                     </div>
                     <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${worker.status === 'free' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-orange-50 border-orange-100 text-primary'}`}>
                        {worker.status}
                     </div>
                  </div>

                  <div className="mt-10 space-y-6 pt-10 border-t border-slate-50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Mail className="w-5 h-5" /></div>
                        <div className="text-sm font-bold text-slate-600">{worker.email || 'worker@veritas.gov'}</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Phone className="w-5 h-5" /></div>
                        <div className="text-sm font-bold text-slate-600">+91 9988776655</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><MapPin className="w-5 h-5" /></div>
                        <div className="text-sm font-bold text-slate-600">Bangalore Zone-7</div>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Performance Rating</h3>
                     <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>
                  <div className="flex items-end gap-2">
                     <span className="text-5xl font-black">4.9</span>
                     <span className="text-primary font-bold text-sm mb-1">/ 5.0</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500"><span>Response Time</span> <span className="text-white">Optimal</span></div>
                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[92%]" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Col: Stats & Current Task */}
            <div className="lg:col-span-2 flex flex-col gap-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Missions', val: workerTasks.length, icon: Briefcase, color: 'text-blue-500' },
                    { label: 'Success Rate', val: '98%', icon: TrendingUp, color: 'text-emerald-500' },
                    { label: 'Solved Node', val: solvedCount, icon: Award, color: 'text-orange-500' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col gap-4">
                       <div className={`${s.color} bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100`}>
                          <s.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <div className="text-3xl font-black text-slate-900">{s.val}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                       </div>
                    </div>
                  ))}
               </div>

               <section className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                     Strategic Timeline
                     <span className="text-xs font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{workerTasks.length} Events</span>
                  </h3>
                  
                  <div className="space-y-4">
                     {workerTasks.length === 0 ? (
                       <div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-200 text-center text-slate-400 font-bold">
                          No tactical mission data available.
                       </div>
                     ) : (
                       workerTasks.map(task => (
                         <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center justify-between group hover:border-primary transition-all">
                            <div className="flex items-center gap-5">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${task.status === 'solved' ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-primary'}`}>
                                  <AlertCircle className="w-6 h-6" />
                               </div>
                               <div>
                                  <div className="font-bold text-slate-900">{task.title}</div>
                                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Status: {task.status?.replace('_', ' ')}</div>
                               </div>
                            </div>
                            <button onClick={() => navigate(`/admin/complaint/${task.id}`)} className="text-[10px] font-black uppercase text-primary tracking-widest px-4 py-2 bg-orange-50 rounded-lg hover:bg-primary hover:text-white transition-all">View Intel</button>
                         </div>
                       ))
                     )}
                  </div>
               </section>
            </div>
         </div>
      </main>
    </div>
  );
}
