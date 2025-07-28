import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PersonaBuilder = ({ persona, onPersonaUpdate, isActive = false }) => {
  const [activeSection, setActiveSection] = useState('demographics');

  const ageRangeOptions = [
    { value: '18-24', label: '18-24 años' },
    { value: '25-34', label: '25-34 años' },
    { value: '35-44', label: '35-44 años' },
    { value: '45-54', label: '45-54 años' },
    { value: '55-64', label: '55-64 años' },
    { value: '65+', label: '65+ años' }
  ];

  const incomeOptions = [
    { value: 'low', label: 'Menos de €25,000' },
    { value: 'medium-low', label: '€25,000 - €40,000' },
    { value: 'medium', label: '€40,000 - €60,000' },
    { value: 'medium-high', label: '€60,000 - €80,000' },
    { value: 'high', label: 'Más de €80,000' }
  ];

  const educationOptions = [
    { value: 'secondary', label: 'Educación Secundaria' },
    { value: 'vocational', label: 'Formación Profesional' },
    { value: 'bachelor', label: 'Licenciatura' },
    { value: 'master', label: 'Máster' },
    { value: 'doctorate', label: 'Doctorado' }
  ];

  const communicationChannels = [
    { value: 'email', label: 'Email' },
    { value: 'social-media', label: 'Redes Sociales' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'in-person', label: 'Presencial' },
    { value: 'messaging', label: 'Mensajería Instantánea' },
    { value: 'video-call', label: 'Videollamadas' }
  ];

  const sections = [
    { id: 'demographics', name: 'Demografía', icon: 'Users' },
    { id: 'psychographics', name: 'Psicografía', icon: 'Brain' },
    { id: 'pain-points', name: 'Puntos de Dolor', icon: 'AlertTriangle' },
    { id: 'behaviors', name: 'Comportamientos', icon: 'Activity' }
  ];

  const handleInputChange = (field, value) => {
    onPersonaUpdate({
      ...persona,
      [field]: value
    });
  };

  const handleArrayChange = (field, value, checked) => {
    const currentArray = persona[field] || [];
    if (checked) {
      handleInputChange(field, [...currentArray, value]);
    } else {
      handleInputChange(field, currentArray.filter(item => item !== value));
    }
  };

  const renderDemographics = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre del Persona"
          type="text"
          placeholder="ej. María Emprendedora"
          value={persona.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
        
        <Select
          label="Rango de Edad"
          options={ageRangeOptions}
          value={persona.ageRange || ''}
          onChange={(value) => handleInputChange('ageRange', value)}
          placeholder="Selecciona rango de edad"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Ubicación"
          type="text"
          placeholder="ej. Madrid, España"
          value={persona.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
        
        <Input
          label="Título del Trabajo"
          type="text"
          placeholder="ej. Gerente de Marketing"
          value={persona.jobTitle || ''}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Nivel de Ingresos"
          options={incomeOptions}
          value={persona.incomeLevel || ''}
          onChange={(value) => handleInputChange('incomeLevel', value)}
          placeholder="Selecciona nivel de ingresos"
        />
        
        <Select
          label="Nivel Educativo"
          options={educationOptions}
          value={persona.education || ''}
          onChange={(value) => handleInputChange('education', value)}
          placeholder="Selecciona nivel educativo"
        />
      </div>

      <Input
        label="Descripción del Estilo de Vida"
        type="text"
        placeholder="ej. Activo, orientado a la tecnología, valora la eficiencia"
        value={persona.lifestyle || ''}
        onChange={(e) => handleInputChange('lifestyle', e.target.value)}
        description="Describe las características generales del estilo de vida"
      />
    </div>
  );

  const renderPsychographics = () => (
    <div className="space-y-4">
      <Input
        label="Motivaciones Principales"
        type="text"
        placeholder="ej. Crecimiento profesional, reconocimiento, impacto social"
        value={persona.motivations || ''}
        onChange={(e) => handleInputChange('motivations', e.target.value)}
        description="¿Qué impulsa a esta persona en su vida profesional y personal?"
      />

      <Input
        label="Frustraciones Principales"
        type="text"
        placeholder="ej. Falta de tiempo, procesos ineficientes, tecnología compleja"
        value={persona.frustrations || ''}
        onChange={(e) => handleInputChange('frustrations', e.target.value)}
        description="¿Qué aspectos generan más estrés o molestia?"
      />

      <Input
        label="Valores Fundamentales"
        type="text"
        placeholder="ej. Honestidad, innovación, sostenibilidad"
        value={persona.values || ''}
        onChange={(e) => handleInputChange('values', e.target.value)}
        description="¿Qué principios guían sus decisiones?"
      />

      <Input
        label="Objetivos a Corto Plazo"
        type="text"
        placeholder="ej. Aumentar productividad, aprender nuevas habilidades"
        value={persona.shortTermGoals || ''}
        onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
        description="¿Qué busca lograr en los próximos 6-12 meses?"
      />

      <Input
        label="Objetivos a Largo Plazo"
        type="text"
        placeholder="ej. Liderar un equipo, crear su propia empresa"
        value={persona.longTermGoals || ''}
        onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
        description="¿Cuáles son sus aspiraciones a 2-5 años?"
      />
    </div>
  );

  const renderPainPoints = () => (
    <div className="space-y-4">
      <Input
        label="Problema Principal"
        type="text"
        placeholder="ej. Dificultad para gestionar múltiples proyectos simultáneamente"
        value={persona.primaryPain || ''}
        onChange={(e) => handleInputChange('primaryPain', e.target.value)}
        description="El dolor más significativo que experimenta"
        required
      />

      <Input
        label="Problemas Secundarios"
        type="text"
        placeholder="ej. Comunicación deficiente con el equipo, falta de visibilidad del progreso"
        value={persona.secondaryPains || ''}
        onChange={(e) => handleInputChange('secondaryPains', e.target.value)}
        description="Otros problemas relevantes (separados por comas)"
      />

      <Input
        label="Impacto del Problema"
        type="text"
        placeholder="ej. Estrés, pérdida de oportunidades, reducción de productividad"
        value={persona.painImpact || ''}
        onChange={(e) => handleInputChange('painImpact', e.target.value)}
        description="¿Cómo afectan estos problemas a su vida/trabajo?"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Intensidad del Dolor (1-10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={persona.painIntensity || 5}
          onChange={(e) => handleInputChange('painIntensity', parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Leve (1)</span>
          <span className="font-medium text-foreground">{persona.painIntensity || 5}</span>
          <span>Crítico (10)</span>
        </div>
      </div>

      <Input
        label="Soluciones Actuales"
        type="text"
        placeholder="ej. Hojas de cálculo, herramientas básicas, procesos manuales"
        value={persona.currentSolutions || ''}
        onChange={(e) => handleInputChange('currentSolutions', e.target.value)}
        description="¿Cómo intenta resolver estos problemas actualmente?"
      />
    </div>
  );

  const renderBehaviors = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Canales de Comunicación Preferidos
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {communicationChannels.map((channel) => (
            <Checkbox
              key={channel.value}
              label={channel.label}
              checked={(persona.communicationChannels || []).includes(channel.value)}
              onChange={(e) => handleArrayChange('communicationChannels', channel.value, e.target.checked)}
            />
          ))}
        </div>
      </div>

      <Input
        label="Proceso de Toma de Decisiones"
        type="text"
        placeholder="ej. Investiga exhaustivamente, consulta con colegas, evalúa ROI"
        value={persona.decisionProcess || ''}
        onChange={(e) => handleInputChange('decisionProcess', e.target.value)}
        description="¿Cómo toma decisiones de compra o adopción de nuevas soluciones?"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Presupuesto Típico"
          type="text"
          placeholder="ej. €500-2000 por solución"
          value={persona.budget || ''}
          onChange={(e) => handleInputChange('budget', e.target.value)}
          description="Rango de inversión habitual"
        />
        
        <Input
          label="Tiempo de Decisión"
          type="text"
          placeholder="ej. 2-4 semanas"
          value={persona.decisionTime || ''}
          onChange={(e) => handleInputChange('decisionTime', e.target.value)}
          description="Tiempo típico para decidir"
        />
      </div>

      <Input
        label="Influenciadores en la Decisión"
        type="text"
        placeholder="ej. Jefe directo, equipo técnico, presupuesto departamental"
        value={persona.decisionInfluencers || ''}
        onChange={(e) => handleInputChange('decisionInfluencers', e.target.value)}
        description="¿Quién más participa en el proceso de decisión?"
      />

      <Input
        label="Fuentes de Información"
        type="text"
        placeholder="ej. Google, LinkedIn, recomendaciones de colegas, reviews online"
        value={persona.informationSources || ''}
        onChange={(e) => handleInputChange('informationSources', e.target.value)}
        description="¿Dónde busca información sobre nuevas soluciones?"
      />
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'demographics':
        return renderDemographics();
      case 'psychographics':
        return renderPsychographics();
      case 'pain-points':
        return renderPainPoints();
      case 'behaviors':
        return renderBehaviors();
      default:
        return renderDemographics();
    }
  };

  if (!isActive) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                {persona.name || 'Nuevo Persona'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {persona.jobTitle || 'Sin definir'} • {persona.ageRange || 'Edad no especificada'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Constructor de Buyer Persona
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Define las características de tu cliente ideal
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                Completado
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(((persona.name ? 1 : 0) + (persona.primaryPain ? 1 : 0) + (persona.jobTitle ? 1 : 0) + (persona.ageRange ? 1 : 0)) / 4 * 100)}%
              </div>
            </div>
            <Icon name="User" size={24} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="px-6 py-3 border-b border-border bg-muted/25">
        <div className="flex space-x-1 overflow-x-auto">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <Icon name={section.icon} size={16} />
              <span className="hidden sm:inline">{section.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {renderSection()}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/25">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Sección: {sections.find(s => s.id === activeSection)?.name}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex > 0) {
                  setActiveSection(sections[currentIndex - 1].id);
                }
              }}
              disabled={activeSection === sections[0].id}
            >
              <Icon name="ChevronLeft" size={16} className="mr-2" />
              Anterior
            </Button>
            <Button
              variant="default"
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id);
                }
              }}
              disabled={activeSection === sections[sections.length - 1].id}
            >
              Siguiente
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaBuilder;