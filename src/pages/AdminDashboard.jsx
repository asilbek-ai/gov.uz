import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { FiUsers, FiFileText, FiHeadphones, FiImage, FiDownload, FiEye } from 'react-icons/fi';

export default function AdminDashboard() {
  const { adminData } = useContext(AppContext);
  const [stats, setStats] = useState({
    newsCount: 0, servicesCount: 0, documentsCount: 0, galleryCount: 0, audioCount: 0, contactsCount: 0, subscribersCount: 0
  });

  useEffect(() => {
    setStats({
      newsCount: adminData.news?.length || 0,
      servicesCount: adminData.services?.length || 0,
      documentsCount: adminData.documents?.length || 0,
      galleryCount: adminData.gallery?.length || 0,
      audioCount: adminData.audio?.length || 0,
      contactsCount: adminData.contacts?.length || 0,
      subscribersCount: adminData.subscribers?.length || 0
    });
  }, [adminData]);

  const statCards = [
    { title: 'Yangiliklar', value: stats.newsCount, icon: FiFileText, color: 'blue' },
    { title: 'Xizmatlar', value: stats.servicesCount, icon: FiHeadphones, color: 'purple' },
    { title: 'Hujjatlar', value: stats.documentsCount, icon: FiDownload, color: 'orange' },
    { title: 'Media', value: stats.galleryCount, icon: FiImage, color: 'pink' },
    { title: 'Audio', value: stats.audioCount, icon: FiEye, color: 'green' },
    { title: 'Murojaatlar', value: stats.contactsCount, icon: FiEye, color: 'red' },
    { title: 'Obunalar', value: stats.subscribersCount, icon: FiUsers, color: 'teal' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${card.color}-100 flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 text-${card.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-primary">{card.value}</div>
            <div className="text-sm text-gray-500">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}