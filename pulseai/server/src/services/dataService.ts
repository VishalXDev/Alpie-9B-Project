import { v4 as uuidv4 } from 'uuid';

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'user_action' | 'system' | 'ai_generation' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KPI {
  id: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  users: number;
}

export interface UserAcquisitionDataPoint {
  date: string;
  newUsers: number;
  activeUsers: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// In-memory stores
let activityLogs: ActivityLog[] = [];
let projects: Project[] = [];
let chatMessages: ChatMessage[] = [];

// Initialize with sample data
export function initializeData(): void {
  // Sample projects
  projects = [
    {
      id: uuidv4(),
      title: 'Website Redesign',
      description: 'Complete overhaul of company website with new branding',
      status: 'active',
      progress: 65,
      dueDate: '2024-02-15',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: 'Mobile App Development',
      description: 'iOS and Android app for customer engagement',
      status: 'pending',
      progress: 25,
      dueDate: '2024-03-01',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: 'Data Migration',
      description: 'Migrate legacy data to new cloud infrastructure',
      status: 'completed',
      progress: 100,
      dueDate: '2024-01-20',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: uuidv4(),
      title: 'API Integration',
      description: 'Integrate third-party payment gateway',
      status: 'active',
      progress: 45,
      dueDate: '2024-02-28',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: 'Security Audit',
      description: 'Comprehensive security assessment and remediation',
      status: 'pending',
      progress: 10,
      dueDate: '2024-03-15',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    },
  ];

  // Sample activity logs
  activityLogs = [
    {
      id: uuidv4(),
      timestamp: new Date(),
      type: 'ai_generation',
      message: 'AI generated new dashboard component',
      metadata: { projectId: projects[0].id },
    },
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 3600000),
      type: 'user_action',
      message: 'User updated project status',
      metadata: { projectId: projects[1].id },
    },
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 7200000),
      type: 'system',
      message: 'System backup completed successfully',
    },
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 86400000),
      type: 'ai_generation',
      message: 'AI assistant responded to user query',
    },
    {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 172800000),
      type: 'error',
      message: 'Failed to connect to external API',
      metadata: { errorCode: 'ECONNREFUSED' },
    },
  ];

  // Sample chat messages
  chatMessages = [
    {
      id: uuidv4(),
      role: 'assistant',
      content: 'Hello! I\'m PulseAI, your intelligent assistant. How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: uuidv4(),
      role: 'user',
      content: 'Show me the latest project updates',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: uuidv4(),
      role: 'assistant',
      content: 'Here are your latest project updates:\n\n1. Website Redesign - 65% complete\n2. API Integration - 45% complete\n3. Security Audit - 10% complete\n\nWould you like more details on any of these?',
      timestamp: new Date(Date.now() - 1200000),
    },
  ];
}

// Initialize on module load
initializeData();

// KPI Data
export function getKPIS(): KPI[] {
  return [
    {
      id: 'revenue',
      label: 'Revenue',
      value: 125430,
      change: 12543,
      changePercent: 11.1,
      trend: 'up',
    },
    {
      id: 'users',
      label: 'Total Users',
      value: 8542,
      change: 342,
      changePercent: 4.2,
      trend: 'up',
    },
    {
      id: 'activeProjects',
      label: 'Active Projects',
      value: projects.filter(p => p.status === 'active').length,
      change: 2,
      changePercent: 28.6,
      trend: 'up',
    },
    {
      id: 'aiGenerations',
      label: 'AI Generations',
      value: 1247,
      change: 89,
      changePercent: 7.7,
      trend: 'up',
    },
  ];
}

// Revenue time-series data (last 30 days)
export function getRevenueData(): RevenueDataPoint[] {
  const data: RevenueDataPoint[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const day = date.getDate();
    const revenue = 4500 + Math.random() * 3000 + (day * 150);
    const users = 280 + Math.floor(Math.random() * 50) + (day * 2);
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(revenue),
      users: users,
    });
  }
  
  return data;
}

// User acquisition data (last 30 days)
export function getUserAcquisitionData(): UserAcquisitionDataPoint[] {
  const data: UserAcquisitionDataPoint[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const newUsers = 15 + Math.floor(Math.random() * 25);
    const activeUsers = 180 + Math.floor(Math.random() * 40);
    
    data.push({
      date: date.toISOString().split('T')[0],
      newUsers,
      activeUsers,
    });
  }
  
  return data;
}

// Get all projects with optional filtering
export function getProjects(status?: 'active' | 'pending' | 'completed', search?: string): Project[] {
  let result = projects;
  
  if (status) {
    result = result.filter(p => p.status === status);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  return result;
}

// Create a new project
export function createProject(data: {
  title: string;
  description: string;
  status?: 'active' | 'pending' | 'completed';
  progress?: number;
  dueDate?: string;
}): Project {
  const newProject: Project = {
    id: uuidv4(),
    title: data.title,
    description: data.description || '',
    status: data.status || 'active',
    progress: typeof data.progress === 'number' ? Math.min(100, Math.max(0, data.progress)) : 0,
    dueDate: data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  projects.unshift(newProject);
  
  addActivityLog({
    type: 'user_action',
    message: `Created new project "${newProject.title}"`,
    metadata: { projectId: newProject.id },
  });

  return newProject;
}

// Update an existing project
export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date(),
  };

  addActivityLog({
    type: 'user_action',
    message: `Updated project "${projects[index].title}"`,
    metadata: { projectId: id },
  });

  return projects[index];
}

// Delete a project
export function deleteProject(id: string): boolean {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  const title = projects[index].title;
  projects.splice(index, 1);

  addActivityLog({
    type: 'user_action',
    message: `Deleted project "${title}"`,
    metadata: { projectId: id },
  });

  return true;
}

// Get recent activity logs
export function getActivityLogs(limit = 10): ActivityLog[] {
  return activityLogs.slice(0, limit);
}

// Add activity log
export function addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog {
  const newLog: ActivityLog = {
    ...log,
    id: uuidv4(),
    timestamp: new Date(),
  };
  activityLogs.unshift(newLog);
  return newLog;
}

// Get chat messages
export function getChatMessages(): ChatMessage[] {
  return chatMessages;
}

// Add chat message
export function addChatMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage {
  const newMessage: ChatMessage = {
    ...message,
    id: uuidv4(),
    timestamp: new Date(),
  };
  chatMessages.push(newMessage);
  return newMessage;
}

// Simulate AI response with dynamic content generation
export async function simulateAIResponse(userMessage: string): Promise<string> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();
  
  // Log the incoming request for debugging
  console.log(`[AI Assistant] Processing request ${requestId}`);
  console.log(`[AI Assistant] Input received: "${userMessage.substring(0, 100)}${userMessage.length > 100 ? '...' : ''}"`);
  console.log(`[AI Assistant] Input length: ${userMessage.length} characters`);
  
  // Simulate network delay for realistic response time
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
  
  const endTime = Date.now();
  const processingTime = endTime - startTime;
  
  // Log the response generation
  console.log(`[AI Assistant] Generating response for request ${requestId}`);
  console.log(`[AI Assistant] Processing time: ${processingTime}ms`);
  
  // Handle edge cases
  if (!userMessage || userMessage.trim().length === 0) {
    console.warn(`[AI Assistant] Empty or whitespace-only input received for request ${requestId}`);
    return "I'm here to help! Please ask me a question about your analytics, projects, or any other topic.";
  }
  
  const trimmedMessage = userMessage.trim();
  const lowerMessage = trimmedMessage.toLowerCase();
  
  // Dynamic response generation based on input content
  let response = "";
  
  // Check for specific keywords to provide context-aware responses
  if (lowerMessage.includes('revenue') || lowerMessage.includes('money') || lowerMessage.includes('sales')) {
    const revenueGrowth = Math.round(5 + Math.random() * 25);
    const projectedRevenue = Math.round(125000 + Math.random() * 50000);
    const formattedCurrentRevenue = 125430.toLocaleString();
    const formattedProjectedRevenue = projectedRevenue.toLocaleString();
    response = `Regarding your revenue inquiry: Our current revenue stands at $${formattedCurrentRevenue}. We've observed a ${revenueGrowth}% growth trend over the past month, projecting approximately $${formattedProjectedRevenue} for the current period. The revenue data shows consistent upward momentum, particularly in the last 14 days. Would you like a detailed breakdown by product or region?`;
  } 
  else if (lowerMessage.includes('project') || lowerMessage.includes('task') || lowerMessage.includes('work')) {
    const activeCount = projects.filter(p => p.status === 'active').length;
    const pendingCount = projects.filter(p => p.status === 'pending').length;
    const completedCount = projects.filter(p => p.status === 'completed').length;
    const topProject = projects[0]?.title || 'No projects available';
    const topProgress = projects[0]?.progress || 0;
    const truncatedQuery = trimmedMessage.substring(0, 50);
    const ellipsis = trimmedMessage.length > 50 ? '...' : '';
    
    response = `Project Analysis: You currently have ${activeCount} active projects, ${pendingCount} pending, and ${completedCount} completed. The most advanced project is "${topProject}" at ${topProgress}% completion. Based on your query about "${truncatedQuery}${ellipsis}", I recommend reviewing the active projects first, particularly the API Integration which is at 45% progress. Would you like me to generate a detailed timeline or resource allocation plan?`;
  }
  else if (lowerMessage.includes('user') || lowerMessage.includes('customer') || lowerMessage.includes('client')) {
    const totalUsers = 8542;
    const newUsers = Math.floor(15 + Math.random() * 25);
    const activeUsers = Math.floor(180 + Math.random() * 40);
    const engagementRate = Math.round(65 + Math.random() * 15);
    
    response = `User Analytics: Our platform currently has ${totalUsers.toLocaleString()} total users, with ${newUsers} new users acquired in the last 30 days. Active user engagement stands at ${activeUsers} users, representing a ${engagementRate}% engagement rate. The user acquisition data indicates healthy growth, particularly in the enterprise segment. Would you like to see the detailed user acquisition trends?`;
  }
  else if (lowerMessage.includes('help') || lowerMessage.includes('assist') || lowerMessage.includes('can you')) {
    const truncatedQuery = trimmedMessage.substring(0, 50);
    const ellipsis = trimmedMessage.length > 50 ? '...' : '';
    response = `I'm PulseAI, your intelligent analytics assistant! I can help you with:\n\n• Revenue analysis and forecasting\n• Project tracking and timeline generation\n• User acquisition insights\n• Data visualization and reporting\n• Performance metrics and KPIs\n\nBased on your question "${truncatedQuery}${ellipsis}", I'm ready to provide detailed insights. What specific information would you like to explore?`;
  }
  else if (lowerMessage.includes('chart') || lowerMessage.includes('graph') || lowerMessage.includes('visual') || lowerMessage.includes('display')) {
    const chartType = Math.random() > 0.5 ? 'line' : 'bar';
    const dataPoints = Math.floor(10 + Math.random() * 20);
    const truncatedQuery = trimmedMessage.substring(0, 50);
    const ellipsis = trimmedMessage.length > 50 ? '...' : '';
    
    response = `Visualization Request: I can generate ${chartType} charts for your data. Based on your query about "${truncatedQuery}${ellipsis}", I recommend displaying:\n\n• Revenue trends over the last 30 days (${dataPoints} data points)\n• User acquisition patterns\n• Project progress timelines\n• Performance metrics comparison\n\nThe charts will highlight key insights and make the data more actionable. Would you like me to generate a specific chart type or focus on a particular metric?`;
  }
  else if (lowerMessage.includes('error') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
    const errorCount = Math.floor(2 + Math.random() * 8);
    const resolvedCount = Math.floor(errorCount + Math.floor(Math.random() * 5));
    
    response = `System Status: I've checked our logs and found ${errorCount} recent system events. ${resolvedCount} have been resolved automatically, while the remaining issues are being monitored. The most recent activity shows normal operation with no critical errors. If you're experiencing a specific issue, please provide more details so I can investigate further. Would you like to see the detailed error logs?`;
  }
  else if (lowerMessage.includes('forecast') || lowerMessage.includes('predict') || lowerMessage.includes('future')) {
    const forecastPeriod = Math.floor(30 + Math.random() * 60);
    const growthRate = Math.round(8 + Math.random() * 12);
    
    response = `Forecast Analysis: Based on current trends, I'm projecting a ${growthRate}% growth rate over the next ${forecastPeriod} days. Key indicators suggest:\n\n• Revenue: Upward trajectory with ${Math.round(5 + Math.random() * 10)}% monthly increase\n• User acquisition: Steady growth of ${Math.floor(15 + Math.random() * 20)} new users per week\n• Project completion: Accelerating at ${Math.round(2 + Math.random() * 3)}% per week\n\nThe forecast model considers historical data, seasonal patterns, and current momentum. Would you like a detailed breakdown of the forecasting methodology?`;
  }
  else if (lowerMessage.includes('summary') || lowerMessage.includes('overview') || lowerMessage.includes('report')) {
    const summaryType = Math.random() > 0.5 ? 'executive' : 'detailed';
    const formattedRevenue = 125430.toLocaleString();
    const formattedUsers = 8542.toLocaleString();
    const activeProjectCount = projects.filter(p => p.status === 'active').length;
    
    response = `Executive Summary: Here's an overview of your current analytics dashboard:\n\n📊 **Key Metrics**:\n• Total Revenue: $${formattedRevenue} (+${Math.round(10 + Math.random() * 5)}%)\n• Active Users: ${formattedUsers} (+${Math.round(3 + Math.random() * 2)}%)\n• Active Projects: ${activeProjectCount}\n\n🎯 **Top Insights**:\n1. Revenue growth is accelerating\n2. User engagement is at an all-time high\n3. Project delivery is on track\n\n${summaryType === 'executive' ? 'Would you like a deeper dive into any specific metric?' : 'I can provide more granular data on any of these areas.'}`;
  }
  else {
    // Generic response with personalized content based on input
    const wordCount = trimmedMessage.split(' ').length;
    const insightCount = Math.floor(3 + Math.random() * 5);
    const confidence = Math.round(75 + Math.random() * 20);
    const truncatedQuery = trimmedMessage.substring(0, 80);
    const ellipsis = trimmedMessage.length > 80 ? '...' : '';
    
    response = `I've analyzed your query: "${truncatedQuery}${ellipsis}".\n\nBased on our comprehensive data analysis, I've identified ${insightCount} key insights relevant to your question. Our AI processing has evaluated ${wordCount} words in your request and cross-referenced them with ${projects.length} active projects and ${8542.toLocaleString()} user data points.\n\nKey findings:\n• The system shows strong correlation with your query\n• ${Math.round(80 + Math.random() * 15)}% confidence in the analysis\n• ${Math.floor(5 + Math.random() * 10)} actionable recommendations available\n\nWould you like me to elaborate on any specific aspect or generate a detailed report?`;
  }
  
  // Add request metadata to response for debugging
  const metadata = {
    requestId,
    processingTime: processingTime,
    inputLength: userMessage.length,
    timestamp: new Date().toISOString()
  };
  
  console.log(`[AI Assistant] Response generated for request ${requestId}: "${response.substring(0, 100)}${response.length > 100 ? '...' : ''}"`);
  console.log(`[AI Assistant] Request metadata: ${JSON.stringify(metadata)}`);
  
  return response;
}

// Get dashboard stats
export function getDashboardStats(): {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  totalRevenue: number;
  totalUsers: number;
} {
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    pendingProjects: projects.filter(p => p.status === 'pending').length,
    totalRevenue: getKPIS().find(k => k.id === 'revenue')?.value || 0,
    totalUsers: getKPIS().find(k => k.id === 'users')?.value || 0,
  };
}

// Reset all data (for testing)
export function resetData(): void {
  initializeData();
}
