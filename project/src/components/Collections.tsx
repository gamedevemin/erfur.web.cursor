import React from 'react';

const collections = [
  {
    id: 1,
    name: 'Sonbahar Koleksiyonu',
    description: 'Sezonun en trend parçaları',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Minimal Serisi',
    description: 'Sadeliğin zarafeti',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Vintage Dokunuş',
    description: 'Zamansız parçalar',
    image: 'https://images.unsplash.com/photo-1576022162861-7955f5837f12?auto=format&fit=crop&q=80',
  },
];

export default function Collections() {
  return (
    <div className="bg-gray-50 py-24" id="collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Koleksiyonlar
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Her tarza uygun, özenle seçilmiş parçalar
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {collections.map((collection) => (
            <div key={collection.id} className="group relative">
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-center object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-semibold text-white">{collection.name}</h3>
                  <p className="mt-2 text-sm text-gray-200">{collection.description}</p>
                </div>
              </div>
              <a
                href={`#collection-${collection.id}`}
                className="mt-6 inline-block text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors"
              >
                Koleksiyonu Keşfet 
                <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}