import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormValidationSummary = ({ 
  validationResults = {
    title: { isValid: false, score: 0, feedback: '' },
    problem: { isValid: false, score: 0, feedback: '' },
    solution: { isValid: false, score: 0, feedback: '' },
    market: { isValid: false, score: 0, feedback: '' }
  },
  overallScore = 0,
  onSectionFocus = () => {},
  isVisible = false
}) => {
  const sections = [
    { key: 'title', name: 'Título', icon: 'Lightbulb' },
    { key: 'problem', name: 'Problema', icon: 'AlertTriangle' },
    { key: 'solution', name: 'Solución', icon: 'Zap' },
    { key: 'market', name: 'Mercado', icon: 'Users' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getOverallFeedback = () => {
    if (overallScore >= 80) {
      return {
        title: '¡Excelente trabajo!',
        message: 'Tu idea está bien estructurada y lista para la validación.',
        icon: 'Trophy',
        color: 'text-success'
      };
    }
    if (overallScore >= 60) {
      return {
        title: 'Buen progreso',
        message: 'Tu idea tiene potencial. Mejora las secciones marcadas para fortalecerla.',
        icon: 'TrendingUp',
        color: 'text-warning'
      };
    }
    return {
      title: 'Necesita mejoras',
      message: 'Dedica más tiempo a desarrollar cada sección para una idea más sólida.',
      icon: 'AlertTriangle',
      color: 'text-error'
    };
  };

  const feedback = getOverallFeedback();
  const validSections = sections.filter(section => validationResults[section.key]?.isValid).length;

  if (!isVisible) return null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Resumen de Validación
            </h3>
            <p className="text-sm text-muted-foreground">
              Análisis de la calidad de tu idea
            </p>
          </div>
          <div className={`text-2xl font-bold font-mono ${getScoreColor(overallScore)}`}>
            {Math.round(overallScore)}%
          </div>
        </div>
      </div>

      {/* Overall Feedback */}
      <div className={`mx-6 mt-4 p-4 rounded-lg border ${getScoreBg(overallScore)}`}>
        <div className="flex items-center space-x-3 mb-2">
          <Icon name={feedback.icon} size={20} className={feedback.color} />
          <h4 className={`text-base font-semibold ${feedback.color}`}>
            {feedback.title}
          </h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {feedback.message}
        </p>
        <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
          <span>Secciones completas: {validSections}/4</span>
          <span>•</span>
          <span>Puntuación general: {Math.round(overallScore)}/100</span>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="px-6 py-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Desglose por Sección
        </h4>
        <div className="space-y-3">
          {sections.map((section) => {
            const result = validationResults[section.key];
            const score = result?.score || 0;
            const isValid = result?.isValid || false;
            
            return (
              <div 
                key={section.key}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-micro cursor-pointer"
                onClick={() => onSectionFocus(section.key)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isValid ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isValid ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      <Icon name={section.icon} size={14} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {section.name}
                    </div>
                    {result?.feedback && (
                      <div className="text-xs text-muted-foreground max-w-xs truncate">
                        {result.feedback}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-mono font-semibold ${getScoreColor(score)}`}>
                    {Math.round(score)}%
                  </span>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progreso General</span>
          <span>{Math.round(overallScore)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              overallScore >= 80 ? 'bg-success' : 
              overallScore >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-border bg-muted/25">
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            className="flex-1"
            disabled={overallScore < 60}
          >
            <Icon name="Send" size={16} className="mr-2" />
            Enviar Idea
          </Button>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
        {overallScore < 60 && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Completa al menos 60% para enviar tu idea
          </p>
        )}
      </div>
    </div>
  );
};

export default FormValidationSummary;