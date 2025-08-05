import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePayment } from '@/contexts/paymentContext';

interface ReportFormProps {
  generateReport: (data: { name: string; birthDate: string; gender: string }) => any;
}

export default function ReportForm({ generateReport }: ReportFormProps) {
  const navigate = useNavigate();
  const { canQuery, useQuery, remainingQueries, setShowPaymentModal } = usePayment();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: 'male'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查查询权限
    if (!canQuery()) {
      toast.error('您需要先付费才能查询玄学命理报告');
      setShowPaymentModal(true);
      return;
    }
    
    // 表单验证
    if (!formData.name.trim()) {
      toast.error('请输入您的姓名');
      return;
    }
    
    if (!formData.birthDate) {
      toast.error('请选择您的出生日期和时间');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 使用一次查询
      if (useQuery()) {
        // 生成报告并导航到报告页面
        generateReport(formData);
        navigate('/metaphysics-report');
        toast.success(`查询成功！您还有 ${remainingQueries - 1} 次查询机会`);
      } else {
        toast.error('查询次数已用完，请重新付费');
        setShowPaymentModal(true);
      }
    } catch (error) {
      toast.error('生成报告时出错，请重试');
      console.error('Report generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>返回首页
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <i className="fa-solid fa-pen-to-square text-yellow-400 mr-2"></i>个人信息输入
            </h1>
            
            {/* 查询状态显示 */}
            <div className="mb-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fa-solid fa-search text-blue-400 mr-2"></i>
                  <span className="text-gray-300">查询状态</span>
                </div>
                <div className="text-right">
                  {canQuery() ? (
                    <div className="text-green-400 font-semibold">
                      剩余查询次数: {remainingQueries}
                    </div>
                  ) : (
                    <div className="text-red-400 font-semibold">
                      需要付费查询
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                每次付费可查询 {remainingQueries > 0 ? remainingQueries : 1} 次玄学命理报告
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                   姓名
                 </label>
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
                   placeholder="请输入您的姓名"
                 />
               </div>
              
               <div>
                 <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-1">
                   出生日期与时间
                 </label>
                 <input
                   type="datetime-local"
                   id="birthDate"
                   name="birthDate"
                   value={formData.birthDate}
                   onChange={handleChange}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
                 />
                 <p className="text-xs text-gray-500 mt-1">请精确到小时，以便进行准确的命理分析</p>
                </div>
               
               <div>
                 <label htmlFor="birthHour" className="block text-sm font-medium text-gray-300 mb-1">
                   出生时辰
                 </label>
                 <select
                   id="birthHour"
                   name="birthHour"
                   value={formData.birthHour}
                   onChange={handleChange}
                   className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
                 >
                   {[...Array(24).keys()].map(hour => (
                     <option key={hour} value={hour.toString()}>
                       {hour}:00-{hour+1}:00 {hour >= 23 ? '子时' : hour >= 21 ? '亥时' : hour >= 19 ? '戌时' : hour >= 17 ? '酉时' : 
                       hour >= 15 ? '申时' : hour >= 13 ? '未时' : hour >= 11 ? '午时' : hour >= 9 ? '巳时' : 
                       hour >= 7 ? '辰时' : hour >= 5 ? '卯时' : hour >= 3 ? '寅时' : hour >= 1 ? '丑时' : '子时'}
                     </option>
                   ))}
                 </select>
               </div>
               
               <div>
                 <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
                   性别
                 </label>
                 <select
                   id="gender"
                   name="gender"
                   value={formData.gender}
                   onChange={handleChange}
                   className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
                 >
                   <option value="male">男</option>
                   <option value="female">女</option>
                 </select>
               </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>生成中...</span>
                  </>
                ) : (
                  <>
                    <span>生成命理报告</span>
                    <i className="fa-solid fa-crystal-ball"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}