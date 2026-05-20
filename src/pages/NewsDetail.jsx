import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function NewsDetail() {
  const { id } = useParams();
  const { t, adminData } = useContext(AppContext);
  const news = adminData.news.find(n => n.id === parseInt(id));
  
  if (!news) {
    return (
      <div className="min-h-screen text-center pt-28">
        <h2 className="text-xl">Yangilik topilmadi</h2>
        <Link to="/news" className="inline-block mt-4 text-primary">← Yangiliklarga qaytish</Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="max-w-4xl container-custom">
        <Link to="/news" className="inline-block mb-4 text-primary">← Yangiliklarga qaytish</Link>
        <h1 className="mb-4 text-2xl font-bold">{t(news.title, news.titleRu)}</h1>
        <div className="mb-4 text-sm text-gray-500">{news.date}</div>
        <img src={news.image} className="w-full mb-6 rounded-xl" alt={news.title} />
        <p className="leading-relaxed text-gray-700">{news.content}</p>
      </div>
    </div>
  );
}