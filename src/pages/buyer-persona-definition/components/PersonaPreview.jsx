import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PersonaPreview = ({ persona, onEdit, onExport, className = '' }) => {
  const getCompletionPercentage = () => {
    const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
    const optionalFields = ['location', 'incomeLevel', 'education', 'motivations', 'frustrations'];
    
    const requiredCompleted = requiredFields.filter(field => persona[field]).length;
    const optionalCompleted = optionalFields.filter(field => persona[field]).length;
    
    const requiredWeight = 0.7;
    const optionalWeight = 0.3;
    
    return Math.round(
      (requiredCompleted / requiredFields.length) * requiredWeight * 100 +
      (optionalCompleted / optionalFields.length) * optionalWeight * 100
    );
  };

  const getPersonaAvatar = () => {
    // Generate avatar based on persona characteristics
    const avatars = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    ];
    
    const index = persona.name ? persona.name.length % avatars.length : 0;
    return avatars[index];
  };

  const getPainIntensityColor = (intensity) => {
    if (intensity >= 8) return 'text-error';
    if (intensity >= 6) return 'text-warning';
    if (intensity >= 4) return 'text-secondary';
    return 'text-success';
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Vista Previa del Persona
              </h3>
              <p className="text-sm text-muted-foreground">
                Resumen visual de tu buyer persona
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Icon name="Edit" size={16} />
            </Button>
            <Button variant="outline" size="icon" onClick={onExport}>
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      <div className="px-6 py-3 border-b border-border bg-muted/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              completionPercentage >= 80 ? 'bg-success' : 
              completionPercentage >= 60 ? 'bg-warning' : 'bg-error'
            }`}></div>
            <span className="text-sm font-medium text-foreground">
              {completionPercentage}% Completado
            </span>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                completionPercentage >= 80 ? 'bg-success' : 
                completionPercentage >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Persona Card */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-border">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={getPersonaAvatar()}
                alt={persona.name || 'Persona Avatar'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-bold text-foreground mb-1">
                {persona.name || 'Nombre del Persona'}
              </h4>
              <p className="text-lg text-secondary font-medium mb-2">
                {persona.jobTitle || 'Título del Trabajo'}
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {persona.ageRange && (
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{persona.ageRange}</span>
                  </span>
                )}
                {persona.location && (
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{persona.location}</span>
                  </span>
                )}
                {persona.incomeLevel && (
                  <span className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={14} />
                    <span>{persona.incomeLevel}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Pain Points */}
            {persona.primaryPain && (
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-error" />
                  <h5 className="font-semibold text-foreground">Problema Principal</h5>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {persona.primaryPain}
                </p>
                {persona.painIntensity && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Intensidad:</span>
                    <span className={`text-sm font-bold ${getPainIntensityColor(persona.painIntensity)}`}>
                      {persona.painIntensity}/10
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Motivations */}
            {persona.motivations && (
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-success" />
                  <h5 className="font-semibold text-foreground">Motivaciones</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  {persona.motivations}
                </p>
              </div>
            )}

            {/* Goals */}
            {persona.shortTermGoals && (
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Flag" size={16} className="text-primary" />
                  <h5 className="font-semibold text-foreground">Objetivos</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  {persona.shortTermGoals}
                </p>
              </div>
            )}

            {/* Communication */}
            {persona.communicationChannels && persona.communicationChannels.length > 0 && (
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MessageCircle" size={16} className="text-secondary" />
                  <h5 className="font-semibold text-foreground">Comunicación</h5>
                </div>
                <div className="flex flex-wrap gap-1">
                  {persona.communicationChannels.slice(0, 3).map((channel, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {channel}
                    </span>
                  ))}
                  {persona.communicationChannels.length > 3 && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      +{persona.communicationChannels.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            {persona.frustrations && (
              <div className="flex items-start space-x-2">
                <Icon name="Frown" size={16} className="text-warning mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">Frustraciones: </span>
                  <span className="text-sm text-muted-foreground">{persona.frustrations}</span>
                </div>
              </div>
            )}

            {persona.currentSolutions && (
              <div className="flex items-start space-x-2">
                <Icon name="Tool" size={16} className="text-accent mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">Soluciones Actuales: </span>
                  <span className="text-sm text-muted-foreground">{persona.currentSolutions}</span>
                </div>
              </div>
            )}

            {persona.budget && (
              <div className="flex items-start space-x-2">
                <Icon name="CreditCard" size={16} className="text-primary mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-foreground">Presupuesto: </span>
                  <span className="text-sm text-muted-foreground">{persona.budget}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Validation Needs */}
      <div className="px-6 py-4 border-t border-border bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-warning mt-0.5" />
          <div>
            <h5 className="font-semibold text-foreground mb-1">
              Necesita Validación
            </h5>
            <p className="text-sm text-muted-foreground mb-2">
              Estos aspectos del persona requieren evidencia a través de entrevistas:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                Intensidad del dolor
              </span>
              <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                Soluciones actuales
              </span>
              <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                Presupuesto disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaPreview;