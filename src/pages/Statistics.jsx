import { useContext, useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { AppContext } from '../App';

export default function Statistics() {
  const { t, statistics } = useContext(AppContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
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
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Statistik ma\'lumotlar', 'Статистические данные')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Tuman rivojlanish ko\'rsatkichlari', 'Показатели развития района')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map(stat => (
            <div key={stat.id} className="p-6 text-center transition bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${getColorClass(stat.color)} rounded-full flex items-center justify-center shadow-md`}>
                <i className={`fas fa-${stat.icon} text-3xl text-white`}></i>
              </div>
              <div className="mb-2 text-4xl font-bold text-primary">
                {isInView && <CountUp end={stat.value} duration={2.5} />}
              </div>
              <div className="text-gray-600">{t(stat.label, stat.labelRu)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}