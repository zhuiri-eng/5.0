import React from 'react';
import { usePayment } from '@/contexts/paymentContext';

const PaywallBanner: React.FC = () => {
  const { setShowPaymentModal } = usePayment();

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
            <i className="fa-solid fa-lock text-yellow-400"></i>
          </div>
          <div>
            <h3 className="text-white font-semibold">解锁完整报告</h3>
            <p className="text-gray-300 text-sm">查看详细的性格特质、运势展望等完整内容</p>
          </div>
        </div>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <i className="fa-solid fa-crown mr-2"></i>
          立即解锁
        </button>
      </div>
    </div>
  );
};

export default PaywallBanner; 