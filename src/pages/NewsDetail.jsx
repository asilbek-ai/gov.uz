import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function NewsDetail() {
  const { id } = useParams();
  const { t, news } = useContext(AppContext);
  const item = news.find(n => n.id === parseInt(id));
  
  if (!item) {
    return (
      <div className="min-h-screen py-32 text-center">
        <i className="mb-4 text-5xl text-yellow-500 fas fa-exclamation-triangle"></i>
        <h2 className="mb-2 text-2xl font-bold">{t('Yangilik topilmadi', 'Новость не найдена')}</h2>
        <Link to="/news" className="inline-block px-6 py-2 mt-4 text-white rounded-lg bg-primary">{t('Yangiliklarga qaytish', 'Вернуться к новостям')}</Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="max-w-4xl mx-auto container-custom">
        <Link to="/news" className="inline-block mb-4 text-primary">← {t('Yangiliklarga qaytish', 'Вернуться к новостям')}</Link>
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">{t(item.title, item.titleRu)}</h1>
        <div className="flex gap-4 mb-6 text-sm text-gray-500">
          <span><i className="mr-1 far fa-calendar-alt"></i> {item.date}</span>
          <span><i className="mr-1 far fa-eye"></i> {item.views || 0} {t('ko\'rildi', 'просмотров')}</span>
        </div>
        <img src={item.image} className="object-cover w-full mb-6 rounded-xl" alt={item.title} />
        <div className="prose max-w-none">
          <p className="leading-relaxed text-gray-700">{item.content}</p>
        </div>
      </div>
    </div>
  );
}