import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationGuidance = ({ personas, onStartValidation, className = '' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getValidationReadiness = () => {
    const completedPersonas = personas.filter(persona => {
      const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
      return requiredFields.every(field => persona[field]);
    });

    return {
      total: personas.length,
      completed: completedPersonas.length,
      readyForValidation: completedPersonas.length > 0
    };
  };

  const getInterviewQuestions = () => {
    const questions = [
      {
        category: 'Problema y Contexto',
        questions: [
          '¿Puedes describir cómo manejas actualmente [problema específico]?',
          '¿Qué tan frecuentemente te encuentras con este problema?',
          '¿Cuál es el impacto de este problema en tu día a día?',
          '¿Has intentado resolver este problema antes? ¿Cómo?'
        ]
      },
      {
        category: 'Soluciones Actuales',
        questions: [
          '¿Qué herramientas o métodos usas actualmente?',
          '¿Qué te gusta y qué no te gusta de tu solución actual?',
          '¿Cuánto tiempo/dinero inviertes en esto mensualmente?',
          '¿Qué te haría cambiar a una nueva solución?'
        ]
      },
      {
        category: 'Proceso de Decisión',
        questions: [
          '¿Quién más está involucrado en decisiones como esta?',
          '¿Qué factores son más importantes al evaluar una solución?',
          '¿Cuál es tu proceso típico para evaluar nuevas herramientas?',
          '¿Qué presupuesto tienes disponible para este tipo de solución?'
        ]
      }
    ];

    return questions;
  };

  const getValidationTips = () => [
    {
      icon: 'Users',
      title: 'Encuentra Entrevistados',
      description: 'Busca personas que coincidan con tu buyer persona en LinkedIn, comunidades online, o tu red de contactos.',
      action: 'Crear lista de contactos'
    },
    {
      icon: 'Calendar',
      title: 'Programa Entrevistas',
      description: 'Agenda 5-10 entrevistas de 30 minutos cada una. Ofrece un pequeño incentivo si es necesario.',
      action: 'Configurar calendario'
    },
    {
      icon: 'MessageSquare',
      title: 'Prepara Preguntas',
      description: 'Usa preguntas abiertas que permitan descubrir insights inesperados sobre el problema.',
      action: 'Revisar guía de preguntas'
    },
    {
      icon: 'FileText',
      title: 'Documenta Hallazgos',
      description: 'Registra patrones, citas textuales y insights clave que validen o refuten tus asunciones.',
      action: 'Preparar plantilla'
    }
  ];

  const readiness = getValidationReadiness();
  const interviewQuestions = getInterviewQuestions();
  const validationTips = getValidationTips();

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: 'BarChart3' },
    { id: 'questions', name: 'Preguntas', icon: 'MessageSquare' },
    { id: 'tips', name: 'Consejos', icon: 'Lightbulb' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Readiness Status */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-foreground">
              Estado de Preparación
            </h4>
            <p className="text-sm text-muted-foreground">
              Evaluación de tus personas para validación
            </p>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            readiness.readyForValidation ? 'bg-success/20' : 'bg-warning/20'
          }`}>
            <Icon 
              name={readiness.readyForValidation ? "CheckCircle" : "AlertCircle"} 
              size={24} 
              className={readiness.readyForValidation ? 'text-success' : 'text-warning'} 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{readiness.total}</div>
            <div className="text-sm text-muted-foreground">Personas Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{readiness.completed}</div>
            <div className="text-sm text-muted-foreground">Completos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">5-10</div>
            <div className="text-sm text-muted-foreground">Entrevistas Recomendadas</div>
          </div>
        </div>

        {readiness.readyForValidation ? (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Listo para comenzar la validación</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">Completa al menos un persona antes de continuar</span>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Próximos Pasos
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              readiness.completed > 0 ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {readiness.completed > 0 ? <Icon name="Check" size={12} /> : <span className="text-xs">1</span>}
            </div>
            <span className={`text-sm ${readiness.completed > 0 ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
              Completar definición de buyer persona
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              readiness.readyForValidation ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <span className="text-xs">2</span>
            </div>
            <span className={`text-sm ${readiness.readyForValidation ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Identificar y contactar entrevistados potenciales
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
              <span className="text-xs">3</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Realizar entrevistas de validación
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
              <span className="text-xs">4</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Analizar resultados y refinar persona
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div className="space-y-6">
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="font-semibold text-foreground mb-1">
              Guía de Entrevistas
            </h5>
            <p className="text-sm text-muted-foreground">
              Usa estas preguntas como punto de partida. Adapta según las respuestas y mantén la conversación natural.
            </p>
          </div>
        </div>
      </div>

      {interviewQuestions.map((category, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="MessageCircle" size={20} className="mr-2 text-primary" />
            {category.category}
          </h4>
          <div className="space-y-3">
            {category.questions.map((question, qIndex) => (
              <div key={qIndex} className="flex items-start space-x-3 p-3 bg-muted/25 rounded-lg">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{qIndex + 1}</span>
                </div>
                <p className="text-sm text-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTips = () => (
    <div className="space-y-4">
      {validationTips.map((tip, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={tip.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {tip.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {tip.description}
              </p>
              <Button variant="outline" size="sm">
                {tip.action}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'questions':
        return renderQuestions();
      case 'tips':
        return renderTips();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Guía de Validación
            </h3>
            <p className="text-sm text-muted-foreground">
              Prepárate para validar tus buyer personas
            </p>
          </div>
          <Button 
            onClick={onStartValidation}
            disabled={!readiness.readyForValidation}
            className="flex items-center space-x-2"
          >
            <Icon name="Play" size={16} />
            <span>Comenzar Validación</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-border bg-muted/25">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ValidationGuidance;