import React, { useState } from 'react';
import { generateOrderId, buildPaymentUrl, debugPaymentParams } from '@/lib/paymentConfig';

const TestOrderId: React.FC = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testGenerateOrderId = () => {
    try {
      setError('');
      console.log('=== 测试订单号生成 ===');
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      console.log('生成的订单号:', newOrderId);
      console.log('订单号类型:', typeof newOrderId);
      console.log('订单号长度:', newOrderId.length);
      console.log('订单号是否为空:', !newOrderId);
      console.log('=== 测试完成 ===');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '未知错误';
      setError(`生成订单号失败: ${errorMsg}`);
      console.error('生成订单号失败:', error);
    }
  };

  const testBuildPaymentUrl = () => {
    try {
      setError('');
      if (!orderId) {
        setError('请先生成订单号');
        return;
      }
      
      console.log('=== 测试支付URL构建 ===');
      console.log('使用的订单号:', orderId);
      const url = buildPaymentUrl('alipay', orderId, 19.9);
      setPaymentUrl(url);
      console.log('支付URL:', url);
      console.log('=== 测试完成 ===');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '未知错误';
      setError(`构建支付URL失败: ${errorMsg}`);
      console.error('构建支付URL失败:', error);
    }
  };

  const testDebugPaymentParams = () => {
    try {
      setError('');
      console.log('=== 测试调试信息 ===');
      const debug = debugPaymentParams('alipay');
      setDebugInfo(debug);
      console.log('调试信息:', debug);
      console.log('=== 测试完成 ===');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '未知错误';
      setError(`获取调试信息失败: ${errorMsg}`);
      console.error('获取调试信息失败:', error);
    }
  };

  const clearAll = () => {
    setOrderId('');
    setPaymentUrl('');
    setDebugInfo(null);
    setError('');
    console.log('已清除所有测试数据');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">订单号生成测试</h1>
        
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            <strong>错误:</strong> {error}
          </div>
        )}
        
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
                <br />
                <strong>长度:</strong> {orderId.length}
                <br />
                <strong>类型:</strong> {typeof orderId}
                <br />
                <strong>是否为空:</strong> {!orderId ? '是' : '否'}
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

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">操作</h2>
            <button
              onClick={clearAll}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
            >
              清除所有数据
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">使用说明</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>点击"生成订单号"按钮测试订单号生成功能</li>
            <li>生成订单号后，点击"构建支付URL"测试支付URL构建</li>
            <li>点击"获取调试信息"查看完整的支付参数和签名</li>
            <li>查看浏览器控制台的详细日志信息</li>
            <li>如果出现错误，错误信息会显示在页面顶部</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestOrderId;
