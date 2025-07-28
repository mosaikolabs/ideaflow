import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProblemDescriptionSection = ({ 
  description = '', 
  onDescriptionChange = () => {}, 
  error = '',
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [charCount, setCharCount] = useState(description.length);
  const [showGuidance, setShowGuidance] = useState(false);
  const minChars = 100;
  const maxChars = 1000;

  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= maxChars) {
      onDescriptionChange(newDescription);
      setCharCount(newDescription.length);
    }
  };

  const getCharCountColor = () => {
    if (charCount < minChars) return 'text-warning';
    if (charCount >= maxChars * 0.9) return 'text-error';
    return 'text-success';
  };

  const guidancePrompts = [
    "¿Qué problema específico experimentan tus usuarios?",
    "¿Con qué frecuencia ocurre este problema?",
    "¿Cómo intentan resolverlo actualmente?",
    "¿Qué consecuencias tiene no resolver este problema?",
    "¿Quién más se ve afectado por este problema?"
  ];

  const exampleProblems = [
    `Los estudiantes universitarios pierden tiempo valioso buscando libros de texto en múltiples plataformas, gastando hasta 3 horas semanales en comparar precios y disponibilidad. Esto les genera estrés durante períodos de exámenes cuando necesitan acceso inmediato a recursos académicos.`,
    `Las pequeñas empresas locales luchan por gestionar su inventario manualmente, resultando en pérdidas del 15% por productos vencidos y falta de stock de artículos populares. Esto afecta directamente su rentabilidad y satisfacción del cliente.`
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-micro"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={16} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Descripción del Problema
            </h3>
            <p className="text-sm text-muted-foreground">
              Define claramente qué problema resuelves
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
                <Icon name="HelpCircle" size={16} className="mr-2" />
                {showGuidance ? 'Ocultar Guía' : 'Mostrar Guía'}
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
                    <Icon name="MessageCircle" size={14} className="mr-2 text-primary" />
                    Preguntas Guía
                  </h4>
                  <ul className="space-y-1">
                    {guidancePrompts.map((prompt, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="BookOpen" size={14} className="mr-2 text-success" />
                    Ejemplos de Problemas Bien Definidos
                  </h4>
                  <div className="space-y-2">
                    {exampleProblems.map((example, index) => (
                      <div key={index} className="text-xs text-muted-foreground p-2 bg-card rounded border-l-2 border-success">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Describe el problema que resuelves *
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe detalladamente el problema que experimentan tus usuarios. Incluye la frecuencia, impacto y consecuencias de no resolverlo..."
                className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                required
              />
              {error && (
                <p className="mt-1 text-xs text-error">{error}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Sé específico sobre quién experimenta el problema y cuándo ocurre
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDescriptionSection;