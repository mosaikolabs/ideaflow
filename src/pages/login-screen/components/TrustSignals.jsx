import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Fundadora de TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      quote: "IdeaFlow me ayudó a validar mi idea antes de invertir tiempo y dinero. Ahora tengo una startup exitosa.",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      role: "CEO de InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      quote: "La metodología basada en evidencia cambió completamente mi enfoque emprendedor.",
      rating: 5
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Emprendedora Digital",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      quote: "Evité errores costosos gracias a la validación sistemática de IdeaFlow.",
      rating: 5
    }
  ];

  const securityFeatures = [
    {
      icon: "Shield",
      title: "Datos Seguros",
      description: "Encriptación de extremo a extremo"
    },
    {
      icon: "Lock",
      title: "Privacidad",
      description: "Tu información está protegida"
    },
    {
      icon: "Award",
      title: "Certificado",
      description: "Metodología validada por expertos"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Ideas Validadas" },
    { number: "89%", label: "Tasa de Éxito" },
    { number: "150+", label: "Startups Lanzadas" }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md space-y-8">
      {/* Statistics */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Resultados Comprobados
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Lo que dicen nuestros usuarios
        </h3>
        <div className="space-y-4">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div key={testimonial.id} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-success" />
          Seguridad y Confianza
        </h3>
        <div className="space-y-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={14} className="text-success" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  {feature.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;