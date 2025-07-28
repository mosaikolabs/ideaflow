import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import ValuePropositionSidebar from './components/ValuePropositionSidebar';
import RegistrationSuccess from './components/RegistrationSuccess';

const RegistrationScreen = () => {
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' | 'success'
  const [userData, setUserData] = useState(null);

  const handleRegistrationSuccess = (user) => {
    setUserData(user);
    setRegistrationStep('success');
  };

  const handleSocialRegister = (user) => {
    setUserData(user);
    setRegistrationStep('success');
  };

  const handleContinueToDashboard = () => {
    // This will be handled by the RegistrationSuccess component
    console.log('Continuing to dashboard with user:', userData);
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta - IdeaFlow | Plataforma de Validación de Ideas</title>
        <meta 
          name="description" 
          content="Únete a IdeaFlow y comienza a validar tus ideas de startup con metodología probada. Registro gratuito y acceso inmediato a herramientas de validación." 
        />
        <meta name="keywords" content="registro, crear cuenta, validación ideas, startup, emprendimiento, IdeaFlow" />
        <meta property="og:title" content="Crear Cuenta - IdeaFlow" />
        <meta property="og:description" content="Únete a miles de emprendedores exitosos. Crea tu cuenta gratuita y valida tus ideas con metodología probada." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/registration-screen" />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Value Proposition Sidebar - Desktop Only */}
        <ValuePropositionSidebar />

        {/* Main Registration Content */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {registrationStep === 'form' ? (
              <div className="space-y-8">
                {/* Header */}
                <RegistrationHeader />

                {/* Social Registration */}
                <SocialRegistration onSocialRegister={handleSocialRegister} />

                {/* Registration Form */}
                <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
              </div>
            ) : (
              <RegistrationSuccess 
                userData={userData}
                onContinue={handleContinueToDashboard}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Value Proposition - Bottom Sheet Style */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                Validación Probada
              </div>
              <div className="text-xs text-muted-foreground">
                78% de tasa de éxito
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-primary">2,500+</div>
            <div className="text-xs text-muted-foreground">Ideas validadas</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationScreen;