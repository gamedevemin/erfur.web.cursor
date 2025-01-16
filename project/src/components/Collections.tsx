import React, { useState } from 'react';

const collections = [
  {
    id: 1,
    name: 'Çanta Koleksiyonu',
    description: 'Lüks ve zarafet',
    gradient: 'from-purple-600 via-pink-500 to-red-500',
    icon: '👜'
  },
  {
    id: 2,
    name: 'Takı Serisi',
    description: 'Işıltılı dokunuşlar',
    gradient: 'from-blue-500 via-teal-500 to-emerald-500',
    icon: '💎'
  },
  {
    id: 3,
    name: 'Aksesuar Dünyası',
    description: 'Tarzınızı tamamlayın',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    icon: '✨'
  },
];

export default function Collections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeIndex < collections.length - 1) {
      setActiveIndex(prev => prev + 1);
    }

    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

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

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {collections.map((collection) => (
            <div key={collection.id} className="group relative">
              <div className={`relative w-full h-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${collection.gradient}`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-6xl mb-4">{collection.icon}</span>
                  <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-lg text-white/90">{collection.description}</p>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href={`#collection-${collection.id}`}
                  className={`relative inline-flex items-center px-6 py-2 rounded-full overflow-hidden group/button
                    before:absolute before:inset-0 before:bg-gradient-to-r ${collection.gradient} 
                    before:transition-transform before:duration-500 hover:before:scale-105`}
                >
                  <span className="relative z-10 text-white font-medium">
                    Koleksiyonu Keşfet
                    <span className="inline-block ml-2 transform group-hover/button:translate-x-1 transition-transform">
                      ✨
                    </span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden mt-16">
          <div 
            className="relative overflow-hidden touch-pan-x"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {collections.map((collection) => (
                <div key={collection.id} className="w-full flex-shrink-0">
                  <div className={`relative w-full h-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${collection.gradient}`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <span className="text-6xl mb-4">{collection.icon}</span>
                      <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                      <p className="text-lg text-white/90">{collection.description}</p>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="mt-6 flex justify-center">
                    <a
                      href={`#collection-${collection.id}`}
                      className={`relative inline-flex items-center px-6 py-2 rounded-full overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-r ${collection.gradient} 
                        before:transition-transform before:duration-500 active:before:scale-95`}
                    >
                      <span className="relative z-10 text-white font-medium">
                        Koleksiyonu Keşfet
                        <span className="inline-block ml-2">✨</span>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}