# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **BabelPhish** (originally "ServiceNow AI Assist"), an AI-powered, interactive dashboard designed to interface with ServiceNow. It provides users with a flexible, widget-based workspace to view, manage, and interact with ServiceNow data using natural language commands. The application is built with Next.js 15, TypeScript, and Google's Genkit for AI capabilities.

### Development Standards
- **Tech Stack Defaults:** @~/.agent-os/stands/tech-stack.md

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### AI Development
- `npm run genkit:dev` - Start Genkit development server with tsx
- `npm run genkit:watch` - Start Genkit with file watching enabled

## Application Architecture

### Tech Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, React 18
- **UI Framework**: ShadCN UI components with Tailwind CSS
- **AI**: Google Genkit with Gemini 2.0 Flash model
- **State Management**: React state with localStorage persistence
- **Drag & Drop**: react-draggable for widget positioning
- **External Integrations**: ServiceNow API, configurable webhook for user profiles

### Core Components Structure

#### Main Application Flow
- `src/app/layout.tsx` - Root layout with Inter font and toast provider
- `src/app/page.tsx` - Landing/login page
- `src/components/Dashboard.tsx` - Primary application container managing widgets, workspaces, and user state

#### Widget System
- `src/components/widgets/BaseWidget.tsx` - Shell for all widgets with controls (close, minimize, favorite, chat)
- `src/components/widgets/EntityWidget.tsx` - Displays ServiceNow entities (incidents, changes, problems) with master-detail view
- `src/components/widgets/GenericWidget.tsx` - Simple widget for unstructured text/JSON responses
- `src/components/widgets/WidgetContainer.tsx` - Manages drag-and-drop positioning and boundaries
- `src/components/widgets/ChatPanel.tsx` - Context-aware chat interface within each widget

#### Layout & Navigation
- `src/components/layout/AppSidebar.tsx` - Collapsible sidebar with minimized/favorited widgets and navigation
- `src/components/ChatInput.tsx` - Primary command input with voice support and command suggestions

#### AI Integration
- `src/ai/genkit.ts` - Genkit configuration with Google AI
- `src/ai/flows/` - AI flow definitions:
  - `generate-widget-from-query.ts` - Creates widgets from natural language
  - `context-aware-widget-chat.ts` - Widget-specific chat functionality
  - `agent-specific-widget.ts` - Agent-specialized widgets
  - `generate-overview-summary.ts` - Summary generation
  - `save-query-with-voice-text.ts` - Query persistence

#### Services
- `src/services/userService.ts` - User authentication via external webhook
- `src/services/servicenow.ts` - ServiceNow API integration for live data
- `src/services/workspaceService.ts` - Workspace persistence
- `src/services/sampleDataService.ts` - Mock data for development/demo

### Key Architectural Patterns

#### Widget Management
- All widgets are draggable and resizable with controlled boundaries
- Widget state persists to localStorage including positions and data
- Z-index management brings active widgets to front
- Widgets support minimize/maximize, favoriting, and contextual chat

#### AI Flow Integration
- Natural language commands processed through Genkit flows
- Pre-defined commands: `@incident`, `@change`, `@problem`, `@summary`
- Context-aware responses maintain widget-specific data understanding
- Voice input support (browser-dependent)

#### Data Integration
- Live ServiceNow data via REST API for incidents
- Mock data service for problems and changes
- User profile management through external webhook endpoint
- Workspace persistence for multi-session support

#### Authentication Flow
- Email/password authentication via `USER_PROFILE_WEBHOOK_URL`
- Session stored in localStorage
- Profile data fetched and updatable via webhook

## Configuration

### Environment Variables
- `USER_PROFILE_WEBHOOK_URL` - External webhook for user authentication and profile management
- `NEXT_PUBLIC_WORKSPACE_OPEN_SESSIONS` - Maximum concurrent workspace sessions (default: 3)
- Google AI API key is currently hardcoded in `src/ai/genkit.ts` (should be moved to env)

### Important Configuration Files
- `next.config.ts` - Build ignores TypeScript/ESLint errors, standalone output
- `components.json` - ShadCN UI configuration with aliases
- `tailwind.config.ts` - Custom color scheme and animations for the application theme

## Development Notes

### Style Guidelines
- Primary color: Medium sky-blue (#7FB5FF)
- Background: Light pale-blue (#E0F0FF)  
- Accent: Light indigo (#947BFF)
- Font: Inter for body and headlines
- Icons: Lucide React library

### Widget Types
- `incident` - ServiceNow incident data with master-detail view
- `problem` - Problem records with workaround and cause information
- `change` - Change requests with implementation plans
- `generic` - Unstructured text or JSON responses

### Testing Considerations
- No test framework currently configured
- Mock data available via `sampleDataService.ts` for development
- Live ServiceNow integration requires proper API credentials

### Security Notes
- API key is hardcoded and should be moved to environment variable
- Session management uses localStorage (consider security implications)
- External webhook integration for user management