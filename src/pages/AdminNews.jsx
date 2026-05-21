import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiImage, FiTag, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import RichTextEditor from '../components/RichTextEditor';
import MediaUpload from '../components/MediaUpload';
import api from '../services/api';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [form, setForm] = useState({
    title: '',
    titleRu: '',
    content: '',
    contentRu: '',
    excerpt: '',
    excerptRu: '',
    category: 'yangilik',
    tags: [],
    featuredImage: '',
    additionalImages: [],
    publishDate: new Date().toISOString().split('T')[0],
    author: '',
    status: 'published'
  });
  const [tagInput, setTagInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'yangilik', label: 'Yangilik' },
    { value: 'e\'lon', label: 'E\'lon' },
    { value: 'yangiliklar', label: 'Yangiliklar' },
    { value: 'intervyu', label: 'Intervyu' },
    { value: 'maqola', label: 'Maqola' }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Yangiliklarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedNews) {
        await api.put(`/news/${selectedNews._id}`, form);
        toast.success('Yangilik yangilandi');
      } else {
        await api.post('/news', form);
        toast.success('Yangilik qo\'shildi');
      }
      fetchNews();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yangilikni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/news/${id}`);
        toast.success('Yangilik o\'chirildi');
        fetchNews();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '', titleRu: '', content: '', contentRu: '', excerpt: '', excerptRu: '',
      category: 'yangilik', tags: [], featuredImage: '', additionalImages: [],
      publishDate: new Date().toISOString().split('T')[0], author: '', status: 'published'
    });
    setSelectedNews(null);
  };

  const editNews = (item) => {
    setSelectedNews(item);
    setForm({
      title: item.title, titleRu: item.titleRu || '', content: item.content, contentRu: item.contentRu || '',
      excerpt: item.excerpt || '', excerptRu: item.excerptRu || '', category: item.category || 'yangilik',
      tags: item.tags || [], featuredImage: item.featuredImage || '', additionalImages: item.additionalImages || [],
      publishDate: item.publishDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      author: item.author || '', status: item.status || 'published'
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Yangiliklar boshqaruvi</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
        >
          <FiPlus /> Yangi yangilik
        </button>
      </div>

      <div className="grid gap-4">
        {news.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {item.featuredImage && (
                <img src={item.featuredImage} alt={item.title} className="object-cover w-16 h-16 rounded-lg" />
              )}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                  <span>{new Date(item.publishDate).toLocaleDateString()}</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100">{item.category}</span>
                  {item.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editNews(item)} className="text-blue-500 hover:text-blue-700">
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
            >
              <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
                <h2 className="text-xl font-bold">{selectedNews ? 'Yangilikni tahrirlash' : 'Yangi yangilik'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Sarlavha (UZ) *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Sarlavha (RU)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={form.titleRu}
                      onChange={(e) => setForm({ ...form, titleRu: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Qisqacha matn (UZ)</label>
                  <textarea rows={2} className="w-full px-3 py-2 border rounded-lg" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">To‘liq matn (UZ)</label>
                  <RichTextEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Kategoriya</label>
                    <select className="w-full px-3 py-2 border rounded-lg" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nashr sanasi</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-lg" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Teglar</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Yangi teg"
                      className="flex-1 px-3 py-2 border rounded-lg"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button type="button" onClick={addTag} className="px-4 py-2 text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-full">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-red-500">
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Asosiy rasm (featured image)</label>
                  <MediaUpload onUploadComplete={(file) => setForm({ ...form, featuredImage: file.url })} multiple={false} />
                  {form.featuredImage && <img src={form.featuredImage} alt="Featured" className="mt-2 w-32 h-32 object-cover rounded" />}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Qo‘shimcha rasmlar (galereya)</label>
                  <MediaUpload onUploadComplete={(file) => setForm({ ...form, additionalImages: [...form.additionalImages, file.url] })} multiple={true} />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.additionalImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} className="w-16 h-16 object-cover rounded" />
                        <button type="button" onClick={() => setForm({ ...form, additionalImages: form.additionalImages.filter((_, i) => i !== idx) })} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Bekor qilish</button>
                  <button type="submit" className="px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90">Saqlash</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}