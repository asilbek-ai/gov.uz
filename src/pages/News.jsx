import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function News() {
  const { t, news } = useContext(AppContext);
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Yangiliklar', 'Новости')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Eng muhim voqealar', 'Самые важные события')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map(item => (
            <Link key={item.id} to={`/news/${item.id}`} className="transition bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
              <img src={item.image} className="object-cover w-full h-48 rounded-t-xl" alt={item.title} />
              <div className="p-4">
                <p className="mb-2 text-xs text-gray-500"><i className="mr-1 far fa-calendar-alt"></i> {item.date}</p>
                <h3 className="mb-2 text-lg font-bold line-clamp-2">{t(item.title, item.titleRu)}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
                <span className="inline-block mt-3 text-sm text-primary">{t('Davomi', 'Подробнее')} →</span>
              </div>
            </Link>
          ))}
        </div>
        
        {news.length === 0 && (
          <div className="py-12 text-center">
            <i className="mb-4 text-5xl text-gray-300 fas fa-newspaper"></i>
            <p className="text-gray-500">Hech qanday yangilik yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
}