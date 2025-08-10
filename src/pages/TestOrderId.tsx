import React, { useState } from 'react';
import { generateOrderId, buildPaymentUrl, debugPaymentParams } from '@/lib/paymentConfig';

const TestOrderId: React.FC = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testGenerateOrderId = () => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    console.log('生成的订单号:', newOrderId);
  };

  const testBuildPaymentUrl = () => {
    if (!orderId) {
      alert('请先生成订单号');
      return;
    }
    
    try {
      const url = buildPaymentUrl('alipay', orderId, 19.9);
      setPaymentUrl(url);
      console.log('支付URL:', url);
    } catch (error) {
      console.error('构建支付URL失败:', error);
      alert('构建支付URL失败: ' + error);
    }
  };

  const testDebugPaymentParams = () => {
    try {
      const debug = debugPaymentParams('alipay');
      setDebugInfo(debug);
      console.log('调试信息:', debug);
    } catch (error) {
      console.error('获取调试信息失败:', error);
      alert('获取调试信息失败: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">订单号生成测试</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">测试订单号生成</h2>
            <button
              onClick={testGenerateOrderId}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-4"
            >
              生成订单号
            </button>
            {orderId && (
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <strong>订单号:</strong> {orderId}
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">测试支付URL构建</h2>
            <button
              onClick={testBuildPaymentUrl}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-4"
              disabled={!orderId}
            >
              构建支付URL
            </button>
            {paymentUrl && (
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <strong>支付URL:</strong> 
                <div className="break-all text-sm mt-2">{paymentUrl}</div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">测试调试信息</h2>
            <button
              onClick={testDebugPaymentParams}
              className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mr-4"
            >
              获取调试信息
            </button>
            {debugInfo && (
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <strong>调试信息:</strong>
                <pre className="text-sm mt-2 overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOrderId;
