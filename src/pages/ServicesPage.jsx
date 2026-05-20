// src/pages/Services.jsx
import { useContext } from 'react';
import { AppContext } from '../App';
export default function Services() { const { t, adminData } = useContext(AppContext); return (<div className="min-h-screen pb-16 pt-28"><div className="container-custom"><h1 className="mb-6 text-3xl font-bold gradient-text">{t('Davlat xizmatlari', 'Государственные услуги')}</h1><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{adminData.services.map(s => (<div key={s.id} className="p-5 bg-white shadow rounded-xl"><i className={`fas fa-${s.icon} text-3xl text-primary mb-3 block`}></i><h3 className="mb-2 font-bold">{t(s.name, s.nameRu)}</h3><p className="text-sm text-gray-600">{s.description}</p></div>))}</div></div></div>); }
