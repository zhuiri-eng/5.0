import React, { useState } from 'react';
import { debugPaymentParams, generateOrderId, generateSign, md5 } from '@/lib/paymentConfig';

const PaymentDebug: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<'alipay' | 'wechat' | 'qq'>('alipay');
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleDebug = () => {
    const info = debugPaymentParams(selectedPayment);
    setDebugInfo(info);
  };

  const handleManualDebug = () => {
    const orderId = generateOrderId();
    const amount = 19.9;
    
    const paymentParams = {
      pid: '1000',
      type: selectedPayment,
      out_trade_no: orderId,
      notify_url: 'https://sta.qijiuwang.top/notify_url.php',
      return_url: 'https://sta.qijiuwang.top/return_url.php',
      name: '玄学命理报告',
      money: amount.toFixed(2),
      sitename: '玄学命理分析平台'
    };

    const signStr = generateSign(paymentParams, '1cepbt1wHFN83OrrlaWvOcwrteZlD');
    const sign = md5(signStr).toUpperCase();

    setDebugInfo({
      orderId,
      amount,
      paymentType: selectedPayment,
      params: paymentParams,
      signString: signStr,
      sign: sign,
      fullUrl: `https://sta.qijiuwang.top/submit.php?${new URLSearchParams({
        ...paymentParams,
        sign
      }).toString()}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">
          <i className="fa-solid fa-bug mr-3"></i>
          支付签名调试工具
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">调试配置</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                支付方式
              </label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value as 'alipay' | 'wechat' | 'qq')}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="alipay">支付宝</option>
                <option value="wechat">微信支付</option>
                <option value="qq">QQ钱包</option>
              </select>
            </div>
            
            <div className="flex items-end space-x-4">
              <button
                onClick={handleDebug}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                自动调试
              </button>
              <button
                onClick={handleManualDebug}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                手动调试
              </button>
            </div>
          </div>
        </div>

        {debugInfo && (
          <div className="space-y-6">
            {/* 基础信息 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">基础信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-400">订单号:</span>
                  <div className="text-white font-mono text-sm break-all">{debugInfo.orderId}</div>
                </div>
                <div>
                  <span className="text-gray-400">金额:</span>
                  <div className="text-white font-mono text-sm">{debugInfo.amount} 元</div>
                </div>
                <div>
                  <span className="text-gray-400">支付方式:</span>
                  <div className="text-white font-mono text-sm">{debugInfo.paymentType}</div>
                </div>
              </div>
            </div>

            {/* 支付参数 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">支付参数</h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 pb-2">参数名</th>
                      <th className="text-left text-gray-400 pb-2">参数值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(debugInfo.params).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-800">
                        <td className="py-2 text-gray-300 font-mono">{key}</td>
                        <td className="py-2 text-white font-mono break-all">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 签名生成过程 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">签名生成过程</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-2">1. 签名字符串 (按字母顺序排序):</span>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400 font-mono text-sm break-all whitespace-pre-wrap">
                      {debugInfo.signString}
                    </code>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 block mb-2">2. MD5签名 (大写):</span>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-yellow-400 font-mono text-sm break-all">
                      {debugInfo.sign}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* 完整URL */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">完整支付URL</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-blue-400 font-mono text-sm break-all whitespace-pre-wrap">
                  {debugInfo.fullUrl}
                </code>
              </div>
              <div className="mt-4">
                <a
                  href={debugInfo.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <i className="fa-solid fa-external-link-alt mr-2"></i>
                  测试支付链接
                </a>
              </div>
            </div>

            {/* 调试说明 */}
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                <i className="fa-solid fa-info-circle mr-2"></i>
                调试说明
              </h3>
              <div className="text-blue-200 space-y-2 text-sm">
                <p>• 如果验签失败，请检查以下内容：</p>
                <p>• 1. 参数排序是否正确 (按字母顺序)</p>
                <p>• 2. 签名字符串格式是否正确 (key1=value1&key2=value2&key=密钥)</p>
                <p>• 3. MD5算法是否正确</p>
                <p>• 4. 密钥是否正确</p>
                <p>• 5. 回调地址是否匹配</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDebug;
