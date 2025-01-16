import React, { useState } from 'react';

interface NewsletterProps {
  onSubscribe?: () => Promise<void>;
}

export default function Newsletter({ onSubscribe }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      // Email aboneliği işlemi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Bildirim izni isteği
      if (onSubscribe) {
        await onSubscribe();
      }

      setMessage('Başarıyla abone oldunuz!');
      setEmail('');
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 border border-transparent text-base font-medium rounded-l-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  placeholder="E-posta adresiniz"
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Abone Ol'}
                </button>
              </div>
            </div>
            {message && (
              <p className={`mt-4 text-sm ${message.includes('hata') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}