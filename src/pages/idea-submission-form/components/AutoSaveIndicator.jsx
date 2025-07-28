import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ 
  lastSaved = null, 
  isSaving = false, 
  hasUnsavedChanges = false,
  onManualSave = () => {}
}) => {
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    if (lastSaved && !isSaving) {
      setShowSaveSuccess(true);
      const timer = setTimeout(() => setShowSaveSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved, isSaving]);

  const formatLastSaved = (date) => {
    if (!date) return 'Nunca guardado';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Guardado hace unos segundos';
    if (diffInMinutes === 1) return 'Guardado hace 1 minuto';
    if (diffInMinutes < 60) return `Guardado hace ${diffInMinutes} minutos`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return 'Guardado hace 1 hora';
    if (diffInHours < 24) return `Guardado hace ${diffInHours} horas`;
    
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSaveStatus = () => {
    if (isSaving) {
      return {
        icon: 'Loader2',
        text: 'Guardando...',
        color: 'text-warning',
        animate: true
      };
    }
    
    if (showSaveSuccess) {
      return {
        icon: 'CheckCircle',
        text: 'Guardado',
        color: 'text-success',
        animate: false
      };
    }
    
    if (hasUnsavedChanges) {
      return {
        icon: 'AlertCircle',
        text: 'Cambios sin guardar',
        color: 'text-warning',
        animate: false
      };
    }
    
    return {
      icon: 'Cloud',
      text: 'Todo guardado',
      color: 'text-muted-foreground',
      animate: false
    };
  };

  const status = getSaveStatus();

  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-lg">
      <div className="flex items-center space-x-2">
        <Icon 
          name={status.icon} 
          size={16} 
          className={`${status.color} ${status.animate ? 'animate-spin' : ''}`}
        />
        <div>
          <div className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatLastSaved(lastSaved)}
          </div>
        </div>
      </div>

      {hasUnsavedChanges && (
        <button
          onClick={onManualSave}
          disabled={isSaving}
          className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-primary hover:text-primary/80 transition-micro disabled:opacity-50"
        >
          <Icon name="Save" size={12} />
          <span>Guardar ahora</span>
        </button>
      )}
    </div>
  );
};

export default AutoSaveIndicator;