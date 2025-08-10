import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ReportForm from "@/pages/ReportForm";
import { generateMetaphysicsReport } from "@/lib/metaphysics";
import MetaphysicsReport from "@/pages/MetaphysicsReport";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentTest from "@/pages/PaymentTest";
import PaymentDebug from "@/pages/PaymentDebug";
import TestPage from "@/pages/TestPage";
import TestOrderId from "@/pages/TestOrderId";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { PaymentProvider } from '@/contexts/paymentContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const logout = () => {
    setIsAuthenticated(false);
  };

    const generateReport = (userData: any) => {
      // 生成完整的玄学报告
      const report = generateMetaphysicsReport(
        userData.name,
        userData.birthDate,
        userData.birthHour,
        userData.gender
      );
      setReportData(report);
      return report;
    };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <PaymentProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-form" element={<ReportForm generateReport={generateReport} />} />
          <Route path="/metaphysics-report" element={<MetaphysicsReport reportData={reportData} />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-test" element={<PaymentTest />} />
          <Route path="/payment-debug" element={<PaymentDebug />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test-order-id" element={<TestOrderId />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </PaymentProvider>
    </AuthContext.Provider>
  );
}
