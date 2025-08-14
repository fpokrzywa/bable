# Workspace Synchronization

BabelPhish now includes automatic workspace synchronization that periodically checks for workspace additions, deletions, and modifications from the server.

## Features

### Automatic Sync
- **Periodic Checks**: Automatically checks for workspace changes every 30 seconds
- **Smart Detection**: Identifies added, modified, and deleted workspaces
- **Background Operation**: Runs in the background without interrupting user workflow
- **Tab Awareness**: Pauses sync when browser tab is not active to conserve resources

### Change Detection
- **Added Workspaces**: New workspaces are automatically added to the workspace list
- **Modified Workspaces**: Changes to workspace names or data are detected and updated
- **Deleted Workspaces**: Removed workspaces are cleaned up from the UI and open sessions

### User Experience
- **Visual Indicators**: Sync status shown in sidebar with connection icons
- **Manual Refresh**: Users can manually trigger sync with refresh button
- **Notifications**: Optional toast notifications for workspace changes
- **Last Sync Time**: Display of last successful sync time

## Configuration

### Environment Variables
You can configure the sync behavior with these environment variables:

```bash
# Workspace sync interval in milliseconds (default: 30000 = 30 seconds)
NEXT_PUBLIC_WORKSPACE_SYNC_INTERVAL=30000

# Enable/disable sync notifications (default: true)
NEXT_PUBLIC_WORKSPACE_SYNC_NOTIFICATIONS=true

# Enable/disable workspace sync (default: true)
NEXT_PUBLIC_WORKSPACE_SYNC_ENABLED=true
```

### Programmatic Configuration
The sync behavior can also be configured programmatically:

```typescript
const {
  isChecking,
  lastSyncTime,
  syncNow,
  enabled
} = useWorkspaceSync({
  user,
  workspaces,
  onWorkspacesChanged: (updatedWorkspaces) => {
    // Handle workspace list updates
  },
  onWorkspacesDeleted: (deletedIds) => {
    // Handle workspace deletions
  },
  enabled: true,           // Enable/disable sync
  intervalMs: 30000,       // Check every 30 seconds
  showNotifications: true  // Show change notifications
});
```

## Visual Indicators

### Sidebar Status Icons
- 🟢 **Green Wifi Icon**: Sync is enabled and working
- 🔴 **Gray Wifi Off Icon**: Sync is disabled
- 🔵 **Blue Spinning Loader**: Currently checking for changes

### Sync Information
- **Last Sync Time**: Shows timestamp of last successful sync
- **Manual Refresh Button**: Allows users to trigger immediate sync
- **Loading States**: Visual feedback during sync operations

## API Integration

### Workspace Service Functions
The sync system uses these service functions:

```typescript
// Detect changes between current and server workspaces
detectWorkspaceChanges(userId: string, currentWorkspaces: Workspace[]): Promise<WorkspaceChanges>

// Get fresh workspace data from server
getWorkspaces(userId: string): Promise<Workspace[]>
```

### Change Detection Response
```typescript
interface WorkspaceChanges {
  added: Workspace[];      // Newly created workspaces
  deleted: string[];       // IDs of deleted workspaces
  modified: Workspace[];   // Updated workspaces
  hasChanges: boolean;     // Whether any changes were detected
}
```

## Automatic Cleanup

When workspaces are deleted on the server:
1. They are removed from the workspace list
2. If currently open, they are closed
3. If it was the active workspace, the system switches to another open workspace
4. If no workspaces remain open, the dashboard is cleared

## Performance Considerations

### Efficiency Features
- **Tab Visibility**: Sync pauses when tab is not visible
- **Smart Caching**: Uses cached data when possible
- **Minimal Network**: Only fetches when changes are likely
- **Background Processing**: Non-blocking operations

### Resource Management
- **Automatic Cleanup**: Intervals are cleared on component unmount
- **Memory Management**: Efficiently handles workspace data updates
- **Error Handling**: Graceful degradation on network issues

## Usage Examples

### Basic Setup
```typescript
import { useWorkspaceSync } from '@/hooks/use-workspace-sync';

// In your component
const { isChecking, lastSyncTime, syncNow } = useWorkspaceSync({
  user,
  workspaces,
  onWorkspacesChanged: setWorkspaces,
  onWorkspacesDeleted: handleDeletedWorkspaces
});
```

### Custom Configuration
```typescript
const syncConfig = useWorkspaceSync({
  user,
  workspaces,
  onWorkspacesChanged: setWorkspaces,
  onWorkspacesDeleted: handleDeletedWorkspaces,
  enabled: process.env.NODE_ENV === 'production',
  intervalMs: 60000,  // Check every minute
  showNotifications: false  // Silent updates
});
```

## Troubleshooting

### Common Issues
1. **Sync Not Working**: Check that webhook URLs are configured correctly
2. **Too Frequent Checks**: Adjust `intervalMs` to reduce frequency
3. **Missing Changes**: Ensure server returns proper workspace data format
4. **Performance Issues**: Check browser tab visibility and network conditions

### Debug Information
The sync system logs detailed information to the browser console:
- Detected changes with details
- Sync errors and network issues
- Performance metrics and timing

## Security Considerations

- **Authentication**: All sync requests use existing user authentication
- **Data Validation**: Server responses are validated before processing
- **Error Handling**: Failed syncs don't compromise application stability
- **Privacy**: No sensitive data is logged or exposed during sync operations