import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import WorkflowNavigation from '../../components/ui/WorkflowNavigation';
import ValidationStatusCard from './components/ValidationStatusCard';
import ValidationPhaseCard from './components/ValidationPhaseCard';
import QuickAccessTile from './components/QuickAccessTile';
import RecentActivityList from './components/RecentActivityList';
import ResourceSuggestions from './components/ResourceSuggestions';
import ProgressChart from './components/ProgressChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserDashboard = () => {
  const [userProgress, setUserProgress] = useState({
    dashboard: true,
    idea: true,
    persona: false,
    validation: false
  });

  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock user data
  const userData = {
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: new Date('2024-01-15'),
    currentIdea: 'Plataforma de Gestión Sostenible',
    confidenceScore: 45,
    currentPhase: 'persona'
  };

  // Validation phases data
  const validationPhases = [
    {
      phase: 'evidence',
      title: 'Recolección de Evidencia',
      description: 'Entrevistas y datos de validación',
      progress: 30,
      metrics: {
        entrevistas: 8,
        encuestas: 45
      },
      actionText: 'Continuar Recolectando',
      actionPath: '/evidence-collection-module',
      isCompleted: false,
      isLocked: false
    },
    {
      phase: 'survey',
      title: 'Análisis de Mercado',
      description: 'Encuestas y estudios de mercado',
      progress: 60,
      metrics: {
        respuestas: 127,
        tasa_conversion: '12%'
      },
      actionText: 'Ver Análisis',
      actionPath: '/evidence-collection-module',
      isCompleted: false,
      isLocked: false
    },
    {
      phase: 'mvp',
      title: 'Hoja de Ruta MVP',
      description: 'Planificación del producto mínimo viable',
      progress: 10,
      metrics: {
        tareas: 24,
        completadas: 3
      },
      actionText: 'Comenzar MVP',
      actionPath: '/evidence-collection-module',
      isCompleted: false,
      isLocked: true
    }
  ];

  // Quick access tiles data
  const quickAccessTiles = [
    {
      title: 'Mi Idea',
      description: 'Define y refina tu concepto de negocio',
      icon: 'Lightbulb',
      path: '/idea-submission-form',
      color: 'blue',
      isNew: false
    },
    {
      title: 'Buyer Persona',
      description: 'Crea el perfil de tu cliente ideal',
      icon: 'Users',
      path: '/buyer-persona-definition',
      color: 'purple',
      isNew: true
    },
    {
      title: 'Validación',
      description: 'Recolecta evidencia y valida tu mercado',
      icon: 'CheckCircle',
      path: '/evidence-collection-module',
      color: 'green',
      isNew: false
    },
    {
      title: 'Mi Cuenta',
      description: 'Gestiona tu perfil y configuración',
      icon: 'User',
      path: '/login-screen',
      color: 'indigo',
      isNew: false
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('ideaflow_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('ideaflow_language', language);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mi Dashboard - IdeaFlow</title>
        <meta name="description" content="Centro de control para validar y desarrollar tu idea de startup con IdeaFlow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        
        {/* Progress Indicator */}
        <ProgressIndicator 
          currentPhase="dashboard" 
          completionPercentage={45}
        />

        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block">
            <WorkflowNavigation userProgress={userProgress} />
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 p-4 lg:p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    ¡Hola, {userData.name}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Bienvenida a tu centro de validación de ideas
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                  <Button variant="outline" className="hidden sm:flex">
                    <Icon name="Download" size={16} className="mr-2" />
                    Exportar Progreso
                  </Button>
                  <Button variant="default">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Nueva Idea
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Idea Status */}
            <div className="mb-8">
              <ValidationStatusCard
                confidenceScore={userData.confidenceScore}
                currentPhase={userData.currentPhase}
                nextAction="Completa la definición de tu buyer persona para mejorar tu puntuación"
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 mb-8">
              {/* Left Column - Progress Chart */}
              <div className="lg:col-span-2">
                <ProgressChart type="bar" className="mb-6" />
                
                {/* Validation Phases */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {validationPhases.map((phase, index) => (
                    <ValidationPhaseCard
                      key={index}
                      {...phase}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <ProgressChart type="pie" />
                <RecentActivityList />
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden space-y-6 mb-8">
              {/* Progress Overview */}
              <ProgressChart type="pie" />
              
              {/* Validation Phases */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Fases de Validación</h2>
                {validationPhases.map((phase, index) => (
                  <ValidationPhaseCard
                    key={index}
                    {...phase}
                  />
                ))}
              </div>

              {/* Recent Activity */}
              <RecentActivityList />
            </div>

            {/* Quick Access Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Acceso Rápido
                </h2>
                <Button variant="ghost" className="text-sm">
                  Ver todos
                  <Icon name="ArrowRight" size={14} className="ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessTiles.map((tile, index) => (
                  <QuickAccessTile
                    key={index}
                    {...tile}
                  />
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <ResourceSuggestions />

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden fixed bottom-6 right-6">
              <Button
                variant="default"
                size="icon"
                className="w-14 h-14 rounded-full shadow-lg"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </main>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Navegación</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>
              <WorkflowNavigation 
                userProgress={userProgress} 
                className="relative w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDashboard;