import { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'kadin' | 'erkek';
  type: 'ust' | 'alt' | 'ayakkabi';
}

interface SizeTableRow {
  size: string;
  chest?: string;
  waist?: string;
  hip?: string;
  inseam?: string;
  footLength?: string;
}

const sizeGuides: Record<string, SizeTableRow[]> = {
  'kadin-ust': [
    { size: 'XS', chest: '82-85', waist: '63-66', hip: '89-92' },
    { size: 'S', chest: '86-89', waist: '67-70', hip: '93-96' },
    { size: 'M', chest: '90-93', waist: '71-74', hip: '97-100' },
    { size: 'L', chest: '94-97', waist: '75-78', hip: '101-104' },
    { size: 'XL', chest: '98-101', waist: '79-82', hip: '105-108' }
  ],
  'kadin-alt': [
    { size: '34', waist: '63-66', hip: '89-92', inseam: '76' },
    { size: '36', waist: '67-70', hip: '93-96', inseam: '76' },
    { size: '38', waist: '71-74', hip: '97-100', inseam: '77' },
    { size: '40', waist: '75-78', hip: '101-104', inseam: '77' },
    { size: '42', waist: '79-82', hip: '105-108', inseam: '78' }
  ],
  'kadin-ayakkabi': [
    { size: '36', footLength: '23.0' },
    { size: '37', footLength: '23.6' },
    { size: '38', footLength: '24.3' },
    { size: '39', footLength: '25.0' },
    { size: '40', footLength: '25.6' }
  ],
  'erkek-ust': [
    { size: 'S', chest: '91-96', waist: '76-81' },
    { size: 'M', chest: '97-102', waist: '82-87' },
    { size: 'L', chest: '103-108', waist: '88-93' },
    { size: 'XL', chest: '109-114', waist: '94-99' },
    { size: 'XXL', chest: '115-120', waist: '100-105' }
  ],
  'erkek-alt': [
    { size: '44', waist: '76-81', hip: '94-97', inseam: '82' },
    { size: '46', waist: '82-87', hip: '98-101', inseam: '82' },
    { size: '48', waist: '88-93', hip: '102-105', inseam: '83' },
    { size: '50', waist: '94-99', hip: '106-109', inseam: '83' },
    { size: '52', waist: '100-105', hip: '110-113', inseam: '84' }
  ],
  'erkek-ayakkabi': [
    { size: '40', footLength: '25.6' },
    { size: '41', footLength: '26.3' },
    { size: '42', footLength: '27.0' },
    { size: '43', footLength: '27.6' },
    { size: '44', footLength: '28.3' }
  ]
};

export function SizeGuide({ isOpen, onClose, category, type }: SizeGuideProps) {
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'inch'>('cm');
  const guideKey = `${category}-${type}` as keyof typeof sizeGuides;
  const sizes = sizeGuides[guideKey];

  const convertToInch = (value: string) => {
    if (value.includes('-')) {
      const [min, max] = value.split('-');
      return `${(parseInt(min) * 0.393701).toFixed(1)}-${(parseInt(max) * 0.393701).toFixed(1)}`;
    }
    return (parseInt(value) * 0.393701).toFixed(1);
  };

  const getHeaders = () => {
    const firstRow = sizes[0];
    return Object.keys(firstRow).filter(key => key !== 'size' && firstRow[key as keyof SizeTableRow]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-xl">
        {/* Başlık */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Ruler className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Beden Rehberi - {category.charAt(0).toUpperCase() + category.slice(1)} {type.charAt(0).toUpperCase() + type.slice(1)} Giyim
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Birim Seçimi */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Ölçü Birimi:</span>
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setMeasurementUnit('cm')}
                className={`px-3 py-1 text-sm ${
                  measurementUnit === 'cm'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                cm
              </button>
              <button
                onClick={() => setMeasurementUnit('inch')}
                className={`px-3 py-1 text-sm ${
                  measurementUnit === 'inch'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                inch
              </button>
            </div>
          </div>
        </div>

        {/* Beden Tablosu */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Beden
                </th>
                {getHeaders().map((header) => (
                  <th
                    key={header}
                    className="py-2 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, index) => (
                <tr
                  key={row.size}
                  className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}
                >
                  <td className="py-2 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {row.size}
                  </td>
                  {getHeaders().map((header) => {
                    const value = row[header as keyof SizeTableRow];
                    return (
                      <td
                        key={header}
                        className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {value && `${measurementUnit === 'inch' ? convertToInch(value) : value} ${measurementUnit}`}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ölçüm Talimatları */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Nasıl Ölçü Alınır?
          </h3>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            {type === 'ust' && (
              <>
                <li>• Göğüs: En geniş noktadan yatay olarak ölçün</li>
                <li>• Bel: Doğal bel hattından yatay olarak ölçün</li>
                <li>• Kalça: En geniş noktadan yatay olarak ölçün</li>
              </>
            )}
            {type === 'alt' && (
              <>
                <li>• Bel: Doğal bel hattından yatay olarak ölçün</li>
                <li>• Kalça: En geniş noktadan yatay olarak ölçün</li>
                <li>• İç Bacak: Kasıktan ayak bileğine kadar ölçün</li>
              </>
            )}
            {type === 'ayakkabi' && (
              <li>• Ayak Uzunluğu: Topuktan baş parmağa kadar ölçün</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 