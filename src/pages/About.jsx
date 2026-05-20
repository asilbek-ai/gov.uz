import { useContext } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="max-w-4xl mx-auto container-custom">
        <h1 className="mb-6 text-3xl font-bold text-center gradient-text">{t('Jondor tumani haqida', 'О Джондорском районе')}</h1>
        <div className="w-20 h-1 mx-auto mb-8 rounded-full bg-primary"></div>
        
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <p className="mb-4 leading-relaxed text-gray-700">
            {t('Jondor tumani — Buxoro viloyatidagi tuman. 1926-yil 29-sentyabrda tashkil etilgan. Tuman markazi — Jondor shahri. Tuman hududi 1.2 ming km². Aholisi 128 ming kishi.', 'Джондорский район — район Бухарской области. Образован 29 сентября 1926 года. Районный центр — город Джондор. Площадь района 1,2 тыс. км². Население 128 тысяч человек.')}
          </p>
          <p className="leading-relaxed text-gray-700">
            {t('Tuman sharqda Buxoro tumani, shimolda Romitan tumani, g\'arbda Qorakul tumani va janubda Kogon tumani bilan chegaradosh.', 'Район граничит на востоке с Бухарским районом, на севере с Ромитанским районом, на западе с Каракульским районом и на юге с Когонским районом.')}
          </p>
        </div>
        
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <div className="p-5 bg-white shadow-md rounded-xl">
            <i className="mb-3 text-3xl text-primary fas fa-history"></i>
            <h3 className="mb-2 text-xl font-bold">{t('Tarix', 'История')}</h3>
            <p className="text-gray-600">
              {t('Jondor tumani qadimiy tarixga ega. Bu yerdan topilgan arxeologik topilmalar miloddan avvalgi davrlarga borib taqaladi.', 'Джондорский район имеет древнюю историю. Археологические находки, найденные здесь, относятся к дохристианской эре.')}
            </p>
          </div>
          <div className="p-5 bg-white shadow-md rounded-xl">
            <i className="mb-3 text-3xl text-primary fas fa-chart-line"></i>
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