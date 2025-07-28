import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = ({ type = 'bar', className = '' }) => {
  const progressData = [
    { phase: 'Idea', completed: 85, total: 100, color: '#3B82F6' },
    { phase: 'Persona', completed: 60, total: 100, color: '#8B5CF6' },
    { phase: 'Evidencia', completed: 30, total: 100, color: '#10B981' },
    { phase: 'MVP', completed: 10, total: 100, color: '#F59E0B' }
  ];

  const validationData = [
    { name: 'Completado', value: 45, color: '#10B981' },
    { name: 'Pendiente', value: 55, color: '#E5E7EB' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-blue-600">
            {`Completado: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (type === 'pie') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Progreso General
          </h3>
          <Icon name="PieChart" size={20} className="text-gray-400" />
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={validationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {validationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progreso']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4">
          {validationData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Progreso por Fase
        </h3>
        <Icon name="BarChart3" size={20} className="text-gray-400" />
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="phase" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              radius={[4, 4, 0, 0]}
              fill="#3B82F6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
        {progressData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-bold text-gray-900">{item.completed}%</div>
            <div className="text-xs text-gray-600">{item.phase}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;