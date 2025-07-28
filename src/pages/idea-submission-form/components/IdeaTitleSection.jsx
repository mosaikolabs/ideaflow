import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const IdeaTitleSection = ({ 
  title = '', 
  onTitleChange = () => {}, 
  error = '',
  isExpanded = true,
  onToggle = () => {}
}) => {
  const [charCount, setCharCount] = useState(title.length);
  const maxChars = 100;

  useEffect(() => {
    setCharCount(title.length);
  }, [title]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= maxChars) {
      onTitleChange(newTitle);
      setCharCount(newTitle.length);
    }
  };

  const getCharCountColor = () => {
    if (charCount >= maxChars * 0.9) return 'text-error';
    if (charCount >= maxChars * 0.7) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-micro"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Lightbulb" size={16} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Título de tu Idea
            </h3>
            <p className="text-sm text-muted-foreground">
              Un nombre claro y memorable para tu startup
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground"
        />
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="mt-4">
            <Input
              label="Nombre de tu Startup"
              type="text"
              placeholder="Ej: EcoDelivery, FinanceBot, StudyMate..."
              value={title}
              onChange={handleTitleChange}
              error={error}
              description="Elige un nombre que refleje la esencia de tu solución"
              required
            />
            
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">
                💡 <strong>Consejo:</strong> Usa palabras que conecten con tu audiencia objetivo
              </div>
              <div className={`text-xs font-mono ${getCharCountColor()}`}>
                {charCount}/{maxChars}
              </div>
            </div>

            {title.length > 0 && (
              <div className="mt-3 p-3 bg-muted/50 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Eye" size={14} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Vista previa:
                  </span>
                </div>
                <div className="text-sm font-medium text-foreground">
                  "{title}"
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaTitleSection;