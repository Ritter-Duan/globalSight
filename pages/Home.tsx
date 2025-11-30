import React from 'react';
import { Link } from 'react-router-dom';
import { Radar, Zap, LineChart, Globe, ArrowRight } from 'lucide-react';
import { Feature, Review } from '../types';

const features: Feature[] = [
  {
    title: "智能抓取",
    description: "全天候自动监控您关注的行业网站，不错过任何一条关键动态。",
    icon: <Globe className="w-6 h-6 text-white" />
  },
  {
    title: "深度分析",
    description: "利用 LLM 模型深入拆解市场信号，识别表面之下的商业逻辑。",
    icon: <Radar className="w-6 h-6 text-white" />
  },
  {
    title: "趋势预测",
    description: "基于大数据分析未来 3-6 个月的行业风向，助您抢占先机。",
    icon: <LineChart className="w-6 h-6 text-white" />
  },
  {
    title: "打破茧房",
    description: "跨越语言和地域限制，获取全球范围内的新奇创意与机会点。",
    icon: <Zap className="w-6 h-6 text-white" />
  }
];

const reviews: Review[] = [
  {
    name: "Alex Chen",
    role: "跨境电商亿级大卖",
    avatar: "https://picsum.photos/100/100?random=1",
    content: "GlobalSight 帮我们发现了拉美市场的一个细分品类蓝海，直接带来了30%的季度增长。它的信息筛选能力非常惊人。"
  },
  {
    name: "Sarah Wu",
    role: "DTC品牌创始人",
    avatar: "https://picsum.photos/100/100?random=2",
    content: "以前我每天花3小时刷新闻，现在只需要看 GlobalSight 的日报。它不仅给我信息，还给我分析好的行动建议。"
  },
  {
    name: "Davie Li",
    role: "出海SaaS投资人",
    avatar: "https://picsum.photos/100/100?random=3",
    content: "对于投资人来说，这是一个捕捉早期趋势的神器。我在这里看到的很多赛道，几个月后才成为主流热点。"
  }
];

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              打破信息茧房 <br/>
              <span className="text-indigo-400">发现跨境新机遇</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl">
              AI跨境行业机会发现。通过订阅网站每天为您抓取、分析、总结行业内的新生机会点，获取创意新想法。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/config" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
                开始发现机会
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-lg font-medium rounded-lg text-slate-200 hover:bg-slate-800 transition-all">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">核心功能</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              为什么选择 GlobalSight AI?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">行业大咖都在用</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                 <div className="absolute top-6 right-8 text-6xl text-indigo-100 font-serif opacity-50">"</div>
                <div className="flex items-center mb-6">
                  <img className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-100" src={review.avatar} alt={review.name} />
                  <div className="ml-4">
                    <div className="text-lg font-bold text-slate-900">{review.name}</div>
                    <div className="text-sm text-indigo-600">{review.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic relative z-10">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;