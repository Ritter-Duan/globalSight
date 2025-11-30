import React from 'react';
import { ArrowUpRight, CheckCircle2, Tag } from 'lucide-react';
import { Opportunity } from '../types';

interface Props {
  data: Opportunity;
}

const OpportunityCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 mb-2 flex-wrap">
            {data.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            data.impactLevel === 'High' ? 'bg-red-100 text-red-700' :
            data.impactLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {data.impactLevel === 'High' ? '高潜力' : data.impactLevel === 'Medium' ? '中等潜力' : '一般机会'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {data.title}
        </h3>
        
        <p className="text-slate-600 mb-6 leading-relaxed">
          {data.summary}
        </p>

        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
            <span className="w-1 h-4 bg-indigo-500 rounded mr-2"></span>
            机会分析依据
          </h4>
          <ul className="space-y-2">
            {data.analysisPoints.map((point, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="bg-yellow-50 px-1 rounded text-slate-800 font-medium">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            来源: {data.source}
          </span>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
            查看详情 <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;