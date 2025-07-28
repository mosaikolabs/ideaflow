import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const UserContextMenu = ({ user, userProfile, onSignOut, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const isFounder = userProfile?.role === 'founder';

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userProfile?.full_name || 'Usuario'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
            {isFounder && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                Fundador
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <Link
          to="/user-dashboard"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <Icon name="LayoutDashboard" size={16} className="mr-3 text-gray-400" />
          Mi Dashboard
        </Link>
        
        <Link
          to="/idea-submission-form"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <Icon name="Lightbulb" size={16} className="mr-3 text-gray-400" />
          Mi Idea
        </Link>

        <Link
          to="/buyer-persona-definition"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <Icon name="Users" size={16} className="mr-3 text-gray-400" />
          Buyer Persona
        </Link>

        <Link
          to="/evidence-collection-module"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onClose}
        >
          <Icon name="CheckCircle" size={16} className="mr-3 text-gray-400" />
          Validación
        </Link>

        {isFounder && (
          <>
            <div className="border-t border-gray-100 my-1"></div>
            <Link
              to="/founder-dashboard"
              className="flex items-center px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors"
              onClick={onClose}
            >
              <Icon name="Crown" size={16} className="mr-3 text-purple-500" />
              Panel del Fundador
            </Link>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-100 mt-1 pt-1">
        <button
          onClick={() => {
            onClose();
            // Handle profile edit
            alert('Funcionalidad de editar perfil próximamente');
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Icon name="Settings" size={16} className="mr-3 text-gray-400" />
          Configuración
        </button>
        
        <button
          onClick={() => {
            onClose();
            onSignOut();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <Icon name="LogOut" size={16} className="mr-3 text-red-500" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserContextMenu;