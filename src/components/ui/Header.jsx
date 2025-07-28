import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import UserContextMenu from './UserContextMenu';

const Header = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login-screen');
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  const isFounder = userProfile?.role === 'founder';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IdeaFlow</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/user-dashboard"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/idea-submission-form"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Mi Idea
              </Link>
              <Link
                to="/evidence-collection-module"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Validación
              </Link>
              {isFounder && (
                <Link
                  to="/founder-dashboard"
                  className="text-purple-700 hover:text-purple-800 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Panel Fundador
                </Link>
              )}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {userProfile?.full_name || 'Usuario'}
                    </span>
                    <Icon name="ChevronDown" size={16} />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <UserContextMenu
                      user={user}
                      userProfile={userProfile}
                      onSignOut={handleSignOut}
                      onClose={() => setShowUserMenu(false)}
                    />
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="Menu" size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login-screen">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/registration-screen">
                  <Button variant="default" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && user && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link
                to="/user-dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/idea-submission-form"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Mi Idea
              </Link>
              <Link
                to="/evidence-collection-module"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Validación
              </Link>
              {isFounder && (
                <Link
                  to="/founder-dashboard"
                  className="block px-3 py-2 text-base font-medium text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Panel Fundador
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;