import React, { useEffect, useState } from 'react';
import { X, Bot, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  prompt: string;
}

export function AIModal({ isOpen, onClose, title, prompt }: AIModalProps) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [needsApiKey, setNeedsApiKey] = useState(false);

  useEffect(() => {
    if (isOpen && prompt) {
      const defaultKey = "AIzaSyAqJZ_4IKHY0SKpGNY6GKpwrTRD35gd90Y";
      const storedKey = localStorage.getItem('gemini_api_key');
      const activeKey = storedKey || defaultKey;
      
      if (!activeKey) {
        setNeedsApiKey(true);
      } else {
        setNeedsApiKey(false);
        fetchAIResponse(activeKey);
      }
    } else {
      // Reset state when closed
      setContent('');
      setError(null);
      setNeedsApiKey(false);
      setApiKeyInput('');
    }
  }, [isOpen, prompt]);

  const saveApiKeyAndFetch = () => {
    if (!apiKeyInput.trim()) {
      setError("請輸入有效的 API Key");
      return;
    }
    localStorage.setItem('gemini_api_key', apiKeyInput.trim());
    setNeedsApiKey(false);
    fetchAIResponse(apiKeyInput.trim());
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setNeedsApiKey(true);
    setContent('');
  };

  const fetchAIResponse = async (apiKey: string) => {
    setLoading(true);
    setError(null);
    setContent('');

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 403) {
          throw new Error('API Key 無效或已過期，請重新輸入。');
        }
        
        const errText = await response.text();
        console.error("API Error Response:", errText);
        throw new Error(`API 連線發生錯誤 (${response.status})`);
      }
      
      const result = await response.json();
      
      if (result.candidates && result.candidates[0].content.parts[0].text) {
        setContent(result.candidates[0].content.parts[0].text);
      } else {
        setError("抱歉，目前無法取得建議。");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "連線發生錯誤，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={`line-${i}`}>
        {line.split('**').map((part, j) => 
          j % 2 === 1 ? <strong key={`bold-${i}-${j}`}>{part}</strong> : <span key={`text-${i}-${j}`}>{part}</span>
        )}
        <br />
      </span>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[360px] rounded-2xl p-0 overflow-hidden border-none">
        <DialogHeader className="p-6 pb-2 bg-white">
            <DialogTitle className="text-lg font-bold text-[#1E8A5A] flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              {title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              AI Assistant Response for {title}
            </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6 bg-white">
          <div className="text-sm text-gray-700 leading-relaxed min-h-[100px]">
            {needsApiKey ? (
              <div className="flex flex-col space-y-3 mt-2">
                <p className="text-[#6F6765] text-xs">請輸入您的 Google Gemini API Key 以啟用 AI 建議功能：</p>
                <input 
                  type="password" 
                  placeholder="AIzaSy..." 
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5DED9] rounded-lg focus:ring-1 focus:ring-[#1E8A5A] focus:border-[#1E8A5A] outline-none text-sm"
                />
                <button 
                  onClick={saveApiKeyAndFetch}
                  className="w-full bg-[#1E8A5A] text-white py-2 rounded-lg font-medium hover:bg-[#166c46] transition-colors"
                >
                  儲存並取得建議
                </button>
                {error && <div className="text-red-500 text-xs text-center">{error}</div>}
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-6 h-full">
                <Loader2 className="h-8 w-8 animate-spin text-[#1E8A5A] mb-3" />
                <span className="text-gray-500 text-xs">AI 正在思考中...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
              <div className="animate-in fade-in duration-300">
                {formatContent(content)}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>由 Google Gemini 提供技術支援</span>
            {!needsApiKey && (
              <button onClick={clearApiKey} className="text-[#6F6765] hover:text-[#1E8A5A] underline">
                重設 API Key
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
