import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import AdminNews from './AdminNews';
import AdminServices from './AdminServices';
import AdminStatistics from './AdminStatistics';
import AdminOrganizations from './AdminOrganizations';
import AdminGallery from './AdminGallery';
import AdminCarousel from './AdminCarousel';
import AdminLeadership from './AdminLeadership';
import AdminFaq from './AdminFaq';
import AdminDocuments from './AdminDocuments';
import AdminDashboardSettings from './AdminDashboardSettings';

export default function Admin() {
  const { 
    t, isAdmin, login, logout,
    news, services, statistics, organizations, gallery, carousel, leadership, documents, faqs, contacts, subscribers, receptionHours, updateReceptionHours
  } = useContext(AppContext);
  
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState(null);
  
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
      showMessage('Xush kelibsiz!');
    } else {
      setError('Login yoki parol xato!');
    }
  };

  const handleUpdateReception = () => {
    updateReceptionHours(receptionForm);
    showMessage('Qabul jadvali yangilandi!');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003580] to-[#001a4a] p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className="fas fa-landmark text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-gray-500 text-sm mt-1">Jondor tumani boshqaruvi</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" placeholder="Login" className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
            </div>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="password" placeholder="Parol" className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003580] transition" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </div>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#003580] to-[#0066cc] text-white font-bold rounded-xl hover:shadow-lg transition">
              <i className="fas fa-sign-in-alt mr-2"></i> Kirish
            </button>
            <p className="text-center text-gray-400 text-xs">Demo: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-line', color: 'blue' },
    { id: 'dashboardSettings', label: 'Dashboard sozlamalari', icon: 'tachometer-alt', color: 'cyan' },
    { id: 'news', label: 'Yangiliklar', icon: 'newspaper', color: 'green' },
    { id: 'services', label: 'Xizmatlar', icon: 'th-large', color: 'purple' },
    { id: 'statistics', label: 'Statistika', icon: 'chart-bar', color: 'orange' },
    { id: 'organizations', label: 'Tashkilotlar', icon: 'building', color: 'red' },
    { id: 'gallery', label: 'Galereya', icon: 'images', color: 'pink' },
    { id: 'carousel', label: 'Karusel', icon: 'sliders-h', color: 'indigo' },
    { id: 'documents', label: 'Hujjatlar', icon: 'file-alt', color: 'blue' },
    { id: 'leadership', label: 'Rahbariyat', icon: 'users', color: 'teal' },
    { id: 'faq', label: 'FAQ', icon: 'question-circle', color: 'purple' },
    { id: 'reception', label: 'Qabul jadvali', icon: 'calendar-alt', color: 'yellow' },
    { id: 'contacts', label: 'Murojaatlar', icon: 'envelope', color: 'red' },
    { id: 'subscribers', label: 'Obunalar', icon: 'bell', color: 'blue' },
    { id: 'organizations', label: 'Tashkilotlar', nameRu: 'Организации', component: AdminOrganizations }
  ];

  const getColorClass = (color) => {
    const colors = { blue: 'bg-blue-500', green: 'bg-green-500', purple: 'bg-purple-500', orange: 'bg-orange-500', red: 'bg-red-500', pink: 'bg-pink-500', indigo: 'bg-indigo-500', teal: 'bg-teal-500', yellow: 'bg-yellow-500', cyan: 'bg-cyan-500' };
    return colors[color] || 'bg-primary';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {message && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slideInRight ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
          {message.text}
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-2xl transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-gradient-to-r from-[#003580] to-[#0066cc] p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-landmark text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
              <p className="text-white/70 text-xs">Jondor tumani</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-4 text-white/70 hover:text-white md:hidden">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-5 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        <div className="py-4 px-3 overflow-y-auto h-[calc(100%-220px)]">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5 transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activeTab === item.id ? 'bg-primary/20' : 'bg-gray-100'}`}>
                <i className={`fas fa-${item.icon} text-sm ${activeTab === item.id ? 'text-primary' : 'text-gray-500'}`}></i>
              </div>
              <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
              {item.id === 'contacts' && contacts.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">{contacts.length}</span>
              )}
              {item.id === 'subscribers' && subscribers.length > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">{subscribers.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <button onClick={logout} className="flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium">
            <i className="fas fa-sign-out-alt"></i> Chiqish
          </button>
        </div>
      </div>

      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <i className="text-xl fas fa-bars text-[#003580]"></i>
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <i className="fas fa-calendar-alt text-[#003580] text-sm"></i>
              <span className="text-sm text-gray-600">{new Date().toLocaleDateString('uz-UZ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#003580] to-[#0066cc] rounded-full flex items-center justify-center text-white shadow-md">
                <i className="fas fa-user text-sm"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="text-3xl font-bold text-primary">{news.length}</div>
                  <div className="text-sm text-gray-500">Yangiliklar</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="text-3xl font-bold text-primary">{services.length}</div>
                  <div className="text-sm text-gray-500">Xizmatlar</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="text-3xl font-bold text-primary">{organizations.length}</div>
                  <div className="text-sm text-gray-500">Tashkilotlar</div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="text-3xl font-bold text-primary">{subscribers.length}</div>
                  <div className="text-sm text-gray-500">Obunalar</div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">So'nggi murojaatlar</h2>
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  {contacts.slice(0, 5).map(contact => (
                    <div key={contact.id} className="p-4 border-b hover:bg-gray-50">
                      <div className="font-medium text-gray-800">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.email}</div>
                      <p className="mt-1 text-sm text-gray-600">{contact.message?.slice(0, 100)}</p>
                    </div>
                  ))}
                  {contacts.length === 0 && <div className="p-8 text-center text-gray-500">Hech qanday murojaat yo'q</div>}
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD SETTINGS TAB */}
          {activeTab === 'dashboardSettings' && <AdminDashboardSettings />}
          
          {/* NEWS TAB */}
          {activeTab === 'news' && <AdminNews />}
          
          {/* SERVICES TAB */}
          {activeTab === 'services' && <AdminServices />}
          
          {/* STATISTICS TAB */}
          {activeTab === 'statistics' && <AdminStatistics />}
          
          {/* ORGANIZATIONS TAB */}
          {activeTab === 'organizations' && <AdminOrganizations />}
          
          {/* GALLERY TAB */}
          {activeTab === 'gallery' && <AdminGallery />}
          
          {/* CAROUSEL TAB */}
          {activeTab === 'carousel' && <AdminCarousel />}
          
          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && <AdminDocuments />}
          
          {/* LEADERSHIP TAB */}
          {activeTab === 'leadership' && <AdminLeadership />}
          
          {/* FAQ TAB */}
          {activeTab === 'faq' && <AdminFaq />}
          
          {/* RECEPTION TAB */}
          {activeTab === 'reception' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Qabul jadvali boshqaruvi</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-3"><i className="fas fa-user-tie text-blue-600 mr-2"></i> Tuman hokimi qabuli</h3>
                  <div className="space-y-3">
                    <div><label className="block text-sm font-medium mb-1">Kunlar (UZ)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.governor.days} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, days: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Kunlar (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.governor.daysRu} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, daysRu: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Vaqt</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.governor.time} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, time: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Manzil (UZ)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.governor.location} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, location: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Manzil (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.governor.locationRu} onChange={e => setReceptionForm({...receptionForm, governor: {...receptionForm.governor, locationRu: e.target.value}})} /></div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold mb-3"><i className="fas fa-users text-green-600 mr-2"></i> Fuqarolar qabuli</h3>
                  <div className="space-y-3">
                    <div><label className="block text-sm font-medium mb-1">Kunlar (UZ)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.citizens.days} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, days: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Kunlar (RU)</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.citizens.daysRu} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, daysRu: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Vaqt</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.citizens.time} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, time: e.target.value}})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Telefon</label><input type="text" className="w-full p-2 border rounded-lg" value={receptionForm.citizens.phone} onChange={e => setReceptionForm({...receptionForm, citizens: {...receptionForm.citizens, phone: e.target.value}})} /></div>
                  </div>
                </div>
              </div>
              <button onClick={handleUpdateReception} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition"><i className="fas fa-save mr-2"></i> Saqlash</button>
            </div>
          )}
          
          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Murojaatlar</h2>
              {contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Hech qanday murojaat yo'q</div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contacts.map(c => (
                    <div key={c.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-bold">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.email}</div>
                      <p className="text-sm mt-1">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* SUBSCRIBERS TAB */}
          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Obunalar</h2>
              {subscribers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Hech qanday obuna yo'q</div>
              ) : (
                <div className="space-y-2">
                  {subscribers.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-2 border-b">
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