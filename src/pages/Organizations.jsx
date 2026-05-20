import { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Organizations() {
  const { t, adminData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrgs = adminData.organizations.filter(org =>
    t(org.name, org.nameRu).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen pb-16 pt-28">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold gradient-text">{t('Tashkilotlar ro\'yxati', 'Список организаций')}</h1>
          <p className="text-gray-500">{t('Tumanimizdagi davlat tashkilotlari', 'Государственные организации нашего района')}</p>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary"></div>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <i className="absolute text-gray-400 -translate-y-1/2 fas fa-search left-4 top-1/2"></i>
            <input
              type="text"
              placeholder={t('Tashkilot qidirish...', 'Поиск организаций...')}
              className="w-full py-3 pl-12 pr-4 border border-gray-200 shadow-sm rounded-xl focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredOrgs.map(org => (
            <div key={org.id} className="p-5 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl">
                  <i className="text-2xl fas fa-building text-primary"></i>
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold">{t(org.name, org.nameRu)}</h3>
                  <p className="text-sm text-gray-500"><i className="w-4 mr-2 fas fa-phone-alt"></i>{org.phone}</p>
                  {org.email && <p className="text-sm text-gray-500"><i className="w-4 mr-2 fas fa-envelope"></i>{org.email}</p>}
                  {org.address && <p className="text-sm text-gray-500"><i className="w-4 mr-2 fas fa-map-marker-alt"></i>{org.address}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredOrgs.length === 0 && (
          <div className="py-12 text-center">
            <i className="mb-4 text-5xl text-gray-300 fas fa-building"></i>
            <p className="text-gray-500">{t('Hech qanday tashkilot topilmadi', 'Организации не найдены')}</p>
          </div>
        )}
      </div>
    </div>
  );
}