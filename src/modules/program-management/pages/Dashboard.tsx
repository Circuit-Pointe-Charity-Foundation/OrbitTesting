
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-violet-800 mb-4">Program Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <div className="h-4 w-2/3 bg-violet-200 rounded mb-2"></div>
            <div className="h-8 w-1/2 bg-violet-300 rounded mb-4"></div>
            <div className="h-20 bg-violet-100 rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow">
          <div className="h-6 w-48 bg-violet-200 rounded mb-4"></div>
          <div className="h-64 bg-violet-100 rounded"></div>
        </div>
        
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow">
          <div className="h-6 w-32 bg-violet-200 rounded mb-4"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-300"></div>
                <div className="flex-1">
                  <div className="h-3 w-2/3 bg-violet-200 rounded mb-2"></div>
                  <div className="h-2 bg-violet-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
