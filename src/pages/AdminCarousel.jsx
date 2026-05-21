import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiMove } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminCarousel() {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [titleRu, setTitleRu] = useState('');

  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      const res = await api.get('/carousel');
      setCarousel(res.data);
    } catch (error) {
      toast.error('Karuselni yuklashda xatolik');
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
      await api.post('/carousel', { image: imageUrl, title, titleRu });
      toast.success('Rasm qo\'shildi');
      fetchCarousel();
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
        await api.delete(`/carousel/${id}`);
        toast.success('Rasm o\'chirildi');
        fetchCarousel();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Karusel boshqaruvi</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary"><FiPlus /> Yangi rasm</button>
      </div>
      <div className="space-y-3">
        {carousel.map((item, idx) => (
          <div key={item._id} className="flex items-center gap-4 p-3 bg-white rounded-xl shadow">
            <FiMove className="text-gray-400 cursor-move" />
            <img src={item.image} className="w-20 h-16 object-cover rounded-lg" />
            <div className="flex-1"><p className="font-medium">{item.title}</p></div>
            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
          </div>
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