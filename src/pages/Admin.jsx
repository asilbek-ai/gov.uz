import { useState, useContext } from 'react';
import { AppContext } from '../App';

export default function Admin() {
  const { t, isAdmin, setIsAdmin, adminData, updateData } = useContext(AppContext);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [message, setMessage] = useState(null);

  // Form states
  const [newsForm, setNewsForm] = useState({ title: '', titleRu: '', content: '', date: new Date().toISOString().split('T')[0], image: '' });
  const [serviceForm, setServiceForm] = useState({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
  const [statForm, setStatForm] = useState({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue', prefix: '', suffix: '' });
  const [orgForm, setOrgForm] = useState({ name: '', nameRu: '', phone: '', email: '', address: '', website: '' });
  const [carouselForm, setCarouselForm] = useState({ image: '', title: '', titleRu: '' });
  const [leaderForm, setLeaderForm] = useState({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
  const [faqForm, setFaqForm] = useState({ question: '', questionRu: '', answer: '', answerRu: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.username === 'admin' && login.password === 'admin123') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Login yoki parol xato!');
    }
  };

  const handleLogout = () => setIsAdmin(false);

  const handleImageUpload = (e, setForm, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result }));
        let progress = 0;
        const interval = setInterval(() => { progress += 10; setUploadProgress(progress); if (progress >= 100) clearInterval(interval); }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  // News CRUD
  const addNews = () => {
    if (!newsForm.title) return showMessage('Sarlavha kiritilmadi', 'error');
    const newNews = { id: Date.now(), ...newsForm, views: 0 };
    updateData({ ...adminData, news: [newNews, ...adminData.news] });
    setNewsForm({ title: '', titleRu: '', content: '', date: new Date().toISOString().split('T')[0], image: '' });
    showMessage('Yangilik qo\'shildi!');
  };
  const deleteNews = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, news: adminData.news.filter(n => n.id !== id) }); showMessage('Yangilik o\'chirildi!'); };

  // Service CRUD
  const addService = () => {
    if (!serviceForm.name) return showMessage('Xizmat nomi kiritilmadi', 'error');
    const newService = { id: Date.now(), ...serviceForm };
    updateData({ ...adminData, services: [...adminData.services, newService] });
    setServiceForm({ name: '', nameRu: '', icon: 'gear', description: '', department: '' });
    showMessage('Xizmat qo\'shildi!');
  };
  const deleteService = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, services: adminData.services.filter(s => s.id !== id) }); showMessage('Xizmat o\'chirildi!'); };

  // Statistics CRUD
  const addStatistic = () => {
    if (!statForm.label) return showMessage('Statistika nomi kiritilmadi', 'error');
    const newStat = { id: Date.now(), ...statForm };
    updateData({ ...adminData, statistics: [...adminData.statistics, newStat] });
    setStatForm({ label: '', labelRu: '', value: 0, icon: 'chart-line', color: 'blue', prefix: '', suffix: '' });
    showMessage('Statistika qo\'shildi!');
  };
  const deleteStatistic = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, statistics: adminData.statistics.filter(s => s.id !== id) }); showMessage('Statistika o\'chirildi!'); };

  // Organization CRUD
  const addOrganization = () => {
    if (!orgForm.name) return showMessage('Tashkilot nomi kiritilmadi', 'error');
    const newOrg = { id: Date.now(), ...orgForm };
    updateData({ ...adminData, organizations: [...adminData.organizations, newOrg] });
    setOrgForm({ name: '', nameRu: '', phone: '', email: '', address: '', website: '' });
    showMessage('Tashkilot qo\'shildi!');
  };
  const deleteOrganization = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, organizations: adminData.organizations.filter(o => o.id !== id) }); showMessage('Tashkilot o\'chirildi!'); };

  // Carousel CRUD
  const addCarousel = () => {
    if (!carouselForm.image) return showMessage('Rasm URL kiritilmadi', 'error');
    const newItem = { id: Date.now(), ...carouselForm };
    updateData({ ...adminData, carousel: [...adminData.carousel, newItem] });
    setCarouselForm({ image: '', title: '', titleRu: '' });
    showMessage('Karusel rasmi qo\'shildi!');
  };
  const deleteCarousel = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, carousel: adminData.carousel.filter(c => c.id !== id) }); showMessage('Karusel rasmi o\'chirildi!'); };

  // Leadership CRUD
  const addLeader = () => {
    if (!leaderForm.name) return showMessage('Rahbar nomi kiritilmadi', 'error');
    const newLeader = { id: Date.now(), ...leaderForm };
    updateData({ ...adminData, leadership: [...adminData.leadership, newLeader] });
    setLeaderForm({ name: '', position: '', positionRu: '', image: '', phone: '', email: '' });
    showMessage('Rahbar qo\'shildi!');
  };
  const deleteLeader = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, leadership: adminData.leadership.filter(l => l.id !== id) }); showMessage('Rahbar o\'chirildi!'); };

  // FAQ CRUD
  const addFaq = () => {
    if (!faqForm.question) return showMessage('Savol kiritilmadi', 'error');
    const newFaq = { id: Date.now(), ...faqForm };
    updateData({ ...adminData, faqs: [...adminData.faqs, newFaq] });
    setFaqForm({ question: '', questionRu: '', answer: '', answerRu: '' });
    showMessage('FAQ qo\'shildi!');
  };
  const deleteFaq = (id) => { if (confirm('O\'chirilsinmi?')) updateData({ ...adminData, faqs: adminData.faqs.filter(f => f.id !== id) }); showMessage('FAQ o\'chirildi!'); };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary to-primaryDark">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
          <div className="mb-6 text-center"><div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-primary rounded-2xl"><i className="text-3xl text-white fas fa-user-shield"></i></div><h2 className="text-2xl font-bold">Admin Panel</h2><p className="text-sm text-gray-500">Tizimga kirish</p></div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Login" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} />
            <input type="password" placeholder="Parol" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="w-full py-3 font-bold text-white transition bg-primary rounded-xl hover:bg-primary/90">Kirish</button>
            <p className="text-xs text-center text-gray-400">Demo: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', color: 'blue' },
    { id: 'news', label: 'Yangiliklar', icon: 'newspaper', color: 'green' },
    { id: 'services', label: 'Xizmatlar', icon: 'th-large', color: 'purple' },
    { id: 'statistics', label: 'Statistika', icon: 'chart-bar', color: 'orange' },
    { id: 'organizations', label: 'Tashkilotlar', icon: 'building', color: 'red' },
    { id: 'carousel', label: 'Karusel', icon: 'images', color: 'pink' },
    { id: 'leadership', label: 'Rahbariyat', icon: 'users', color: 'indigo' },
    { id: 'faq', label: 'FAQ', icon: 'question-circle', color: 'teal' },
    { id: 'contacts', label: 'Murojaatlar', icon: 'envelope', color: 'yellow' },
    { id: 'subscribers', label: 'Obunalar', icon: 'bell', color: 'red' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-100">
      {/* Admin Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 text-white bg-primary">
        <div className="flex items-center gap-3"><i className="text-xl fas fa-user-shield"></i><span className="font-bold">Admin Panel - Jondor tumani</span></div>
        <button onClick={handleLogout} className="px-4 py-2 transition rounded-lg bg-white/20 hover:bg-white/30">Chiqish</button>
      </div>

      {/* Message Toast */}
      {message && <div className={`fixed top-20 right-4 z-50 p-4 rounded-xl shadow-lg ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} animate-fadeInUp`}>{message.text}</div>}

      <div className="flex min-h-screen pt-14">
        {/* Sidebar */}
        <div className="fixed bottom-0 left-0 z-30 w-64 overflow-y-auto bg-white shadow-xl top-14">
          <div className="p-4">
            {tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}><i className={`fas fa-${tab.icon} w-5`}></i><span className="text-sm font-medium">{tab.label}</span></button>))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>
              <div className="grid grid-cols-2 gap-5 mb-8 md:grid-cols-4">
                <div className="p-5 text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl"><div className="text-3xl font-bold">{adminData.news.length}</div><div>Yangiliklar</div></div>
                <div className="p-5 text-white shadow-lg bg-gradient-to-r from-green-500 to-green-600 rounded-2xl"><div className="text-3xl font-bold">{adminData.services.length}</div><div>Xizmatlar</div></div>
                <div className="p-5 text-white shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl"><div className="text-3xl font-bold">{adminData.organizations.length}</div><div>Tashkilotlar</div></div>
                <div className="p-5 text-white shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl"><div className="text-3xl font-bold">{adminData.subscribers.length}</div><div>Obunalar</div></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">So'nggi yangiliklar</h3>{adminData.news.slice(0, 5).map(n => (<div key={n.id} className="flex items-center justify-between py-2 border-b"><span>{n.title}</span><span className="text-sm text-gray-500">{n.date}</span></div>))}</div>
                <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">So'nggi murojaatlar</h3>{adminData.contacts.slice(0, 5).map(c => (<div key={c.id} className="py-2 border-b"><div className="font-medium">{c.name}</div><div className="text-sm text-gray-500">{c.email}</div></div>))}</div>
              </div>
            </div>
          )}

          {/* News Management */}
          {activeTab === 'news' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Yangiliklar boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Yangilik qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-4 py-2 border rounded-xl" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                <input type="text" placeholder="Sarlavha (RU)" className="w-full px-4 py-2 border rounded-xl" value={newsForm.titleRu} onChange={(e) => setNewsForm({ ...newsForm, titleRu: e.target.value })} />
                <textarea placeholder="Matn" rows="5" className="w-full px-4 py-2 border rounded-xl" value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}></textarea>
                <div className="p-4 text-center border-2 border-dashed rounded-xl">{newsForm.image ? <img src={newsForm.image} className="h-32 mx-auto rounded" /> : <label className="cursor-pointer"><i className="text-3xl text-gray-400 fas fa-cloud-upload-alt"></i><p className="text-sm text-gray-500">Rasm yuklash</p><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setNewsForm, 'image')} /></label>}{uploadProgress > 0 && uploadProgress < 100 && <div className="h-1 mt-2 bg-gray-200 rounded"><div className="h-full bg-green-500 rounded" style={{ width: `${uploadProgress}%` }}></div></div>}</div>
                <button onClick={addNews} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Yangiliklar ({adminData.news.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.news.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{item.title}</div><div className="text-sm text-gray-500">{item.date}</div></div><button onClick={() => deleteNews(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Services Management */}
          {activeTab === 'services' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Xizmatlar boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Xizmat qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Nomi (UZ)" className="w-full px-4 py-2 border rounded-xl" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} />
                <input type="text" placeholder="Nomi (RU)" className="w-full px-4 py-2 border rounded-xl" value={serviceForm.nameRu} onChange={(e) => setServiceForm({ ...serviceForm, nameRu: e.target.value })} />
                <input type="text" placeholder="Icon (masalan: id-card)" className="w-full px-4 py-2 border rounded-xl" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} />
                <textarea placeholder="Tavsif" rows="3" className="w-full px-4 py-2 border rounded-xl" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}></textarea>
                <input type="text" placeholder="Departament" className="w-full px-4 py-2 border rounded-xl" value={serviceForm.department} onChange={(e) => setServiceForm({ ...serviceForm, department: e.target.value })} />
                <button onClick={addService} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Xizmatlar ({adminData.services.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.services.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{item.name}</div><div className="text-sm text-gray-500">{item.department}</div></div><button onClick={() => deleteService(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Statistics Management */}
          {activeTab === 'statistics' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Statistika boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Statistika qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Nomi (UZ)" className="w-full px-4 py-2 border rounded-xl" value={statForm.label} onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} />
                <input type="text" placeholder="Nomi (RU)" className="w-full px-4 py-2 border rounded-xl" value={statForm.labelRu} onChange={(e) => setStatForm({ ...statForm, labelRu: e.target.value })} />
                <input type="number" placeholder="Qiymat" className="w-full px-4 py-2 border rounded-xl" value={statForm.value} onChange={(e) => setStatForm({ ...statForm, value: parseInt(e.target.value) })} />
                <input type="text" placeholder="Icon (masalan: users)" className="w-full px-4 py-2 border rounded-xl" value={statForm.icon} onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })} />
                <select className="w-full px-4 py-2 border rounded-xl" value={statForm.color} onChange={(e) => setStatForm({ ...statForm, color: e.target.value })}><option value="blue">Blue</option><option value="green">Green</option><option value="purple">Purple</option><option value="red">Red</option><option value="orange">Orange</option><option value="teal">Teal</option></select>
                <button onClick={addStatistic} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Statistikalar ({adminData.statistics.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.statistics.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{item.label}</div><div className="text-lg font-bold text-primary">{item.value.toLocaleString()}</div></div><button onClick={() => deleteStatistic(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Organizations Management */}
          {activeTab === 'organizations' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Tashkilotlar boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Tashkilot qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Nomi (UZ)" className="w-full px-4 py-2 border rounded-xl" value={orgForm.name} onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })} />
                <input type="text" placeholder="Nomi (RU)" className="w-full px-4 py-2 border rounded-xl" value={orgForm.nameRu} onChange={(e) => setOrgForm({ ...orgForm, nameRu: e.target.value })} />
                <input type="tel" placeholder="Telefon" className="w-full px-4 py-2 border rounded-xl" value={orgForm.phone} onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-xl" value={orgForm.email} onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })} />
                <input type="text" placeholder="Manzil" className="w-full px-4 py-2 border rounded-xl" value={orgForm.address} onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })} />
                <button onClick={addOrganization} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Tashkilotlar ({adminData.organizations.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.organizations.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{item.name}</div><div className="text-sm text-gray-500">{item.phone}</div></div><button onClick={() => deleteOrganization(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Carousel Management */}
          {activeTab === 'carousel' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Karusel boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Rasm qo'shish</h3><div className="space-y-4">
                <div className="p-4 text-center border-2 border-dashed rounded-xl">{carouselForm.image ? <img src={carouselForm.image} className="h-32 mx-auto rounded" /> : <label className="cursor-pointer"><i className="text-3xl text-gray-400 fas fa-cloud-upload-alt"></i><p className="text-sm text-gray-500">Rasm yuklash</p><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setCarouselForm, 'image')} /></label>}</div>
                <input type="text" placeholder="Sarlavha (UZ)" className="w-full px-4 py-2 border rounded-xl" value={carouselForm.title} onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })} />
                <input type="text" placeholder="Sarlavha (RU)" className="w-full px-4 py-2 border rounded-xl" value={carouselForm.titleRu} onChange={(e) => setCarouselForm({ ...carouselForm, titleRu: e.target.value })} />
                <button onClick={addCarousel} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Karusel rasmlari ({adminData.carousel.length})</h3><div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">{adminData.carousel.map(item => (<div key={item.id} className="relative group"><img src={item.image} className="object-cover w-full h-32 rounded-lg" /><button onClick={() => deleteCarousel(item.id)} className="absolute flex items-center justify-center w-6 h-6 text-white transition bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"><i className="text-xs fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Leadership Management */}
          {activeTab === 'leadership' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Rahbariyat boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Rahbar qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Ism familiya" className="w-full px-4 py-2 border rounded-xl" value={leaderForm.name} onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })} />
                <input type="text" placeholder="Lavozimi (UZ)" className="w-full px-4 py-2 border rounded-xl" value={leaderForm.position} onChange={(e) => setLeaderForm({ ...leaderForm, position: e.target.value })} />
                <input type="text" placeholder="Lavozimi (RU)" className="w-full px-4 py-2 border rounded-xl" value={leaderForm.positionRu} onChange={(e) => setLeaderForm({ ...leaderForm, positionRu: e.target.value })} />
                <input type="text" placeholder="Rasm URL" className="w-full px-4 py-2 border rounded-xl" value={leaderForm.image} onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })} />
                <input type="tel" placeholder="Telefon" className="w-full px-4 py-2 border rounded-xl" value={leaderForm.phone} onChange={(e) => setLeaderForm({ ...leaderForm, phone: e.target.value })} />
                <button onClick={addLeader} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Rahbariyat ({adminData.leadership.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.leadership.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{item.name}</div><div className="text-sm text-gray-500">{item.position}</div></div><button onClick={() => deleteLeader(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* FAQ Management */}
          {activeTab === 'faq' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">FAQ boshqaruvi</h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">Savol qo'shish</h3><div className="space-y-4">
                <input type="text" placeholder="Savol (UZ)" className="w-full px-4 py-2 border rounded-xl" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} />
                <input type="text" placeholder="Savol (RU)" className="w-full px-4 py-2 border rounded-xl" value={faqForm.questionRu} onChange={(e) => setFaqForm({ ...faqForm, questionRu: e.target.value })} />
                <textarea placeholder="Javob (UZ)" rows="3" className="w-full px-4 py-2 border rounded-xl" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}></textarea>
                <textarea placeholder="Javob (RU)" rows="3" className="w-full px-4 py-2 border rounded-xl" value={faqForm.answerRu} onChange={(e) => setFaqForm({ ...faqForm, answerRu: e.target.value })}></textarea>
                <button onClick={addFaq} className="w-full py-2 font-semibold text-white bg-primary rounded-xl">Qo'shish</button>
              </div></div>
              <div className="p-6 bg-white shadow rounded-2xl"><h3 className="mb-4 text-lg font-bold">FAQ ({adminData.faqs.length})</h3><div className="space-y-3 max-h-[500px] overflow-y-auto">{adminData.faqs.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">❓ {item.question}</div><div className="text-sm text-gray-500">💡 {item.answer?.slice(0, 50)}</div></div><button onClick={() => deleteFaq(item.id)} className="text-red-500"><i className="fas fa-trash"></i></button></div>))}</div></div>
            </div></div>
          )}

          {/* Contacts View */}
          {activeTab === 'contacts' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Murojaatlar</h1>
            <div className="p-6 bg-white shadow rounded-2xl"><div className="space-y-4">{adminData.contacts.length === 0 ? <p className="py-8 text-center text-gray-500">Hech qanday murojaat yo'q</p> : adminData.contacts.map(contact => (<div key={contact.id} className="p-4 bg-gray-50 rounded-xl"><div className="flex items-start justify-between mb-2"><div><div className="font-bold">{contact.name}</div><div className="text-sm text-gray-500">{contact.email} | {contact.phone}</div></div><div className="text-xs text-gray-400">{new Date(contact.date).toLocaleString()}</div></div><p className="text-gray-700">{contact.message}</p></div>))}</div></div></div>
          )}

          {/* Subscribers View */}
          {activeTab === 'subscribers' && (
            <div><h1 className="mb-6 text-2xl font-bold text-gray-800">Obunalar</h1>
            <div className="p-6 bg-white shadow rounded-2xl"><div className="space-y-4">{adminData.subscribers.length === 0 ? <p className="py-8 text-center text-gray-500">Hech qanday obuna yo'q</p> : adminData.subscribers.map(sub => (<div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div><div className="font-medium">{sub.email}</div><div className="text-sm text-gray-500">Obuna bo'lgan: {new Date(sub.date).toLocaleString()}</div></div></div>))}</div></div></div>
          )}
        </div>
      </div>
    </div>
  );
}