import React from 'react';
import { Image } from './ui/Image';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          className="w-full h-[700px] object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
          src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80"
          alt="Elegant luxury handbag on display"
          width={1920}
          height={700}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto py-32 px-4 sm:py-40 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
            Zarafeti<br />Keşfedin
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl font-light leading-relaxed drop-shadow">
            Her parça bir hikaye anlatır. ERFUR'da benzersiz tasarımlarla kendi hikayenizi yaratın.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#collections" className="btn-primary">
              Yeni Koleksiyonu Keşfet
            </a>
            <a href="#bestsellers" className="btn-secondary">
              En Çok Satanlar
            </a>
          </div>
          <div className="mt-8 inline-block bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <p className="text-white text-sm font-medium">
              🎁 İlk alışverişinize özel %10 indirim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}