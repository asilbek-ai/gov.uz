import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState([]);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await api.get('/statistics');
        setStatistics(res.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStatistics();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!countersStarted) return;
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration, countersStarted]);
    return <span>{count.toLocaleString('uz-UZ')}</span>;
  };

  const getColorClass = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-red-500 to-red-600',
      'from-orange-500 to-orange-600',
      'from-teal-500 to-teal-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[index % colors.length];
  };

  const totalValue = statistics.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Statistika</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp delay-100">
            Tuman rivojlanishining asosiy ko'rsatkichlari
          </p>
        </div>
      </section>

      {/* Statistics Grid */}
      <section ref={statsRef} className="py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <div key={stat.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClass(index)} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <i className={`fas fa-${stat.icon} text-white text-2xl`}></i>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {stat.prefix}<AnimatedCounter end={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Umumiy hissa</span>
                    <span className="font-semibold">{((stat.value / totalValue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`bg-gradient-to-r ${getColorClass(index)} rounded-full h-2 transition-all duration-1000`}
                      style={{ width: `${(stat.value / totalValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-chart-pie text-primary"></i> Ko'rsatkichlar taqsimoti
              </h3>
              <div className="space-y-4">
                {statistics.map((stat, index) => (
                  <div key={stat.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{stat.label}</span>
                      <span className="font-semibold">{((stat.value / totalValue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${getColorClass(index)} rounded-full h-4 transition-all duration-1000`}
                        style={{ width: `${(stat.value / totalValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-chart-line text-primary"></i> Yillik o'zgarishlar
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>O'rtacha yillik o'sish</span>
                    <span className="text-green-600 font-semibold">+8.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Investitsiyalar o'sishi</span>
                    <span className="text-green-600 font-semibold">+12.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ish o'rinlari o'sishi</span>
                    <span className="text-green-600 font-semibold">+5.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}