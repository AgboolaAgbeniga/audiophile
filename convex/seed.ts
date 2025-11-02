import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const seedProducts = action(async (ctx) => {
  const products = [
    {
      name: 'YX1 Wireless Earphones',
      slug: 'yx1-earphones',
      description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
      price: 599,
      image: '/assets/product-yx1-earphones/desktop/image-product.jpg',
      category: 'earphones',
      stock: 12,
      features: [
        'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
        'The YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.',
        'The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to.',
        'Connect via Bluetooth 5.0 for crystal-clear sound quality',
        'Touch control functionality for easy operation',
        'Quick charge capability - 15 minutes gives 3 hours of playback'
      ],
      includes: [
        { item: 'Earphone unit', quantity: 2 },
        { item: 'Multi-size earplugs', quantity: 6 },
        { item: 'User manual', quantity: 1 },
        { item: 'USB-C charging cable', quantity: 1 },
        { item: 'Travel pouch', quantity: 1 }
      ],
      gallery: [
        '/assets/product-yx1-earphones/desktop/image-gallery-1.jpg',
        '/assets/product-yx1-earphones/desktop/image-gallery-2.jpg',
        '/assets/product-yx1-earphones/desktop/image-gallery-3.jpg'
      ],
    },
    {
      name: 'XX59 Headphones',
      slug: 'xx59-headphones',
      description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
      price: 899,
      image: '/assets/product-xx59-headphones/desktop/image-product.jpg',
      category: 'headphones',
      stock: 15,
      features: [
        'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.',
        'More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.',
        'Immersive sound with adjustable audio settings. From the sleek bass and treble controls to the immersive sound with adjustable audio settings.',
        'An advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms.',
        'Wireless connectivity with long battery life and quick charge capabilities.'
      ],
      includes: [
        { item: 'Headphone unit', quantity: 1 },
        { item: 'Replacement earcups', quantity: 2 },
        { item: 'User manual', quantity: 1 },
        { item: '3.5mm 5m audio cable', quantity: 1 }
      ],
      gallery: [
        '/assets/product-xx59-headphones/desktop/image-gallery-1.jpg',
        '/assets/product-xx59-headphones/desktop/image-gallery-2.jpg',
        '/assets/product-xx59-headphones/desktop/image-gallery-3.jpg'
      ],
    },
    {
      name: 'XX99 Mark I Headphones',
      slug: 'xx99-mark-one-headphones',
      description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
      price: 1750,
      image: '/assets/product-xx99-mark-one-headphones/desktop/image-product.jpg',
      category: 'headphones',
      stock: 8,
      features: [
        'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.',
        'From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is includes with a balanced gold connector.',
        'Headphones that give you the power to completely customize your listening experience.',
        'Connect via Bluetooth or nearly any wired source.'
      ],
      includes: [
        { item: 'Headphone unit', quantity: 1 },
        { item: 'Replacement earcups', quantity: 2 },
        { item: 'User manual', quantity: 1 },
        { item: '3.5mm 5m audio cable', quantity: 1 }
      ],
      gallery: [
        '/assets/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg',
        '/assets/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg',
        '/assets/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg'
      ],
    },
    {
      name: 'XX99 Mark II Headphones',
      slug: 'xx99-mark-two-headphones',
      description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
      price: 2999,
      image: '/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg',
      category: 'headphones',
      stock: 10,
      features: [
        'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you\'re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you\'ll never miss a beat.',
        'The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.',
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
        '/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg',
        '/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg',
        '/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg'
      ],
    },
    {
      name: 'ZX7 Speaker',
      slug: 'zx7-speaker',
      description: 'Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
      price: 3500,
      image: '/assets/product-zx7-speaker/desktop/image-product.jpg',
      category: 'speakers',
      stock: 7,
      features: [
        'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.',
        'The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.',
        'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and Wi-Fi connectivity options.',
        'Bluetooth 5.0 wireless connectivity with 30ft range',
        'Built-in microphone for hands-free calls',
        '10-hour battery life with quick charge capability',
        'Foldable design for easy storage and portability'
      ],
      includes: [
        { item: 'Speaker unit', quantity: 2 },
        { item: 'Speaker cloth panel', quantity: 2 },
        { item: 'User manual', quantity: 1 },
        { item: '3.5mm 7.5m audio cable', quantity: 1 },
        { item: '7.5m optical cable', quantity: 1 }
      ],
      gallery: [
        '/assets/product-zx7-speaker/desktop/image-gallery-1.jpg',
        '/assets/product-zx7-speaker/desktop/image-gallery-2.jpg',
        '/assets/product-zx7-speaker/desktop/image-gallery-3.jpg'
      ],
    },
    {
      name: 'ZX9 Speaker',
      slug: 'zx9-speaker',
      description: 'Upgrade your sound system with the all new ZX9 active speaker. It\'s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
      price: 4500,
      image: '/assets/product-zx9-speaker/desktop/image-product.jpg',
      category: 'speakers',
      stock: 5,
      features: [
        'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
        'Discover clear, more natural sounding highs than the competition with ZX9\'s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5" aluminum alloy bass unit. You\'ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.',
        'Bluetooth 5.0 wireless connectivity with 30ft range',
        'Built-in microphone for hands-free calls',
        '10-hour battery life with quick charge capability',
        'Foldable design for easy storage and portability',
        'Distortion-free 8" woofer for deep, powerful bass',
        'High-performance tweeter for crystal-clear highs'
      ],
      includes: [
        { item: 'Speaker unit', quantity: 2 },
        { item: 'Speaker cloth panel', quantity: 2 },
        { item: 'User manual', quantity: 1 },
        { item: '3.5mm 10m audio cable', quantity: 1 },
        { item: '10m optical cable', quantity: 1 }
      ],
      gallery: [
        '/assets/product-zx9-speaker/desktop/image-gallery-1.jpg',
        '/assets/product-zx9-speaker/desktop/image-gallery-2.jpg',
        '/assets/product-zx9-speaker/desktop/image-gallery-3.jpg'
      ],
    },
  ];

  for (const product of products) {
    await ctx.runMutation(api.mutations.createProduct, product);
  }

  return { success: true, count: products.length };
});
