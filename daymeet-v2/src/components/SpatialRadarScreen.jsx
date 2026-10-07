import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useInteraction } from '../hooks/useInteraction';

export default function SpatialRadarScreen() {
  const { interact } = useInteraction();
  const { setIsland, tasks } = useAppStore();
  
  const [activeTask, setActiveTask] = useState(null);
  const [droppedNotes, setDroppedNotes] = useState([]);
  
  const pendingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 3);
  
  const locations = [
    { id: 'Grocery Store', x: 20, y: 30, color: 'bg-green-500' },
    { id: 'Office HQ', x: 70, y: 40, color: 'bg-blue-500' },
    { id: 'Home Base', x: 50, y: 70, color: 'bg-purple-500' }
  ];

  const handleDrop = (task, location) => {
    setDroppedNotes(prev => [...prev, { ...task, locationId: location.id }]);
    setActiveTask(null);
    interact(`Dropped task at ${location.id}`);
    
    // Trigger Dynamic Island simulation
    setIsland({
      active: true,
      type: 'success',
      message: `Spatial Note assigned to ${location.id}`
    });
    
    setTimeout(() => {
      setIsland({ active: false, type: 'sync', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl font-black text-[#181B25] flex items-center gap-2">
            <span className="material-symbols-rounded text-[#3525CD]">radar</span>
            Spatial Radar
          </h2>
          <p className="text-xs text-[#464555]">Drop context-aware notes in physical space</p>
        </div>
      </div>

      {/* Radar Map */}
      <div className="relative w-full aspect-square bg-[#0F172A] rounded-3xl overflow-hidden shadow-inner border-4 border-[#1E293B]">
        {/* Radar Sweep */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 origin-center"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-tr from-[#34D399]/0 to-[#34D399]/40 origin-bottom-right" />
        </motion.div>
        
        {/* Concentric Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[30%] h-[30%] rounded-full border border-[#34D399]/20" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#34D399]/20" />
          <div className="absolute w-[90%] h-[90%] rounded-full border border-[#34D399]/20" />
        </div>

        {/* Center Point (You) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#34D399] rounded-full shadow-[0_0_15px_#34D399] z-10" />

        {/* Locations */}
        {locations.map((loc) => {
          const droppedHere = droppedNotes.filter(n => n.locationId === loc.id);
          
          return (
            <div 
              key={loc.id}
              className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const taskData = JSON.parse(e.dataTransfer.getData('application/json'));
                handleDrop(taskData, loc);
              }}
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-6 h-6 rounded-full ${loc.color} shadow-lg border-2 border-white flex items-center justify-center z-20`}
              >
                {droppedHere.length > 0 && (
                  <span className="text-[10px] font-bold text-white">{droppedHere.length}</span>
                )}
              </motion.div>
              <span className="text-[10px] font-bold text-white mt-1 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {loc.id}
              </span>
            </div>
          );
        })}
      </div>

      {/* Task Tray */}
      <div>
        <h3 className="text-sm font-bold text-[#181B25] mb-3">Drag Tasks to Locations</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {pendingTasks.map((task) => (
            <motion.div
              key={task.title}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(task));
                setActiveTask(task);
              }}
              onDragEnd={() => setActiveTask(null)}
              whileDrag={{ scale: 1.05, opacity: 0.8 }}
              className="min-w-[140px] bg-white border border-[#E5E8F5] rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing flex-shrink-0"
            >
              <p className="text-xs font-bold text-[#181B25] line-clamp-2">{task.title}</p>
              <p className="text-[10px] text-[#464555] mt-1">{task.tag}</p>
            </motion.div>
          ))}
          {pendingTasks.length === 0 && (
            <p className="text-xs text-[#464555] italic">No pending tasks to drop.</p>
          )}
        </div>
      </div>
    </div>
  );
}
