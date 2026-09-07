import { Router, Request, Response } from 'express';
import {
  getKPIS,
  getRevenueData,
  getUserAcquisitionData,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getActivityLogs,
  getChatMessages,
  addActivityLog,
  simulateAIResponse,
  getDashboardStats,
  resetData,
} from '../services/dataService';
import config from '../config/env';

const router = Router();

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Dashboard Stats
router.get('/dashboard/stats', (req: Request, res: Response) => {
  try {
    const stats = getDashboardStats();
    const kpis = getKPIS();
    
    res.json({
      success: true,
      data: {
        ...stats,
        kpis,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Revenue Analytics
router.get('/analytics/revenue', (req: Request, res: Response) => {
  try {
    const data = getRevenueData();
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// User Acquisition Analytics
router.get('/analytics/users', (req: Request, res: Response) => {
  try {
    const data = getUserAcquisitionData();
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user acquisition data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Projects: List with filtering
router.get('/projects', (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    
    const projects = getProjects(
      status as 'active' | 'pending' | 'completed' | undefined,
      search as string | undefined
    );
    
    res.json({
      success: true,
      data: projects,
      meta: {
        total: projects.length,
        filters: { status, search },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Projects: Create a new project
router.post('/projects', (req: Request, res: Response) => {
  try {
    const { title, description, status, progress, dueDate } = req.body;
    
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: 'Project title is required',
      });
    }

    const newProject = createProject({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      status: ['active', 'pending', 'completed'].includes(status) ? status : 'active',
      progress: typeof progress === 'number' ? progress : 0,
      dueDate: dueDate || undefined,
    });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create project',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Projects: Update a project
router.put('/projects/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, progress, dueDate } = req.body;

    const updated = updateProject(id, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(progress !== undefined && { progress }),
      ...(dueDate !== undefined && { dueDate }),
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        details: `Project with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update project',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Projects: Delete a project
router.delete('/projects/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = deleteProject(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        details: `Project with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete project',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Activity Log
router.get('/activity', (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const logs = getActivityLogs(limit ? parseInt(limit as string) : 10);
    
    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity logs',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// AI Chat
router.post('/assistant/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: 'Message is required and must be a string',
      });
    }
    
    // Add user message to activity log
    addActivityLog({
      type: 'user_action',
      message: `User sent message: "${message.substring(0, 50)}..."`,
    });
    
    // Simulate AI response
    const aiResponse = await simulateAIResponse(message);
    
    // Add to chat history
    addActivityLog({
      type: 'ai_generation',
      message: 'AI generated response',
      metadata: { messageLength: message.length },
    });
    
    res.json({
      success: true,
      data: {
        response: aiResponse,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Reset data (for testing)
router.post('/admin/reset', (req: Request, res: Response) => {
  try {
    resetData();
    res.json({
      success: true,
      message: 'Data reset successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reset data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
