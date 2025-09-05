# Product Requirements Document (PRD)

## Product: BablePhish

### Vision
BablePhish is a modern, AI-driven interface layer for ServiceNow. It replaces the clunky, outdated UI with a **chat-first, customizable, and intelligent experience**. Users can interact with a conversational LLM to quickly find data, perform actions, and manage workspaces — eliminating the need for complex dashboards while delivering a consumer-grade UX.

---

## Target Users
- **Agents / Fulfillers** handling ITSM records (Incidents, Tasks, Changes, Problems, Requests).
- **CSM Users** managing customer service cases.
- **HRSD Users** handling HR service delivery cases.

Future expansion: additional ServiceNow modules and integrations beyond ServiceNow.

---

## Problems to Solve
1. **Overwhelming navigation** in ServiceNow’s module menus.
2. **Difficulty locating data** quickly and accurately.
3. **Outdated UX** compared to modern consumer applications.
4. **Heavy admin/developer overhead** in creating and maintaining dashboards.

---

## Core Functionality (MVP)

### 1. Conversational LLM Interface
- **Welcome experience**: On login, users are greeted and asked:
  - Continue from last session → restores previously open workspaces (session management).
  - Start new → “Tell me what you’d like me to help with.”
- **Cross-workspace chat**: The LLM can query across all open workspaces, not just one.
- **Read + Write actions** in ServiceNow:
  - Supports all common ITSM, CSM, and HRSD actions the user has permissions for.
  - Always shows a **preview for confirmation** before committing a write.

### 2. Workspace Management
- Create, read, update, delete (CRUD) workspaces.
- Open multiple workspaces simultaneously.
- Save and clone **preconfigured workspaces**.

### 3. Quick Commands
- Preconfigured system quick commands.
- Users can create and save their own quick commands.

### 4. AI Store & Prompt Catalog
- **AI Store**: List of available assistants that users can activate.
- **Prompt Catalog**: Library of preconfigured prompts available to use and modify.

### 5. Widgets & Data Visualization
- Drag-and-drop widgets to arrange workspace layout.
- Record widgets display relevant record data.
- **Smart highlight**: When a user highlights data in a widget, the LLM can answer contextual questions.
- Chat button inside each record widget to query the LLM about that record.
- Data can be displayed visually (charts, graphs, summaries).

---

## Architecture (MVP)
- **Frontend**: Next.js
- **Backend workflows**: n8n
- **LLM & AI Agents**: OpenAI + Gemini
- **Database**: MongoDB (users, workspaces, sessions, prompts, audit logs)
- **Integration**: ServiceNow APIs + ServiceNow AI Agents (TBD)

---

## Authentication & Security
- Support for **SSO authentication** (preferred).
- Option to use **service account impersonation** for organizations not using SSO.
- **Audit logging (mandatory)**:
  - Who, when, what record, before/after values.
  - Natural-language input, LLM output, confirmation snapshot.
  - Configurable retention policy.
  - Export to ServiceNow Audit, SIEM, or external logs.

---

## Prioritization of Record Types
1. **ITSM** (highest priority) — Incidents, Tasks, Changes, Problems, Requests.
2. **CSM** (second priority) — Cases, workflows.
3. **HRSD** (third priority) — HR cases and requests.

---

## Business Goals & Success Metrics
- Deliver a **modern interface** that feels consumer-grade.
- **Reduce time to find & act** on records.
- **Decrease admin/developer overhead** in building dashboards.
- **Increase adoption & satisfaction** among ServiceNow users.
- **Improve customer satisfaction** with a modernized user experience.

---

## Assumptions & Dependencies
- ServiceNow APIs allow sufficient access for CRUD operations.
- Authentication will be configured per customer (SSO or service account).
- ServiceNow AI Agents integration needs to be explored.
- Future migration path to a **ServiceNow-native application** after MVP.
- Future expansion beyond ServiceNow integrations.

---

## Constraints
- MVP relies on external app architecture (Next.js + n8n + MongoDB + LLMs).
- Performance of LLM queries depends on OpenAI/Gemini API responsiveness.
- ServiceNow licensing and API limits may impose constraints.

---

## Next Steps
1. Validate ServiceNow API limitations and authentication strategy.
2. Define detailed schema for MongoDB (users, workspaces, prompts, sessions, logs).
3. Design confirmation UI for write actions.
4. Begin prototype integration with ServiceNow ITSM records.

