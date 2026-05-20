import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [newsRes, allNewsRes] = await Promise.all([
          api.get(`/news/${id}`),
          api.get('/news')
        ]);
        setNews(newsRes.data);
        setRelatedNews(allNewsRes.data.filter(n => n.id != id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container-max py-32 text-center">
          <i className="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Yangilik topilmadi</h2>
          <Link to="/news" className="btn mt-4">Yangiliklarga qaytish</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">{news.title}</h1>
          <div className="flex justify-center gap-4 text-sm animate-fadeInUp delay-100">
            <span><i className="far fa-calendar-alt mr-1"></i> {new Date(news.date).toLocaleDateString('uz-UZ')}</span>
            <span><i className="far fa-user mr-1"></i> {news.author || 'Jondor Tumani Axborot Xizmati'}</span>
            <span><i className="far fa-eye mr-1"></i> 1234 marta o'qilgan</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {news.imageUrl && (
                  <img src={news.imageUrl} alt={news.title} className="w-full h-96 object-cover" />
                )}
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {news.tags && news.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{news.content}</p>
                  </div>
                  <div className="border-t mt-8 pt-6 flex justify-between items-center">
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <i className="fab fa-telegram"></i>
                      </button>
                      <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <i className="fab fa-twitter"></i>
                      </button>
                    </div>
                    <Link to="/news" className="text-primary hover:underline">
                      <i className="fas fa-arrow-left mr-1"></i> Barcha yangiliklar
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-newspaper text-primary"></i> So'nggi yangiliklar
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map(item => (
                      <Link key={item.id} to={`/news/${item.id}`} className="flex gap-3 group">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                        )}
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('uz-UZ')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary to-primaryDark rounded-2xl p-6 text-white text-center">
                  <i className="fas fa-bell text-4xl mb-3"></i>
                  <h3 className="text-xl font-bold mb-2">Yangiliklardan xabardor bo'ling</h3>
                  <p className="text-sm mb-4 opacity-90">Eng so'nggi yangiliklarni email orqali oling</p>
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 mb-3"
                  />
                  <button className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 w-full">
                    Obuna bo'lish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}