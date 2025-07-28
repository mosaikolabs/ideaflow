import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ValuePropositionSidebar = () => {
  const features = [
    {
      icon: 'Target',
      title: 'Validación Basada en Evidencia',
      description: 'Metodología probada para validar ideas con datos reales del mercado'
    },
    {
      icon: 'Users',
      title: 'Definición de Buyer Persona',
      description: 'Herramientas para identificar y entender a tu cliente ideal'
    },
    {
      icon: 'TrendingUp',
      title: 'Scoring de Confianza',
      description: 'Algoritmo que evalúa la viabilidad de tu idea en tiempo real'
    },
    {
      icon: 'Rocket',
      title: 'Roadmap de MVP',
      description: 'Plan estructurado en 7 fases para llevar tu idea al mercado'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Fundadora de TechSalud',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      quote: 'IdeaFlow me ayudó a validar mi startup de salud digital antes de invertir tiempo y dinero. Ahora tengo 500+ usuarios activos.'
    },
    {
      name: 'Carlos Ruiz',
      role: 'CEO de EduTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      quote: 'La metodología de validación me permitió pivotar mi idea inicial y encontrar un mercado real con demanda comprobada.'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Ideas Validadas' },
    { number: '78%', label: 'Tasa de Éxito' },
    { number: '45 días', label: 'Tiempo Promedio' }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex-col justify-center">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
            <Icon name="Zap" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Únete a Emprendedores Exitosos
          </h2>
          <p className="text-muted-foreground">
            Valida tu idea con metodología probada y datos reales
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-card">
                <Icon name={feature.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4 text-center">
            Resultados Comprobados
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-card">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-2">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-medium text-foreground text-xs">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">
              Datos seguros y encriptados
            </span>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              Acceso inmediato tras registro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuePropositionSidebar;