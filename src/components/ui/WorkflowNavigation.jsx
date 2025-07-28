import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WorkflowNavigation = ({ userProgress = {}, className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const workflowPhases = [
    {
      id: 'dashboard',
      name: 'Mi Dashboard',
      description: 'Centro de control y progreso',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      enabled: true,
      completed: userProgress.dashboard || false
    },
    {
      id: 'idea',
      name: 'Mi Idea',
      description: 'Definición y desarrollo de concepto',
      path: '/idea-submission-form',
      icon: 'Lightbulb',
      enabled: true,
      completed: userProgress.idea || false
    },
    {
      id: 'persona',
      name: 'Buyer Persona',
      description: 'Perfil de cliente objetivo',
      path: '/buyer-persona-definition',
      icon: 'Users',
      enabled: userProgress.idea || false,
      completed: userProgress.persona || false
    },
    {
      id: 'validation',
      name: 'Validación',
      description: 'Recolección de evidencia',
      path: '/evidence-collection-module',
      icon: 'CheckCircle',
      enabled: userProgress.persona || false,
      completed: userProgress.validation || false
    }
  ];

  const authPages = [
    {
      id: 'account',
      name: 'Mi Cuenta',
      description: 'Perfil y configuración',
      path: '/login-screen',
      icon: 'User',
      enabled: true
    },
    {
      id: 'register',
      name: 'Registro',
      description: 'Crear nueva cuenta',
      path: '/registration-screen',
      icon: 'UserPlus',
      enabled: true
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${className}`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-foreground">Flujo de Trabajo</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="h-8 w-8"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Workflow Phases */}
          <div className="p-2">
            {!isCollapsed && (
              <div className="px-2 py-1 mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Proceso de Validación
                </span>
              </div>
            )}
            
            <nav className="space-y-1">
              {workflowPhases.map((phase) => {
                const isActive = isActivePath(phase.path);
                const isEnabled = phase.enabled;
                
                return (
                  <div key={phase.id} className="relative">
                    {isEnabled ? (
                      <Link
                        to={phase.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-micro hover-lift group ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-6 h-6 rounded ${
                          phase.completed 
                            ? 'bg-success text-success-foreground' 
                            : isActive 
                            ? 'bg-primary-foreground text-primary' 
                            : 'bg-transparent'
                        }`}>
                          {phase.completed ? (
                            <Icon name="Check" size={14} />
                          ) : (
                            <Icon name={phase.icon} size={16} />
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate">{phase.name}</span>
                              {phase.completed && (
                                <Icon name="CheckCircle" size={14} className="text-success ml-2" />
                              )}
                            </div>
                            <p className="text-xs opacity-75 truncate">
                              {phase.description}
                            </p>
                          </div>
                        )}
                      </Link>
                    ) : (
                      <div className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed`}>
                        <div className="flex items-center justify-center w-6 h-6">
                          <Icon name={phase.icon} size={16} className="text-muted-foreground" />
                        </div>
                        
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate text-muted-foreground">{phase.name}</span>
                              <Icon name="Lock" size={14} className="text-muted-foreground ml-2" />
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              Completa la fase anterior
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Account Section */}
          <div className="p-2 border-t border-border mt-4">
            {!isCollapsed && (
              <div className="px-2 py-1 mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Cuenta
                </span>
              </div>
            )}
            
            <nav className="space-y-1">
              {authPages.map((page) => {
                const isActive = isActivePath(page.path);
                
                return (
                  <Link
                    key={page.id}
                    to={page.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-micro hover-lift ${
                      isActive
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={page.icon} size={16} />
                    
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="truncate">{page.name}</span>
                        <p className="text-xs opacity-75 truncate">
                          {page.description}
                        </p>
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">IdeaFlow v1.0</p>
              <p>Validación sistemática de ideas</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default WorkflowNavigation;