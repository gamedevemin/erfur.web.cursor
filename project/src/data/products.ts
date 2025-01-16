import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Vintage Deri Ceket',
    price: '₺1299',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Klasik kesim, yüksek kaliteli deri ceket. İç astar ve çoklu cep detayları.',
    stock: 8,
    discount: 15,
    category: 'kadin'
  },
  {
    id: 2,
    name: 'Casual Pamuklu Gömlek',
    price: '₺399',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Rahat kesim, %100 pamuk, casual gömlek. Uzun kollu ve düğmeli manşet.',
    stock: 15,
    category: 'erkek'
  },
  {
    id: 3,
    name: 'Premium Kot Pantolon',
    price: '₺799',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Slim fit kesim, streç kot pantolon. Yüksek bel ve rahat kullanım.',
    stock: 3,
    discount: 20,
    category: 'kadin'
  },
  {
    id: 4,
    name: 'Spor Ayakkabı',
    price: '₺1499',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Hafif ve konforlu spor ayakkabı. Özel yastıklama teknolojisi.',
    stock: 0,
    discount: 10,
    category: 'erkek'
  },
  {
    id: 5,
    name: 'Klasik Triko Kazak',
    price: '₺599',
    image: 'https://images.unsplash.com/photo-1631541909061-71e349d1a193?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Yün karışımlı, balıkçı yaka triko kazak. Kış sezonu için ideal.',
    stock: 12,
    category: 'erkek'
  },
  {
    id: 6,
    name: 'Deri El Çantası',
    price: '₺899',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Gerçek deri, orta boy el çantası. Ayarlanabilir askı ve iç bölmeler.',
    stock: 5,
    discount: 25,
    category: 'aksesuar'
  },
  {
    id: 7,
    name: 'Güneş Gözlüğü',
    price: '₺449',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'UV korumalı, polarize cam güneş gözlüğü. Modern tasarım.',
    stock: 20,
    category: 'aksesuar'
  },
  {
    id: 8,
    name: 'Akıllı Saat',
    price: '₺2999',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Fitness takibi, bildirimler ve şık tasarım bir arada.',
    stock: 7,
    discount: 30,
    category: 'aksesuar'
  }
]; 