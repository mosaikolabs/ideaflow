import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SurveySection = ({ 
  surveys = [], 
  onAddSurvey, 
  onUpdateSurvey, 
  onDeleteSurvey 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    platform: '',
    totalResponses: 0,
    targetAudience: '',
    keyFindings: '',
    demographics: {
      age: { '18-25': 0, '26-35': 0, '36-45': 0, '46+': 0 },
      gender: { male: 0, female: 0, other: 0 },
      location: ''
    },
    problemValidation: {
      experienceProblem: 0,
      problemFrequency: 0,
      currentSolution: 0,
      satisfactionLevel: 0
    }
  });

  const handleAddSurvey = () => {
    if (newSurvey.title && newSurvey.totalResponses > 0) {
      const survey = {
        ...newSurvey,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        responseRate: calculateResponseRate(newSurvey)
      };
      onAddSurvey(survey);
      setNewSurvey({
        title: '',
        platform: '',
        totalResponses: 0,
        targetAudience: '',
        keyFindings: '',
        demographics: {
          age: { '18-25': 0, '26-35': 0, '36-45': 0, '46+': 0 },
          gender: { male: 0, female: 0, other: 0 },
          location: ''
        },
        problemValidation: {
          experienceProblem: 0,
          problemFrequency: 0,
          currentSolution: 0,
          satisfactionLevel: 0
        }
      });
      setShowAddForm(false);
    }
  };

  const calculateResponseRate = (survey) => {
    const total = survey.totalResponses;
    if (total === 0) return 0;
    
    const validationScore = (
      (survey.problemValidation.experienceProblem / total) * 0.3 +
      (survey.problemValidation.problemFrequency / total) * 0.25 +
      (survey.problemValidation.currentSolution / total) * 0.25 +
      ((total - survey.problemValidation.satisfactionLevel) / total) * 0.2
    ) * 100;
    
    return Math.round(validationScore);
  };

  const getValidationColor = (score) => {
    if (score >= 70) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  const totalResponses = surveys.reduce((sum, survey) => sum + survey.totalResponses, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="BarChart3" size={20} className="mr-2 text-secondary" />
            Encuestas de Mercado
          </h3>
          <p className="text-sm text-muted-foreground">
            Datos cuantitativos de validación de problema
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{totalResponses}</div>
            <div className="text-xs text-muted-foreground">Respuestas</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{surveys.length}</div>
            <div className="text-xs text-muted-foreground">Encuestas</div>
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Nueva Encuesta
          </Button>
        </div>
      </div>

      {/* Add Survey Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-foreground">
              Registrar Nueva Encuesta
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Título de la Encuesta"
              type="text"
              placeholder="Ej: Validación de Problema - App Fitness"
              value={newSurvey.title}
              onChange={(e) => setNewSurvey({...newSurvey, title: e.target.value})}
              required
            />
            <Input
              label="Plataforma Utilizada"
              type="text"
              placeholder="Google Forms, SurveyMonkey, etc."
              value={newSurvey.platform}
              onChange={(e) => setNewSurvey({...newSurvey, platform: e.target.value})}
            />
            <Input
              label="Total de Respuestas"
              type="number"
              placeholder="150"
              value={newSurvey.totalResponses}
              onChange={(e) => setNewSurvey({...newSurvey, totalResponses: parseInt(e.target.value) || 0})}
              required
            />
            <Input
              label="Audiencia Objetivo"
              type="text"
              placeholder="Profesionales 25-40 años"
              value={newSurvey.targetAudience}
              onChange={(e) => setNewSurvey({...newSurvey, targetAudience: e.target.value})}
            />
          </div>

          {/* Demographics Section */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-foreground mb-3">Demografía de Respuestas</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <Input
                label="18-25 años"
                type="number"
                placeholder="0"
                value={newSurvey.demographics.age['18-25']}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  demographics: {
                    ...newSurvey.demographics,
                    age: { ...newSurvey.demographics.age, '18-25': parseInt(e.target.value) || 0 }
                  }
                })}
              />
              <Input
                label="26-35 años"
                type="number"
                placeholder="0"
                value={newSurvey.demographics.age['26-35']}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  demographics: {
                    ...newSurvey.demographics,
                    age: { ...newSurvey.demographics.age, '26-35': parseInt(e.target.value) || 0 }
                  }
                })}
              />
              <Input
                label="36-45 años"
                type="number"
                placeholder="0"
                value={newSurvey.demographics.age['36-45']}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  demographics: {
                    ...newSurvey.demographics,
                    age: { ...newSurvey.demographics.age, '36-45': parseInt(e.target.value) || 0 }
                  }
                })}
              />
              <Input
                label="46+ años"
                type="number"
                placeholder="0"
                value={newSurvey.demographics.age['46+']}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  demographics: {
                    ...newSurvey.demographics,
                    age: { ...newSurvey.demographics.age, '46+': parseInt(e.target.value) || 0 }
                  }
                })}
              />
            </div>
          </div>

          {/* Problem Validation Section */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-foreground mb-3">Validación del Problema</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Experimentan el Problema"
                type="number"
                placeholder="120"
                description="Número de personas que confirman el problema"
                value={newSurvey.problemValidation.experienceProblem}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  problemValidation: {
                    ...newSurvey.problemValidation,
                    experienceProblem: parseInt(e.target.value) || 0
                  }
                })}
              />
              <Input
                label="Problema Frecuente"
                type="number"
                placeholder="95"
                description="Lo experimentan regularmente"
                value={newSurvey.problemValidation.problemFrequency}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  problemValidation: {
                    ...newSurvey.problemValidation,
                    problemFrequency: parseInt(e.target.value) || 0
                  }
                })}
              />
              <Input
                label="Usan Solución Actual"
                type="number"
                placeholder="80"
                description="Tienen alguna solución actual"
                value={newSurvey.problemValidation.currentSolution}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  problemValidation: {
                    ...newSurvey.problemValidation,
                    currentSolution: parseInt(e.target.value) || 0
                  }
                })}
              />
              <Input
                label="Insatisfechos con Solución"
                type="number"
                placeholder="65"
                description="No están satisfechos con solución actual"
                value={newSurvey.problemValidation.satisfactionLevel}
                onChange={(e) => setNewSurvey({
                  ...newSurvey,
                  problemValidation: {
                    ...newSurvey.problemValidation,
                    satisfactionLevel: parseInt(e.target.value) || 0
                  }
                })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Hallazgos Clave
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Resume los hallazgos más importantes de la encuesta..."
              value={newSurvey.keyFindings}
              onChange={(e) => setNewSurvey({...newSurvey, keyFindings: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={handleAddSurvey}
              disabled={!newSurvey.title || newSurvey.totalResponses === 0}
            >
              Guardar Encuesta
            </Button>
          </div>
        </div>
      )}

      {/* Surveys List */}
      <div className="space-y-4">
        {surveys.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed border-border">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              No hay encuestas registradas
            </h4>
            <p className="text-muted-foreground mb-4">
              Agrega datos de tus encuestas de validación
            </p>
            <Button
              variant="secondary"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Registrar Primera Encuesta
            </Button>
          </div>
        ) : (
          surveys.map((survey) => (
            <div key={survey.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="font-semibold text-foreground">{survey.title}</h5>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Users" size={14} className="mr-1" />
                      {survey.totalResponses} respuestas
                    </span>
                    {survey.platform && (
                      <span className="flex items-center">
                        <Icon name="Globe" size={14} className="mr-1" />
                        {survey.platform}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${getValidationColor(survey.responseRate)}`}>
                    {survey.responseRate}% validación
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSurvey(survey.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Validación del Problema
                  </span>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Experimentan problema</span>
                      <span className="text-sm font-medium text-foreground">
                        {Math.round((survey.problemValidation.experienceProblem / survey.totalResponses) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${(survey.problemValidation.experienceProblem / survey.totalResponses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Audiencia Objetivo
                  </span>
                  <div className="mt-1">
                    <span className="text-sm text-foreground">
                      {survey.targetAudience || 'No especificado'}
                    </span>
                  </div>
                </div>
              </div>

              {survey.keyFindings && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Hallazgos Clave
                  </span>
                  <p className="mt-1 text-sm text-foreground">
                    {survey.keyFindings}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SurveySection;