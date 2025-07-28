import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider.id);

    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      localStorage.setItem('ideaflow_user', JSON.stringify({
        email: `usuario@${provider.id}.com`,
        provider: provider.id,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      }));

      navigate('/user-dashboard');
    } catch (error) {
      console.error(`Error logging in with ${provider.name}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider)}
            loading={loadingProvider === provider.id}
            fullWidth
            className="h-12 border-2 hover:border-primary/50 transition-micro"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${provider.color}`}>
                <Icon name={provider.icon} size={14} className={provider.textColor} />
              </div>
              <span className="font-medium">
                {loadingProvider === provider.id 
                  ? `Conectando con ${provider.name}...` 
                  : `Continuar con ${provider.name}`
                }
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* Trust Signals */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Seguro</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>Privado</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;