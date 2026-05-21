import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { FiPlus, FiTrash2, FiEdit2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminFaq() {
  const { t, faqs, deleteFaq, addFaq } = useContext(AppContext);
  const [localFaqs, setLocalFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({ question: '', questionRu: '', answer: '', answerRu: '' });

  useEffect(() => {
    if (faqs && faqs.length > 0) {
      setLocalFaqs(faqs);
    } else {
      const saved = localStorage.getItem('jondor_data');
      if (saved) {
        const data = JSON.parse(saved);
        setLocalFaqs(data.faqs || []);
      }
    }
  }, [faqs]);

  const saveToLocalStorage = (updatedFaqs) => {
    const saved = localStorage.getItem('jondor_data');
    const data = saved ? JSON.parse(saved) : { faqs: [] };
    data.faqs = updatedFaqs;
    localStorage.setItem('jondor_data', JSON.stringify(data));
    setLocalFaqs(updatedFaqs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.question) {
      toast.error('Savol kiritilmadi');
      return;
    }
    if (editingFaq) {
      const updated = localFaqs.map(f => f.id === editingFaq.id ? { ...f, ...form } : f);
      saveToLocalStorage(updated);
      toast.success('FAQ yangilandi');
    } else {
      const newFaq = { ...form, id: Date.now() };
      saveToLocalStorage([...localFaqs, newFaq]);
      if (addFaq) addFaq(newFaq);
      toast.success('FAQ qo\'shildi');
    }
    setIsModalOpen(false);
    setEditingFaq(null);
    setForm({ question: '', questionRu: '', answer: '', answerRu: '' });
  };

  const handleDelete = (id) => {
    if (confirm('O\'chirilsinmi?')) {
      const updated = localFaqs.filter(f => f.id !== id);
      saveToLocalStorage(updated);
      if (deleteFaq) deleteFaq(id);
      toast.success('FAQ o\'chirildi');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FAQ boshqaruvi</h1>
        <button onClick={() => { setEditingFaq(null); setForm({ question: '', questionRu: '', answer: '', answerRu: '' }); setIsModalOpen(true); }} 
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
          <FiPlus /> Yangi savol
        </button>
      </div>

      {localFaqs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <i className="fas fa-question-circle text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">Hech qanday savol yo'q</p>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 px-5 py-2 bg-primary text-white rounded-lg">
            Birinchi savol qo'shish
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {localFaqs.map(faq => (
            <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setEditingFaq(faq); setForm(faq); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                    <FiEdit2 />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <FiTrash2 />
                  </button>
                  {expandedId === faq.id ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </button>
              {expandedId === faq.id && (
                <div className="p-5 pt-0 border-t bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                  {faq.answerRu && <p className="text-gray-500 text-sm mt-2">{faq.answerRu}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white">
              <h2 className="text-xl font-bold">{editingFaq ? 'Savolni tahrirlash' : 'Yangi savol'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" placeholder="Savol (UZ) *" className="w-full p-2 border rounded" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
              <input type="text" placeholder="Savol (RU)" className="w-full p-2 border rounded" value={form.questionRu} onChange={e => setForm({...form, questionRu: e.target.value})} />
              <textarea placeholder="Javob (UZ)" rows="4" className="w-full p-2 border rounded" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} />
              <textarea placeholder="Javob (RU)" rows="4" className="w-full p-2 border rounded" value={form.answerRu} onChange={e => setForm({...form, answerRu: e.target.value})} />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded">Bekor</button>
                <button type="submit" className="flex-1 p-2 bg-primary text-white rounded">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}