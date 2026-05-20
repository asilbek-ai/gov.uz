import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [tags, setTags] = useState(['all']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/news');
        setNews(res.data);
        const allTags = ['all', ...new Set(res.data.flatMap(n => n.tags || []))];
        setTags(allTags);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || (item.tags && item.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Yangiliklar</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp delay-100">
            Jondor tumanidagi eng so'nggi yangiliklar va voqealar
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-30">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Yangiliklarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag === 'all' ? 'Barchasi' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container-max">
          {loading ? (
            <div className="text-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Hech qanday yangilik topilmadi</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden h-56">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                      {new Date(item.date).toLocaleDateString('uz-UZ')}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {item.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                        Davomi <i className="fas fa-arrow-right text-xs"></i>
                      </span>
                      <span className="text-xs text-gray-400">
                        <i className="far fa-eye mr-1"></i> 234
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}