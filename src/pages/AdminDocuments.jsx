import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminDocuments() {
  const { documents, addDocument, deleteDocument, updateDocument, t } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', titleRu: '', category: 'programs' });

  const documentsList = documents || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      toast.error(t('Sarlavha kiritilmadi', 'Заголовок не введен'));
      return;
    }
    if (editingItem) {
      updateDocument({ ...editingItem, ...form });
      toast.success(t('Hujjat yangilandi', 'Документ обновлен'));
    } else {
      addDocument(form);
      toast.success(t('Hujjat qo\'shildi', 'Документ добавлен'));
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setForm({ title: '', titleRu: '', category: 'programs' });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({
        title: item.title || '',
        titleRu: item.titleRu || '',
        category: item.category || 'programs'
      });
    } else {
      setEditingItem(null);
      setForm({ title: '', titleRu: '', category: 'programs' });
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-file-alt text-primary mr-2"></i>
          {t('Hujjatlar boshqaruvi', 'Управление документами')} ({documentsList.length})
        </h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> {t('Yangi hujjat', 'Новый документ')}
        </button>
      </div>

      {documentsList.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border">
          <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">{t('Hech qanday hujjat yo\'q', 'Нет документов')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documentsList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-pdf text-primary"></i>
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span><i className="far fa-calendar-alt mr-1"></i> {item.date}</span>
                    <span><i className="far fa-eye mr-1"></i> {item.views || 0} {t('ko\'rilgan', 'просмотров')}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(t('O\'chirilsinmi?', 'Удалить?'))) {
                      deleteDocument(item.id);
                      toast.success(t('Hujjat o\'chirildi', 'Документ удален'));
                    }
                  }}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingItem ? t('Hujjatni tahrirlash', 'Редактирование документа') : t('Yangi hujjat', 'Новый документ')}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('Sarlavha (UZ)', 'Заголовок (UZ)')} *</label>
                <input type="text" className="w-full p-2 border rounded-lg" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('Sarlavha (RU)', 'Заголовок (RU)')}</label>
                <input type="text" className="w-full p-2 border rounded-lg" value={form.titleRu} onChange={e => setForm({ ...form, titleRu: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('Kategoriya', 'Категория')}</label>
                <select className="w-full p-2 border rounded-lg" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="budget">{t('Byudjet', 'Бюджет')}</option>
                  <option value="programs">{t('Dasturlar', 'Программы')}</option>
                  <option value="laws">{t('Qonunlar', 'Законы')}</option>
                  <option value="reports">{t('Hisobotlar', 'Отчеты')}</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">
                  {t('Bekor qilish', 'Отмена')}
                </button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  {t('Saqlash', 'Сохранить')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}