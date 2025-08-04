import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { calculateFiveElements, generateFortune, generateProfessionalAdvice, generateSpecialInsights } from '@/lib/metaphysics';


interface MetaphysicsReportProps {
  reportData: any;
}

export default function MetaphysicsReport({ reportData }: MetaphysicsReportProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    // 如果没有报告数据，重定向到表单页面
    if (!reportData) {
      toast.info('请先填写信息生成报告');
      navigate('/report-form');
    }
  }, [reportData, navigate]);
  
  if (!reportData) return null;
  
    const { basicInfo, fiveElements, personality, fortune, metaphysicsConcept } = reportData;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/report-form')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>返回修改信息
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* 报告标题和基本信息 */}
            <div className="text-center mb-8 pb-6 border-b border-gray-700">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-600">
                玄学命理报告
              </h1>
              
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-300 mb-4">
                 <div>
                   <p className="text-xs sm:text-sm opacity-70">姓名</p>
                   <p className="text-base sm:text-xl font-medium">{basicInfo.name}</p>
                 </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-70">出生日期</p>
                    <p className="text-base sm:text-xl font-medium">
                      {new Date(basicInfo.birthDate).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-70">出生时辰</p>
                    <p className="text-base sm:text-xl font-medium">
                      {basicInfo.birthHour}:00-{basicInfo.birthHour % 24 + 1}:00 
                      {basicInfo.birthHour >= 23 ? '子时' : basicInfo.birthHour >= 21 ? '亥时' : basicInfo.birthHour >= 19 ? '戌时' : 
                      basicInfo.birthHour >= 17 ? '酉时' : basicInfo.birthHour >= 15 ? '申时' : basicInfo.birthHour >= 13 ? '未时' : 
                      basicInfo.birthHour >= 11 ? '午时' : basicInfo.birthHour >= 9 ? '巳时' : basicInfo.birthHour >= 7 ? '辰时' : 
                      basicInfo.birthHour >= 5 ? '卯时' : basicInfo.birthHour >= 3 ? '寅时' : basicInfo.birthHour >= 1 ? '丑时' : '子时'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-70">性别</p>
                    <p className="text-base sm:text-xl font-medium">{basicInfo.gender === 'male' ? '男' : '女'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs sm:text-sm opacity-70">农历信息</p>
                    <p className="text-base sm:text-xl font-medium">{basicInfo.lunarInfo}</p>
                  </div>
               </div>
              
              <div className="inline-block bg-yellow-500/20 text-yellow-300 text-sm py-1 px-4 rounded-full border border-yellow-500/30">
                <i className="fa-solid fa-star mr-1"></i>报告生成时间：{new Date().toLocaleString()}
              </div>
            </div>
            
            {/* 基本命格分析 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-circle-info text-yellow-400 mr-3"></i>基本命格分析
              </h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-300">五行旺衰</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                  {fiveElements.map((element) => (
                    <div key={element.name} className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold mb-1">{element.name}</div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            element.name === '金' ? 'bg-gray-300' : 
                            element.name === '木' ? 'bg-green-500' :
                            element.name === '水' ? 'bg-blue-500' :
                            element.name === '火' ? 'bg-red-500' : 'bg-yellow-600'
                          }`} 
                          style={{ width: `${element.value}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-400 font-medium">{element.value}%</div>
                    </div>
                  ))}
                </div>
                <div className="text-gray-300">
                    <p className="mb-2">
                      <span className="font-medium text-white">日主旺衰：</span>您的命局中，{personality.dominantElement}元素最为旺盛，{personality.secondaryElement}元素次之，形成{personality.dominantElement}{personality.secondaryElement}相生(或相克)之象，共同影响您的性格与命运。
                    </p>
                    <p className="mb-2">
                      <span className="font-medium text-white">五行格局：</span>{(() => {
                        const combinations = {
                          '金木': '金木相战，性格兼具刚毅与柔韧，有决断力也有包容心',
                          '金火': '金火既济，行事果断又不失热情，是天生的领导者',
                          '金土': '金土相生，为人诚信可靠，做事踏实有计划',
                          '金水': '金水相生，头脑聪明，学习能力强，善于分析思考',
                          '金金': '金气过旺，性格刚毅果决，但需防固执己见',
                          '木金': '木金相克，有创造力也有原则性，能在传统中创新',
                          '木木': '木气过旺，性格仁慈善良，富有同情心，但需防优柔寡断',
                          '木火': '木火通明，热情积极，富有创造力与行动力',
                          '木土': '木土相制，兼具理想与现实，既有目标又能脚踏实地',
                          '木水': '水木相生，聪明灵活，适应能力强，富有洞察力',
                          '水金': '金水相涵，头脑清晰，逻辑性强，善于规划与分析',
                          '水木': '水木清华，思维活跃，富有创意，学习能力强',
                          '水水': '水气过旺，聪明绝顶，但需防水性无常，缺乏定性',
                          '水火': '水火既济，兼具智慧与热情，能在变化中把握机遇',
                          '水土': '水土相济，适应性强，能在逆境中成长，有韧性',
                          '火金': '火金相克，性格矛盾而统一，既有热情又有理智',
                          '火木': '火木相生，积极向上，充满活力，有进取精神',
                          '火火': '火气过旺，热情似火，但需防火性急躁，缺乏耐心',
                          '火土': '火土相生，兼具热情与稳重，有理想也能务实',
                          '火水': '火水未济，聪明与热情兼具，但需防思维跳跃，缺乏坚持',
                          '土金': '土金相生，为人忠厚老实，做事严谨认真，值得信赖',
                          '土木': '土木相克，兼具稳重与灵活，有耐心也有创造力',
                          '土火': '土火相生，稳重中带着热情，有计划也有行动力',
                          '土土': '土气过旺，性格沉稳可靠，但需防保守固执，缺乏变通',
                          '土水': '土水相制，性格兼具稳重与智慧，能包容也能决断'
                        };
                        return combinations[`${personality.dominantElement}${personality.secondaryElement}`] || `${personality.dominantElement}旺${personality.secondaryElement}辅，性格层次丰富，多面发展`;
                      })()}
                    </p>
                    <p>
                      <span className="font-medium text-white">五行调和建议：</span>{personality.dominantElement === '金' ? '可适当增加火元素平衡，如穿着红色衣物、向南发展，从事能源、文化行业。' : 
                       personality.dominantElement === '木' ? '可适当增加金元素平衡，如佩戴金属饰品、向西发展，从事金融、机械行业。' :
                       personality.dominantElement === '水' ? '可适当增加土元素平衡，如佩戴玉石饰品、向中央发展，从事地产、农业行业。' :
                       personality.dominantElement === '火' ? '可适当增加水元素平衡，如在家中摆放鱼缸、向北发展，从事物流、旅游行业。' :
                       '可适当增加木元素平衡，如养植绿色植物、向东发展，从事教育、文化行业。'}
                    </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">性格特质</h3>
                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-gray-300">
                   <p>{personality.description}</p>
                   <p className="mt-2">您的命局中{personality.dominantElement}元素最为旺盛，这使您在人群中具有独特的{personality.dominantElement === '金' ? '决断力' : personality.dominantElement === '木' ? '创造力' : personality.dominantElement === '水' ? '洞察力' : personality.dominantElement === '火' ? '感染力' : '稳重性'}。若能善用这一天赋，将在事业和人际关系中获得显著优势。</p>
                </div>
              </div>
            </div>
            
            {/* 运势展望 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-compass text-yellow-400 mr-3"></i>运势展望
              </h2>
              
              <div className="bg-gradient-to-r from-gray-700/40 to-gray-800/40 border border-gray-600 rounded-lg p-5 text-gray-300">
                <div className="flex items-start mb-4">
                  <div className="bg-yellow-500/20 p-2 rounded-full mr-4 mt-1">
                    <i className="fa-solid fa-sun text-yellow-400"></i>
                  </div>
                  <div>
                     <h3 className="text-lg font-semibold mb-2 text-white">近期运势</h3>
                     <p>{fortune.recent}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start mt-6">
                   <div className="bg-blue-500/20 p-2 rounded-full mr-4 mt-1">
                     <i className="fa-solid fa-moon text-blue-400"></i>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold mb-2 text-white">未来趋势</h3>
                     <p>{fortune.future}</p>
                   </div>
                </div>
              </div>
            </div>
            
             {/* 建议和启示 */}
             <div className="mb-10">
               <h2 className="text-2xl font-bold mb-4 flex items-center">
                 <i className="fa-solid fa-lightbulb text-yellow-400 mr-3"></i>建议和启示
               </h2>
               
               {/* 生成专业建议 */}
               {(() => {
                 const advice = generateProfessionalAdvice(
                   basicInfo.gender, 
                   personality.dominantElement, 
                   basicInfo.birthDate
                 );
                 return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1">
                       <div className="text-center mb-3">
                         <i className="fa-solid fa-briefcase text-xl text-yellow-400"></i>
                         <h3 className="text-lg font-semibold mt-1">职业方向</h3>
                       </div>
                        <p className="text-gray-300 text-sm">{advice.career}</p>
                     </div>
                     
                     <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1">
                       <div className="text-center mb-3">
                         <i className="fa-solid fa-users text-xl text-yellow-400"></i>
                         <h3 className="text-lg font-semibold mt-1">人际关系</h3>
                       </div>
                        <p className="text-gray-300 text-sm">{advice.relationship}</p>
                     </div>
                     
                     <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1">
                       <div className="text-center mb-3">
                         <i className="fa-solid fa-heartbeat text-xl text-yellow-400"></i>
                         <h3 className="text-lg font-semibold mt-1">健康养生</h3>
                       </div>
                        <p className="text-gray-300 text-sm">{advice.health}</p>
                     </div>
                   </div>
                 );
               })()}
               
               {/* 特别启示 */}
               <div className="mt-6 bg-gradient-to-r from-yellow-900/30 to-red-900/30 border border-yellow-800/50 rounded-lg p-4 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
                 <h3 className="text-lg font-semibold mb-2 text-yellow-300 flex items-center">
                   <i className="fa-solid fa-star mr-2"></i>特别启示
                 </h3>
                 <p className="text-yellow-200">
                   {generateSpecialInsights(
                     basicInfo.birthDate, 
                     basicInfo.birthHour, 
                     personality.dominantElement
                   )}
                 </p>
               </div>
            </div>
            
            {/* 免责声明 */}
            <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-sm text-gray-400 italic">
              <h3 className="text-lg font-semibold mb-2 text-gray-300">免责声明</h3>
              <p>本报告内容基于传统玄学理论和命理学原理生成，仅供参考娱乐，不构成任何专业建议。人生道路由个人选择和努力决定，请勿过度依赖命理分析而忽视现实生活中的判断和行动。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
