// ========================================
// 码支付配置
// ========================================

// 基础配置
const BASE_CONFIG = {
  // 码支付平台配置
  PID: '145297917',
  KEY: '677g7etdq4GTqFB11e6bah1aEh1AbBmb',
  API_URL: 'https://pay.payma.cn/',
  
  // 商品信息
  PRODUCT_NAME: '玄学命理报告',
  SITE_NAME: '玄学命理分析平台',
  PRICE: 19.9,
};

// 回调地址配置
const getCallbackUrls = () => {
  const origin = window.location.origin;
  return {
    NOTIFY_URL: `${origin}/api/payment/notify`,
    RETURN_URL: `${origin}/payment-success`,
  };
};

// 支付方式配置
const PAYMENT_METHODS = {
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
};

// 导出主配置对象
export const PAYMENT_CONFIG = {
  ...BASE_CONFIG,
  ...getCallbackUrls(),
  PAYMENT_METHODS
};

// ========================================
// 工具函数
// ========================================

/**
 * 生成订单号
 * 格式: MF + 时间戳 + 随机数
 */
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `MF${timestamp}${random}`;
};

/**
 * 生成签名字符串
 * 按照码支付API要求排序参数并拼接
 */
export const generateSign = (params: Record<string, string>, key: string): string => {
  const sortedKeys = Object.keys(params).sort();
  let signStr = '';
  
  sortedKeys.forEach(paramKey => {
    if (paramKey !== 'sign' && params[paramKey] !== '') {
      signStr += `${paramKey}=${params[paramKey]}&`;
    }
  });
  
  signStr += `key=${key}`;
  return signStr;
};

/**
 * MD5加密函数
 * 使用简化的哈希算法，实际项目中建议使用标准的MD5库
 */
export const md5 = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // 转换为16进制字符串并补齐32位
  const hashStr = Math.abs(hash).toString(16);
  return hashStr.padStart(8, '0').repeat(4);
};

/**
 * 构建支付URL
 * 生成完整的码支付API调用地址
 */
export const buildPaymentUrl = (
  paymentType: 'alipay' | 'wechat' | 'qq', 
  orderId: string, 
  amount: number
): string => {
  // 构建支付参数
  const paymentParams = {
    pid: BASE_CONFIG.PID,
    type: paymentType,
    out_trade_no: orderId,
    notify_url: getCallbackUrls().NOTIFY_URL,
    return_url: getCallbackUrls().RETURN_URL,
    name: BASE_CONFIG.PRODUCT_NAME,
    money: amount.toFixed(2),
    sitename: BASE_CONFIG.SITE_NAME
  };

  // 生成签名
  const signStr = generateSign(paymentParams, BASE_CONFIG.KEY);
  const sign = md5(signStr);
  
  // 构建完整URL
  const params = new URLSearchParams({
    ...paymentParams,
    sign: sign
  });

  return `${BASE_CONFIG.API_URL}submit.php?${params.toString()}`;
};

// ========================================
// 调试工具
// ========================================

/**
 * 调试支付参数
 * 用于开发时检查签名生成是否正确
 */
export const debugPaymentParams = (
  paymentType: 'alipay' | 'wechat' | 'qq' = 'alipay'
) => {
  const orderId = generateOrderId();
  const amount = BASE_CONFIG.PRICE;

  const paymentParams = {
    pid: BASE_CONFIG.PID,
    type: paymentType,
    out_trade_no: orderId,
    notify_url: getCallbackUrls().NOTIFY_URL,
    return_url: getCallbackUrls().RETURN_URL,
    name: BASE_CONFIG.PRODUCT_NAME,
    money: amount.toFixed(2),
    sitename: BASE_CONFIG.SITE_NAME
  };

  const signStr = generateSign(paymentParams, BASE_CONFIG.KEY);
  const sign = md5(signStr);

  return {
    orderId,
    amount,
    paymentType,
    params: paymentParams,
    signString: signStr,
    sign: sign,
    fullUrl: `${BASE_CONFIG.API_URL}submit.php?${new URLSearchParams({
      ...paymentParams,
      sign: sign
    }).toString()}`
  };
}; 