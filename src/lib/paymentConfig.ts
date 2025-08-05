// 码支付配置
export const PAYMENT_CONFIG = {
  // 码支付平台配置
  PID: '145297917',
  KEY: '677g7etdq4GTqFB11e6bah1aEh1AbBmb',
  API_URL: 'https://pay.payma.cn/',
  
  // 回调地址配置
  NOTIFY_URL: `${window.location.origin}/api/payment/notify`,
  RETURN_URL: `${window.location.origin}/payment-success`,
  
  // 商品信息
  PRODUCT_NAME: '玄学命理报告',
  SITE_NAME: '玄学命理分析平台',
  PRICE: 29.9,
  
  // 支付方式配置
  PAYMENT_METHODS: {
    alipay: {
      name: '支付宝',
      icon: 'fa-brands fa-alipay',
      color: 'text-blue-500',
      description: '使用支付宝扫码支付'
    },
    wechat: {
      name: '微信支付',
      icon: 'fa-brands fa-weixin',
      color: 'text-green-500',
      description: '使用微信扫码支付'
    },
    qq: {
      name: 'QQ钱包',
      icon: 'fa-brands fa-qq',
      color: 'text-blue-400',
      description: '使用QQ钱包支付'
    }
  }
};

// 生成订单号
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `MF${timestamp}${random}`;
};

// 生成签名
export const generateSign = (params: Record<string, string>, key: string) => {
  const sortedKeys = Object.keys(params).sort();
  let signStr = '';
  
  sortedKeys.forEach(paramKey => {
    if (paramKey !== 'sign' && params[paramKey] !== '') {
      signStr += `${paramKey}=${params[paramKey]}&`;
    }
  });
  
  signStr += `key=${key}`;
  return signStr.toUpperCase();
};

// MD5加密函数（简化版，实际项目中建议使用crypto-js）
export const md5 = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

// 构建支付URL
export const buildPaymentUrl = (paymentType: 'alipay' | 'wechat' | 'qq', orderId: string, amount: number) => {
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
  
  // 构建支付URL
  const params = new URLSearchParams({
    ...paymentParams,
    sign: sign
  });

  return `${PAYMENT_CONFIG.API_URL}submit.php?${params.toString()}`;
}; 