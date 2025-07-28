import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationPhaseCard = ({ 
  phase,
  title,
  description,
  progress = 0,
  metrics = {},
  actionText = 'Comenzar',
  actionPath = '#',
  isCompleted = false,
  isLocked = false,
  className = ''
}) => {
  const getPhaseIcon = (phase) => {
    const icons = {
      evidence: 'FileText',
      survey: 'BarChart3',
      mvp: 'Rocket',
      persona: 'Users',
      idea: 'Lightbulb'
    };
    return icons[phase] || 'Circle';
  };

  const getPhaseColor = (phase, isCompleted, isLocked) => {
    if (isLocked) return 'bg-gray-100 border-gray-200';
    if (isCompleted) return 'bg-green-50 border-green-200';
    
    const colors = {
      evidence: 'bg-blue-50 border-blue-200',
      survey: 'bg-purple-50 border-purple-200',
      mvp: 'bg-orange-50 border-orange-200',
      persona: 'bg-indigo-50 border-indigo-200',
      idea: 'bg-yellow-50 border-yellow-200'
    };
    return colors[phase] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (phase, isCompleted, isLocked) => {
    if (isLocked) return 'text-gray-400';
    if (isCompleted) return 'text-green-600';
    
    const colors = {
      evidence: 'text-blue-600',
      survey: 'text-purple-600',
      mvp: 'text-orange-600',
      persona: 'text-indigo-600',
      idea: 'text-yellow-600'
    };
    return colors[phase] || 'text-gray-600';
  };

  const cardColor = getPhaseColor(phase, isCompleted, isLocked);
  const iconColor = getIconColor(phase, isCompleted, isLocked);

  return (
    <div className={`${cardColor} border rounded-lg p-6 transition-all duration-200 hover:shadow-md ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isLocked ? 'bg-gray-200' : isCompleted ? 'bg-green-100' : 'bg-white'
          }`}>
            {isLocked ? (
              <Icon name="Lock" size={20} className="text-gray-400" />
            ) : isCompleted ? (
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            ) : (
              <Icon name={getPhaseIcon(phase)} size={20} className={iconColor} />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>
              {title}
            </h3>
            <p className={`text-sm mt-1 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Completado
          </div>
        )}
      </div>

      {/* Progress */}
      {!isLocked && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progreso</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : iconColor.replace('text-', 'bg-')
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Metrics */}
      {Object.keys(metrics).length > 0 && !isLocked && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <div className="pt-4 border-t border-gray-200">
        {isLocked ? (
          <Button variant="outline" disabled className="w-full">
            <Icon name="Lock" size={16} className="mr-2" />
            Bloqueado
          </Button>
        ) : (
          <Link to={actionPath} className="block">
            <Button 
              variant={isCompleted ? "outline" : "default"} 
              className="w-full"
            >
              <Icon 
                name={isCompleted ? "Eye" : "ArrowRight"} 
                size={16} 
                className="mr-2" 
              />
              {isCompleted ? 'Ver Detalles' : actionText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ValidationPhaseCard;