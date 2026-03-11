import React, { useState } from 'react';
import { HomeView } from './components/nestly/HomeView';
import { RecordView } from './components/nestly/RecordView';
import { TasksView } from './components/nestly/TasksView';
import { ProfileView } from './components/nestly/ProfileView';
import { BottomNav, ViewType } from './components/nestly/BottomNav';
import { AIModal } from './components/nestly/AIModal';
import { MessageCircle, Sprout, Star } from 'lucide-react';
import { Toaster } from "./components/ui/sonner";
import { ShopItem } from './components/nestly/ShopModal';
import { toast } from "sonner@2.0.3";
import { OnboardingView, UserData } from './components/nestly/OnboardingView';

// Sample data for the chart
const INITIAL_KICK_DATA = [
  { time: '13:00', value: 2 },
  { time: '14:00', value: 0 },
  { time: '15:00', value: 5 },
  { time: '16:00', value: 1 },
  { time: '17:00', value: 2 },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('view-home');
  const [kickCount, setKickCount] = useState(2);
  const [kickData, setKickData] = useState(INITIAL_KICK_DATA);
  
  // User Data & Onboarding State
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  
  // Shop & Gamification State
  const [userPoints, setUserPoints] = useState(120);
  const [ownedItems, setOwnedItems] = useState<Set<string>>(new Set());
  const [equippedItems, setEquippedItems] = useState<{head: string|null, neck: string|null, eyes: string|null}>({ head: null, neck: null, eyes: null });

  // Calendar/Appointment State
  // Default to a fixed future date for demo, e.g. May 30th
  const [nextAppointment, setNextAppointment] = useState<Date | undefined>(new Date('2025-05-30T09:00:00'));

  // AI Modal State
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState('');
  const [aiModalPrompt, setAiModalPrompt] = useState('');

  const handleOpenAI = (title: string, prompt: string) => {
    setAiModalTitle(title);
    setAiModalPrompt(prompt);
    setIsAIModalOpen(true);
  };

  const handleKickUpdate = (newCount: number) => {
    setKickCount(newCount);
    // Update chart data - simulation
    const newData = [...kickData];
    const lastIndex = newData.length - 1;
    newData[lastIndex] = { ...newData[lastIndex], value: newData[lastIndex].value + 1 };
    setKickData(newData);
  };

  // Shop Handlers
  const handleBuyItem = (item: ShopItem) => {
    if (userPoints >= item.cost) {
      setUserPoints(prev => prev - item.cost);
      setOwnedItems(prev => {
        const newSet = new Set(prev);
        newSet.add(item.id);
        return newSet;
      });
      // Auto equip
      setEquippedItems(prev => ({
        ...prev,
        [item.type]: item.id
      }));
      toast.success(`購買成功！已為寶寶裝備 ${item.name}`);
    } else {
      toast.error('點數不足，快去完成任務賺取 BP 吧！');
    }
  };

  const handleEquipItem = (item: ShopItem) => {
    setEquippedItems(prev => ({
      ...prev,
      [item.type]: item.id
    }));
    toast.success(`已裝備 ${item.name}`);
  };

  const handleTaskReward = (points: number) => {
    setUserPoints(prev => prev + points);
    toast.success(`任務完成！獲得 ${points} BP`);
  };

  // Onboarding Handler
  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    toast.success(`歡迎妳，${data.nickname}！`);
  };

  // If no user data, show onboarding
  if (!userData) {
    return <OnboardingView onComplete={handleOnboardingComplete} />;
  }

  const weeks = userData.pregnancyWeeks || 16;

  const getZodiacSign = (weeks: number) => {
    const today = new Date();
    const edd = new Date(today.getTime() + (40 - weeks) * 7 * 24 * 60 * 60 * 1000);
    const month = edd.getMonth() + 1;
    const day = edd.getDate();
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "水瓶座 ♒";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "雙魚座 ♓";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "牡羊座 ♈";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "金牛座 ♉";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "雙子座 ♊";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "巨蟹座 ♋";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "獅子座 ♌";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "處女座 ♍";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "天秤座 ♎";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "天蠍座 ♏";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "射手座 ♐";
    return "摩羯座 ♑";
  };

  // Header Component based on view
  const renderHeader = () => {
    if (currentView === 'view-home') {
      const zodiac = getZodiacSign(weeks);
      return (
        <header className="bg-[#E6B7B3] pt-8 pb-12 px-6 rounded-b-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F4D6C9] rounded-full opacity-50 blur-xl"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h1 className="text-2xl font-bold text-[#3F3A39]">懷孕 {weeks} 週</h1>
              <p className="text-sm text-[#3F3A39]/80 mt-1">今天 Baby 是酪梨🥑大小</p>
              <div className="inline-block mt-2 bg-white/40 px-2 py-0.5 rounded text-xs text-[#8B6F6A] font-bold shadow-sm">
                預產星座: {zodiac}
              </div>
              
              <button 
                onClick={() => {
                   const prompt = `我現在懷孕${weeks}週，寶寶大概是酪梨大小。請以「肚子裡的寶寶」的第一人稱視角，寫一段約50-80字的可愛短訊給媽媽（${userData.nickname}）。語氣要超級可愛、撒嬌、溫暖，提到我最近的辛苦（例如腰痠或孕吐）並給我鼓勵。請用繁體中文。`;
                   handleOpenAI("來自寶寶的悄悄話", prompt);
                }}
                className="mt-2 bg-white/60 hover:bg-white text-[#8B6F6A] text-xs font-bold py-1.5 px-3 rounded-full transition flex items-center shadow-sm backdrop-blur-sm sparkle-btn"
              >
                <MessageCircle className="mr-1.5 w-3 h-3" />
                聽聽寶寶說什麼
              </button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-[#9FB6A0] flex items-center">
                <Sprout className="mr-1 w-3 h-3" />
                成長中
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-[#3F3A39]">Baby 成長值</span>
              <span className="text-2xl font-bold text-[#9FB6A0]">72%</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 shadow-inner">
              <div className="bg-[#9FB6A0] h-3 rounded-full relative transition-all duration-1000" style={{ width: '72%' }}>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-white opacity-20 animate-pulse rounded-full"></div>
              </div>
            </div>
            <p className="text-xs text-white/80 mt-2 text-right">今日完成 2/3 任務</p>
          </div>
        </header>
      );
    }
    if (currentView === 'view-record') {
      return (
        <header className="pt-8 pb-4 px-6 bg-white border-b border-gray-50 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">健康紀錄</h1>
        </header>
      );
    }
    if (currentView === 'view-tasks') {
      return (
         <header className="pt-8 pb-4 px-6 bg-white border-b border-gray-50 sticky top-0 z-10 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Baby 養成任務</h1>
              <p className="text-sm text-gray-500 mt-1">完成任務，陪伴寶寶一起長大！</p>
            </div>
            <div className="bg-yellow-100 border border-yellow-200 px-3 py-1.5 rounded-full flex items-center shadow-sm">
                <Star className="text-yellow-500 mr-1.5 w-3 h-3 fill-yellow-500" />
                <span className="text-yellow-700 font-bold text-sm">{userPoints} BP</span>
            </div>
        </header>
      );
    }
    if (currentView === 'view-profile') {
      return (
        <header className="pt-8 pb-4 px-6 bg-white border-b border-gray-50 sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-gray-800">個人中心</h1>
        </header>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] font-sans text-[#3F3A39] antialiased flex justify-center">
      <style>{`
        .sparkle-btn {
          position: relative;
          overflow: hidden;
        }
        .sparkle-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
      <div className="w-full max-w-[420px] bg-white shadow-2xl min-h-screen relative pb-[90px]">
        
        {renderHeader()}

        <main>
          {currentView === 'view-home' && (
            <HomeView 
              onOpenAI={handleOpenAI} 
              setKickCount={handleKickUpdate}
              kickCount={kickCount}
              kickData={kickData}
              nextAppointment={nextAppointment}
              userData={userData}
            />
          )}
          {currentView === 'view-record' && (
            <RecordView 
              onOpenAI={handleOpenAI}
              kickData={kickData}
              nextAppointment={nextAppointment}
              setNextAppointment={setNextAppointment}
              userData={userData}
            />
          )}
          {currentView === 'view-tasks' && (
            <TasksView 
              onOpenAI={handleOpenAI}
              userPoints={userPoints}
              ownedItems={ownedItems}
              equippedItems={equippedItems}
              onBuyItem={handleBuyItem}
              onEquipItem={handleEquipItem}
              onTaskReward={handleTaskReward}
              userData={userData}
            />
          )}
          {currentView === 'view-profile' && (
            <ProfileView 
              onOpenAI={handleOpenAI}
              userData={userData}
            />
          )}
        </main>

        <BottomNav currentView={currentView} onChangeView={setCurrentView} />

        <AIModal 
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          title={aiModalTitle}
          prompt={aiModalPrompt}
        />
        
        <Toaster />
      </div>
    </div>
  );
}
