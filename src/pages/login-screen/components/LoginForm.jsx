import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    clearError();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        // Navigation will be handled by AuthContext/auth state change
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Demo Credentials */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Credenciales de Demostración</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <div><strong>Usuario:</strong> emprendedor@ideaflow.com | Emprender2024!</div>
          <div><strong>Fundador:</strong> fundador@ideaflow.com | Fundador2024!</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Auth Error Message from Context */}
        {authError && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error font-medium">
                {authError}
              </span>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            className="w-full"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Links */}
        <div className="space-y-3 text-center">
          <Link
            to="/registration-screen"
            className="block text-sm text-primary hover:text-primary/80 font-medium transition-micro"
          >
            ¿No tienes cuenta? Crear Cuenta
          </Link>
          
          <button
            type="button"
            className="block w-full text-sm text-muted-foreground hover:text-foreground transition-micro"
            onClick={() => {
              alert('Funcionalidad de recuperación de contraseña próximamente');
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;