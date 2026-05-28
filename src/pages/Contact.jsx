import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t, submitContact } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t('Barcha majburiy maydonlarni to\'ldiring!', 'Заполните все обязательные поля!'));
      return;
    }
    setLoading(true);
    const result = await submitContact(form);
    if (result) {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
      toast.success(t('Xabaringiz qabul qilindi!', 'Ваше сообщение принято!'));
    }
    setLoading(false);
  };
  
  const contactInfo = [
    { icon: "fa-map-marker-alt", title: t("Manzil", "Адрес"), value: "Jondor tumani, Buxoro viloyati" },
    { icon: "fa-phone-alt", title: t("Telefon", "Телефон"), value: "+998 65 380-00-00" },
    { icon: "fa-envelope", title: "Email", value: "info@jondor.uz" },
    { icon: "fa-clock", title: t("Ish vaqti", "Режим работы"), value: t("Dushanba-Juma: 9:00 - 18:00", "Пн-Пт: 9:00 - 18:00") }
  ];

  // Tashkilotlar ro'yxati (sayt ichida)
  const organizations = [
    { 
      id: 'oneid', 
      name: 'OneID', 
      fullName: 'Yagona login va identifikatsiya tizimi',
      description: 'Davlat xizmatlariga yagona login orqali kirish',
      icon: 'fa-id-card',
      color: 'from-purple-600 to-blue-600',
      bg: 'from-purple-50 to-blue-50',
      loginUrl: '/oneid-login',
      registerUrl: '/oneid-register'
    },
    { 
      id: 'iduz', 
      name: 'ID.UZ', 
      fullName: 'Yagona akkaunt tizimi',
      description: 'Portal va xizmatlar uchun yagona akkaunt',
      icon: 'fa-user-circle',
      color: 'from-green-600 to-teal-600',
      bg: 'from-green-50 to-teal-50',
      loginUrl: '/iduz-login',
      registerUrl: '/iduz-register'
    },
    { 
      id: 'myid', 
      name: 'MyID', 
      fullName: 'Biometrik identifikatsiya tizimi',
      description: 'Biometrik ma\'lumotlar orqali identifikatsiya',
      icon: 'fa-fingerprint',
      color: 'from-red-600 to-orange-600',
      bg: 'from-red-50 to-orange-50',
      loginUrl: '/myid-login',
      registerUrl: '/myid-register'
    },
    { 
      id: 'eimzo', 
      name: 'E-IMZO', 
      fullName: 'Elektron raqamli imzo tizimi',
      description: 'Hujjatlarni raqamli imzo bilan tasdiqlash',
      icon: 'fa-file-signature',
      color: 'from-indigo-600 to-purple-600',
      bg: 'from-indigo-50 to-purple-50',
      loginUrl: '/eimzo-login',
      registerUrl: '/eimzo-register'
    },
    { 
      id: 'mygov', 
      name: 'my.gov.uz', 
      fullName: 'Davlat xizmatlari portali',
      description: 'Online davlat xizmatlari platformasi',
      icon: 'fa-building',
      color: 'from-blue-600 to-cyan-600',
      bg: 'from-blue-50 to-cyan-50',
      loginUrl: '/mygov-login',
      registerUrl: '/mygov-register'
    }
  ];

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#003580] to-[#0066cc] bg-clip-text text-transparent mb-4">
            {t('Biz bilan bog\'laning', 'Свяжитесь с нами')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Savol va takliflaringizni yuboring', 'Отправьте ваши вопросы и предложения')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#0066cc] mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                  <i className={`fas ${info.icon} text-2xl text-[#003580]`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{info.title}</h3>
                  <p className="text-gray-500">{info.value}</p>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">{t('Ijtimoiy tarmoqlar', 'Социальные сети')}</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[#0088cc] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-telegram"></i></a>
                <a href="#" className="w-12 h-12 bg-[#1877f2] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 bg-[#e4405f] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-12 h-12 bg-[#ff0000] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-600 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('Murojaatingiz qabul qilindi!', 'Ваше обращение принято!')}</h3>
                <p className="text-gray-500">{t('Tez orada javob beramiz', 'Мы ответим в ближайшее время')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Ism familiya *', 'Имя фамилия *')}</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Telefon', 'Телефон')}</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Mavzu', 'Тема')}</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Xabar *', 'Сообщение *')}</label>
                  <textarea rows="5" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#003580] to-[#0066cc] text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                  {loading ? t('Yuborilmoqda...', 'Отправка...') : t('Yuborish', 'Отправить')}
                </button>
              </form>
            )}
          </div>
        </div>
        
      

        {/* ============ TASHKILOTLAR / TIZIMLAR ============ */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('Tashkilotlar va tizimlar', 'Организации и системы')}
            </h2>
            <p className="text-gray-500 mt-2">
              {t('Quyidagi tizimlar orqali tezkor va xavfsiz autentifikatsiyadan foydalaning', 'Используйте быструю и безопасную аутентификацию через следующие системы')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div key={org.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`relative z-10 p-6 bg-gradient-to-br ${org.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${org.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
                      <i className={`fas ${org.icon} text-white text-2xl`}></i>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{org.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{org.fullName}</p>
                      <p className="text-sm text-gray-600 mt-2">{org.description}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">✓ {t('Tez', 'Быстро')}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">✓ {t('Xavfsiz', 'Безопасно')}</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">✓ {t('Ishonchli', 'Надежно')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <Link to={org.loginUrl} className="flex-1 text-center px-3 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition border">
                          <i className="fas fa-sign-in-alt mr-1"></i> {t('Kirish', 'Вход')}
                        </Link>
                        <Link to={org.registerUrl} className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm hover:scale-105 transition">
                          <i className="fas fa-user-plus mr-1"></i> {t('Ro\'yxatdan o\'tish', 'Регистрация')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-xl h-96">
          <iframe 
            title="Jondor map" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Jondor+Uzbekistan"
          ></iframe>
        </div>
      </div>
    </div>
  );
}