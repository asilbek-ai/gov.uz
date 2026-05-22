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

// Default data with all arrays
const defaultData = {
  news: [
    { id: 1, title: "Jondor tumanida yangi maktab ochildi", titleRu: "Новая школа открылась", content: "600 o'rinli zamonaviy maktab foydalanishga topshirildi. Maktabda zamonaviy kompyuter sinflari, sport zali va kutubxona mavjud.", date: "2025-05-20", image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", views: 245 },
    { id: 2, title: "Investitsiya forumida shartnomalar imzolandi", titleRu: "На инвестиционном форуме подписаны контракты", content: "15 ta xorijiy kompaniya bilan hamkorlik o'rnatildi. Yangi ish o'rinlari yaratiladi.", date: "2025-05-18", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", views: 189 },
    { id: 3, title: "Yangi sport majmuasi qurilishi boshlandi", titleRu: "Началось строительство спорткомплекса", content: "Zamonaviy sport majmuasi 2026 yilda foydalanishga topshiriladi.", date: "2025-05-15", image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?w=800", views: 156 }
  ],
  services: [
    { id: 1, name: "Fuqarolik holati aktlari", nameRu: "Акты гражданского состояния", icon: "id-card", description: "Tug'ilish, nikoh va vafot hujjatlarini rasmiylashtirish", department: "ZAGS" },
    { id: 2, name: "Yer uchastkasi", nameRu: "Земельный участок", icon: "map-marked-alt", description: "Yer uchastkasini ajratish va rasmiylashtirish", department: "Yer resurslari" },
    { id: 3, name: "Tadbirkorlik faoliyati", nameRu: "Предпринимательство", icon: "briefcase", description: "Yakka tartibdagi tadbirkor va yuridik shaxslarni ro'yxatga olish", department: "Iqtisodiyot" }
  ],
  statistics: [
    { id: 1, label: "Aholi soni", labelRu: "Численность населения", value: 128500, icon: "users", color: "blue", prefix: "", suffix: "+" },
    { id: 2, label: "Maktablar", labelRu: "Школы", value: 42, icon: "school", color: "green", prefix: "", suffix: "" },
    { id: 3, label: "Kasalxonalar", labelRu: "Больницы", value: 3, icon: "hospital", color: "red", prefix: "", suffix: "" },
    { id: 4, label: "Tadbirkorlar", labelRu: "Предприниматели", value: 1250, icon: "briefcase", color: "purple", prefix: "", suffix: "+" }
  ],
  organizations: [
    { id: 1, name: "Jondor tuman hokimligi", nameRu: "Хокимият Джондорского района", phone: "+998 65 380-00-00", email: "info@jondor.uz", address: "Jondor shahri, Mustaqillik ko'chasi, 1" },
    { id: 2, name: "Jondor tuman IIV", nameRu: "ОВД Джондорского района", phone: "+998 65 380-01-01", email: "iiv@jondor.uz", address: "Jondor shahri, Bunyodkor ko'chasi, 5" },
    { id: 3, name: "Jondor tuman markaziy kasalxonasi", nameRu: "Центральная больница", phone: "+998 65 380-02-02", email: "hospital@jondor.uz", address: "Jondor shahri, Sog'liq ko'chasi, 10" }
  ],
  gallery: [
    { id: 1, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", title: "Yangi maktab", titleRu: "Новая школа" },
    { id: 2, image: "https://images.pexels.com/photos/162240/field-wheat-grain-crops-162240.jpeg?w=800", title: "Paxta terimi", titleRu: "Сбор хлопка" },
    { id: 3, image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", title: "Investitsiya forumi", titleRu: "Инвестиционный форум" }
  ],
  carousel: [
    { id: 1, image: "https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600", title: "Jondor tumaniga xush kelibsiz", titleRu: "Добро пожаловать в Джондорский район" },
    { id: 2, image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=1600", title: "Yangi investitsiyalar", titleRu: "Новые инвестиции" }
  ],
  leadership: [
    { id: 1, name: "Karimov Alisher Baxtiyorovich", position: "Tuman hokimi", positionRu: "Хоким района", image: "", phone: "+998 65 380-00-00", email: "hokim@jondor.uz" }
  ],
  documents: [],
  faqs: [
    { id: 1, question: "Hujjatlarni qayerda topshirish mumkin?", questionRu: "Где можно сдать документы?", answer: "Jondor tumani xalq qabulxonasida", answerRu: "В народной приемной Джондорского района" }
  ],
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

  // Load data from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('jondor_portal_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAdminData(parsed);
      } catch (e) {
        console.error('Error loading data:', e);
        localStorage.setItem('jondor_portal_data', JSON.stringify(defaultData));
      }
    } else {
      localStorage.setItem('jondor_portal_data', JSON.stringify(defaultData));
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Save to localStorage whenever data changes
  const updateData = (newData) => {
    setAdminData(newData);
    localStorage.setItem('jondor_portal_data', JSON.stringify(newData));
  };

  // Auth functions
  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  // ==================== CRUD FUNCTIONS ====================
  
  // News CRUD
  const addNews = (item) => updateData({ ...adminData, news: [item, ...adminData.news] });
  const deleteNews = (id) => updateData({ ...adminData, news: adminData.news.filter(n => n.id !== id) });
  const updateNews = (updatedItem) => {
    const updated = adminData.news.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, news: updated });
  };
  
  // Services CRUD
  const addService = (item) => updateData({ ...adminData, services: [...adminData.services, item] });
  const deleteService = (id) => updateData({ ...adminData, services: adminData.services.filter(s => s.id !== id) });
  const updateService = (updatedItem) => {
    const updated = adminData.services.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, services: updated });
  };
  
  // Statistics CRUD
  const addStatistic = (item) => updateData({ ...adminData, statistics: [...adminData.statistics, item] });
  const deleteStatistic = (id) => updateData({ ...adminData, statistics: adminData.statistics.filter(s => s.id !== id) });
  const updateStatistic = (updatedItem) => {
    const updated = adminData.statistics.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, statistics: updated });
  };
  
  // Organizations CRUD
  const addOrganization = (item) => updateData({ ...adminData, organizations: [...adminData.organizations, item] });
  const deleteOrganization = (id) => updateData({ ...adminData, organizations: adminData.organizations.filter(o => o.id !== id) });
  const updateOrganization = (updatedItem) => {
    const updated = adminData.organizations.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, organizations: updated });
  };
  
  // Gallery CRUD
  const addGallery = (item) => updateData({ ...adminData, gallery: [...adminData.gallery, item] });
  const deleteGallery = (id) => updateData({ ...adminData, gallery: adminData.gallery.filter(g => g.id !== id) });
  const updateGallery = (updatedItem) => {
    const updated = adminData.gallery.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, gallery: updated });
  };
  
  // Carousel CRUD
  const addCarousel = (item) => updateData({ ...adminData, carousel: [...adminData.carousel, item] });
  const deleteCarousel = (id) => updateData({ ...adminData, carousel: adminData.carousel.filter(c => c.id !== id) });
  const updateCarousel = (updatedItem) => {
    const updated = adminData.carousel.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, carousel: updated });
  };
  
  // Leadership CRUD
  const addLeadership = (item) => updateData({ ...adminData, leadership: [...adminData.leadership, item] });
  const deleteLeadership = (id) => updateData({ ...adminData, leadership: adminData.leadership.filter(l => l.id !== id) });
  const updateLeadership = (updatedItem) => {
    const updated = adminData.leadership.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, leadership: updated });
  };
  
  // Documents CRUD
  const addDocument = (item) => updateData({ ...adminData, documents: [...adminData.documents, item] });
  const deleteDocument = (id) => updateData({ ...adminData, documents: adminData.documents.filter(d => d.id !== id) });
  const updateDocument = (updatedItem) => {
    const updated = adminData.documents.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, documents: updated });
  };
  
  // FAQ CRUD
  const addFaq = (item) => updateData({ ...adminData, faqs: [...adminData.faqs, item] });
  const deleteFaq = (id) => updateData({ ...adminData, faqs: adminData.faqs.filter(f => f.id !== id) });
  const updateFaq = (updatedItem) => {
    const updated = adminData.faqs.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData({ ...adminData, faqs: updated });
  };
  
  // Contact
  const submitContact = (data) => {
    const newContact = { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    updateData({ ...adminData, contacts: [newContact, ...adminData.contacts] });
    return true;
  };
  
  // Subscribe
  const subscribe = (email) => {
    if (adminData.subscribers.find(s => s.email === email)) return true;
    updateData({ ...adminData, subscribers: [...adminData.subscribers, { id: Date.now(), email, date: new Date().toISOString().split('T')[0] }] });
    return true;
  };
  
  // Reception Hours
  const updateReceptionHours = (data) => updateData({ ...adminData, receptionHours: data });

  const t = (uz, ru) => lang === 'uz' ? uz : ru;

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <AppContext.Provider value={{
      lang, setLang, t, isAdmin, login, logout, adminData, updateData,
      news: adminData.news, deleteNews, addNews, updateNews,
      services: adminData.services, deleteService, addService, updateService,
      statistics: adminData.statistics, deleteStatistic, addStatistic, updateStatistic,
      organizations: adminData.organizations, deleteOrganization, addOrganization, updateOrganization,
      gallery: adminData.gallery, deleteGallery, addGallery, updateGallery,
      carousel: adminData.carousel, deleteCarousel, addCarousel, updateCarousel,
      leadership: adminData.leadership, deleteLeadership, addLeadership, updateLeadership,
      documents: adminData.documents, deleteDocument, addDocument, updateDocument,
      faqs: adminData.faqs, deleteFaq, addFaq, updateFaq,
      contacts: adminData.contacts, subscribers: adminData.subscribers,
      receptionHours: adminData.receptionHours, submitContact, subscribe, updateReceptionHours
    }}>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
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
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          } />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;