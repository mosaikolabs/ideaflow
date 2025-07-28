import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IdeaOverviewTable = ({ ideas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredIdeas = ideas?.filter(idea => {
    const matchesSearch = idea.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || idea.confidence_level === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'user_profiles.full_name') {
      aVal = a.user_profiles?.full_name;
      bVal = b.user_profiles?.full_name;
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getStatusColor = (level) => {
    switch (level) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (level) => {
    switch (level) {
      case 'green': return 'Alta Confianza';
      case 'yellow': return 'Confianza Moderada';
      case 'red': return 'Baja Confianza';
      default: return 'Sin evaluar';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ideas o usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las ideas</option>
            <option value="green">Alta confianza</option>
            <option value="yellow">Confianza moderada</option>
            <option value="red">Baja confianza</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_at">Fecha de creación</option>
            <option value="title">Título</option>
            <option value="confidence_score">Puntuación</option>
            <option value="user_profiles.full_name">Usuario</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={14} />
          </Button>
        </div>
      </div>

      {/* Ideas Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idea
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puntuación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creada
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedIdeas.map((idea) => (
                <tr key={idea.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {idea.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {idea.problem_description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {idea.user_profiles?.full_name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {idea.user_profiles?.full_name || 'Usuario anónimo'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {idea.user_profiles?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">
                        {idea.confidence_score}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            idea.confidence_level === 'green' ? 'bg-green-500' :
                            idea.confidence_level === 'yellow'? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${idea.confidence_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(idea.confidence_level)}`}>
                      {getStatusText(idea.confidence_level)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(idea.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedIdeas.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Lightbulb" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No se encontraron ideas</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-gray-900">{ideas?.length || 0}</div>
          <div className="text-gray-500">Total Ideas</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600">
            {ideas?.filter(i => i.confidence_level === 'green').length || 0}
          </div>
          <div className="text-green-600">Alta Confianza</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-600">
            {ideas?.filter(i => i.confidence_level === 'yellow').length || 0}
          </div>
          <div className="text-yellow-600">Moderada</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-red-600">
            {ideas?.filter(i => i.confidence_level === 'red').length || 0}
          </div>
          <div className="text-red-600">Baja Confianza</div>
        </div>
      </div>
    </div>
  );
};

export default IdeaOverviewTable;