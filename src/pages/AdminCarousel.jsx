import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import AddModal from '../components/AddModal';
import toast from 'react-hot-toast';

export default function AdminCarousel() {
  const { adminData, addCarousel, deleteCarousel, updateCarousel } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ image: '', title: '', titleRu: '' });

  const carouselList = adminData?.carousel || [];

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
    if (!form.image) { 
      toast.error('Rasm kiritilmadi'); 
      return; 
    }
    
    if (editingItem) { 
      updateCarousel({ ...editingItem, ...form }); 
      toast.success('Rasm yangilandi'); 
    } else { 
      addCarousel(form); 
      toast.success('Rasm qo\'shildi'); 
    }
    
    setIsModalOpen(false); 
    setEditingItem(null); 
    setForm({ image: '', title: '', titleRu: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎠 Karusel boshqaruvi ({carouselList.length})</h1>
        <button 
          onClick={() => { 
            setEditingItem(null); 
            setForm({ image: '', title: '', titleRu: '' }); 
            setIsModalOpen(true); 
          }} 
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Yangi rasm
        </button>
      </div>

      {carouselList.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">Hech qanday rasm yo'q</p>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            + Birinchi rasm qo'shish
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {carouselList.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              whileHover={{ x: 5 }} 
              className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="text-gray-400 text-lg font-bold">#{idx + 1}</div>
              <img 
                src={item.image} 
                className="w-20 h-16 object-cover rounded-lg" 
                alt={item.title} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60?text=No+Image'; }}
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.title || 'Sarlavha yo\'q'}</h3>
                {item.titleRu && <p className="text-sm text-gray-500">{item.titleRu}</p>}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { 
                    setEditingItem(item); 
                    setForm({ image: item.image, title: item.title || '', titleRu: item.titleRu || '' }); 
                    setIsModalOpen(true); 
                  }} 
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => { 
                    if (window.confirm('O\'chirilsinmi?')) { 
                      deleteCarousel(item.id); 
                      toast.success('Rasm o\'chirildi'); 
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

      <AddModal 
        isOpen={isModalOpen} 
        onClose={() => { 
          setIsModalOpen(false); 
          setEditingItem(null); 
        }} 
        title={editingItem ? 'Rasmni tahrirlash' : 'Yangi rasm'} 
        onSubmit={handleSubmit} 
        editMode={!!editingItem}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rasm *</label>
            <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg hover:border-primary transition">
              {form.image ? (
                <div className="relative">
                  <img src={form.image} className="h-32 mx-auto rounded" alt="preview" />
                  <button 
                    type="button"
                    onClick={() => setForm({ ...form, image: '' })}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">Rasm yuklash uchun bosing</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sarlavha (UZ)</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sarlavha (RU)</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              value={form.titleRu} 
              onChange={e => setForm({...form, titleRu: e.target.value})} 
            />
          </div>
        </div>
      </AddModal>
    </div>
  );
}