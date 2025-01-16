import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Ayşe K.',
    comment: 'Takıların kalitesi ve özgün tasarımları gerçekten etkileyici. Kesinlikle tavsiye ediyorum!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Zeynep M.',
    comment: 'Hızlı kargo ve özenli paketleme. Her parça bir sanat eseri gibi.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Deniz B.',
    comment: 'Vintage koleksiyonu tam aradığım tarz. Fiyat/performans açısından mükemmel.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80',
  },
];

export default function SocialProof() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Müşterilerimiz Ne Diyor?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Mutlu müşterilerimizin deneyimleri
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{review.name}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.207l7.046-1.024L10 0l2.782 6.183 7.046 1.024-4.71 4.664 1.209 7.037L10 15.585z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <img
              src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg"
              alt="Trustpilot"
              className="h-8"
            />
            <span>4.9/5 ortalama puan (250+ değerlendirme)</span>
          </div>
        </div>
      </div>
    </div>
  );
}