import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const PlenxFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#050811] border-t border-white/5 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        {/* Col 1: PlenX Brand */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-glow-pink">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              Plen<span className="text-fuchsia-400">X</span>
            </span>
          </Link>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Nền tảng sáng tạo nội dung bằng AI toàn diện hàng đầu Đông Nam Á, giúp tiết kiệm thời gian và chi phí cho nhà sáng tạo.
          </p>
        </div>

        {/* Col 2: Tính năng AI */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tính năng AI</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/studio" className="hover:text-white transition-colors">Tạo Video</Link></li>
            <li><Link to="/studio" className="hover:text-white transition-colors">Tạo Ảnh</Link></li>
            <li><Link to="/fast-apps" className="hover:text-white transition-colors">Video Nhảy</Link></li>
            <li><Link to="/fast-apps" className="hover:text-white transition-colors">AI Model</Link></li>
            <li><Link to="/voice" className="hover:text-white transition-colors">Voice Clone</Link></li>
          </ul>
        </div>

        {/* Col 3: Công cụ */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Công cụ</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/fast-apps" className="hover:text-white transition-colors">Tách nền thông minh</Link></li>
            <li><Link to="/tiktok-tools" className="hover:text-white transition-colors">Viết kịch bản AI</Link></li>
            <li><Link to="/studio" className="hover:text-white transition-colors">Chỉnh sửa ảnh</Link></li>
            <li><Link to="/fast-apps" className="hover:text-white transition-colors">Ghép mặt FaceID</Link></li>
          </ul>
        </div>

        {/* Col 4: Điều khoản & Chính sách */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Điều khoản &amp; Chính sách</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="#models" className="hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
            <li><a href="#models" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#models" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#models" className="hover:text-white transition-colors">Chính sách hoàn tiền</a></li>
          </ul>
        </div>

        {/* Col 5: Liên hệ */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Liên hệ</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="mailto:support@plenxai.com" className="hover:text-white transition-colors">support@plenxai.com</a></li>
            <li><span className="text-slate-300">Zalo: 0988.xxx.xxx</span></li>
            <li><a href="https://t.me/plenxai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Telegram Community</a></li>
            <li><a href="https://facebook.com/plenxai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Fanpage PlenX AI</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span>© 2026 PlenX. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Vietnam
        </span>
      </div>
    </footer>
  );
};
