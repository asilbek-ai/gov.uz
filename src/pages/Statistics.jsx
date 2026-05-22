import React, { useContext, useRef, useState, useEffect } from 'react';
import { AppContext } from '../App';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function Statistics() {
  const { t, statistics } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const getColorClass = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      teal: 'from-teal-500 to-teal-600'
    };
    return colors[color] || 'from-[#003580] to-[#0066cc]';
  };

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#003580] to-[#0066cc] bg-clip-text text-transparent mb-4">
            {t('Statistik ma\'lumotlar', 'Статистические данные')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Tuman rivojlanishining asosiy ko\'rsatkichlari', 'Основные показатели развития района')}
          </p>
          <div className="w-20 h-1 bg-[#003580] mx-auto mt-6 rounded-full"></div>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, idx) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${getColorClass(stat.color)} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300`}>
                <i className={`fas fa-${stat.icon} text-3xl text-white`}></i>
              </div>
              <div className="text-4xl font-bold text-[#003580] mb-2">
                {stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
              </div>
              <div className="text-gray-600 text-sm">{t(stat.label, stat.labelRu)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}