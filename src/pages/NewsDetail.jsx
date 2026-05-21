import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function NewsDetail() {
  const { id } = useParams();
  const { t, news } = useContext(AppContext);
  const item = news.find(n => n.id === parseInt(id));
  
  if (!item) return <div className="pt-32 text-center">Topilmadi</div>;
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom max-w-3xl mx-auto">
        <Link to="/news" className="text-primary mb-4 inline-block">← Yangiliklarga qaytish</Link>
        <h1 className="text-2xl font-bold mb-2">{t(item.title, item.titleRu)}</h1>
        <p className="text-gray-400 text-sm mb-4">{item.date}</p>
        <img src={item.image} className="w-full rounded-xl mb-5" />
        <p className="text-gray-600">{item.content}</p>
      </div>
    </div>
  );
}