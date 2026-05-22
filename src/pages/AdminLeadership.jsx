import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminLeadership() {
  const { adminData, addLeader, deleteLeader, updateLeader, language } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    nameRu: '',
    position: '',
    positionRu: '',
    phone: '',
    email: '',
    image: ''
  });

  const leadersList = adminData?.leadership || [];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error(language === 'uz' ? 'Ism kiritilmadi' : 'Имя не введено');
      return;
    }

    if (editingItem) {
      updateLeader({ ...editingItem, ...form });
      toast.success(language === 'uz' ? 'Rahbar yangilandi' : 'Руководитель обновлен');
    } else {
      addLeader(form);
      toast.success(language === 'uz' ? 'Rahbar qo\'shildi' : 'Руководитель добавлен');
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setForm({ name: '', nameRu: '', position: '', positionRu: '', phone: '', email: '', image: '' });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name || '',
        nameRu: item.nameRu || '',
        position: item.position || '',
        positionRu: item.positionRu || '',
        phone: item.phone || '',
        email: item.email || '',
        image: item.image || ''
      });
    } else {
      setEditingItem(null);
      setForm({ name: '', nameRu: '', position: '', positionRu: '', phone: '', email: '', image: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {language === 'uz' ? '👥 Rahbariyat boshqaruvi' : '👥 Управление руководством'} ({leadersList.length})
        </h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {language === 'uz' ? 'Yangi rahbar' : 'Новый руководитель'}
        </button>
      </div>

      {leadersList.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">{language === 'uz' ? 'Hech qanday rahbar yo\'q' : 'Нет руководителей'}</p>
          <button
            onClick={() => openModal()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            + {language === 'uz' ? 'Birinchi rahbar qo\'shish' : 'Добавить первого руководителя'}
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadersList.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                    alt={item.name}
                  />
                ) : (
                  <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-user-tie text-5xl text-primary/50"></i>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                <p className="text-primary text-sm font-medium">{item.position}</p>
                {item.positionRu && <p className="text-gray-400 text-xs mt-1">{item.positionRu}</p>}
                <div className="mt-4 pt-3 border-t space-y-1">
                  {item.phone && (
                    <p className="text-gray-500 text-sm"><i className="fas fa-phone w-5 text-primary"></i> {item.phone}</p>
                  )}
                  {item.email && (
                    <p className="text-gray-500 text-sm"><i className="fas fa-envelope w-5 text-primary"></i> {item.email}</p>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <i className="fas fa-edit mr-1"></i> {language === 'uz' ? 'Tahrirlash' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(language === 'uz' ? 'O\'chirilsinmi?' : 'Удалить?')) {
                        deleteLeader(item.id);
                        toast.success(language === 'uz' ? 'Rahbar o\'chirildi' : 'Руководитель удален');
                      }
                    }}
                    className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> {language === 'uz' ? 'O\'chirish' : 'Удалить'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingItem
                  ? (language === 'uz' ? 'Rahbarni tahrirlash' : 'Редактирование руководителя')
                  : (language === 'uz' ? 'Yangi rahbar qo\'shish' : 'Добавить руководителя')}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Rasm' : 'Изображение'}</label>
                <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg hover:border-primary transition">
                  {form.image ? (
                    <div className="relative inline-block">
                      <img src={form.image} className="h-32 rounded-lg" alt="preview" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: '' })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-500">{language === 'uz' ? 'Rasm yuklash' : 'Загрузить изображение'}</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Ism (UZ)' : 'Имя (UZ)'}</label>
                  <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Ism (RU)' : 'Имя (RU)'}</label>
                  <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.nameRu} onChange={e => setForm({ ...form, nameRu: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Lavozim (UZ)' : 'Должность (UZ)'}</label>
                  <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Lavozim (RU)' : 'Должность (RU)'}</label>
                  <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.positionRu} onChange={e => setForm({ ...form, positionRu: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{language === 'uz' ? 'Telefon' : 'Телефон'}</label>
                <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition">
                  {language === 'uz' ? 'Bekor qilish' : 'Отмена'}
                </button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  {language === 'uz' ? 'Saqlash' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}