import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600',
      textColor: 'text-white'
    }
  ];

  const handleSocialRegister = async (provider) => {
    setLoadingProvider(provider.id);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const userData = {
        id: Date.now(),
        name: `Usuario ${provider.name}`,
        email: `usuario@${provider.id}.com`,
        provider: provider.id,
        registeredAt: new Date().toISOString()
      };

      if (onSocialRegister) {
        onSocialRegister(userData);
      }

    } catch (error) {
      console.error(`Error registering with ${provider.name}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Social Registration Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialRegister(provider)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            className="w-full flex items-center justify-center space-x-3 py-3"
          >
            <div className={`w-5 h-5 rounded ${provider.color} flex items-center justify-center`}>
              <Icon name={provider.icon} size={14} color="white" />
            </div>
            <span>
              {loadingProvider === provider.id 
                ? `Conectando con ${provider.name}...` 
                : `Continuar con ${provider.name}`
              }
            </span>
          </Button>
        ))}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continúa con email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;