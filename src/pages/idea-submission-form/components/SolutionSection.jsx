import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionSection = ({ 
  solution = '', 
  onSolutionChange = () => {}, 
  error = '',
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [charCount, setCharCount] = useState(solution.length);
  const [showGuidance, setShowGuidance] = useState(false);
  const minChars = 100;
  const maxChars = 800;

  useEffect(() => {
    setCharCount(solution.length);
  }, [solution]);

  const handleSolutionChange = (e) => {
    const newSolution = e.target.value;
    if (newSolution.length <= maxChars) {
      onSolutionChange(newSolution);
      setCharCount(newSolution.length);
    }
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-warning';
    if (charCount >= maxChars * 0.9) return 'text-error';
    return 'text-success';
  };

  const guidancePrompts = [
    "¿Cómo resuelve tu solución el problema identificado?",
    "¿Qué hace diferente a tu solución de las existentes?",
    "¿Cuáles son las características principales?",
    "¿Cómo interactúan los usuarios con tu solución?",
    "¿Qué beneficios específicos obtienen los usuarios?"
  ];

  const solutionFramework = [
    { label: "Qué hace", example: "Una plataforma que conecta..." },
    { label: "Cómo funciona", example: "Los usuarios pueden..." },
    { label: "Por qué es mejor", example: "A diferencia de otras opciones..." },
    { label: "Resultado", example: "Los usuarios logran..." }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-micro"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Zap" size={16} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Tu Solución Propuesta
            </h3>
            <p className="text-sm text-muted-foreground">
              Explica cómo resuelves el problema
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {charCount >= minChars && (
            <Icon name="CheckCircle" size={16} className="text-success" />
          )}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="mt-4 space-y-4">
            {/* Guidance Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowGuidance(!showGuidance)}
                className="text-sm"
              >
                <Icon name="Target" size={16} className="mr-2" />
                {showGuidance ? 'Ocultar Marco de Trabajo' : 'Mostrar Marco de Trabajo'}
              </Button>
              <div className={`text-xs font-mono ${getCharCountColor()}`}>
                {charCount}/{maxChars} ({minChars} mínimo)
              </div>
            </div>

            {/* Guidance Section */}
            {showGuidance && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="CheckSquare" size={14} className="mr-2 text-primary" />
                    Marco de Solución
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {solutionFramework.map((item, index) => (
                      <div key={index} className="p-2 bg-card rounded border">
                        <div className="text-xs font-medium text-foreground mb-1">
                          {item.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="MessageCircle" size={14} className="mr-2 text-success" />
                    Preguntas Clave
                  </h4>
                  <ul className="space-y-1">
                    {guidancePrompts.map((prompt, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start">
                        <span className="text-success mr-2">•</span>
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Describe tu solución *
              </label>
              <textarea
                value={solution}
                onChange={handleSolutionChange}
                placeholder="Explica cómo tu solución aborda el problema. Incluye las características principales, cómo funciona y qué la hace única..."
                className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                required
              />
              {error && (
                <p className="mt-1 text-xs text-error">{error}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Enfócate en los beneficios y el valor único que aportas
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    charCount >= minChars ? 'bg-success' : 'bg-warning'
                  }`}
                  style={{ width: `${Math.min((charCount / minChars) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                {charCount >= minChars ? 'Completo' : `${minChars - charCount} caracteres restantes`}
              </span>
            </div>

            {/* Solution Strength Indicator */}
            {charCount >= minChars && (
              <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={14} className="text-success" />
                  <span className="text-xs font-medium text-success">
                    Análisis de Fortaleza
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Tu solución parece bien estructurada. Asegúrate de validarla con usuarios reales en la siguiente fase.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionSection;