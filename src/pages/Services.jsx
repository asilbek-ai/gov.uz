import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t, services } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = services.filter(s => 
    t(s.name, s.nameRu).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xizmatlar ro'yxati (agar backenddan kelmasa)
  const serviceList = filtered.length > 0 ? filtered : [
    { id: 1, name: "Fuqarolik holati aktlarini ro'yxatga olish", nameRu: "Регистрация актов гражданского состояния", icon: "id-card", description: "Tug'ilish, nikoh va vafot hujjatlarini rasmiylashtirish", link: "/services/1" },
    { id: 2, name: "Pasport va ID-karta olish", nameRu: "Получение паспорта и ID-карты", icon: "passport", description: "Biometrik pasport va ID-karta olish", link: "/services/2" },
    { id: 3, name: "Yer uchastkasi ajratish", nameRu: "Выделение земельного участка", icon: "map-marked-alt", description: "Yer uchastkasini ajratish va rasmiylashtirish", link: "/services/3" },
    { id: 4, name: "Tadbirkorlik faoliyatini ro'yxatga olish", nameRu: "Регистрация предпринимательской деятельности", icon: "briefcase", description: "Yakka tartibdagi tadbirkor va MCHJ ro'yxatdan o'tkazish", link: "/services/4" },
    { id: 5, name: "Ijtimoiy yordam va nafaqalar", nameRu: "Социальная помощь и пособия", icon: "hands-helping", description: "Kam ta'minlangan oilalarga yordam va nafaqalar", link: "/services/5" },
    { id: 6, name: "Tibbiy yordam va sug'urta", nameRu: "Медицинская помощь и страховка", icon: "hospital", description: "Poliklinikaga biriktirilish va tibbiy sug'urta", link: "/services/6" }
  ];

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            {t('Davlat xizmatlari', 'Государственные услуги')}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('Sizga kerakli barcha davlat xizmatlari bir joyda', 'Все необходимые государственные услуги в одном месте')}
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder={t('Xizmat qidirish...', 'Поиск услуг...')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map(service => (
            <Link
              key={service.id}
              to={service.link || `/services/${service.id}`}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primaryDark transition-all">
                  <i className={`fas fa-${service.icon} text-2xl text-primary group-hover:text-white transition`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">
                    {t(service.name, service.nameRu)}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                  <div className="mt-3 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('Batafsil', 'Подробнее')} <i className="fas fa-arrow-right text-xs"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}