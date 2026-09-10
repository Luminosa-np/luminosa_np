export type Language = 'en' | 'ne';
export type Theme = 'light' | 'dark';
export type ProductColor = 'black' | 'green';

export interface ColorOption {
  id: ProductColor;
  name: string;
  nameNe: string;
  hex: string;
  badge: string;
  badgeNe: string;
  imageUrl: string;
}

export interface ProductSpec {
  name: string;
  details: string;
}

export interface ProductItem {
  id: string;
  name: string;
  model: string;
  tagline: string;
  priceNPR: number;
  originalPriceNPR?: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  inStock: boolean;
  colors?: ColorOption[];
  images: {
    id: string;
    url: string;
    title: string;
    caption: string;
  }[];
  features: {
    iconName: string;
    title: string;
    description: string;
  }[];
  specifications: ProductSpec[];
  boxContents: string[];
}

export interface AudiencePersona {
  id: string;
  title: string;
  emoji: string;
  description: string;
  idealFor: string;
}

export interface ValuePillar {
  title: string;
  description: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  color?: ProductColor;
}

export interface OrderFormState {
  fullName: string;
  phone: string;
  email: string;
  region: 'ktm' | 'outside_ktm';
  city: string;
  address: string;
  quantity: number;
  notes: string;
  paymentMethod: 'cod' | 'esewa' | 'khalti' | 'bank';
  color?: ProductColor;
}
