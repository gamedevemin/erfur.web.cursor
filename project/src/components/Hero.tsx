import React from 'react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" 
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"
          style={{ willChange: 'transform' }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Zarafeti<br />Keşfedin
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl font-light leading-relaxed">
            Her parça bir hikaye anlatır. ERFUR'da benzersiz tasarımlarla kendi hikayenizi yaratın.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href="#collections" 
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Yeni Koleksiyonu Keşfet
            </a>
            <a 
              href="#bestsellers" 
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-200"
            >
              En Çok Satanlar
            </a>
          </div>
          <div className="mt-6 sm:mt-8 inline-block bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <p className="text-white text-sm font-medium">
              🎁 İlk alışverişinize özel %10 indirim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}