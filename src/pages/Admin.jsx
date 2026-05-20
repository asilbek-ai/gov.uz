import { useState, useContext, useEffect } from 'react';
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
    contacts, subscribers
  } = useContext(AppContext);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState(null);
  
  // Form states
  const [newsForm, setNewsForm] = useState({ title: '', titleRu: '', content: '', image: '' });
  const [serviceForm, setServiceForm] = useState({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
  const [statForm, setStatForm] = useState({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });
  const [orgForm, setOrgForm] = useState({ name: '', nameRu: '', phone: '', email: '', address: '' });
  const [galleryForm, setGalleryForm] = useState({ image: '', title: '', titleRu: '' });
  const [carouselForm, setCarouselForm] = useState({ image: '', title: '', titleRu: '' });
  const [leaderForm, setLeaderForm] = useState({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
  const [faqForm, setFaqForm] = useState({ question: '', questionRu: '', answer: '', answerRu: '' });

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
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
      showMessage('Xush kelibsiz!');
    } else {
      setError('Login yoki parol xato!');
    }
  };

  const handleAddNews = () => {
    if (!newsForm.title) {
      showMessage('Sarlavha kiritilmadi', 'error');
      return;
    }
    addNews({ ...newsForm, id: Date.now(), date: new Date().toISOString().split('T')[0] });
    setNewsForm({ title: '', titleRu: '', content: '', image: '' });
    showMessage('Yangilik qo\'shildi!');
  };

  const handleAddService = () => {
    if (!serviceForm.name) {
      showMessage('Xizmat nomi kiritilmadi', 'error');
      return;
    }
    addService({ ...serviceForm, id: Date.now() });
    setServiceForm({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
    showMessage('Xizmat qo\'shildi!');
  };

  const handleAddStatistic = () => {
    if (!statForm.label) {
      showMessage('Statistika nomi kiritilmadi', 'error');
      return;
    }
    addStatistic({ ...statForm, id: Date.now() });
    setStatForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue' });
    showMessage('Statistika qo\'shildi!');
  };

  const handleAddOrganization = () => {
    if (!orgForm.name) {
      showMessage('Tashkilot nomi kiritilmadi', 'error');
      return;
    }
    addOrganization({ ...orgForm, id: Date.now() });
    setOrgForm({ name: '', nameRu: '', phone: '', email: '', address: '' });
    showMessage('Tashkilot qo\'shildi!');
  };

  const handleAddGallery = () => {
    if (!galleryForm.image) {
      showMessage('Rasm URL kiritilmadi', 'error');
      return;
    }
    addGallery({ ...galleryForm, id: Date.now() });
    setGalleryForm({ image: '', title: '', titleRu: '' });
    showMessage('Rasm qo\'shildi!');
  };

  const handleAddCarousel = () => {
    if (!carouselForm.image) {
      showMessage('Rasm URL kiritilmadi', 'error');
      return;
    }
    addCarousel({ ...carouselForm, id: Date.now() });
    setCarouselForm({ image: '', title: '', titleRu: '' });
    showMessage('Karusel rasmi qo\'shildi!');
  };

  const handleAddLeadership = () => {
    if (!leaderForm.name) {
      showMessage('Rahbar nomi kiritilmadi', 'error');
      return;
    }
    addLeadership({ ...leaderForm, id: Date.now() });
    setLeaderForm({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
    showMessage('Rahbar qo\'shildi!');
  };

  const handleAddFaq = () => {
    if (!faqForm.question) {
      showMessage('Savol kiritilmadi', 'error');
      return;
    }
    addFaq({ ...faqForm, id: Date.now() });
    setFaqForm({ question: '', questionRu: '', answer: '', answerRu: '' });
    showMessage('FAQ qo\'shildi!');
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary to-primaryDark">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-primary rounded-2xl">
              <i className="text-3xl text-white fas fa-user-shield"></i>
            </div>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-sm text-gray-500">Tizimga kirish</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              placeholder="Login" 
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" 
              value={loginData.username} 
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input 
              type="password" 
              placeholder="Parol" 
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" 
              value={loginData.password} 
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            <button type="submit" className="w-full py-3 font-bold text-white transition bg-primary rounded-xl hover:bg-primary/90">
              Kirish
            </button>
            <p className="text-xs text-center text-gray-400">Demo: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', color: 'blue' },
    { id: 'news', label: 'Yangiliklar', icon: 'newspaper', color: 'green' },
    { id: 'services', label: 'Xizmatlar', icon: 'th-large', color: 'purple' },
    { id: 'statistics', label: 'Statistika', icon: 'chart-bar', color: 'orange' },
    { id: 'organizations', label: 'Tashkilotlar', icon: 'building', color: 'red' },
    { id: 'gallery', label: 'Galereya', icon: 'images', color: 'pink' },
    { id: 'carousel', label: 'Karusel', icon: 'sliders-h', color: 'indigo' },
    { id: 'leadership', label: 'Rahbariyat', icon: 'users', color: 'teal' },
    { id: 'faq', label: 'FAQ', icon: 'question-circle', color: 'yellow' },
    { id: 'contacts', label: 'Murojaatlar', icon: 'envelope', color: 'red' },
    { id: 'subscribers', label: 'Obunalar', icon: 'bell', color: 'blue' }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      teal: 'bg-teal-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || 'bg-primary';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} animate-fadeInUp`}>
          {message.text}
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b bg-primary">
          <div className="flex items-center gap-2">
            <i className="text-xl text-white fas fa-landmark"></i>
            <span className="text-sm font-bold text-white">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white md:hidden">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="py-4 overflow-y-auto h-[calc(100%-60px)]">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClass(item.color)} bg-opacity-20`}>
                <i className={`fas fa-${item.icon} text-sm ${activeTab === item.id ? 'text-primary' : `text-${item.color}-500`}`}></i>
              </div>
              <span className="text-sm font-medium">{item.label}</span>
              {item.id === 'contacts' && contacts.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {contacts.length}
                </span>
              )}
              {item.id === 'subscribers' && subscribers.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">
                  {subscribers.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full gap-3 px-4 py-2 text-sm font-medium text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Chiqish</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <i className="text-xl fas fa-bars text-primary"></i>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <i className="text-sm text-white fas fa-user"></i>
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="p-4 bg-white shadow rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{news.length}</div>
                      <div className="text-sm text-gray-500">Yangiliklar</div>
                    </div>
                    <i className="text-3xl text-blue-500 fas fa-newspaper"></i>
                  </div>
                </div>
                <div className="p-4 bg-white shadow rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{services.length}</div>
                      <div className="text-sm text-gray-500">Xizmatlar</div>
                    </div>
                    <i className="text-3xl text-purple-500 fas fa-th-large"></i>
                  </div>
                </div>
                <div className="p-4 bg-white shadow rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{organizations.length}</div>
                      <div className="text-sm text-gray-500">Tashkilotlar</div>
                    </div>
                    <i className="text-3xl text-green-500 fas fa-building"></i>
                  </div>
                </div>
                <div className="p-4 bg-white shadow rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{subscribers.length}</div>
                      <div className="text-sm text-gray-500">Obunalar</div>
                    </div>
                    <i className="text-3xl text-orange-500 fas fa-bell"></i>
                  </div>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="mt-6">
                <h2 className="mb-4 text-lg font-bold">So'nggi murojaatlar</h2>
                <div className="overflow-hidden bg-white shadow rounded-xl">
                  {contacts.slice(0, 5).map(contact => (
                    <div key={contact.id} className="p-4 border-b hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                        <div className="text-xs text-gray-400">{contact.date}</div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{contact.message?.slice(0, 100)}...</p>
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="p-4 text-center text-gray-500">Hech qanday murojaat yo'q</p>}
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Yangiliklar boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                    <i className="text-green-500 fas fa-plus-circle"></i> Yangilik qo'shish
                  </h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (RU)" className="w-full px-3 py-2 border rounded-lg" value={newsForm.titleRu} onChange={(e) => setNewsForm({ ...newsForm, titleRu: e.target.value })} />
                    <textarea placeholder="Matn" rows="4" className="w-full px-3 py-2 border rounded-lg" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}></textarea>
                    <input type="text" placeholder="Rasm URL" className="w-full px-3 py-2 border rounded-lg" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} />
                    <button onClick={handleAddNews} className="w-full py-2 font-semibold text-white transition rounded-lg bg-primary hover:bg-primary/90">
                      Qo'shish
                    </button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                    <i className="fas fa-list text-primary"></i> Yangiliklar ({news.length})
                  </h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {news.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 transition border-b rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.date}</div>
                        </div>
                        <button onClick={() => deleteNews(item.id)} className="p-2 text-red-500 hover:text-red-700">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    {news.length === 0 && <p className="py-8 text-center text-gray-500">Hech qanday yangilik yo'q</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Xizmatlar boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Xizmat qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Nomi (UZ)" className="w-full px-3 py-2 border rounded-lg" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} />
                    <input type="text" placeholder="Nomi (RU)" className="w-full px-3 py-2 border rounded-lg" value={serviceForm.nameRu} onChange={(e) => setServiceForm({ ...serviceForm, nameRu: e.target.value })} />
                    <input type="text" placeholder="Icon (id-card, briefcase...)" className="w-full px-3 py-2 border rounded-lg" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} />
                    <textarea placeholder="Tavsif" rows="3" className="w-full px-3 py-2 border rounded-lg" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}></textarea>
                    <input type="text" placeholder="Departament" className="w-full px-3 py-2 border rounded-lg" value={serviceForm.department} onChange={(e) => setServiceForm({ ...serviceForm, department: e.target.value })} />
                    <button onClick={handleAddService} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Xizmatlar ({services.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {services.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div><div className="font-medium">{item.name}</div><div className="text-xs text-gray-500">{item.department}</div></div>
                        <button onClick={() => deleteService(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Statistika boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Statistika qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Nomi (UZ)" className="w-full px-3 py-2 border rounded-lg" value={statForm.label} onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} />
                    <input type="text" placeholder="Nomi (RU)" className="w-full px-3 py-2 border rounded-lg" value={statForm.labelRu} onChange={(e) => setStatForm({ ...statForm, labelRu: e.target.value })} />
                    <input type="number" placeholder="Qiymat" className="w-full px-3 py-2 border rounded-lg" value={statForm.value} onChange={(e) => setStatForm({ ...statForm, value: parseInt(e.target.value) })} />
                    <input type="text" placeholder="Icon (users, school...)" className="w-full px-3 py-2 border rounded-lg" value={statForm.icon} onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })} />
                    <select className="w-full px-3 py-2 border rounded-lg" value={statForm.color} onChange={(e) => setStatForm({ ...statForm, color: e.target.value })}>
                      <option value="blue">Blue</option><option value="green">Green</option><option value="red">Red</option><option value="purple">Purple</option><option value="orange">Orange</option>
                    </select>
                    <button onClick={handleAddStatistic} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Statistikalar ({statistics.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {statistics.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div><div className="font-medium">{item.label}</div><div className="text-sm text-gray-500">{item.value.toLocaleString()}</div></div>
                        <button onClick={() => deleteStatistic(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Organizations Tab */}
          {activeTab === 'organizations' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Tashkilotlar boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Tashkilot qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Nomi (UZ)" className="w-full px-3 py-2 border rounded-lg" value={orgForm.name} onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })} />
                    <input type="text" placeholder="Nomi (RU)" className="w-full px-3 py-2 border rounded-lg" value={orgForm.nameRu} onChange={(e) => setOrgForm({ ...orgForm, nameRu: e.target.value })} />
                    <input type="text" placeholder="Telefon" className="w-full px-3 py-2 border rounded-lg" value={orgForm.phone} onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })} />
                    <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" value={orgForm.email} onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })} />
                    <input type="text" placeholder="Manzil" className="w-full px-3 py-2 border rounded-lg" value={orgForm.address} onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })} />
                    <button onClick={handleAddOrganization} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Tashkilotlar ({organizations.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {organizations.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div><div className="font-medium">{item.name}</div><div className="text-xs text-gray-500">{item.phone}</div></div>
                        <button onClick={() => deleteOrganization(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Galereya boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Rasm qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Rasm URL" className="w-full px-3 py-2 border rounded-lg" value={galleryForm.image} onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-3 py-2 border rounded-lg" value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (RU)" className="w-full px-3 py-2 border rounded-lg" value={galleryForm.titleRu} onChange={(e) => setGalleryForm({ ...galleryForm, titleRu: e.target.value })} />
                    <button onClick={handleAddGallery} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Galereya ({gallery.length})</h3>
                  <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-96">
                    {gallery.map(item => (
                      <div key={item.id} className="relative group">
                        <img src={item.image} className="object-cover w-full h-24 rounded-lg" alt={item.title} />
                        <button onClick={() => deleteGallery(item.id)} className="absolute flex items-center justify-center w-5 h-5 text-white transition bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100">
                          <i className="text-xs fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    {gallery.length === 0 && <p className="col-span-2 py-8 text-center text-gray-500">Hech qanday rasm yo'q</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Carousel Tab */}
          {activeTab === 'carousel' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Karusel boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Rasm qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Rasm URL" className="w-full px-3 py-2 border rounded-lg" value={carouselForm.image} onChange={(e) => setCarouselForm({ ...carouselForm, image: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-3 py-2 border rounded-lg" value={carouselForm.title} onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })} />
                    <input type="text" placeholder="Sarlavha (RU)" className="w-full px-3 py-2 border rounded-lg" value={carouselForm.titleRu} onChange={(e) => setCarouselForm({ ...carouselForm, titleRu: e.target.value })} />
                    <button onClick={handleAddCarousel} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Karusel rasmlari ({carousel.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {carousel.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                        <img src={item.image} className="object-cover w-16 h-12 rounded" alt={item.title} />
                        <div className="flex-1"><div className="font-medium">{item.title}</div></div>
                        <button onClick={() => deleteCarousel(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                    {carousel.length === 0 && <p className="py-8 text-center text-gray-500">Hech qanday rasm yo'q</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === 'leadership' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Rahbariyat boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Rahbar qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Ism familiya" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.name} onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })} />
                    <input type="text" placeholder="Lavozimi (UZ)" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.position} onChange={(e) => setLeaderForm({ ...leaderForm, position: e.target.value })} />
                    <input type="text" placeholder="Lavozimi (RU)" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.positionRu} onChange={(e) => setLeaderForm({ ...leaderForm, positionRu: e.target.value })} />
                    <input type="text" placeholder="Rasm URL" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.image} onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })} />
                    <input type="text" placeholder="Telefon" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.phone} onChange={(e) => setLeaderForm({ ...leaderForm, phone: e.target.value })} />
                    <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" value={leaderForm.email} onChange={(e) => setLeaderForm({ ...leaderForm, email: e.target.value })} />
                    <button onClick={handleAddLeadership} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Rahbariyat ({leadership.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {leadership.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div><div className="font-medium">{item.name}</div><div className="text-xs text-gray-500">{item.position}</div></div>
                        <button onClick={() => deleteLeadership(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">FAQ boshqaruvi</h1>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">Savol qo'shish</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Savol (UZ)" className="w-full px-3 py-2 border rounded-lg" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} />
                    <input type="text" placeholder="Savol (RU)" className="w-full px-3 py-2 border rounded-lg" value={faqForm.questionRu} onChange={(e) => setFaqForm({ ...faqForm, questionRu: e.target.value })} />
                    <textarea placeholder="Javob (UZ)" rows="3" className="w-full px-3 py-2 border rounded-lg" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}></textarea>
                    <textarea placeholder="Javob (RU)" rows="3" className="w-full px-3 py-2 border rounded-lg" value={faqForm.answerRu} onChange={(e) => setFaqForm({ ...faqForm, answerRu: e.target.value })}></textarea>
                    <button onClick={handleAddFaq} className="w-full py-2 font-semibold text-white rounded-lg bg-primary">Qo'shish</button>
                  </div>
                </div>
                <div className="p-5 bg-white shadow rounded-xl">
                  <h3 className="mb-4 text-lg font-bold">FAQ ({faqs.length})</h3>
                  <div className="space-y-2 overflow-y-auto max-h-96">
                    {faqs.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border-b">
                        <div><div className="font-medium">❓ {item.question}</div><div className="text-xs text-gray-500">💡 {item.answer?.slice(0, 50)}</div></div>
                        <button onClick={() => deleteFaq(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Murojaatlar</h1>
              <div className="overflow-hidden bg-white shadow rounded-xl">
                <div className="divide-y">
                  {contacts.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">Hech qanday murojaat yo'q</p>
                  ) : (
                    contacts.map(contact => (
                      <div key={contact.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-bold">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email} {contact.phone && `| ${contact.phone}`}</div>
                          </div>
                          <div className="text-xs text-gray-400">{contact.date}</div>
                        </div>
                        <p className="text-gray-700">{contact.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Obunalar</h1>
              <div className="overflow-hidden bg-white shadow rounded-xl">
                <div className="divide-y">
                  {subscribers.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">Hech qanday obuna yo'q</p>
                  ) : (
                    subscribers.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{sub.email}</div>
                          <div className="text-xs text-gray-500">{sub.date}</div>
                        </div>
                        <i className="text-green-500 fas fa-check-circle"></i>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}