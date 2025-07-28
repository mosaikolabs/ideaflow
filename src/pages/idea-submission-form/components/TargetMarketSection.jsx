import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TargetMarketSection = ({ 
  targetMarket = {
    primarySegment: '',
    ageRange: '',
    location: '',
    industry: '',
    painPoints: [],
    marketSize: ''
  }, 
  onTargetMarketChange = () => {}, 
  error = '',
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const primarySegmentOptions = [
    { value: 'b2c', label: 'Consumidores (B2C)' },
    { value: 'b2b', label: 'Empresas (B2B)' },
    { value: 'b2b2c', label: 'Empresas que sirven consumidores (B2B2C)' },
    { value: 'government', label: 'Sector Público/Gobierno' },
    { value: 'nonprofit', label: 'Organizaciones sin fines de lucro' }
  ];

  const ageRangeOptions = [
    { value: '18-24', label: '18-24 años (Gen Z)' },
    { value: '25-34', label: '25-34 años (Millennials jóvenes)' },
    { value: '35-44', label: '35-44 años (Millennials mayores)' },
    { value: '45-54', label: '45-54 años (Gen X)' },
    { value: '55-64', label: '55-64 años (Baby Boomers jóvenes)' },
    { value: '65+', label: '65+ años (Baby Boomers mayores)' }
  ];

  const locationOptions = [
    { value: 'local', label: 'Local/Ciudad específica' },
    { value: 'national', label: 'Nacional (España)' },
    { value: 'europe', label: 'Europa' },
    { value: 'latam', label: 'Latinoamérica' },
    { value: 'global', label: 'Global' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Tecnología' },
    { value: 'healthcare', label: 'Salud y Bienestar' },
    { value: 'education', label: 'Educación' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'retail', label: 'Comercio/Retail' },
    { value: 'food', label: 'Alimentación' },
    { value: 'transportation', label: 'Transporte' },
    { value: 'real-estate', label: 'Inmobiliario' },
    { value: 'entertainment', label: 'Entretenimiento' },
    { value: 'other', label: 'Otro' }
  ];

  const painPointOptions = [
    'Falta de tiempo',
    'Costos elevados',
    'Procesos complicados',
    'Falta de información',
    'Mala experiencia de usuario',
    'Opciones limitadas',
    'Falta de personalización',
    'Problemas de calidad',
    'Acceso limitado',
    'Falta de soporte'
  ];

  const handleFieldChange = (field, value) => {
    onTargetMarketChange({
      ...targetMarket,
      [field]: value
    });
  };

  const handlePainPointChange = (painPoint, checked) => {
    const updatedPainPoints = checked
      ? [...targetMarket.painPoints, painPoint]
      : targetMarket.painPoints.filter(p => p !== painPoint);
    
    handleFieldChange('painPoints', updatedPainPoints);
  };

  const getCompletionPercentage = () => {
    const fields = ['primarySegment', 'ageRange', 'location', 'industry'];
    const completed = fields.filter(field => targetMarket[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-micro"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="Users" size={16} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Mercado Objetivo
            </h3>
            <p className="text-sm text-muted-foreground">
              Define quién es tu cliente ideal
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getCompletionPercentage() >= 75 && (
            <Icon name="CheckCircle" size={16} className="text-success" />
          )}
          <div className="text-xs text-muted-foreground">
            {getCompletionPercentage()}%
          </div>
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
            {/* Primary Segment */}
            <Select
              label="Segmento Principal *"
              description="¿A quién está dirigida principalmente tu solución?"
              options={primarySegmentOptions}
              value={targetMarket.primarySegment}
              onChange={(value) => handleFieldChange('primarySegment', value)}
              placeholder="Selecciona tu segmento principal"
              required
            />

            {/* Age Range - Only show for B2C */}
            {(targetMarket.primarySegment === 'b2c' || targetMarket.primarySegment === 'b2b2c') && (
              <Select
                label="Rango de Edad *"
                description="¿Qué grupo etario es tu audiencia principal?"
                options={ageRangeOptions}
                value={targetMarket.ageRange}
                onChange={(value) => handleFieldChange('ageRange', value)}
                placeholder="Selecciona el rango de edad"
                required
              />
            )}

            {/* Location */}
            <Select
              label="Ubicación Geográfica *"
              description="¿Dónde se encuentra tu mercado objetivo?"
              options={locationOptions}
              value={targetMarket.location}
              onChange={(value) => handleFieldChange('location', value)}
              placeholder="Selecciona la ubicación"
              required
            />

            {/* Industry */}
            <Select
              label="Industria/Sector *"
              description="¿En qué industria opera tu mercado objetivo?"
              options={industryOptions}
              value={targetMarket.industry}
              onChange={(value) => handleFieldChange('industry', value)}
              placeholder="Selecciona la industria"
              searchable
              required
            />

            {/* Advanced Options Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-micro"
              >
                <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
                <span>{showAdvanced ? 'Ocultar' : 'Mostrar'} Opciones Avanzadas</span>
              </button>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                {/* Pain Points */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Principales Puntos de Dolor
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Selecciona los problemas más comunes que experimenta tu audiencia
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {painPointOptions.map((painPoint) => (
                      <Checkbox
                        key={painPoint}
                        label={painPoint}
                        checked={targetMarket.painPoints.includes(painPoint)}
                        onChange={(e) => handlePainPointChange(painPoint, e.target.checked)}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Market Size Estimation */}
                <Input
                  label="Estimación del Tamaño de Mercado"
                  type="text"
                  placeholder="Ej: 50,000 estudiantes universitarios en Madrid"
                  value={targetMarket.marketSize}
                  onChange={(e) => handleFieldChange('marketSize', e.target.value)}
                  description="Una estimación aproximada del número de usuarios potenciales"
                />
              </div>
            )}

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 pt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    getCompletionPercentage() >= 75 ? 'bg-success' : 'bg-warning'
                  }`}
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                {getCompletionPercentage()}% completo
              </span>
            </div>

            {/* Market Validation Tip */}
            {getCompletionPercentage() >= 75 && (
              <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={14} className="text-primary" />
                  <span className="text-xs font-medium text-primary">
                    Próximo Paso: Buyer Persona
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Con tu mercado objetivo definido, el siguiente paso es crear un buyer persona detallado para validar tus suposiciones.
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-error">{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetMarketSection;