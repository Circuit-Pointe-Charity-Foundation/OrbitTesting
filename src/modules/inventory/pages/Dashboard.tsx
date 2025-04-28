
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-violet-800 mb-4">Inventory Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-lg shadow-sm">
            <div className="h-4 w-1/2 bg-violet-200 rounded mb-3"></div>
            <div className="h-10 bg-violet-100 rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="h-6 w-64 bg-violet-200 rounded mb-4"></div>
        <div className="h-64 bg-violet-100 rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-6 w-48 bg-violet-200 rounded mb-4"></div>
          <div className="h-40 bg-violet-100 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-6 w-48 bg-violet-200 rounded mb-4"></div>
          <div className="h-40 bg-violet-100 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
