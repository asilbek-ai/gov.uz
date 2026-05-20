import { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Organizations() {
  const { t, organizations } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = organizations.filter(org =>
    t(org.name, org.nameRu).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Tashkilotlar ro\'yxati', 'Список организаций')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Tumanimizdagi davlat tashkilotlari', 'Государственные организации нашего района')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2 fas fa-search"></i>
            <input 
              type="text" 
              placeholder={t('Tashkilot qidirish...', 'Поиск организаций...')} 
              className="w-full py-3 pl-12 pr-4 border rounded-xl focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map(org => (
            <div key={org.id} className="p-5 transition bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <i className="text-xl text-primary fas fa-building"></i>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{t(org.name, org.nameRu)}</h3>
                  <p className="text-sm text-gray-500"><i className="mr-2 fas fa-phone-alt"></i>{org.phone}</p>
                  {org.email && <p className="text-sm text-gray-500"><i className="mr-2 fas fa-envelope"></i>{org.email}</p>}
                  {org.address && <p className="text-sm text-gray-500"><i className="mr-2 fas fa-map-marker-alt"></i>{org.address}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <i className="mb-4 text-5xl text-gray-300 fas fa-building"></i>
            <p className="text-gray-500">{t('Hech qanday tashkilot topilmadi', 'Организации не найдены')}</p>
          </div>
        )}
      </div>
    </div>
  );
}