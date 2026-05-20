import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Footer() {
  const [settings, setSettings] = useState({});
  const [weather, setWeather] = useState(null);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
    setWeather({ temp: 28, condition: 'Quyoshli', icon: 'sun', humidity: 45, wind: 12 });
  }, []);

  return (
    <footer className="text-gray-400 bg-gray-900">
      <div className="py-12 container-max">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <i className="text-white fas fa-landmark"></i>
              </div>
              <h3 className="text-lg font-bold text-white">Jondor tumani</h3>
            </div>
            <p className="text-sm">Buxoro viloyati Jondor tumani hokimligi rasmiy portali.</p>
            <div className="flex gap-3 mt-4">
              <a href={settings.socialLinks?.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-800 rounded-full hover:bg-primary hover:scale-110">
                <i className="fab fa-telegram"></i>
              </a>
              <a href={settings.socialLinks?.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-800 rounded-full hover:bg-primary hover:scale-110">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href={settings.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-800 rounded-full hover:bg-primary hover:scale-110">
                <i className="fab fa-instagram"></i>
              </a>
              <a href={settings.socialLinks?.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-gray-800 rounded-full hover:bg-primary hover:scale-110">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-white">Bo'limlar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/news" className="flex items-center gap-2 transition hover:text-white"><i className="text-xs fas fa-chevron-right text-primary"></i>Yangiliklar</Link></li>
              <li><Link to="/services" className="flex items-center gap-2 transition hover:text-white"><i className="text-xs fas fa-chevron-right text-primary"></i>Xizmatlar</Link></li>
              <li><Link to="/documents" className="flex items-center gap-2 transition hover:text-white"><i className="text-xs fas fa-chevron-right text-primary"></i>Hujjatlar</Link></li>
              <li><Link to="/media" className="flex items-center gap-2 transition hover:text-white"><i className="text-xs fas fa-chevron-right text-primary"></i>Media</Link></li>
              <li><Link to="/about" className="flex items-center gap-2 transition hover:text-white"><i className="text-xs fas fa-chevron-right text-primary"></i>Tuman haqida</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-white">Aloqa</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><i className="w-5 fas fa-map-marker-alt text-primary"></i> {settings.contactAddress}</li>
              <li className="flex items-center gap-3"><i className="w-5 fas fa-phone text-primary"></i> {settings.contactPhone}</li>
              <li className="flex items-center gap-3"><i className="w-5 fas fa-envelope text-primary"></i> {settings.contactEmail}</li>
              <li className="flex items-center gap-3"><i className="w-5 fas fa-clock text-primary"></i> {settings.workingHours}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-white">Ob-havo</h4>
            {weather && (
              <div className="p-4 text-center bg-gray-800 rounded-xl">
                <i className={`fas fa-${weather.icon} text-4xl text-yellow-400 mb-2`}></i>
                <div className="text-3xl font-bold text-white">{weather.temp}°C</div>
                <div className="text-sm">{weather.condition}</div>
                <div className="flex justify-center gap-4 mt-2 text-xs">
                  <span>💧 {weather.humidity}%</span>
                  <span>🌬 {weather.wind} km/h</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-6 mt-8 text-sm text-center border-t border-gray-800">
          <p>&copy; {currentYear} Jondor tumani hokimligi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}