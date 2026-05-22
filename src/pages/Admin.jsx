import React, { useState, useContext, useEffect } from 'react';
import AdminDocuments from './AdminDocuments';
import AdminFaq from './AdminFaq';
import AdminLeadership from './AdminLeadership';
import { AppContext } from '../App';

export default function Admin() {
  const { 
    t, isAdmin, login, logout,
    news, deleteNews, addNews,
    services, deleteService, addService,
    statistics, deleteStatistic, addStatistic,
    organizations, deleteOrganization, addOrganization,
    gallery, deleteGallery, addGallery,
    carousel, deleteCarousel, addCarousel,
    leadership, deleteLeadership, addLeadership,
    documents, deleteDocument, addDocument,
    faqs, deleteFaq, addFaq,
    contacts, subscribers,
    receptionHours, updateReceptionHours
  } = useContext(AppContext);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Form states
  const [newsForm, setNewsForm] = useState({ title: '', titleRu: '', content: '', image: '' });
  const [serviceForm, setServiceForm] = useState({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
  const [statForm, setStatForm] = useState({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });
  const [orgForm, setOrgForm] = useState({ name: '', nameRu: '', phone: '', email: '', address: '' });
  const [galleryForm, setGalleryForm] = useState({ image: '', title: '', titleRu: '' });
  const [carouselForm, setCarouselForm] = useState({ image: '', title: '', titleRu: '' });
  const [leaderForm, setLeaderForm] = useState({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
  const [faqForm, setFaqForm] = useState({ question: '', questionRu: '', answer: '', answerRu: '' });
  
  // Reception Hours Form
  const [receptionForm, setReceptionForm] = useState({
    governor: { days: 'Dushanba - Juma', daysRu: 'Понедельник - Пятница', time: '15:00 - 17:00', location: 'Hokimiyat binosi, 2-qavat', locationRu: 'Здание хокимията, 2-этаж' },
    citizens: { days: 'Har payshanba', daysRu: 'Каждый четверг', time: '10:00 - 13:00', phone: '+998 65 380-00-00', phoneRu: '+998 65 380-00-00' }
  });

  useEffect(() => {
    if (receptionHours) {
      setReceptionForm(receptionHours);
    }
  }, [receptionHours]);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginData.username, loginData.password);
    if (success) {
      setError('');
      showMessage('✨ Xush kelibsiz!');
    } else {
      setError('⚠️ Login yoki parol xato!');
    }
  };

  const handleImageUpload = (e, setForm, field) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result }));
        setUploading(false);
        showMessage('🖼️ Rasm yuklandi!');
      };
      reader.readAsDataURL(file);
    } else {
      showMessage('❌ Faqat rasm fayllari!', 'error');
    }
  };

  const handleAddNews = () => {
    if (!newsForm.title) { showMessage('❌ Sarlavha kiritilmadi', 'error'); return; }
    addNews({ ...newsForm, id: Date.now(), date: new Date().toISOString().split('T')[0], views: 0 });
    setNewsForm({ title: '', titleRu: '', content: '', image: '' });
    showMessage('✅ Yangilik qo\'shildi!');
  };

  const handleAddService = () => {
    if (!serviceForm.name) { showMessage('❌ Xizmat nomi kiritilmadi', 'error'); return; }
    addService({ ...serviceForm, id: Date.now() });
    setServiceForm({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
    showMessage('✅ Xizmat qo\'shildi!');
  };

  const handleAddStatistic = () => {
    if (!statForm.label) { showMessage('❌ Statistika nomi kiritilmadi', 'error'); return; }
    addStatistic({ ...statForm, id: Date.now() });
    setStatForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });
    showMessage('✅ Statistika qo\'shildi!');
  };

  const handleAddOrganization = () => {
    if (!orgForm.name) { showMessage('❌ Tashkilot nomi kiritilmadi', 'error'); return; }
    addOrganization({ ...orgForm, id: Date.now() });
    setOrgForm({ name: '', nameRu: '', phone: '', email: '', address: '' });
    showMessage('✅ Tashkilot qo\'shildi!');
  };

  const handleAddGallery = () => {
    if (!galleryForm.image) { showMessage('❌ Rasm tanlanmadi', 'error'); return; }
    addGallery({ ...galleryForm, id: Date.now() });
    setGalleryForm({ image: '', title: '', titleRu: '' });
    showMessage('✅ Rasm qo\'shildi!');
  };

  const handleAddCarousel = () => {
    if (!carouselForm.image) { showMessage('❌ Rasm tanlanmadi', 'error'); return; }
    addCarousel({ ...carouselForm, id: Date.now() });
    setCarouselForm({ image: '', title: '', titleRu: '' });
    showMessage('✅ Karusel rasmi qo\'shildi!');
  };

  const handleAddLeadership = () => {
    if (!leaderForm.name) { showMessage('❌ Rahbar nomi kiritilmadi', 'error'); return; }
    addLeadership({ ...leaderForm, id: Date.now() });
    setLeaderForm({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
    showMessage('✅ Rahbar qo\'shildi!');
  };

  const handleAddFaq = () => {
    if (!faqForm.question) { showMessage('❌ Savol kiritilmadi', 'error'); return; }
    addFaq({ ...faqForm, id: Date.now() });
    setFaqForm({ question: '', questionRu: '', answer: '', answerRu: '' });
    showMessage('✅ FAQ qo\'shildi!');
  };

  const handleUpdateReception = () => {
    updateReceptionHours(receptionForm);
    showMessage('✅ Qabul jadvali yangilandi!');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003580] to-[#001a4a] p-4">
        <div className="w-full max-w-md p-8 border shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-white/20">
          <div className="mb-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <i className="text-4xl text-white fas fa-landmark"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            <p className="mt-1 text-sm text-gray-500">Jondor tumani boshqaruvi</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <i className="absolute text-gray-400 -translate-y-1/2 fas fa-user left-4 top-1/2"></i>
              <input 
                type="text" 
                placeholder="Login" 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/20 transition"
                value={loginData.username} 
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="relative">
              <i className="absolute text-gray-400 -translate-y-1/2 fas fa-lock left-4 top-1/2"></i>
              <input 
                type="password" 
                placeholder="Parol" 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/20 transition"
                value={loginData.password} 
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            {error && <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#003580] to-[#0066cc] text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <i className="mr-2 fas fa-sign-in-alt"></i> Kirish
            </button>
            <p className="text-xs text-center text-gray-400">Demo: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
    { id: 'news', label: 'Yangiliklar', icon: 'newspaper', color: 'green', bg: 'bg-green-50', text: 'text-green-600' },
    { id: 'services', label: 'Xizmatlar', icon: 'th-large', color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
    { id: 'statistics', label: 'Statistika', icon: 'chart-bar', color: 'orange', bg: 'bg-orange-50', text: 'text-orange-600' },
    { id: 'organizations', label: 'Tashkilotlar', icon: 'building', color: 'red', bg: 'bg-red-50', text: 'text-red-600' },
    { id: 'documents', label: 'Hujjatlar', icon: 'file-alt', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
    { id: 'gallery', label: 'Galereya', icon: 'images', color: 'pink', bg: 'bg-pink-50', text: 'text-pink-600' },
    { id: 'carousel', label: 'Karusel', icon: 'sliders-h', color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { id: 'reception', label: 'Qabul jadvali', icon: 'calendar-alt', color: 'yellow', bg: 'bg-yellow-50', text: 'text-yellow-600' },
    { id: 'leadership', label: 'Rahbariyat', icon: 'users', color: 'teal', bg: 'bg-teal-50', text: 'text-teal-600' },
    { id: 'faq', label: 'FAQ', icon: 'question-circle', color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
    { id: 'contacts', label: 'Murojaatlar', icon: 'envelope', color: 'red', bg: 'bg-red-50', text: 'text-red-600' },
    { id: 'subscribers', label: 'Obunalar', icon: 'bell', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Toast Message */}
      {message && (
        <div className={`fixed top-24 right-4 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideInRight ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
          {message.text}
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-2xl transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-[#003580] to-[#0066cc] p-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
              <i className="text-2xl text-white fas fa-landmark"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-white/70">Jondor tumani</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-4 text-white/70 hover:text-white md:hidden">
            <i className="text-xl fas fa-times"></i>
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-5 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4 px-3 overflow-y-auto h-[calc(100%-200px)]">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5 transition-all duration-200 ${
                activeTab === item.id 
                  ? `${item.bg} ${item.text} shadow-md` 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activeTab === item.id ? item.bg : 'bg-gray-100'}`}>
                <i className={`fas fa-${item.icon} text-sm ${activeTab === item.id ? item.text : 'text-gray-500'}`}></i>
              </div>
              <span className="flex-1 text-sm font-medium text-left">{item.label}</span>
              {item.id === 'contacts' && contacts.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">{contacts.length}</span>
              )}
              {item.id === 'subscribers' && subscribers.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">{subscribers.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <button
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Chiqish</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 transition rounded-lg hover:bg-gray-100">
            <i className="text-xl fas fa-bars text-[#003580]"></i>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <i className="fas fa-calendar-alt text-[#003580] text-sm"></i>
              <span className="text-sm text-gray-600">{new Date().toLocaleDateString('uz-UZ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-full flex items-center justify-center text-white shadow-md">
                <i className="text-sm fas fa-user"></i>
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">Admin</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="animate-fadeIn">
              <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
                <i className="fas fa-chart-line text-[#003580]"></i> Dashboard
              </h1>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                <div className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#003580]">{news.length}</div>
                      <div className="mt-1 text-sm text-gray-500">Yangiliklar</div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                      <i className="text-xl text-blue-600 fas fa-newspaper"></i>
                    </div>
                  </div>
                </div>
                <div className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#003580]">{services.length}</div>
                      <div className="mt-1 text-sm text-gray-500">Xizmatlar</div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                      <i className="text-xl text-purple-600 fas fa-th-large"></i>
                    </div>
                  </div>
                </div>
                <div className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#003580]">{organizations.length}</div>
                      <div className="mt-1 text-sm text-gray-500">Tashkilotlar</div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                      <i className="text-xl text-green-600 fas fa-building"></i>
                    </div>
                  </div>
                </div>
                <div className="p-5 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#003580]">{subscribers.length}</div>
                      <div className="mt-1 text-sm text-gray-500">Obunalar</div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                      <i className="text-xl text-orange-600 fas fa-bell"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800">
                  <i className="fas fa-envelope text-[#003580]"></i> So'nggi murojaatlar
                </h2>
                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                  {contacts.slice(0, 5).map(contact => (
                    <div key={contact.id} className="p-4 transition border-b hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                        <div className="text-xs text-gray-400">{contact.date}</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{contact.message?.slice(0, 100)}...</p>
                    </div>
                  ))}
                  {contacts.length === 0 && <div className="p-8 text-center text-gray-500">Hech qanday murojaat yo'q</div>}
                </div>
              </div>
            </div>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="animate-fadeIn">
              <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
                <i className="text-green-600 fas fa-newspaper"></i> Yangiliklar boshqaruvi
              </h1>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold"><i className="text-green-500 fas fa-plus-circle"></i> Yangilik qo'shish</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#003580]" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (RU)" className="w-full px-4 py-2.5 border rounded-lg" value={newsForm.titleRu} onChange={(e) => setNewsForm({ ...newsForm, titleRu: e.target.value })} />
                    <textarea placeholder="Matn" rows="4" className="w-full px-4 py-2.5 border rounded-lg" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}></textarea>
                    <div className="p-4 text-center border-2 border-dashed rounded-lg">
                      {newsForm.image ? (
                        <div className="relative inline-block">
                          <img src={newsForm.image} className="object-cover rounded-lg h-28" />
                          <button onClick={() => setNewsForm({ ...newsForm, image: '' })} className="absolute w-6 h-6 text-white bg-red-500 rounded-full -top-2 -right-2">×</button>
                        </div>
                      ) : (
                        <label className="block cursor-pointer">
                          <i className="mb-2 text-3xl text-gray-400 fas fa-cloud-upload-alt"></i>
                          <p className="text-sm text-gray-500">Rasm yuklash</p>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setNewsForm, 'image')} />
                        </label>
                      )}
                    </div>
                    <button onClick={handleAddNews} className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition">Qo'shish</button>
                  </div>
                </div>
                <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold"><i className="text-green-600 fas fa-list"></i> Yangiliklar ({news.length})</h3>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {news.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.date}</div>
                        </div>
                        <button onClick={() => deleteNews(item.id)} className="p-2 text-red-500 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                    {news.length === 0 && <div className="py-8 text-center text-gray-500">Hech qanday yangilik yo'q</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && <AdminDocuments />}

          {/* FAQ TAB */}
          {activeTab === 'faq' && <AdminFaq />}

          {/* LEADERSHIP TAB */}
          {activeTab === 'leadership' && <AdminLeadership />}

          {/* SERVICES TAB - Quick version */}
          {activeTab === 'services' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Xizmatlar boshqaruvi</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <input type="text" placeholder="Nomi (UZ)" className="w-full p-2 border rounded" value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})} />
                  <input type="text" placeholder="Icon" className="w-full p-2 border rounded" value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})} />
                  <textarea placeholder="Tavsif" rows="3" className="w-full p-2 border rounded" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} />
                  <button onClick={handleAddService} className="w-full p-2 text-white rounded bg-primary">Qo'shish</button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {services.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-2 border-b">
                      <span>{s.name}</span>
                      <button onClick={() => deleteService(s.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATISTICS TAB */}
          {activeTab === 'statistics' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Statistika boshqaruvi</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <input type="text" placeholder="Nomi (UZ)" className="w-full p-2 border rounded" value={statForm.label} onChange={e => setStatForm({...statForm, label: e.target.value})} />
                  <input type="number" placeholder="Qiymat" className="w-full p-2 border rounded" value={statForm.value} onChange={e => setStatForm({...statForm, value: parseInt(e.target.value)})} />
                  <select className="w-full p-2 border rounded" value={statForm.color} onChange={e => setStatForm({...statForm, color: e.target.value})}>
                    <option value="blue">Blue</option><option value="green">Green</option><option value="red">Red</option><option value="purple">Purple</option>
                  </select>
                  <button onClick={handleAddStatistic} className="w-full p-2 text-white rounded bg-primary">Qo'shish</button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {statistics.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-2 border-b">
                      <span>{s.label}: {s.value}</span>
                      <button onClick={() => deleteStatistic(s.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORGANIZATIONS TAB */}
          {activeTab === 'organizations' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Tashkilotlar boshqaruvi</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <input type="text" placeholder="Nomi (UZ)" className="w-full p-2 border rounded" value={orgForm.name} onChange={e => setOrgForm({...orgForm, name: e.target.value})} />
                  <input type="text" placeholder="Telefon" className="w-full p-2 border rounded" value={orgForm.phone} onChange={e => setOrgForm({...orgForm, phone: e.target.value})} />
                  <button onClick={handleAddOrganization} className="w-full p-2 text-white rounded bg-primary">Qo'shish</button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {organizations.map(o => (
                    <div key={o.id} className="flex items-center justify-between p-2 border-b">
                      <span>{o.name}</span>
                      <button onClick={() => deleteOrganization(o.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Galereya boshqaruvi</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-4 text-center border-2 border-dashed">
                    {galleryForm.image ? (
                      <img src={galleryForm.image} className="h-24 mx-auto rounded" />
                    ) : (
                      <label className="block cursor-pointer">
                        <i className="text-2xl text-gray-400 fas fa-cloud-upload-alt"></i>
                        <p className="text-sm">Rasm yuklash</p>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setGalleryForm, 'image')} />
                      </label>
                    )}
                  </div>
                  <input type="text" placeholder="Sarlavha" className="w-full p-2 border rounded" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} />
                  <button onClick={handleAddGallery} className="w-full p-2 text-white rounded bg-primary">Qo'shish</button>
                </div>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-96">
                  {gallery.map(g => (
                    <div key={g.id} className="relative group">
                      <img src={g.image} className="object-cover w-full h-24 rounded" />
                      <button onClick={() => deleteGallery(g.id)} className="absolute w-5 h-5 text-white bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"><i className="text-xs fas fa-trash"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CAROUSEL TAB */}
          {activeTab === 'carousel' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Karusel boshqaruvi</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="p-4 text-center border-2 border-dashed">
                    {carouselForm.image ? <img src={carouselForm.image} className="h-24 mx-auto rounded" /> : <label className="block cursor-pointer"><i className="text-2xl text-gray-400 fas fa-cloud-upload-alt"></i><p className="text-sm">Rasm yuklash</p><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setCarouselForm, 'image')} /></label>}
                  </div>
                  <input type="text" placeholder="Sarlavha" className="w-full p-2 border rounded" value={carouselForm.title} onChange={e => setCarouselForm({...carouselForm, title: e.target.value})} />
                  <button onClick={handleAddCarousel} className="w-full p-2 text-white rounded bg-primary">Qo'shish</button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {carousel.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-2 border rounded">
                      <img src={c.image} className="object-cover w-12 h-10 rounded" />
                      <span className="flex-1 text-sm">{c.title}</span>
                      <button onClick={() => deleteCarousel(c.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RECEPTION TAB */}
          {activeTab === 'reception' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Qabul jadvali boshqaruvi</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-blue-50">
                  <h3 className="mb-3 font-bold"><i className="mr-2 text-blue-600 fas fa-user-tie"></i> Tuman hokimi</h3>
                  <div className="space-y-2">
                    <input type="text" placeholder="Kunlar (UZ)" className="w-full p-2 border rounded" value={receptionForm.governor.days} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, days: e.target.value}})} />
                    <input type="text" placeholder="Vaqt" className="w-full p-2 border rounded" value={receptionForm.governor.time} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, time: e.target.value}})} />
                    <input type="text" placeholder="Manzil" className="w-full p-2 border rounded" value={receptionForm.governor.location} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, location: e.target.value}})} />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <h3 className="mb-3 font-bold"><i className="mr-2 text-green-600 fas fa-users"></i> Fuqarolar qabuli</h3>
                  <div className="space-y-2">
                    <input type="text" placeholder="Kunlar (UZ)" className="w-full p-2 border rounded" value={receptionForm.citizens.days} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, days: e.target.value}})} />
                    <input type="text" placeholder="Vaqt" className="w-full p-2 border rounded" value={receptionForm.citizens.time} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, time: e.target.value}})} />
                    <input type="text" placeholder="Telefon" className="w-full p-2 border rounded" value={receptionForm.citizens.phone} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, phone: e.target.value}})} />
                  </div>
                </div>
              </div>
              <button onClick={handleUpdateReception} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition"><i className="mr-2 fas fa-save"></i> Saqlash</button>
            </div>
          )}

          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Murojaatlar</h2>
              {contacts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">Hech qanday murojaat yo'q</div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-96">
                  {contacts.map(c => (
                    <div key={c.id} className="p-3 rounded-lg bg-gray-50">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.email}</div>
                      <p className="mt-1 text-sm">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUBSCRIBERS TAB */}
          {activeTab === 'subscribers' && (
            <div className="p-6 bg-white rounded-xl">
              <h2 className="mb-4 text-xl font-bold">Obunalar</h2>
              {subscribers.length === 0 ? (
                <div className="py-8 text-center text-gray-500">Hech qanday obuna yo'q</div>
              ) : (
                <div className="space-y-2">
                  {subscribers.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-2 border-b">
                      <span>{s.email}</span>
                      <span className="text-xs text-gray-400">{s.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}