import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import IdeaTitleSection from './components/IdeaTitleSection';
import ProblemDescriptionSection from './components/ProblemDescriptionSection';
import SolutionSection from './components/SolutionSection';
import TargetMarketSection from './components/TargetMarketSection';
import FormProgressBar from './components/FormProgressBar';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import FormValidationSummary from './components/FormValidationSummary';

const IdeaSubmissionForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    problemDescription: '',
    solution: '',
    targetMarket: {
      primarySegment: '',
      ageRange: '',
      location: '',
      industry: '',
      painPoints: [],
      marketSize: ''
    }
  });

  // UI state
  const [expandedSections, setExpandedSections] = useState({
    title: true,
    problem: false,
    solution: false,
    market: false
  });

  const [validationResults, setValidationResults] = useState({
    title: { isValid: false, score: 0, feedback: '' },
    problem: { isValid: false, score: 0, feedback: '' },
    solution: { isValid: false, score: 0, feedback: '' },
    market: { isValid: false, score: 0, feedback: '' }
  });

  const [autoSaveState, setAutoSaveState] = useState({
    lastSaved: null,
    isSaving: false,
    hasUnsavedChanges: false
  });

  const [showValidationSummary, setShowValidationSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ideaFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        setAutoSaveState(prev => ({
          ...prev,
          lastSaved: new Date(localStorage.getItem('ideaFormLastSaved') || Date.now())
        }));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (autoSaveState.hasUnsavedChanges) {
        handleAutoSave();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [formData, autoSaveState.hasUnsavedChanges]);

  // Validation logic
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleAutoSave = async () => {
    setAutoSaveState(prev => ({ ...prev, isSaving: true }));
    
    try {
      localStorage.setItem('ideaFormData', JSON.stringify(formData));
      localStorage.setItem('ideaFormLastSaved', new Date().toISOString());
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAutoSaveState(prev => ({
        ...prev,
        isSaving: false,
        hasUnsavedChanges: false,
        lastSaved: new Date()
      }));
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const validateForm = () => {
    const results = {
      title: validateTitle(formData.title),
      problem: validateProblem(formData.problemDescription),
      solution: validateSolution(formData.solution),
      market: validateMarket(formData.targetMarket)
    };
    
    setValidationResults(results);
  };

  const validateTitle = (title) => {
    if (!title.trim()) {
      return { isValid: false, score: 0, feedback: 'El título es obligatorio' };
    }
    if (title.length < 5) {
      return { isValid: false, score: 25, feedback: 'El título es muy corto' };
    }
    if (title.length > 100) {
      return { isValid: false, score: 50, feedback: 'El título es muy largo' };
    }
    
    const score = Math.min(100, (title.length / 50) * 100);
    return { 
      isValid: true, 
      score, 
      feedback: 'Título bien estructurado' 
    };
  };

  const validateProblem = (problem) => {
    if (!problem.trim()) {
      return { isValid: false, score: 0, feedback: 'La descripción del problema es obligatoria' };
    }
    if (problem.length < 100) {
      return { isValid: false, score: 30, feedback: 'Describe el problema con más detalle' };
    }
    
    const score = Math.min(100, (problem.length / 500) * 100);
    return { 
      isValid: true, 
      score, 
      feedback: 'Problema bien definido' 
    };
  };

  const validateSolution = (solution) => {
    if (!solution.trim()) {
      return { isValid: false, score: 0, feedback: 'La descripción de la solución es obligatoria' };
    }
    if (solution.length < 100) {
      return { isValid: false, score: 30, feedback: 'Explica tu solución con más detalle' };
    }
    
    const score = Math.min(100, (solution.length / 400) * 100);
    return { 
      isValid: true, 
      score, 
      feedback: 'Solución bien explicada' 
    };
  };

  const validateMarket = (market) => {
    const requiredFields = ['primarySegment', 'location', 'industry'];
    const completedFields = requiredFields.filter(field => market[field]).length;
    
    if (completedFields === 0) {
      return { isValid: false, score: 0, feedback: 'Define tu mercado objetivo' };
    }
    
    const score = (completedFields / requiredFields.length) * 100;
    return { 
      isValid: completedFields === requiredFields.length, 
      score, 
      feedback: `${completedFields}/${requiredFields.length} campos completados` 
    };
  };

  const getOverallScore = () => {
    const scores = Object.values(validationResults).map(result => result.score);
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  const getCompletionPercentage = () => {
    const validSections = Object.values(validationResults).filter(result => result.isValid).length;
    return (validSections / 4) * 100;
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setAutoSaveState(prev => ({ ...prev, hasUnsavedChanges: true }));
  };

  const handleTargetMarketChange = (targetMarket) => {
    setFormData(prev => ({
      ...prev,
      targetMarket
    }));
    setAutoSaveState(prev => ({ ...prev, hasUnsavedChanges: true }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSectionFocus = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: true
    }));
    
    // Scroll to section
    setTimeout(() => {
      const element = document.getElementById(`section-${section}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async () => {
    const overallScore = getOverallScore();
    
    if (overallScore < 60) {
      setShowValidationSummary(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved data
      localStorage.removeItem('ideaFormData');
      localStorage.removeItem('ideaFormLastSaved');
      
      // Navigate to next step
      navigate('/buyer-persona-definition', {
        state: { ideaData: formData }
      });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const overallScore = getOverallScore();
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator currentPhase="idea" completionPercentage={Math.round(completionPercentage)} />
      
      <div className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Link to="/user-dashboard" className="hover:text-foreground transition-micro">
                Dashboard
              </Link>
              <Icon name="ChevronRight" size={14} />
              <span>Nueva Idea</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Formulario de Idea
            </h1>
            <p className="text-lg text-muted-foreground">
              Describe tu idea de startup para comenzar el proceso de validación
            </p>
          </div>

          {/* Form Progress */}
          <FormProgressBar
            currentStep={1}
            totalSteps={4}
            completionPercentage={completionPercentage}
            sectionStatus={{
              title: validationResults.title.isValid,
              problem: validationResults.problem.isValid,
              solution: validationResults.solution.isValid,
              market: validationResults.market.isValid
            }}
          />

          {/* Auto-save Indicator */}
          <div className="mb-6">
            <AutoSaveIndicator
              lastSaved={autoSaveState.lastSaved}
              isSaving={autoSaveState.isSaving}
              hasUnsavedChanges={autoSaveState.hasUnsavedChanges}
              onManualSave={handleAutoSave}
            />
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {/* Title Section */}
            <div id="section-title">
              <IdeaTitleSection
                title={formData.title}
                onTitleChange={(title) => handleFieldChange('title', title)}
                error={!validationResults.title.isValid ? validationResults.title.feedback : ''}
                isExpanded={expandedSections.title}
                onToggle={() => toggleSection('title')}
              />
            </div>

            {/* Problem Section */}
            <div id="section-problem">
              <ProblemDescriptionSection
                description={formData.problemDescription}
                onDescriptionChange={(description) => handleFieldChange('problemDescription', description)}
                error={!validationResults.problem.isValid ? validationResults.problem.feedback : ''}
                isExpanded={expandedSections.problem}
                onToggle={() => toggleSection('problem')}
              />
            </div>

            {/* Solution Section */}
            <div id="section-solution">
              <SolutionSection
                solution={formData.solution}
                onSolutionChange={(solution) => handleFieldChange('solution', solution)}
                error={!validationResults.solution.isValid ? validationResults.solution.feedback : ''}
                isExpanded={expandedSections.solution}
                onToggle={() => toggleSection('solution')}
              />
            </div>

            {/* Target Market Section */}
            <div id="section-market">
              <TargetMarketSection
                targetMarket={formData.targetMarket}
                onTargetMarketChange={handleTargetMarketChange}
                error={!validationResults.market.isValid ? validationResults.market.feedback : ''}
                isExpanded={expandedSections.market}
                onToggle={() => toggleSection('market')}
              />
            </div>
          </div>

          {/* Validation Summary */}
          {showValidationSummary && (
            <div className="mt-8">
              <FormValidationSummary
                validationResults={validationResults}
                overallScore={overallScore}
                onSectionFocus={handleSectionFocus}
                isVisible={showValidationSummary}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/user-dashboard">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Volver al Dashboard
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setShowValidationSummary(!showValidationSummary)}
              >
                <Icon name="BarChart3" size={16} className="mr-2" />
                Ver Análisis
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Puntuación: <span className="font-mono font-semibold">{Math.round(overallScore)}%</span>
              </div>
              
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={overallScore < 60}
              >
                <Icon name="Send" size={16} className="mr-2" />
                {overallScore >= 60 ? 'Enviar Idea' : 'Completar Formulario'}
              </Button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Completa cada sección con la mayor precisión posible. Una idea bien definida es el primer paso hacia una validación exitosa.
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>💡 Sé específico en tus descripciones</span>
                  <span>•</span>
                  <span>🎯 Define claramente tu mercado objetivo</span>
                  <span>•</span>
                  <span>💾 Tus cambios se guardan automáticamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmissionForm;