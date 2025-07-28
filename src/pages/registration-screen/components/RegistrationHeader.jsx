import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/user-dashboard" className="inline-flex items-center space-x-2 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">IdeaFlow</span>
      </Link>

      {/* Header Content */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Crea tu cuenta
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Únete a miles de emprendedores que han validado sus ideas exitosamente con nuestra metodología probada
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-xs text-primary font-medium">Registro</span>
        </div>
        <div className="w-8 h-0.5 bg-border"></div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-border rounded-full"></div>
          <span className="text-xs text-muted-foreground">Dashboard</span>
        </div>
        <div className="w-8 h-0.5 bg-border"></div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-border rounded-full"></div>
          <span className="text-xs text-muted-foreground">Validación</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;