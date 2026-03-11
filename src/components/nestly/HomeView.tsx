import React, { useRef } from 'react';
import { MessageCircle, Sprout, ClipboardList, Check, Plus, Camera, Bot, ChevronRight, Footprints, Smile, Calendar, Share2, Clock, MapPin, Utensils, BookOpen, Info } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { UserData } from './OnboardingView';

interface HomeViewProps {
  onOpenAI: (title: string, prompt: string) => void;
  setKickCount: (count: number) => void;
  kickCount: number;
  kickData: any[];
  nextAppointment?: Date;
  userData?: UserData;
}

export function HomeView({ onOpenAI, setKickCount, kickCount, kickData, nextAppointment, userData }: HomeViewProps) {
  const moodInputRef = useRef<HTMLInputElement>(null);
  
  const weeks = userData?.pregnancyWeeks || 16;
  const nickname = userData?.nickname || "媽咪";

  const handleBabyMessage = () => {
    const prompt = `我現在懷孕${weeks}週，寶寶大概是酪梨大小。請以「肚子裡的寶寶」的第一人稱視角，寫一段約50-80字的可愛短訊給媽媽（${nickname}）。語氣要超級可愛、撒嬌、溫暖，提到我最近的辛苦（例如腰痠或孕吐）並給我鼓勵。請用繁體中文。`;
    onOpenAI("來自寶寶的悄悄話", prompt);
  };

  const handleDietAdvice = () => {
    const prompt = `我是一位懷孕${weeks}週的孕婦。我的健康App提示我『今日蛋白質攝取偏低』。請以專業營養師且親切的口吻，給我3個具體的飲食建議，告訴我晚餐或宵夜可以吃什麼來補足蛋白質，同時要避免造成身體負擔。請用繁體中文回答。`;
    onOpenAI("AI 營養師", prompt);
  };

  const handleMoodEncouragement = (mood: string) => {
    const text = moodInputRef.current?.value || "沒有特別寫什麼";
    const prompt = `我是一位懷孕${weeks}週的孕婦，名字叫${nickname}。我今天心情覺得「${mood}」。我在日記寫下：「${text}」。請扮演一位溫柔的閨蜜或心理諮商師，給我一段簡短（100字以內）、溫暖、充滿力量的鼓勵。請用繁體中文。`;
    onOpenAI("AI 心情樹洞", prompt);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (targetDate?: Date) => {
    if (!targetDate) return 0;
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateDaysRemaining(nextAppointment);

  // Format date
  const formatDate = (date?: Date) => {
    if (!date) return "未設定";
    // Simple format: 5月30日 (週五) 09:00
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'][date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}月${day}日 (${weekDay}) ${hours}:${minutes}`;
  };

  return (
    <div className="px-5 -mt-8 relative z-10 pb-4 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 今日任務 */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-5">
        <h3 className="font-bold text-[#3F3A39] mb-3 flex items-center">
          <ClipboardList className="text-[#E8C9A8] mr-2 w-5 h-5" />
          今日任務進度
        </h3>
        <div className="flex items-center justify-between space-x-2">
          <button className="flex-1 flex flex-col items-center p-2 rounded-xl bg-[#9FB6A0]/10 text-[#9FB6A0] hover:bg-[#9FB6A0]/20 transition">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm text-[#9FB6A0]">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">飲食</span>
          </button>
          <button className="flex-1 flex flex-col items-center p-2 rounded-xl bg-[#F4D6C9]/30 text-[#8B6F6A] hover:bg-[#F4D6C9]/50 transition">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm border-2 border-[#F4D6C9] text-[#9B9491] text-xs font-bold">
              2/10
            </div>
            <span className="text-xs font-medium">胎動</span>
          </button>
          <button className="flex-1 flex flex-col items-center p-2 rounded-xl bg-[#E6B7B3]/10 text-[#8B6F6A] hover:bg-[#E6B7B3]/20 transition">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm border-2 border-[#E6B7B3] text-[#9B9491]">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">心情</span>
          </button>
        </div>
      </section>

      {/* 飲食日記 */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] overflow-hidden">
        <div className="p-4 border-b border-[#E5DED9]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#3F3A39] flex items-center">
              <Utensils className="text-[#8B6F6A] mr-2 w-4 h-4" />
              飲食日記
            </h3>
            <span className="bg-[#C38A85]/10 text-[#C38A85] text-xs px-2 py-1 rounded-full">未完成</span>
          </div>
          <div className="flex space-x-3 mb-4">
            <div className="w-20 h-20 bg-[#FAF8F6] rounded-lg flex flex-col items-center justify-center text-[#9B9491] cursor-pointer hover:bg-[#E5DED9] transition border-2 border-dashed border-[#E5DED9]">
              <Camera className="mb-1 w-5 h-5" />
              <span className="text-xs">拍照</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex space-x-2">
                {['早餐', '午餐', '晚餐'].map(meal => (
                  <button key={meal} className="flex-1 py-1 text-xs border border-[#E5DED9] rounded-full hover:bg-[#F4D6C9] hover:border-[#E6B7B3] hover:text-[#8B6F6A] transition text-[#6F6765]">
                    {meal}
                  </button>
                ))}
              </div>
              <button className="w-full py-1 text-xs border border-[#E5DED9] rounded-full hover:bg-[#F4D6C9] hover:border-[#E6B7B3] hover:text-[#8B6F6A] transition text-[#6F6765]">
                點心
              </button>
            </div>
          </div>
          <div 
            className="bg-[#F4D6C9]/30 p-3 rounded-lg flex items-start space-x-3 cursor-pointer hover:bg-[#F4D6C9]/50 transition" 
            onClick={handleDietAdvice}
          >
            <div className="mt-0.5 text-[#8B6F6A]"><Bot className="w-4 h-4" /></div>
            <div className="flex-1">
              <p className="text-sm text-[#3F3A39] font-medium">✨ AI 飲食建議</p>
              <p className="text-xs text-[#6F6765] mt-0.5">今日蛋白質攝取偏低喔～建議補充一顆水煮蛋或一杯豆漿！</p>
            </div>
            <ChevronRight className="text-[#9B9491] mt-2 w-4 h-4" />
          </div>
        </div>
      </section>

      {/* 胎動記錄 */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-[#3F3A39] flex items-center">
              <Footprints className="text-[#E8C9A8] mr-2 -rotate-90 w-4 h-4" />
              胎動記錄
            </h3>
            <p className="text-xs text-[#6F6765] mt-1">今日目標：10 次</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-[#3F3A39]">{kickCount}</span>
            <span className="text-xs text-[#6F6765] ml-1">次</span>
          </div>
        </div>
        <div className="flex items-end space-x-4">
          <div className="flex-1 h-[100px] min-w-0 relative">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kickData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#E8C9A8" 
                    strokeWidth={2}
                    dot={false}
                    fill="rgba(232, 201, 168, 0.1)"
                  />
                </LineChart>
             </ResponsiveContainer>
          </div>
          <button 
            onClick={() => setKickCount(kickCount + 1)}
            className="w-14 h-14 rounded-full bg-[#E8C9A8] shadow-lg shadow-[#F4D6C9] text-white flex items-center justify-center hover:bg-[#d6b797] hover:scale-105 transition active:scale-95 flex-shrink-0"
          >
            <span className="text-xl font-bold">+1</span>
          </button>
        </div>
      </section>

      {/* 心情紀錄 */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#3F3A39] flex items-center">
            <Smile className="text-[#E8C9A8] mr-2 w-4 h-4" />
            心情紀錄
          </h3>
        </div>
        <div className="flex justify-around mb-3">
          {[
            { label: '開心', emoji: '🙂' },
            { label: '平靜', emoji: '😐' },
            { label: '難過', emoji: '😢' }
          ].map((m) => (
            <button 
              key={m.label}
              onClick={() => handleMoodEncouragement(m.label)}
              className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 hover:scale-110 transition"
            >
              <div className="text-3xl">{m.emoji}</div>
              <span className="text-xs text-[#6F6765]">{m.label}</span>
            </button>
          ))}
        </div>
        <input 
          ref={moodInputRef}
          type="text" 
          placeholder="寫下此刻的心情..." 
          className="w-full bg-[#FAF8F6] border-none rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-[#E6B7B3] outline-none text-[#3F3A39] placeholder-[#9B9491]"
        />
      </section>

      {/* Pregnancy Timeline (New) */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#3F3A39] flex items-center">
            <BookOpen className="text-[#E6B7B3] mr-2 w-5 h-5" />
            孕期時光機
          </h3>
          <span className="bg-[#E6B7B3]/10 text-[#8B6F6A] text-xs px-3 py-1 rounded-full font-medium">
             📍 懷孕初期 (0-13週)
          </span>
        </div>
        
        <div className="space-y-5 relative">
           {/* Vertical Line */}
           <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#E5DED9]"></div>

           {/* Item 1 */}
           <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-[#E6B7B3]/20 border-4 border-white shadow-sm flex items-center justify-center z-10">
                 <div className="w-2 h-2 rounded-full bg-[#E6B7B3]"></div>
              </div>
              <h4 className="text-sm font-bold text-[#3F3A39]">6-8週：首次產檢 & 聽見胎心音</h4>
              <p className="text-xs text-[#6F6765] mt-1 leading-relaxed">
                 重要原因：確認胚胎位置、胎兒心跳及是否為多胞胎。
              </p>
              <div className="mt-2 flex items-center text-xs text-[#9FB6A0] bg-[#9FB6A0]/10 px-2 py-1 rounded-md w-fit">
                 <Check className="w-3 h-3 mr-1" /> App提醒：已記錄心跳
              </div>
           </div>

           {/* Item 2 */}
           <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-[#E6B7B3]/20 border-4 border-white shadow-sm flex items-center justify-center z-10">
                 <div className="w-2 h-2 rounded-full bg-[#E6B7B3]"></div>
              </div>
              <h4 className="text-sm font-bold text-[#3F3A39]">10-12週：NIPT 非侵入性檢測</h4>
              <p className="text-xs text-[#6F6765] mt-1 leading-relaxed">
                 可檢測染色體異常，部分可檢測性別 (通常12週後)。
              </p>
           </div>

           {/* Item 3 */}
           <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-[#E6B7B3]/20 border-4 border-white shadow-sm flex items-center justify-center z-10">
                 <div className="w-2 h-2 rounded-full bg-[#E6B7B3]"></div>
              </div>
              <h4 className="text-sm font-bold text-[#3F3A39]">11-13週：頸部透明帶 (NT) 篩檢</h4>
              <p className="text-xs text-[#6F6765] mt-1 leading-relaxed">
                 用於初步篩檢唐氏症及其他構造異常風險。
              </p>
           </div>
        </div>
      </section>

      {/* 產檢資訊 */}
      <section className="bg-[#E6B7B3] rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
        <Calendar className="absolute -right-4 -bottom-4 text-white opacity-10 w-32 h-32" />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">下次產檢倒數</p>
              <h3 className="text-3xl font-bold mt-1">{daysRemaining} <span className="text-base font-normal opacity-80">天</span></h3>
            </div>
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm transition">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="mr-2 opacity-80 w-4 h-4" />
            <span>{formatDate(nextAppointment)}</span>
          </div>
          <div className="mt-1 flex items-center text-sm">
            <MapPin className="mr-2.5 opacity-80 w-4 h-4" />
            <span>台大醫院婦產科</span>
          </div>
        </div>
      </section>
    </div>
  );
}
