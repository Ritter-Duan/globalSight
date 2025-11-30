import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Link as LinkIcon, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { SearchConfig } from '../types';

const Configuration: React.FC = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState<string>('https://techcrunch.com\nhttps://www.shopify.com/blog/trends');
  const [frequency, setFrequency] = useState<'hourly' | 'daily'>('daily');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const config: SearchConfig = {
      urls: urls.split('\n').filter(url => url.trim() !== ''),
      frequency
    };

    // Simulate 2 seconds minimum delay for UX before navigating, 
    // the actual "loading" of results will happen on the results page logic
    // but the prompt asked for "Wait 5 seconds" after submission. 
    // To enable a smooth transition, we will navigate to Results page 
    // and let the Results page handle the heavy lifting and loading state.
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/results', { state: { config } });
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">配置您的机会雷达</h1>
        <p className="text-slate-600">告诉 AI 您关注的信息源，我们将为您挖掘其中的价值。</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* URL Input Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <LinkIcon className="w-4 h-4 mr-2 text-indigo-600" />
                目标网站列表 (每行一个)
              </label>
              <div className="relative">
                <textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  rows={6}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono text-sm text-slate-700 placeholder-slate-400"
                  placeholder="https://example.com&#10;https://another-site.com"
                  required
                />
                <div className="absolute top-3 right-3 text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
                  {urls.split('\n').filter(u => u.trim()).length} 个来源
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                支持新闻站、博客、论坛首页等。
              </p>
            </div>

            {/* Frequency Section */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                抓取与分析频次
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  className={`cursor-pointer border rounded-xl p-4 flex items-center transition-all ${frequency === 'hourly' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}
                  onClick={() => setFrequency('hourly')}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${frequency === 'hourly' ? 'border-indigo-600' : 'border-slate-300'}`}>
                    {frequency === 'hourly' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                  </div>
                  <div>
                    <span className="block font-medium text-slate-900">每小时更新</span>
                    <span className="text-xs text-slate-500">适合高频交易或突发热点</span>
                  </div>
                </div>

                <div 
                  className={`cursor-pointer border rounded-xl p-4 flex items-center transition-all ${frequency === 'daily' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'}`}
                  onClick={() => setFrequency('daily')}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${frequency === 'daily' ? 'border-indigo-600' : 'border-slate-300'}`}>
                    {frequency === 'daily' && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                  </div>
                  <div>
                    <span className="block font-medium text-slate-900">每天日报汇总</span>
                    <span className="text-xs text-slate-500">适合深度阅读与战略规划</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg flex items-center justify-center transition-all ${
                isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  配置提交中...
                </>
              ) : (
                <>
                  启动机会引擎
                  <ArrowRight className="w-6 h-6 ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex items-center text-sm text-slate-500">
          <Settings className="w-4 h-4 mr-2" />
          <span>配置将立即生效，首次分析大约需要几秒钟。</span>
        </div>
      </div>
    </div>
  );
};

export default Configuration;