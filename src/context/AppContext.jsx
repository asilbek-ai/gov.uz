import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // ============ STATES ============
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [receptionHours, setReceptionHours] = useState({
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00', phoneRu: '+998 65 380-00-00' }
  });

  // ============ LOCALSTORAGE YUKLASH ============
  useEffect(() => {
    // Admin login status
    const savedAdmin = localStorage.getItem('adminLoggedIn');
    if (savedAdmin === 'true') setIsAdmin(true);

    // News
    const savedNews = localStorage.getItem('jondor_news');
    if (savedNews) setNews(JSON.parse(savedNews));
    else {
      const defaultNews = [
        { id: 1, title: 'Jondor tumanida yangi loyiha', titleRu: 'Новый проект в Джондорском районе', content: 'Lorem ipsum...', date: '2025-01-15', views: 120, image: 'https://picsum.photos/id/1015/800/500' },
        { id: 2, title: 'Tuman hokimi fuqarolar bilan uchrashdi', titleRu: 'Хоким района встретился с гражданами', content: 'Lorem ipsum...', date: '2025-01-20', views: 85, image: 'https://picsum.photos/id/104/800/500' }
      ];
      setNews(defaultNews);
      localStorage.setItem('jondor_news', JSON.stringify(defaultNews));
    }

    // Services
    const savedServices = localStorage.getItem('jondor_services');
    if (savedServices) setServices(JSON.parse(savedServices));
    else {
      const defaultServices = [
        { id: 1, name: 'Hujjat rasmiylashtirish', nameRu: 'Оформление документов', description: 'Passport, ID card va boshqa hujjatlar', department: 'Markaziy davlat xizmatlari', icon: 'file-alt' }
      ];
      setServices(defaultServices);
      localStorage.setItem('jondor_services', JSON.stringify(defaultServices));
    }

    // Statistics
    const savedStats = localStorage.getItem('jondor_statistics');
    if (savedStats) setStatistics(JSON.parse(savedStats));
    else {
      const defaultStats = [
        { id: 1, label: 'Aholi soni', labelRu: 'Численность населения', value: 154700, prefix: '', suffix: '+', icon: 'users', color: 'blue' },
        { id: 2, label: 'Maktablar', labelRu: 'Школы', value: 45, prefix: '', suffix: '', icon: 'school', color: 'green' },
        { id: 3, label: 'Kichik korxonalar', labelRu: 'Малые предприятия', value: 2004, prefix: '', suffix: '', icon: 'building', color: 'orange' },
        { id: 4, label: 'Qishloq xo\'jaligi', labelRu: 'Сельское хозяйство', value: 2216.7, prefix: '', suffix: 'mlrd', icon: 'tractor', color: 'teal' }
      ];
      setStatistics(defaultStats);
      localStorage.setItem('jondor_statistics', JSON.stringify(defaultStats));
    }

    // Organizations
    const savedOrgs = localStorage.getItem('jondor_organizations');
    if (savedOrgs) setOrganizations(JSON.parse(savedOrgs));
    else {
      const defaultOrgs = [
        { id: 1, name: 'Jondor tuman hokimligi', nameRu: 'Хокимият Джондорского района', phone: '+998 65 380-00-00', email: 'info@jondor.uz', address: 'Jondor shahri', icon: 'building' }
      ];
      setOrganizations(defaultOrgs);
      localStorage.setItem('jondor_organizations', JSON.stringify(defaultOrgs));
    }

    // Gallery
    const savedGallery = localStorage.getItem('jondor_gallery');
    if (savedGallery) setGallery(JSON.parse(savedGallery));

    // Carousel
    const savedCarousel = localStorage.getItem('jondor_carousel');
    if (savedCarousel) setCarousel(JSON.parse(savedCarousel));
    else {
      const defaultCarousel = [
        { id: 1, image: 'https://picsum.photos/id/1015/1920/600', title: 'Jondor tumaniga xush kelibsiz', titleRu: 'Добро пожаловать в Джондорский район' },
        { id: 2, image: 'https://picsum.photos/id/104/1920/600', title: 'Taraqqiyot sari', titleRu: 'К развитию' }
      ];
      setCarousel(defaultCarousel);
      localStorage.setItem('jondor_carousel', JSON.stringify(defaultCarousel));
    }

    // Leadership
    const savedLeadership = localStorage.getItem('jondor_leadership');
    if (savedLeadership) setLeadership(JSON.parse(savedLeadership));
    else {
      const defaultLeadership = [
        { id: 1, name: 'Alijon Alijonov', nameRu: 'Алижон Алижонов', position: 'Tuman hokimi', positionRu: 'Хоким района', phone: '+998 65 380-00-01', email: 'hokim@jondor.uz', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Dilbar Karimova', nameRu: 'Дилбар Каримова', position: 'Hokim oʻrinbosari', positionRu: 'Заместитель хокима', phone: '+998 65 380-00-02', email: 'd.karimova@jondor.uz', image: 'https://randomuser.me/api/portraits/women/2.jpg' }
      ];
      setLeadership(defaultLeadership);
      localStorage.setItem('jondor_leadership', JSON.stringify(defaultLeadership));
    }

    // Documents
    const savedDocuments = localStorage.getItem('jondor_documents');
    if (savedDocuments) setDocuments(JSON.parse(savedDocuments));
    else {
      const defaultDocuments = [
        { id: 1, title: 'Tuman budjeti 2025', titleRu: 'Бюджет района 2025', category: 'budget', date: '2025-01-15', views: 45 },
        { id: 2, title: 'Rivojlanish dasturi 2025-2030', titleRu: 'Программа развития 2025-2030', category: 'programs', date: '2025-02-01', views: 32 }
      ];
      setDocuments(defaultDocuments);
      localStorage.setItem('jondor_documents', JSON.stringify(defaultDocuments));
    }

    // Faqs
    const savedFaqs = localStorage.getItem('jondor_faqs');
    if (savedFaqs) setFaqs(JSON.parse(savedFaqs));
    else {
      const defaultFaqs = [
        { id: 1, question: 'Pasport qanday olinadi?', questionRu: 'Как получить паспорт?', answer: 'Pasport olish uchun...' }
      ];
      setFaqs(defaultFaqs);
      localStorage.setItem('jondor_faqs', JSON.stringify(defaultFaqs));
    }

    // Contacts
    const savedContacts = localStorage.getItem('jondor_contacts');
    if (savedContacts) setContacts(JSON.parse(savedContacts));

    // Subscribers
    const savedSubscribers = localStorage.getItem('jondor_subscribers');
    if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));

    // Reception Hours
    const savedReception = localStorage.getItem('jondor_reception');
    if (savedReception) setReceptionHours(JSON.parse(savedReception));
  }, []);

  // ============ ADMIN LOGIN ============
  const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminLoggedIn');
  };

  // ============ NEWS FUNCTIONS ============
  const addNews = (item) => {
    const updated = [...news, { ...item, id: Date.now(), views: 0, date: new Date().toLocaleDateString() }];
    setNews(updated);
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };
  const deleteNews = (id) => {
    const updated = news.filter(item => item.id !== id);
    setNews(updated);
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };
  const updateNews = (updatedItem) => {
    const updated = news.map(item => item.id === updatedItem.id ? updatedItem : item);
    setNews(updated);
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };

  // ============ SERVICES FUNCTIONS ============
  const addService = (item) => {
    const updated = [...services, { ...item, id: Date.now() }];
    setServices(updated);
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };
  const deleteService = (id) => {
    const updated = services.filter(item => item.id !== id);
    setServices(updated);
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };
  const updateService = (updatedItem) => {
    const updated = services.map(item => item.id === updatedItem.id ? updatedItem : item);
    setServices(updated);
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };

  // ============ STATISTICS FUNCTIONS ============
  const addStatistic = (item) => {
    const updated = [...statistics, { ...item, id: Date.now() }];
    setStatistics(updated);
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };
  const deleteStatistic = (id) => {
    const updated = statistics.filter(item => item.id !== id);
    setStatistics(updated);
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };
  const updateStatistic = (updatedItem) => {
    const updated = statistics.map(item => item.id === updatedItem.id ? updatedItem : item);
    setStatistics(updated);
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };

  // ============ ORGANIZATIONS FUNCTIONS ============
  const addOrganization = (item) => {
    const updated = [...organizations, { ...item, id: Date.now() }];
    setOrganizations(updated);
    localStorage.setItem('jondor_organizations', JSON.stringify(updated));
  };
  const deleteOrganization = (id) => {
    const updated = organizations.filter(item => item.id !== id);
    setOrganizations(updated);
    localStorage.setItem('jondor_organizations', JSON.stringify(updated));
  };
  const updateOrganization = (updatedItem) => {
    const updated = organizations.map(item => item.id === updatedItem.id ? updatedItem : item);
    setOrganizations(updated);
    localStorage.setItem('jondor_organizations', JSON.stringify(updated));
  };

  // ============ GALLERY FUNCTIONS ============
  const addGallery = (item) => {
    const updated = [...gallery, { ...item, id: Date.now() }];
    setGallery(updated);
    localStorage.setItem('jondor_gallery', JSON.stringify(updated));
  };
  const deleteGallery = (id) => {
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    localStorage.setItem('jondor_gallery', JSON.stringify(updated));
  };

  // ============ CAROUSEL FUNCTIONS ============
  const addCarousel = (item) => {
    const updated = [...carousel, { ...item, id: Date.now() }];
    setCarousel(updated);
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };
  const deleteCarousel = (id) => {
    const updated = carousel.filter(item => item.id !== id);
    setCarousel(updated);
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };
  const updateCarousel = (updatedItem) => {
    const updated = carousel.map(item => item.id === updatedItem.id ? updatedItem : item);
    setCarousel(updated);
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };

  // ============ LEADERSHIP FUNCTIONS ============
  const addLeader = (item) => {
    const updated = [...leadership, { ...item, id: Date.now() }];
    setLeadership(updated);
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
  };
  const deleteLeader = (id) => {
    const updated = leadership.filter(item => item.id !== id);
    setLeadership(updated);
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
  };
  const updateLeader = (updatedItem) => {
    const updated = leadership.map(item => item.id === updatedItem.id ? updatedItem : item);
    setLeadership(updated);
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
  };

  // ============ DOCUMENTS FUNCTIONS ============
  const addDocument = (item) => {
    const updated = [...documents, { ...item, id: Date.now(), views: 0, date: new Date().toLocaleDateString() }];
    setDocuments(updated);
    localStorage.setItem('jondor_documents', JSON.stringify(updated));
  };
  const deleteDocument = (id) => {
    const updated = documents.filter(item => item.id !== id);
    setDocuments(updated);
    localStorage.setItem('jondor_documents', JSON.stringify(updated));
  };
  const updateDocument = (updatedItem) => {
    const updated = documents.map(item => item.id === updatedItem.id ? updatedItem : item);
    setDocuments(updated);
    localStorage.setItem('jondor_documents', JSON.stringify(updated));
  };

  // ============ FAQ FUNCTIONS ============
  const addFaq = (item) => {
    const updated = [...faqs, { ...item, id: Date.now() }];
    setFaqs(updated);
    localStorage.setItem('jondor_faqs', JSON.stringify(updated));
  };
  const deleteFaq = (id) => {
    const updated = faqs.filter(item => item.id !== id);
    setFaqs(updated);
    localStorage.setItem('jondor_faqs', JSON.stringify(updated));
  };
  const updateFaq = (updatedItem) => {
    const updated = faqs.map(item => item.id === updatedItem.id ? updatedItem : item);
    setFaqs(updated);
    localStorage.setItem('jondor_faqs', JSON.stringify(updated));
  };

  // ============ CONTACT FUNCTIONS ============
  const addContact = (contact) => {
    const updated = [...contacts, { ...contact, id: Date.now(), date: new Date().toLocaleDateString() }];
    setContacts(updated);
    localStorage.setItem('jondor_contacts', JSON.stringify(updated));
  };

  // ============ SUBSCRIBER FUNCTIONS ============
  const addSubscriber = (email) => {
    const subscribersList = JSON.parse(localStorage.getItem('jondor_subscribers') || '[]');
    if (!subscribersList.includes(email)) {
      subscribersList.push(email);
      localStorage.setItem('jondor_subscribers', JSON.stringify(subscribersList));
      setSubscribers(subscribersList);
      return true;
    }
    return false;
  };

  // ============ RECEPTION HOURS FUNCTIONS ============
  const updateReceptionHours = (data) => {
    setReceptionHours(data);
    localStorage.setItem('jondor_reception', JSON.stringify(data));
  };

  // ============ TRANSLATION ============
  const t = (uz, ru) => language === 'uz' ? uz : ru;

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      isAdmin,
      login,
      logout,
      t,
      // News
      news, addNews, deleteNews, updateNews,
      // Services
      services, addService, deleteService, updateService,
      // Statistics
      statistics, addStatistic, deleteStatistic, updateStatistic,
      // Organizations
      organizations, addOrganization, deleteOrganization, updateOrganization,
      // Gallery
      gallery, addGallery, deleteGallery,
      // Carousel
      carousel, addCarousel, deleteCarousel, updateCarousel,
      // Leadership
      leadership, addLeader, deleteLeader, updateLeader,
      // Documents
      documents, addDocument, deleteDocument, updateDocument,
      // Faq
      faqs, addFaq, deleteFaq, updateFaq,
      // Contacts
      contacts, addContact,
      // Subscribers
      subscribers, addSubscriber,
      // Reception Hours
      receptionHours, updateReceptionHours
    }}>
      {children}
    </AppContext.Provider>
  );
};