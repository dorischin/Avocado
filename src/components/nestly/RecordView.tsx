import React, { useState } from 'react';
import { Utensils, Footprints, Smile, Camera, Plus, Wand2, LineChart as LineChartIcon, PieChart, Calculator, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, FileText } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { toast } from "sonner@2.0.3";
import { UserData } from './OnboardingView';

interface RecordViewProps {
  onOpenAI: (title: string, prompt: string) => void;
  kickData: any[];
  nextAppointment?: Date;
  setNextAppointment?: (date: Date) => void;
  userData?: UserData;
}

export function RecordView({ onOpenAI, kickData, nextAppointment, setNextAppointment, userData }: RecordViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState('');
  
  const height = userData?.height || '160';
  const weight = userData?.weight || '55';
  const weeks = userData?.pregnancyWeeks || 16;

  // Helper to format date as "YYYY年 M月 D日"
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`;
  };

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
      setIsCalendarOpen(false);
    }
  };

  const handleSetNextAppointment = () => {
    if (setNextAppointment) {
      // Set time to 9:00 AM default
      const appointmentDate = new Date(currentDate);
      appointmentDate.setHours(9, 0, 0, 0);
      setNextAppointment(appointmentDate);
      toast.success(`已設定下次產檢日期：${formatDate(appointmentDate)}`);
      // Optional: Add note logic here if we had a backend
      if(appointmentNote) {
        console.log("Appointment Note:", appointmentNote);
        toast.info("備忘錄已儲存");
        setAppointmentNote('');
      }
    }
  };

  const handleMealAnalysis = () => {
    const prompt = `我是懷孕${weeks}週的媽媽，身高${height}cm，體重${weight}kg。我剛午餐吃了『炸雞腿便當配滷蛋』。請幫我估算這餐的熱量、蛋白質與碳水化合物含量，並告訴我這餐是否符合孕期營養需求？語氣親切專業。請用繁體中文。`;
    onOpenAI("AI 營養分析", prompt);
  };

  const handleKickAnalysis = () => {
    const prompt = `我懷孕${weeks}週，從早上9點到現在下午5點，總共記錄了 12 次明顯胎動，主要集中在下午。請以婦產科護理師的溫柔口吻，解讀這個胎動數據是否正常？寶寶目前的活動狀態可能是在做什麼（如睡覺或玩耍）？並給媽媽一句安心的話。請用繁體中文。`;
    onOpenAI("AI 胎動解讀", prompt);
  };

  // Check if current date matches next appointment
  const isAppointmentDay = nextAppointment && 
    currentDate.getDate() === nextAppointment.getDate() &&
    currentDate.getMonth() === nextAppointment.getMonth() &&
    currentDate.getFullYear() === nextAppointment.getFullYear();

  return (
    <div className="p-5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Date Selector / Calendar */}
      <div className="flex items-center justify-between bg-white rounded-xl p-2 shadow-sm border border-[#E5DED9] relative z-20">
          <button 
            onClick={handlePrevDay}
            className="p-2 rounded-lg hover:bg-[#F4D6C9]/30 text-[#6F6765] transition"
          >
              <ChevronLeft className="w-5 h-5" />
          </button>
          
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-center flex-1 py-2 font-bold text-[#3F3A39] hover:bg-[#FAF8F6] rounded-lg transition group">
                  <CalendarIcon className="w-4 h-4 mr-2 text-[#8B6F6A]" />
                  {formatDate(currentDate)}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="center">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                initialFocus
                className="rounded-md border shadow-none"
              />
              <div className="p-3 border-t border-[#E5DED9] bg-[#FAF8F6]">
                <div className="text-xs font-bold text-[#6F6765] mb-2 flex items-center">
                   <Clock className="w-3 h-3 mr-1" />
                   預約 / 備忘錄
                </div>
                <input 
                  type="text" 
                  placeholder="例如：產檢、照高層次..." 
                  className="w-full text-sm border border-[#E5DED9] rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E6B7B3] text-[#3F3A39]"
                  value={appointmentNote}
                  onChange={(e) => setAppointmentNote(e.target.value)}
                />
                <Button 
                  size="sm" 
                  className="w-full bg-[#E6B7B3] hover:bg-[#d4a09c] text-white text-xs"
                  onClick={() => {
                    handleSetNextAppointment();
                    setIsCalendarOpen(false);
                  }}
                >
                  設定為下次產檢日
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <button 
            onClick={handleNextDay}
            className="p-2 rounded-lg hover:bg-[#F4D6C9]/30 text-[#6F6765] transition"
          >
              <ChevronRight className="w-5 h-5" />
          </button>
      </div>

      {/* Calendar Event Display (The daily calendar entry is located here) */}
      {isAppointmentDay && (
         <div className="bg-gradient-to-r from-[#F4D6C9]/30 to-[#F4D6C9]/50 border border-[#F4D6C9] rounded-xl p-4 flex items-start animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white p-2 rounded-full shadow-sm mr-3 text-[#E6B7B3]">
               <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
               <h4 className="font-bold text-[#3F3A39] text-sm">重要日程：產檢日</h4>
               <p className="text-xs text-[#6F6765] mt-1">記得攜帶媽媽手冊與健保卡。預約時間：09:00</p>
               {appointmentNote && (
                 <div className="mt-2 flex items-center text-xs text-[#6F6765] bg-white/50 p-2 rounded-lg">
                    <FileText className="w-3 h-3 mr-1" />
                    備註: {appointmentNote || "無備註"}
                 </div>
               )}
            </div>
         </div>
      )}

      {/* NEW: Nutrition Dashboard */}
      <section className="bg-[#F4D6C9]/20 rounded-2xl p-4 border border-[#F4D6C9]">
          <h3 className="font-bold text-[#8B6F6A] mb-3 text-sm uppercase tracking-wider flex items-center">
              <PieChart className="mr-2 w-4 h-4" />
              今日營養攝取
          </h3>
          <div className="space-y-3">
              {/* Calories */}
              <div>
                  <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6F6765]">熱量 (kcal)</span>
                      <span className="font-bold text-[#3F3A39]">1250 / 2200</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-[#E8C9A8] h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
              </div>
              {/* Protein */}
              <div>
                  <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6F6765]">蛋白質 (g)</span>
                      <span className="font-bold text-[#3F3A39]">45 / 75</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-[#9FB6A0] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
              </div>
              {/* Carbs */}
              <div>
                  <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6F6765]">碳水化合物 (g)</span>
                      <span className="font-bold text-[#3F3A39]">150 / 250</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-[#E6B7B3] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
              </div>
          </div>
      </section>

      {/* Section: 飲食紀錄 */}
      <section>
        <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
          <Utensils className="mr-2 w-4 h-4" />
          飲食紀錄
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] overflow-hidden">
          {/* Breakfast */}
          <div className="flex items-center p-3 border-b border-[#E5DED9]">
            <div className="w-14 h-14 mr-3">
                <ImageWithFallback src="https://placehold.co/60x60/E0FBF0/1E8A5A?text=早" className="rounded-lg object-cover w-full h-full" alt="Breakfast" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#3F3A39]">早餐 (吐司+豆漿)</h4>
              <p className="text-xs text-[#9B9491]">08:30 | <span className="text-[#E8C9A8]">350 kcal</span></p>
            </div>
          </div>
          {/* Lunch */}
          <div className="flex items-center p-3 border-b border-[#E5DED9]">
            <div className="w-14 h-14 mr-3">
                <ImageWithFallback src="https://placehold.co/60x60/FEF3C7/D97706?text=午" className="rounded-lg object-cover w-full h-full" alt="Lunch" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#3F3A39]">午餐 (雞腿便當)</h4>
              <p className="text-xs text-[#9B9491]">12:15 | <span className="text-[#D6D0CC]">未計算</span></p>
            </div>
            {/* AI Feature 6: Meal Analysis */}
            <button 
              onClick={handleMealAnalysis}
              className="text-[10px] bg-[#E6B7B3]/10 text-[#8B6F6A] border border-[#E6B7B3] px-2 py-1 rounded-md font-bold hover:bg-[#E6B7B3]/20 transition flex items-center shadow-sm"
            >
              <Calculator className="mr-1 w-3 h-3" />
              AI 營養計算
            </button>
          </div>
          {/* Dinner */}
          <div className="flex items-center p-3 border-b border-[#E5DED9]">
            <div className="w-14 h-14 rounded-lg bg-[#FAF8F6] flex items-center justify-center mr-3 border-2 border-dashed border-[#E5DED9]">
              <Camera className="text-[#D6D0CC] w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#9B9491]">晚餐 (未記錄)</h4>
            </div>
          </div>
          {/* Add Button */}
          <button className="w-full py-3 bg-[#FAF8F6] hover:bg-[#F4D6C9]/50 text-[#8B6F6A] font-medium text-sm transition flex items-center justify-center">
            <Plus className="mr-2 w-4 h-4" />
            新增飲食
          </button>
        </div>
      </section>

      {/* Section: 胎動紀錄 */}
      <section>
        <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
          <Footprints className="-rotate-90 mr-2 w-4 h-4" />
          胎動紀錄
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5DED9] p-4">
          <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-[#3F3A39]">今日次數</h4>
                <span className="text-2xl font-bold text-[#E8C9A8]">12 <span className="text-xs text-[#9B9491] font-normal">次</span></span>
          </div>
          <div className="h-[180px] w-full min-w-0 mb-4 relative" style={{ minWidth: 0 }}>
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kickData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#E8C9A8" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#E8C9A8' }}
                    fill="rgba(232, 201, 168, 0.1)"
                  />
                </LineChart>
             </ResponsiveContainer>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-[#E8C9A8] hover:bg-[#d6b797] text-white rounded-xl font-bold shadow-md shadow-[#F4D6C9] transition flex items-center justify-center">
              <Plus className="mr-2 w-4 h-4" />
              記錄胎動
            </button>
            {/* AI Feature 7: Kick Analysis */}
            <button 
              onClick={handleKickAnalysis}
              className="px-4 py-3 bg-[#E8C9A8]/10 text-[#E8C9A8] border border-[#E8C9A8] rounded-xl font-bold hover:bg-[#E8C9A8]/20 transition flex flex-col items-center justify-center text-xs"
            >
              <LineChartIcon className="mb-1 w-4 h-4" />
              AI 解讀
            </button>
          </div>
        </div>
      </section>

      {/* Section: 心情紀錄 */}
      <section>
        <h3 className="font-bold text-[#3F3A39] mb-3 text-sm text-[#6F6765] uppercase tracking-wider flex items-center">
          <Smile className="mr-2 w-4 h-4" />
          心情紀錄
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-xl border border-[#E5DED9] flex items-center shadow-sm">
            <div className="text-2xl mr-3">😀</div>
            <div>
              <p className="text-sm font-bold text-[#3F3A39]">今天心情很好</p>
              <p className="text-xs text-[#9B9491]">14:00</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#E5DED9] flex items-center shadow-sm">
            <div className="text-2xl mr-3">😐</div>
            <div>
              <p className="text-sm font-bold text-[#3F3A39]">今天有點累</p>
              <p className="text-xs text-[#9B9491]">09:30 - 昨晚沒睡好...</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="h-8"></div> 
    </div>
  );
}
