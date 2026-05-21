import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('language') || 'uz';
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    news: [],
    services: [],
    statistics: [],
    organizations: [],
    gallery: [],
    carousel: [],
    leadership: [],
    documents: [],
    faqs: [],
    audios: [],
    receptionHours: {
      governor: {
        days: 'Dushanba - Juma',
        daysRu: 'Понедельник - Пятница',
        time: '15:00 - 17:00',
        location: 'Hokimiyat binosi, 2-qavat',
        locationRu: 'Здание хокимията, 2-этаж'
      },
      citizens: {
        days: 'Har payshanba',
        daysRu: 'Каждый четверг',
        time: '10:00 - 13:00',
        phone: '+998 65 380-00-00',
        phoneRu: '+998 65 380-00-00'
      }
    }
  });

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        newsRes, servicesRes, statsRes, orgsRes, galleryRes,
        carouselRes, leadersRes, docsRes, faqsRes, audiosRes, receptionRes
      ] = await Promise.all([
        api.get('/news').catch(() => ({ data: [] })),
        api.get('/services').catch(() => ({ data: [] })),
        api.get('/statistics').catch(() => ({ data: [] })),
        api.get('/organizations').catch(() => ({ data: [] })),
        api.get('/media/gallery').catch(() => ({ data: [] })),
        api.get('/carousel').catch(() => ({ data: [] })),
        api.get('/leadership').catch(() => ({ data: [] })),
        api.get('/documents').catch(() => ({ data: [] })),
        api.get('/faqs').catch(() => ({ data: [] })),
        api.get('/media/audio').catch(() => ({ data: [] })),
        api.get('/reception').catch(() => ({ data: data.receptionHours }))
      ]);

      setData({
        news: newsRes.data,
        services: servicesRes.data,
        statistics: statsRes.data,
        organizations: orgsRes.data,
        gallery: galleryRes.data,
        carousel: carouselRes.data,
        leadership: leadersRes.data,
        documents: docsRes.data,
        faqs: faqsRes.data,
        audios: audiosRes.data,
        receptionHours: receptionRes.data || data.receptionHours
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchAllData();
  };

  const t = (uz, ru) => {
    return lang === 'uz' ? uz : ru;
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      t,
      loading,
      data,
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
}