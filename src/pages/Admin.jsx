import { useState, useEffect } from 'react';
import api, { setAuthToken } from '../services/api';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Data states
  const [dashboardStats, setDashboardStats] = useState({});
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [media, setMedia] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [partners, setPartners] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [settings, setSettings] = useState({});

  // Form states
  const [newsForm, setNewsForm] = useState({ title: '', summary: '', content: '', imageUrl: '', tags: '' });
  const [serviceForm, setServiceForm] = useState({ name: '', category: '', description: '', department: '', link: '', phone: '', email: '', icon: 'gear' });
  const [docForm, setDocForm] = useState({ title: '', type: 'Qaror', year: new Date().getFullYear(), fileUrl: '', description: '' });
  const [mediaForm, setMediaForm] = useState({ title: '', imageUrl: '', category: 'gallery', description: '' });
  const [statForm, setStatForm] = useState({ label: '', value: 0, icon: 'chart-line', prefix: '', suffix: '', color: 'blue', order: 0 });
  const [leadershipForm, setLeadershipForm] = useState({ name: '', position: '', image: '', phone: '', email: '', order: 0 });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', progress: 0, budget: '', status: 'active', deadline: '' });
  const [vacancyForm, setVacancyForm] = useState({ title: '', department: '', deadline: '', salary: '', requirements: '', description: '' });
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [partnerForm, setPartnerForm] = useState({ name: '', icon: 'building', url: '', order: 0 });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', position: '', text: '', rating: 5, image: '' });
  const [galleryForm, setGalleryForm] = useState({ title: '', image: '', category: '', description: '', order: 0 });
  const [heroSlideForm, setHeroSlideForm] = useState({ title: '', subtitle: '', description: '', image: '', cta1: '', cta2: '', order: 0, active: true });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', date: new Date().toISOString().split('T')[0], type: 'info', urgent: false });
  const [quickLinkForm, setQuickLinkForm] = useState({ icon: '', title: '', link: '', color: 'blue', order: 0 });
  const [settingsForm, setSettingsForm] = useState({ siteName: '', contactPhone: '', contactEmail: '', contactAddress: '', workingHours: '', socialLinks: {} });
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchAllData();
    }
  }, [token]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        dashboardRes, newsRes, servicesRes, docsRes, mediaRes, statsRes,
        contactsRes, subscribersRes, leadershipRes, projectsRes, vacanciesRes,
        faqsRes, partnersRes, testimonialsRes, galleryRes, heroSlidesRes,
        announcementsRes, quickLinksRes, settingsRes
      ] = await Promise.all([
        api.get('/dashboard-stats'),
        api.get('/news'),
        api.get('/services'),
        api.get('/documents'),
        api.get('/media'),
        api.get('/statistics'),
        api.get('/contact'),
        api.get('/subscribers'),
        api.get('/leadership'),
        api.get('/projects'),
        api.get('/vacancies'),
        api.get('/faqs'),
        api.get('/partners'),
        api.get('/testimonials'),
        api.get('/gallery'),
        api.get('/heroSlides'),
        api.get('/announcements'),
        api.get('/quickLinks'),
        api.get('/settings')
      ]);
      setDashboardStats(dashboardRes.data);
      setNews(newsRes.data);
      setServices(servicesRes.data);
      setDocuments(docsRes.data);
      setMedia(mediaRes.data);
      setStatistics(statsRes.data);
      setContacts(contactsRes.data);
      setSubscribers(subscribersRes.data);
      setLeadership(leadershipRes.data);
      setProjects(projectsRes.data);
      setVacancies(vacanciesRes.data);
      setFaqs(faqsRes.data);
      setPartners(partnersRes.data);
      setTestimonials(testimonialsRes.data);
      setGallery(galleryRes.data);
      setHeroSlides(heroSlidesRes.data);
      setAnnouncements(announcementsRes.data);
      setQuickLinks(quickLinksRes.data);
      setSettings(settingsRes.data);
      setSettingsForm(settingsRes.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email: loginEmail, password: loginPassword });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setToken(data.token);
      setLoginError('');
    } catch {
      setLoginError('Login yoki parol noto\'g\'ri!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setToken(null);
    setEditingId(null);
  };

  // Generic CRUD handlers
  const handleSubmit = async (resource, formData, setData, resetForm) => {
    try {
      if (editingId) {
        const res = await api.put(`/${resource}/${editingId}`, formData);
        setData(prev => prev.map(item => item.id === editingId ? res.data : item));
        showMessage(`${resource} muvaffaqiyatli yangilandi!`);
      } else {
        const res = await api.post(`/${resource}`, formData);
        setData(prev => [res.data, ...prev]);
        showMessage(`${resource} muvaffaqiyatli qo'shildi!`);
      }
      resetForm();
      setEditingId(null);
    } catch (error) {
      showMessage(`Xatolik: ${error.response?.data?.message || error.message}`, 'error');
    }
  };

  const handleDelete = async (resource, id, setData) => {
    if (confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      await api.delete(`/${resource}/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
      showMessage(`${resource} o'chirildi!`);
    }
  };

  const handleEdit = (item, setForm, setEditingId) => {
    setForm(item);
    setEditingId(item.id);
  };

  // Settings update
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/settings', settingsForm);
      setSettings(res.data);
      showMessage('Sozlamalar muvaffaqiyatli yangilandi!');
    } catch (error) {
      showMessage('Xatolik yuz berdi!', 'error');
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl">
              <i className="text-2xl text-white fas fa-lock"></i>
            </div>
            <h1 className="text-2xl font-bold">Admin paneliga kirish</h1>
            <p className="mt-1 text-sm text-gray-500">Iltimos, tizimga kiring</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
            <input type="password" placeholder="Parol" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
            {loginError && <div className="text-sm text-center text-red-500">{loginError}</div>}
            <button type="submit" className="justify-center w-full btn"><i className="fas fa-sign-in-alt"></i> Kirish</button>
          </form>
          <div className="mt-4 text-xs text-center text-gray-400">
            <p>Demo: admin@jondor.uz / Admin123!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-20 text-white shadow-lg bg-primary">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <i className="text-2xl fas fa-shield-alt"></i>
            <div>
              <h1 className="text-xl font-bold">Admin paneli</h1>
              <p className="text-xs text-primary-100">Jondor tumani portali</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 transition rounded-lg bg-white/20 hover:bg-white/30">
            <i className="fas fa-sign-out-alt"></i> Chiqish
          </button>
        </div>
      </header>

      {message.text && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} animate-fadeInUp`}>
          {message.text}
        </div>
      )}

      <div className="flex">
        <aside className="min-h-screen overflow-y-auto bg-white shadow-lg w-72">
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'tachometer-alt' },
              { id: 'news', label: 'Yangiliklar', icon: 'newspaper' },
              { id: 'services', label: 'Xizmatlar', icon: 'gear' },
              { id: 'documents', label: 'Hujjatlar', icon: 'file-pdf' },
              { id: 'media', label: 'Media galereya', icon: 'image' },
              { id: 'statistics', label: 'Statistika', icon: 'chart-line' },
              { id: 'heroSlides', label: 'Hero Slider', icon: 'images' },
              { id: 'leadership', label: 'Rahbariyat', icon: 'users' },
              { id: 'projects', label: 'Loyihalar', icon: 'building' },
              { id: 'vacancies', label: 'Vakansiyalar', icon: 'briefcase' },
              { id: 'faqs', label: 'FAQ', icon: 'question-circle' },
              { id: 'partners', label: 'Hamkorlar', icon: 'handshake' },
              { id: 'testimonials', label: 'Fikrlar', icon: 'comment' },
              { id: 'gallery', label: 'Galereya', icon: 'images' },
              { id: 'announcements', label: "E'lonlar", icon: 'bullhorn' },
              { id: 'quickLinks', label: 'Tezkor havolalar', icon: 'link' },
              { id: 'subscribers', label: 'Obunalar', icon: 'bell' },
              { id: 'contacts', label: 'Xabarlar', icon: 'envelope' },
              { id: 'settings', label: 'Sozlamalar', icon: 'cog' }
            ].map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditingId(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
                <i className={`fas fa-${tab.icon} w-5`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {loading && <div className="py-10 text-center"><i className="text-3xl fas fa-spinner fa-spin text-primary"></i></div>}

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
              <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-4">
                {[
                  { label: 'Yangiliklar', value: dashboardStats.newsCount || 0, icon: 'newspaper', color: 'blue' },
                  { label: 'Xizmatlar', value: dashboardStats.servicesCount || 0, icon: 'gear', color: 'green' },
                  { label: 'Hujjatlar', value: dashboardStats.documentsCount || 0, icon: 'file-pdf', color: 'red' },
                  { label: 'Media', value: dashboardStats.mediaCount || 0, icon: 'image', color: 'purple' },
                  { label: 'Xabarlar', value: dashboardStats.contactsCount || 0, icon: 'envelope', color: 'orange' },
                  { label: 'Obunalar', value: dashboardStats.subscribersCount || 0, icon: 'bell', color: 'teal' },
                  { label: 'Loyihalar', value: dashboardStats.projectsCount || 0, icon: 'building', color: 'indigo' },
                  { label: 'Vakansiyalar', value: dashboardStats.vacanciesCount || 0, icon: 'briefcase', color: 'pink' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-6 bg-white shadow-lg rounded-2xl">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                      <i className={`fas fa-${stat.icon} text-${stat.color}-600 text-xl`}></i>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                  <h3 className="mb-4 text-lg font-bold">So'nggi yangiliklar</h3>
                  {news.slice(0, 5).map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                  <h3 className="mb-4 text-lg font-bold">So'nggi xabarlar</h3>
                  {contacts.slice(0, 5).map(item => (
                    <div key={item.id} className="py-2 border-b">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.message.substring(0, 50)}...</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                  <i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Yangilikni tahrirlash' : 'Yangi yangilik qo\'shish'}
                </h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('news', newsForm, setNews, () => setNewsForm({ title: '', summary: '', content: '', imageUrl: '', tags: '' })); }} className="grid gap-4">
                  <input value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} placeholder="Sarlavha" className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" required />
                  <input value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} placeholder="Qisqa mazmun" className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" required />
                  <textarea value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} placeholder="To'liq matn" rows="6" className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" required />
                  <input value={newsForm.imageUrl} onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })} placeholder="Rasm URL" className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input value={newsForm.tags} onChange={(e) => setNewsForm({ ...newsForm, tags: e.target.value })} placeholder="Teglar (vergul bilan)" className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setNewsForm({ title: '', summary: '', content: '', imageUrl: '', tags: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Yangiliklar ({news.length})</h2></div>
                <div className="divide-y">
                  {news.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setNewsForm, setEditingId)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('news', item.id, setNews)} className="p-2 text-red-600 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Xizmatni tahrirlash' : 'Yangi xizmat qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('services', serviceForm, setServices, () => setServiceForm({ name: '', category: '', description: '', department: '', link: '', phone: '', email: '', icon: 'gear' })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} placeholder="Xizmat nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })} placeholder="Kategoriya" className="px-4 py-3 border rounded-xl" />
                  <textarea value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Qisqa tavsif" className="col-span-2 px-4 py-3 border rounded-xl" required />
                  <input value={serviceForm.department} onChange={(e) => setServiceForm({ ...serviceForm, department: e.target.value })} placeholder="Bo'lim" className="px-4 py-3 border rounded-xl" />
                  <input value={serviceForm.link} onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })} placeholder="Link" className="px-4 py-3 border rounded-xl" />
                  <input value={serviceForm.phone} onChange={(e) => setServiceForm({ ...serviceForm, phone: e.target.value })} placeholder="Telefon" className="px-4 py-3 border rounded-xl" />
                  <input value={serviceForm.email} onChange={(e) => setServiceForm({ ...serviceForm, email: e.target.value })} placeholder="Email" className="px-4 py-3 border rounded-xl" />
                  <input value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} placeholder="Icon" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setServiceForm({ name: '', category: '', description: '', department: '', link: '', phone: '', email: '', icon: 'gear' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Xizmatlar ({services.length})</h2></div>
                <div className="divide-y">
                  {services.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div><div className="font-medium">{item.name}</div><div className="text-sm text-gray-500">{item.department}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setServiceForm, setEditingId)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('services', item.id, setServices)} className="p-2 text-red-600 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Hujjatni tahrirlash' : 'Yangi hujjat qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('documents', docForm, setDocuments, () => setDocForm({ title: '', type: 'Qaror', year: new Date().getFullYear(), fileUrl: '', description: '' })); }} className="grid gap-4">
                  <input value={docForm.title} onChange={(e) => setDocForm({ ...docForm, title: e.target.value })} placeholder="Hujjat nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={docForm.type} onChange={(e) => setDocForm({ ...docForm, type: e.target.value })} placeholder="Turi" className="px-4 py-3 border rounded-xl" />
                  <input value={docForm.year} onChange={(e) => setDocForm({ ...docForm, year: Number(e.target.value) })} type="number" placeholder="Yil" className="px-4 py-3 border rounded-xl" />
                  <input value={docForm.fileUrl} onChange={(e) => setDocForm({ ...docForm, fileUrl: e.target.value })} placeholder="Fayl URL (PDF)" className="px-4 py-3 border rounded-xl" required />
                  <textarea value={docForm.description} onChange={(e) => setDocForm({ ...docForm, description: e.target.value })} placeholder="Izoh" className="px-4 py-3 border rounded-xl" />
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setDocForm({ title: '', type: 'Qaror', year: new Date().getFullYear(), fileUrl: '', description: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Hujjatlar ({documents.length})</h2></div>
                <div className="divide-y">
                  {documents.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{item.type} • {item.year}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setDocForm, setEditingId)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('documents', item.id, setDocuments)} className="p-2 text-red-600 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEDIA TAB */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Rasmni tahrirlash' : 'Yangi rasm qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('media', mediaForm, setMedia, () => setMediaForm({ title: '', imageUrl: '', category: 'gallery', description: '' })); }} className="grid gap-4">
                  <input value={mediaForm.title} onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })} placeholder="Rasm nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={mediaForm.imageUrl} onChange={(e) => setMediaForm({ ...mediaForm, imageUrl: e.target.value })} placeholder="Rasm URL" className="px-4 py-3 border rounded-xl" required />
                  <input value={mediaForm.category} onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })} placeholder="Kategoriya" className="px-4 py-3 border rounded-xl" />
                  <textarea value={mediaForm.description} onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })} placeholder="Tavsif" className="px-4 py-3 border rounded-xl" />
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setMediaForm({ title: '', imageUrl: '', category: 'gallery', description: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {media.map(item => (
                  <div key={item.id} className="overflow-hidden bg-white shadow-lg rounded-2xl">
                    <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-40" />
                    <div className="flex items-center justify-between p-3">
                      <div><p className="text-sm font-medium">{item.title}</p></div>
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(item, setMediaForm, setEditingId)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('media', item.id, setMedia)} className="p-2 text-red-600 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATISTICS TAB */}
          {activeTab === 'statistics' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Statistikani tahrirlash' : 'Yangi statistika qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('statistics', statForm, setStatistics, () => setStatForm({ label: '', value: 0, icon: 'chart-line', prefix: '', suffix: '', color: 'blue', order: 0 })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={statForm.label} onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} placeholder="Ko'rsatkich nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={statForm.value} onChange={(e) => setStatForm({ ...statForm, value: Number(e.target.value) })} type="number" placeholder="Qiymat" className="px-4 py-3 border rounded-xl" required />
                  <input value={statForm.icon} onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })} placeholder="Icon nomi" className="px-4 py-3 border rounded-xl" />
                  <input value={statForm.prefix} onChange={(e) => setStatForm({ ...statForm, prefix: e.target.value })} placeholder="Prefiks" className="px-4 py-3 border rounded-xl" />
                  <input value={statForm.suffix} onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })} placeholder="Suffiks" className="px-4 py-3 border rounded-xl" />
                  <select value={statForm.color} onChange={(e) => setStatForm({ ...statForm, color: e.target.value })} className="px-4 py-3 border rounded-xl">
                    <option value="blue">Ko'k</option>
                    <option value="green">Yashil</option>
                    <option value="purple">Binafsha</option>
                    <option value="red">Qizil</option>
                    <option value="orange">To'q sariq</option>
                    <option value="teal">Yashil-ko'k</option>
                  </select>
                  <input value={statForm.order} onChange={(e) => setStatForm({ ...statForm, order: Number(e.target.value) })} type="number" placeholder="Tartib raqami" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setStatForm({ label: '', value: 0, icon: 'chart-line', prefix: '', suffix: '', color: 'blue', order: 0 }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Statistikalar ({statistics.length})</h2></div>
                <div className="divide-y">
                  {statistics.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div><div className="font-medium">{item.label}</div><div className="text-sm text-gray-500">Qiymat: {item.value.toLocaleString()}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setStatForm, setEditingId)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('statistics', item.id, setStatistics)} className="p-2 text-red-600 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LEADERSHIP TAB */}
          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Rahbarni tahrirlash' : 'Yangi rahbar qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('leadership', leadershipForm, setLeadership, () => setLeadershipForm({ name: '', position: '', image: '', phone: '', email: '', order: 0 })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={leadershipForm.name} onChange={(e) => setLeadershipForm({ ...leadershipForm, name: e.target.value })} placeholder="Ism familiya" className="px-4 py-3 border rounded-xl" required />
                  <input value={leadershipForm.position} onChange={(e) => setLeadershipForm({ ...leadershipForm, position: e.target.value })} placeholder="Lavozimi" className="px-4 py-3 border rounded-xl" required />
                  <input value={leadershipForm.image} onChange={(e) => setLeadershipForm({ ...leadershipForm, image: e.target.value })} placeholder="Rasm URL" className="px-4 py-3 border rounded-xl" />
                  <input value={leadershipForm.phone} onChange={(e) => setLeadershipForm({ ...leadershipForm, phone: e.target.value })} placeholder="Telefon" className="px-4 py-3 border rounded-xl" />
                  <input value={leadershipForm.email} onChange={(e) => setLeadershipForm({ ...leadershipForm, email: e.target.value })} placeholder="Email" className="px-4 py-3 border rounded-xl" />
                  <input value={leadershipForm.order} onChange={(e) => setLeadershipForm({ ...leadershipForm, order: Number(e.target.value) })} type="number" placeholder="Tartib raqami" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setLeadershipForm({ name: '', position: '', image: '', phone: '', email: '', order: 0 }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {leadership.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow-lg rounded-2xl">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="object-cover w-12 h-12 rounded-full" />
                      <div><div className="font-medium">{item.name}</div><div className="text-sm text-gray-500">{item.position}</div></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item, setLeadershipForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete('leadership', item.id, setLeadership)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('projects', projectForm, setProjects, () => setProjectForm({ title: '', description: '', progress: 0, budget: '', status: 'active', deadline: '' })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Loyiha nomi" className="px-4 py-3 border rounded-xl" required />
                  <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Tavsif" className="px-4 py-3 border rounded-xl" />
                  <input value={projectForm.progress} onChange={(e) => setProjectForm({ ...projectForm, progress: Number(e.target.value) })} type="number" placeholder="Progress %" className="px-4 py-3 border rounded-xl" />
                  <input value={projectForm.budget} onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })} placeholder="Byudjet" className="px-4 py-3 border rounded-xl" />
                  <select value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} className="px-4 py-3 border rounded-xl">
                    <option value="active">Amalda</option>
                    <option value="completed">Tugallangan</option>
                  </select>
                  <input value={projectForm.deadline} onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })} type="date" placeholder="Muddat" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setProjectForm({ title: '', description: '', progress: 0, budget: '', status: 'active', deadline: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="space-y-3">
                {projects.map(item => (
                  <div key={item.id} className="p-4 bg-white shadow-lg rounded-2xl">
                    <div className="flex items-start justify-between mb-2">
                      <div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{item.budget}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setProjectForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('projects', item.id, setProjects)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VACANCIES TAB */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Vakansiyani tahrirlash' : 'Yangi vakansiya qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('vacancies', vacancyForm, setVacancies, () => setVacancyForm({ title: '', department: '', deadline: '', salary: '', requirements: '', description: '' })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={vacancyForm.title} onChange={(e) => setVacancyForm({ ...vacancyForm, title: e.target.value })} placeholder="Lavozim nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={vacancyForm.department} onChange={(e) => setVacancyForm({ ...vacancyForm, department: e.target.value })} placeholder="Bo'lim" className="px-4 py-3 border rounded-xl" />
                  <input value={vacancyForm.deadline} onChange={(e) => setVacancyForm({ ...vacancyForm, deadline: e.target.value })} type="date" placeholder="Muddat" className="px-4 py-3 border rounded-xl" />
                  <input value={vacancyForm.salary} onChange={(e) => setVacancyForm({ ...vacancyForm, salary: e.target.value })} placeholder="Maosh" className="px-4 py-3 border rounded-xl" />
                  <textarea value={vacancyForm.requirements} onChange={(e) => setVacancyForm({ ...vacancyForm, requirements: e.target.value })} placeholder="Talablar" className="col-span-2 px-4 py-3 border rounded-xl" />
                  <textarea value={vacancyForm.description} onChange={(e) => setVacancyForm({ ...vacancyForm, description: e.target.value })} placeholder="To'liq tavsif" className="col-span-2 px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setVacancyForm({ title: '', department: '', deadline: '', salary: '', requirements: '', description: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Vakansiyalar ({vacancies.length})</h2></div>
                <div className="divide-y">
                  {vacancies.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{item.department} • {item.salary}</div></div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setVacancyForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('vacancies', item.id, setVacancies)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ TAB */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Savolni tahrirlash' : 'Yangi savol qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('faqs', faqForm, setFaqs, () => setFaqForm({ question: '', answer: '' })); }} className="grid gap-4">
                  <input value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} placeholder="Savol" className="px-4 py-3 border rounded-xl" required />
                  <textarea value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} placeholder="Javob" rows="3" className="px-4 py-3 border rounded-xl" required />
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setFaqForm({ question: '', answer: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Savol-javoblar ({faqs.length})</h2></div>
                <div className="divide-y">
                  {faqs.map(item => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1"><div className="font-medium">{item.question}</div><div className="mt-1 text-sm text-gray-500">{item.answer}</div></div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item, setFaqForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                          <button onClick={() => handleDelete('faqs', item.id, setFaqs)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PARTNERS TAB */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Hamkorni tahrirlash' : 'Yangi hamkor qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('partners', partnerForm, setPartners, () => setPartnerForm({ name: '', icon: 'building', url: '', order: 0 })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} placeholder="Hamkor nomi" className="px-4 py-3 border rounded-xl" required />
                  <input value={partnerForm.icon} onChange={(e) => setPartnerForm({ ...partnerForm, icon: e.target.value })} placeholder="Icon (fa nomi)" className="px-4 py-3 border rounded-xl" />
                  <input value={partnerForm.url} onChange={(e) => setPartnerForm({ ...partnerForm, url: e.target.value })} placeholder="Sayt URL" className="px-4 py-3 border rounded-xl" />
                  <input value={partnerForm.order} onChange={(e) => setPartnerForm({ ...partnerForm, order: Number(e.target.value) })} type="number" placeholder="Tartib raqami" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setPartnerForm({ name: '', icon: 'building', url: '', order: 0 }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="flex flex-wrap gap-4">
                {partners.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-4 bg-white shadow-lg rounded-2xl">
                    <i className={`fas fa-${item.icon} text-2xl text-primary`}></i>
                    <div><div className="font-medium">{item.name}</div></div>
                    <button onClick={() => handleEdit(item, setPartnerForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDelete('partners', item.id, setPartners)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Fikrni tahrirlash' : 'Yangi fikr qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('testimonials', testimonialForm, setTestimonials, () => setTestimonialForm({ name: '', position: '', text: '', rating: 5, image: '' })); }} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="Ism familiya" className="px-4 py-3 border rounded-xl" required />
                    <input value={testimonialForm.position} onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })} placeholder="Lavozimi" className="px-4 py-3 border rounded-xl" />
                  </div>
                  <textarea value={testimonialForm.text} onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })} placeholder="Fikr matni" rows="3" className="px-4 py-3 border rounded-xl" required />
                  <div className="grid gap-4 md:grid-cols-2">
                    <select value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })} className="px-4 py-3 border rounded-xl">
                      {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} yulduz</option>)}
                    </select>
                    <input value={testimonialForm.image} onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })} placeholder="Rasm URL" className="px-4 py-3 border rounded-xl" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setTestimonialForm({ name: '', position: '', text: '', rating: 5, image: '' }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {testimonials.map(item => (
                  <div key={item.id} className="p-4 bg-white shadow-lg rounded-2xl">
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="object-cover w-10 h-10 rounded-full" />
                        <div><div className="font-medium">{item.name}</div><div className="text-xs text-gray-500">{item.position}</div></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setTestimonialForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('testimonials', item.id, setTestimonials)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm italic text-gray-600">"{item.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO SLIDES TAB */}
          {activeTab === 'heroSlides' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Slaydni tahrirlash' : 'Yangi slayd qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('heroSlides', heroSlideForm, setHeroSlides, () => setHeroSlideForm({ title: '', subtitle: '', description: '', image: '', cta1: '', cta2: '', order: 0, active: true })); }} className="grid gap-4">
                  <input value={heroSlideForm.title} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })} placeholder="Sarlavha" className="px-4 py-3 border rounded-xl" required />
                  <input value={heroSlideForm.subtitle} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })} placeholder="Kichik sarlavha" className="px-4 py-3 border rounded-xl" required />
                  <textarea value={heroSlideForm.description} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, description: e.target.value })} placeholder="Tavsif" rows="2" className="px-4 py-3 border rounded-xl" />
                  <input value={heroSlideForm.image} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, image: e.target.value })} placeholder="Rasm URL" className="px-4 py-3 border rounded-xl" required />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={heroSlideForm.cta1} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, cta1: e.target.value })} placeholder="Birinchi tugma matni" className="px-4 py-3 border rounded-xl" />
                    <input value={heroSlideForm.cta2} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, cta2: e.target.value })} placeholder="Ikkinchi tugma matni" className="px-4 py-3 border rounded-xl" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={heroSlideForm.order} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, order: Number(e.target.value) })} type="number" placeholder="Tartib raqami" className="px-4 py-3 border rounded-xl" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={heroSlideForm.active} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, active: e.target.checked })} className="w-5 h-5" />
                      <span>Aktiv</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setHeroSlideForm({ title: '', subtitle: '', description: '', image: '', cta1: '', cta2: '', order: 0, active: true }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="space-y-3">
                {heroSlides.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow-lg rounded-2xl">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.title} className="object-cover w-20 h-16 rounded-lg" />
                      <div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{item.subtitle}</div></div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{item.active ? 'Aktiv' : 'Aktiv emas'}</span>
                      <button onClick={() => handleEdit(item, setHeroSlideForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete('heroSlides', item.id, setHeroSlides)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS TAB */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? "E'lonni tahrirlash" : "Yangi e'lon qo'shish"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('announcements', announcementForm, setAnnouncements, () => setAnnouncementForm({ title: '', date: new Date().toISOString().split('T')[0], type: 'info', urgent: false })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} placeholder="E'lon matni" className="col-span-2 px-4 py-3 border rounded-xl" required />
                  <input value={announcementForm.date} onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })} type="date" className="px-4 py-3 border rounded-xl" />
                  <select value={announcementForm.type} onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })} className="px-4 py-3 border rounded-xl">
                    <option value="info">Ma'lumot</option>
                    <option value="warning">Ogohlantirish</option>
                    <option value="important">Muhim</option>
                  </select>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={announcementForm.urgent} onChange={(e) => setAnnouncementForm({ ...announcementForm, urgent: e.target.checked })} className="w-5 h-5" />
                    <span>Shoshilinch</span>
                  </label>
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setAnnouncementForm({ title: '', date: new Date().toISOString().split('T')[0], type: 'info', urgent: false }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">E'lonlar ({announcements.length})</h2></div>
                <div className="divide-y">
                  {announcements.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item, setAnnouncementForm, setEditingId)} className="p-2 text-blue-600"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('announcements', item.id, setAnnouncements)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUICK LINKS TAB */}
          {activeTab === 'quickLinks' && (
            <div className="space-y-6">
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="mb-4 text-xl font-bold"><i className="fas fa-plus-circle text-primary"></i> {editingId ? 'Havolani tahrirlash' : 'Yangi havola qo\'shish'}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('quickLinks', quickLinkForm, setQuickLinks, () => setQuickLinkForm({ icon: '', title: '', link: '', color: 'blue', order: 0 })); }} className="grid gap-4 md:grid-cols-2">
                  <input value={quickLinkForm.icon} onChange={(e) => setQuickLinkForm({ ...quickLinkForm, icon: e.target.value })} placeholder="Icon (fa nomi)" className="px-4 py-3 border rounded-xl" required />
                  <input value={quickLinkForm.title} onChange={(e) => setQuickLinkForm({ ...quickLinkForm, title: e.target.value })} placeholder="Sarlavha" className="px-4 py-3 border rounded-xl" required />
                  <input value={quickLinkForm.link} onChange={(e) => setQuickLinkForm({ ...quickLinkForm, link: e.target.value })} placeholder="Havola" className="px-4 py-3 border rounded-xl" />
                  <select value={quickLinkForm.color} onChange={(e) => setQuickLinkForm({ ...quickLinkForm, color: e.target.value })} className="px-4 py-3 border rounded-xl">
                    <option value="blue">Ko'k</option>
                    <option value="green">Yashil</option>
                    <option value="purple">Binafsha</option>
                    <option value="red">Qizil</option>
                    <option value="orange">To'q sariq</option>
                  </select>
                  <input value={quickLinkForm.order} onChange={(e) => setQuickLinkForm({ ...quickLinkForm, order: Number(e.target.value) })} type="number" placeholder="Tartib raqami" className="px-4 py-3 border rounded-xl" />
                  <div className="flex col-span-2 gap-3">
                    <button type="submit" className="btn">{editingId ? 'Yangilash' : 'Qo\'shish'}</button>
                    {editingId && <button type="button" onClick={() => { setEditingId(null); setQuickLinkForm({ icon: '', title: '', link: '', color: 'blue', order: 0 }); }} className="btn-outline">Bekor qilish</button>}
                  </div>
                </form>
              </div>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map(item => (
                  <div key={item.id} className={`bg-${item.color}-100 rounded-xl p-3 flex items-center gap-2`}>
                    <i className={`fas fa-${item.icon} text-${item.color}-600`}></i>
                    <span>{item.title}</span>
                    <button onClick={() => handleEdit(item, setQuickLinkForm, setEditingId)} className="p-1 text-blue-600"><i className="fas fa-edit"></i></button>
                    <button onClick={() => handleDelete('quickLinks', item.id, setQuickLinks)} className="p-1 text-red-600"><i className="fas fa-trash"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBSCRIBERS TAB */}
          {activeTab === 'subscribers' && (
            <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
              <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Obunachilar ({subscribers.length})</h2></div>
              <div className="divide-y">
                {subscribers.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div><div className="font-medium">{item.email}</div><div className="text-sm text-gray-500">{new Date(item.subscribedAt).toLocaleDateString()}</div></div>
                    <button onClick={() => handleDelete('subscribers', item.id, setSubscribers)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
              <div className="px-6 py-4 border-b bg-gray-50"><h2 className="font-semibold">Xabarlar ({contacts.length})</h2></div>
              <div className="divide-y">
                {contacts.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.email} • {item.phone}</div>
                        <div className="mt-2 text-sm text-gray-700">{item.message}</div>
                        <div className="mt-1 text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <select value={item.status || 'new'} onChange={async (e) => {
                          await api.put(`/contact/${item.id}`, { ...item, status: e.target.value });
                          fetchAllData();
                        }} className="px-2 py-1 text-xs border rounded">
                          <option value="new">Yangi</option>
                          <option value="read">O'qilgan</option>
                          <option value="replied">Javob berilgan</option>
                        </select>
                        <button onClick={() => handleDelete('contact', item.id, setContacts)} className="p-2 text-red-600"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <h2 className="mb-4 text-xl font-bold">Sayt sozlamalari</h2>
              <form onSubmit={handleSettingsSubmit} className="grid gap-4">
                <input value={settingsForm.siteName} onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })} placeholder="Sayt nomi" className="px-4 py-3 border rounded-xl" />
                <input value={settingsForm.contactPhone} onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })} placeholder="Telefon" className="px-4 py-3 border rounded-xl" />
                <input value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })} placeholder="Email" className="px-4 py-3 border rounded-xl" />
                <input value={settingsForm.contactAddress} onChange={(e) => setSettingsForm({ ...settingsForm, contactAddress: e.target.value })} placeholder="Manzil" className="px-4 py-3 border rounded-xl" />
                <input value={settingsForm.workingHours} onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })} placeholder="Ish vaqti" className="px-4 py-3 border rounded-xl" />
                <div className="grid gap-4 md:grid-cols-2">
                  <input value={settingsForm.socialLinks?.telegram || ''} onChange={(e) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, telegram: e.target.value } })} placeholder="Telegram URL" className="px-4 py-3 border rounded-xl" />
                  <input value={settingsForm.socialLinks?.facebook || ''} onChange={(e) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, facebook: e.target.value } })} placeholder="Facebook URL" className="px-4 py-3 border rounded-xl" />
                  <input value={settingsForm.socialLinks?.instagram || ''} onChange={(e) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, instagram: e.target.value } })} placeholder="Instagram URL" className="px-4 py-3 border rounded-xl" />
                  <input value={settingsForm.socialLinks?.youtube || ''} onChange={(e) => setSettingsForm({ ...settingsForm, socialLinks: { ...settingsForm.socialLinks, youtube: e.target.value } })} placeholder="YouTube URL" className="px-4 py-3 border rounded-xl" />
                </div>
                <button type="submit" className="btn"><i className="fas fa-save"></i> Sozlamalarni saqlash</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}