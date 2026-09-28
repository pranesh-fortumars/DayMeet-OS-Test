import { useState, useEffect } from 'react';

export function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      
      if (hour >= 6 && hour < 12) {
        setTimeOfDay('dawn');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('day');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTime();
    
    // Check every minute if the time of day string should change
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return timeOfDay;
}
