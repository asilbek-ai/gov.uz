import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DashboardStatistics from './pages/DashboardStatistics';
export const AppContext = createContext();

// Default data
const defaultData = {
  news: [
    { id: 1, title: "Jondor tumanida yangi maktab ochildi", titleRu: "Новая школа открылась", content: "600 o'rinli zamonaviy maktab foydalanishga topshirildi.", date: "2025-05-20", image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", views: 245 },
    { id: 2, title: "Investitsiya forumida shartnomalar imzolandi", titleRu: "На инвестиционном форуме подписаны контракты", content: "15 ta xorijiy kompaniya bilan hamkorlik o'rnatildi.", date: "2025-05-18", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", views: 189 }
  ],
  services: [
    { id: 1, name: "Fuqarolik holati aktlari", nameRu: "Акты гражданского состояния", icon: "id-card", description: "Tug'ilish, nikoh va vafot hujjatlarini rasmiylashtirish", department: "ZAGS" },
    { id: 2, name: "Yer uchastkasi", nameRu: "Земельный участок", icon: "map-marked-alt", description: "Yer uchastkasini ajratish va rasmiylashtirish", department: "Yer resurslari" }
  ],
  statistics: [
    { id: 1, label: "Aholi soni", labelRu: "Численность населения", value: 128500, icon: "users", color: "blue", prefix: "", suffix: "+" },
    { id: 2, label: "Maktablar", labelRu: "Школы", value: 42, icon: "school", color: "green", prefix: "", suffix: "" },
    { id: 3, label: "Kasalxonalar", labelRu: "Больницы", value: 3, icon: "hospital", color: "red", prefix: "", suffix: "" },
    { id: 4, label: "Tadbirkorlar", labelRu: "Предприниматели", value: 1250, icon: "briefcase", color: "purple", prefix: "", suffix: "+" }
  ],
  organizations: [
    { id: 1, name: "Jondor tuman hokimligi", nameRu: "Хокимият Джондорского района", phone: "+998 65 380-00-00", email: "info@jondor.uz", address: "Jondor shahri" }
  ],
  gallery: [
    { id: 1, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", title: "Yangi maktab", titleRu: "Новая школа" }
  ],
  carousel: [
    { id: 1, image: "https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600", title: "Jondor tumaniga xush kelibsiz", titleRu: "Добро пожаловать в Джондорский район" }
  ],
  leadership: [],
  documents: [],
  faqs: [],
  contacts: [],
  subscribers: [],
  receptionHours: {
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00', phoneRu: '+998 65 380-00-00' }
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('uz');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem('jondor_portal_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAdminData(parsed);
      } catch (e) {
        console.error('Error loading data:', e);
      }
    } else {
      localStorage.setItem('jondor_portal_data', JSON.stringify(defaultData));
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const updateData = (newData) => {
    setAdminData(newData);
    localStorage.setItem('jondor_portal_data', JSON.stringify(newData));
  };

  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  // CRUD functions
  const addNews = (item) => updateData({ ...adminData, news: [item, ...adminData.news] });
  const deleteNews = (id) => updateData({ ...adminData, news: adminData.news.filter(n => n.id !== id) });
  
  const addService = (item) => updateData({ ...adminData, services: [...adminData.services, item] });
  const deleteService = (id) => updateData({ ...adminData, services: adminData.services.filter(s => s.id !== id) });
  
  const addStatistic = (item) => updateData({ ...adminData, statistics: [...adminData.statistics, item] });
  const deleteStatistic = (id) => updateData({ ...adminData, statistics: adminData.statistics.filter(s => s.id !== id) });
  
  const addOrganization = (item) => updateData({ ...adminData, organizations: [...adminData.organizations, item] });
  const deleteOrganization = (id) => updateData({ ...adminData, organizations: adminData.organizations.filter(o => o.id !== id) });
  
  const addGallery = (item) => updateData({ ...adminData, gallery: [...adminData.gallery, item] });
  const deleteGallery = (id) => updateData({ ...adminData, gallery: adminData.gallery.filter(g => g.id !== id) });
  
  const addCarousel = (item) => updateData({ ...adminData, carousel: [...adminData.carousel, item] });
  const deleteCarousel = (id) => updateData({ ...adminData, carousel: adminData.carousel.filter(c => c.id !== id) });
  
  const addLeadership = (item) => updateData({ ...adminData, leadership: [...adminData.leadership, item] });
  const deleteLeadership = (id) => updateData({ ...adminData, leadership: adminData.leadership.filter(l => l.id !== id) });
  
  const addDocument = (item) => updateData({ ...adminData, documents: [...adminData.documents, item] });
  const deleteDocument = (id) => updateData({ ...adminData, documents: adminData.documents.filter(d => d.id !== id) });
  
  const addFaq = (item) => updateData({ ...adminData, faqs: [...adminData.faqs, item] });
  const deleteFaq = (id) => updateData({ ...adminData, faqs: adminData.faqs.filter(f => f.id !== id) });
  
  const submitContact = (data) => {
    const newContact = { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    updateData({ ...adminData, contacts: [newContact, ...adminData.contacts] });
    return true;
  };
  
  const subscribe = (email) => {
    if (adminData.subscribers.find(s => s.email === email)) return true;
    updateData({ ...adminData, subscribers: [...adminData.subscribers, { id: Date.now(), email, date: new Date().toISOString().split('T')[0] }] });
    return true;
  };
  
  const updateReceptionHours = (data) => updateData({ ...adminData, receptionHours: data });

  const t = (uz, ru) => lang === 'uz' ? uz : ru;

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin"></div></div>;
  }

  return (
    <AppContext.Provider value={{
      lang, setLang, t, isAdmin, login, logout, adminData, updateData,
      news: adminData.news, deleteNews, addNews,
      services: adminData.services, deleteService, addService,
      statistics: adminData.statistics, deleteStatistic, addStatistic,
      organizations: adminData.organizations, deleteOrganization, addOrganization,
      gallery: adminData.gallery, deleteGallery, addGallery,
      carousel: adminData.carousel, deleteCarousel, addCarousel,
      leadership: adminData.leadership, deleteLeadership, addLeadership,
      documents: adminData.documents, deleteDocument, addDocument,
      faqs: adminData.faqs, deleteFaq, addFaq,
      contacts: adminData.contacts, subscribers: adminData.subscribers,
      receptionHours: adminData.receptionHours, submitContact, subscribe, updateReceptionHours
    }}>
      <Router>
        <Toaster position="top-right" />
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
              <Route path="/dashboard" element={<DashboardStatistics />} />
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