import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';
import { motion } from 'framer-motion';

export default function KnowledgeVaultScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  const [activeTab, setActiveTab] = useState('library'); // 'library', 'documents', 'learning'
  const [libView, setLibView] = useState('list'); // 'list' | 'graph'

  const mockArticles = [
    {
      id: 'a1',
      title: 'The Future of AI Agents in Consumer Apps',
      source: 'Substack',
      readTime: '8 min read',
      progress: 0,
      tags: ['Tech', 'Design']
    },
    {
      id: 'a2',
      title: 'How to build a Life OS that actually works',
      source: 'Medium',
      readTime: '12 min read',
      progress: 60,
      tags: ['Productivity']
    }
  ];

  const mockDocuments = [
    {
      id: 'd1',
      title: 'US Passport',
      expires: 'Exp: Aug 2029',
      icon: 'flight_takeoff',
      color: 'bg-[#E0F2FE] text-[#0288D1]'
    },
    {
      id: 'd2',
      title: 'Health Insurance Card',
      expires: 'Active',
      icon: 'health_and_safety',
      color: 'bg-[#E8F5E9] text-[#2E7D32]'
    },
    {
      id: 'd3',
      title: 'MacBook Pro Warranty',
      expires: 'Exp: Dec 2026',
      icon: 'laptop_mac',
      color: 'bg-[#FFF3E0] text-[#F57C00]'
    }
  ];

  const mockCourses = [
    {
      id: 'c1',
      title: 'Advanced React Patterns',
      platform: 'Frontend Masters',
      progress: 45,
      lastAccessed: '2 days ago'
    },
    {
      id: 'c2',
      title: 'UI/UX Micro-Interactions',
      platform: 'Self-Taught',
      progress: 10,
      lastAccessed: '1 week ago'
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white border border-[#E5E8F5] flex items-center justify-center text-[#464555] hover:bg-gray-50 transition">
          <span className="material-symbols-rounded text-[18px]">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-black text-[#181B25]">Knowledge Vault</h1>
          <p className="text-xs text-[#464555]">Your personal second brain</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E5E8F5] p-1 rounded-xl">
        <button 
          onClick={() => { setActiveTab('library'); interact('Tab: Library'); }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'library' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">auto_stories</span>
          Library
        </button>
        <button 
          onClick={() => { setActiveTab('documents'); interact('Tab: Documents'); }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'documents' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">lock</span>
          Documents
        </button>
        <button 
          onClick={() => { setActiveTab('learning'); interact('Tab: Learning'); }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'learning' ? 'bg-white text-[#181B25] shadow-sm' : 'text-[#464555] hover:text-[#181B25]'}`}
        >
          <span className="material-symbols-rounded text-[14px]">school</span>
          Learning
        </button>
      </div>

      {/* TAB 1: THE LIBRARY (Read Later / Second Brain) */}
      {activeTab === 'library' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Neural Library</h2>
            <div className="flex items-center gap-2 bg-[#F1F3FF] p-1 rounded-xl">
              <button 
                onClick={() => { setLibView('list'); interact('Library List View'); }}
                className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${libView === 'list' ? 'bg-white text-[#3525CD] shadow-sm' : 'text-[#8B899C] hover:text-[#181B25]'}`}
              >
                <span className="material-symbols-rounded text-[16px]">view_list</span>
              </button>
              <button 
                onClick={() => { setLibView('graph'); interact('Library Graph View'); }}
                className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${libView === 'graph' ? 'bg-white text-[#3525CD] shadow-sm' : 'text-[#8B899C] hover:text-[#181B25]'}`}
              >
                <span className="material-symbols-rounded text-[16px]">hub</span>
              </button>
            </div>
          </div>

          <button onClick={() => interact('Start Spaced Repetition Review')} className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-[#3525CD] to-[#6366F1] text-white rounded-2xl active:scale-95 transition shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-rounded text-[18px]">psychology</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-black">Daily Zettelkasten Review</p>
                <p className="text-[10px] text-white/80">3 flashcards due (SM-2 Algorithm)</p>
              </div>
            </div>
            <span className="material-symbols-rounded text-[20px]">play_circle</span>
          </button>

          {libView === 'list' ? (
            <div className="space-y-3">
              {mockArticles.map(article => (
                <div key={article.id} onClick={() => interact(`Article: ${article.title}`)} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm flex gap-4 cursor-pointer hover:border-[#3525CD] active:scale-[0.98] transition group">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F3FF] text-[#3525CD] flex items-center justify-center shrink-0">
                    <span className="material-symbols-rounded text-[24px]">article</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-bold text-[#181B25] text-sm leading-tight group-hover:text-[#3525CD] transition-colors">{article.title}</h3>
                      <p className="text-[10px] text-[#464555]">{article.source} • {article.readTime}</p>
                    </div>
                    
                    {article.progress > 0 ? (
                      <div className="space-y-1">
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#3525CD] rounded-full" style={{ width: `${article.progress}%` }}></div>
                        </div>
                        <p className="text-[9px] font-bold text-[#3525CD]">{article.progress}% completed</p>
                      </div>
                    ) : (
                      <div className="flex gap-1.5 pt-1">
                        {article.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] bg-[#FAF9FF] dark:bg-[#181B25] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#E5E8F5] dark:border-white/10 shadow-inner group">
              {/* Dot Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8B899C 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              {/* Infinite Draggable Canvas Container */}
              <motion.div 
                drag
                dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                dragElastic={0.1}
                whileTap={{ cursor: "grabbing" }}
                className="absolute w-[3000px] h-[3000px] flex items-center justify-center cursor-grab touch-none"
              >
                {/* Simulated Connective Strings */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-60">
                  <path d="M 1400 1400 Q 1500 1350 1550 1500" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 1550 1500 Q 1450 1600 1300 1550" fill="none" stroke="#10B981" strokeWidth="2" />
                  <path d="M 1400 1400 L 1300 1550" fill="none" stroke="#F59E0B" strokeWidth="2" />
                </svg>

                {/* Spatial Node 1 */}
                <motion.div 
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="absolute left-[1400px] top-[1400px] bg-white dark:bg-[#1E293B] p-3 rounded-2xl shadow-md border border-[#E5E8F5] dark:border-white/10 w-48 flex flex-col gap-2 cursor-pointer z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#F1F3FF] text-[#3525CD] flex items-center justify-center shrink-0">
                      <span className="material-symbols-rounded text-[14px]">psychology</span>
                    </div>
                    <p className="text-xs font-bold text-[#181B25] dark:text-white leading-tight">AI Agents Memory</p>
                  </div>
                  <p className="text-[10px] text-[#464555] dark:text-gray-400">Notes from the Substack article on context-aware agents.</p>
                </motion.div>

                {/* Spatial Node 2 */}
                <motion.div 
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="absolute left-[1550px] top-[1500px] bg-white dark:bg-[#1E293B] p-2 rounded-2xl shadow-md border border-[#E5E8F5] dark:border-white/10 w-40 flex flex-col gap-2 cursor-pointer z-10"
                >
                  <div className="w-full h-24 bg-gray-200 rounded-xl overflow-hidden relative">
                    {/* Mock Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] to-[#EC4899] opacity-80"></div>
                    <span className="absolute bottom-2 left-2 text-white font-bold text-xs shadow-sm">Moodboard</span>
                  </div>
                </motion.div>

                {/* Spatial Node 3 */}
                <motion.div 
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="absolute left-[1300px] top-[1550px] bg-[#10B981] p-3 rounded-2xl shadow-md text-white w-40 flex flex-col gap-1 cursor-pointer z-10"
                >
                  <span className="material-symbols-rounded text-[18px] opacity-80">task_alt</span>
                  <p className="text-xs font-bold">Implement Life OS</p>
                  <span className="text-[9px] bg-black/20 px-2 py-0.5 rounded-full w-max mt-1">Goal</span>
                </motion.div>
              </motion.div>
              
              {/* Controls UI overlay */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-20">
                <button onClick={() => triggerToast('Zoom functionality')} className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-[#E5E8F5] dark:border-white/10 flex items-center justify-center text-[#181B25] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <span className="material-symbols-rounded text-[16px]">add</span>
                </button>
                <button onClick={() => triggerToast('Zoom functionality')} className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-[#E5E8F5] dark:border-white/10 flex items-center justify-center text-[#181B25] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <span className="material-symbols-rounded text-[16px]">remove</span>
                </button>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold text-[#464555] dark:text-gray-400 bg-white/80 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                <span className="material-symbols-rounded text-[14px]">pinch</span>
                Pan & Drag Nodes
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DOCUMENT VAULT */}
      {activeTab === 'documents' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Secure Assets</h2>
            <button onClick={() => interact('FaceID auth to add document')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">lock_open</span> Unlock
            </button>
          </div>

          <div className="bg-[#FAF9FF] border border-[#E5E8F5] rounded-2xl p-4 text-center space-y-2">
            <span className="material-symbols-rounded text-[#3525CD] text-[24px]">encrypted</span>
            <p className="text-xs text-[#464555] px-4">These documents are AES-256 encrypted on-device. FaceID is required to view full contents.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {mockDocuments.map(doc => (
              <div key={doc.id} onClick={() => interact(`Document: ${doc.title}`)} className="bg-white p-3.5 rounded-2xl border border-[#E5E8F5] shadow-sm flex flex-col justify-between h-28 cursor-pointer hover:border-[#3525CD] active:scale-[0.95] transition">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${doc.color}`}>
                  <span className="material-symbols-rounded text-[18px]">{doc.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#181B25] text-xs leading-tight mb-0.5">{doc.title}</h3>
                  <p className="text-[10px] text-[#464555] font-medium">{doc.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LEARNING PLANNER */}
      {activeTab === 'learning' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Active Curriculum</h2>
            <button onClick={() => interact('Course tracker coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add</span> Add Course
            </button>
          </div>

          <div className="space-y-3">
            {mockCourses.map(course => (
              <div key={course.id} onClick={() => interact(`Course: ${course.title}`)} className="bg-white p-4 rounded-2xl border border-[#E5E8F5] shadow-sm space-y-3 cursor-pointer active:scale-[0.98] transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#181B25] text-sm leading-tight">{course.title}</h3>
                    <p className="text-[10px] text-[#464555]">{course.platform}</p>
                  </div>
                  <span className="material-symbols-rounded text-[#3525CD] text-[20px]">play_circle</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-[#181B25]">
                    <span>{course.progress}% Completed</span>
                    <span className="text-[#464555] font-normal">Last: {course.lastAccessed}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#10B981] rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
