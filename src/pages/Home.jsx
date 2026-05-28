import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import AnimatedStatistics from '../components/AnimatedStatistics';
import { AppContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const { t, adminData, addSubscriber, lang, setLang } = useContext(AppContext);
  const [countersStarted, setCountersStarted] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const statsRef = useRef(null);
  
  // AI Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiLang, setAiLang] = useState('uz');
  const chatEndRef = useRef(null);
  const speechSynth = window.speechSynthesis;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCountersStarted(true);
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Boshlang'ich xabar
  useEffect(() => {
    if (chatMessages.length === 0) {
      const welcomeMessages = {
        uz: "Assalomu alaykum! 👋 Men Jondor tumanining aqlli sun'iy intellekt yordamchisiman. Sizga tumanimiz haqida istalgan ma'lumotni bera olaman. Qanday savolingiz bor?",
        ru: "Здравствуйте! 👋 Я умный помощник Джондорского района. Могу предоставить любую информацию о нашем районе. Какой у вас вопрос?",
        en: "Hello! 👋 I am the smart AI assistant of Jondor district. I can provide any information about our district. What is your question?"
      };
      setChatMessages([{
        id: 1,
        text: welcomeMessages[aiLang],
        isUser: false,
        time: new Date().toLocaleTimeString()
      }]);
    }
  }, [aiLang]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscriberEmail) {
      const alerts = { uz: 'Email kiritilmadi', ru: 'Email не введен', en: 'Email not entered' };
      alert(alerts[lang]);
      return;
    }
    const result = addSubscriber(subscriberEmail);
    if (result) {
      setSubscribed(true);
      setSubscriberEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } else {
      const alerts = { uz: 'Bu email allaqachon obuna bo\'lgan', ru: 'Этот email уже подписан', en: 'This email is already subscribed' };
      alert(alerts[lang]);
    }
  };

  // Ovozli javob berish
  const speakText = (text, language) => {
    if (speechSynth.speaking) {
      speechSynth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
    utterance.lang = langMap[language] || 'uz-UZ';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynth.speak(utterance);
  };

  // Aqlli AI javob berish funksiyasi (3 tilda)
  const getAIResponse = (userMessage, language) => {
    const msg = userMessage.toLowerCase().trim();
    
    const responses = {
      // ============ SALOMLASHISH ============
      salom: {
        uz: "Assalomu alaykum! 👋 Jondor tumanining AI yordamchisiga xush kelibsiz. Sizga qanday yordam bera olaman? Tumanimiz haqida istalgan savolingizga javob beraman.",
        ru: "Здравствуйте! 👋 Добро пожаловать в AI помощник Джондорского района. Чем могу помочь? Отвечу на любой вопрос о нашем районе.",
        en: "Hello! 👋 Welcome to the AI assistant of Jondor district. How can I help you? I will answer any question about our district."
      },
      
      // ============ TUMAN HAQIDA ============
      tuman: {
        uz: "📍 Jondor tumani - Buxoro viloyatidagi go'zal tuman. 1926-yilda tashkil topgan. Maydoni 1.2 ming km², aholisi 154,700 dan ortiq. Tuman hududida 45 ta maktab, 8 ta kasalxona, 2000 dan ortiq korxona faoliyat yuritadi.",
        ru: "📍 Джондорский район - красивый район Бухарской области. Основан в 1926 году. Площадь 1,2 тыс. км², население более 154 700 человек. В районе 45 школ, 8 больниц, более 2000 предприятий.",
        en: "📍 Jondor district is a beautiful district in Bukhara region. Founded in 1926. Area 1.2 thousand km², population over 154,700. There are 45 schools, 8 hospitals, over 2000 enterprises."
      },
      
      // ============ TARIX ============
      tarix: {
        uz: "📜 Jondor tumani 1926-yilda tashkil topgan. Tuman hududida 20 dan ortiq tarixiy obidalar mavjud. Eng mashhurlari: Chor Bakr majmuasi, Sitorai Mohi Xosa.",
        ru: "📜 Джондорский район основан в 1926 году. На территории района более 20 исторических памятников. Самые известные: комплекс Чор-Бакр, Ситораи Мохи Хоса.",
        en: "📜 Jondor district was founded in 1926. There are over 20 historical monuments. The most famous: Chor-Bakr complex, Sitorai Mohi Hosa."
      },
      
      // ============ GEOGRAFIYA ============
      geografiya: {
        uz: "🗺️ Jondor tumani Buxoro viloyatining shimoli-g'arbiy qismida joylashgan. Maydoni 1.2 ming km². Iqlimi kontinental - yozi issiq, qishi sovuq.",
        ru: "🗺️ Джондорский район расположен в северо-западной части Бухарской области. Площадь 1,2 тыс. км². Климат континентальный - лето жаркое, зима холодная.",
        en: "🗺️ Jondor district is located in the northwestern part of Bukhara region. Area 1.2 thousand km². The climate is continental - hot summers, cold winters."
      },
      
      // ============ AHOLI ============
      aholi: {
        uz: "👥 Jondor tumani aholisi 154,700 dan ortiq kishi. Aholi soni barqaror o'sib bormoqda. Asosan o'zbeklar, shuningdek rus, tojik va boshqa millat vakillari yashaydi.",
        ru: "👥 Население Джондорского района более 154 700 человек. Численность населения стабильно растет. Проживают в основном узбеки, а также русские, таджики и другие.",
        en: "👥 The population of Jondor district is over 154,700. The population is steadily growing. Mostly Uzbeks, as well as Russians, Tajiks and others."
      },
      
      // ============ HOKIM / RAHBARIYAT ============
      hokim: {
        uz: "🏛️ Jondor tumani hokimi: Xudoyev Jamshid Rajabovich. 📞 Telefon: +998 65 380-00-01. ✉️ Email: hokim@jondor.uz. 📅 Qabul vaqti: Dushanba - Juma, 15:00 - 17:00.",
        ru: "🏛️ Хоким Джондорского района: Худоев Джамшид Раджабович. 📞 Телефон: +998 65 380-00-01. ✉️ Email: hokim@jondor.uz. 📅 Время приема: Понедельник - Пятница, 15:00 - 17:00.",
        en: "🏛️ Khokim of Jondor district: Khudoyev Jamshid Rajabovich. 📞 Phone: +998 65 380-00-01. ✉️ Email: hokim@jondor.uz. 📅 Reception: Monday - Friday, 15:00 - 17:00."
      },
      
      // ============ STATISTIKA ============
      statistika: {
        uz: "📊 Jondor tumani statistikasi:\n\n• Aholi: 154,700+ kishi\n• Maktablar: 45 ta\n• Kasalxonalar: 8 ta\n• Bog'chalar: 24 ta\n• Korxonalar: 2,004 ta\n• Fermer xo'jaliklari: 134 ta\n• MFY: 14 ta\n• Qishloqlar: 42 ta",
        ru: "📊 Статистика Джондорского района:\n\n• Население: 154 700+ человек\n• Школы: 45\n• Больницы: 8\n• Детские сады: 24\n• Предприятия: 2 004\n• Фермерские хозяйства: 134\n• МФЙ: 14\n• Села: 42",
        en: "📊 Statistics of Jondor district:\n\n• Population: 154,700+\n• Schools: 45\n• Hospitals: 8\n• Kindergartens: 24\n• Enterprises: 2,004\n• Farms: 134\n• MFY: 14\n• Villages: 42"
      },
      
      // ============ TELEFON ============
      telefon: {
        uz: "📞 Jondor tumani hokimligi telefon raqami: +998 65 582-18-53. 📠 Faks: +998 65 582-26-53. 📱 Qabulxona: +998 65 380-00-00.",
        ru: "📞 Телефон хокимията Джондорского района: +998 65 582-18-53. 📠 Факс: +998 65 582-26-53. 📱 Приемная: +998 65 380-00-00.",
        en: "📞 Phone of Jondor district khokimiyat: +998 65 582-18-53. 📠 Fax: +998 65 582-26-53. 📱 Reception: +998 65 380-00-00."
      },
      
      // ============ EMAIL ============
      email: {
        uz: "✉️ Jondor tumani hokimligining rasmiy elektron pochta manzili: jondor.t@exat.uz. Boshqa bo'limlar uchun: info@jondor.uz.",
        ru: "✉️ Официальный email хокимията Джондорского района: jondor.t@exat.uz. Для других отделов: info@jondor.uz.",
        en: "✉️ Official email of Jondor district khokimiyat: jondor.t@exat.uz. For other departments: info@jondor.uz."
      },
      
      // ============ MANZIL ============
      manzil: {
        uz: "📍 Jondor tumani hokimligi manzili: Buxoro viloyati, Jondor tumani, M. Tarobiy ko'chasi, 26-uy.",
        ru: "📍 Адрес хокимията Джондорского района: Бухарская область, Джондорский район, ул. М. Таробий, 26.",
        en: "📍 Address of Jondor district khokimiyat: Bukhara region, Jondor district, M. Tarobiy str., 26."
      },
      
      // ============ QABUL VAQTI ============
      qabul: {
        uz: "📅 Qabul vaqtlari:\n\n🏛️ Hokim qabuli: Dushanba - Juma, 15:00 - 17:00\n👥 Fuqarolar qabuli: Har payshanba, 10:00 - 13:00\n🏢 Ish vaqti: Dushanba - Juma, 09:00 - 18:00\n🍽️ Tushlik: 13:00 - 14:00",
        ru: "📅 Время приема:\n\n🏛️ Прием хокима: Понедельник - Пятница, 15:00 - 17:00\n👥 Прием граждан: Каждый четверг, 10:00 - 13:00\n🏢 Рабочее время: Понедельник - Пятница, 09:00 - 18:00\n🍽️ Обед: 13:00 - 14:00",
        en: "📅 Reception hours:\n\n🏛️ Khokim reception: Monday - Friday, 15:00 - 17:00\n👥 Citizens reception: Every Thursday, 10:00 - 13:00\n🏢 Working hours: Monday - Friday, 09:00 - 18:00\n🍽️ Lunch: 13:00 - 14:00"
      },
      
      // ============ MAKTABLAR ============
      maktab: {
        uz: "🏫 Jondor tumanida 45 ta umumiy o'rta ta'lim maktabi, 3 ta litsey va kollej, 24 ta maktabgacha ta'lim tashkiloti faoliyat yuritadi. 28,450 dan ortiq o'quvchi tahsil oladi.",
        ru: "🏫 В Джондорском районе 45 общеобразовательных школ, 3 лицея и колледжа, 24 дошкольных образовательных учреждения. Учатся более 28 450 учеников.",
        en: "🏫 There are 45 secondary schools, 3 lyceums and colleges, 24 preschool educational institutions in Jondor district. Over 28,450 students study."
      },
      
      // ============ KASALXONALAR ============
      kasalxona: {
        uz: "🏥 Jondor tumanida 8 ta kasalxona, 12 ta poliklinika, 25 ta qishloq vrachlik punkti mavjud. 320 dan ortiq shifokor va 580 dan ortiq hamshira faoliyat yuritadi.",
        ru: "🏥 В Джондорском районе 8 больниц, 12 поликлиник, 25 сельских врачебных пунктов. Работают более 320 врачей и 580 медсестер.",
        en: "🏥 There are 8 hospitals, 12 polyclinics, 25 rural medical stations in Jondor district. More than 320 doctors and 580 nurses work."
      },
      
      // ============ XIZMATLAR ============
      xizmat: {
        uz: "✅ Jondor tumanida ko'rsatiladigan xizmatlar: Hujjat rasmiylashtirish, Passport va ID card olish, Tadbirkorlikni ro'yxatdan o'tkazish, Yer va mulk masalalari, Ijtimoiy yordam, Pensiya va nafaqalar.",
        ru: "✅ Услуги в Джондорском районе: Оформление документов, Получение паспорта и ID карты, Регистрация предпринимательства, Земельные и имущественные вопросы, Социальная помощь, Пенсии и пособия.",
        en: "✅ Services in Jondor district: Document processing, Passport and ID card issuance, Business registration, Land and property issues, Social assistance, Pensions and benefits."
      },
      
      // ============ IQTISODIYOT ============
      iqtisod: {
        uz: "💰 Jondor tumanida 2,004 dan ortiq korxona faoliyat yuritadi. Asosiy tarmoqlar: paxtachilik, chorvachilik, sabzavotchilik, bog'dorchilik.",
        ru: "💰 В Джондорском районе действуют более 2 004 предприятий. Основные отрасли: хлопководство, животноводство, овощеводство, садоводство.",
        en: "💰 More than 2,004 enterprises operate in Jondor district. Main industries: cotton growing, animal husbandry, vegetable growing, gardening."
      },
      
      // ============ FERMERLAR ============
      fermer: {
        uz: "🌾 Jondor tumanida 134 ta fermer xo'jaligi mavjud. Asosiy yo'nalishlar: paxtachilik, g'allachilik, sabzavotchilik va bog'dorchilik.",
        ru: "🌾 В Джондорском районе 134 фермерских хозяйства. Основные направления: хлопководство, зерноводство, овощеводство и садоводство.",
        en: "🌾 There are 134 farms in Jondor district. Main directions: cotton growing, grain growing, vegetable growing and gardening."
      },
      
      // ============ YORDAM ============
      yordam: {
        uz: "🤖 Men sizga quyidagilarda yordam bera olaman:\n\n✅ Tuman haqida\n✅ Rahbariyat va hokim\n✅ Statistika\n✅ Aloqa va manzil\n✅ Qabul vaqti\n✅ Maktab va kasalxonalar\n✅ Xizmatlar\n✅ Iqtisodiyot\n✅ Madaniyat va turizm\n\nSavolingizni yozing!",
        ru: "🤖 Я могу помочь вам в следующем:\n\n✅ О районе\n✅ Руководство и хоким\n✅ Статистика\n✅ Контакты и адрес\n✅ Время приема\n✅ Школы и больницы\n✅ Услуги\n✅ Экономика\n✅ Культура и туризм\n\nНапишите ваш вопрос!",
        en: "🤖 I can help you with the following:\n\n✅ About the district\n✅ Leadership and khokim\n✅ Statistics\n✅ Contacts and address\n✅ Reception hours\n✅ Schools and hospitals\n✅ Services\n✅ Economy\n✅ Culture and tourism\n\nWrite your question!"
      },
      
      // ============ RAHMAT ============
      rahmat: {
        uz: "Sizga katta rahmat! 😊 Yana qanday savolingiz bo'lsa, so'rashingiz mumkin. Xizmat qilishdan mamnunman!",
        ru: "Большое спасибо! 😊 Если у вас есть еще вопросы, спрашивайте. Рад был помочь!",
        en: "Thank you very much! 😊 If you have any more questions, feel free to ask. Glad to help!"
      },
      
      // ============ XAYR ============
      xayr: {
        uz: "Xayr! 👋 Jondor tumani AI yordamchisidan foydalanganingiz uchun rahmat. Yana ko'rishguncha! 😊",
        ru: "До свидания! 👋 Спасибо за использование AI помощника Джондорского района. До новых встреч! 😊",
        en: "Goodbye! 👋 Thank you for using the AI assistant of Jondor district. See you again! 😊"
      }
    };
    
    // Kalit so'zlar bo'yicha javob topish
    if (msg.match(/(salom|assalom|hello|hay|hi)/i)) return responses.salom[language];
    if (msg.match(/(tuman haqida|jondor haqida|qanday tuman)/i)) return responses.tuman[language];
    if (msg.match(/(tarix|tarixi|qachon tashkil topgan)/i)) return responses.tarix[language];
    if (msg.match(/(geografiya|joylashuvi|maydoni)/i)) return responses.geografiya[language];
    if (msg.match(/(aholi|odam|kishi|qancha odam)/i)) return responses.aholi[language];
    if (msg.match(/(hokim|rahbar|rahbariyat|tuman rahbari)/i)) return responses.hokim[language];
    if (msg.match(/(statistika|qancha|nechta|soni)/i)) return responses.statistika[language];
    if (msg.match(/(telefon|tel|aloqa|nomer)/i)) return responses.telefon[language];
    if (msg.match(/(email|pochta|mail)/i)) return responses.email[language];
    if (msg.match(/(manzil|qayerda|borish)/i)) return responses.manzil[language];
    if (msg.match(/(qabul|ish vaqti|kabul)/i)) return responses.qabul[language];
    if (msg.match(/(maktab|ta'lim|o'quvchi)/i)) return responses.maktab[language];
    if (msg.match(/(kasalxona|shifoxona|sog'liq)/i)) return responses.kasalxona[language];
    if (msg.match(/(xizmat|xizmatlar|yordam)/i)) return responses.xizmat[language];
    if (msg.match(/(iqtisod|iqtisodiyot|korxona)/i)) return responses.iqtisod[language];
    if (msg.match(/(fermer|xojalik|qishloq xojaligi)/i)) return responses.fermer[language];
    if (msg.match(/(yordam|help|qanday ishlatiladi)/i)) return responses.yordam[language];
    if (msg.match(/(rahmat|raxmat|tashakkur)/i)) return responses.rahmat[language];
    if (msg.match(/(xayr|hayr|bye|ko'rishguncha)/i)) return responses.xayr[language];
    
    // Default javob
    const defaults = {
      uz: "🤔 Kechirasiz, men bu savolga javob topmadim. Iltimos, boshqa savol bering yoki 'Yordam' deb yozing.",
      ru: "🤔 Извините, я не нашел ответ на этот вопрос. Пожалуйста, задайте другой вопрос или напишите 'Помощь'.",
      en: "🤔 Sorry, I couldn't find an answer to this question. Please ask another question or type 'Help'."
    };
    return defaults[language];
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: chatInput,
      isUser: true,
      time: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, userMessage]);
    const question = chatInput;
    setChatInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const answer = getAIResponse(question, aiLang);
      const aiMessage = {
        id: Date.now() + 1,
        text: answer,
        isUser: false,
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Ovozli javob berish
      speakText(answer, aiLang);
    }, 800);
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const langMap = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
    recognition.lang = langMap[aiLang];
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setChatInput(text);
      setTimeout(() => handleSendMessage(), 100);
    };
    recognition.start();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickLinks = [
    { path: '/services', icon: 'th-large', label: 'Xizmatlar', labelRu: 'Услуги', bg: 'bg-blue-50', text: 'text-blue-600' },
    { path: '/news', icon: 'newspaper', label: 'Yangiliklar', labelRu: 'Новости', bg: 'bg-green-50', text: 'text-green-600' },
    { path: '/documents', icon: 'file-alt', label: 'Hujjatlar', labelRu: 'Документы', bg: 'bg-orange-50', text: 'text-orange-600' },
    { path: '/media', icon: 'photo-video', label: 'Media', labelRu: 'Медиа', bg: 'bg-purple-50', text: 'text-purple-600' },
    { path: '/organizations', icon: 'building', label: 'Tashkilotlar', labelRu: 'Организации', bg: 'bg-red-50', text: 'text-red-600' },
    { path: '/statistics', icon: 'chart-line', label: 'Statistika', labelRu: 'Статистика', bg: 'bg-teal-50', text: 'text-teal-600' },
    { path: '/contact', icon: 'envelope', label: 'Aloqa', labelRu: 'Контакты', bg: 'bg-pink-50', text: 'text-pink-600' },
    { path: '/about', icon: 'info-circle', label: 'Tuman haqida', labelRu: 'О районе', bg: 'bg-indigo-50', text: 'text-indigo-600' }
  ];

  const features = [
    { icon: 'fas fa-user-check', title: t('Tez xizmat ko\'rsatish', 'Быстрое обслуживание'), desc: t('30 daqiqada javob', 'Ответ за 30 минут') },
    { icon: 'fas fa-shield-alt', title: t('Ishonchli tizim', 'Надежная система'), desc: t('Ma\'lumotlar himoyasi', 'Защита данных') },
    { icon: 'fas fa-mobile-alt', title: t('Mobil qulaylik', 'Мобильное удобство'), desc: t('Har qanday qurilmadan', 'С любого устройства') },
    { icon: 'fas fa-headset', title: t('24/7 Yordam', 'Круглосуточная помощь'), desc: t('Doimiy online qo\'llab-quvvatlash', 'Постоянная поддержка') }
  ];

  const receptionHours = {
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00' }
  };

  const carouselList = adminData?.carousel || [];
  const leadersList = adminData?.leadership || [];
  const galleryList = adminData?.gallery || [];

  return (
    <div className="overflow-x-hidden relative">
      {/* Hero Slider */}
      <div className="relative h-[550px] md:h-[650px] overflow-hidden z-10">
        <Swiper 
          modules={[Autoplay, Pagination, Navigation, EffectFade]} 
          effect="fade" 
          autoplay={{ delay: 5000, disableOnInteraction: false }} 
          pagination={{ clickable: true }} 
          navigation 
          loop={carouselList.length > 1}
          className="h-full"
        >
          {carouselList.length > 0 ? (
            carouselList.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full w-full">
                  <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                        {t(slide.title, slide.titleRu)}
                      </h1>
                      <p className="text-lg md:text-xl mb-8 text-white/90">
                        {t('Jondor tumani rasmiy portali', 'Официальный портал Джондорского района')}
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/services">
                          <button className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all font-semibold shadow-lg">
                            <i className="fas fa-th-large mr-2"></i> {t('Xizmatlar', 'Услуги')}
                          </button>
                        </Link>
                        <Link to="/contact">
                          <button className="px-6 py-3 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all font-semibold border border-white/30">
                            <i className="fas fa-paper-plane mr-2"></i> {t('Murojaat qilish', 'Связаться')}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative h-full w-full">
                <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <i className="fas fa-image text-6xl mb-4 opacity-50"></i>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('Jondor tumani', 'Джондорский район')}</h1>
                    <p className="text-lg md:text-xl mb-8">{t('Rasmiy portal', 'Официальный портал')}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto -mt-12 relative z-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickLinks.map((link, idx) => (
            <Link key={link.path} to={link.path} className="group bg-white rounded-xl p-3 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block">
              <div className={`${link.bg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition duration-300`}>
                <i className={`fas fa-${link.icon} ${link.text} text-xl`}></i>
              </div>
              <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition">
                {t(link.label, link.labelRu)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Animated Statistics */}
      <div className="py-16 relative z-10">
        <AnimatedStatistics />
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
              {t('Nima uchun biz?', 'Почему мы?')}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                  <i className={`${feature.icon} text-2xl text-blue-600 group-hover:text-white transition-all duration-300`}></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div ref={statsRef} className="py-16 bg-gradient-to-br from-blue-50/50 to-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
              {t('Statistik ma\'lumotlar', 'Статистические данные')}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {adminData?.statistics?.map((stat, idx) => (
              <div key={stat.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas fa-${stat.icon} text-2xl text-blue-600`}></i>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.prefix}{countersStarted && <CountUp end={stat.value} duration={2.5} />}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm">{t(stat.label, stat.labelRu)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      {leadersList.length > 0 && (
        <div className="py-16 bg-white/80 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
                {t('Tuman rahbariyati', 'Руководство района')}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadersList.slice(0, 3).map((leader, idx) => (
                <div key={leader.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    {leader.image ? (
                      <img src={leader.image} className="w-full h-full object-cover hover:scale-110 transition duration-500" alt={leader.name} />
                    ) : (
                      <div className="w-28 h-28 bg-blue-200 rounded-full flex items-center justify-center">
                        <i className="fas fa-user-tie text-5xl text-blue-500"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl mb-1">{leader.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{leader.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {galleryList.length > 0 && (
        <div className="py-16 bg-gradient-to-br from-gray-50/50 to-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
                {t('Galereya', 'Галерея')}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={800}
              pagination={{ clickable: true }}
              navigation
              loop={true}
              className="pb-12"
            >
              {galleryList.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <div className="relative h-64 overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition duration-300">
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Reception Hours */}
      <div className="py-16 bg-gray-50/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
              {t('Qabul jadvali', 'График приема')}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-tie text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Tuman hokimi qabuli', 'Прием хокима района')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-blue-500"></i> {t(receptionHours.governor.days, receptionHours.governor.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-blue-500"></i> {receptionHours.governor.time}</p>
                <p className="text-gray-600"><i className="fas fa-map-marker-alt w-6 text-blue-500"></i> {t(receptionHours.governor.location, receptionHours.governor.locationRu)}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-users text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold">{t('Fuqarolar qabuli', 'Прием граждан')}</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600"><i className="fas fa-calendar-alt w-6 text-blue-500"></i> {t(receptionHours.citizens.days, receptionHours.citizens.daysRu)}</p>
                <p className="text-gray-600"><i className="fas fa-clock w-6 text-blue-500"></i> {receptionHours.citizens.time}</p>
                <p className="text-gray-600"><i className="fas fa-phone-alt w-6 text-blue-500"></i> {receptionHours.citizens.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="py-16 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              {t('So\'nggi yangiliklar', 'Последние новости')}
            </h2>
            <Link to="/news" className="text-blue-600 hover:underline flex items-center gap-1">
              {t('Barchasi', 'Все')} <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminData?.news?.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={item.title} />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    <i className="far fa-calendar-alt mr-1"></i> {item.date}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-blue-600 transition">{t(item.title, item.titleRu)}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.content?.slice(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500"><i className="far fa-eye mr-1"></i> {item.views} {t('ko\'rildi', 'просмотров')}</span>
                    <span className="text-blue-600 font-medium">{t('Davomi', 'Подробнее')} <i className="fas fa-arrow-right text-xs"></i></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center px-4 relative z-10">
          <i className="fas fa-bell text-5xl mb-4 animate-pulse"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('Yangiliklardan xabardor bo\'ling', 'Будьте в курсе новостей')}</h2>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
            <input 
              type="email" 
              placeholder={t('Email manzilingiz', 'Ваш email')} 
              className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
              value={subscriberEmail} 
              onChange={(e) => setSubscriberEmail(e.target.value)} 
              required 
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t('Obuna bo\'lish', 'Подписаться')}
            </button>
          </form>
          {subscribed && (
            <div className="mt-4 text-green-300 font-medium">
              ✅ {t('Obuna bo\'ldingiz!', 'Вы подписались!')}
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
      >
        {isChatOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <div className="relative">
            <i className="fas fa-robot text-2xl"></i>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* AI Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">Jondor AI Yordamchi</h3>
                  <div className="flex items-center gap-2 text-xs opacity-80">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      🟢 Online
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-volume-up text-xs"></i>
                      {isSpeaking ? "Gapiryapti..." : "Ovozli javob"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Til tanlash */}
                <div className="flex bg-white/20 rounded-lg p-0.5">
                  <button
                    onClick={() => setAiLang('uz')}
                    className={`px-2 py-1 text-xs rounded-md transition ${aiLang === 'uz' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    Uz
                  </button>
                  <button
                    onClick={() => setAiLang('ru')}
                    className={`px-2 py-1 text-xs rounded-md transition ${aiLang === 'ru' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    Ru
                  </button>
                  <button
                    onClick={() => setAiLang('en')}
                    className={`px-2 py-1 text-xs rounded-md transition ${aiLang === 'en' ? 'bg-white text-blue-600' : 'text-white'}`}
                  >
                    En
                  </button>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-700 rounded-bl-sm shadow'}`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Buttons */}
          <div className="px-4 py-2 border-t bg-white">
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Salom" : aiLang === 'ru' ? "Привет" : "Hello")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">👋 {aiLang === 'uz' ? "Salom" : aiLang === 'ru' ? "Привет" : "Hello"}</button>
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Tuman haqida" : aiLang === 'ru' ? "О районе" : "About district")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">📍 {aiLang === 'uz' ? "Tuman" : aiLang === 'ru' ? "Район" : "District"}</button>
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Rahbariyat" : aiLang === 'ru' ? "Руководство" : "Leadership")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">🏛️ {aiLang === 'uz' ? "Rahbariyat" : aiLang === 'ru' ? "Руководство" : "Leadership"}</button>
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Statistika" : aiLang === 'ru' ? "Статистика" : "Statistics")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">📊 {aiLang === 'uz' ? "Statistika" : aiLang === 'ru' ? "Статистика" : "Statistics"}</button>
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Aloqa" : aiLang === 'ru' ? "Контакты" : "Contacts")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">📞 {aiLang === 'uz' ? "Aloqa" : aiLang === 'ru' ? "Контакты" : "Contacts"}</button>
              <button onClick={() => setChatInput(aiLang === 'uz' ? "Yordam" : aiLang === 'ru' ? "Помощь" : "Help")} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition">🆘 {aiLang === 'uz' ? "Yordam" : aiLang === 'ru' ? "Помощь" : "Help"}</button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <button
                onClick={handleVoiceInput}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
                title={aiLang === 'uz' ? "Ovozli so'roq" : aiLang === 'ru' ? "Голосовой запрос" : "Voice query"}
              >
                <i className="fas fa-microphone"></i>
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={aiLang === 'uz' ? "Savolingizni yozing..." : aiLang === 'ru' ? "Напишите ваш вопрос..." : "Write your question..."}
                className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}