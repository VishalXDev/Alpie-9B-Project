# PulseAI AI Assistant Context Injection Architecture

## Executive Summary

This document provides a comprehensive, step-by-step walkthrough of how context is injected into the AI assistant in the PulseAI Analytics Dashboard application. The current implementation uses a **simulated AI response system** with in-memory data context, serving as a foundation for future production-grade RAG (Retrieval-Augmented Generation) integration.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Context Sources](#context-sources)
3. [Data Flow Pipeline](#data-flow-pipeline)
4. [Detailed Component Breakdown](#detailed-component-breakdown)
5. [Execution Flow](#execution-flow)
6. [Edge Cases & Limitations](#edge-cases--limitations)
7. [Production Migration Path](#production-migration-path)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PULSEAI ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐       │
│  │   CLIENT LAYER  │────▶│   API LAYER     │────▶│   SERVICE LAYER │       │
│  │  (React/Vite)   │     │  (Express)      │     │  (dataService)  │       │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘       │
│           │                     │                          │                │
│           │                     │                          ▼                │
│           │                     │              ┌─────────────────────────┐  │
│           │                     │              │   CONTEXT STORE         │  │
│           │                     │              │  (In-Memory Arrays)     │  │
│           │                     │              │  - projects[]           │  │
│           │                     │              │  - activityLogs[]       │  │
│           │                     │              │  - chatMessages[]       │  │
│           │                     │              └─────────────────────────┘  │
│           │                     │                          │                │
│           ▼                     ▼                          ▼                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    AI ASSISTANT CONTEXT                             │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  1. User Query (from chat input)                            │   │   │
│  │  │  2. System Context (active projects, KPIs, revenue data)    │   │   │
│  │  │  3. Historical Context (chat history, activity logs)        │   │   │
│  │  │  4. Response Generation (simulated with context awareness)  │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Context Sources

### 1. **Static Context (System Instructions)**

**Location**: Hardcoded in `simulateAIResponse()` function

```typescript
// pulseai/server/src/services/dataService.ts:378-387
const responses = [
  `I've analyzed your request: "${userMessage}". Based on our current data, I recommend focusing on the active projects first. The Website Redesign is at 65% completion and could benefit from additional resources.`,
  `Great question! Looking at the analytics, we've seen a ${Math.round(Math.random() * 20)}% increase in user engagement this week. The AI has generated ${Math.floor(Math.random() * 50)} new insights that might be relevant to your query.`,
  // ... more templates
];
```

**Characteristics**:

- **Type**: Template-based responses
- **Persistence**: Server restart required to change
- **Customization**: None (hardcoded)
- **Use Case**: Demo/simulation purposes only

---

### 2. **Dynamic Context (Runtime Data)**

#### 2.1 Project Data Context

**Source**: `projects[]` array in `dataService.ts`

```typescript
// pulseai/server/src/services/dataService.ts:52
let projects: Project[] = [];

// Sample data initialization
export function initializeData(): void {
  projects = [
    {
      id: uuidv4(),
      title: "Website Redesign",
      description: "Complete overhaul of company website with new branding",
      status: "active",
      progress: 65,
      dueDate: "2024-02-15",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
    },
    // ... more projects
  ];
}
```

**Data Structure**:

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "pending" | "completed";
  progress: number;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2.2 KPI & Analytics Context

**Source**: `getKPIS()` function

```typescript
// pulseai/server/src/services/dataService.ts:175-210
export function getKPIS(): KPI[] {
  return [
    {
      id: "revenue",
      label: "Revenue",
      value: 125430,
      change: 12543,
      changePercent: 11.1,
      trend: "up",
    },
    {
      id: "users",
      label: "Total Users",
      value: 8542,
      change: 342,
      changePercent: 4.2,
      trend: "up",
    },
    // ... more KPIs
  ];
}
```

#### 2.3 Activity Log Context

**Source**: `activityLogs[]` array

```typescript
// pulseai/server/src/services/dataService.ts:51
let activityLogs: ActivityLog[] = [];

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: "user_action" | "system" | "ai_generation" | "error";
  message: string;
  metadata?: Record<string, unknown>;
}
```

#### 2.4 Chat History Context

**Source**: `chatMessages[]` array

```typescript
// pulseai/server/src/services/dataService.ts:53
let chatMessages: ChatMessage[] = [];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

---

## Data Flow Pipeline

### Pipeline Stage 1: User Input Capture

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: USER INPUT CAPTURE                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Client Component: ChatInterface.tsx                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. User types message in input field                     │  │
│  │  2. handleSendMessage() called                            │  │
│  │  3. Message object created:                               │  │
│  │     {                                                       │  │
│  │       id: Date.now().toString(),                          │  │
│  │       role: 'user',                                       │  │
│  │       content: inputValue.trim(),                         │  │
│  │       timestamp: new Date().toISOString()                 │  │
│  │     }                                                      │  │
│  │  4. Message added to local state                          │  │
│  │  5. API call initiated via useChatMutation()              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  API Service: api.ts                                      │  │
│  │  ┌─────────────────────────────────────────────────────┐  │
│  │  │  sendChatMessage(message: string)                   │  │
│  │  │  └─> POST /api/assistant/chat                       │  │
│  │  └─────────────────────────────────────────────────────┘  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Code Reference**: `pulseai/client/src/services/api.ts`

```typescript
// Simplified API call
export async function sendChatMessage(
  message: string,
): Promise<{ response: string }> {
  const response = await fetch("/api/assistant/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return response.json();
}
```

---

### Pipeline Stage 2: Request Processing

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2: REQUEST PROCESSING                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Server Route: api.ts                                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  POST /api/assistant/chat                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │
│  │  │  1. Validate request body                           │  │
│  │  │     if (!message || typeof message !== 'string')   │  │
│  │  │       return 400 error                              │  │
│  │  │                                                     │  │
│  │  │  2. Log user action                                 │  │
│  │  │     addActivityLog({                                │  │
│  │  │       type: 'user_action',                          │  │
│  │  │       message: `User sent message: "${message...}"` │  │
│  │  │     })                                              │  │
│  │  │                                                     │  │
│  │  │  3. Call AI service                                 │  │
│  │  │     const aiResponse = await simulateAIResponse(message) │  │
│  │  │                                                     │  │
│  │  │  4. Log AI generation                               │  │
│  │  │     addActivityLog({                                │  │
│  │  │       type: 'ai_generation',                        │  │
│  │  │       message: 'AI generated response',             │  │
│  │  │       metadata: { messageLength: message.length }   │  │
│  │  │     })                                              │  │
│  │  │                                                     │  │
│  │  │  5. Return response                                 │  │
│  │  │     {                                               │  │
│  │  │       success: true,                                │  │
│  │  │       data: { response: aiResponse }                │  │
│  │  │     }                                               │  │
│  │  └─────────────────────────────────────────────────────┘  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Code Reference**: `pulseai/server/src/routes/api.ts:228-269`

---

### Pipeline Stage 3: Context Assembly

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 3: CONTEXT ASSEMBLY                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Service: dataService.ts                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  simulateAIResponse(userMessage: string)                 │  │
│  │  ┌─────────────────────────────────────────────────────┐  │
│  │  │  1. Simulate network delay (1-2.5 seconds)          │  │
│  │  │     await new Promise(resolve => setTimeout(...))   │  │
│  │  │                                                     │  │
│  │  │  2. Access context data:                            │  │
│  │  │     - projects[] (active projects count)           │  │
│  │  │     - getKPIS() (revenue, users metrics)           │  │
│  │  │     - projects.filter(p => p.status === 'active')  │  │
│  │  │                                                     │  │
│  │  │  3. Inject context into response template:          │  │
│  │  │     `I've processed your request and found         │  │
│  │  │      ${projects.length} total projects with        │  │
│  │  │      ${activeProjects} currently active.           │  │
│  │  │      Revenue is up ${X}% compared to last month.`  │  │
│  │  │                                                     │  │
│  │  │  4. Return assembled response                       │  │
│  │  └─────────────────────────────────────────────────────┘  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Code Reference**: `pulseai/server/src/services/dataService.ts:374-387`

```typescript
export async function simulateAIResponse(userMessage: string): Promise<string> {
  // Simulate AI processing delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1500),
  );

  // Context-aware response templates
  const responses = [
    `I've analyzed your request: "${userMessage}". Based on our current data, 
     I recommend focusing on the active projects first. The Website Redesign 
     is at 65% completion and could benefit from additional resources.`,

    `Based on the project data, I can see you have 
     ${projects.filter((p) => p.status === "active").length} active projects. 
     The most critical one appears to be the API Integration, which is at 45% 
     progress. Would you like me to generate a detailed timeline?`,

    `Here's what I found: The system shows ${projects.length} total projects 
     with ${projects.filter((p) => p.status === "active").length} currently active. 
     Revenue is up ${Math.round(Math.random() * 12)}% compared to last month. 
     Would you like a detailed breakdown?`,
  ];

  // Return context-aware response
  return responses[Math.floor(Math.random() * responses.length)];
}
```

---

### Pipeline Stage 4: Response Delivery

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 4: RESPONSE DELIVERY                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Client: ChatInterface.tsx                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  1. Mutation completes                                    │  │
│  │  2. Response received:                                    │  │
│  │     { success: true, data: { response: "..." } }         │  │
│  │  3. Create assistant message:                             │  │
│  │     {                                                       │  │
│  │       id: (Date.now() + 1).toString(),                   │  │
│  │       role: 'assistant',                                 │  │
│  │       content: response.response,                        │  │
│  │       timestamp: new Date().toISOString()                │  │
│  │     }                                                      │  │
│  │  4. Update messages state                                 │  │
│  │  5. Scroll to bottom                                      │  │
│  │  6. Set isTyping = false                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Code Reference**: `pulseai/client/src/components/assistant/ChatInterface.tsx:49-70`

---

## Detailed Component Breakdown

### 1. Context Ingestion Layer

**Components**:

- `dataService.ts` - Central data store
- `initializeData()` - Data seeding function

**Data Sources**:

```typescript
// In-memory stores (pulseai/server/src/services/dataService.ts:51-53)
let activityLogs: ActivityLog[] = [];
let projects: Project[] = [];
let chatMessages: ChatMessage[] = [];
```

**Ingestion Process**:

1. **Initialization**: `initializeData()` called on module load
2. **Sample Data**: Pre-populated with realistic business data
3. **Runtime Updates**: CRUD operations modify in-memory arrays

**Limitations**:

- ❌ No persistence across server restarts
- ❌ No user-specific data isolation
- ❌ No external data sources (database, API, file system)

---

### 2. Context Processing Layer

**Current Implementation**: Direct array access with no transformation

```typescript
// Context extraction (dataService.ts:374-387)
export async function simulateAIResponse(userMessage: string): Promise<string> {
  // Simulate AI processing delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1500),
  );

  // Direct context access
  const activeProjects = projects.filter((p) => p.status === "active");
  const totalProjects = projects.length;

  // Template injection
  return `The system shows ${totalProjects} total projects with ${activeProjects.length} currently active...`;
}
```

**Processing Steps**:

1. **Filtering**: `projects.filter(p => p.status === 'active')`
2. **Aggregation**: Count, sum, average calculations
3. **Template Matching**: Keyword-based response selection
4. **Variable Substitution**: Context values injected into templates

**Missing Processing**:

- ❌ No text chunking
- ❌ No embedding generation
- ❌ No semantic similarity scoring
- ❌ No relevance ranking

---

### 3. Retrieval Mechanism

**Current Implementation**: Keyword-based template matching

```typescript
// Response selection based on user input patterns
const responses = [
  // Template 1: General project analysis
  `I've analyzed your request: "${userMessage}". Based on our current data...`,

  // Template 2: Project-specific
  `Based on the project data, I can see you have ${activeProjects.length} active projects...`,

  // Template 3: Revenue-focused
  `Here's what I found: The system shows ${totalProjects} total projects...`,
];

return responses[Math.floor(Math.random() * responses.length)];
```

**Retrieval Strategy**:

- **Method**: Random selection from predefined templates
- **Context Injection**: Variable substitution with current data
- **Scoring**: None (all templates equally weighted)

**Future RAG Implementation**:

```typescript
// Pseudo-code for production RAG retrieval
async function retrieveRelevantContext(
  userQuery: string,
): Promise<ContextChunk[]> {
  // 1. Embed user query
  const queryEmbedding = await embeddingModel.encode(userQuery);

  // 2. Search vector database
  const similarChunks = await vectorStore.search(queryEmbedding, {
    topK: 5,
    threshold: 0.7,
  });

  // 3. Rank by relevance
  const rankedChunks = similarChunks.sort(
    (a, b) => b.similarity - a.similarity,
  );

  return rankedChunks;
}
```

---

### 4. Prompt Assembly

**Current Implementation**: Template-based response generation

```typescript
// Template structure (dataService.ts:378-387)
const responses = [
  `I've analyzed your request: "${userMessage}". 
   Based on our current data, I recommend focusing on the active projects first. 
   The Website Redesign is at 65% completion and could benefit from additional resources.`,
];

// Variable substitution
const activeProjects = projects.filter((p) => p.status === "active");
return `You have ${activeProjects.length} active projects...`;
```

**Assembly Process**:

1. **User Query**: Captured from input
2. **Context Extraction**: Filter and aggregate relevant data
3. **Template Selection**: Match query to response template
4. **Variable Injection**: Substitute context values
5. **Final Assembly**: Concatenate template with injected values

**Prompt Structure (Current)**:

```
[SYSTEM] You are PulseAI, an intelligent analytics assistant.
[CONTEXT]
  - Active Projects: ${activeProjects.length}
  - Total Projects: ${totalProjects}
  - Revenue: ${revenue}
  - Users: ${users}
[USER] ${userMessage}
[ASSISTANT] {template with injected context}
```

---

### 5. Execution Flow

**Complete Request Lifecycle**:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE EXECUTION FLOW                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │  1. User     │    │  2. Client   │    │  3. API      │                 │
│  │  Types       │───▶│  Sends       │───▶│  Receives    │                 │
│  │  Message     │    │  Request     │    │  Request     │                 │
│  └──────────────┘    └──────────────┘    └──────────────┘                 │
│         │                   │                          │                   │
│         ▼                   ▼                          ▼                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │  4. Client   │    │  5. Server   │    │  6. Service  │                 │
│  │  Shows       │◀───│  Validates   │◀───│  Processes   │                 │
│  │  Typing      │    │  & Routes    │    │  Context     │                 │
│  └──────────────┘    └──────────────┘    └──────────────┘                 │
│         │                   │                          │                   │
│         ▼                   ▼                          ▼                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │  7. Service  │    │  8. Server   │    │  9. Client   │                 │
│  │  Generates   │───▶│  Formats     │───▶│  Receives    │                 │
│  │  Response    │    │  Response    │    │  Response    │                 │
│  └──────────────┘    └──────────────┘    └──────────────┘                 │
│         │                   │                          │                   │
│         ▼                   ▼                          ▼                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│  │  10. Client  │    │  11. UI      │    │  12. User    │                 │
│  │  Updates     │◀───│  Renders     │◀───│  Sees        │                 │
│  │  State       │    │  Message     │    │  Response    │                 │
│  └──────────────┘    └──────────────┘    └──────────────┘                 │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

**Timing Breakdown**:

- **Client Processing**: ~50ms
- **Network Latency**: ~100-300ms
- **Server Processing**: ~1-2.5s (simulated AI delay)
- **Total Response Time**: ~1.2-3.0s

---

## Edge Cases & Limitations

### 1. Missing Context

**Current Behavior**: Templates always have context values

```typescript
// Always returns a value, even if data is empty
return `The system shows ${projects.length} total projects...`;
```

**Edge Case**: What if `projects.length === 0`?

**Current Handling**: Returns "0 total projects" - technically correct but unhelpful

**Recommended Enhancement**:

```typescript
if (projects.length === 0) {
  return "No projects are currently tracked in the system. Would you like to create one?";
}
```

---

### 2. Context Window Limits

**Current Implementation**: No limits enforced

```typescript
// No context size checking
const response = `Context: ${projects.join(" | ")}\nUser: ${userMessage}\nResponse: ...`;
```

**Potential Issues**:

- ❌ No token count tracking
- ❌ No response length limits
- ❌ No context truncation

**Recommended Enhancement**:

```typescript
const MAX_CONTEXT_TOKENS = 4000;
const MAX_RESPONSE_TOKENS = 1000;

function countTokens(text: string): number {
  // Simple token estimation
  return text.split(" ").length * 1.3;
}

function assemblePrompt(context: string, userQuery: string): string {
  const totalTokens = countTokens(context) + countTokens(userQuery);

  if (totalTokens > MAX_CONTEXT_TOKENS) {
    // Truncate context
    const truncatedContext = truncateContext(
      context,
      MAX_CONTEXT_TOKENS - countTokens(userQuery),
    );
    return assemblePrompt(truncatedContext, userQuery);
  }

  return `Context: ${context}\nUser: ${userQuery}\nResponse:`;
}
```

---

### 3. Latency Optimization

**Current Implementation**: Fixed simulated delay

```typescript
await new Promise((resolve) =>
  setTimeout(resolve, 1000 + Math.random() * 1500),
);
```

**Issues**:

- ❌ No caching of responses
- ❌ No progressive streaming
- ❌ No background processing

**Optimization Strategies**:

#### A. Response Caching

```typescript
const responseCache = new Map<string, { response: string; timestamp: Date }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function simulateAIResponse(userMessage: string): Promise<string> {
  // Check cache first
  const cached = responseCache.get(userMessage);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }

  // Generate response
  const response = await generateResponse(userMessage);

  // Cache result
  responseCache.set(userMessage, { response, timestamp: new Date() });

  return response;
}
```

#### B. Progressive Streaming

```typescript
// Client-side streaming
async function* streamResponse(
  responseStream: ReadableStream,
): AsyncGenerator<string> {
  const reader = responseStream.getReader();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += new TextDecoder().decode(value);
    yield buffer;

    // Auto-scroll to show new content
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}
```

---

## Production Migration Path

### Phase 1: Database Integration

**Current**: In-memory arrays
**Target**: PostgreSQL with pgvector extension

```typescript
// Migration: dataService.ts
import { Pool } from "pg";
import { PoolClient } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getProjects(): Promise<Project[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM projects ORDER BY created_at DESC",
    );
    return result.rows.map((row) => rowToProject(row));
  } finally {
    client.release();
  }
}
```

### Phase 2: Vector Database Integration

**Current**: No vector search
**Target**: Pinecone or pgvector

```typescript
// Migration: vectorStore.ts
import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.Index("pulseai-knowledge");

export async function embedAndStore(
  text: string,
  metadata: Record<string, unknown>,
): Promise<void> {
  const embedding = await embeddingModel.encode(text);

  await index.upsert([
    {
      id: uuidv4(),
      values: embedding,
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
      },
    },
  ]);
}

export async function search(
  query: string,
  topK: number = 5,
): Promise<SearchResult[]> {
  const queryEmbedding = await embeddingModel.encode(query);

  const results = await index.fetch(queryEmbedding, {
    topK,
    includeMetadata: true,
  });

  return results.map((r) => ({
    id: r.id,
    similarity: r.score,
    metadata: r.metadata,
  }));
}
```

### Phase 3: RAG Pipeline Implementation

**Complete RAG Flow**:

```typescript
// Migration: ragService.ts
import { search } from "./vectorStore";
import { assemblePrompt } from "./promptEngine";
import { callLLM } from "./llmService";

export interface RAGContext {
  relevantChunks: SearchResult[];
  systemPrompt: string;
  userQuery: string;
}

export async function processQuery(userQuery: string): Promise<string> {
  // 1. Retrieve relevant context
  const contextResults = await search(userQuery, {
    topK: 5,
    threshold: 0.7,
  });

  // 2. Filter and rank results
  const relevantChunks = contextResults
    .filter((r) => r.similarity > 0.7)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  // 3. Assemble prompt
  const prompt = assemblePrompt({
    systemPrompt: SYSTEM_PROMPT,
    relevantChunks,
    userQuery,
  });

  // 4. Call LLM
  const response = await callLLM(prompt);

  // 5. Return response with citations
  return {
    content: response,
    citations: relevantChunks.map((c) => c.metadata.source),
  };
}
```

### Phase 4: Context Injection Enhancement

**Enhanced Prompt Assembly**:

```typescript
// Migration: promptEngine.ts
export function assemblePrompt(context: RAGContext): string {
  return `
# SYSTEM INSTRUCTIONS
You are PulseAI, an intelligent analytics assistant for business intelligence.
Your role is to help users understand their data, answer questions about metrics,
and provide actionable insights based on the provided context.

# AVAILABLE CONTEXT
${context.relevantChunks
  .map(
    (chunk) => `
## Source: ${chunk.metadata.source}
${chunk.metadata.content}
`,
  )
  .join("\n")}

# USER QUERY
${context.userQuery}

# RESPONSE GUIDELINES
1. Base your answers ONLY on the provided context
2. If information is not available, state that clearly
3. Provide actionable insights when possible
4. Cite your sources when making specific claims
5. Keep responses concise and professional

# YOUR RESPONSE
`;
}
```

---

## Summary

### Current Architecture

| Layer                  | Implementation        | Status       |
| ---------------------- | --------------------- | ------------ |
| **Context Source**     | In-memory arrays      | ✅ Working   |
| **Context Processing** | Direct array access   | ✅ Working   |
| **Retrieval**          | Template matching     | ✅ Working   |
| **Prompt Assembly**    | Variable substitution | ✅ Working   |
| **LLM Integration**    | Simulated response    | ⚠️ Demo only |

### Key Characteristics

1. **Context Sources**: Projects, KPIs, activity logs, chat history
2. **Injection Method**: Template-based with variable substitution
3. **Retrieval Strategy**: Keyword-based template selection
4. **Data Flow**: Client → API → Service → Response → Client
5. **Limitations**: No persistence, no vector search, no real LLM

### Migration Readiness

- ✅ Clear separation of concerns
- ✅ Modular service architecture
- ✅ Type-safe interfaces
- ⚠️ Requires database layer addition
- ⚠️ Requires vector database integration
- ⚠️ Requires LLM API integration

This walkthrough provides a complete understanding of the current context injection mechanism and a clear path forward for production-grade RAG implementation.
