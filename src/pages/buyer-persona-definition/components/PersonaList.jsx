import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonaList = ({ personas, activePersonaId, onPersonaSelect, onPersonaCreate, onPersonaDelete, onPersonaClone }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const getPersonaCompletionScore = (persona) => {
    const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
    const optionalFields = ['location', 'incomeLevel', 'education', 'motivations', 'frustrations', 'communicationChannels'];
    
    const requiredCompleted = requiredFields.filter(field => persona[field]).length;
    const optionalCompleted = optionalFields.filter(field => persona[field] && (Array.isArray(persona[field]) ? persona[field].length > 0 : true)).length;
    
    return Math.round(
      (requiredCompleted / requiredFields.length) * 70 +
      (optionalCompleted / optionalFields.length) * 30
    );
  };

  const getPersonaStatus = (persona) => {
    const score = getPersonaCompletionScore(persona);
    if (score >= 80) return { status: 'complete', color: 'success', label: 'Completo' };
    if (score >= 60) return { status: 'good', color: 'primary', label: 'Bueno' };
    if (score >= 40) return { status: 'partial', color: 'warning', label: 'Parcial' };
    return { status: 'incomplete', color: 'error', label: 'Incompleto' };
  };

  const handleDeleteConfirm = (personaId) => {
    onPersonaDelete(personaId);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Mis Buyer Personas
            </h3>
            <p className="text-sm text-muted-foreground">
              {personas.length} persona{personas.length !== 1 ? 's' : ''} creado{personas.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={onPersonaCreate} className="flex items-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>Nuevo Persona</span>
          </Button>
        </div>
      </div>

      {/* Personas List */}
      <div className="divide-y divide-border">
        {personas.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              No hay personas creados
            </h4>
            <p className="text-muted-foreground mb-4">
              Crea tu primer buyer persona para comenzar la validación
            </p>
            <Button onClick={onPersonaCreate} variant="outline">
              <Icon name="Plus" size={16} className="mr-2" />
              Crear Primer Persona
            </Button>
          </div>
        ) : (
          personas.map((persona) => {
            const status = getPersonaStatus(persona);
            const completionScore = getPersonaCompletionScore(persona);
            const isActive = persona.id === activePersonaId;

            return (
              <div
                key={persona.id}
                className={`px-6 py-4 hover:bg-muted/25 transition-micro cursor-pointer ${
                  isActive ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onPersonaSelect(persona.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">
                          {persona.name || 'Sin nombre'}
                        </h4>
                        {persona.isPrimary && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Principal
                          </span>
                        )}
                        <span className={`text-xs bg-${status.color}/10 text-${status.color} px-2 py-0.5 rounded-full`}>
                          {status.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{persona.jobTitle || 'Sin título'}</span>
                        <span>•</span>
                        <span>{persona.ageRange || 'Edad no especificada'}</span>
                        {persona.location && (
                          <>
                            <span>•</span>
                            <span>{persona.location}</span>
                          </>
                        )}
                      </div>

                      {persona.primaryPain && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                          {persona.primaryPain}
                        </p>
                      )}
                    </div>

                    {/* Completion Score */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold font-mono text-foreground">
                        {completionScore}%
                      </div>
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${status.color} transition-all duration-300`}
                          style={{ width: `${completionScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPersonaClone(persona.id);
                      }}
                      className="h-8 w-8"
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    
                    {personas.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(persona.id);
                        }}
                        className="h-8 w-8 text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Icon name={isActive ? "ChevronDown" : "ChevronRight"} size={14} />
                    </Button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === persona.id && (
                  <div className="mt-4 p-4 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-foreground mb-1">
                          ¿Eliminar persona?
                        </h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          Esta acción no se puede deshacer. Se perderá toda la información del persona "{persona.name}".
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteConfirm(persona.id);
                            }}
                          >
                            Eliminar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(null);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {personas.length > 0 && (
        <div className="px-6 py-4 border-t border-border bg-muted/25">
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              Recomendación: Define 1-3 personas principales para una validación efectiva
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {personas.filter(p => getPersonaCompletionScore(p) >= 80).length} completos
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaList;