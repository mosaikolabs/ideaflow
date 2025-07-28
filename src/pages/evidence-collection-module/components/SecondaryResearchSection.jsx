import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SecondaryResearchSection = ({ 
  research = [], 
  onAddResearch, 
  onUpdateResearch, 
  onDeleteResearch 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResearch, setNewResearch] = useState({
    title: '',
    type: '',
    source: '',
    url: '',
    publicationDate: '',
    keyInsights: '',
    relevanceScore: 0,
    credibilityScore: 0,
    tags: []
  });

  const researchTypes = [
    { value: 'industry-report', label: 'Informe de Industria' },
    { value: 'market-study', label: 'Estudio de Mercado' },
    { value: 'academic-paper', label: 'Artículo Académico' },
    { value: 'competitor-analysis', label: 'Análisis de Competencia' },
    { value: 'trend-report', label: 'Informe de Tendencias' },
    { value: 'case-study', label: 'Caso de Estudio' },
    { value: 'white-paper', label: 'White Paper' },
    { value: 'news-article', label: 'Artículo de Noticias' }
  ];

  const handleAddResearch = () => {
    if (newResearch.title && newResearch.source && newResearch.keyInsights) {
      const research = {
        ...newResearch,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        overallScore: Math.round((newResearch.relevanceScore + newResearch.credibilityScore) / 2)
      };
      onAddResearch(research);
      setNewResearch({
        title: '',
        type: '',
        source: '',
        url: '',
        publicationDate: '',
        keyInsights: '',
        relevanceScore: 0,
        credibilityScore: 0,
        tags: []
      });
      setShowAddForm(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'industry-report': 'FileText',
      'market-study': 'TrendingUp',
      'academic-paper': 'GraduationCap',
      'competitor-analysis': 'Users',
      'trend-report': 'BarChart3',
      'case-study': 'BookOpen',
      'white-paper': 'FileText',
      'news-article': 'Newspaper'
    };
    return iconMap[type] || 'FileText';
  };

  const averageScore = research.length > 0 
    ? Math.round(research.reduce((sum, item) => sum + item.overallScore, 0) / research.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="FileSearch" size={20} className="mr-2 text-accent" />
            Investigación Secundaria
          </h3>
          <p className="text-sm text-muted-foreground">
            Estudios, informes y análisis de mercado
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{averageScore}/10</div>
            <div className="text-xs text-muted-foreground">Puntuación Media</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{research.length}</div>
            <div className="text-xs text-muted-foreground">Fuentes</div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Nueva Fuente
          </Button>
        </div>
      </div>

      {/* Add Research Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-foreground">
              Agregar Investigación Secundaria
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Título del Estudio"
              type="text"
              placeholder="Ej: Tendencias del Mercado Fitness 2024"
              value={newResearch.title}
              onChange={(e) => setNewResearch({...newResearch, title: e.target.value})}
              required
            />
            <Select
              label="Tipo de Investigación"
              options={researchTypes}
              value={newResearch.type}
              onChange={(value) => setNewResearch({...newResearch, type: value})}
              placeholder="Selecciona el tipo"
            />
            <Input
              label="Fuente/Autor"
              type="text"
              placeholder="McKinsey, Statista, Universidad, etc."
              value={newResearch.source}
              onChange={(e) => setNewResearch({...newResearch, source: e.target.value})}
              required
            />
            <Input
              label="URL del Documento"
              type="url"
              placeholder="https://..."
              value={newResearch.url}
              onChange={(e) => setNewResearch({...newResearch, url: e.target.value})}
            />
            <Input
              label="Fecha de Publicación"
              type="date"
              value={newResearch.publicationDate}
              onChange={(e) => setNewResearch({...newResearch, publicationDate: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Relevancia (1-10)"
                type="number"
                min="1"
                max="10"
                placeholder="8"
                value={newResearch.relevanceScore}
                onChange={(e) => setNewResearch({...newResearch, relevanceScore: parseInt(e.target.value) || 0})}
              />
              <Input
                label="Credibilidad (1-10)"
                type="number"
                min="1"
                max="10"
                placeholder="9"
                value={newResearch.credibilityScore}
                onChange={(e) => setNewResearch({...newResearch, credibilityScore: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Insights y Hallazgos Clave
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Describe los hallazgos más relevantes para tu validación de idea..."
              value={newResearch.keyInsights}
              onChange={(e) => setNewResearch({...newResearch, keyInsights: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={handleAddResearch}
              disabled={!newResearch.title || !newResearch.source || !newResearch.keyInsights}
            >
              Guardar Investigación
            </Button>
          </div>
        </div>
      )}

      {/* Research List */}
      <div className="space-y-4">
        {research.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed border-border">
            <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              No hay investigación secundaria registrada
            </h4>
            <p className="text-muted-foreground mb-4">
              Agrega estudios e informes relevantes para tu validación
            </p>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Agregar Primera Fuente
            </Button>
          </div>
        ) : (
          research.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(item.type)} size={20} className="text-accent" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{item.title}</h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Icon name="Building" size={14} className="mr-1" />
                        {item.source}
                      </span>
                      {item.publicationDate && (
                        <span className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {new Date(item.publicationDate).toLocaleDateString('es-ES')}
                        </span>
                      )}
                      {item.type && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                          {researchTypes.find(t => t.value === item.type)?.label || item.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getScoreColor(item.overallScore)}`}>
                      {item.overallScore}/10
                    </div>
                    <div className="text-xs text-muted-foreground">Puntuación</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteResearch(item.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Evaluación
                  </span>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Relevancia</span>
                      <span className={`text-sm font-medium ${getScoreColor(item.relevanceScore)}`}>
                        {item.relevanceScore}/10
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full">
                      <div 
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${(item.relevanceScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">Credibilidad</span>
                      <span className={`text-sm font-medium ${getScoreColor(item.credibilityScore)}`}>
                        {item.credibilityScore}/10
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full">
                      <div 
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${(item.credibilityScore / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {item.url && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Enlace al Documento
                    </span>
                    <div className="mt-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-micro"
                      >
                        <Icon name="ExternalLink" size={14} className="mr-1" />
                        Ver documento completo
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Insights y Hallazgos Clave
                </span>
                <p className="mt-1 text-sm text-foreground">
                  {item.keyInsights}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecondaryResearchSection;