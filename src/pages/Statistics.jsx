import { useContext, useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { AppContext } from '../App';

export default function Statistics() {
  const { t, adminData } = useContext(AppContext);
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
    <div className="min-h-screen pb-16 pt-28">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">{t('Statistik ma\'lumotlar', 'Статистические данные')}</h1>
          <p className="text-gray-500">{t('Tuman rivojlanish ko\'rsatkichlari', 'Показатели развития района')}</p>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminData.statistics.map((stat, idx) => (
            <div key={stat.id} className="p-6 text-center transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
              <div className={`w-20 h-20 bg-gradient-to-br ${getColorClass(stat.color)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                <i className={`fas fa-${stat.icon} text-3xl text-white`}></i>
              </div>
              <div className="mb-2 text-4xl font-bold text-primary">
                {stat.prefix}{isInView && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
              </div>
              <div className="text-gray-600">{t(stat.label, stat.labelRu)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}