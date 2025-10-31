import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'XX99 Mark II Headphones',
    description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    price: 2999,
    image: '/images/products/xx99-mark-two-headphones.jpg',
    category: 'headphones',
    features: [
      'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening.',
      'It includes intuitive controls designed for any situation. Whether you\'re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you\'ll never miss a beat.',
      'The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to.',
      'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and Wi-Fi connectivity options.',
      'Bluetooth 5.0 wireless connectivity with 30ft range',
      'Foldable design for easy storage and portability',
      'Built-in microphone for hands-free calls',
      '10-hour battery life with quick charge capability'
    ],
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 },
      { item: 'Travel bag', quantity: 1 }
    ],
    gallery: [
      '/images/products/xx99-mark-two-headphones-gallery-1.jpg',
      '/images/products/xx99-mark-two-headphones-gallery-2.jpg',
      '/images/products/xx99-mark-two-headphones-gallery-3.jpg'
    ],
    others: []
  }
];