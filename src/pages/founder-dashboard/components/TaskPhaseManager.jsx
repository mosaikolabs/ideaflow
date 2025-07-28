import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import ideaService from '../../../utils/ideaService';
import founderService from '../../../utils/founderService';

const TaskPhaseManager = () => {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPhase, setEditingPhase] = useState(null);
  const [newPhase, setNewPhase] = useState({
    name: '',
    description: '',
    phase_order: 1
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadPhases();
  }, []);

  const loadPhases = async () => {
    setLoading(true);
    try {
      const result = await ideaService.getTaskPhases();
      if (result.success) {
        setPhases(result.data);
      }
    } catch (error) {
      console.log('Error loading phases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePhase = async (e) => {
    e.preventDefault();
    try {
      const result = await founderService.createTaskPhase({
        ...newPhase,
        phase_order: phases.length + 1
      });
      
      if (result.success) {
        setPhases([...phases, result.data]);
        setNewPhase({ name: '', description: '', phase_order: 1 });
        setShowAddForm(false);
      }
    } catch (error) {
      console.log('Error creating phase:', error);
    }
  };

  const handleUpdatePhase = async (phaseId, updates) => {
    try {
      const result = await founderService.updateTaskPhase(phaseId, updates);
      
      if (result.success) {
        setPhases(phases.map(phase => 
          phase.id === phaseId ? result.data : phase
        ));
        setEditingPhase(null);
      }
    } catch (error) {
      console.log('Error updating phase:', error);
    }
  };

  const handleDeletePhase = async (phaseId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta fase?')) return;
    
    try {
      const result = await founderService.deleteTaskPhase(phaseId);
      
      if (result.success) {
        setPhases(phases.filter(phase => phase.id !== phaseId));
      }
    } catch (error) {
      console.log('Error deleting phase:', error);
    }
  };

  const handleToggleActive = async (phaseId, currentStatus) => {
    await handleUpdatePhase(phaseId, { is_active: !currentStatus });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando fases...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Gestión de Fases MVP
          </h2>
          <p className="text-gray-600">
            Administra las fases que guían a los usuarios en su proceso de desarrollo
          </p>
        </div>
        <Button 
          variant="default"
          onClick={() => setShowAddForm(true)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Nueva Fase
        </Button>
      </div>

      {/* Add Phase Form */}
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Agregar Nueva Fase
          </h3>
          <form onSubmit={handleCreatePhase} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Fase"
                value={newPhase.name}
                onChange={(e) => setNewPhase({...newPhase, name: e.target.value})}
                required
              />
              <Input
                type="number"
                label="Orden"
                value={newPhase.phase_order}
                onChange={(e) => setNewPhase({...newPhase, phase_order: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
            <Input
              label="Descripción"
              value={newPhase.description}
              onChange={(e) => setNewPhase({...newPhase, description: e.target.value})}
              required
            />
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="default">
                Crear Fase
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <div 
            key={phase.id} 
            className={`bg-white border rounded-lg p-6 transition-all ${
              phase.is_active ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  phase.is_active ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {phase.phase_order}
                </div>
                {editingPhase === phase.id ? (
                  <Input
                    value={phase.name}
                    onChange={(e) => setPhases(phases.map(p => 
                      p.id === phase.id ? {...p, name: e.target.value} : p
                    ))}
                    className="font-semibold"
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {phase.name}
                  </h3>
                )}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  phase.is_active 
                    ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600'
                }`}>
                  {phase.is_active ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleActive(phase.id, phase.is_active)}
                >
                  <Icon name={phase.is_active ? 'EyeOff' : 'Eye'} size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPhase(editingPhase === phase.id ? null : phase.id)}
                >
                  <Icon name="Edit" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePhase(phase.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            
            {editingPhase === phase.id ? (
              <div className="space-y-3">
                <textarea
                  value={phase.description}
                  onChange={(e) => setPhases(phases.map(p => 
                    p.id === phase.id ? {...p, description: e.target.value} : p
                  ))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdatePhase(phase.id, {
                      name: phase.name,
                      description: phase.description
                    })}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPhase(null);
                      loadPhases(); // Reload to reset changes
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">{phase.description}</p>
            )}
          </div>
        ))}
      </div>

      {phases.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Settings" size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No hay fases configuradas</p>
        </div>
      )}
    </div>
  );
};

export default TaskPhaseManager;