import { useState, useContext } from 'react';
import { AppContext } from '../App';

export default function Contact() {
  const { t, adminData, updateData } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { id: Date.now(), ...form, date: new Date().toISOString() };
    updateData({ ...adminData, contacts: [...(adminData.contacts || []), newContact] });
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="max-w-4xl mx-auto container-custom">
        <h1 className="mb-6 text-3xl font-bold text-center gradient-text">{t('Biz bilan bog\'laning', 'Свяжитесь с нами')}</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <i className="text-xl fas fa-map-marker-alt text-primary"></i>
              </div>
              <div>
                <div className="font-semibold">{t('Manzil', 'Адрес')}</div>
                <div className="text-sm text-gray-500">Jondor tumani, Buxoro viloyati</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <i className="text-xl fas fa-phone-alt text-primary"></i>
              </div>
              <div>
                <div className="font-semibold">{t('Telefon', 'Телефон')}</div>
                <div className="text-sm text-gray-500">+998 65 380-00-00</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <i className="text-xl fas fa-envelope text-primary"></i>
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-gray-500">info@jondor.uz</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white shadow rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <i className="text-xl fas fa-clock text-primary"></i>
              </div>
              <div>
                <div className="font-semibold">{t('Ish vaqti', 'Режим работы')}</div>
                <div className="text-sm text-gray-500">Dushanba-Juma: 9:00 - 18:00</div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="p-6 bg-white shadow rounded-xl">
            {submitted ? (
              <div className="py-12 text-center">
                <i className="mb-4 text-5xl text-green-500 fas fa-check-circle"></i>
                <h3 className="mb-2 text-xl font-bold">{t('Murojaatingiz qabul qilindi!', 'Ваше обращение принято!')}</h3>
                <p className="text-gray-500">{t('Tez orada javob beramiz', 'Мы ответим в ближайшее время')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">{t('Ism familiya *', 'Имя фамилия *')}</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Email *</label>
                  <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">{t('Telefon', 'Телефон')}</label>
                  <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">{t('Xabar *', 'Сообщение *')}</label>
                  <textarea rows="5" required className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:border-primary" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white transition rounded-lg bg-primary hover:bg-primary/90">
                  <i className="mr-2 fas fa-paper-plane"></i> {t('Yuborish', 'Отправить')}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-10">
          <div className="overflow-hidden shadow-xl rounded-2xl h-96">
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
    </div>
  );
}