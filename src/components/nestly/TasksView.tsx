import React, { useState } from 'react';
import { ClipboardList, Check, Footprints, Smile, Flag, Trophy, Lightbulb, Store, Baby, Music } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ShopModal, ShopItem, SHOP_ITEMS } from './ShopModal';
import { UserData } from './OnboardingView';

interface TasksViewProps {
  onOpenAI: (title: string, prompt: string) => void;
  userPoints: number;
  ownedItems: Set<string>;
  equippedItems: { head: string | null; neck: string | null; eyes: string | null };
  onBuyItem: (item: ShopItem) => void;
  onEquipItem: (item: ShopItem) => void;
  onTaskReward: (points: number) => void;
  userData?: UserData;
}

export function TasksView({ 
  onOpenAI, 
  userPoints, 
  ownedItems, 
  equippedItems, 
  onBuyItem, 
  onEquipItem,
  onTaskReward,
  userData
}: TasksViewProps) {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const weeks = userData?.pregnancyWeeks || 16;

  const handleMilestoneFact = () => {
    const prompt = `我是懷孕${weeks}週的媽媽。請告訴我一個關於這個週數寶寶發育的『冷知識』，要有趣且鮮為人知的。以及一個給媽媽的『本週舒緩小撇步』。請用繁體中文，語氣輕鬆活潑。`;
    onOpenAI("本週冷知識", prompt);
  };

  const handlePrenatalEducation = () => {
    const prompt = `我是懷孕${weeks}週的媽媽，聽說現在是寶寶腦部發育關鍵期。請針對『腦部發育』給我3個適合這週的『胎教建議』。例如：適合聽什麼類型的音樂（如貝多芬？）、適合說什麼話或做什麼互動？請用繁體中文，語氣溫柔且專業。`;
    onOpenAI("本週胎教指南", prompt);
  };

  const handleCompleteTask = (taskId: string, reward: number) => {
    if (completedTasks.has(taskId)) return;
    
    onTaskReward(reward);
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      newSet.add(taskId);
      return newSet;
    });
  };

  // Helper to get item icon by equipped ID
  const getItemIcon = (itemId: string | null) => {
    if (!itemId) return null;
    return SHOP_ITEMS.find(i => i.id === itemId)?.icon;
  };

  return (
    <div className="p-5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Section: Baby 角色展示 */}
      <section className="flex flex-col items-center justify-center py-8 bg-[#F4D6C9]/40 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6B7B3] rounded-full opacity-20 blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E8C9A8] rounded-full opacity-20 blur-2xl -ml-6 -mb-6"></div>

        <div className="relative w-36 h-36 mb-5 z-10 baby-container inline-block">
          <ImageWithFallback src="https://placehold.co/144x144/E6B7B3/8B6F6A?text=Baby" alt="Baby" className="rounded-full shadow-xl border-4 border-white object-cover w-full h-full" />
          
          {/* Accessories Overlays */}
          {equippedItems.head && (
            <div className="absolute top-[-10px] right-[10px] text-[40px] rotate-[15deg] drop-shadow-md pointer-events-none transition-all duration-300">
              {getItemIcon(equippedItems.head)}
            </div>
          )}
          {equippedItems.neck && (
             /* Note: The HTML used font-size 60px and a specific baby carriage icon for the bib, sticking to icon prop */
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 text-[50px] drop-shadow-md pointer-events-none transition-all duration-300">
              {getItemIcon(equippedItems.neck)}
            </div>
          )}
          {equippedItems.eyes && (
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 text-[40px] pointer-events-none transition-all duration-300 z-20">
              {getItemIcon(equippedItems.eyes)}
            </div>
          )}

          <div className="absolute -bottom-2 -right-2 bg-[#E8C9A8] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md border-2 border-white animate-bounce">
            +3 PTS
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-[#9FB6A0] z-10">Baby 今天成長了 +3 點！</h2>
        <p className="text-sm text-[#6F6765] mt-1 z-10 mb-3">距離下一階段還差 28 點</p>
        
        {/* Shop Button */}
        <button 
          onClick={() => setIsShopOpen(true)}
          className="z-10 bg-white text-[#8B6F6A] border border-[#E6B7B3] hover:bg-[#E6B7B3] hover:text-white font-bold py-2 px-5 rounded-full shadow-md transition flex items-center"
        >
            <Store className="mr-2 w-4 h-4" />
            寶寶商店
        </button>
      </section>

      {/* Section: 任務列表 */}
      <section>
        <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
          <ClipboardList className="mr-2 w-4 h-4" />
          今日任務清單
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] overflow-hidden">
          {/* Diet (Completed) */}
          <div className="flex items-center p-4 border-b border-[#E5DED9] bg-[#9FB6A0]/20">
            <div className="w-10 h-10 rounded-full bg-[#9FB6A0] flex items-center justify-center text-white mr-4 shadow-sm">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#3F3A39] decoration-[#9FB6A0]">飲食紀錄</h4>
              <p className="text-xs text-[#9FB6A0] font-medium">已完成攝取紀錄</p>
            </div>
          </div>
          
          {/* Kick (Incomplete) */}
          <div className="flex items-center p-4 border-b border-[#E5DED9] hover:bg-[#FAF8F6] transition cursor-pointer">
            <div className="w-10 h-10 rounded-full border-2 border-[#E5DED9] flex items-center justify-center text-[#D6D0CC] mr-4 bg-white">
              <Footprints className="-rotate-90 w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#3F3A39]">胎動紀錄</h4>
              <p className="text-xs text-[#6F6765]">目標：10次 (目前 2/10)</p>
            </div>
            <button 
              onClick={() => handleCompleteTask('kick', 10)}
              disabled={completedTasks.has('kick')}
              className={`text-xs px-4 py-1.5 rounded-full font-bold transition shadow-sm ${
                completedTasks.has('kick') 
                  ? 'bg-[#D6D0CC] text-white cursor-default'
                  : 'bg-[#E6B7B3] text-[#8B6F6A] hover:bg-[#d4a09c] hover:text-white'
              }`}
            >
              {completedTasks.has('kick') ? '已完成' : '去紀錄 (+10 BP)'}
            </button>
          </div>
          
          {/* Mood (Incomplete) */}
          <div className="flex items-center p-4 hover:bg-[#FAF8F6] transition cursor-pointer">
            <div className="w-10 h-10 rounded-full border-2 border-[#E5DED9] flex items-center justify-center text-[#D6D0CC] mr-4 bg-white">
              <Smile className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#3F3A39]">心情紀錄</h4>
              <p className="text-xs text-[#6F6765]">記錄此刻感受</p>
            </div>
            <button 
              onClick={() => handleCompleteTask('mood', 5)}
              disabled={completedTasks.has('mood')}
              className={`text-xs px-4 py-1.5 rounded-full font-bold transition shadow-sm ${
                completedTasks.has('mood') 
                  ? 'bg-[#D6D0CC] text-white cursor-default'
                  : 'bg-[#E6B7B3] text-[#8B6F6A] hover:bg-[#d4a09c] hover:text-white'
              }`}
            >
              {completedTasks.has('mood') ? '已完成' : '去紀錄 (+5 BP)'}
            </button>
          </div>
        </div>
      </section>

      {/* Section: 每週里程碑 */}
      <section>
        <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
          <Flag className="mr-2 w-4 h-4" />
          本週里程碑 ({weeks}週)
        </h3>
        <div className="bg-[#E6B7B3] rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
          <Trophy className="absolute -right-6 -bottom-6 text-white opacity-10 w-32 h-32" />
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm shadow-inner border border-white/10">
                <span className="text-2xl">🥑</span>
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium">本週大小</p>
                <h4 className="font-bold text-xl">酪梨 (Avocado)</h4>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-white/90 mb-4">
              <li className="flex items-start">
                <div className="mt-0.5 mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-snug">可看到手腳活動，骨骼變硬</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-snug">性別特徵已明顯，超音波可能確認</span>
              </li>
            </ul>
            
            {/* AI Feature 4: Milestone Facts & Prenatal Education */}
            <div className="space-y-2">
                <button 
                  onClick={handleMilestoneFact}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg backdrop-blur-sm transition flex items-center justify-center text-sm border border-white/30 relative overflow-hidden group"
                >
                  <Lightbulb className="mr-2 w-4 h-4" />
                  ✨ AI 本週冷知識
                </button>
                <button 
                  onClick={handlePrenatalEducation}
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg backdrop-blur-sm transition flex items-center justify-center text-sm border border-white/30 relative overflow-hidden group"
                >
                  <Music className="mr-2 w-4 h-4" />
                  🎵 AI 腦力開發胎教
                </button>
            </div>
          </div>
        </div>
      </section>

      <ShopModal 
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        userPoints={userPoints}
        ownedItems={ownedItems}
        equippedItems={equippedItems}
        onBuy={onBuyItem}
        onEquip={onEquipItem}
      />
    </div>
  );
}
