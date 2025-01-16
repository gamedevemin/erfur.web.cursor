import { useState, useEffect, useRef } from 'react';
import { Truck, Shield, Clock, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ValueProp {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  stat: {
    value: number;
    suffix: string;
    duration: number;
  };
}

const valueProps: ValueProp[] = [
  {
    id: 1,
    icon: <Truck className="h-8 w-8" />,
    title: 'Hızlı Teslimat',
    description: 'Siparişleriniz aynı gün kargoya verilir',
    stat: {
      value: 24,
      suffix: 'Saat',
      duration: 1500
    }
  },
  {
    id: 2,
    icon: <Shield className="h-8 w-8" />,
    title: 'Güvenli Alışveriş',
    description: '%100 müşteri memnuniyeti garantisi',
    stat: {
      value: 100,
      suffix: '%',
      duration: 2000
    }
  },
  {
    id: 3,
    icon: <Clock className="h-8 w-8" />,
    title: '7/24 Destek',
    description: 'Her zaman yanınızdayız',
    stat: {
      value: 365,
      suffix: 'Gün',
      duration: 2500
    }
  },
  {
    id: 4,
    icon: <Award className="h-8 w-8" />,
    title: 'Kalite Garantisi',
    description: 'En kaliteli ürünler',
    stat: {
      value: 1000,
      suffix: '+',
      duration: 3000
    }
  }
];

const ValueProposition = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  // Sayaç animasyonu
  const Counter = ({ value, suffix, duration }: ValueProp['stat']) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [inView, value, duration]);

    return (
      <span className="text-4xl font-bold text-white">
        {count}
        {suffix}
      </span>
    );
  };

  // Mobil kaydırma işlemleri
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

    if (isLeftSwipe && activeIndex < valueProps.length - 1) {
      setActiveIndex(prev => prev + 1);
    }

    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Neden Bizi Tercih Etmelisiniz?
        </h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8" ref={statsRef}>
          {valueProps.map((prop) => (
            <div
              key={prop.id}
              className="group p-6 rounded-xl bg-white hover:bg-gray-50 transition-colors duration-300 relative overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                {prop.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-900">{prop.title}</h3>
              <p className="text-gray-600 mb-4">{prop.description}</p>

              <div className="mt-auto">
                <Counter {...prop.stat} />
              </div>

              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 rounded-xl transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Mobil Carousel */}
        <div className="md:hidden relative" ref={carouselRef}>
          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`
              }}
            >
              {valueProps.map((prop) => (
                <div
                  key={prop.id}
                  className="w-full flex-shrink-0 p-6"
                >
                  <div className="bg-white rounded-xl p-6 h-full border border-gray-200 shadow-sm">
                    <div className="text-primary mb-4">{prop.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{prop.title}</h3>
                    <p className="text-gray-600 mb-4">{prop.description}</p>
                    <div className="mt-auto">
                      <Counter {...prop.stat} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {valueProps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-primary'
                    : 'bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValueProposition;