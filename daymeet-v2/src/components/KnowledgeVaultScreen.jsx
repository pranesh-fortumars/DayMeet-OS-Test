import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';

export default function KnowledgeVaultScreen() {
  const navigate = useNavigate();
  const { interact } = useInteraction();
  const [activeTab, setActiveTab] = useState('library'); // 'library', 'documents', 'learning'

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

      {/* TAB 1: THE LIBRARY (Read Later) */}
      {activeTab === 'library' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#181B25]">Read Later</h2>
            <button onClick={() => interact('Link parser coming soon')} className="text-xs font-bold text-[#3525CD] flex items-center gap-1">
              <span className="material-symbols-rounded text-[14px]">add_link</span> Save Link
            </button>
          </div>

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
