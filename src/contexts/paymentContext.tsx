import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PAYMENT_CONFIG, 
  generateOrderId, 
  buildPaymentUrl,
  getQueryStatus,
  updateQueryStatus,
  canQuery,
  useQuery,
  resetQueryStatus,
  QueryStatus
} from '@/lib/paymentConfig';

interface PaymentContextType {
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  paymentAmount: number;
  handlePayment: (paymentType: 'alipay' | 'wechat' | 'qq') => Promise<boolean>;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  loading: boolean;
  paymentUrl: string | null;
  setPaymentUrl: (url: string | null) => void;
  queryStatus: QueryStatus;
  canQuery: () => boolean;
  useQuery: () => boolean;
  remainingQueries: number;
  setPaidStatus: (paid: boolean) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [queryStatus, setQueryStatus] = useState<QueryStatus>(getQueryStatus());
  const paymentAmount = PAYMENT_CONFIG.PRICE; // 设置支付金额

  // 从localStorage检查查询状态
  useEffect(() => {
    const status = getQueryStatus();
    setQueryStatus(status);
    setIsPaid(status.isPaid);
  }, []);

  const handlePayment = async (paymentType: 'alipay' | 'wechat' | 'qq'): Promise<boolean> => {
    setLoading(true);
    
    try {
      const orderId = generateOrderId();
      const amount = paymentAmount;
      
      // 构建支付URL
      const paymentUrl = buildPaymentUrl(paymentType, orderId, amount);
      
      // 保存订单信息到localStorage
      localStorage.setItem('current_order', JSON.stringify({
        orderId,
        amount,
        paymentType,
        timestamp: Date.now()
      }));

      // 打开支付页面
      window.open(paymentUrl, '_blank');
      
      // 开始轮询检查支付状态
      checkPaymentStatus(orderId);
      
      return true;
    } catch (error) {
      console.error('支付失败:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 检查支付状态
  const checkPaymentStatus = (orderId: string) => {
    const checkInterval = setInterval(async () => {
      try {
        // 这里应该调用码支付的查询接口
        // 由于没有真实的查询接口，我们模拟检查
        const orderInfo = localStorage.getItem('current_order');
        if (orderInfo) {
          const order = JSON.parse(orderInfo);
          // 模拟支付成功（实际项目中应该调用API查询）
          if (Date.now() - order.timestamp > 30000) { // 30秒后模拟支付成功
            clearInterval(checkInterval);
            
            // 重置查询状态
            resetQueryStatus(orderId);
            const newStatus = getQueryStatus();
            setQueryStatus(newStatus);
            setIsPaid(true);
            localStorage.setItem('metaphysics_paid', 'true');
            
            localStorage.removeItem('current_order');
            setShowPaymentModal(false);
            alert('支付成功！您现在可以查看完整报告。');
          }
        }
      } catch (error) {
        console.error('检查支付状态失败:', error);
      }
    }, 5000); // 每5秒检查一次

    // 5分钟后停止检查
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 300000);
  };

  const value = {
    isPaid,
    setIsPaid,
    paymentAmount,
    handlePayment,
    showPaymentModal,
    setShowPaymentModal,
    loading,
    paymentUrl,
    setPaymentUrl,
    queryStatus,
    canQuery,
    useQuery,
    remainingQueries: queryStatus.remainingQueries,
    setPaidStatus: (paid: boolean) => {
      setIsPaid(paid);
      if (paid) {
        localStorage.setItem('metaphysics_paid', 'true');
      } else {
        localStorage.removeItem('metaphysics_paid');
      }
    }
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}; 