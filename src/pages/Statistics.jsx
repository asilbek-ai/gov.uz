import React, { useContext, useRef, useState, useEffect } from 'react';
import AnimatedStatistics from '../components/AnimatedStatistics';
import { AppContext } from '../App';
import CountUp from 'react-countup';

export default function Statistics() {
  const { t, statistics } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCountersStarted(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
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
    return colors[color] || 'from-primary to-primaryDark';
  };
  
  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('Statistik ma\'lumotlar', 'Статистические данные')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Tuman rivojlanish ko\'rsatkichlari', 'Показатели развития района')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map(stat => (
            <div key={stat.id} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className={`w-24 h-24 mx-auto mb-5 bg-gradient-to-br ${getColorClass(stat.color)} rounded-full flex items-center justify-center shadow-lg`}>
                <i className={`fas fa-${stat.icon} text-4xl text-white`}></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                {stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
              </div>
              <div className="text-gray-600 text-lg font-medium">{t(stat.label, stat.labelRu)}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <i className="fas fa-chart-line text-4xl text-primary mb-3"></i>
              <div className="text-2xl font-bold text-primary">98.5%</div>
              <div className="text-gray-600">{t('Byudjet ijrosi', 'Исполнение бюджета')}</div>
            </div>
            <div>
              <i className="fas fa-home text-4xl text-primary mb-3"></i>
              <div className="text-2xl font-bold text-primary">2,500+</div>
              <div className="text-gray-600">{t('Yangi uy-joylar', 'Новое жилье')}</div>
            </div>
            <div>
              <i className="fas fa-briefcase text-4xl text-primary mb-3"></i>
              <div className="text-2xl font-bold text-primary">1,850+</div>
              <div className="text-gray-600">{t('Yangi ish o\'rinlari', 'Новые рабочие места')}</div>
            </div>
          </div>
        </div>
      </div>

        <div>
      <AnimatedStatistics />
    </div>
    </div>
  );
}