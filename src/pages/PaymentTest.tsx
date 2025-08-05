import React, { useState } from 'react';
import { PAYMENT_CONFIG, debugPaymentParams } from '@/lib/paymentConfig';

const PaymentTest: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [selectedPaymentType, setSelectedPaymentType] = useState<'alipay' | 'wechat' | 'qq'>('alipay');

  const testPayment = () => {
    const debugData = debugPaymentParams(selectedPaymentType);

    const debugText = `
=== 码支付调试信息 ===

订单信息:
- 订单号: ${debugData.orderId}
- 支付金额: ¥${debugData.amount}
- 支付方式: ${debugData.paymentType}

支付参数:
${Object.entries(debugData.params).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

签名生成:
- 签名字符串: ${debugData.signString}
- 最终签名: ${debugData.sign}

完整URL:
${debugData.fullUrl}

=== 调试说明 ===
1. 检查签名字符串是否按字母顺序排序
2. 确认所有参数值不为空
3. 验证MD5算法是否正确
4. 检查最终签名是否为大写

如果签名校验失败，请检查:
- PID和KEY是否正确
- 参数值是否包含特殊字符
- 签名字符串格式是否符合要求
    `;

    setDebugInfo(debugText);
    console.log('支付调试信息:', debugData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">支付调试页面</h1>
        
        {/* 支付方式选择 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">选择支付方式</h3>
          <div className="flex space-x-4">
            {Object.entries(PAYMENT_CONFIG.PAYMENT_METHODS).map(([id, method]) => (
              <label
                key={id}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPaymentType === id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value={id}
                  checked={selectedPaymentType === id}
                  onChange={(e) => setSelectedPaymentType(e.target.value as 'alipay' | 'wechat' | 'qq')}
                  className="sr-only"
                />
                <i className={`${method.icon} text-xl ${method.color} mr-2`}></i>
                <span className="text-white font-medium">{method.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          onClick={testPayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-6"
        >
          测试支付签名
        </button>

        {debugInfo && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">调试信息:</h2>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTest; 