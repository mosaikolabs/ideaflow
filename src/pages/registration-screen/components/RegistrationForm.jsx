import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { signUp, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'El nombre completo es obligatorio';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, {
        full_name: formData.full_name,
        role: formData.role
      });
      
      if (result.success) {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.log('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
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

        {/* Full Name Input */}
        <div>
          <Input
            type="text"
            name="full_name"
            label="Nombre Completo"
            placeholder="Tu nombre completo"
            value={formData.full_name}
            onChange={handleInputChange}
            error={errors.full_name}
            required
            className="w-full"
          />
        </div>

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

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Usuario
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">Emprendedor (Usuario)</option>
            <option value="founder">Fundador del Sistema</option>
          </select>
        </div>

        {/* Password Input */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Confirmar Contraseña"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
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
          {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
        </Button>

        {/* Links */}
        <div className="text-center">
          <Link
            to="/login-screen"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-micro"
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;