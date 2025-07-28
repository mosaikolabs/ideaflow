import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityList = ({ activities = [], className = '' }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'idea_updated',
      title: 'Idea actualizada',
      description: 'Has modificado la descripción de tu problema',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Edit',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'persona_created',
      title: 'Buyer persona creado',
      description: 'Has definido tu primer buyer persona',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Users',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'evidence_collected',
      title: 'Evidencia recolectada',
      description: 'Has añadido 3 nuevas entrevistas',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      icon: 'FileText',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'validation_improved',
      title: 'Puntuación mejorada',
      description: 'Tu confianza de validación subió a 45%',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      icon: 'TrendingUp',
      color: 'text-orange-600'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `hace ${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `hace ${days}d`;
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Actividad Reciente
          </h3>
          <Icon name="Clock" size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-200">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                <Icon name={activity.icon} size={16} className={activity.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <span>Ver toda la actividad</span>
          <Icon name="ArrowRight" size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default RecentActivityList;