import React, { createContext, useContext, useState, useEffect } from 'react';

interface PaymentContextType {
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  paymentAmount: number;
  handlePayment: () => Promise<boolean>;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  loading: boolean;
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
  const paymentAmount = 29.9; // 设置支付金额

  // 从localStorage检查付费状态
  useEffect(() => {
    const paidStatus = localStorage.getItem('metaphysics_paid');
    if (paidStatus === 'true') {
      setIsPaid(true);
    }
  }, []);

  const handlePayment = async (): Promise<boolean> => {
    setLoading(true);
    
    try {
      // 模拟支付过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 支付成功
      setIsPaid(true);
      localStorage.setItem('metaphysics_paid', 'true');
      setShowPaymentModal(false);
      
      return true;
    } catch (error) {
      console.error('支付失败:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isPaid,
    setIsPaid,
    paymentAmount,
    handlePayment,
    showPaymentModal,
    setShowPaymentModal,
    loading
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}; 