import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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

// Initial Data
const defaultData = {
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
    { id: 1, image: "https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600", title: "Jondor tumaniga xush kelibsiz", titleRu: "Добро пожаловать в Джондорский район" },
    { id: 2, image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=1600", title: "Yangi investitsiyalar", titleRu: "Новые инвестиции" },
    { id: 3, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=1600", title: "Yangi maktab", titleRu: "Новая школа" }
  ],
  leadership: [],
  documents: [],
  faqs: [],
  contacts: [],
  subscribers: [],
  receptionHours: {
    governor: { days: "Dushanba - Juma", daysRu: "Понедельник - Пятница", time: "15:00 - 17:00", location: "Hokimiyat binosi, 2-qavat", locationRu: "Здание хокимията, 2-этаж" },
    citizens: { days: "Har payshanba", daysRu: "Каждый четверг", time: "10:00 - 13:00", phone: "+998 65 380-00-00", phoneRu: "+998 65 380-00-00" }
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('uz');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('jondor_data');
    if (savedData) {
      setAdminData(JSON.parse(savedData));
    } else {
      localStorage.setItem('jondor_data', JSON.stringify(defaultData));
    }
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const updateData = (newData) => {
    setAdminData(newData);
    localStorage.setItem('jondor_data', JSON.stringify(newData));
  };

  // Admin functions
  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const addNews = (item) => {
    const newNews = { ...item, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    updateData({ ...adminData, news: [newNews, ...adminData.news] });
  };

  const deleteNews = (id) => {
    updateData({ ...adminData, news: adminData.news.filter(n => n.id !== id) });
  };

  const addService = (item) => {
    const newService = { ...item, id: Date.now() };
    updateData({ ...adminData, services: [...adminData.services, newService] });
  };

  const deleteService = (id) => {
    updateData({ ...adminData, services: adminData.services.filter(s => s.id !== id) });
  };

  const addStatistic = (item) => {
    const newStat = { ...item, id: Date.now() };
    updateData({ ...adminData, statistics: [...adminData.statistics, newStat] });
  };

  const deleteStatistic = (id) => {
    updateData({ ...adminData, statistics: adminData.statistics.filter(s => s.id !== id) });
  };

  const addOrganization = (item) => {
    const newOrg = { ...item, id: Date.now() };
    updateData({ ...adminData, organizations: [...adminData.organizations, newOrg] });
  };

  const deleteOrganization = (id) => {
    updateData({ ...adminData, organizations: adminData.organizations.filter(o => o.id !== id) });
  };

  const addGallery = (item) => {
    const newItem = { ...item, id: Date.now() };
    updateData({ ...adminData, gallery: [...adminData.gallery, newItem] });
  };

  const deleteGallery = (id) => {
    updateData({ ...adminData, gallery: adminData.gallery.filter(g => g.id !== id) });
  };

  const addCarousel = (item) => {
    const newItem = { ...item, id: Date.now() };
    updateData({ ...adminData, carousel: [...adminData.carousel, newItem] });
  };

  const deleteCarousel = (id) => {
    updateData({ ...adminData, carousel: adminData.carousel.filter(c => c.id !== id) });
  };

  const addLeadership = (item) => {
    const newItem = { ...item, id: Date.now() };
    updateData({ ...adminData, leadership: [...adminData.leadership, newItem] });
  };

  const deleteLeadership = (id) => {
    updateData({ ...adminData, leadership: adminData.leadership.filter(l => l.id !== id) });
  };

  const addDocument = (item) => {
    const newItem = { ...item, id: Date.now() };
    updateData({ ...adminData, documents: [...adminData.documents, newItem] });
  };

  const deleteDocument = (id) => {
    updateData({ ...adminData, documents: adminData.documents.filter(d => d.id !== id) });
  };

  const addFaq = (item) => {
    const newItem = { ...item, id: Date.now() };
    updateData({ ...adminData, faqs: [...adminData.faqs, newItem] });
  };

  const deleteFaq = (id) => {
    updateData({ ...adminData, faqs: adminData.faqs.filter(f => f.id !== id) });
  };

  const submitContact = async (data) => {
    const newContact = { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    updateData({ ...adminData, contacts: [newContact, ...adminData.contacts] });
    return true;
  };

  const subscribe = async (email) => {
    const exists = adminData.subscribers.find(s => s.email === email);
    if (exists) return true;
    const newSub = { id: Date.now(), email, date: new Date().toISOString().split('T')[0] };
    updateData({ ...adminData, subscribers: [...adminData.subscribers, newSub] });
    return true;
  };

  const updateReceptionHours = (data) => {
    updateData({ ...adminData, receptionHours: data });
  };

  const t = (uz, ru) => lang === 'uz' ? uz : ru;

  if (loading) return <LoadingScreen />;

  return (
    <AppContext.Provider value={{
      lang, setLang, t, isAdmin, login, logout,
      adminData, updateData,
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
      receptionHours: adminData.receptionHours,
      submitContact, subscribe, updateReceptionHours
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