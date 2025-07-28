import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationStatusCard = ({ 
  confidenceScore = 45,
  currentPhase = 'idea',
  nextAction = 'Completa tu buyer persona',
  className = ''
}) => {
  const getConfidenceLevel = (score) => {
    if (score >= 70) return { 
      level: 'high', 
      color: 'bg-green-500', 
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      label: 'Alta Confianza',
      icon: 'TrendingUp'
    };
    if (score >= 40) return { 
      level: 'medium', 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      label: 'Confianza Media',
      icon: 'AlertTriangle'
    };
    return { 
      level: 'low', 
      color: 'bg-red-500', 
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      label: 'Requiere Atención',
      icon: 'TrendingDown'
    };
  };

  const getPhaseInfo = (phase) => {
    const phases = {
      idea: { name: 'Definición de Idea', icon: 'Lightbulb', progress: 25 },
      persona: { name: 'Buyer Persona', icon: 'Users', progress: 50 },
      validation: { name: 'Validación', icon: 'CheckCircle', progress: 75 },
      complete: { name: 'Completado', icon: 'Trophy', progress: 100 }
    };
    return phases[phase] || phases.idea;
  };

  const confidence = getConfidenceLevel(confidenceScore);
  const phaseInfo = getPhaseInfo(currentPhase);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Estado de Validación
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Progreso actual de tu idea
          </p>
        </div>
        <div className={`p-3 rounded-full ${confidence.bgColor}`}>
          <Icon name={confidence.icon} size={24} className={confidence.textColor} />
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-bold text-gray-900 font-mono">
              {confidenceScore}%
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${confidence.bgColor} ${confidence.textColor}`}>
              {confidence.label}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${confidence.color}`}>
            <Icon name="BarChart3" size={20} color="white" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${confidence.color}`}
            style={{ width: `${confidenceScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Current Phase */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Icon name={phaseInfo.icon} size={20} color="white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-blue-900">
              Fase Actual: {phaseInfo.name}
            </div>
            <div className="text-xs text-blue-700 mt-1">
              {phaseInfo.progress}% del proceso total completado
            </div>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              Próximo Paso Recomendado
            </div>
            <div className="text-sm text-gray-600">
              {nextAction}
            </div>
          </div>
          <Button variant="default" className="ml-4">
            <Icon name="ArrowRight" size={16} className="mr-2" />
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationStatusCard;