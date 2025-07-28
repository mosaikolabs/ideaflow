import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const InterviewSection = ({ 
  interviews = [], 
  onAddInterview, 
  onUpdateInterview, 
  onDeleteInterview 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInterview, setNewInterview] = useState({
    intervieweeName: '',
    date: '',
    duration: '',
    painPoints: [],
    willingnessToPay: '',
    keyInsights: '',
    validationScore: 0
  });

  const painPointOptions = [
    'Problema claramente identificado',
    'Solución actual insatisfactoria',
    'Dispuesto a cambiar comportamiento',
    'Problema frecuente y urgente',
    'Impacto económico significativo'
  ];

  const handleAddInterview = () => {
    if (newInterview.intervieweeName && newInterview.keyInsights) {
      const interview = {
        ...newInterview,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      onAddInterview(interview);
      setNewInterview({
        intervieweeName: '',
        date: '',
        duration: '',
        painPoints: [],
        willingnessToPay: '',
        keyInsights: '',
        validationScore: 0
      });
      setShowAddForm(false);
    }
  };

  const handlePainPointChange = (painPoint, checked) => {
    const updatedPainPoints = checked
      ? [...newInterview.painPoints, painPoint]
      : newInterview.painPoints.filter(p => p !== painPoint);
    
    setNewInterview({
      ...newInterview,
      painPoints: updatedPainPoints,
      validationScore: (updatedPainPoints.length / painPointOptions.length) * 100
    });
  };

  const getValidationColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
            Entrevistas de Problema
          </h3>
          <p className="text-sm text-muted-foreground">
            Registra conversaciones con potenciales usuarios
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{interviews.length}</div>
            <div className="text-xs text-muted-foreground">Entrevistas</div>
          </div>
          <Button
            variant="default"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Nueva Entrevista
          </Button>
        </div>
      </div>

      {/* Add Interview Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-foreground">
              Registrar Nueva Entrevista
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Nombre del Entrevistado"
              type="text"
              placeholder="Ej: María González"
              value={newInterview.intervieweeName}
              onChange={(e) => setNewInterview({...newInterview, intervieweeName: e.target.value})}
              required
            />
            <Input
              label="Fecha de Entrevista"
              type="date"
              value={newInterview.date}
              onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
            />
            <Input
              label="Duración (minutos)"
              type="number"
              placeholder="30"
              value={newInterview.duration}
              onChange={(e) => setNewInterview({...newInterview, duration: e.target.value})}
            />
            <Input
              label="Disposición a Pagar"
              type="text"
              placeholder="€50/mes, No pagaría, etc."
              value={newInterview.willingnessToPay}
              onChange={(e) => setNewInterview({...newInterview, willingnessToPay: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-3">
              Validación de Puntos de Dolor
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {painPointOptions.map((painPoint) => (
                <Checkbox
                  key={painPoint}
                  label={painPoint}
                  checked={newInterview.painPoints.includes(painPoint)}
                  onChange={(e) => handlePainPointChange(painPoint, e.target.checked)}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Puntuación de Validación:</span>
              <span className={`text-sm font-semibold ${getValidationColor(newInterview.validationScore)}`}>
                {Math.round(newInterview.validationScore)}%
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Insights Clave
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Describe los hallazgos más importantes de la entrevista..."
              value={newInterview.keyInsights}
              onChange={(e) => setNewInterview({...newInterview, keyInsights: e.target.value})}
              required
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
              variant="default"
              onClick={handleAddInterview}
              disabled={!newInterview.intervieweeName || !newInterview.keyInsights}
            >
              Guardar Entrevista
            </Button>
          </div>
        </div>
      )}

      {/* Interviews List */}
      <div className="space-y-4">
        {interviews.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed border-border">
            <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              No hay entrevistas registradas
            </h4>
            <p className="text-muted-foreground mb-4">
              Comienza registrando tu primera entrevista de problema
            </p>
            <Button
              variant="default"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Registrar Primera Entrevista
            </Button>
          </div>
        ) : (
          interviews.map((interview) => (
            <div key={interview.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-foreground">{interview.intervieweeName}</h5>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {interview.date && (
                      <span className="flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {new Date(interview.date).toLocaleDateString('es-ES')}
                      </span>
                    )}
                    {interview.duration && (
                      <span className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {interview.duration} min
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${getValidationColor(interview.validationScore)}`}>
                    {Math.round(interview.validationScore)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteInterview(interview.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Puntos de Dolor Validados
                  </span>
                  <div className="mt-1">
                    {interview.painPoints.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {interview.painPoints.map((point, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success border border-success/20"
                          >
                            <Icon name="Check" size={10} className="mr-1" />
                            {point}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No especificado</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Disposición a Pagar
                  </span>
                  <div className="mt-1">
                    <span className="text-sm text-foreground">
                      {interview.willingnessToPay || 'No especificado'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Insights Clave
                </span>
                <p className="mt-1 text-sm text-foreground">
                  {interview.keyInsights}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewSection;