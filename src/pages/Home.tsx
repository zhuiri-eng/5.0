import { Link } from 'react-router-dom';

export default function Home() {
  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-600">
          玄学命理报告
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          探索您的命运密码，揭示潜藏的人生轨迹与机遇
        </p>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl">
          <div className="mb-8 text-center">
            <i className="fa-solid fa-crystal-ball text-5xl text-yellow-400 mb-4"></i>
            <h2 className="text-2xl font-semibold mb-2">发现您的人生运势</h2>
            <p className="text-gray-400">输入您的个人信息，获取专业的玄学命理分析</p>
          </div>
          
          <Link 
            to="/report-form"
            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center gap-2"
          >
            <span>生成命理报告</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
      
      <footer className="mt-auto mb-6 text-gray-500 text-sm">
        <p>玄学命理 · 探索人生奥秘</p>
      </footer>
    </div>
  );
}