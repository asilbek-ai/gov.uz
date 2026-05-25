import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { motion } from 'framer-motion';
import AddModal from '../components/AddModal';
import toast from 'react-hot-toast';

export default function AdminStatistics() {
  const { statistics, addStatistic, deleteStatistic, updateStatistic } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.label) { toast.error('Statistika nomi kiritilmadi'); return; }
    if (editingItem) { 
      updateStatistic({ ...editingItem, ...form }); 
      toast.success('Statistika yangilandi'); 
    } else { 
      addStatistic({ ...form, id: Date.now() }); 
      toast.success('Statistika qo\'shildi'); 
    }
    setIsModalOpen(false); 
    setEditingItem(null); 
    setForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      deleteStatistic(id);
      toast.success('Statistika o\'chirildi');
    }
  };

  const getColorBg = (color) => ({ blue: 'bg-blue-100', green: 'bg-green-100', red: 'bg-red-100', purple: 'bg-purple-100', orange: 'bg-orange-100', teal: 'bg-teal-100' }[color] || 'bg-gray-100');
  const getColorText = (color) => ({ blue: 'text-blue-600', green: 'text-green-600', red: 'text-red-600', purple: 'text-purple-600', orange: 'text-orange-600', teal: 'text-teal-600' }[color] || 'text-gray-600');
  const getBorderColor = (color) => ({ blue: 'border-blue-500', green: 'border-green-500', red: 'border-red-500', purple: 'border-purple-500', orange: 'border-orange-500', teal: 'border-teal-500' }[color] || 'border-gray-500');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Statistika boshqaruvi ({statistics.length})</h1>
        <button onClick={() => { setEditingItem(null); setForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' }); setIsModalOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"><i className="fas fa-plus"></i> Yangi statistika</button>
      </div>
      {statistics.length === 0 ? (<div className="bg-white rounded-xl p-12 text-center"><i className="fas fa-chart-line text-6xl text-gray-300 mb-4"></i><p className="text-gray-500">Hech qanday statistika yo'q</p></div>) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statistics.map(item => {
            const borderColor = getBorderColor(item.color);
            return (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border-l-4 ${borderColor}`}>
                <div className="p-4 text-center">
                  <div className={`w-16 h-16 ${getColorBg(item.color)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <i className={`fas fa-${item.icon} text-2xl ${getColorText(item.color)}`}></i>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{item.value.toLocaleString()}</div>
                  <h3 className="font-bold mt-1">{item.label}</h3>
                  {item.labelRu && <p className="text-xs text-gray-500">{item.labelRu}</p>}
                </div>
                <div className="border-t p-3 flex gap-2">
                  <button onClick={() => { setEditingItem(item); setForm({ label: item.label, labelRu: item.labelRu || '', value: item.value, icon: item.icon || 'chart-line', color: item.color || 'blue' }); setIsModalOpen(true); }} className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                    <i className="fas fa-edit mr-1"></i> Tahrirlash
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                    <i className="fas fa-trash-alt mr-1"></i> O'chirish
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      <AddModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }} title={editingItem ? 'Statistikani tahrirlash' : 'Yangi statistika'} onSubmit={handleSubmit} editMode={!!editingItem}>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nomi (UZ) *</label>
            <input type="text" required className="w-full p-2 border rounded-lg" value={form.label} onChange={e => setForm({...form, label: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomi (RU)</label>
            <input type="text" className="w-full p-2 border rounded-lg" value={form.labelRu} onChange={e => setForm({...form, labelRu: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Qiymat</label>
            <input type="number" className="w-full p-2 border rounded-lg" value={form.value} onChange={e => setForm({...form, value: parseInt(e.target.value) || 0})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <input type="text" placeholder="users, school, hospital, chart-line" className="w-full p-2 border rounded-lg" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rang</label>
            <select className="w-full p-2 border rounded-lg" value={form.color} onChange={e => setForm({...form, color: e.target.value})}>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="teal">Teal</option>
            </select>
          </div>
        </div>
      </AddModal>
    </div>
  );
}