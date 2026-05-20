// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
// import Background3D from './components/Background3D';

// Pages - TO'G'RI IMPORTLAR
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

// Context
export const AppContext = React.createContext();

// Initial Data
const defaultData = {
  news: [
    { id: 1, title: "Jondor tumanida yangi maktab ochildi", titleRu: "Новая школа открылась в Джондорском районе", content: "600 o'rinli zamonaviy maktab foydalanishga topshirildi.", date: "2025-05-20", image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", views: 245 },
    { id: 2, title: "Investitsiya forumida 50 million dollarlik shartnomalar imzolandi", titleRu: "На инвестиционном форуме подписаны контракты на 50 миллионов долларов", content: "15 ta xorijiy kompaniya bilan hamkorlik o'rnatildi.", date: "2025-05-18", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", views: 189 }
  ],
  services: [
    { id: 1, name: "Fuqarolik holati aktlari", nameRu: "Акты гражданского состояния", icon: "id-card", description: "Tug'ilish, nikoh va vafot hujjatlarini rasmiylashtirish", department: "ZAGS" },
    { id: 2, name: "Yer uchastkasi", nameRu: "Земельный участок", icon: "map-marked-alt", description: "Yer uchastkasini ajratish va rasmiylashtirish", department: "Yer resurslari" }
  ],
  statistics: [
    { id: 1, label: "Aholi soni", labelRu: "Численность населения", value: 128500, icon: "users", color: "blue" },
    { id: 2, label: "Maktablar", labelRu: "Школы", value: 42, icon: "school", color: "green" }
  ],
  organizations: [
    { id: 1, name: "Jondor tuman hokimligi", nameRu: "Хокимият Джондорского района", phone: "+998 65 380-00-00", email: "info@jondor.uz", address: "Jondor shahri" }
  ],
  gallery: [
    { id: 1, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", title: "Yangi maktab", titleRu: "Новая школа", type: "image" }
  ],
  carousel: [
    { id: 1, image: "https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600", title: "Jondor tumaniga xush kelibsiz", titleRu: "Добро пожаловать в Джондорский район" }
  ],
  leadership: [],
  partners: [],
  faqs: [],
  documents: [],
  contacts: [],
  subscribers: [],
  projects: []
};

function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('uz');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('jondor_portal_data');
    if (savedData) {
      setAdminData(JSON.parse(savedData));
    } else {
      localStorage.setItem('jondor_portal_data', JSON.stringify(defaultData));
    }

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    setTimeout(() => setLoading(false), 2000);
    return () => lenis.destroy();
  }, []);

  const updateData = (newData) => {
    setAdminData(newData);
    localStorage.setItem('jondor_portal_data', JSON.stringify(newData));
  };

  const t = (uz, ru) => lang === 'uz' ? uz : ru;

  return (
    <AppContext.Provider value={{ lang, setLang, t, isAdmin, setIsAdmin, adminData, updateData }}>
      <Router>
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>
        {!loading && (
          <>
            {/* <Background3D /> */}
            <Navbar />
            <ScrollToTop />
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
            <Footer />
          </>
        )}
      </Router>
    </AppContext.Provider>
  );
}

export default App;