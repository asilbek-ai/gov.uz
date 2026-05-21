import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEye, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (error) {
      toast.error('Murojaatlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Murojaatni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await api.delete(`/contacts/${id}`);
        toast.success('Murojaat o\'chirildi');
        fetchContacts();
      } catch (error) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contacts/${id}`, { status });
      toast.success('Holat yangilandi');
      fetchContacts();
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: 'bg-yellow-100 text-yellow-700',
      read: 'bg-blue-100 text-blue-700',
      replied: 'bg-green-100 text-green-700'
    };
    const labels = {
      new: 'Yangi',
      read: 'O\'qilgan',
      replied: 'Javob berilgan'
    };
    return { className: badges[status] || 'bg-gray-100', label: labels[status] || status };
  };

  if (loading) return <div className="p-8 text-center">Yuklanmoqda...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Murojaatlar</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'new', 'read', 'replied'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === status
                ? status === 'all' ? 'bg-primary text-white' :
                  status === 'new' ? 'bg-yellow-500 text-white' :
                  status === 'read' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? `Barchasi (${statusCounts.all})` :
             status === 'new' ? `Yangi (${statusCounts.new})` :
             status === 'read' ? `O'qilgan (${statusCounts.read})` : `Javob berilgan (${statusCounts.replied})`}
          </button>
        ))}
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact, idx) => {
          const badge = getStatusBadge(contact.status);
          return (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer ${
                contact.status === 'new' ? 'border-l-4 border-l-yellow-500' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FiMail className="w-3 h-3" />
                      <span>{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FiPhone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{contact.message}</p>
                  <p className="mt-2 text-xs text-gray-400">{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedContact(contact); }}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <div className="py-12 text-center">
          <i className="mb-4 text-5xl text-gray-300 fas fa-envelope-open"></i>
          <p className="text-gray-500">Hech qanday murojaat yo'q</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedContact(null)}>
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Murojaat tafsilotlari</h2>
              <button onClick={() => setSelectedContact(null)} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Ism familiya</label>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="text-sm text-gray-500">Telefon</label>
                    <p className="font-medium">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-500">Sana</label>
                  <p className="font-medium">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Xabar</label>
                <p className="p-3 mt-1 bg-gray-50 rounded-lg whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setSelectedContact(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Yopish</button>
                {selectedContact.status === 'new' && (
                  <button
                    onClick={() => { updateStatus(selectedContact._id, 'read'); setSelectedContact(null); }}
                    className="px-4 py-2 text-white rounded-lg bg-primary"
                  >
                    O'qilgan deb belgilash
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}