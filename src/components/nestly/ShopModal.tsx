import React from 'react';
import { Store, X } from 'lucide-react';

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  type: 'head' | 'neck' | 'eyes';
  icon: string;
  desc: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'flower_head', name: '小花頭飾', cost: 50, type: 'head', icon: '🌸', desc: '春天氣息' },
  { id: 'bib_pink', name: '粉紅圍兜', cost: 80, type: 'neck', icon: '🍼', desc: '吃飯必備' },
  { id: 'cool_glasses', name: '酷酷墨鏡', cost: 120, type: 'eyes', icon: '🕶️', desc: '時尚寶寶' },
  { id: 'crown_gold', name: '黃金皇冠', cost: 200, type: 'head', icon: '👑', desc: '小小國王' }
];

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  ownedItems: Set<string>;
  equippedItems: { head: string | null; neck: string | null; eyes: string | null };
  onBuy: (item: ShopItem) => void;
  onEquip: (item: ShopItem) => void;
}

export function ShopModal({ isOpen, onClose, userPoints, ownedItems, equippedItems, onBuy, onEquip }: ShopModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-[360px] max-h-[85vh] overflow-y-auto shadow-xl transform transition-all scale-100 border border-[#E5DED9]">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 border-b border-[#E5DED9] z-10">
          <div>
            <h3 className="text-lg font-bold text-[#3F3A39] flex items-center">
              <Store className="text-[#9FB6A0] mr-2 w-5 h-5" />
              寶寶商店
            </h3>
            <div className="text-xs text-[#E8C9A8] font-bold flex items-center mt-1">
              餘額：<span className="mx-1 text-sm">{userPoints}</span> BP
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F6] text-[#6F6765] flex items-center justify-center hover:bg-[#E5DED9] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => {
            const isOwned = ownedItems.has(item.id);
            const isEquipped = equippedItems[item.type] === item.id;
            
            let btnText = `購買 ${item.cost} BP`;
            let btnClass = "bg-[#E6B7B3] text-white hover:bg-[#d4a09c]";
            let onClick = () => onBuy(item);

            if (isOwned) {
              if (isEquipped) {
                btnText = '使用中';
                btnClass = "bg-[#D6D0CC] text-white cursor-default";
                onClick = () => {};
              } else {
                btnText = '裝備';
                btnClass = "bg-[#9FB6A0] text-white hover:bg-[#8aa38b]";
                onClick = () => onEquip(item);
              }
            }

            return (
              <div key={item.id} className="bg-[#FAF8F6] rounded-xl p-4 flex flex-col items-center text-center border border-[#E5DED9] relative">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-sm text-[#3F3A39]">{item.name}</h4>
                <p className="text-xs text-[#9B9491] mb-3">{item.desc}</p>
                <button 
                  className={`w-full py-1.5 rounded-lg text-xs font-bold transition ${btnClass}`}
                  onClick={onClick}
                  disabled={isEquipped}
                >
                  {btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
