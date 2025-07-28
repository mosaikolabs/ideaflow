import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import WorkflowNavigation from '../../components/ui/WorkflowNavigation';
import ValidationStatusWidget from '../../components/ui/ValidationStatusWidget';
import InterviewSection from './components/InterviewSection';
import SurveySection from './components/SurveySection';
import SecondaryResearchSection from './components/SecondaryResearchSection';
import ValidationSummary from './components/ValidationSummary';

const EvidenceCollectionModule = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  const [interviews, setInterviews] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [research, setResearch] = useState([]);
  const [validationScore, setValidationScore] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock user progress
  const userProgress = {
    dashboard: true,
    idea: true,
    persona: true,
    validation: false
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedInterviews = localStorage.getItem('ideaflow_interviews');
    const savedSurveys = localStorage.getItem('ideaflow_surveys');
    const savedResearch = localStorage.getItem('ideaflow_research');

    if (savedInterviews) setInterviews(JSON.parse(savedInterviews));
    if (savedSurveys) setSurveys(JSON.parse(savedSurveys));
    if (savedResearch) setResearch(JSON.parse(savedResearch));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ideaflow_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem('ideaflow_surveys', JSON.stringify(surveys));
  }, [surveys]);

  useEffect(() => {
    localStorage.setItem('ideaflow_research', JSON.stringify(research));
  }, [research]);

  // Calculate validation score whenever data changes
  useEffect(() => {
    const calculateScore = () => {
      let totalScore = 0;
      let weightedSum = 0;

      if (interviews.length > 0) {
        const interviewScore = interviews.reduce((sum, interview) => sum + interview.validationScore, 0) / interviews.length;
        weightedSum += interviewScore * 0.4;
        totalScore += 0.4;
      }

      if (surveys.length > 0) {
        const surveyScore = surveys.reduce((sum, survey) => sum + survey.responseRate, 0) / surveys.length;
        weightedSum += surveyScore * 0.35;
        totalScore += 0.35;
      }

      if (research.length > 0) {
        const researchScore = research.reduce((sum, item) => sum + (item.overallScore * 10), 0) / research.length;
        weightedSum += researchScore * 0.25;
        totalScore += 0.25;
      }

      return totalScore > 0 ? Math.round(weightedSum / totalScore) : 0;
    };

    setValidationScore(calculateScore());
  }, [interviews, surveys, research]);

  // Event handlers
  const handleAddInterview = (interview) => {
    setInterviews(prev => [...prev, interview]);
  };

  const handleUpdateInterview = (id, updatedInterview) => {
    setInterviews(prev => prev.map(interview => 
      interview.id === id ? { ...interview, ...updatedInterview } : interview
    ));
  };

  const handleDeleteInterview = (id) => {
    setInterviews(prev => prev.filter(interview => interview.id !== id));
  };

  const handleAddSurvey = (survey) => {
    setSurveys(prev => [...prev, survey]);
  };

  const handleUpdateSurvey = (id, updatedSurvey) => {
    setSurveys(prev => prev.map(survey => 
      survey.id === id ? { ...survey, ...updatedSurvey } : survey
    ));
  };

  const handleDeleteSurvey = (id) => {
    setSurveys(prev => prev.filter(survey => survey.id !== id));
  };

  const handleAddResearch = (researchItem) => {
    setResearch(prev => [...prev, researchItem]);
  };

  const handleUpdateResearch = (id, updatedResearch) => {
    setResearch(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedResearch } : item
    ));
  };

  const handleDeleteResearch = (id) => {
    setResearch(prev => prev.filter(item => item.id !== id));
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      validationScore,
      interviews: interviews.length,
      surveys: surveys.length,
      research: research.length,
      totalResponses: surveys.reduce((sum, survey) => sum + survey.totalResponses, 0),
      data: { interviews, surveys, research }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ideaflow-validation-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'interviews', name: 'Entrevistas', icon: 'MessageSquare', count: interviews.length },
    { id: 'surveys', name: 'Encuestas', icon: 'BarChart3', count: surveys.length },
    { id: 'research', name: 'Investigación', icon: 'FileSearch', count: research.length },
    { id: 'summary', name: 'Resumen', icon: 'Target', count: null }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'interviews':
        return (
          <InterviewSection
            interviews={interviews}
            onAddInterview={handleAddInterview}
            onUpdateInterview={handleUpdateInterview}
            onDeleteInterview={handleDeleteInterview}
          />
        );
      case 'surveys':
        return (
          <SurveySection
            surveys={surveys}
            onAddSurvey={handleAddSurvey}
            onUpdateSurvey={handleUpdateSurvey}
            onDeleteSurvey={handleDeleteSurvey}
          />
        );
      case 'research':
        return (
          <SecondaryResearchSection
            research={research}
            onAddResearch={handleAddResearch}
            onUpdateResearch={handleUpdateResearch}
            onDeleteResearch={handleDeleteResearch}
          />
        );
      case 'summary':
        return (
          <ValidationSummary
            interviews={interviews}
            surveys={surveys}
            research={research}
            onExportReport={handleExportReport}
          />
        );
      default:
        return null;
    }
  };

  const completionPercentage = Math.round(((interviews.length > 0 ? 25 : 0) + 
    (surveys.length > 0 ? 25 : 0) + 
    (research.length > 0 ? 25 : 0) + 
    (validationScore > 0 ? 25 : 0)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator currentPhase="validation" completionPercentage={completionPercentage} />
      
      <div className="flex">
        <WorkflowNavigation userProgress={userProgress} className="hidden lg:block" />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Recolección de Evidencia
                </h1>
                <p className="text-muted-foreground">
                  Valida tu idea con datos cualitativos y cuantitativos
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <ValidationStatusWidget 
                  confidenceScore={validationScore}
                  currentPhase="validation"
                  isCondensed={true}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden"
                  iconName="Menu"
                  iconPosition="left"
                >
                  Menú
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden bg-card border border-border rounded-lg p-4 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Navegación</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/user-dashboard"
                    className="flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted transition-micro"
                  >
                    <Icon name="LayoutDashboard" size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/idea-submission-form"
                    className="flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted transition-micro"
                  >
                    <Icon name="Lightbulb" size={16} />
                    <span>Mi Idea</span>
                  </Link>
                  <Link
                    to="/buyer-persona-definition"
                    className="flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted transition-micro"
                  >
                    <Icon name="Users" size={16} />
                    <span>Buyer Persona</span>
                  </Link>
                  <Link
                    to="/login-screen"
                    className="flex items-center space-x-2 p-2 rounded-md text-sm hover:bg-muted transition-micro"
                  >
                    <Icon name="User" size={16} />
                    <span>Mi Cuenta</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg shadow-card">
              <div className="border-b border-border">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.name}</span>
                      {tab.count !== null && (
                        <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {getTabContent()}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Progreso de Validación
                </h3>
                <span className="text-sm text-muted-foreground">
                  {completionPercentage}% completado
                </span>
              </div>
              
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{interviews.length}</div>
                  <div className="text-sm text-muted-foreground">Entrevistas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{surveys.length}</div>
                  <div className="text-sm text-muted-foreground">Encuestas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{research.length}</div>
                  <div className="text-sm text-muted-foreground">Investigación</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{validationScore}%</div>
                  <div className="text-sm text-muted-foreground">Confianza</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Icon name="ArrowRight" size={20} className="mr-2 text-primary" />
                  Próximos Pasos
                </h3>
                {validationScore >= 70 && (
                  <Link to="/user-dashboard">
                    <Button variant="default" iconName="ArrowRight" iconPosition="right">
                      Continuar al Dashboard
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Recomendaciones Actuales:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {interviews.length < 5 && (
                      <li>• Realiza al menos 5 entrevistas de problema</li>
                    )}
                    {surveys.reduce((sum, s) => sum + s.totalResponses, 0) < 100 && (
                      <li>• Recolecta al menos 100 respuestas de encuesta</li>
                    )}
                    {research.length < 3 && (
                      <li>• Incluye al menos 3 fuentes de investigación</li>
                    )}
                    {validationScore >= 70 && (
                      <li>• ¡Listo para proceder con el desarrollo de MVP!</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Recursos Útiles:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Guía de entrevistas de problema</li>
                    <li>• Plantillas de encuestas de validación</li>
                    <li>• Fuentes de investigación de mercado</li>
                    <li>• Herramientas de análisis de datos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EvidenceCollectionModule;