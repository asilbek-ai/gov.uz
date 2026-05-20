import { useContext } from 'react';
import { AppContext } from '../App';

export default function Services() {
  const { t, adminData } = useContext(AppContext);
  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-6 text-3xl font-bold gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminData.services.map(service => (
            <div key={service.id} className="p-5 transition bg-white shadow rounded-xl hover:shadow-lg">
              <i className={`fas fa-${service.icon} text-3xl text-primary mb-3 block`}></i>
              <h3 className="mb-2 font-bold">{t(service.name, service.nameRu)}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}