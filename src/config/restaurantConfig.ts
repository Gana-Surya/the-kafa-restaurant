export interface RestaurantConfig {
  name: string;
  tagline: string;
  whatsappNumber: string; // international digits only for wa.me URL e.g. 919110797854
  displayPhoneNumber: string; // readable e.g. +91 91107 97854
  telNumber: string; // tel:+919110797854
  address: string;
  upiId: string; // e.g. kafa@upi
  currencySymbol: string;
  taxRatePercent: number;
  deliveryFee: number;
  minOrderForDelivery: number;
  tables: string[];
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: 'THE KAFA',
  tagline: 'Specialty Coffee & Artisan Kitchen',
  whatsappNumber: '919110797854', // Provided WhatsApp number: 91107 97854 (India +91)
  displayPhoneNumber: '+91 91107 97854',
  telNumber: 'tel:+919110797854',
  address: '12 Specialty Coffee Boulevard, Artisan District',
  upiId: '9110797854@upi',
  currencySymbol: '₹',
  taxRatePercent: 0, // Included in prices
  deliveryFee: 40,
  minOrderForDelivery: 150,
  tables: [
    'NSZ 1', 'NSZ 2', 'NSZ 3', 'NSZ 4', 'NSZ 5', 
    'NSZ 6', 'NSZ 7', 'NSZ 8', 'Balcony 1', 'Balcony 2',
    'Garden 1', 'Garden 2', 'Bar Counter'
  ]
};
