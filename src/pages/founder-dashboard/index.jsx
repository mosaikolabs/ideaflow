import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import founderService from '../../utils/founderService';
import SystemMetricsCard from './components/SystemMetricsCard';
import UserActivityTable from './components/UserActivityTable';
import IdeaOverviewTable from './components/IdeaOverviewTable';
import TaskPhaseManager from './components/TaskPhaseManager';

const FounderDashboard = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect non-founders
  useEffect(() => {
    if (!authLoading && userProfile?.role !== 'founder') {
      navigate('/user-dashboard');
    }
  }, [userProfile, authLoading, navigate]);

  // Load data
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!userProfile?.role === 'founder') return;

      setLoading(true);
      setError(null);

      try {
        const [metricsResult, usersResult, ideasResult] = await Promise.all([
          founderService.getSystemAnalytics(),
          founderService.getAllUsers(),
          founderService.getAllIdeas()
        ]);

        if (metricsResult.success) {
          setSystemMetrics(metricsResult.data);
        } else {
          setError(metricsResult.error);
        }

        if (usersResult.success) {
          setUsers(usersResult.data);
        }

        if (ideasResult.success) {
          setIdeas(ideasResult.data);
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.log('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [userProfile]);

  const handleRefreshAnalytics = async () => {
    setLoading(true);
    try {
      await founderService.refreshSystemAnalytics();
      const metricsResult = await founderService.getSystemAnalytics();
      if (metricsResult.success) {
        setSystemMetrics(metricsResult.data);
      }
    } catch (err) {
      setError('Failed to refresh analytics');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel de control...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de Conexión</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: 'BarChart3' },
    { id: 'users', name: 'Usuarios', icon: 'Users' },
    { id: 'ideas', name: 'Ideas', icon: 'Lightbulb' },
    { id: 'phases', name: 'Fases MVP', icon: 'Settings' }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <SystemMetricsCard 
              metrics={systemMetrics} 
              onRefresh={handleRefreshAnalytics}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actividad Reciente
                </h3>
                <div className="space-y-3">
                  {ideas?.slice(0, 5)?.map((idea) => (
                    <div key={idea.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{idea.title}</p>
                        <p className="text-xs text-gray-500">
                          por {idea.user_profiles?.full_name}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        idea.confidence_level === 'green' ?'bg-green-100 text-green-800'
                          : idea.confidence_level === 'yellow' ?'bg-yellow-100 text-yellow-800' :'bg-red-100 text-red-800'
                      }`}>
                        {idea.confidence_score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Usuarios Recientes
                </h3>
                <div className="space-y-3">
                  {users?.slice(0, 5)?.filter(user => user.role === 'user')?.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserActivityTable users={users} />;
      case 'ideas':
        return <IdeaOverviewTable ideas={ideas} />;
      case 'phases':
        return <TaskPhaseManager />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Panel del Fundador - IdeaFlow</title>
        <meta name="description" content="Panel de control administrativo para el sistema IdeaFlow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Panel del Fundador
                </h1>
                <p className="text-gray-600 mt-2">
                  Administra usuarios, ideas y configura el sistema IdeaFlow
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button 
                  variant="outline"
                  onClick={handleRefreshAnalytics}
                  disabled={loading}
                >
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Actualizar
                </Button>
                <Button variant="default">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Nuevo Usuario
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {getTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FounderDashboard;