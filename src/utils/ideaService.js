import { supabase } from './supabase';

const ideaService = {
  // Get user's ideas
  async getUserIdeas(userId) {
    try {
      const { data, error } = await supabase
        .from('ideas').select('*').eq('user_id', userId).order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'Failed to load ideas' };
    }
  },

  // Create new idea
  async createIdea(ideaData) {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert([{
          ...ideaData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create idea' };
    }
  },

  // Update idea
  async updateIdea(ideaId, updates) {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', ideaId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update idea' };
    }
  },

  // Delete idea
  async deleteIdea(ideaId) {
    try {
      const { error } = await supabase
        .from('ideas')
        .delete()
        .eq('id', ideaId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete idea' };
    }
  },

  // Get evidence for idea
  async getIdeaEvidence(ideaId) {
    try {
      const { data, error } = await supabase
        .from('evidence_collection')
        .select('*')
        .eq('idea_id', ideaId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load evidence' };
    }
  },

  // Create evidence
  async createEvidence(evidenceData) {
    try {
      const { data, error } = await supabase
        .from('evidence_collection')
        .insert([{
          ...evidenceData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create evidence' };
    }
  },

  // Update evidence
  async updateEvidence(evidenceId, updates) {
    try {
      const { data, error } = await supabase
        .from('evidence_collection')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', evidenceId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update evidence' };
    }
  },

  // Delete evidence
  async deleteEvidence(evidenceId) {
    try {
      const { error } = await supabase
        .from('evidence_collection')
        .delete()
        .eq('id', evidenceId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete evidence' };
    }
  },

  // Get task phases
  async getTaskPhases() {
    try {
      const { data, error } = await supabase
        .from('task_phases')
        .select('*')
        .eq('is_active', true)
        .order('phase_order');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load task phases' };
    }
  },

  // Get task steps for idea
  async getTaskSteps(ideaId) {
    try {
      const { data, error } = await supabase
        .from('task_steps')
        .select(`
          *,
          task_phases(name, description)
        `)
        .eq('idea_id', ideaId)
        .order('step_order');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load task steps' };
    }
  },

  // Update task step completion
  async updateTaskStep(stepId, isCompleted) {
    try {
      const { data, error } = await supabase
        .from('task_steps')
        .update({
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', stepId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update task step' };
    }
  }
};

export default ideaService;