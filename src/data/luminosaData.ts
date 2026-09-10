import { ProductItem, AudiencePersona, ValuePillar } from '../types';

import heroImg from '../assets/images/ysf_radio_hero.png';
import greenImg from '../assets/images/ysf_radio_green_1789052136359.jpg';
import frontImg from '../assets/images/luminosa_ysf_front_1788929128014.jpg';
import lifestyleImg from '../assets/images/luminosa_hero_lifestyle_1788929149278.jpg';
import detailImg from '../assets/images/luminosa_radio_detail_1788929232508.jpg';
import boxImg from '../assets/images/luminosa_in_box_1788929167839.jpg';
import travelImg from '../assets/images/luminosa_outdoor_travel_1788929201391.jpg';

export const LUMINOSA_PRODUCT: ProductItem = {
  id: 'ysf-005bt',
  name: 'YSF-005BT',
  model: 'YSF-005BT',
  tagline: 'Portable FM Radio + Bluetooth Speaker',
  priceNPR: 2600,
  originalPriceNPR: 3200,
  rating: 4.9,
  reviewCount: 42,
  shortDescription:
    'A compact everyday audio companion combining FM radio and Bluetooth audio with multiple playback options. Designed for music, radio, and entertainment wherever your day takes you. Available in Classic Matte Black and Forest Green.',
  inStock: true,
  colors: [
    {
      id: 'black',
      name: 'Matte Black / Gunmetal',
      nameNe: 'कालो (Matte Black)',
      hex: '#2b2d30',
      badge: 'Classic Edition',
      badgeNe: 'क्लासिक संस्करण',
      imageUrl: heroImg,
    },
    {
      id: 'green',
      name: 'Forest / Army Green',
      nameNe: 'हरियो (Forest Green)',
      hex: '#3b533b',
      badge: 'Outdoor Edition',
      badgeNe: 'आउटडोर संस्करण',
      imageUrl: greenImg,
    },
  ],
  images: [
    {
      id: 'black-front',
      url: heroImg,
      title: 'Matte Black Edition',
      caption: 'Original YSF-005BT with metal speaker grille, digital display & tactile orange keys',
    },
    {
      id: 'green-edition',
      url: greenImg,
      title: 'Forest Green Edition',
      caption: 'Rugged outdoor green finish with crisp numeric dial and FM antenna',
    },
    {
      id: 'lifestyle-hero',
      url: lifestyleImg,
      title: 'Desk & Home Companion',
      caption: 'Elevates everyday moments at your workspace or living room',
    },
    {
      id: 'detail',
      url: detailImg,
      title: 'Precision Controls & Ports',
      caption: 'Side volume dial, 3.5mm AUX headphone port, and USB-C charging',
    },
    {
      id: 'box',
      url: boxImg,
      title: "What's In The Box",
      caption: 'Includes radio unit, rechargeable battery, USB-C cable, in-ear headphones & strap',
    },
    {
      id: 'outdoor',
      url: travelImg,
      title: 'Outdoors & Travel',
      caption: 'Lightweight and durable companion across Kathmandu and the hills of Nepal',
    },
  ],
  features: [
    {
      iconName: 'Radio',
      title: 'FM Radio',
      description: 'Tune into your favorite stations wherever you are with the sensitive antenna.',
    },
    {
      iconName: 'Bluetooth',
      title: 'Bluetooth Audio',
      description: 'Connect your phone effortlessly and enjoy your personal playlists wirelessly.',
    },
    {
      iconName: 'HardDrive',
      title: 'USB & TF Support',
      description: 'Play compatible music files directly from supported thumb drives and microSD cards.',
    },
    {
      iconName: 'Headphones',
      title: 'AUX Input',
      description: 'Connect compatible wired audio sources or plug in earphones for private listening.',
    },
    {
      iconName: 'Compass',
      title: 'Portable Design',
      description: 'Compact enough (~150g) to take with you wherever the day goes.',
    },
    {
      iconName: 'BatteryCharging',
      title: 'Rechargeable Battery',
      description: '800 mAh Li-ion rechargeable cell designed for long, convenient portable use.',
    },
    {
      iconName: 'Zap',
      title: 'USB-C Charging',
      description: 'Simple and modern charging using standard USB-C cables you already own.',
    },
    {
      iconName: 'Sliders',
      title: 'Easy Controls',
      description: 'Straightforward numeric dial and orange tact buttons without complicated setup.',
    },
  ],
  specifications: [
    { name: 'Model', details: 'YSF-005BT' },
    { name: 'Available Colors', details: 'Matte Black / Gunmetal & Forest Green' },
    { name: 'Product Type', details: 'Portable FM Radio + Bluetooth Speaker' },
    { name: 'Bluetooth', details: 'Bluetooth wireless connectivity (~10m range)' },
    { name: 'FM Radio', details: 'Supported with built-in telescopic antenna (87.5 - 108.0 MHz)' },
    { name: 'USB Port', details: 'Supported (MP3 / WAV playback via USB Flash drive)' },
    { name: 'TF / microSD', details: 'Supported up to 32GB' },
    { name: 'AUX / Audio Out', details: '3.5mm stereo jack' },
    { name: 'Charging Port', details: 'USB Type-C (DC 5V input)' },
    { name: 'Battery', details: '800 mAh rechargeable Li-ion cell*' },
    { name: 'Weight', details: 'Approx. 150g*' },
    { name: 'Dimensions', details: 'Approx. 118 × 33.5 × 72.5 mm*' },
  ],
  boxContents: [
    'YSF-005BT portable unit',
    'USB-C charging cable',
    'Rechargeable 800 mAh Li-ion battery',
    'Wired in-ear 3.5mm earphones',
    'Carrying hand wrist lanyard',
    'User manual & quick start guide',
  ],
};

export const AUDIENCE_PERSONAS: AudiencePersona[] = [
  {
    id: 'travelers',
    title: 'Travelers',
    emoji: '🎒',
    description: 'Compact and easy to carry for trips, road journeys and outdoor moments.',
    idealFor: 'Hiking trails, weekend getaways to Pokhara, and bus journeys.',
  },
  {
    id: 'office',
    title: 'Office & Desk Users',
    emoji: '💼',
    description: 'A simple audio companion for your workspace.',
    idealFor: 'Focus background music, news bulletin breaks, and clean desk setups.',
  },
  {
    id: 'home',
    title: 'Home Users',
    emoji: '🏠',
    description: 'Enjoy radio, music and everyday entertainment around the house.',
    idealFor: 'Kitchen cooking sessions, morning tea on the balcony, and evening podcasts.',
  },
  {
    id: 'outdoors',
    title: 'Outdoor Lovers',
    emoji: '🌿',
    description: 'Take your music and radio beyond the walls of your home.',
    idealFor: 'Rooftop hangouts, picnics, camping, and riverside gatherings.',
  },
  {
    id: 'gifts',
    title: 'Gift Buyers',
    emoji: '🎁',
    description: 'A practical and interesting gift for someone who enjoys music and radio.',
    idealFor: 'Parents, grandparents, music lovers, or friends who appreciate thoughtful design.',
  },
];

export const WHY_LUMINOSA_PILLARS: ValuePillar[] = [
  {
    title: 'Designed around everyday life',
    description: 'We focus on products that people can actually use every day, not novelty gadgets.',
  },
  {
    title: 'Modern & Practical',
    description: 'We look for the balance between useful features and simple, elegant design.',
  },
  {
    title: 'A Nepali Brand',
    description:
      'Luminosa is being built in Nepal with the ambition of becoming a brand people recognize, trust, and cherish.',
  },
  {
    title: 'Customer First',
    description:
      'Our relationship with customers does not end when the order arrives. We provide continuous support.',
  },
  {
    title: 'Just Getting Started',
    description:
      'The YSF-005BT is our beginning — not our destination. We are building a long-term lifestyle brand.',
  },
];

export const FAQS = [
  {
    q: 'How do I switch between FM Radio, Bluetooth, and USB mode?',
    a: 'Simply press the orange Mode (M) button on the front face. The high-contrast LED display will show "bLUE" for Bluetooth pairing, numeric frequencies for FM radio, or storage icons for USB/TF.',
  },
  {
    q: 'How long does the battery last on a single charge?',
    a: 'The included 800 mAh rechargeable battery typically provides 4 to 7 hours of continuous playback depending on the volume level and playback mode (FM, Bluetooth, or USB).',
  },
  {
    q: 'Is Cash on Delivery (COD) available across Nepal?',
    a: 'Yes! We provide Cash on Delivery both inside Kathmandu Valley and across major hubs throughout Nepal. You can also pay via Esewa, Khalti, or Mobile Banking.',
  },
  {
    q: 'What is the delivery time?',
    a: 'Inside Kathmandu Valley, delivery typically takes 1 to 2 business days. Outside Kathmandu Valley (Pokhara, Chitwan, Butwal, Biratnagar, Dharan, etc.), delivery usually takes 2 to 4 business days.',
  },
  {
    q: 'What if there is an issue with my product?',
    a: 'We offer hassle-free support and exchange for verified manufacturing issues within 7 days of receiving your package. Reach out to us directly on WhatsApp or Instagram @luminosa.np.',
  },
];
