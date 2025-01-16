import React from 'react';

export default function Newsletter() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Yeni Koleksiyonlardan Haberdar Olun
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            En yeni ürünlerimiz ve özel kampanyalarımızdan ilk siz haberdar olun.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <input
                type="email"
                className="px-5 py-3 border border-transparent text-base font-medium rounded-l-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                placeholder="E-posta adresiniz"
              />
              <button className="px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-gray-900 hover:bg-gray-800">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}