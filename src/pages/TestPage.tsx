import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">测试页面</h1>
        <p className="text-gray-300">如果您能看到这个页面，说明应用正常运行</p>
        <div className="mt-4">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 