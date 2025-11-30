import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import { fetchOpportunities } from '../services/geminiService';
import { Opportunity, SearchConfig } from '../types';

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [progress, setProgress] = useState(0);

  // Retrieve config from navigation state
  const config = location.state?.config as SearchConfig | undefined;

  useEffect(() => {
    if (!config) {
      navigate('/config');
      return;
    }

    const loadData = async () => {
      const startTime = Date.now();
      
      // Artificial loading progress for UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      try {
        // Fetch real data from Gemini
        const data = await fetchOpportunities(config.urls);
        setOpportunities(data);
      } catch (err) {
        console.error("Failed to load opportunities", err);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 5000 - elapsedTime); // Ensure at least 5 seconds total wait as requested

        setTimeout(() => {
          clearInterval(progressInterval);
          setProgress(100);
          setLoading(false);
        }, remainingTime);
      }
    };

    loadData();
  }, [config, navigate]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">正在挖掘行业机会...</h2>
          <p className="text-center text-slate-500 mb-6">AI 正在深度分析 {config?.urls.length} 个数据源</p>
          
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-right text-xs text-slate-400">{Math.round(progress)}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
            今日机会雷达
          </h1>
          <p className="text-slate-500 mt-2">
            基于 {config?.urls.length} 个来源的智能分析报告
          </p>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新数据
        </button>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">暂未发现显著机会</h3>
          <p className="text-slate-500">请尝试更换数据源或稍后再试。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {opportunities.map((opp, index) => (
            <OpportunityCard key={index} data={opp} />
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center text-sm text-slate-400">
        AI 生成内容仅供参考，商业决策请结合实际调研。
      </div>
    </div>
  );
};

export default Results;