import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const user = localStorage.getItem('ideaflow_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.isAuthenticated) {
          navigate('/user-dashboard');
        }
      } catch (error) {
        // Clear invalid user data
        localStorage.removeItem('ideaflow_user');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <LoginHeader />
            <div className="bg-card border border-border rounded-2xl shadow-card p-8">
              <LoginForm />
              <SocialLogin />
            </div>
            
            {/* Mobile Trust Indicators */}
            <div className="lg:hidden mt-6">
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-success/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  <span>2,500+ Ideas Validadas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span>89% Tasa de Éxito</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Signals (Desktop Only) */}
        <div className="hidden lg:flex lg:w-96 xl:w-1/3 items-center justify-center px-8 py-12 bg-muted/30">
          <TrustSignals />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} IdeaFlow. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-micro">
                Términos de Servicio
              </button>
              <button className="hover:text-foreground transition-micro">
                Política de Privacidad
              </button>
              <button className="hover:text-foreground transition-micro">
                Soporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;