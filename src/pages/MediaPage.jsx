import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get('/media');
        setMedia(res.data);
        const uniqueCategories = ['all', ...new Set(res.data.map(m => m.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const filteredMedia = selectedCategory === 'all' 
    ? media 
    : media.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Media galereya</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp delay-100">
            Rasmlar va videolar orqali tuman hayoti
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-30">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Barchasi' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-max">
          {loading ? (
            <div className="text-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-image text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Hech qanday rasm topilmadi</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedMedia(item)}
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.category}</p>
                    <p className="text-white/60 text-xs mt-1">{item.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <i className="fas fa-search-plus text-white"></i>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <i className="fas fa-calendar-alt mr-1"></i> {new Date(item.date).toLocaleDateString('uz-UZ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Video lavhalar</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Tuman hayotidan eng qiziqarli lahzalar</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer">
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1541844053589-346841d0a17f?w=600" alt="Video" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <i className="fas fa-play text-white text-3xl ml-1"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer">
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600" alt="Video" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/30 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <i className="fas fa-play text-white text-3xl ml-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeInUp" onClick={() => setSelectedMedia(null)}>
          <div className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMedia.imageUrl} alt={selectedMedia.title} className="w-full max-h-[80vh] object-contain bg-gray-900" />
            <div className="p-5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{selectedMedia.title}</h3>
                <p className="text-sm text-gray-500">{selectedMedia.category}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedMedia.description}</p>
              </div>
              <button onClick={() => setSelectedMedia(null)} className="btn-outline">
                <i className="fas fa-times mr-1"></i> Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}