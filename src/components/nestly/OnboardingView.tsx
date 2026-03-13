import React, { useState } from "react";
import {
  ChevronRight,
  Baby,
  Ruler,
  Weight,
  Calendar,
  User,
  Heart,
  ArrowRight,
} from "lucide-react";

export interface UserData {
  nickname: string;
  birthday: string;
  age: string;
  weight: string;
  height: string;
  bellyCircumference: string;
  pregnancyWeeks: number;
}

interface OnboardingViewProps {
  onComplete: (data: UserData) => void;
}

export function OnboardingView({
  onComplete,
}: OnboardingViewProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserData>({
    nickname: "",
    birthday: "",
    age: "",
    weight: "",
    height: "",
    bellyCircumference: "",
    pregnancyWeeks: 16,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pregnancyWeeks"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.nickname) return;
      setStep(2);
    } else if (step === 2) {
      const dateRegex = /^\d{8}$/;
      const ageRegex = /^\d{2}$/;
      
      if (!dateRegex.test(formData.birthday)) {
        setError("請輸入8位數字的出生年月日 (如: 19900101)");
        return;
      }
      if (!ageRegex.test(formData.age)) {
        setError("年齡請輸入兩位數字 (如: 28)");
        return;
      }
      setStep(3);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE8] md:p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-[420px] bg-[#FAF8F6] shadow-2xl min-h-screen md:min-h-[650px] md:h-[85vh] md:max-h-[850px] md:rounded-[40px] relative overflow-hidden flex flex-col border-[6px] border-transparent md:border-[#FFFFFF]">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E6B7B3] rounded-full opacity-20 blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F4D6C9] rounded-full opacity-20 blur-3xl -ml-10 -mb-10"></div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 flex flex-col animate-in fade-in duration-700 no-scrollbar">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8 space-x-2 relative z-10 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= step
                    ? "w-8 bg-[#9FB6A0]"
                    : "w-2 bg-[#E5DED9]"
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            {step === 1 && (
              <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-500">
                <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#F4D6C9]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-[#9FB6A0] shadow-sm">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-[#3F3A39]">
                  歡迎來到 Nestly!
                </h2>
                <p className="text-[#6F6765] mt-2">
                  首先，該怎麼稱呼妳呢？
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#3F3A39] mb-2">
                    您的暱稱
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="例如：準媽咪 Amy"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-2 focus:ring-[#E6B7B3]/50 outline-none transition bg-[#FAF8F6] focus:bg-white text-[#3F3A39]"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex-col animate-in slide-in-from-right-8 duration-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#E6B7B3]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-[#E6B7B3] shadow-sm">
                  <Heart className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-[#3F3A39]">
                  建立您的健康檔案
                </h2>
                <p className="text-sm text-[#6F6765]">
                  這能幫助我們更精準追蹤健康
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#6F6765] mb-1">
                      出生年月日
                    </label>
                    <input
                      type="text"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      placeholder="如: 19900101"
                      maxLength={8}
                      className={`w-full px-3 py-2 rounded-lg border ${error?.includes('8位') ? 'border-red-400 focus:ring-red-400' : 'border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-[#E6B7B3]'} focus:ring-1 outline-none text-sm bg-[#FAF8F6] text-[#3F3A39]`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6F6765] mb-1">
                      年齡
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="歲"
                      maxLength={2}
                      className={`w-full px-3 py-2 rounded-lg border ${error?.includes('兩位') ? 'border-red-400 focus:ring-red-400' : 'border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-[#E6B7B3]'} focus:ring-1 outline-none text-sm bg-[#FAF8F6] text-[#3F3A39]`}
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-xs font-bold text-center mt-1 animate-in slide-in-from-top-1">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#6F6765] mb-1">
                      身高 (cm)
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-2.5 w-4 h-4 text-[#9B9491]" />
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full pl-9 px-3 py-2 rounded-lg border border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-1 focus:ring-[#E6B7B3] outline-none text-sm bg-[#FAF8F6] text-[#3F3A39]"
                        placeholder="160"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6F6765] mb-1">
                      體重 (kg)
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-2.5 w-4 h-4 text-[#9B9491]" />
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full pl-9 px-3 py-2 rounded-lg border border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-1 focus:ring-[#E6B7B3] outline-none text-sm bg-[#FAF8F6] text-[#3F3A39]"
                        placeholder="55"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6F6765] mb-1">
                    目前腹圍 (cm)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 w-4 h-4 text-[#9B9491] font-bold flex items-center justify-center border border-[#9B9491] rounded-full text-[10px]">
                      W
                    </div>
                    <input
                      type="number"
                      name="bellyCircumference"
                      value={formData.bellyCircumference}
                      onChange={handleChange}
                      className="w-full pl-9 px-3 py-2 rounded-lg border border-[#E5DED9] focus:border-[#E6B7B3] focus:ring-1 focus:ring-[#E6B7B3] outline-none text-sm bg-[#FAF8F6] text-[#3F3A39]"
                      placeholder="例如：82"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-500">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#9FB6A0]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#9FB6A0] shadow-sm animate-bounce">
                  <Baby className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-[#3F3A39]">
                  寶寶多大了？
                </h2>
                <p className="text-[#6F6765] mt-2">
                  設定目前的懷孕週數
                </p>
              </div>

              <div className="px-4">
                <div className="bg-[#FAF8F6] p-6 rounded-2xl border-2 border-[#9FB6A0]/30 text-center">
                  <span className="text-5xl font-bold text-[#9FB6A0] block mb-2">
                    {formData.pregnancyWeeks}
                  </span>
                  <span className="text-[#6F6765] font-medium">
                    週
                  </span>

                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    name="pregnancyWeeks"
                    value={formData.pregnancyWeeks}
                    onChange={handleChange}
                    className="w-full mt-6 accent-[#9FB6A0] h-2 bg-[#D6D0CC] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-[#9B9491] mt-2">
                    <span>1週</span>
                    <span>40週</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleNext}
              className={`w-full py-3.5 rounded-xl font-bold shadow-lg shadow-[#E6B7B3]/30 flex items-center justify-center transition-all transform active:scale-95 ${
                step === 1 && !formData.nickname
                  ? "bg-[#D6D0CC] text-white cursor-not-allowed"
                  : "bg-[#9FB6A0] text-white hover:bg-[#859d86] hover:shadow-xl"
              }`}
              disabled={step === 1 && !formData.nickname}
            >
              {step === 3 ? "開始體驗" : "下一步"}
              {step !== 3 && (
                <ChevronRight className="ml-2 w-5 h-5" />
              )}
              {step === 3 && (
                <ArrowRight className="ml-2 w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}