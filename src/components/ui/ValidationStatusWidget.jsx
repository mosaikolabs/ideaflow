import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ValidationStatusWidget = ({ 
  confidenceScore = 0,
  currentPhase = 'idea',
  recommendations = [],
  isCondensed = false,
  className = ''
}) => {
  const getConfidenceLevel = (score) => {
    if (score >= 80) return { level: 'high', color: 'success', label: 'Alta Confianza' };
    if (score >= 60) return { level: 'medium', color: 'warning', label: 'Confianza Media' };
    if (score >= 40) return { level: 'low', color: 'warning', label: 'Confianza Baja' };
    return { level: 'critical', color: 'error', label: 'Requiere Atención' };
  };

  const getPhaseStatus = (phase) => {
    const phases = {
      idea: { name: 'Definición de Idea', icon: 'Lightbulb', progress: 25 },
      persona: { name: 'Buyer Persona', icon: 'Users', progress: 50 },
      validation: { name: 'Validación', icon: 'CheckCircle', progress: 75 },
      complete: { name: 'Completado', icon: 'Trophy', progress: 100 }
    };
    return phases[phase] || phases.idea;
  };

  const confidence = getConfidenceLevel(confidenceScore);
  const phaseInfo = getPhaseStatus(currentPhase);

  const defaultRecommendations = [
    'Completa la definición de tu buyer persona',
    'Recolecta más evidencia de mercado',
    'Valida tu propuesta de valor'
  ];

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations;

  if (isCondensed) {
    return (
      <div className={`flex items-center space-x-3 px-3 py-2 bg-card border border-border rounded-md ${className}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${confidence.color} text-${confidence.color}-foreground`}>
          <span className="text-xs font-mono font-bold">{confidenceScore}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">
            {confidence.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {phaseInfo.name}
          </div>
        </div>
        <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Estado de Validación
            </h3>
            <p className="text-sm text-muted-foreground">
              Progreso actual de tu idea
            </p>
          </div>
          <Icon name="BarChart3" size={24} className="text-muted-foreground" />
        </div>
      </div>

      {/* Confidence Score */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold font-mono text-foreground">
              {confidenceScore}%
            </div>
            <div className={`text-sm font-medium text-${confidence.color}`}>
              {confidence.label}
            </div>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-${confidence.color}/10 border-4 border-${confidence.color}/20`}>
            <div className={`w-8 h-8 rounded-full bg-${confidence.color} flex items-center justify-center`}>
              <Icon 
                name={confidenceScore >= 60 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                color="white" 
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progreso de Validación</span>
            <span>{confidenceScore}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full bg-${confidence.color} transition-all duration-500 ease-out`}
              style={{ width: `${confidenceScore}%` }}
            ></div>
          </div>
        </div>

        {/* Current Phase */}
        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name={phaseInfo.icon} size={16} color="white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">
              Fase Actual: {phaseInfo.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {phaseInfo.progress}% del proceso total
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-6 py-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Próximos Pasos Recomendados
        </h4>
        <div className="space-y-2">
          {displayRecommendations.slice(0, 3).map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-muted-foreground">
                {recommendation}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-border bg-muted/25">
        <div className="flex items-center space-x-3">
          <Button variant="default" className="flex-1">
            <Icon name="Play" size={16} className="mr-2" />
            Continuar Validación
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="RefreshCw" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationStatusWidget;