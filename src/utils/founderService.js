import { supabase } from './supabase';

const founderService = {
  // Get system analytics
  async getSystemAnalytics() {
    try {
      const { data, error } = await supabase
        .from('system_analytics')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'Failed to load analytics' };
    }
  },

  // Get all users (founder only)
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load users' };
    }
  },

  // Get all ideas (founder only)
  async getAllIdeas() {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select(`
          *,
          user_profiles(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load ideas' };
    }
  },

  // Get user activity summary
  async getUserActivitySummary() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          id,
          full_name,
          email,
          created_at,
          ideas(count),
          evidence_collection(count)
        `);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to load user activity' };
    }
  },

  // Update user role (founder only)
  async updateUserRole(userId, newRole) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update user role' };
    }
  },

  // Create task phase (founder only)
  async createTaskPhase(phaseData) {
    try {
      const { data, error } = await supabase
        .from('task_phases')
        .insert([{
          ...phaseData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create task phase' };
    }
  },

  // Update task phase (founder only)
  async updateTaskPhase(phaseId, updates) {
    try {
      const { data, error } = await supabase
        .from('task_phases')
        .update(updates)
        .eq('id', phaseId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to update task phase' };
    }
  },

  // Delete task phase (founder only)
  async deleteTaskPhase(phaseId) {
    try {
      const { error } = await supabase
        .from('task_phases')
        .delete()
        .eq('id', phaseId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete task phase' };
    }
  },

  // Refresh system analytics
  async refreshSystemAnalytics() {
    try {
      const { error } = await supabase.rpc('update_system_analytics');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to refresh analytics' };
    }
  }
};

export default founderService;