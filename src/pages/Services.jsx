import { useContext } from 'react';
import { AppContext } from '../App';

export default function Services() {
  const { t, services } = useContext(AppContext);
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Sizga kerakli barcha davlat xizmatlari bir joyda', 'Все необходимые государственные услуги в одном месте')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.id} className="p-5 transition bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <i className={`fas fa-${service.icon} text-xl text-primary`}></i>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{t(service.name, service.nameRu)}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  {service.department && (
                    <p className="mt-2 text-xs text-primary">{service.department}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {services.length === 0 && (
          <div className="py-12 text-center">
            <i className="mb-4 text-5xl text-gray-300 fas fa-th-large"></i>
            <p className="text-gray-500">Hech qanday xizmat yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
}