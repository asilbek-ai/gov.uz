import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz');
  
  // BARCHA MA'LUMOTLAR
  const [adminData, setAdminData] = useState({
    carousel: [],
    statistics: [],
    news: [],
    services: [],
    leadership: [],  // RAHBARIYAT SHU YERDA
    organizations: []
  });

  // LocalStorage dan yuklash
  useEffect(() => {
    // Carousel
    const savedCarousel = localStorage.getItem('jondor_carousel');
    if (savedCarousel) {
      setAdminData(prev => ({ ...prev, carousel: JSON.parse(savedCarousel) }));
    } else {
      const defaultCarousel = [
        { id: 1, image: 'https://picsum.photos/id/1015/1920/600', title: 'Jondor tumaniga xush kelibsiz', titleRu: 'Добро пожаловать в Джондорский район' },
        { id: 2, image: 'https://picsum.photos/id/104/1920/600', title: 'Taraqqiyot sari', titleRu: 'К развитию' }
      ];
      setAdminData(prev => ({ ...prev, carousel: defaultCarousel }));
      localStorage.setItem('jondor_carousel', JSON.stringify(defaultCarousel));
    }

    // LEADERSHIP - RAHBARIYAT
    const savedLeadership = localStorage.getItem('jondor_leadership');
    if (savedLeadership) {
      const parsed = JSON.parse(savedLeadership);
      setAdminData(prev => ({ ...prev, leadership: parsed }));
    } else {
      // TEST MA'LUMOTLAR (agar bo'sh bo'lsa)
      const defaultLeadership = [
        {
          id: 1,
          name: "Alijonov Alijon",
          nameRu: "Алижонов Алижон",
          position: "Tuman hokimi",
          positionRu: "Хоким района",
          phone: "+998 65 380-00-01",
          email: "hokim@jondor.uz",
          image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
          id: 2,
          name: "Karimova Dilbar",
          nameRu: "Каримова Дилбар",
          position: "Hokim o'rinbosari",
          positionRu: "Заместитель хокима",
          phone: "+998 65 380-00-02",
          email: "d.karimova@jondor.uz",
          image: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
          id: 3,
          name: "Toshmatov Baxtiyor",
          nameRu: "Тошматов Бахтияр",
          position: "Kotib",
          positionRu: "Секретарь",
          phone: "+998 65 380-00-03",
          email: "b.toshmatov@jondor.uz",
          image: "https://randomuser.me/api/portraits/men/3.jpg"
        }
      ];
      setAdminData(prev => ({ ...prev, leadership: defaultLeadership }));
      localStorage.setItem('jondor_leadership', JSON.stringify(defaultLeadership));
    }

    // Statistics
    const savedStats = localStorage.getItem('jondor_statistics');
    if (savedStats) {
      setAdminData(prev => ({ ...prev, statistics: JSON.parse(savedStats) }));
    }

    // News
    const savedNews = localStorage.getItem('jondor_news');
    if (savedNews) {
      setAdminData(prev => ({ ...prev, news: JSON.parse(savedNews) }));
    }

    // Services
    const savedServices = localStorage.getItem('jondor_services');
    if (savedServices) {
      setAdminData(prev => ({ ...prev, services: JSON.parse(savedServices) }));
    }
  }, []);

  // ============ CAROUSEL ============
  const addCarousel = (item) => {
    const updated = [...adminData.carousel, { ...item, id: Date.now() }];
    setAdminData(prev => ({ ...prev, carousel: updated }));
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };

  const deleteCarousel = (id) => {
    const updated = adminData.carousel.filter(item => item.id !== id);
    setAdminData(prev => ({ ...prev, carousel: updated }));
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };

  const updateCarousel = (updatedItem) => {
    const updated = adminData.carousel.map(item => item.id === updatedItem.id ? updatedItem : item);
    setAdminData(prev => ({ ...prev, carousel: updated }));
    localStorage.setItem('jondor_carousel', JSON.stringify(updated));
  };

  // ============ LEADERSHIP (RAHBARIYAT) ============
  const addLeader = (leader) => {
    const updated = [...adminData.leadership, { ...leader, id: Date.now() }];
    setAdminData(prev => ({ ...prev, leadership: updated }));
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
    console.log('Rahbar qo\'shildi:', updated); // DEBUG
  };

  const deleteLeader = (id) => {
    const updated = adminData.leadership.filter(leader => leader.id !== id);
    setAdminData(prev => ({ ...prev, leadership: updated }));
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
  };

  const updateLeader = (updatedLeader) => {
    const updated = adminData.leadership.map(leader => leader.id === updatedLeader.id ? updatedLeader : leader);
    setAdminData(prev => ({ ...prev, leadership: updated }));
    localStorage.setItem('jondor_leadership', JSON.stringify(updated));
  };

  // ============ STATISTICS ============
  const addStatistic = (stat) => {
    const updated = [...adminData.statistics, { ...stat, id: Date.now() }];
    setAdminData(prev => ({ ...prev, statistics: updated }));
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };

  const deleteStatistic = (id) => {
    const updated = adminData.statistics.filter(stat => stat.id !== id);
    setAdminData(prev => ({ ...prev, statistics: updated }));
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };

  const updateStatistic = (updatedStat) => {
    const updated = adminData.statistics.map(stat => stat.id === updatedStat.id ? updatedStat : stat);
    setAdminData(prev => ({ ...prev, statistics: updated }));
    localStorage.setItem('jondor_statistics', JSON.stringify(updated));
  };

  // ============ NEWS ============
  const addNews = (news) => {
    const updated = [...adminData.news, { 
      ...news, 
      id: Date.now(), 
      views: 0, 
      date: new Date().toLocaleDateString() 
    }];
    setAdminData(prev => ({ ...prev, news: updated }));
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };

  const deleteNews = (id) => {
    const updated = adminData.news.filter(item => item.id !== id);
    setAdminData(prev => ({ ...prev, news: updated }));
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };

  const updateNews = (updatedNews) => {
    const updated = adminData.news.map(item => item.id === updatedNews.id ? updatedNews : item);
    setAdminData(prev => ({ ...prev, news: updated }));
    localStorage.setItem('jondor_news', JSON.stringify(updated));
  };

  // ============ SERVICES ============
  const addService = (service) => {
    const updated = [...adminData.services, { ...service, id: Date.now() }];
    setAdminData(prev => ({ ...prev, services: updated }));
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };

  const deleteService = (id) => {
    const updated = adminData.services.filter(service => service.id !== id);
    setAdminData(prev => ({ ...prev, services: updated }));
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };

  const updateService = (updatedService) => {
    const updated = adminData.services.map(service => service.id === updatedService.id ? updatedService : service);
    setAdminData(prev => ({ ...prev, services: updated }));
    localStorage.setItem('jondor_services', JSON.stringify(updated));
  };

  // ============ OTHER ============
  const subscribe = async (email) => {
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      return true;
    }
    return false;
  };

  const t = (uzText, ruText) => language === 'uz' ? uzText : ruText;

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      adminData,
      // Carousel
      addCarousel,
      deleteCarousel,
      updateCarousel,
      // Leadership
      addLeader,
      deleteLeader,
      updateLeader,
      // Statistics
      addStatistic,
      deleteStatistic,
      updateStatistic,
      // News
      addNews,
      deleteNews,
      updateNews,
      // Services
      addService,
      deleteService,
      updateService,
      // Other
      subscribe,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};