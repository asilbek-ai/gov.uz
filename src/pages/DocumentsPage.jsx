import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import api from '../services/api';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [types, setTypes] = useState(['all']);
  const [years, setYears] = useState(['all']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await api.get('/documents');
        setDocuments(res.data);
        const uniqueTypes = ['all', ...new Set(res.data.map(d => d.type).filter(Boolean))];
        const uniqueYears = ['all', ...new Set(res.data.map(d => d.year).filter(Boolean))];
        setTypes(uniqueTypes);
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesYear = selectedYear === 'all' || doc.year == selectedYear;
    return matchesSearch && matchesType && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-r from-primary to-primaryDark">
        <div className="container-max text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Hujjatlar</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fadeInUp delay-100">
            Qonunlar, qarorlar va boshqa rasmiy hujjatlar
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-30">
        <div className="container-max">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Hujjatlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type === 'all' ? 'Barcha turlar' : type}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year === 'all' ? 'Barcha yillar' : year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-16">
        <div className="container-max">
          {loading ? (
            <div className="text-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Hech qanday hujjat topilmadi</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-semibold text-gray-600">
                <div className="col-span-6">Hujjat nomi</div>
                <div className="col-span-2">Turi</div>
                <div className="col-span-2">Yili</div>
                <div className="col-span-2"></div>
              </div>
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition items-center">
                  <div className="col-span-6">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        {doc.description && <div className="text-xs text-gray-400">{doc.description}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{doc.type}</span>
                  </div>
                  <div className="col-span-2 text-gray-500">{doc.year}</div>
                  <div className="col-span-2">
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm inline-flex">
                      <i className="fas fa-download mr-1"></i> Yuklab olish
                    </a>
                  </div>
                </div>
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