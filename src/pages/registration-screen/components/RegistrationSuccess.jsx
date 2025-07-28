import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userData, onContinue }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 5 seconds if no action taken
    const timer = setTimeout(() => {
      handleContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    navigate('/user-dashboard', { 
      state: { 
        isNewUser: true, 
        welcomeMessage: `¡Bienvenido ${userData?.name}! Tu cuenta ha sido creada exitosamente.` 
      } 
    });
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Animation */}
      <div className="relative">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Check" size={32} color="white" />
          </div>
        </div>
        
        {/* Confetti Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce ml-2" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce ml-2" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          ¡Cuenta creada exitosamente!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Bienvenido a IdeaFlow, {userData?.name}. Tu viaje de validación de ideas comienza ahora.
        </p>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-foreground">
          Próximos pasos:
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
            <span className="text-sm text-foreground">
              Completa tu perfil en el dashboard
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">2</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Envía tu primera idea para validación
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">3</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Define tu buyer persona objetivo
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleContinue}
          className="w-full"
        >
          Ir a mi Dashboard
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Serás redirigido automáticamente en 5 segundos
        </p>
      </div>

      {/* Welcome Benefits */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">
            Validación Guiada
          </span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={16} className="text-secondary" />
          </div>
          <span className="text-xs text-muted-foreground">
            Comunidad
          </span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Rocket" size={16} className="text-accent" />
          </div>
          <span className="text-xs text-muted-foreground">
            MVP Roadmap
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;