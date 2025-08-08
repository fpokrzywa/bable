# Application Architecture Documentation

This document provides a detailed breakdown of the application's requirements, architecture, and component structure.

### **Application Overview**

This is an AI-powered, interactive dashboard designed to interface with ServiceNow. It provides users with a flexible, widget-based workspace to view, manage, and interact with ServiceNow data using natural language commands. The application leverages a modern tech stack including Next.js, TypeScript, and Google's Genkit for its AI capabilities.

---

### **Core Functional Requirements**

1.  **User Authentication:**
    *   Users must log in with an email and password.
    *   Authentication is handled by making a `POST` request to a configurable external webhook (`USER_PROFILE_WEBHOOK_URL`).
    *   Upon successful login, a session is created and stored in the browser's `localStorage`.
    *   Users can log out, which clears the session and redirects them to the login page.

2.  **Dynamic Dashboard & Widget Management:**
    *   The main interface is a draggable and resizable dashboard grid.
    *   All information is displayed within individual "widgets."
    *   **Widget Persistence:** The state of the dashboard (widget positions, type, and data) is saved to `localStorage`, allowing the user's layout to persist across sessions.
    *   **Widget Actions:** Users can close, minimize, and "favorite" widgets.
    *   **Draggable & Resizable:** Widgets can be moved around the workspace and resized. The z-index is managed to bring the most recently interacted-with widget to the front.

3.  **AI-Powered Command & Chat Interface:**
    *   A central chat input serves as the primary way for users to issue commands.
    *   **Natural Language Processing:** Users can type natural language queries (e.g., "show me open incidents") which are processed by Genkit AI flows.
    *   **Pre-defined Commands:** The application supports specific commands (e.g., `@incident`, `@change`, `@summary`) to generate specific types of widgets.
    *   **Contextual Chat:** Each widget has its own integrated chat panel, allowing users to ask questions about the data within that specific widget.

4.  **ServiceNow & Data Integration:**
    *   The application fetches data directly from a ServiceNow instance for certain queries (e.g., live incidents).
    *   It also uses mock data for `@problem` and `@change` commands for demonstration purposes.
    *   User profile data (username, bio, avatar) is fetched from and updated via the external webhook.

5.  **User Profile & Settings:**
    *   A user profile dialog displays information fetched from the webhook.
    *   Users can edit their profile information, and the changes are sent back to the webhook via a `POST` request.
    *   A separate settings panel provides options for managing application preferences (though these are not yet fully implemented).

---

### **Component Architecture**

The application is built with a component-based architecture, primarily using React and ShadCN UI components.

| Component/File                      | Path                                         | Description                                                                                                                                                                                             |
| ----------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login Page**                      | `src/app/login/page.tsx`                     | The main entry point for authentication. Renders the `LoginForm`.                                                                                                                                       |
| **Login Form**                      | `src/components/LoginForm.tsx`               | A form using `react-hook-form` and `zod` for validation. It captures user credentials and calls the `login` service.                                                                                    |
| **Dashboard**                       | `src/components/Dashboard.tsx`               | The core component that manages the overall state of the application, including the list of widgets and the currently logged-in user's profile. It handles widget creation, deletion, and updates.       |
| **Widget Container**                | `src/components/widgets/WidgetContainer.tsx` | Renders all active (non-minimized) widgets. It manages the drag-and-drop functionality, positioning, and boundaries for each widget using `react-draggable`.                                       |
| **Base Widget**                     | `src/components/widgets/BaseWidget.tsx`      | The main shell for every widget. It includes the header with controls (close, minimize, favorite, chat), the draggable handle, and renders the specific widget type (e.g., `EntityWidget`) inside.      |
| **Entity Widget**                   | `src/components/widgets/EntityWidget.tsx`    | A specialized widget for displaying structured data like Incidents, Problems, and Changes. It features a master-detail view to show a list and then the details of a selected item.                 |
| **Generic Widget**                  | `src/components/widgets/GenericWidget.tsx`   | A simple widget for displaying unstructured text or JSON data, typically used for responses from generic AI queries.                                                                                    |
| **Chat Panel**                      | `src/components/widgets/ChatPanel.tsx`       | The contextual chat interface embedded within each widget. Manages the display of chat history and the input form for asking questions about the widget's data.                                          |
| **Main Chat Input**                 | `src/components/ChatInput.tsx`               | The primary, bottom-of-the-page input field for submitting commands to create new widgets. It supports pre-defined command suggestions and voice input (though voice is browser-dependent).          |
| **App Sidebar**                     | `src/components/layout/AppSidebar.tsx`       | The main navigation sidebar. It displays minimized and favorited widgets, and provides access to the Profile and Settings dialogs. It is collapsible.                                                 |
| **Profile Dialog**                  | `src/components/Profile.tsx`                 | A dialog for viewing and editing the user's profile. It is populated with data fetched from the webhook and sends updates back.                                                                         |
| **User Service**                    | `src/services/userService.ts`                | A service module that encapsulates all communication with the external user profile webhook (login, get profile, update profile) using `axios`.                                                       |
| **ServiceNow Service**              | `src/services/servicenow.ts`                 | A service module responsible for making API calls to the ServiceNow instance to fetch live data like incidents.                                                                                         |
| **Genkit AI Flows**                 | `src/ai/flows/*.ts`                          | A collection of server-side TypeScript files that define the AI logic using Genkit. Each file typically defines a "flow" for a specific task, such as generating a widget from a query (`generate-widget-from-query.ts`) or providing context-aware chat (`context-aware-widget-chat.ts`). |
