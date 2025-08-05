import React, { useState } from 'react';
import { PAYMENT_CONFIG, generateOrderId, generateSign, md5, buildPaymentUrl } from '@/lib/paymentConfig';

const PaymentTest: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<string>('');

  const testPayment = () => {
    const orderId = generateOrderId();
    const amount = PAYMENT_CONFIG.PRICE;
    const paymentType = 'alipay';

    const paymentParams = {
      pid: PAYMENT_CONFIG.PID,
      type: paymentType,
      out_trade_no: orderId,
      notify_url: PAYMENT_CONFIG.NOTIFY_URL,
      return_url: PAYMENT_CONFIG.RETURN_URL,
      name: PAYMENT_CONFIG.PRODUCT_NAME,
      money: amount.toFixed(2),
      sitename: PAYMENT_CONFIG.SITE_NAME
    };

    // 生成签名
    const signStr = generateSign(paymentParams, PAYMENT_CONFIG.KEY);
    const sign = md5(signStr);

    const debugText = `
=== 支付调试信息 ===
订单号: ${orderId}
金额: ${amount}
支付类型: ${paymentType}

参数:
${JSON.stringify(paymentParams, null, 2)}

签名字符串:
${signStr}

生成的签名:
${sign}

完整URL:
${PAYMENT_CONFIG.API_URL}submit.php?${new URLSearchParams({
      ...paymentParams,
      sign: sign
    }).toString()}
    `;

    setDebugInfo(debugText);
    console.log('支付调试信息:', debugText);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">支付调试页面</h1>
        
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