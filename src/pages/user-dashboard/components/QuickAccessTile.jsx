import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTile = ({ 
  title,
  description,
  icon,
  path,
  color = 'blue',
  isNew = false,
  className = ''
}) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        hover: 'hover:bg-blue-100'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-100 text-green-600',
        hover: 'hover:bg-green-100'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        hover: 'hover:bg-purple-100'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'bg-orange-100 text-orange-600',
        hover: 'hover:bg-orange-100'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        icon: 'bg-indigo-100 text-indigo-600',
        hover: 'hover:bg-indigo-100'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <Link 
      to={path}
      className={`block ${colorClasses.bg} ${colorClasses.border} border rounded-lg p-6 transition-all duration-200 ${colorClasses.hover} hover:shadow-md hover:scale-105 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses.icon}`}>
          <Icon name={icon} size={24} />
        </div>
        {isNew && (
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            Nuevo
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="mt-4 flex items-center text-sm font-medium text-gray-700">
        <span>Acceder</span>
        <Icon name="ArrowRight" size={16} className="ml-2" />
      </div>
    </Link>
  );
};

export default QuickAccessTile;