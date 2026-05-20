import { useState, useContext } from 'react';
import { AppContext } from '../App';

export default function Contact() {
  const { t, adminData, updateData } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { id: Date.now(), ...form, date: new Date().toISOString() };
    updateData({ ...adminData, contacts: [...adminData.contacts, newContact] });
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="max-w-2xl container-custom">
        <h1 className="mb-6 text-3xl font-bold text-center gradient-text">{t('Aloqa', 'Контакты')}</h1>
        {submitted ? (
          <div className="p-4 text-center text-green-700 bg-green-100 rounded-xl">✓ Xabaringiz qabul qilindi!</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white shadow rounded-xl">
            <input type="text" placeholder={t('Ism familiya', 'Имя фамилия')} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <textarea rows="5" placeholder={t('Xabar', 'Сообщение')} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required></textarea>
            <button type="submit" className="w-full py-2 font-semibold text-white transition rounded-lg bg-primary hover:bg-primary/90">{t('Yuborish', 'Отправить')}</button>
          </form>
        )}
      </div>
    </div>
  );
}