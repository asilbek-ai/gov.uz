import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiImage, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminMedia() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [titleRu, setTitleRu] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/gallery');
      setGallery(res.data);
    } catch (error) {
      toast.error('Galeriyani yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Rasm URL kiritilmadi');
      return;
    }
    try {
      await api.post('/gallery', { image: imageUrl, title, titleRu });
      toast.success('Rasm qo\'shildi');
      fetchGallery();
      setIsModalOpen(false);
      setImageUrl('');
      setTitle('');
      setTitleRu('');
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Rasmni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/gallery/${id}`);
        toast.success('Rasm o\'chirildi');
        fetchGallery();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media galereya</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary"><FiPlus /> Yangi rasm</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="relative group overflow-hidden rounded-xl bg-white shadow"
          >
            <img src={item.image} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button onClick={() => handleDelete(item._id)} className="p-2 bg-white rounded-full text-red-500"><FiTrash2 /></button>
            </div>
            {item.title && <div className="p-2 text-center bg-white"><p className="text-sm font-medium truncate">{item.title}</p></div>}
          </motion.div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi rasm</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Rasm URL" className="w-full p-2 border rounded" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
              <input type="text" placeholder="Sarlavha (UZ)" className="w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} />
              <input type="text" placeholder="Sarlavha (RU)" className="w-full p-2 border rounded" value={titleRu} onChange={e => setTitleRu(e.target.value)} />
              <div className="flex gap-2"><button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded">Bekor</button><button type="submit" className="flex-1 p-2 bg-primary text-white rounded">Saqlash</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}