import { useContext } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="max-w-4xl mx-auto container-custom">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl gradient-text">{t('Jondor tumani haqida', 'О Джондорском районе')}</h1>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
        </div>
        
        <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            {t('Jondor tumani — Buxoro viloyatidagi tuman. 1926-yil 29-sentyabrda tashkil etilgan. Tuman markazi — Jondor shahri. Tuman hududi 1.2 ming km². Aholisi 128 ming kishi.', 'Джондорский район — район Бухарской области. Образован 29 сентября 1926 года. Районный центр — город Джондор. Площадь района 1,2 тыс. км². Население 128 тысяч человек.')}
          </p>
          <p className="leading-relaxed text-gray-700">
            {t('Tuman sharqda Buxoro tumani, shimolda Romitan tumani, g\'arbda Qorakul tumani va janubda Kogon tumani bilan chegaradosh.', 'Район граничит на востоке с Бухарским районом, на севере с Ромитанским районом, на западе с Каракульским районом и на юге с Когонским районом.')}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 shadow-md bg-gradient-to-r from-blue-50 to-white rounded-2xl">
            <i className="mb-3 text-3xl fas fa-history text-primary"></i>
            <h3 className="mb-2 text-xl font-bold">{t('Tarix', 'История')}</h3>
            <p className="text-gray-600">
              {t('Jondor tumani qadimiy tarixga ega. Bu yerdan topilgan arxeologik topilmalar miloddan avvalgi davrlarga borib taqaladi.', 'Джондорский район имеет древнюю историю. Археологические находки, найденные здесь, относятся к дохристианской эре.')}
            </p>
          </div>
          <div className="p-6 shadow-md bg-gradient-to-r from-green-50 to-white rounded-2xl">
            <i className="mb-3 text-3xl fas fa-chart-line text-primary"></i>
            <h3 className="mb-2 text-xl font-bold">{t('Iqtisodiyot', 'Экономика')}</h3>
            <p className="text-gray-600">
              {t('Tuman iqtisodiyotining asosiy tarmoqlari: paxtachilik, g\'allachilik, bog\'dorchilik va chorvachilik.', 'Основные отрасли экономики района: хлопководство, зерноводство, садоводство и животноводство.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}