import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function ChefChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: 'Chào bạn! Tôi là AI Chef của CineTaste. Bạn đang muốn nấu gì hôm nay, hay cần giải cứu một món ăn?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: 'Đó là một câu hỏi thú vị! Để món bít tết mềm như trong phim, bí quyết nằm ở việc để thịt nghỉ (resting) sau khi áp chảo khoảng 5-10 phút. Điều này giúp nước thịt lan tỏa đều miếng thịt.' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[600px] flex flex-col bg-cinematic-gray rounded-3xl border border-gray-800 overflow-hidden animate-fade-in shadow-2xl">
       {/* Header */}
       <div className="p-4 border-b border-gray-800 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-cinematic-gold/20 flex items-center justify-center text-cinematic-gold">
                <Bot className="w-6 h-6" />
             </div>
             <div>
                <h3 className="font-bold text-white">AI Sous-Chef</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-xs text-gray-400">Online & Sẵn sàng</span>
                </div>
             </div>
          </div>
       </div>

       {/* Messages */}
       <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                   msg.role === 'user' 
                   ? 'bg-cinematic-accent text-white rounded-tr-sm' 
                   : 'bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700'
                }`}>
                   {msg.content}
                </div>
             </div>
          ))}
       </div>

       {/* Input */}
       <div className="p-4 bg-black/20 border-t border-gray-800">
          <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
             {['Thay thế nguyên liệu?', 'Mẹo cắt thái', 'Cứu món mặn'].map(qs => (
                <button key={qs} onClick={() => setInput(qs)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                   {qs}
                </button>
             ))}
          </div>
          <div className="relative">
             <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Nhập câu hỏi..."
                className="w-full bg-cinematic-gray-light border border-gray-700 rounded-xl py-4 pl-5 pr-14 text-white focus:outline-none focus:border-cinematic-accent"
             />
             <button onClick={handleSend} className="absolute right-2 top-2 p-2 bg-cinematic-accent rounded-lg text-white hover:bg-cinematic-accent-light transition-colors">
                <Send className="w-5 h-5" />
             </button>
          </div>
       </div>
    </div>
  );
}