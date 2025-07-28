import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-micro">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-card">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">IdeaFlow</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Bienvenido de vuelta
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Continúa validando tu idea de startup con metodología basada en evidencia
        </p>
      </div>

      {/* Value Proposition */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="flex flex-col items-center space-y-2 p-3 bg-card border border-border rounded-lg">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
          <span className="text-xs font-medium text-foreground">Validación</span>
          <span className="text-xs text-muted-foreground text-center">
            Basada en evidencia
          </span>
        </div>

        <div className="flex flex-col items-center space-y-2 p-3 bg-card border border-border rounded-lg">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-foreground">Enfoque</span>
          <span className="text-xs text-muted-foreground text-center">
            Metodología clara
          </span>
        </div>

        <div className="flex flex-col items-center space-y-2 p-3 bg-card border border-border rounded-lg">
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-warning" />
          </div>
          <span className="text-xs font-medium text-foreground">Crecimiento</span>
          <span className="text-xs text-muted-foreground text-center">
            Progreso medible
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;