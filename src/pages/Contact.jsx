import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t, submitContact } = useContext(AppContext);
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

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('Biz bilan bog\'laning', 'Свяжитесь с нами')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Savol va takliflaringizni yuboring', 'Отправьте ваши вопросы и предложения')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <i className={`fas ${info.icon} text-2xl text-primary`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{info.title}</h3>
                  <p className="text-gray-500">{info.value}</p>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">{t('Ijtimoiy tarmoqlar', 'Социальные сети')}</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-[#0088cc] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-telegram"></i></a>
                <a href="#" className="w-12 h-12 bg-[#1877f2] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 bg-[#e4405f] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-12 h-12 bg-[#ff0000] rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          
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
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Telefon', 'Телефон')}</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Mavzu', 'Тема')}</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Xabar *', 'Сообщение *')}</label>
                  <textarea rows="5" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-primary to-primaryDark text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                  {loading ? t('Yuborilmoqda...', 'Отправка...') : t('Yuborish', 'Отправить')}
                </button>
              </form>
            )}
          </div>
        </div>
        
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