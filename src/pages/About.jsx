import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t, leadership } = useContext(AppContext);

  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('Jondor tumani haqida', 'О Джондорском районе')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Buxoro viloyatining go\'zal tumani', 'Красивый район Бухарской области')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Tuman haqida ma'lumot */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <i className="fas fa-landmark text-3xl text-primary mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">{t('Tuman tarixi', 'История района')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('Jondor tumani 1926-yil 29-sentyabrda tashkil etilgan. Tuman markazi — Jondor shahri. Tuman hududi 1.2 ming km² ni tashkil etadi.', 
                  'Джондорский район образован 29 сентября 1926 года. Районный центр — город Джондор. Площадь района составляет 1,2 тыс. км².')}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <i className="fas fa-chart-line text-3xl text-primary mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">{t('Iqtisodiyot', 'Экономика')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('Tuman iqtisodiyotining asosiy tarmoqlari: paxtachilik, g\'allachilik, bog\'dorchilik va chorvachilik.',
                  'Основные отрасли экономики района: хлопководство, зерноводство, садоводство и животноводство.')}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">{t('Raqamlar bilan tuman', 'Район в цифрах')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">42</div>
                  <div className="text-sm text-gray-500">{t('Mahalla', 'Махалля')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">86</div>
                  <div className="text-sm text-gray-500">{t('Maktab', 'Школ')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">24</div>
                  <div className="text-sm text-gray-500">{t('Kasalxona', 'Больниц')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-primary">1250+</div>
                  <div className="text-sm text-gray-500">{t('Tadbirkor', 'Предпринимателей')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RAHBARIYAT SECTION - PUBLICGA KO'RINADI */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold gradient-text mb-3">
              {t('Tuman rahbariyati', 'Руководство района')}
            </h2>
            <p className="text-gray-500">{t('Xalq uchun xizmat qilayotgan yetakchilar', 'Лидеры, служащие народу')}</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          {leadership && leadership.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map(leader => (
                <div key={leader.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-56 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                    {leader.image ? (
                      <img src={leader.image} className="w-full h-full object-cover" alt={leader.name} />
                    ) : (
                      <div className="text-center">
                        <i className="fas fa-user-circle text-6xl text-primary/40"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-xl mb-1">{leader.name}</h3>
                    <p className="text-primary text-sm font-medium">{leader.position}</p>
                    {leader.positionRu && <p className="text-gray-500 text-xs mt-1">{leader.positionRu}</p>}
                    <div className="mt-3 pt-3 border-t flex justify-center gap-4 text-sm text-gray-500">
                      {leader.phone && <span><i className="fas fa-phone mr-1"></i> {leader.phone}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <i className="fas fa-users text-5xl text-gray-300 mb-3"></i>
              <p className="text-gray-500">{t('Rahbariyat ma\'lumotlari hali qo\'shilmagan', 'Информация о руководстве еще не добавлена')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}