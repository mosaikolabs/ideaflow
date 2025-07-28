import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceSuggestions = ({ className = '' }) => {
  const resources = [
    {
      id: 1,
      name: 'Figma',
      description: 'Diseña prototipos y wireframes para tu MVP',
      category: 'Diseño',
      url: 'https://figma.com',
      icon: 'Palette',
      color: 'bg-pink-50 border-pink-200 text-pink-600',
      recommended: true
    },
    {
      id: 2,
      name: 'Bubble',
      description: 'Crea tu aplicación sin código',
      category: 'Desarrollo',
      url: 'https://bubble.io',
      icon: 'Code',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      recommended: true
    },
    {
      id: 3,
      name: 'Carrd',
      description: 'Landing pages simples y efectivas',
      category: 'Marketing',
      url: 'https://carrd.co',
      icon: 'Globe',
      color: 'bg-green-50 border-green-200 text-green-600',
      recommended: false
    },
    {
      id: 4,
      name: 'Stripe',
      description: 'Procesa pagos y valida demanda',
      category: 'Pagos',
      url: 'https://stripe.com',
      icon: 'CreditCard',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
      recommended: true
    },
    {
      id: 5,
      name: 'Product Hunt',
      description: 'Lanza y promociona tu producto',
      category: 'Lanzamiento',
      url: 'https://producthunt.com',
      icon: 'Rocket',
      color: 'bg-orange-50 border-orange-200 text-orange-600',
      recommended: false
    },
    {
      id: 6,
      name: 'Typeform',
      description: 'Crea encuestas para validar tu idea',
      category: 'Investigación',
      url: 'https://typeform.com',
      icon: 'FileQuestion',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600',
      recommended: true
    }
  ];

  const recommendedResources = resources.filter(resource => resource.recommended);
  const otherResources = resources.filter(resource => !resource.recommended);

  const handleResourceClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recursos Recomendados
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Herramientas para acelerar tu desarrollo
            </p>
          </div>
          <Icon name="ExternalLink" size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Star" size={16} className="text-yellow-500" />
          <span className="text-sm font-medium text-gray-900">Recomendados para ti</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {recommendedResources.map((resource) => (
            <div
              key={resource.id}
              className={`${resource.color.split(' ')[0]} ${resource.color.split(' ')[1]} border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105`}
              onClick={() => handleResourceClick(resource.url)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center`}>
                  <Icon name={resource.icon} size={16} className={resource.color.split(' ')[2]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {resource.name}
                    </h4>
                    <Icon name="ExternalLink" size={12} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block bg-white bg-opacity-80 text-xs font-medium px-2 py-1 rounded-full text-gray-700">
                      {resource.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Resources */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">Otros recursos útiles</span>
            <Button variant="ghost" className="text-xs">
              Ver todos
              <Icon name="ArrowRight" size={12} className="ml-1" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {otherResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => handleResourceClick(resource.url)}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center ${resource.color.split(' ')[0]}`}>
                  <Icon name={resource.icon} size={12} className={resource.color.split(' ')[2]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{resource.name}</span>
                    <Icon name="ExternalLink" size={12} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {resource.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSuggestions;