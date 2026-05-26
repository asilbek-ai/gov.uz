import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t, leadership } = useContext(AppContext);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleLeaderClick = (leader) => {
    setSelectedLeader(leader);
    setShowModal(true);
  };

  const stats = [
    {
      icon: "🏛️",
      value: "1926",
      label: t("Tashkil etilgan", "Основан"),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "👥",
      value: "150,000+",
      label: t("Aholi soni", "Население"),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌾",
      value: "45,000 ga",
      label: t("Qishloq xo'jaligi", "Сельское хозяйство"),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🏫",
      value: "52",
      label: t("Ta'lim muassasalari", "Учебные заведения"),
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🏥",
      value: "15",
      label: t("Tibbiyot maskanlari", "Медицинские учреждения"),
      color: "from-teal-500 to-green-500"
    },
    {
      icon: "🎭",
      value: "8",
      label: t("Madaniyat markazlari", "Центры культуры"),
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const features = [
    {
      icon: "🌾",
      title: t("Qishloq xo'jaligi", "Сельское хозяйство"),
      desc: t("Paxta, g'allachilik va bog'dorchilik rivojlangan", "Развито хлопководство, зерноводство и садоводство")
    },
    {
      icon: "🏭",
      title: t("Tadbirkorlik", "Предпринимательство"),
      desc: t("Kichik biznes va xususiy tadbirkorlik qo'llab-quvvatlanadi", "Поддерживается малый бизнес и частное предпринимательство")
    },
    {
      icon: "🎓",
      title: t("Ta'lim", "Образование"),
      desc: t("Zamonaviy maktablar va o'quv markazlari", "Современные школы и учебные центры")
    },
    {
      icon: "🏥",
      title: t("Tibbiyot", "Медицина"),
      desc: t("Malakali shifokorlar va zamonaviy uskunalar", "Квалифицированные врачи и современное оборудование")
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-secondary/5 to-primary/5 blur-3xl"></div>
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container-custom px-4 mx-auto max-w-7xl">
          {/* Hero Section with Animation */}
          <div className="mb-16 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
              <span className="text-2xl">🏛️</span>
              <span className="text-sm font-semibold text-primary">
                {t("Jondor tumani", "Джондорский район")}
              </span>
            </div>
            
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              {t('Tuman haqida', 'О районе')}
            </h1>
            
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-secondary to-primary"></div>
            </div>
            
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              {t("Buxoro viloyatining durdonasi - qadimiy va go'zal Jondor tumani bilan tanishing", 
                 "Познакомьтесь с жемчужиной Бухарской области - древним и прекрасным Джондорским районом")}
            </p>
          </div>

          {/* Stats Grid
          <div className="grid grid-cols-2 gap-4 mb-16 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 text-center transition-all duration-500 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 transition-all duration-500 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 -z-10"></div>
                <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                     style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`, 
                              backgroundClip: 'text' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div> */}

          {/* Main Content Card */}
          <div className="mb-16 overflow-hidden bg-white shadow-xl rounded-2xl animate-fade-in-up">
            <div className="grid md:grid-cols-2">
              <div className="relative p-8 md:p-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-bl-full"></div>
                <div className="relative">
                  <div className="mb-4 text-5xl">🏞️</div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    {t("Tariximiz", "Наша история")}
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      {t('Jondor tumani — Buxoro viloyatidagi tuman. 1926-yil tashkil etilgan. Maʼmuriy markazi — Jondor shaharchasi.', 
                         'Джондорский район — район Бухарской области. Образован в 1926 году. Административный центр — город Джондор.')}
                    </p>
                    <p className="leading-relaxed">
                      {t('Hududi asosan tekisliklardan iborat boʻlib, aholisi dehqonchilik, chorvachilik va tadbirkorlik bilan shugʻullanadi.', 
                         'Территория в основном равнинная, население занимается земледелием, животноводством и предпринимательством.')}
                    </p>
                    <p className="leading-relaxed">
                      {t('Jondor tumani qadimiy Buxoro vohasining bir qismi hisoblanadi. Hududda milliy urf-odatlar, hunarmandchilik va anʼanaviy o\'zbek madaniyati saqlanib qolgan.', 
                         'Джондорский район является частью древней Бухарской оазиса. В районе сохранились национальные традиции, ремесла и традиционная узбекская культура.')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="mb-4 text-5xl">🌟</div>
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  {t("Rivojlanish", "Развитие")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <p className="text-gray-600">{t("Qishloq xoʻjaligi rivojlangan", "Развитое сельское хозяйство")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <p className="text-gray-600">{t("Paxta va gʻalla yetishtiriladi", "Выращивается хлопок и зерно")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <p className="text-gray-600">{t("Bogʻdorchilik va chorvachilik bilan shugʻullaniladi", "Занимаются садоводством и животноводством")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <p className="text-gray-600">{t("Yangi uy-joy va infratuzilma loyihalari amalga oshirilmoqda", "Реализуются новые жилищные и инфраструктурные проекты")}</p>
                  </div>
                </div>
                
                {/* Quick stats */}
                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-3 text-center bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-primary">52+</div>
                    <div className="text-xs text-gray-500">{t("Maktablar", "Школ")}</div>
                  </div>
                  <div className="p-3 text-center bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-secondary">15+</div>
                    <div className="text-xs text-gray-500">{t("Tibbiyot maskanlari", "Медицинские учреждения")}</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          {/* <div className="mb-16">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">
                {t("Tumanning afzalliklari", "Преимущества района")}
              </h2>
              <div className="flex justify-center">
                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 transition-all duration-500 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 text-5xl transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Leadership Section with Modal */}
          <div className="mt-16">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10">
                <span className="text-2xl">👥</span>
                <span className="text-sm font-semibold text-primary">
                  {t("Bizning jamoa", "Наша команда")}
                </span>
              </div>
              <h2 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">
                {t('Tuman rahbariyati', 'Руководство района')}
              </h2>
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-secondary to-primary"></div>
              </div>
              <p className="max-w-2xl mx-auto text-gray-500">
                {t("Rahbariyatimiz sizning manfaatlaringiz va farovonligingiz yo'lida mehnat qiladi", 
                   "Наше руководство работает на благо ваших интересов и благополучия")}
              </p>
            </div>

            {leadership.length === 0 ? (
              <div className="py-20 text-center transition-all duration-300 bg-white shadow-xl rounded-2xl">
                <div className="mb-4 text-6xl">👥</div>
                <p className="text-gray-500">{t("Hech qanday rahbar yo'q", "Нет руководителей")}</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {leadership.map((leader, index) => (
                  <div
                    key={leader.id}
                    className="group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => handleLeaderClick(leader)}
                  >
                    <div className="overflow-hidden transition-all duration-500 transform bg-white shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative overflow-hidden h-72">
                        {leader.image ? (
                          <>
                            <img
                              src={leader.image}
                              alt={leader.name}
                              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100"></div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                            <i className="text-8xl text-gray-400 transition-all duration-300 fas fa-user-circle group-hover:scale-110 group-hover:text-primary"></i>
                          </div>
                        )}
                        
                        {/* Position Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="px-4 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg backdrop-blur-sm">
                            {index === 0 ? t("Rais", "Председатель") : t("A'zo", "Член")}
                          </div>
                        </div>
                        
                        {/* Hover Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                          <div className="space-y-2">
                            {leader.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <i className="fas fa-phone"></i>
                                <span>{leader.phone}</span>
                              </div>
                            )}
                            {leader.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <i className="fas fa-envelope"></i>
                                <span className="truncate">{leader.email}</span>
                              </div>
                            )}
                            <div className="pt-2 text-xs opacity-80">
                              <i className="fas fa-mouse-pointer"></i> {t("Batafsil uchun bosing", "Нажмите для деталей")}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 text-center">
                        <h3 className="mb-1 text-xl font-bold text-gray-800 transition-colors group-hover:text-primary">
                          {leader.name}
                        </h3>
                        <p className="text-sm font-medium text-primary/80">
                          {leader.position}
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex justify-center gap-3 mt-4">
                          <div className="w-8 h-8 transition-all duration-300 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:scale-110 cursor-pointer group/social">
                            <i className="text-sm text-gray-600 fas fa-phone-alt group-hover/social:text-white"></i>
                          </div>
                          <div className="w-8 h-8 transition-all duration-300 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:scale-110 cursor-pointer group/social">
                            <i className="text-sm text-gray-600 fas fa-envelope group-hover/social:text-white"></i>
                          </div>
                          <div className="w-8 h-8 transition-all duration-300 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:scale-110 cursor-pointer group/social">
                            <i className="text-sm text-gray-600 fab fa-telegram group-hover/social:text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="relative p-12 mt-16 overflow-hidden text-center bg-white shadow-xl rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="mb-4 text-5xl">🤝</div>
              <h3 className="mb-3 text-2xl font-bold md:text-3xl gradient-text">
                {t("Biz bilan hamkorlik qiling", "Сотрудничайте с нами")}
              </h3>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500">
                {t("Jondor tumani sizning investitsiyalaringiz va loyihalaringizni kutmoqda", 
                   "Джондорский район ждет ваших инвестиций и проектов")}
              </p>
              <button className="px-8 py-3 font-semibold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:scale-105 hover:from-secondary hover:to-primary">
                {t("Bog'lanish", "Связаться")}
                <i className="ml-2 fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Leader Details */}
      {showModal && selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-all duration-300"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full shadow-lg">
                  {selectedLeader.image ? (
                    <img src={selectedLeader.image} alt={selectedLeader.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <i className="text-5xl text-gray-400 fas fa-user-circle"></i>
                    </div>
                  )}
                </div>
                
                <h3 className="mb-1 text-2xl font-bold text-gray-800">{selectedLeader.name}</h3>
                <p className="mb-4 text-primary font-semibold">{selectedLeader.position}</p>
                
                <div className="w-full pt-4 space-y-3 border-t border-gray-200">
                  {selectedLeader.phone && (
                    <div className="flex items-center gap-3 p-3 transition-all duration-300 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <i className="text-green-600 fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t("Telefon", "Телефон")}</p>
                        <a href={`tel:${selectedLeader.phone}`} className="font-medium text-gray-700 hover:text-primary">
                          {selectedLeader.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedLeader.email && (
                    <div className="flex items-center gap-3 p-3 transition-all duration-300 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="text-blue-600 fas fa-envelope"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t("Email", "Электронная почта")}</p>
                        <a href={`mailto:${selectedLeader.email}`} className="font-medium text-gray-700 hover:text-primary">
                          {selectedLeader.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {selectedLeader.address && (
                    <div className="flex items-center gap-3 p-3 transition-all duration-300 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <i className="text-purple-600 fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{t("Manzil", "Адрес")}</p>
                        <p className="font-medium text-gray-700">{selectedLeader.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full mt-6 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                >
                  {t("Yopish", "Закрыть")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}