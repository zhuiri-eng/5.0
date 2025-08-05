import React, { useState } from 'react';
import { usePayment } from '@/contexts/paymentContext';
import { PAYMENT_CONFIG } from '@/lib/paymentConfig';

const PaymentModal: React.FC = () => {
  const { 
    showPaymentModal, 
    setShowPaymentModal, 
    paymentAmount, 
    handlePayment, 
    loading 
  } = usePayment();

  const [selectedPayment, setSelectedPayment] = useState<'alipay' | 'wechat' | 'qq'>('alipay');

  if (!showPaymentModal) return null;

  const paymentMethods = Object.entries(PAYMENT_CONFIG.PAYMENT_METHODS).map(([id, method]) => ({
    id: id as 'alipay' | 'wechat' | 'qq',
    name: method.name,
    icon: method.icon,
    color: method.color,
    description: method.description
  }));

  const handlePaymentClick = async () => {
    const success = await handlePayment(selectedPayment);
    if (success) {
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-crown text-2xl text-yellow-400"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">解锁完整报告</h2>
          <p className="text-gray-400">获取详细的玄学命理分析，包含性格特质、运势展望等完整内容</p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">报告价格</span>
            <span className="text-2xl font-bold text-yellow-400">¥{paymentAmount}</span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center">
              <i className="fa-solid fa-check text-green-400 mr-2"></i>
              <span>完整五行旺衰分析</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-check text-green-400 mr-2"></i>
              <span>详细性格特质解读</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-check text-green-400 mr-2"></i>
              <span>运势展望与建议</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-check text-green-400 mr-2"></i>
              <span>专业命理指导</span>
            </div>
          </div>
        </div>

        {/* 支付方式选择 */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">选择支付方式</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPayment === method.id
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value as 'alipay' | 'wechat' | 'qq')}
                  className="sr-only"
                />
                <i className={`${method.icon} text-xl ${method.color} mr-3`}></i>
                <span className="text-white font-medium">{method.name}</span>
                {selectedPayment === method.id && (
                  <i className="fa-solid fa-check text-yellow-400 ml-auto"></i>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePaymentClick}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              loading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                处理中...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <i className="fa-solid fa-credit-card mr-2"></i>
                立即支付 ¥{paymentAmount}
              </div>
            )}
          </button>
          
          <button
            onClick={() => setShowPaymentModal(false)}
            className="w-full py-2 px-6 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
          >
            稍后再说
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>支付安全由码支付平台保障</p>
          <p>购买后永久有效，可重复查看</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 