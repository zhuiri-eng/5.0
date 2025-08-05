import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '@/contexts/paymentContext';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { setIsPaid } = usePayment();

  useEffect(() => {
    // 设置付费状态
    setIsPaid(true);
    localStorage.setItem('metaphysics_paid', 'true');
    
    // 3秒后自动跳转到报告页面
    const timer = setTimeout(() => {
      navigate('/metaphysics-report');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsPaid, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-3xl text-green-400"></i>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">支付成功！</h1>
          
          <p className="text-gray-300 mb-6">
            感谢您的购买！您现在可以查看完整的玄学命理报告了。
          </p>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-green-400 font-semibold mb-2">解锁内容包含：</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 完整五行旺衰分析</li>
              <li>• 详细性格特质解读</li>
              <li>• 运势展望与建议</li>
              <li>• 专业命理指导</li>
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/metaphysics-report')}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              立即查看报告
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              返回首页
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            页面将在3秒后自动跳转到报告页面
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 