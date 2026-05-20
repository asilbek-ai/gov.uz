import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function About() {
  const [leadership, setLeadership] = useState([]);
  const [projects, setProjects] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadershipRes, projectsRes, statsRes] = await Promise.all([
          api.get('/leadership'),
          api.get('/projects'),
          api.get('/statistics')
        ]);
        setLeadership(leadershipRes.data);
        setProjects(projectsRes.data);
        setStatistics(statsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Tuman haqida</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp delay-100">
            Jondor tumani — Buxoro viloyatining markaziy hududlaridan biri
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-white border-b sticky top-20 z-30">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'history', label: 'Tarix', icon: 'history' },
              { id: 'leadership', label: 'Rahbariyat', icon: 'users' },
              { id: 'economy', label: 'Iqtisodiyot', icon: 'chart-line' },
              { id: 'projects', label: 'Loyihalar', icon: 'building' },
              { id: 'statistics', label: 'Statistika', icon: 'chart-bar' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`fas fa-${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* History Tab */}
      {activeTab === 'history' && (
        <section id="history" className="py-16">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slideInLeft">
                <h2 className="text-3xl font-bold gradient-text mb-4">Tarix</h2>
                <div className="w-20 h-1 bg-primary mb-6 rounded-full"></div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>Jondor tumani — Buxoro viloyatining markaziy hududlaridan biri bo'lib, qadimiy tarixga ega. Tuman hududida ko'plab tarixiy obidalar va madaniy meros obyektlari saqlanib qolgan.</p>
                  <p>Tuman 1926-yilda tashkil etilgan. Jondor nomi "jon" va "dor" so'zlaridan kelib chiqqan bo'lib, "jon saqlovchi" degan ma'noni anglatadi.</p>
                  <p>Tuman tarixi davomida ko'plab o'zgarishlarni boshdan kechirgan. Bugungi kunda Jondor tumani Buxoro viloyatining iqtisodiy va madaniy jihatdan rivojlangan hududlaridan biridir.</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-primary">1926</div>
                      <div className="text-sm text-gray-500">Tashkil etilgan yil</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-primary">98+</div>
                      <div className="text-sm text-gray-500">Yillik tarix</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-slideInRight">
                <img 
                  src="https://images.unsplash.com/photo-1541844053589-346841d0a17f?w=800" 
                  alt="Jondor tarixi" 
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                  <i className="fas fa-landmark text-primary text-3xl"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leadership Tab */}
      {activeTab === 'leadership' && (
        <section id="leadership" className="py-16">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">Tuman rahbariyati</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Xalq uchun xizmat qilayotgan yetakchilar</p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader) => (
                <div key={leader.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                      <div className="flex gap-3">
                        <a href={`tel:${leader.phone}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                          <i className="fas fa-phone"></i>
                        </a>
                        <a href={`mailto:${leader.email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-lg">{leader.name}</h3>
                    <p className="text-primary text-sm mb-2">{leader.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Economy Tab */}
      {activeTab === 'economy' && (
        <section id="economy" className="py-16">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold gradient-text mb-4">Iqtisodiyot</h2>
                <div className="w-20 h-1 bg-primary mb-6 rounded-full"></div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>Tuman iqtisodiyoti qishloq xo'jaligi, sanoat va xizmat ko'rsatish sohalariga asoslangan. Paxtachilik, g'allachilik, bog'dorchilik va sabzavotchilik rivojlangan.</p>
                  <p>Jondor tumanida 156 dan ortiq korxona va 320 fermer xo'jaligi faoliyat yuritadi. 2024-yilda tuman yalpi mahsuloti 1.2 trillion so'mni tashkil etdi.</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <i className="fas fa-tractor text-green-600 text-2xl mb-2"></i>
                      <div className="text-xl font-bold text-green-600">320+</div>
                      <div className="text-sm">Fermer xo'jaliklari</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <i className="fas fa-factory text-blue-600 text-2xl mb-2"></i>
                      <div className="text-xl font-bold text-blue-600">156+</div>
                      <div className="text-sm">Korxonalar</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5c9a8?w=800" 
                  alt="Iqtisodiyot" 
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <section id="projects" className="py-16">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">Amalga oshirilayotgan loyihalar</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Taraqqiyot sari</p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-500">Byudjet: {project.budget}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {project.status === 'active' ? 'Amalda' : 'Tugallangan'}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bajarilish</span>
                      <span className="font-semibold text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary to-primaryDark rounded-full h-3 transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{project.description}</p>
                  <div className="text-xs text-gray-400 mt-3">
                    <i className="fas fa-calendar-alt mr-1"></i> Muddat: {new Date(project.deadline).toLocaleDateString('uz-UZ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <section id="statistics" className="py-16">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">Statistik ma'lumotlar</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Tuman rivojlanish ko'rsatkichlari</p>
              <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {statistics.map((stat) => (
                <div key={stat.id} className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <i className={`fas fa-${stat.icon} text-2xl text-primary group-hover:text-white transition-all duration-300`}></i>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{stat.value.toLocaleString()}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/statistics" className="btn inline-flex">
                <i className="fas fa-chart-line mr-2"></i> Batafsil statistika
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}