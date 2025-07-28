import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ currentPhase = 'dashboard', completionPercentage = 0 }) => {
  const phases = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      shortName: 'Inicio',
      icon: 'LayoutDashboard',
      path: '/user-dashboard'
    },
    { 
      id: 'idea', 
      name: 'Mi Idea', 
      shortName: 'Idea',
      icon: 'Lightbulb',
      path: '/idea-submission-form'
    },
    { 
      id: 'persona', 
      name: 'Buyer Persona', 
      shortName: 'Persona',
      icon: 'Users',
      path: '/buyer-persona-definition'
    },
    { 
      id: 'validation', 
      name: 'Validación', 
      shortName: 'Validar',
      icon: 'CheckCircle',
      path: '/evidence-collection-module'
    }
  ];

  const getCurrentPhaseIndex = () => {
    const index = phases.findIndex(phase => phase.id === currentPhase);
    return index !== -1 ? index : 0;
  };

  const currentIndex = getCurrentPhaseIndex();

  return (
    <div className="bg-card border-b border-border px-4 lg:px-6 py-3">
      {/* Desktop Progress Indicator */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {phases.map((phase, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const isAccessible = index <= currentIndex;

            return (
              <div key={phase.id} className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-micro ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={phase.icon} size={16} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {phase.name}
                  </span>
                  {isActive && (
                    <span className="text-xs text-muted-foreground">
                      {completionPercentage}% completado
                    </span>
                  )}
                </div>
                {index < phases.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    isCompleted ? 'bg-success' : 'bg-border'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              Progreso General
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((currentIndex / (phases.length - 1)) * 100)}% del proceso
            </div>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${(currentIndex / (phases.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
              'bg-primary text-primary-foreground'
            }`}>
              <Icon name={phases[currentIndex].icon} size={14} />
            </div>
            <span className="text-sm font-medium text-foreground">
              {phases[currentIndex].name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} de {phases.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index <= currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            ></div>
          ))}
        </div>
        
        {completionPercentage > 0 && (
          <div className="mt-1 text-xs text-muted-foreground text-center">
            {completionPercentage}% completado en esta fase
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;