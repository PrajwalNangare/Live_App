
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to a generic tech gadget image if specific link fails
    e.currentTarget.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&h=400&auto=format&fit=crop";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-black text-slate-800 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 h-8 leading-tight">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Special Price</span>
            <span className="text-xl font-black text-blue-600 leading-none">₹{product.price}</span>
          </div>
          <button 
            onClick={() => onBuy(product)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 active:scale-90"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
