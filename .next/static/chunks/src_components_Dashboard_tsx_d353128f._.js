(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/Dashboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Dashboard": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$c3a3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:c3a3ba [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$bb1511__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:bb1511 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$91368b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:91368b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$c6a80f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:c6a80f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/widgets/WidgetContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChatInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$975fc4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:975fc4 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$companyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/companyService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/userService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f8da3e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:f8da3e [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$aadb99__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:aadb99 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$0e8ca8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:0e8ca8 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$25ee43__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:25ee43 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkle.js [app-client] (ecmascript) <export default as Sparkle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-mobile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$workspace$2d$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-workspace-sync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$BaseWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/widgets/BaseWidget.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Profile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIStore.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PromptCatalog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PromptCatalog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/UserManagement.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoleManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoleManagement.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompanyManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CompanyManagement.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompanyEdit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CompanyEdit.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FindAnswersPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FindAnswersPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Dashboard() {
    _s();
    var _s1 = __turbopack_context__.k.signature();
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    const [selectedFindAnswersId, setSelectedFindAnswersId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [widgets, setWidgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savedQueries, setSavedQueries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingWorkspaces, setLoadingWorkspaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { state, openMobile, setOpenMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"])();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [nextZIndex, setNextZIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [lastRestorePosition, setLastRestorePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const sidebarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chatInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCompany, setSelectedCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [workspaces, setWorkspaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [openWorkspaces, setOpenWorkspaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentWorkspaceId, setCurrentWorkspaceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [workspaceName, setWorkspaceName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [workspaceToEdit, setWorkspaceToEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [workspaceAction, setWorkspaceAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isWorkspaceListOpen, setIsWorkspaceListOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDraggingWidget, setIsDraggingWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isManualSaving, setIsManualSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeWorkspace = openWorkspaces.find((ws)=>ws.workspaceId === currentWorkspaceId) || null;
    const MAX_OPEN_SESSIONS = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WORKSPACE_OPEN_SESSIONS || '3', 10);
    // Workspace synchronization
    const { isChecking: isSyncingWorkspaces, lastSyncTime, syncNow: syncWorkspacesNow, enabled: syncEnabled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$workspace$2d$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceSync"])({
        user,
        workspaces,
        onWorkspacesChanged: {
            "Dashboard.useWorkspaceSync": (updatedWorkspaces)=>{
                setWorkspaces(updatedWorkspaces);
            }
        }["Dashboard.useWorkspaceSync"],
        onWorkspacesDeleted: {
            "Dashboard.useWorkspaceSync": (deletedIds)=>{
                // Remove deleted workspaces from open sessions
                const remainingOpen = openWorkspaces.filter({
                    "Dashboard.useWorkspaceSync.remainingOpen": (ws)=>!deletedIds.includes(ws.workspaceId)
                }["Dashboard.useWorkspaceSync.remainingOpen"]);
                setOpenWorkspaces(remainingOpen);
                // If current workspace was deleted, switch to first available or clear
                if (currentWorkspaceId && deletedIds.includes(currentWorkspaceId)) {
                    if (remainingOpen.length > 0) {
                        setCurrentWorkspaceId(remainingOpen[0].workspaceId);
                        loadWorkspaceUI(remainingOpen[0]);
                    } else {
                        setCurrentWorkspaceId(null);
                        setWidgets([]);
                    }
                }
            }
        }["Dashboard.useWorkspaceSync"],
        enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WORKSPACE_SYNC_ENABLED !== 'false',
        intervalMs: parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WORKSPACE_SYNC_INTERVAL || '30000', 10),
        showNotifications: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WORKSPACE_SYNC_NOTIFICATIONS !== 'false'
    });
    const loadUserData = ()=>{
        // First try to get cached data from login
        const cachedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedUserData"])();
        if (cachedData.user && cachedData.workspaces.length >= 0) {
            // Use cached data immediately
            setUser(cachedData.user);
            setWorkspaces(cachedData.workspaces);
            setLoadingWorkspaces(false);
            return;
        }
        // Fallback to fetching if no cached data (shouldn't happen after login)
        fetchUserDataFallback();
    };
    const fetchUserDataFallback = async ()=>{
        const session = localStorage.getItem('session');
        if (!session) return;
        const userEmail = JSON.parse(session).email;
        if (!userEmail) return;
        setLoading(true);
        try {
            const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])(userEmail);
            setUser(profile);
            if (profile) {
                const workspacesData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$aadb99__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getWorkspaces"])(profile.userId);
                setWorkspaces(workspacesData);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally{
            setLoading(false);
            setLoadingWorkspaces(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            loadUserData();
        }
    }["Dashboard.useEffect"], []);
    const useDebouncedEffect = (effect, deps, delay)=>{
        _s1();
        const callback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(effect, deps);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
            "Dashboard.useDebouncedEffect.useEffect": ()=>{
                const handler = setTimeout({
                    "Dashboard.useDebouncedEffect.useEffect.handler": ()=>{
                        callback();
                    }
                }["Dashboard.useDebouncedEffect.useEffect.handler"], delay);
                return ({
                    "Dashboard.useDebouncedEffect.useEffect": ()=>{
                        clearTimeout(handler);
                    }
                })["Dashboard.useDebouncedEffect.useEffect"];
            }
        }["Dashboard.useDebouncedEffect.useEffect"], [
            callback,
            delay
        ]);
    };
    _s1(useDebouncedEffect, "ZIj6QtVwIfE66Vedop4i8qKWkXs=");
    // Debounced auto-save for workspace changes
    useDebouncedEffect({
        "Dashboard.useDebouncedEffect": ()=>{
            if (activeWorkspace && user && !loading && !isWorkspaceModalOpen && !isDraggingWidget && !isManualSaving) {
                handleQuickSaveWorkspace(true);
            }
        }
    }["Dashboard.useDebouncedEffect"], [
        widgets,
        activeWorkspace,
        user,
        isDraggingWidget,
        isManualSaving
    ], 1000);
    const handleProfileUpdate = ()=>{
        // Refresh user data from server and update cache
        fetchUserDataFallback();
    };
    const handleViewChange = (view)=>{
        setCurrentView(view);
        // Check if this is a Find Answers item
        const findAnswersItems = [
            'it-support-guides',
            'my-support-guides',
            'hr-policies',
            'niea-guides',
            'adept-guides'
        ];
        if (findAnswersItems.includes(view)) {
            setSelectedFindAnswersId(view);
        } else {
            setSelectedFindAnswersId(null);
        }
        // Refresh user data when switching to profile view to get latest changes
        if (view === 'profile') {
            fetchUserDataFallback();
        }
    };
    const handleEditCompany = (company)=>{
        setSelectedCompany(company);
        setCurrentView('company-edit');
    };
    const handleBackToCompanyList = ()=>{
        setSelectedCompany(null);
        setCurrentView('company-management');
    };
    const handleMainWorkspace = ()=>{
        // Switch to dashboard view
        setCurrentView('dashboard');
        // Clear current workspace (no active workspace selected)
        setCurrentWorkspaceId(null);
        // Minimize all current widgets
        setWidgets((prevWidgets)=>prevWidgets.map((widget)=>({
                    ...widget,
                    isMinimized: true
                })));
    // Keep all open workspaces - just deselect the current one
    // This preserves the workspace buttons at the top
    };
    const renderDashboardView = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "absolute inset-0 z-0",
            children: [
                isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 space-y-4",
                    style: {
                        paddingTop: mobileHeaderHeight,
                        paddingBottom: chatInputAreaHeight
                    },
                    children: normalWidgets.map((widget)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$BaseWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseWidget"], {
                                widget: widget,
                                removeWidget: removeWidget,
                                updateEntity: updateEntity,
                                bringToFront: bringToFront,
                                toggleMinimizeWidget: toggleMinimizeWidget,
                                toggleFavoriteWidget: toggleFavoriteWidget
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 230,
                                columnNumber: 15
                            }, this)
                        }, widget.id, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 229,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetContainer"], {
                    widgets: normalWidgets,
                    removeWidget: removeWidget,
                    updateEntity: updateEntity,
                    bringToFront: bringToFront,
                    toggleMinimizeWidget: toggleMinimizeWidget,
                    toggleFavoriteWidget: toggleFavoriteWidget,
                    updateWidgetPosition: updateWidgetPosition,
                    updateWidgetDimensions: updateWidgetDimensions,
                    sidebarState: state,
                    sidebarRef: sidebarRef,
                    chatInputRef: chatInputRef,
                    setIsDragging: setIsDraggingWidget
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex flex-col items-center pointer-events-none",
                    style: {
                        paddingLeft: !isMobile && sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px` : '0'
                    },
                    children: normalWidgets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full w-full max-w-xl mx-auto items-center text-center p-4",
                        style: {
                            paddingBottom: isMobile ? chatInputAreaHeight : '6rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow flex flex-col justify-center items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/bablephish_logo.svg",
                                    alt: "BabelPhish Logo",
                                    width: 100,
                                    height: 100,
                                    className: "mx-auto mb-6 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-muted-foreground mb-4",
                                    children: "Welcome to BabelPhish"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground mb-8 max-w-md",
                                    children: "Start by typing a command or query below to create your first widget."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pointer-events-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mb-4 text-center col-span-full",
                                            children: "Quick browse items"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Dashboard.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 col-span-full",
                                            children: starterPrompts.map((prompt, index)=>{
                                                const Icon = prompt.icon;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "link",
                                                    className: "w-full justify-start h-auto py-3 px-4 text-left text-sm bg-transparent pointer-events-auto rounded-lg",
                                                    onClick: ()=>handleStarterPrompt(prompt.query),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: "mr-3 text-primary",
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 25
                                                        }, this),
                                                        prompt.text
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Dashboard.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 258,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Dashboard.tsx",
            lineNumber: 225,
            columnNumber: 5
        }, this);
    const renderCurrentView = ()=>{
        switch(currentView){
            case 'dashboard':
                return renderDashboardView();
            case 'ai-store':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIStore"], {}, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 311,
                    columnNumber: 11
                }, this);
            case 'prompt-catalog':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PromptCatalog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromptCatalog"], {}, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 318,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 317,
                    columnNumber: 11
                }, this);
            case 'profile':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Profile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Profile"], {
                            user: user,
                            onProfileUpdate: handleProfileUpdate,
                            isPage: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 325,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 324,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 323,
                    columnNumber: 11
                }, this);
            case 'user-management':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserManagement"], {}, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 333,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 332,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 331,
                    columnNumber: 11
                }, this);
            case 'role-management':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoleManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoleManagement"], {}, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 340,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 339,
                    columnNumber: 11
                }, this);
            case 'company-management':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompanyManagement$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompanyManagement"], {
                            onEditCompany: handleEditCompany
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 349,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 348,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 347,
                    columnNumber: 11
                }, this);
            case 'company-edit':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompanyEdit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompanyEdit"], {
                        company: selectedCompany,
                        onBack: handleBackToCompanyList,
                        onSave: handleBackToCompanyList
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 356,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 355,
                    columnNumber: 11
                }, this);
            default:
                // Check if this is a Find Answers item
                if (selectedFindAnswersId) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FindAnswersPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FindAnswersPanel"], {
                                findAnswersId: selectedFindAnswersId,
                                onClose: ()=>{
                                    setSelectedFindAnswersId(null);
                                    setCurrentView('dashboard');
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 368,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-1 bg-gray-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col transition-all duration-300 ease-in-out flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        width: "24",
                                                                        height: "24",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        className: "w-3 h-3 sm:w-4 sm:h-4 text-orange-600",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 384,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                        lineNumber: 383,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 382,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-gray-900 text-sm sm:text-base truncate",
                                                                    children: "ODIN"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-1 sm:space-x-2 flex-shrink-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "px-2 py-1 sm:px-3 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            children: "GPT-4o"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 391,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            children: "GPT-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 392,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            children: "Claude-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 393,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            children: "Gemini Pro"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 394,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-2 py-1 sm:px-4 sm:py-1 bg-orange-600 text-white rounded text-xs sm:text-sm hover:bg-orange-700 transition-colors",
                                                                    children: "Prompts"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 396,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 text-gray-600 rounded text-xs sm:text-sm hover:bg-gray-50 transition-colors",
                                                                    children: "Clear"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                lineNumber: 379,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex flex-col px-3 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 flex flex-col justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-w-4xl w-full mx-auto",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "text-base sm:text-lg lg:text-xl font-medium text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center",
                                                                    children: "Please ask ODIN your questions"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 410,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center px-2",
                                                                    children: "Ask a question or add files to the conversation using the paperclip icon."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 413,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-2 sm:space-x-3 bg-white rounded-lg p-2 sm:p-3 border border-gray-200 shadow-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "p-1 sm:p-2 text-gray-400 hover:text-orange-600 transition-colors flex-shrink-0 relative",
                                                                            title: "Upload files",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                width: "24",
                                                                                height: "24",
                                                                                viewBox: "0 0 24 24",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                strokeWidth: "2",
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                className: "w-4 h-4 sm:w-5 sm:h-5",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 425,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                                lineNumber: 424,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 423,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            placeholder: "Ask a question...",
                                                                            className: "flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base min-w-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 428,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "p-1 sm:p-2 text-gray-400 hover:text-orange-600 transition-colors flex-shrink-0",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                width: "24",
                                                                                height: "24",
                                                                                viewBox: "0 0 24 24",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                strokeWidth: "2",
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                className: "w-4 h-4 sm:w-5 sm:h-5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                                        lineNumber: 435,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        d: "M19 10v2a7 7 0 0 1-14 0v-2"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                                        lineNumber: 436,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                                        x1: "12",
                                                                                        x2: "12",
                                                                                        y1: "19",
                                                                                        y2: "22"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                                        lineNumber: 437,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                                lineNumber: 434,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 433,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "p-2 sm:p-3 transition-colors flex-shrink-0 rounded-lg text-gray-400 hover:text-orange-600",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                width: "24",
                                                                                height: "24",
                                                                                viewBox: "0 0 24 24",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                strokeWidth: "2",
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                className: "w-4 h-4 sm:w-5 sm:h-5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        d: "m22 2-7 20-4-9-9-4Z"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                                        lineNumber: 442,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                        d: "M22 2 11 13"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                                        lineNumber: 443,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                                lineNumber: 441,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 440,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 422,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3 justify-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                                    width: "24",
                                                                                    height: "24",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    className: "w-3 h-3 text-gray-400",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "11",
                                                                                            cy: "11",
                                                                                            r: "8"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 450,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "m21 21-4.3-4.3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 451,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 449,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "hidden sm:inline",
                                                                                    children: "Web Search"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 453,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "sm:hidden",
                                                                                    children: "Web"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 454,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, "web-search", true, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 448,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                                    width: "24",
                                                                                    height: "24",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    className: "w-3 h-3 text-gray-400",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M3 3v18h18"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 458,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M18 17V9"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 459,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M13 17V5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 460,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M8 17v-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 461,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 457,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Research"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 463,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, "research", true, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 456,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors text-xs",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                                    width: "24",
                                                                                    height: "24",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    className: "w-3 h-3 text-gray-400",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                                            width: "18",
                                                                                            height: "18",
                                                                                            x: "3",
                                                                                            y: "3",
                                                                                            rx: "2",
                                                                                            ry: "2"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 467,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "9",
                                                                                            cy: "9",
                                                                                            r: "2"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 468,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                                            lineNumber: 469,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 466,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "hidden sm:inline",
                                                                                    children: "Help me with this"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 471,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "sm:hidden",
                                                                                    children: "Image"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                                    lineNumber: 472,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, "help-with-this", true, {
                                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                                            lineNumber: 465,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 447,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Dashboard.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                lineNumber: 407,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 377,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 376,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 375,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 367,
                        columnNumber: 13
                    }, this);
                }
                // Handle other dynamic views
                if (currentView !== 'dashboard' && currentView !== 'ai-store' && currentView !== 'prompt-catalog' && currentView !== 'profile' && currentView !== 'user-management' && currentView !== 'role-management' && currentView !== 'company-management' && currentView !== 'company-edit') {
                    const title = currentView.split('-').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-semibold mb-4",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 497,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: [
                                            "Content for ",
                                            title.toLowerCase(),
                                            " will be available here."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 498,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 496,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 495,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 494,
                        columnNumber: 13
                    }, this);
                }
                return renderDashboardView();
        }
    };
    const fetchWorkspaces = async (userId, forceRefresh = false)=>{
        if (!userId) return;
        // Use cached data first if not forcing refresh
        if (!forceRefresh) {
            const { workspaces: cachedWorkspaces } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedUserData"])();
            if (cachedWorkspaces.length > 0) {
                setWorkspaces(cachedWorkspaces);
                setLoadingWorkspaces(false);
                return;
            }
        }
        setLoadingWorkspaces(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$aadb99__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getWorkspaces"])(userId);
            setWorkspaces(data);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCachedWorkspaces"])(data);
        } catch (error) {
            console.error("Failed to fetch workspaces", error);
        } finally{
            setLoadingWorkspaces(false);
        }
    };
    const refreshWorkspaces = ()=>{
        if (user) {
            syncWorkspacesNow();
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!activeWorkspace) {
                setWidgets([]);
            }
        }
    }["Dashboard.useEffect"], [
        activeWorkspace
    ]);
    const bringToFront = (id, isSummaryOrChat)=>{
        setWidgets((prevWidgets)=>{
            const currentMaxZ = prevWidgets.reduce((max, w)=>Math.max(max, w.zIndex), 0) || 1;
            const newZIndex = isSummaryOrChat ? 100 : currentMaxZ + 1;
            return prevWidgets.map((w)=>w.id === id ? {
                    ...w,
                    zIndex: newZIndex
                } : w);
        });
    };
    const createWidgetFromDefinition = (widgetDef, id)=>{
        const newZIndex = nextZIndex;
        setNextZIndex(newZIndex + 1);
        const sidebarWidth = state === 'expanded' && sidebarRef.current ? sidebarRef.current.offsetWidth : 0;
        const workspaceWidth = window.innerWidth - sidebarWidth;
        const workspaceHeight = window.innerHeight;
        // Add some randomness to avoid perfect stacking
        const randomOffsetX = Math.floor(Math.random() * 50) - 25;
        const randomOffsetY = Math.floor(Math.random() * 50) - 25;
        const initialX = sidebarWidth + workspaceWidth / 2 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_WIDTH"] / 2 + randomOffsetX;
        const initialY = workspaceHeight / 2 - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_HEIGHT"] / 2 + randomOffsetY;
        const newWidget = {
            ...widgetDef,
            id: id || Date.now().toString(),
            isMinimized: false,
            x: widgetDef.x ?? initialX,
            y: widgetDef.y ?? initialY,
            width: widgetDef.width ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_WIDTH"],
            height: widgetDef.height ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_HEIGHT"]
        };
        setWidgets((prev)=>[
                ...prev,
                newWidget
            ]);
    };
    const handleCreateWidget = async (query)=>{
        if (!query.trim()) return;
        setLoading(true);
        const lowerCaseQuery = query.toLowerCase();
        let newWidgetDef = null;
        try {
            if (lowerCaseQuery.includes('@servicenow')) {
                // Get the user's company URL for ServiceNow integration
                let serviceNowUrl;
                if (user?.company_id) {
                    try {
                        const companyId = typeof user.company_id === 'object' ? user.company_id.$oid : user.company_id;
                        const company = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$companyService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompanyById"])(companyId);
                        serviceNowUrl = company?.url;
                        if (!serviceNowUrl) {
                            toast({
                                variant: 'destructive',
                                title: 'Configuration Required',
                                description: 'ServiceNow Instance URL is not configured for your company. Please contact your administrator.'
                            });
                            return;
                        }
                    } catch (error) {
                        console.error('Failed to get company ServiceNow URL:', error);
                        toast({
                            variant: 'destructive',
                            title: 'Error',
                            description: 'Could not retrieve company configuration. Using default ServiceNow instance.'
                        });
                    }
                }
                const incidentData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$975fc4__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getIncidents"])(serviceNowUrl);
                newWidgetDef = {
                    query: serviceNowUrl ? `ServiceNow Records (${new URL(serviceNowUrl).hostname})` : 'ServiceNow Records',
                    data: incidentData,
                    agent: {
                        agentType: 'Incident Agent',
                        agentBehavior: 'Manages and resolves incidents.'
                    },
                    type: 'incident',
                    isFavorited: false
                };
            } else if (lowerCaseQuery.includes('@incident')) {
                const incidentData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f8da3e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getSampleData"])('incident');
                newWidgetDef = {
                    query: 'Incidents',
                    data: incidentData,
                    agent: {
                        agentType: 'Incident Agent',
                        agentBehavior: 'Manages and resolves incidents.'
                    },
                    type: 'incident',
                    isFavorited: false
                };
            } else if (lowerCaseQuery.includes('@change')) {
                const changeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f8da3e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getSampleData"])('change_request');
                newWidgetDef = {
                    query: 'Changes',
                    data: changeData,
                    agent: {
                        agentType: 'Change Agent',
                        agentBehavior: 'Manages and tracks change requests.'
                    },
                    type: 'change',
                    isFavorited: false
                };
            } else if (lowerCaseQuery.includes('@problem')) {
                const problemData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f8da3e__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getSampleData"])('problem');
                newWidgetDef = {
                    query: 'Problem',
                    data: problemData,
                    agent: {
                        agentType: 'Problem Agent',
                        agentBehavior: 'Manages and resolves problems.'
                    },
                    type: 'problem',
                    isFavorited: false
                };
            } else if (lowerCaseQuery.includes('@summary')) {
                const allWidgetData = widgets.map((w)=>({
                        type: w.type,
                        query: w.query,
                        data: w.data
                    }));
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$c6a80f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateOverviewSummary"])({
                    widgetData: allWidgetData
                });
                newWidgetDef = {
                    query: 'Overview Summary',
                    data: result.summary,
                    agent: {
                        agentType: 'Summary Agent',
                        agentBehavior: 'Provides a summary of all open widgets.'
                    },
                    type: 'generic',
                    isFavorited: false
                };
            } else {
                const allWorkspacesData = openWorkspaces.flatMap((ws)=>{
                    try {
                        const widgetsInWorkspace = JSON.parse(ws.workspace_data);
                        return widgetsInWorkspace.map((w)=>({
                                type: w.type,
                                query: w.query,
                                data: w.data
                            }));
                    } catch (e) {
                        console.error(`Could not parse workspace data for ${ws.workspace_name}`, e);
                        return [];
                    }
                });
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$c3a3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWidgetFromQuery"])({
                    query,
                    workspaceData: allWorkspacesData
                });
                if (result.workspace_to_load) {
                    const workspaceToLoad = workspaces.find((ws)=>ws.workspace_name.toLowerCase().includes(result.workspace_to_load.toLowerCase()));
                    if (workspaceToLoad) {
                        setWorkspaceAction('load');
                        handleWorkspaceListSelect(workspaceToLoad);
                    } else {
                        toast({
                            variant: 'destructive',
                            title: 'Not Found',
                            description: `Workspace "${result.workspace_to_load}" not found.`
                        });
                    }
                }
                const agent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$bb1511__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["agentSpecificWidget"])({
                    widgetData: result.answer
                });
                newWidgetDef = {
                    query: query,
                    data: result.answer,
                    agent: agent,
                    type: 'generic',
                    isFavorited: false
                };
            }
            if (newWidgetDef) {
                const fullWidgetDef = {
                    ...newWidgetDef,
                    zIndex: newWidgetDef.type === 'generic' ? 100 : nextZIndex
                };
                createWidgetFromDefinition(fullWidgetDef);
            }
        } catch (error) {
            console.error('Failed to create widget:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not create widget. The AI service may be temporarily unavailable. Please try again later.'
            });
        } finally{
            setLoading(false);
        }
    };
    const handleSaveQuery = async (query, name)=>{
        if (!query.trim() || !name.trim()) return;
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$91368b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveQueryWithVoiceText"])({
                queryName: name,
                queryText: query
            });
            if (result.success) {
                setSavedQueries((prev)=>[
                        ...prev,
                        {
                            name,
                            query
                        }
                    ]);
                toast({
                    title: 'Query Saved',
                    description: `"${name}" has been saved successfully.`
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Save Failed',
                    description: result.message
                });
            }
        } catch (error) {
            console.error('Failed to save query:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not save the query.'
            });
        }
    };
    const removeWidget = (id)=>{
        setWidgets((prev)=>prev.filter((w)=>w.id !== id));
    };
    const toggleMinimizeWidget = (id)=>{
        setWidgets((prevWidgets)=>prevWidgets.map((widget)=>{
                if (widget.id === id) {
                    const isMinimized = !widget.isMinimized;
                    let newPosition = {};
                    if (!isMinimized) {
                        const newX = lastRestorePosition.x + 20;
                        const newY = lastRestorePosition.y + 20;
                        setLastRestorePosition({
                            x: newX,
                            y: newY
                        });
                        newPosition = {
                            x: newX,
                            y: newY
                        };
                    }
                    return {
                        ...widget,
                        isMinimized,
                        ...newPosition
                    };
                }
                return widget;
            }));
    };
    const handleRestoreFavorite = (fav)=>{
        const activeWidget = widgets.find((w)=>w.id === fav.id);
        if (!activeWidget) {
            // Create a new widget instance from the favorite definition
            createWidgetFromDefinition({
                ...fav,
                isFavorited: true
            }, fav.id);
        } else {
            // If widget is just minimized, un-minimize it and bring to front
            if (activeWidget.isMinimized) {
                toggleMinimizeWidget(activeWidget.id);
            }
            bringToFront(activeWidget.id);
        }
    };
    const toggleFavoriteWidget = (id)=>{
        let widgetToToggle = widgets.find((w)=>w.id === id);
        if (!widgetToToggle) {
            widgetToToggle = favorites.find((f)=>f.id === id);
        }
        if (!widgetToToggle) return;
        const isCurrentlyFavorited = widgetToToggle.isFavorited;
        // Update the widget in the main widgets array if it exists
        setWidgets((prev)=>prev.map((w)=>w.id === id ? {
                    ...w,
                    isFavorited: !isCurrentlyFavorited
                } : w));
        // Update the favorites list
        if (!isCurrentlyFavorited) {
            // Add to favorites if not already there
            setFavorites((prev)=>{
                if (prev.some((f)=>f.id === id)) {
                    return prev.map((f)=>f.id === id ? {
                            ...widgetToToggle,
                            isFavorited: true
                        } : f);
                }
                return [
                    ...prev,
                    {
                        ...widgetToToggle,
                        isFavorited: true
                    }
                ];
            });
        } else {
            // Remove from favorites
            setFavorites((prev)=>prev.filter((f)=>f.id !== id));
        }
    };
    const updateWidgetPosition = (id, x, y)=>{
        setWidgets((prevWidgets)=>prevWidgets.map((widget)=>widget.id === id ? {
                    ...widget,
                    x,
                    y
                } : widget));
    };
    const updateWidgetDimensions = (id, width, height)=>{
        setWidgets((prevWidgets)=>prevWidgets.map((widget)=>widget.id === id ? {
                    ...widget,
                    width,
                    height
                } : widget));
    };
    const updateEntity = (widgetId, entityNumber, updatedData)=>{
        const updateInData = (data)=>data.map((entity)=>entity.number === entityNumber ? {
                    ...entity,
                    ...updatedData
                } : entity);
        setWidgets((prevWidgets)=>prevWidgets.map((widget)=>{
                if (widget.id === widgetId && (widget.type === 'problem' || widget.type === 'incident' || widget.type === 'change')) {
                    if (!Array.isArray(widget.data)) return widget;
                    return {
                        ...widget,
                        data: updateInData(widget.data)
                    };
                }
                return widget;
            }));
        setFavorites((prevFavorites)=>prevFavorites.map((fav)=>{
                if (fav.id === widgetId && (fav.type === 'problem' || fav.type === 'incident' || fav.type === 'change')) {
                    if (!Array.isArray(fav.data)) return fav;
                    return {
                        ...fav,
                        data: updateInData(fav.data)
                    };
                }
                return fav;
            }));
    };
    const handleWorkspaceAction = (action)=>{
        setWorkspaceAction(action);
        if (action === 'create') {
            setWorkspaceName('');
            setWorkspaceToEdit(null);
            setIsWorkspaceModalOpen(true);
        } else if (action === 'edit') {
            if (user) fetchWorkspaces(user.userId, true); // Force refresh when editing
            setIsWorkspaceListOpen(true);
        } else if (action === 'forget') {
            handleDeleteWorkspace();
        } else if (action === 'load') {
            if (user) fetchWorkspaces(user.userId);
            setIsWorkspaceListOpen(true);
        } else if (action === 'save') {
            handleQuickSaveWorkspace();
        }
    };
    const handleQuickSaveWorkspace = async (silent = false)=>{
        if (!activeWorkspace || !activeWorkspace.workspace_name) {
            if (!silent) handleWorkspaceAction('create');
            return;
        }
        if (!user) return;
        // If this is a manual save (not silent), set the flag
        if (!silent) {
            setIsManualSaving(true);
        }
        const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest })=>rest);
        const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex })=>({
                id,
                x: Math.round(x || 0),
                y: Math.round(y || 0),
                width: width || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_WIDTH"],
                height: height || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_HEIGHT"],
                zIndex
            }));
        const workspace_data = JSON.stringify(widgetContent);
        const cordinates = JSON.stringify(widgetCoordinates);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$0e8ca8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveWorkspace"])({
            userId: user.userId,
            workspace_name: activeWorkspace.workspace_name,
            workspace_data,
            cordinates,
            workspaceId: activeWorkspace.workspaceId
        });
        if (result) {
            if (!silent) {
                toast({
                    title: 'Success',
                    description: `Workspace "${activeWorkspace.workspace_name}" saved.`,
                    duration: 2000
                });
            }
            // After saving, only refresh workspaces list but don't reload UI to avoid position conflicts
            if (user) {
                await fetchWorkspaces(user.userId, true);
            }
        } else {
            if (!silent) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to save workspace.'
                });
            }
        }
        // Clear manual saving flag after a delay for manual saves
        if (!silent) {
            setTimeout(()=>{
                setIsManualSaving(false);
            }, 2000);
        }
    };
    const handleSaveWorkspace = async ()=>{
        if (!user || !workspaceName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'User not found or workspace name is empty.'
            });
            return;
        }
        setLoading(true);
        setIsManualSaving(true);
        const isCreating = workspaceAction === 'create';
        const isEditing = workspaceAction === 'edit' && workspaceToEdit;
        let workspace_data;
        let cordinates;
        if (isCreating) {
            const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest })=>rest);
            const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex })=>({
                    id,
                    x: Math.round(x || 0),
                    y: Math.round(y || 0),
                    width: width || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_WIDTH"],
                    height: height || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_HEIGHT"],
                    zIndex
                }));
            workspace_data = JSON.stringify(widgetContent);
            cordinates = JSON.stringify(widgetCoordinates);
        } else if (isEditing) {
            workspace_data = workspaceToEdit.workspace_data;
            cordinates = workspaceToEdit.cordinates;
        } else {
            // Fallback for saving an unnamed workspace (shouldn't happen with the new flow)
            const widgetContent = widgets.map(({ x, y, width, height, zIndex, ...rest })=>rest);
            const widgetCoordinates = widgets.map(({ id, x, y, width, height, zIndex })=>({
                    id,
                    x: Math.round(x || 0),
                    y: Math.round(y || 0),
                    width: width || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_WIDTH"],
                    height: height || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$widgets$2f$WidgetContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_INITIAL_HEIGHT"],
                    zIndex
                }));
            workspace_data = JSON.stringify(widgetContent);
            cordinates = JSON.stringify(widgetCoordinates);
        }
        const workspaceIdToSave = isCreating ? undefined : workspaceToEdit.workspaceId;
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$0e8ca8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveWorkspace"])({
            userId: user.userId,
            workspace_name: workspaceName,
            workspace_data,
            cordinates,
            workspaceId: workspaceIdToSave
        });
        setLoading(false);
        if (result) {
            toast({
                title: 'Success',
                description: `Workspace "${workspaceName}" saved.`,
                duration: 2000
            });
            await fetchWorkspaces(user.userId, true);
            if (isCreating) {
                const newWorkspace = {
                    ...result,
                    last_accessed: new Date().toISOString()
                };
                setOpenWorkspaces((prev)=>[
                        ...prev,
                        newWorkspace
                    ]);
                setCurrentWorkspaceId(newWorkspace.workspaceId);
            } else if (isEditing) {
                // Update the open workspace tab with the new name
                setOpenWorkspaces((prev)=>prev.map((ws)=>ws.workspaceId === workspaceToEdit.workspaceId ? {
                            ...ws,
                            workspace_name: workspaceName
                        } : ws));
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to save workspace.'
            });
        }
        // Clear manual saving flag after a delay to allow auto-save to resume
        setTimeout(()=>{
            setIsManualSaving(false);
        }, 2000);
        setIsWorkspaceModalOpen(false);
        setWorkspaceName('');
        setWorkspaceToEdit(null);
    };
    const handleDeleteWorkspace = async ()=>{
        if (!activeWorkspace) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No active workspace to forget.'
            });
            return;
        }
        setLoading(true);
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$25ee43__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteWorkspace"])(activeWorkspace.workspaceId);
        setLoading(false);
        if (success) {
            const deletedId = activeWorkspace.workspaceId;
            setWorkspaces((prev)=>prev.filter((ws)=>ws.workspaceId !== deletedId));
            closeWorkspace(deletedId);
            toast({
                title: 'Success',
                description: `Workspace "${activeWorkspace.workspace_name}" has been forgotten.`,
                duration: 2000
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to forget workspace.'
            });
        }
    };
    const loadWorkspaceUI = (workspace)=>{
        try {
            if (workspace.workspace_data && workspace.workspace_data.trim() !== '') {
                const contentData = JSON.parse(workspace.workspace_data);
                if (workspace.cordinates) {
                    const layoutData = JSON.parse(workspace.cordinates);
                    console.log('Loading coordinates from workspace:', layoutData);
                    const layoutMap = new Map(layoutData.map((l)=>[
                            l.id,
                            l
                        ]));
                    const mergedWidgets = contentData.map((widget)=>({
                            ...widget,
                            ...layoutMap.get(widget.id) || {}
                        }));
                    console.log('Final merged widgets being set:', mergedWidgets.map((w)=>({
                            id: w.id,
                            x: w.x,
                            y: w.y,
                            width: w.width,
                            height: w.height
                        })));
                    setWidgets(mergedWidgets);
                } else {
                    // Fallback for old format
                    setWidgets(contentData);
                }
            } else {
                setWidgets([]);
            }
        } catch (error) {
            console.error("Failed to parse workspace data", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not load workspace."
            });
        }
    };
    const loadWorkspaceDirectly = (workspace)=>{
        // Always switch to dashboard view when loading a workspace
        setCurrentView('dashboard');
        // Check if workspace is already open
        if (openWorkspaces.find((ws)=>ws.workspaceId === workspace.workspaceId)) {
            setCurrentWorkspaceId(workspace.workspaceId);
            loadWorkspaceUI(workspace);
            return;
        }
        // Check workspace limit
        if (openWorkspaces.length >= MAX_OPEN_SESSIONS) {
            toast({
                variant: 'destructive',
                title: 'Limit Reached',
                description: `You can only have ${MAX_OPEN_SESSIONS} workspaces open at a time.`
            });
            return;
        }
        // Add to open workspaces and load
        setOpenWorkspaces((prev)=>[
                ...prev,
                workspace
            ]);
        setCurrentWorkspaceId(workspace.workspaceId);
        loadWorkspaceUI(workspace);
    };
    const handleWorkspaceListSelect = (workspace)=>{
        setIsWorkspaceListOpen(false);
        if (workspaceAction === 'load') {
            if (openWorkspaces.find((ws)=>ws.workspaceId === workspace.workspaceId)) {
                setCurrentWorkspaceId(workspace.workspaceId);
                loadWorkspaceUI(workspace);
                return;
            }
            if (openWorkspaces.length >= MAX_OPEN_SESSIONS) {
                toast({
                    variant: 'destructive',
                    title: 'Limit Reached',
                    description: `You can only have ${MAX_OPEN_SESSIONS} workspaces open at a time.`
                });
                return;
            }
            setOpenWorkspaces((prev)=>[
                    ...prev,
                    workspace
                ]);
            setCurrentWorkspaceId(workspace.workspaceId);
            loadWorkspaceUI(workspace);
        } else if (workspaceAction === 'edit') {
            setWorkspaceToEdit(workspace);
            setWorkspaceName(workspace.workspace_name);
            setIsWorkspaceModalOpen(true);
        }
    };
    const switchWorkspace = (workspaceId)=>{
        const workspaceToSwitch = openWorkspaces.find((ws)=>ws.workspaceId === workspaceId);
        if (workspaceToSwitch) {
            setCurrentWorkspaceId(workspaceId);
            loadWorkspaceUI(workspaceToSwitch);
        }
    };
    const closeWorkspace = (workspaceId)=>{
        const remainingWorkspaces = openWorkspaces.filter((ws)=>ws.workspaceId !== workspaceId);
        setOpenWorkspaces(remainingWorkspaces);
        if (currentWorkspaceId === workspaceId) {
            if (remainingWorkspaces.length > 0) {
                const newCurrent = remainingWorkspaces[0];
                setCurrentWorkspaceId(newCurrent.workspaceId);
                loadWorkspaceUI(newCurrent);
            } else {
                setCurrentWorkspaceId(null);
                setWidgets([]); // Clear widgets if no workspace is open
            }
        }
    };
    const normalWidgets = widgets.filter((w)=>!w.isMinimized);
    const minimizedWidgets = widgets.filter((w)=>w.isMinimized && !favorites.some((fav)=>fav.id === w.id));
    const starterPrompts = [
        {
            text: 'Get my incidents',
            query: '@incident',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"]
        },
        {
            text: 'Show me high priority changes',
            query: '@change high priority',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"]
        },
        {
            text: 'Are there any recurring problems?',
            query: '@problem recurring',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkle$3e$__["Sparkle"]
        }
    ];
    const handleStarterPrompt = (query)=>{
        handleCreateWidget(query);
    };
    const renderSidebar = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppSidebar"], {
            user: user,
            minimizedWidgets: minimizedWidgets,
            favoritedWidgets: favorites,
            onRestoreWidget: toggleMinimizeWidget,
            onRestoreFavorite: handleRestoreFavorite,
            onProfileUpdate: handleProfileUpdate,
            workspaces: workspaces,
            onLoadWorkspace: loadWorkspaceDirectly,
            onWorkspaceAction: handleWorkspaceAction,
            currentView: currentView,
            onViewChange: handleViewChange,
            onMainWorkspace: handleMainWorkspace,
            onRefreshWorkspaces: refreshWorkspaces,
            isSyncingWorkspaces: isSyncingWorkspaces,
            syncEnabled: syncEnabled,
            lastSyncTime: lastSyncTime,
            activeWorkspaceId: currentWorkspaceId
        }, void 0, false, {
            fileName: "[project]/src/components/Dashboard.tsx",
            lineNumber: 1169,
            columnNumber: 5
        }, this);
    const mobileHeaderHeight = 56; // 14 * 4
    const chatInputAreaHeight = 96; // 24 * 4
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-screen w-screen overflow-hidden bg-background",
        children: [
            isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: openMobile,
                onOpenChange: setOpenMobile,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    side: "left",
                    className: "p-0 w-[300px] bg-card/95",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                    className: "sr-only",
                                    children: "Main Menu"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1199,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                    className: "sr-only",
                                    children: "Navigate through workspaces, favorites, and settings."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1198,
                            columnNumber: 13
                        }, this),
                        renderSidebar()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 1197,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Dashboard.tsx",
                lineNumber: 1196,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: sidebarRef,
                className: "z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                    side: "left",
                    collapsible: "icon",
                    variant: state === 'collapsed' ? 'floating' : 'sidebar',
                    children: renderSidebar()
                }, void 0, false, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 1209,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Dashboard.tsx",
                lineNumber: 1208,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-hidden relative",
                children: [
                    renderCurrentView(),
                    isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "absolute top-0 left-0 right-0 p-2 flex items-center justify-between z-30",
                        style: {
                            height: mobileHeaderHeight
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                onClick: ()=>setOpenMobile(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1222,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1221,
                                columnNumber: 17
                            }, this),
                            activeWorkspace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold truncate px-2",
                                children: activeWorkspace.workspace_name
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1225,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1229,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 1220,
                        columnNumber: 13
                    }, this) : // Only show workspace buttons when on dashboard view
                    currentView === 'dashboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 left-0 right-0 flex items-center justify-center gap-2 p-4 bg-transparent z-30 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 pointer-events-auto",
                            children: openWorkspaces.map((ws)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group relative flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: ws.workspaceId === currentWorkspaceId ? "secondary" : "ghost",
                                                size: "sm",
                                                className: "rounded-full px-6 py-2 h-auto shadow-lg",
                                                onClick: ()=>switchWorkspace(ws.workspaceId),
                                                children: ws.workspace_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                lineNumber: 1239,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-end w-full gap-1 mt-2 h-6 opacity-0 group-hover:opacity-100 transition-opacity pr-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "h-6 w-6",
                                                                    onClick: ()=>handleQuickSaveWorkspace(),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                        lineNumber: 1250,
                                                                        columnNumber: 132
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 1250,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1249,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: "Save"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1252,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                        lineNumber: 1248,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "h-6 w-6",
                                                                    onClick: ()=>{
                                                                        setWorkspaceAction('edit');
                                                                        setWorkspaceToEdit(ws);
                                                                        setWorkspaceName(ws.workspace_name);
                                                                        setIsWorkspaceModalOpen(true);
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                        lineNumber: 1261,
                                                                        columnNumber: 36
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 1256,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1255,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1263,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "h-6 w-6",
                                                                    onClick: ()=>closeWorkspace(ws.workspaceId),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                                        lineNumber: 1267,
                                                                        columnNumber: 136
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Dashboard.tsx",
                                                                    lineNumber: 1267,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1266,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                children: "Close"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                                lineNumber: 1269,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Dashboard.tsx",
                                                        lineNumber: 1265,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Dashboard.tsx",
                                                lineNumber: 1247,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 1238,
                                        columnNumber: 25
                                    }, this)
                                }, ws.workspaceId, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1237,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1235,
                            columnNumber: 19
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 1234,
                        columnNumber: 17
                    }, this),
                    currentView === 'dashboard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: chatInputRef,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-40 transition-transform duration-300 ease-in-out absolute bottom-0 left-0 right-0"),
                        style: {
                            paddingLeft: !isMobile && sidebarRef.current && state === 'expanded' ? `${sidebarRef.current.offsetWidth}px` : '0'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-transparent w-full max-w-xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {
                                onSubmit: handleCreateWidget,
                                onSave: handleSaveQuery,
                                loading: loading,
                                widgets: widgets,
                                onWorkspaceAction: handleWorkspaceAction,
                                user: user
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1284,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1283,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Dashboard.tsx",
                        lineNumber: 1282,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Dashboard.tsx",
                lineNumber: 1215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isWorkspaceModalOpen,
                onOpenChange: setIsWorkspaceModalOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    size: "form",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: [
                                        workspaceAction === 'create' ? 'Create' : 'Edit',
                                        " Workspace"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1292,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: workspaceAction === 'create' ? "Give your workspace a name to save the current layout." : `Renaming workspace: ${workspaceToEdit?.workspace_name}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1293,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1291,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "workspace-name",
                                        className: "text-right",
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 1302,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "workspace-name",
                                        value: workspaceName,
                                        onChange: (e)=>setWorkspaceName(e.target.value),
                                        className: "col-span-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 1303,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1301,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1300,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogClose"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 1312,
                                        columnNumber: 42
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1312,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSaveWorkspace,
                                    disabled: !workspaceName.trim() || loading,
                                    children: [
                                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "mr-2 h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Dashboard.tsx",
                                            lineNumber: 1314,
                                            columnNumber: 37
                                        }, this),
                                        "Save"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1313,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1311,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 1290,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Dashboard.tsx",
                lineNumber: 1289,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isWorkspaceListOpen,
                onOpenChange: setIsWorkspaceListOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: workspaceAction === 'load' ? 'Load Workspace' : 'Edit Workspace'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1323,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: workspaceAction === 'load' ? "Select a saved workspace to load it onto your dashboard." : "Select a workspace to edit its name."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Dashboard.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1322,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4",
                            children: loadingWorkspaces ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "mx-auto animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1332,
                                columnNumber: 42
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    workspaces.map((ws)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "w-full justify-start",
                                            onClick: ()=>handleWorkspaceListSelect(ws),
                                            children: ws.workspace_name
                                        }, ws.workspaceId, false, {
                                            fileName: "[project]/src/components/Dashboard.tsx",
                                            lineNumber: 1335,
                                            columnNumber: 33
                                        }, this)),
                                    workspaces.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground text-center",
                                        children: "No saved workspaces found."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Dashboard.tsx",
                                        lineNumber: 1339,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Dashboard.tsx",
                                lineNumber: 1333,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dashboard.tsx",
                            lineNumber: 1331,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Dashboard.tsx",
                    lineNumber: 1321,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Dashboard.tsx",
                lineNumber: 1320,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Dashboard.tsx",
        lineNumber: 1194,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "VObElw2RpsAJr8y3rK1lkaHsNQE=", true, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidebar"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$workspace$2d$sync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspaceSync"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_Dashboard_tsx_d353128f._.js.map