import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function About() {
  const { t, leadership } = useContext(AppContext);

  return (
    <div className="min-h-screen py-16 pt-28 bg-gray-50">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold gradient-text">{t('Tuman haqida', 'О районе')}</h1>
          <div className="w-20 h-1 mx-auto rounded-full bg-primary"></div>
        </div>

        <div className="p-6 mb-10 bg-white shadow rounded-xl">
          <p className="leading-relaxed text-gray-600">
            {t('Jondor tumani — Buxoro viloyatidagi tuman. 1926-yil tashkil etilgan.', 'Джондорский район — район Бухарской области. Образован в 1926 году.')}
          </p>
        </div>

        {/* Rahbariyat bo'limi */}
        <div className="mt-12">
          <h2 className="mb-8 text-2xl font-bold text-center gradient-text">{t('Tuman rahbariyati', 'Руководство района')}</h2>
          {leadership.length === 0 ? (
            <div className="py-8 text-center text-gray-500">Hech qanday rahbar yo'q</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leadership.map(leader => (
                <div key={leader.id} className="overflow-hidden bg-white shadow-md rounded-xl">
                  <div className="flex items-center justify-center h-48 bg-gray-100">
                    {leader.image ? (
                      <img src={leader.image} className="object-cover w-full h-full" />
                    ) : (
                      <i className="text-6xl text-gray-300 fas fa-user-circle"></i>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold">{leader.name}</h3>
                    <p className="text-sm text-primary">{leader.position}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {leader.phone && <p><i className="mr-1 fas fa-phone"></i> {leader.phone}</p>}
                      {leader.email && <p><i className="mr-1 fas fa-envelope"></i> {leader.email}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}