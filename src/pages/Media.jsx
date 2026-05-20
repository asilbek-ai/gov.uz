import { useContext, useState } from 'react';
import { AppContext } from '../App';

export default function Media() {
  const { t, gallery } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const demoImages = [
    { id: 1, image: "https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800", title: "Yangi maktab", titleRu: "Новая школа" },
    { id: 2, image: "https://images.pexels.com/photos/162240/field-wheat-grain-crops-162240.jpeg?w=800", title: "Paxta terimi", titleRu: "Сбор хлопка" },
    { id: 3, image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800", title: "Investitsiya forumi", titleRu: "Инвестиционный форум" },
    { id: 4, image: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?w=800", title: "Sport majmuasi", titleRu: "Спортивный комплекс" },
    { id: 5, image: "https://images.pexels.com/photos/144982/pexels-photo-144982.jpeg?w=800", title: "Jondor shahri", titleRu: "Город Джондор" },
    { id: 6, image: "https://images.pexels.com/photos/263477/pexels-photo-263477.jpeg?w=800", title: "Yangi uskunalar", titleRu: "Новое оборудование" }
  ];
  
  const images = gallery.length > 0 ? gallery : demoImages;
  
  return (
    <div className="min-h-screen py-16 pt-28">
      <div className="container-custom">
        <h1 className="mb-4 text-3xl font-bold text-center gradient-text">{t('Media galereya', 'Медиа галерея')}</h1>
        <p className="mb-8 text-center text-gray-500">{t('Tumanimiz hayotidan foto va videolar', 'Фото и видео из жизни нашего района')}</p>
        <div className="w-20 h-1 mx-auto mb-10 rounded-full bg-primary"></div>
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {images.map(img => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img)} 
              className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl group hover:shadow-2xl"
            >
              <img src={img.image} className="object-cover w-full h-64 transition duration-500 group-hover:scale-110" alt={img.title} />
              <div className="absolute inset-0 transition duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition duration-300 translate-y-full group-hover:translate-y-0">
                <p className="font-semibold">{t(img.title, img.titleRu)}</p>
              </div>
              <div className="absolute flex items-center justify-center w-10 h-10 transition duration-300 rounded-full opacity-0 top-4 right-4 bg-white/20 backdrop-blur group-hover:opacity-100">
                <i className="text-white fas fa-search-plus"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedImage(null)}>
          <div className="w-full max-w-4xl overflow-hidden bg-white rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} className="w-full h-auto" alt={selectedImage.title} />
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-bold">{t(selectedImage.title, selectedImage.titleRu)}</h3>
              <button onClick={() => setSelectedImage(null)} className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600">
                {t('Yopish', 'Закрыть')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}