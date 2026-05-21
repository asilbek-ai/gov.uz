import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="min-h-screen py-16 pt-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {t('Jondor tumani haqida', 'О Джондорском районе')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Buxoro viloyatining go\'zal tumani', 'Красивый район Бухарской области')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                {t('Tuman iqtisodiyotining asosiy tarmoqlari: paxtachilik, g\'allachilik, bog\'dorchilik va chorvachilik. Shuningdek, kichik biznes va xizmat ko\'rsatish sohasi rivojlanmoqda.',
                  'Основные отрасли экономики района: хлопководство, зерноводство, садоводство и животноводство. Также развиваются малый бизнес и сфера услуг.')}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <i className="fas fa-graduation-cap text-3xl text-primary mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">{t('Ta\'lim va madaniyat', 'Образование и культура')}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t('Tumanda 42 ta umumta\'lim maktabi, 24 ta maktabgacha ta\'lim muassasasi, 3 ta kasb-hunar maktabi faoliyat yuritadi. Madaniyat va sport sohasi ham jadal rivojlanmoqda.',
                  'В районе действуют 42 общеобразовательных школы, 24 дошкольных учреждения, 3 профессиональных училища. Активно развивается сфера культуры и спорта.')}
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
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=800" 
                alt="Jondor tumani" 
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{t('Jondor shahri', 'Город Джондор')}</h3>
                <p className="text-gray-500 text-sm">
                  {t('Tuman markazi — Jondor shahri. Shahar go\'zal tabiati va mehmondo\'st aholisi bilan mashhur.',
                    'Районный центр — город Джондор. Город славится красивой природой и гостеприимными жителями.')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
          <i className="fas fa-quote-left text-4xl text-primary/30 mb-4"></i>
          <p className="text-xl text-gray-700 italic max-w-3xl mx-auto">
            {t('Jondor tumani — Buxoro viloyatining qadimiy va go\'zal tumanlaridan biri. Bu yerda an\'analar va zamonaviylik uyg\'unlashgan.',
              'Джондорский район — один из древнейших и красивейших районов Бухарской области. Здесь гармонично сочетаются традиции и современность.')}
          </p>
        </div>
      </div>
    </div>
  );
}