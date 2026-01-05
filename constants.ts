
import { CompanyInfo, Product } from './types';

export const COMPANY_DATA: CompanyInfo = {
  name: "Prajwal Nangare Ventures",
  description: "आम्ही तुमच्यासाठी घेऊन आलो आहोत प्रीमियम कपड्यांचे आणि फॅशनचे खास कलेक्शन. सर्व काही फक्त ₹१ मध्ये! स्टाईलिश दिसा आणि बजेटची काळजी सोडून द्या.",
  address: "Pune, Maharashtra - 411001",
  phone: "9021427224",
  email: "prajwal.nangare@business.com",
  upiId: "9021427224@paytm"
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Luxury Cotton T-Shirt",
    description: "१००% प्रीमियम कॉटन. मऊ आणि आरामदायी अनुभव.",
    price: 1,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
    category: "PREMIUM"
  },
  {
    id: "2",
    name: "Indigo Slim Denim",
    description: "मॉडर्न फिटिंग आणि डार्क इंडिगो शेड. कोणत्याही शर्टवर मॅच होते.",
    price: 1,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000",
    category: "LATEST"
  },
  {
    id: "3",
    name: "Pure White Formal",
    description: "प्रोफेशनल लूकसाठी प्रीमियम व्हाईट शर्ट. मीटिंगसाठी कडक चॉईस.",
    price: 1,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000",
    category: "OFFICE"
  },
  {
    id: "4",
    name: "Street Style Hoodie",
    description: "ओव्हरसाईज स्टाईल आणि कंफर्ट. हिवाळ्यासाठी बेस्ट स्टाईल.",
    price: 1,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000",
    category: "STREET"
  },
  {
    id: "5",
    name: "Biker Leather Jacket",
    description: "कडक लेदर फिनिश. बाईक रायडर्ससाठी खास डिझाइन.",
    price: 1,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
    category: "LUXURY"
  },
  {
    id: "6",
    name: "Royal Kurta Set",
    description: "सण आणि लग्नासाठी खास पारंपारिक लूक.",
    price: 1,
    image: "https://images.unsplash.com/photo-1610030482321-387aa19b5b87?auto=format&fit=crop&q=80&w=1000",
    category: "ETHNIC"
  }
];
