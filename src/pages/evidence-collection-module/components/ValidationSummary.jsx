import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationSummary = ({ 
  interviews = [], 
  surveys = [], 
  research = [],
  onExportReport = () => {}
}) => {
  // Calculate overall validation score
  const calculateValidationScore = () => {
    let totalScore = 0;
    let weightedSum = 0;

    // Interview score (40% weight)
    if (interviews.length > 0) {
      const interviewScore = interviews.reduce((sum, interview) => sum + interview.validationScore, 0) / interviews.length;
      weightedSum += interviewScore * 0.4;
      totalScore += 0.4;
    }

    // Survey score (35% weight)
    if (surveys.length > 0) {
      const surveyScore = surveys.reduce((sum, survey) => sum + survey.responseRate, 0) / surveys.length;
      weightedSum += surveyScore * 0.35;
      totalScore += 0.35;
    }

    // Research score (25% weight)
    if (research.length > 0) {
      const researchScore = research.reduce((sum, item) => sum + (item.overallScore * 10), 0) / research.length;
      weightedSum += researchScore * 0.25;
      totalScore += 0.25;
    }

    return totalScore > 0 ? Math.round(weightedSum / totalScore) : 0;
  };

  const overallScore = calculateValidationScore();
  const totalResponses = surveys.reduce((sum, survey) => sum + survey.totalResponses, 0);
  const totalSources = interviews.length + surveys.length + research.length;

  const getConfidenceLevel = (score) => {
    if (score >= 80) return { level: 'Alta', color: 'success', icon: 'CheckCircle' };
    if (score >= 60) return { level: 'Media', color: 'warning', icon: 'AlertCircle' };
    if (score >= 40) return { level: 'Baja', color: 'warning', icon: 'AlertTriangle' };
    return { level: 'Crítica', color: 'error', icon: 'XCircle' };
  };

  const confidence = getConfidenceLevel(overallScore);

  const getRecommendations = () => {
    const recommendations = [];
    
    if (interviews.length < 5) {
      recommendations.push('Realiza al menos 5 entrevistas de problema para obtener insights cualitativos sólidos');
    }
    
    if (totalResponses < 100) {
      recommendations.push('Recolecta al menos 100 respuestas de encuesta para validación estadística');
    }
    
    if (research.length < 3) {
      recommendations.push('Incluye al menos 3 fuentes de investigación secundaria para contexto de mercado');
    }
    
    if (overallScore < 60) {
      recommendations.push('Tu puntuación de validación indica que necesitas más evidencia antes de proceder');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('¡Excelente trabajo! Tienes evidencia sólida para proceder con confianza');
      recommendations.push('Considera documentar tus hallazgos en un informe de validación');
      recommendations.push('Prepárate para la siguiente fase: definición de solución y MVP');
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  const evidenceBreakdown = [
    {
      type: 'Entrevistas',
      count: interviews.length,
      icon: 'MessageSquare',
      color: 'primary',
      description: 'Conversaciones cualitativas',
      score: interviews.length > 0 ? Math.round(interviews.reduce((sum, i) => sum + i.validationScore, 0) / interviews.length) : 0
    },
    {
      type: 'Encuestas',
      count: surveys.length,
      icon: 'BarChart3',
      color: 'secondary',
      description: `${totalResponses} respuestas totales`,
      score: surveys.length > 0 ? Math.round(surveys.reduce((sum, s) => sum + s.responseRate, 0) / surveys.length) : 0
    },
    {
      type: 'Investigación',
      count: research.length,
      icon: 'FileSearch',
      color: 'accent',
      description: 'Fuentes secundarias',
      score: research.length > 0 ? Math.round(research.reduce((sum, r) => sum + (r.overallScore * 10), 0) / research.length) : 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Target" size={20} className="mr-2 text-primary" />
            Resumen de Validación
          </h3>
          <p className="text-sm text-muted-foreground">
            Análisis consolidado de toda tu evidencia
          </p>
        </div>
        <Button
          variant="default"
          onClick={onExportReport}
          iconName="Download"
          iconPosition="left"
        >
          Exportar Informe
        </Button>
      </div>

      {/* Overall Score Card */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-foreground">Puntuación de Validación</h4>
            <p className="text-sm text-muted-foreground">
              Basada en {totalSources} fuentes de evidencia
            </p>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-${confidence.color}/10 border-4 border-${confidence.color}/20`}>
            <Icon name={confidence.icon} size={24} className={`text-${confidence.color}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{overallScore}%</span>
              <span className={`text-lg font-semibold text-${confidence.color}`}>
                Confianza {confidence.level}
              </span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${confidence.color} transition-all duration-500 ease-out`}
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {evidenceBreakdown.map((evidence) => (
              <div key={evidence.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={evidence.icon} size={16} className={`text-${evidence.color}`} />
                  <span className="text-sm font-medium text-foreground">
                    {evidence.type}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">
                    {evidence.count} • {evidence.score}%
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {evidence.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {evidenceBreakdown.map((evidence) => (
          <div key={evidence.type} className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${evidence.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon name={evidence.icon} size={20} className={`text-${evidence.color}`} />
              </div>
              <span className="text-2xl font-bold text-foreground">{evidence.count}</span>
            </div>
            <h5 className="font-semibold text-foreground mb-1">{evidence.type}</h5>
            <p className="text-sm text-muted-foreground mb-2">{evidence.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Puntuación</span>
              <span className={`text-sm font-semibold text-${evidence.color}`}>
                {evidence.score}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-warning" />
          Recomendaciones
        </h4>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                overallScore >= 60 ? 'bg-success' : 'bg-warning'
              }`}></div>
              <p className="text-sm text-foreground">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="ArrowRight" size={20} className="mr-2 text-primary" />
          Próximos Pasos
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Si tu puntuación es &gt; 70%:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Procede con la definición de solución</li>
              <li>• Comienza el diseño de tu MVP</li>
              <li>• Prepara tu estrategia de lanzamiento</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Si tu puntuación es &lt; 70%:</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Recolecta más evidencia</li>
              <li>• Refina tu definición del problema</li>
              <li>• Considera pivotar tu enfoque</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationSummary;