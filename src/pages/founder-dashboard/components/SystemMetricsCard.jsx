import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemMetricsCard = ({ metrics, onRefresh }) => {
  if (!metrics) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando métricas del sistema...</p>
        </div>
      </div>
    );
  }

  const metricCards = [
    {
      title: 'Total Usuarios',
      value: metrics.total_users || 0,
      icon: 'Users',
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Ideas Creadas',
      value: metrics.total_ideas || 0,
      icon: 'Lightbulb',
      color: 'yellow',
      change: '+8%'
    },
    {
      title: 'Ideas Validadas',
      value: metrics.validated_ideas || 0,
      icon: 'CheckCircle',
      color: 'green',
      change: '+15%'
    },
    {
      title: 'Usuarios Activos (30d)',
      value: metrics.active_users_last_30_days || 0,
      icon: 'Activity',
      color: 'purple',
      change: '+23%'
    }
  ];

  const averageScore = metrics.average_confidence_score || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Métricas del Sistema
        </h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Actualizado: {new Date(metrics.updated_at).toLocaleString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
          >
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metricCards.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                metric.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                metric.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                metric.color === 'green'? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
              }`}>
                <Icon name={metric.icon} size={20} />
              </div>
              <span className="text-xs font-medium text-green-600">
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Average Confidence Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">
            Puntuación de Confianza Promedio
          </h3>
          <span className="text-xs text-gray-500">
            Global
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {averageScore.toFixed(1)}%
              </span>
              <span className={`text-sm font-medium ${
                averageScore >= 70 ? 'text-green-600' :
                averageScore >= 40 ? 'text-yellow-600': 'text-red-600'
              }`}>
                {averageScore >= 70 ? 'Excelente' :
                 averageScore >= 40 ? 'Bueno' : 'Necesita Mejora'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  averageScore >= 70 ? 'bg-green-500' :
                  averageScore >= 40 ? 'bg-yellow-500': 'bg-red-500'
                }`}
                style={{ width: `${averageScore}%` }}
              ></div>
            </div>
          </div>
          <div className={`p-3 rounded-full ${
            averageScore >= 70 ? 'bg-green-100 text-green-600' :
            averageScore >= 40 ? 'bg-yellow-100 text-yellow-600': 'bg-red-100 text-red-600'
          }`}>
            <Icon name={
              averageScore >= 70 ? 'TrendingUp' :
              averageScore >= 40 ? 'Minus': 'TrendingDown'
            } size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMetricsCard;