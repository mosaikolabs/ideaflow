import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressBar = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  completionPercentage = 0,
  sectionStatus = {}
}) => {
  const steps = [
    { id: 1, name: 'Título', icon: 'Lightbulb', key: 'title' },
    { id: 2, name: 'Problema', icon: 'AlertTriangle', key: 'problem' },
    { id: 3, name: 'Solución', icon: 'Zap', key: 'solution' },
    { id: 4, name: 'Mercado', icon: 'Users', key: 'market' }
  ];

  const getStepStatus = (step) => {
    if (sectionStatus[step.key]) return 'completed';
    if (step.id === currentStep) return 'current';
    if (step.id < currentStep) return 'completed';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'current': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-b border-border px-4 lg:px-6 py-4">
      {/* Desktop Progress */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Formulario de Idea
            </h2>
            <p className="text-sm text-muted-foreground">
              Completa todos los campos para enviar tu idea
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-foreground">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Completado
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-micro ${getStepColor(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Paso {step.id}
                    </div>
                  </div>
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    status === 'completed' ? 'bg-success' : 'bg-border'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Nueva Idea
            </h2>
            <p className="text-xs text-muted-foreground">
              Paso {currentStep} de {totalSteps}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold font-mono text-foreground">
              {Math.round(completionPercentage)}%
            </div>
          </div>
        </div>

        {/* Mobile Step Indicators */}
        <div className="flex items-center space-x-1 mb-3">
          {steps.map((step) => {
            const status = getStepStatus(step);
            return (
              <div
                key={step.id}
                className={`flex-1 h-1 rounded-full ${
                  status === 'completed' ? 'bg-success' : 
                  status === 'current' ? 'bg-primary' : 'bg-muted'
                }`}
              ></div>
            );
          })}
        </div>

        {/* Current Step Info */}
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            getStepColor(getStepStatus(steps[currentStep - 1]))
          }`}>
            <Icon name={steps[currentStep - 1]?.icon} size={12} />
          </div>
          <span className="text-sm font-medium text-foreground">
            {steps[currentStep - 1]?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormProgressBar;