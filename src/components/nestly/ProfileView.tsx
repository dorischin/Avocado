import React from 'react';
import { User, Wand2, HeartPulse, Settings, Bell, Users, LogOut, Pill, Activity, ChevronRight, Check } from 'lucide-react';
import { UserData } from './OnboardingView';

interface ProfileViewProps {
  onOpenAI: (title: string, prompt: string) => void;
  userData?: UserData;
}

export function ProfileView({ onOpenAI, userData }: ProfileViewProps) {

  const handleNameGenerator = () => {
    const prompt = "請幫我想 5 個可愛、有創意的寶寶乳名（小名），風格要溫馨、與大自然或食物有關（像酪梨）。請附上每個名字的簡短寓意。請用繁體中文。";
    onOpenAI("AI 靈感取名", prompt);
  };

  // Calculate BMI if data exists
  const calculateBMI = () => {
    if (userData?.height && userData?.weight) {
      const h = parseFloat(userData.height) / 100;
      const w = parseFloat(userData.weight);
      if (h > 0 && w > 0) {
        return (w / (h * h)).toFixed(1);
      }
    }
    return "21.5"; // Default fallback
  };

  return (
    <div className="p-5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Section: 基本資料 */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4D6C9] rounded-full opacity-50 blur-2xl -mr-6 -mt-6"></div>
          
          <div className="flex justify-between items-start relative z-10 mb-4">
              <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F4D6C9] flex items-center justify-center text-[#9FB6A0] text-2xl border-2 border-white shadow-sm mr-4">
                      <User className="w-8 h-8" />
                  </div>
                  <div>
                      <h2 className="text-lg font-bold text-[#3F3A39]">{userData?.nickname || "準媽媽"}</h2>
                      <p className="text-xs text-[#6F6765] bg-[#FAF8F6] px-2 py-0.5 rounded-full inline-block mt-1">新手媽咪</p>
                  </div>
              </div>
              <button className="text-xs border border-[#9FB6A0] text-[#9FB6A0] px-3 py-1 rounded-full font-medium hover:bg-[#9FB6A0]/10 transition">
                  編輯
              </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#FAF8F6] p-3 rounded-xl text-center">
                  <p className="text-xs text-[#6F6765] mb-1">預產期</p>
                  {/* Just a placeholder calculation for now or hardcoded */}
                  <p className="text-sm font-bold text-[#3F3A39]">2025/12/20</p>
              </div>
              <div className="bg-[#FAF8F6] p-3 rounded-xl text-center">
                  <p className="text-xs text-[#6F6765] mb-1">目前週數</p>
                  <p className="text-sm font-bold text-[#3F3A39]">{userData?.pregnancyWeeks || 16} 週</p>
              </div>
          </div>

          {/* NEW: Body Stats Inputs */}
          <div className="border-t border-[#E5DED9] pt-4">
            <h4 className="font-bold text-sm text-[#3F3A39] mb-3">身體數值</h4>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="text-[10px] text-[#6F6765] block mb-1">身高 (cm)</label>
                    <input type="number" value={userData?.height || 160} readOnly className="w-full bg-[#FAF8F6] border-none rounded-lg text-sm text-center font-bold py-1 focus:ring-1 focus:ring-[#E6B7B3] outline-none text-[#3F3A39]" />
                </div>
                <div>
                    <label className="text-[10px] text-[#6F6765] block mb-1">體重 (kg)</label>
                    <input type="number" value={userData?.weight || 55} readOnly className="w-full bg-[#FAF8F6] border-none rounded-lg text-sm text-center font-bold py-1 focus:ring-1 focus:ring-[#E6B7B3] outline-none text-[#3F3A39]" />
                </div>
                <div>
                    <label className="text-[10px] text-[#6F6765] block mb-1">腹圍 (cm)</label>
                    <input type="number" value={userData?.bellyCircumference || 82} readOnly className="w-full bg-[#FAF8F6] border-none rounded-lg text-sm text-center font-bold py-1 focus:ring-1 focus:ring-[#E6B7B3] outline-none text-[#3F3A39]" />
                </div>
            </div>
            <div className="mt-3 flex justify-between items-center text-xs bg-[#F4D6C9]/30 p-2 rounded-lg">
                <span className="text-[#6F6765]">BMI: <span className="font-bold text-[#9FB6A0]">{calculateBMI()}</span></span>
                <span className="text-[#6F6765]">建議熱量: <span className="font-bold text-[#9FB6A0]">2200 kcal</span></span>
            </div>
          </div>
      </section>
      
      {/* Section: AI 創意助手 */}
      <section>
          <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
              <Wand2 className="mr-2 text-[#E6B7B3] w-4 h-4" />
              AI 創意助手
          </h3>
          <div className="bg-[#E6B7B3]/10 rounded-2xl shadow-sm border border-[#E6B7B3] p-4">
              <div className="flex items-center justify-between">
                  <div>
                      <h4 className="font-bold text-[#3F3A39] text-sm">靈感取名</h4>
                      <p className="text-xs text-[#9FB6A0] mt-1">幫寶寶想個可愛乳名</p>
                  </div>
                  <button 
                    onClick={handleNameGenerator}
                    className="bg-white text-[#9FB6A0] hover:text-[#3F3A39] text-xs font-bold py-2 px-4 rounded-full shadow-sm transition"
                  >
                      ✨ AI 幫我發想
                  </button>
              </div>
          </div>
      </section>

      {/* Section: 健康提醒 */}
      <section>
          <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
              <HeartPulse className="mr-2 w-4 h-4" />
              健康提醒
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] overflow-hidden">
              <div className="flex items-center p-4 border-b border-[#E5DED9]">
                  <div className="w-10 h-10 rounded-full bg-[#9FB6A0]/10 text-[#9FB6A0] flex items-center justify-center mr-3">
                      <Pill className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                      <h4 className="font-bold text-[#3F3A39] text-sm">補充 DHA</h4>
                      <p className="text-xs text-[#6F6765]">建議每日隨餐服用</p>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-[#D6D0CC] text-[#D6D0CC] hover:bg-[#9FB6A0] hover:text-white hover:border-[#9FB6A0] transition flex items-center justify-center">
                      <Check className="w-4 h-4" />
                  </button>
              </div>
              <div className="flex items-center p-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8C9A8]/20 text-[#E8C9A8] flex items-center justify-center mr-3">
                      <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                      <h4 className="font-bold text-[#3F3A39] text-sm">今日步數</h4>
                      <p className="text-xs text-[#6F6765]">目標：8000</p>
                  </div>
                  <span className="text-lg font-bold text-[#9FB6A0]">5,640</span>
              </div>
          </div>
      </section>

      {/* Section: 系統設定 */}
      <section>
          <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
              <Settings className="mr-2 w-4 h-4" />
              系統設定
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-[#E5DED9] hover:bg-[#FAF8F6] transition text-left">
                  <div className="flex items-center">
                      <Bell className="w-6 text-[#9B9491] text-center mr-3 h-5" />
                      <span className="text-sm font-medium text-[#3F3A39]">通知設定</span>
                  </div>
                  <ChevronRight className="text-[#D6D0CC] w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between p-4 border-b border-[#E5DED9] hover:bg-[#FAF8F6] transition text-left">
                  <div className="flex items-center">
                      <Users className="w-6 text-[#9B9491] text-center mr-3 h-5" />
                      <span className="text-sm font-medium text-[#3F3A39]">伴侶共用</span>
                  </div>
                  <ChevronRight className="text-[#D6D0CC] w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-[#C38A85]/10 transition text-left group">
                  <div className="flex items-center">
                      <LogOut className="w-6 text-[#9B9491] group-hover:text-[#C38A85] text-center mr-3 h-5 transition" />
                      <span className="text-sm font-medium text-[#3F3A39] group-hover:text-[#C38A85] transition">登出</span>
                  </div>
              </button>
          </div>
      </section>
      
      <div className="text-center text-xs text-[#9B9491] pt-4">
          App Version 1.0.0 (MVP)
      </div>
    </div>
  );
}
