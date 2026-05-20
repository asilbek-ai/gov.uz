import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Documents from './pages/Documents';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Statistics from './pages/Statistics';
import Organizations from './pages/Organizations';
import Admin from './pages/Admin';

export const AppContext = React.createContext();

// Initial fallback data (if backend fails)
const fallbackData = {
  news: [
    { id: 1, title: "Jondor tumanida yangi maktab ochildi", titleRu: "Новая школа открылась", content: "600 o'rinli zamonaviy maktab foydalanishga topshirildi.", date: "2025-05-20", image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", views: 0 },
    { id: 2, title: "Investitsiya forumida shartnomalar imzolandi", titleRu: "На инвестиционном форуме подписаны контракты", content: "15 ta xorijiy kompaniya bilan hamkorlik o'rnatildi.", date: "2025-05-18", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", views: 0 }
  ],
  services: [
    { id: 1, name: "Fuqarolik holati aktlari", nameRu: "Акты гражданского состояния", icon: "id-card", description: "Tug'ilish, nikoh va vafot hujjatlarini rasmiylashtirish", department: "ZAGS" },
    { id: 2, name: "Yer uchastkasi", nameRu: "Земельный участок", icon: "map-marked-alt", description: "Yer uchastkasini ajratish va rasmiylashtirish", department: "Yer resurslari" }
  ],
  statistics: [
    { id: 1, label: "Aholi soni", labelRu: "Численность населения", value: 128500, icon: "users", color: "blue" },
    { id: 2, label: "Maktablar", labelRu: "Школы", value: 42, icon: "school", color: "green" },
    { id: 3, label: "Kasalxonalar", labelRu: "Больницы", value: 3, icon: "hospital", color: "red" },
    { id: 4, label: "Tadbirkorlar", labelRu: "Предприниматели", value: 1250, icon: "briefcase", color: "purple" }
  ],
  organizations: [
    { id: 1, name: "Jondor tuman hokimligi", nameRu: "Хокимият Джондорского района", phone: "+998 65 380-00-00", email: "info@jondor.uz", address: "Jondor shahri" }
  ],
  gallery: [
    { id: 1, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", title: "Yangi maktab", titleRu: "Новая школа" },
    { id: 2, image: "https://images.pexels.com/photos/162240/field-wheat-grain-crops-162240.jpeg?w=800", title: "Paxta terimi", titleRu: "Сбор хлопка" }
  ],
  carousel: [
    { id: 1, image: "https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600", title: "Jondor tumaniga xush kelibsiz", titleRu: "Добро пожаловать в Джондорский район" }
  ],
  leadership: [
    { id: 1, name: "Karimov Alisher Baxtiyorovich", position: "Tuman hokimi", positionRu: "Хоким района", image: "https://randomuser.me/api/portraits/men/1.jpg", phone: "+998 65 380-00-00", email: "hokim@jondor.uz" }
  ],
  documents: [],
  faqs: [],
  contacts: [],
  subscribers: []
};

function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('uz');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Data states with fallback
  const [news, setNews] = useState(fallbackData.news);
  const [services, setServices] = useState(fallbackData.services);
  const [statistics, setStatistics] = useState(fallbackData.statistics);
  const [organizations, setOrganizations] = useState(fallbackData.organizations);
  const [gallery, setGallery] = useState(fallbackData.gallery);
  const [carousel, setCarousel] = useState(fallbackData.carousel);
  const [leadership, setLeadership] = useState(fallbackData.leadership);
  const [documents, setDocuments] = useState(fallbackData.documents);
  const [faqs, setFaqs] = useState(fallbackData.faqs);
  const [contacts, setContacts] = useState(fallbackData.contacts);
  const [subscribers, setSubscribers] = useState(fallbackData.subscribers);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, servicesRes, statsRes, orgsRes, galleryRes, carouselRes, leadersRes, docsRes, faqsRes] = await Promise.all([
          api.get('/news').catch(() => ({ data: fallbackData.news })),
          api.get('/services').catch(() => ({ data: fallbackData.services })),
          api.get('/statistics').catch(() => ({ data: fallbackData.statistics })),
          api.get('/organizations').catch(() => ({ data: fallbackData.organizations })),
          api.get('/gallery').catch(() => ({ data: fallbackData.gallery })),
          api.get('/carousel').catch(() => ({ data: fallbackData.carousel })),
          api.get('/leadership').catch(() => ({ data: fallbackData.leadership })),
          api.get('/documents').catch(() => ({ data: fallbackData.documents })),
          api.get('/faqs').catch(() => ({ data: fallbackData.faqs }))
        ]);
        
        setNews(newsRes.data || fallbackData.news);
        setServices(servicesRes.data || fallbackData.services);
        setStatistics(statsRes.data || fallbackData.statistics);
        setOrganizations(orgsRes.data || fallbackData.organizations);
        setGallery(galleryRes.data || fallbackData.gallery);
        setCarousel(carouselRes.data || fallbackData.carousel);
        setLeadership(leadersRes.data || fallbackData.leadership);
        setDocuments(docsRes.data || fallbackData.documents);
        setFaqs(faqsRes.data || fallbackData.faqs);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Backendga ulanishda xatolik, lokal ma\'lumotlar ishlatilmoqda');
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchData();
  }, []);

  // Check admin token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  // Admin functions
  const login = async (username, password) => {
    try {
      const res = await api.post('/admin/login', { username, password });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      // Demo login for testing
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'demo-token');
        setIsAdmin(true);
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  // CRUD functions with local update
  const addNews = (item) => {
    const newNews = { ...item, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setNews([newNews, ...news]);
    return true;
  };

  const deleteNews = (id) => {
    setNews(news.filter(n => n.id !== id));
    return true;
  };

  const addService = (item) => {
    const newService = { ...item, id: Date.now() };
    setServices([...services, newService]);
    return true;
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
    return true;
  };

  const addStatistic = (item) => {
    const newStat = { ...item, id: Date.now() };
    setStatistics([...statistics, newStat]);
    return true;
  };

  const deleteStatistic = (id) => {
    setStatistics(statistics.filter(s => s.id !== id));
    return true;
  };

  const addOrganization = (item) => {
    const newOrg = { ...item, id: Date.now() };
    setOrganizations([...organizations, newOrg]);
    return true;
  };

  const deleteOrganization = (id) => {
    setOrganizations(organizations.filter(o => o.id !== id));
    return true;
  };

  const addGallery = (item) => {
    const newItem = { ...item, id: Date.now() };
    setGallery([...gallery, newItem]);
    return true;
  };

  const deleteGallery = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
    return true;
  };

  const addCarousel = (item) => {
    const newItem = { ...item, id: Date.now() };
    setCarousel([...carousel, newItem]);
    return true;
  };

  const deleteCarousel = (id) => {
    setCarousel(carousel.filter(c => c.id !== id));
    return true;
  };

  const addLeadership = (item) => {
    const newItem = { ...item, id: Date.now() };
    setLeadership([...leadership, newItem]);
    return true;
  };

  const deleteLeadership = (id) => {
    setLeadership(leadership.filter(l => l.id !== id));
    return true;
  };

  const addDocument = (item) => {
    const newItem = { ...item, id: Date.now() };
    setDocuments([...documents, newItem]);
    return true;
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
    return true;
  };

  const addFaq = (item) => {
    const newItem = { ...item, id: Date.now() };
    setFaqs([...faqs, newItem]);
    return true;
  };

  const deleteFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
    return true;
  };

  const submitContact = async (data) => {
    const newContact = { ...data, id: Date.now(), date: new Date().toISOString() };
    setContacts([newContact, ...contacts]);
    return true;
  };

  const subscribe = async (email) => {
    const exists = subscribers.find(s => s.email === email);
    if (exists) return true;
    const newSub = { id: Date.now(), email, date: new Date().toISOString() };
    setSubscribers([...subscribers, newSub]);
    return true;
  };

  const t = (uz, ru) => lang === 'uz' ? uz : ru;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider value={{
      lang, setLang, t, isAdmin, login, logout,
      news, services, statistics, organizations, gallery, carousel, leadership, documents, faqs, contacts, subscribers,
      addNews, deleteNews, addService, deleteService, addStatistic, deleteStatistic,
      addOrganization, deleteOrganization, addGallery, deleteGallery, addCarousel, deleteCarousel,
      addLeadership, deleteLeadership, addDocument, deleteDocument, addFaq, deleteFaq,
      submitContact, subscribe, error
    }}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {!window.location.pathname.includes('/admin') && <Navbar />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </main>
          {!window.location.pathname.includes('/admin') && <Footer />}
          <ScrollToTop />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;