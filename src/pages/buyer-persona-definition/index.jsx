import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import WorkflowNavigation from '../../components/ui/WorkflowNavigation';
import PersonaBuilder from './components/PersonaBuilder';
import PersonaPreview from './components/PersonaPreview';
import PersonaList from './components/PersonaList';
import ValidationGuidance from './components/ValidationGuidance';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BuyerPersonaDefinition = () => {
  const navigate = useNavigate();
  const [personas, setPersonas] = useState([]);
  const [activePersonaId, setActivePersonaId] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'builder', 'preview', 'guidance'
  const [userProgress, setUserProgress] = useState({
    dashboard: true,
    idea: true,
    persona: false,
    validation: false
  });

  // Mock data initialization
  useEffect(() => {
    const mockPersonas = [
      {
        id: 'persona-1',
        name: 'Ana Martínez',
        ageRange: '35-44',
        location: 'Madrid, España',
        jobTitle: 'Directora de Marketing',
        incomeLevel: 'medium-high',
        education: 'master',
        lifestyle: 'Profesional ocupada, orientada a resultados, valora la eficiencia',
        motivations: 'Crecimiento profesional, reconocimiento del equipo, impacto en la empresa',
        frustrations: 'Falta de tiempo, herramientas desintegradas, reportes manuales',
        values: 'Innovación, colaboración, excelencia',
        shortTermGoals: 'Automatizar procesos de marketing, mejorar ROI de campañas',
        longTermGoals: 'Liderar transformación digital del departamento',
        primaryPain: 'Dificultad para medir el ROI real de las campañas de marketing digital',
        secondaryPains: 'Reportes manuales consumen mucho tiempo, falta de integración entre herramientas',
        painImpact: 'Estrés, decisiones basadas en datos incompletos, pérdida de oportunidades',
        painIntensity: 8,
        currentSolutions: 'Google Analytics, Excel, herramientas básicas de email marketing',
        communicationChannels: ['email', 'video-call', 'messaging'],
        decisionProcess: 'Investiga exhaustivamente, consulta con el equipo, evalúa ROI',
        budget: '€2,000-5,000 por herramienta',
        decisionTime: '4-6 semanas',
        decisionInfluencers: 'Director General, equipo de marketing, departamento IT',
        informationSources: 'LinkedIn, blogs especializados, recomendaciones de colegas',
        isPrimary: true
      }
    ];

    const savedPersonas = localStorage.getItem('ideaflow-personas');
    if (savedPersonas) {
      setPersonas(JSON.parse(savedPersonas));
    } else {
      setPersonas(mockPersonas);
      localStorage.setItem('ideaflow-personas', JSON.stringify(mockPersonas));
    }

    // Set first persona as active if none selected
    if (mockPersonas.length > 0 && !activePersonaId) {
      setActivePersonaId(mockPersonas[0].id);
    }
  }, [activePersonaId]);

  // Save personas to localStorage whenever they change
  useEffect(() => {
    if (personas.length > 0) {
      localStorage.setItem('ideaflow-personas', JSON.stringify(personas));
      
      // Update progress based on persona completion
      const hasCompletedPersona = personas.some(persona => {
        const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
        return requiredFields.every(field => persona[field]);
      });
      
      if (hasCompletedPersona && !userProgress.persona) {
        const newProgress = { ...userProgress, persona: true };
        setUserProgress(newProgress);
        localStorage.setItem('ideaflow-user-progress', JSON.stringify(newProgress));
      }
    }
  }, [personas, userProgress]);

  const handlePersonaCreate = () => {
    const newPersona = {
      id: `persona-${Date.now()}`,
      name: '',
      ageRange: '',
      location: '',
      jobTitle: '',
      incomeLevel: '',
      education: '',
      lifestyle: '',
      motivations: '',
      frustrations: '',
      values: '',
      shortTermGoals: '',
      longTermGoals: '',
      primaryPain: '',
      secondaryPains: '',
      painImpact: '',
      painIntensity: 5,
      currentSolutions: '',
      communicationChannels: [],
      decisionProcess: '',
      budget: '',
      decisionTime: '',
      decisionInfluencers: '',
      informationSources: '',
      isPrimary: personas.length === 0
    };

    setPersonas([...personas, newPersona]);
    setActivePersonaId(newPersona.id);
    setCurrentView('builder');
  };

  const handlePersonaUpdate = (updatedPersona) => {
    setPersonas(personas.map(persona => 
      persona.id === updatedPersona.id ? updatedPersona : persona
    ));
  };

  const handlePersonaSelect = (personaId) => {
    setActivePersonaId(personaId);
    setCurrentView('builder');
  };

  const handlePersonaDelete = (personaId) => {
    const updatedPersonas = personas.filter(persona => persona.id !== personaId);
    setPersonas(updatedPersonas);
    
    if (activePersonaId === personaId) {
      setActivePersonaId(updatedPersonas.length > 0 ? updatedPersonas[0].id : null);
      setCurrentView(updatedPersonas.length > 0 ? 'builder' : 'list');
    }
  };

  const handlePersonaClone = (personaId) => {
    const personaToClone = personas.find(p => p.id === personaId);
    if (personaToClone) {
      const clonedPersona = {
        ...personaToClone,
        id: `persona-${Date.now()}`,
        name: `${personaToClone.name} (Copia)`,
        isPrimary: false
      };
      setPersonas([...personas, clonedPersona]);
      setActivePersonaId(clonedPersona.id);
      setCurrentView('builder');
    }
  };

  const handlePersonaExport = () => {
    const activePersona = personas.find(p => p.id === activePersonaId);
    if (activePersona) {
      const exportData = {
        persona: activePersona,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `buyer-persona-${activePersona.name.replace(/\s+/g, '-').toLowerCase()}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  };

  const handleStartValidation = () => {
    navigate('/evidence-collection-module');
  };

  const getActivePersona = () => {
    return personas.find(p => p.id === activePersonaId);
  };

  const getPersonaCompletionPercentage = () => {
    const activePersona = getActivePersona();
    if (!activePersona) return 0;

    const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
    const optionalFields = ['location', 'incomeLevel', 'education', 'motivations', 'frustrations'];
    
    const requiredCompleted = requiredFields.filter(field => activePersona[field]).length;
    const optionalCompleted = optionalFields.filter(field => activePersona[field]).length;
    
    return Math.round(
      (requiredCompleted / requiredFields.length) * 70 +
      (optionalCompleted / optionalFields.length) * 30
    );
  };

  const renderMainContent = () => {
    const activePersona = getActivePersona();

    switch (currentView) {
      case 'builder':
        return activePersona ? (
          <PersonaBuilder
            persona={activePersona}
            onPersonaUpdate={handlePersonaUpdate}
            isActive={true}
          />
        ) : null;

      case 'preview':
        return activePersona ? (
          <PersonaPreview
            persona={activePersona}
            onEdit={() => setCurrentView('builder')}
            onExport={handlePersonaExport}
          />
        ) : null;

      case 'guidance':
        return (
          <ValidationGuidance
            personas={personas}
            onStartValidation={handleStartValidation}
          />
        );

      default:
        return (
          <PersonaList
            personas={personas}
            activePersonaId={activePersonaId}
            onPersonaSelect={handlePersonaSelect}
            onPersonaCreate={handlePersonaCreate}
            onPersonaDelete={handlePersonaDelete}
            onPersonaClone={handlePersonaClone}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator 
        currentPhase="persona" 
        completionPercentage={getPersonaCompletionPercentage()} 
      />
      
      <div className="flex">
        <WorkflowNavigation userProgress={userProgress} />
        
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Definición de Buyer Persona
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Crea perfiles detallados de tus clientes ideales para una validación efectiva
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* View Toggle */}
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <Button
                      variant={currentView === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentView('list')}
                      className="h-8"
                    >
                      <Icon name="List" size={16} />
                    </Button>
                    <Button
                      variant={currentView === 'builder' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentView('builder')}
                      disabled={!activePersonaId}
                      className="h-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant={currentView === 'preview' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentView('preview')}
                      disabled={!activePersonaId}
                      className="h-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant={currentView === 'guidance' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentView('guidance')}
                      className="h-8"
                    >
                      <Icon name="Compass" size={16} />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  {currentView !== 'list' && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentView('list')}
                      className="flex items-center space-x-2"
                    >
                      <Icon name="ArrowLeft" size={16} />
                      <span>Volver a Lista</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Summary */}
              <div className="mt-4 flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>{personas.length} persona{personas.length !== 1 ? 's' : ''} creado{personas.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} />
                  <span>
                    {personas.filter(p => {
                      const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
                      return requiredFields.every(field => p[field]);
                    }).length} completo{personas.filter(p => {
                      const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
                      return requiredFields.every(field => p[field]);
                    }).length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} />
                  <span>Listo para validación: {personas.some(p => {
                    const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
                    return requiredFields.every(field => p[field]);
                  }) ? 'Sí' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                {renderMainContent()}
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Resumen Rápido
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Personas Totales</span>
                      <span className="text-lg font-bold text-foreground">{personas.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completados</span>
                      <span className="text-lg font-bold text-success">
                        {personas.filter(p => {
                          const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
                          return requiredFields.every(field => p[field]);
                        }).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progreso Actual</span>
                      <span className="text-lg font-bold text-primary">
                        {getPersonaCompletionPercentage()}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="Lightbulb" size={20} className="mr-2 text-warning" />
                    Consejos
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Define 1-3 personas principales para mantener el foco</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Basa los personas en investigación real, no en asunciones</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Incluye tanto aspectos demográficos como psicográficos</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Valida tus personas a través de entrevistas</span>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Navegación
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/idea-submission-form')}
                      className="w-full justify-start"
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Volver a Mi Idea
                    </Button>
                    <Button
                      variant="default"
                      onClick={handleStartValidation}
                      disabled={!personas.some(p => {
                        const requiredFields = ['name', 'ageRange', 'jobTitle', 'primaryPain'];
                        return requiredFields.every(field => p[field]);
                      })}
                      className="w-full justify-start"
                    >
                      <Icon name="ArrowRight" size={16} className="mr-2" />
                      Continuar a Validación
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerPersonaDefinition;