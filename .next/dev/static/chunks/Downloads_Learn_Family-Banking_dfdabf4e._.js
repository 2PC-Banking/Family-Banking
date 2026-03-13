(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for Bank Admin Management System
__turbopack_context__.s([
    "bankTransactionDetails",
    ()=>bankTransactionDetails,
    "dashboardStatsData",
    ()=>dashboardStatsData,
    "getCurrentTime",
    ()=>getCurrentTime,
    "linkedBanksData",
    ()=>linkedBanksData,
    "successRateTrendData",
    ()=>successRateTrendData,
    "transactionDetails",
    ()=>transactionDetails,
    "transactionVolumeData",
    ()=>transactionVolumeData
]);
const transactionVolumeData = [
    {
        time: '00:00',
        volume: 20
    },
    {
        time: '04:00',
        volume: 25
    },
    {
        time: '08:00',
        volume: 32
    },
    {
        time: '12:00',
        volume: 45
    },
    {
        time: '16:00',
        volume: 38
    },
    {
        time: '20:00',
        volume: 52
    },
    {
        time: '23:59',
        volume: 48
    }
];
const successRateTrendData = [
    {
        time: '00:00',
        rate: 96
    },
    {
        time: '04:00',
        rate: 96.5
    },
    {
        time: '08:00',
        rate: 97
    },
    {
        time: '12:00',
        rate: 97.5
    },
    {
        time: '16:00',
        rate: 97.2
    },
    {
        time: '20:00',
        rate: 95.8
    },
    {
        time: '23:59',
        rate: 96.2
    }
];
const linkedBanksData = [
    {
        id: 'bank-a',
        name: 'Bank A',
        transactions: 245,
        successRate: 98.5,
        status: 'online'
    },
    {
        id: 'bank-b',
        name: 'Bank B',
        transactions: 189,
        successRate: 97.2,
        status: 'online'
    },
    {
        id: 'bank-c',
        name: 'Bank C',
        transactions: 312,
        successRate: 99.1,
        status: 'online'
    },
    {
        id: 'bank-d',
        name: 'Bank D',
        transactions: 78,
        successRate: 94.8,
        status: 'warning'
    }
];
const dashboardStatsData = {
    totalTransactions: 2847,
    successful: 2741,
    processing: 73,
    failed: 33
};
const transactionDetails = {
    successful: [
        {
            id: '001',
            fromBank: 'Bank A',
            toBank: 'Bank B',
            amount: '$50,000',
            timestamp: '08:23:45',
            status: 'Completed'
        },
        {
            id: '002',
            fromBank: 'Bank C',
            toBank: 'Bank A',
            amount: '$75,500',
            timestamp: '08:24:12',
            status: 'Completed'
        },
        {
            id: '003',
            fromBank: 'Bank B',
            toBank: 'Bank D',
            amount: '$32,100',
            timestamp: '08:25:33',
            status: 'Completed'
        },
        {
            id: '004',
            fromBank: 'Bank D',
            toBank: 'Bank C',
            amount: '$120,000',
            timestamp: '08:26:11',
            status: 'Completed'
        },
        {
            id: '005',
            fromBank: 'Bank A',
            toBank: 'Bank C',
            amount: '$45,600',
            timestamp: '08:27:22',
            status: 'Completed'
        }
    ],
    processing: [
        {
            id: 'P001',
            fromBank: 'Bank B',
            toBank: 'Bank A',
            amount: '$60,000',
            timestamp: '08:28:45',
            status: 'Processing'
        },
        {
            id: 'P002',
            fromBank: 'Bank C',
            toBank: 'Bank D',
            amount: '$85,500',
            timestamp: '08:29:12',
            status: 'Processing'
        },
        {
            id: 'P003',
            fromBank: 'Bank A',
            toBank: 'Bank B',
            amount: '$35,200',
            timestamp: '08:30:33',
            status: 'Processing'
        }
    ],
    failed: [
        {
            id: 'F001',
            fromBank: 'Bank D',
            toBank: 'Bank B',
            amount: '$90,000',
            timestamp: '08:20:15',
            status: 'Failed',
            error: 'Insufficient funds'
        },
        {
            id: 'F002',
            fromBank: 'Bank A',
            toBank: 'Bank C',
            amount: '$55,000',
            timestamp: '08:21:30',
            status: 'Failed',
            error: 'Network timeout'
        }
    ]
};
const bankTransactionDetails = {
    'bank-a': [
        {
            id: '001',
            fromBank: 'Bank B',
            toBank: 'Bank A',
            amount: '$50,000',
            timestamp: '08:23:45',
            status: 'Completed'
        },
        {
            id: '002',
            fromBank: 'Bank C',
            toBank: 'Bank A',
            amount: '$75,500',
            timestamp: '08:24:12',
            status: 'Completed'
        },
        {
            id: '003',
            fromBank: 'Bank A',
            toBank: 'Bank C',
            amount: '$45,600',
            timestamp: '08:27:22',
            status: 'Completed'
        },
        {
            id: '004',
            fromBank: 'Bank A',
            toBank: 'Bank B',
            amount: '$60,000',
            timestamp: '08:28:45',
            status: 'Processing'
        }
    ],
    'bank-b': [
        {
            id: '005',
            fromBank: 'Bank A',
            toBank: 'Bank B',
            amount: '$50,000',
            timestamp: '08:23:45',
            status: 'Completed'
        },
        {
            id: '006',
            fromBank: 'Bank B',
            toBank: 'Bank D',
            amount: '$32,100',
            timestamp: '08:25:33',
            status: 'Completed'
        },
        {
            id: '007',
            fromBank: 'Bank B',
            toBank: 'Bank A',
            amount: '$60,000',
            timestamp: '08:28:45',
            status: 'Processing'
        }
    ],
    'bank-c': [
        {
            id: '008',
            fromBank: 'Bank C',
            toBank: 'Bank A',
            amount: '$75,500',
            timestamp: '08:24:12',
            status: 'Completed'
        },
        {
            id: '009',
            fromBank: 'Bank D',
            toBank: 'Bank C',
            amount: '$120,000',
            timestamp: '08:26:11',
            status: 'Completed'
        },
        {
            id: '010',
            fromBank: 'Bank A',
            toBank: 'Bank C',
            amount: '$45,600',
            timestamp: '08:27:22',
            status: 'Completed'
        },
        {
            id: '011',
            fromBank: 'Bank C',
            toBank: 'Bank D',
            amount: '$85,500',
            timestamp: '08:29:12',
            status: 'Processing'
        }
    ],
    'bank-d': [
        {
            id: '012',
            fromBank: 'Bank B',
            toBank: 'Bank D',
            amount: '$32,100',
            timestamp: '08:25:33',
            status: 'Completed'
        },
        {
            id: '013',
            fromBank: 'Bank D',
            toBank: 'Bank C',
            amount: '$120,000',
            timestamp: '08:26:11',
            status: 'Completed'
        },
        {
            id: '014',
            fromBank: 'Bank D',
            toBank: 'Bank B',
            amount: '$90,000',
            timestamp: '08:20:15',
            status: 'Failed',
            error: 'Insufficient funds'
        }
    ]
};
const getCurrentTime = ()=>{
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemStatus",
    ()=>SystemStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SystemStatus() {
    _s();
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SystemStatus.useEffect": ()=>{
            setCurrentTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentTime"])());
            const interval = setInterval({
                "SystemStatus.useEffect.interval": ()=>{
                    setCurrentTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentTime"])());
                }
            }["SystemStatus.useEffect.interval"], 1000);
            return ({
                "SystemStatus.useEffect": ()=>clearInterval(interval)
            })["SystemStatus.useEffect"];
        }
    }["SystemStatus.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-8 py-6 border-b border-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-slate-900",
                        children: "Bank Admin Management System"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 text-sm mt-1",
                        children: "Dashboard Management"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "System Status"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold text-slate-900",
                        children: currentTime
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(SystemStatus, "k0ffgPJ2sZXf+hI6VMRnlXj8X/8=");
_c = SystemStatus;
var _c;
__turbopack_context__.k.register(_c, "SystemStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionDetailModal",
    ()=>TransactionDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
'use client';
;
;
function TransactionDetailModal({ isOpen, title, transactions, onClose }) {
    if (!isOpen) return null;
    const getStatusColor = (status)=>{
        switch(status){
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black bg-opacity-50",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-slate-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-slate-500 hover:text-slate-700 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: transactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-slate-500",
                            children: "No transactions found"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: transactions.map((transaction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-500",
                                                            children: [
                                                                "Transaction ID: ",
                                                                transaction.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-slate-900 mt-1",
                                                            children: [
                                                                transaction.fromBank,
                                                                " → ",
                                                                transaction.toBank
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`,
                                                    children: transaction.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                            lineNumber: 75,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500",
                                                            children: "Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-slate-900",
                                                            children: transaction.amount
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 94,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500",
                                                            children: "Timestamp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-slate-900",
                                                            children: transaction.timestamp
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, this),
                                                transaction.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-500",
                                                            children: "Error"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-red-600",
                                                            children: transaction.error
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, transaction.id, true, {
                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                                    lineNumber: 71,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = TransactionDetailModal;
var _c;
__turbopack_context__.k.register(_c, "TransactionDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatCards",
    ()=>StatCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$TransactionDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const StatCard = ({ title, value, subtitle, icon, color, onClick })=>{
    const colorClasses = {
        blue: 'bg-blue-50',
        green: 'bg-green-50',
        yellow: 'bg-yellow-50',
        red: 'bg-red-50'
    };
    const iconColorClasses = {
        blue: 'text-blue-300',
        green: 'text-green-300',
        yellow: 'text-yellow-300',
        red: 'text-red-300'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: `${colorClasses[color]} rounded-lg p-6 border border-slate-100 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 text-sm font-medium",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-3xl font-bold text-slate-900 mt-2",
                            children: value.toLocaleString()
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-500 mt-1",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${iconColorClasses[color]} text-4xl`,
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = StatCard;
function StatCards({ data }) {
    _s();
    const [modalState, setModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        type: null
    });
    const successRate = (data.successful / data.totalTransactions * 100).toFixed(1);
    const errorRate = (data.failed / data.totalTransactions * 100).toFixed(1);
    const getTransactionsByType = (type)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionDetails"][type];
    };
    const handleOpenModal = (type)=>{
        setModalState({
            isOpen: true,
            type
        });
    };
    const handleCloseModal = ()=>{
        setModalState({
            isOpen: false,
            type: null
        });
    };
    const getModalTitle = ()=>{
        switch(modalState.type){
            case 'successful':
                return 'Successful Transactions';
            case 'processing':
                return 'Processing Transactions';
            case 'failed':
                return 'Failed Transactions';
            default:
                return '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-6 px-8 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Total Transactions",
                        value: data.totalTransactions,
                        subtitle: "Today",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            size: 32
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 109,
                            columnNumber: 17
                        }, void 0),
                        color: "blue"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Successful",
                        value: data.successful,
                        subtitle: `${successRate}% success rate`,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            size: 32
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 116,
                            columnNumber: 17
                        }, void 0),
                        color: "green",
                        onClick: ()=>handleOpenModal('successful')
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Processing",
                        value: data.processing,
                        subtitle: "In queue",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            size: 32
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 124,
                            columnNumber: 17
                        }, void 0),
                        color: "yellow",
                        onClick: ()=>handleOpenModal('processing')
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        title: "Failed",
                        value: data.failed,
                        subtitle: `${errorRate}% error rate`,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                            size: 32
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, void 0),
                        color: "red",
                        onClick: ()=>handleOpenModal('failed')
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$TransactionDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionDetailModal"], {
                isOpen: modalState.isOpen,
                title: getModalTitle(),
                transactions: modalState.type ? getTransactionsByType(modalState.type) : [],
                onClose: handleCloseModal
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(StatCards, "R0DPo/0nx+2HN8GThYcbJRW+rMo=");
_c1 = StatCards;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "StatCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionVolumeChart",
    ()=>TransactionVolumeChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
function TransactionVolumeChart({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg border border-slate-200 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold text-slate-900 mb-4",
                children: "Transaction Volume"
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 350,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            stroke: "#e2e8f0"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "time",
                            stroke: "#94a3b8"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            stroke: "#94a3b8"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#f1f5f9'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: "volume",
                            fill: "#1e88e5",
                            radius: [
                                8,
                                8,
                                0,
                                0
                            ]
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = TransactionVolumeChart;
var _c;
__turbopack_context__.k.register(_c, "TransactionVolumeChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SuccessRateTrendChart",
    ()=>SuccessRateTrendChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
function SuccessRateTrendChart({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg border border-slate-200 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold text-slate-900 mb-4",
                children: "Success Rate Trend"
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 350,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                    data: data,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            strokeDasharray: "3 3",
                            stroke: "#e2e8f0"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "time",
                            stroke: "#94a3b8"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            stroke: "#94a3b8",
                            domain: [
                                90,
                                100
                            ]
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#f1f5f9'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                            type: "monotone",
                            dataKey: "rate",
                            stroke: "#1e88e5",
                            strokeWidth: 3,
                            dot: false,
                            isAnimationActive: true
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = SuccessRateTrendChart;
var _c;
__turbopack_context__.k.register(_c, "SuccessRateTrendChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BankDetailModal",
    ()=>BankDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
'use client';
;
;
function BankDetailModal({ isOpen, bank, bankTransactions, onClose }) {
    if (!isOpen || !bank) return null;
    const statusColor = {
        online: 'text-green-500 bg-green-50',
        warning: 'text-yellow-500 bg-yellow-50',
        offline: 'text-red-500 bg-red-50'
    };
    const statusLabel = {
        online: 'Online',
        warning: 'Warning',
        offline: 'Offline'
    };
    const getTransactionStatusColor = (status)=>{
        switch(status){
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Processing':
                return 'bg-blue-100 text-blue-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const completedCount = bankTransactions.filter((t)=>t.status === 'Completed').length;
    const processingCount = bankTransactions.filter((t)=>t.status === 'Processing').length;
    const failedCount = bankTransactions.filter((t)=>t.status === 'Failed').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black bg-opacity-50",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-slate-900",
                                children: bank.name
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-slate-500 hover:text-slate-700 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 rounded-lg p-4 border border-blue-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                        size: 18,
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-600 font-medium",
                                                        children: "Total Transactions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-slate-900",
                                                children: bank.transactions
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 95,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-50 rounded-lg p-4 border border-green-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-600 font-medium mb-2",
                                                children: "Completed"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-green-600",
                                                children: completedCount
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 100,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 rounded-lg p-4 border border-blue-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-600 font-medium mb-2",
                                                children: "Processing"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-blue-600",
                                                children: processingCount
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-50 rounded-lg p-4 border border-red-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-600 font-medium mb-2",
                                                children: "Failed"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-red-600",
                                                children: failedCount
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-lg p-4 border ${statusColor[bank.status]}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-medium opacity-75",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-lg font-semibold",
                                                            children: statusLabel[bank.status]
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-50 rounded-lg p-4 border border-slate-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-600 font-medium mb-2",
                                                children: "Success Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-bold text-slate-900",
                                                children: [
                                                    bank.successRate,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-slate-900 mb-4",
                                        children: "Recent Transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    bankTransactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-slate-500 py-8",
                                        children: "No transactions found"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: bankTransactions.map((transaction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-500",
                                                                        children: [
                                                                            "ID: ",
                                                                            transaction.id
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 146,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-medium text-slate-900 mt-1",
                                                                        children: [
                                                                            transaction.fromBank,
                                                                            " → ",
                                                                            transaction.toBank
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 147,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-3 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`,
                                                                children: transaction.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-4 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-500",
                                                                        children: "Amount"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 162,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-slate-900",
                                                                        children: transaction.amount
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-500",
                                                                        children: "Timestamp"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 166,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-slate-900",
                                                                        children: transaction.timestamp
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 167,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 23
                                                            }, this),
                                                            transaction.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-slate-500",
                                                                        children: "Error"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 171,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-semibold text-red-600",
                                                                        children: transaction.error
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, transaction.id, true, {
                                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                        lineNumber: 138,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = BankDetailModal;
var _c;
__turbopack_context__.k.register(_c, "BankDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LinkedBanksStatus",
    ()=>LinkedBanksStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$BankDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/BankDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const BankCard = ({ bank, onClick })=>{
    const statusColor = {
        online: 'text-green-500',
        warning: 'text-yellow-500',
        offline: 'text-red-500'
    };
    const statusLabel = {
        online: 'Online',
        warning: 'Warning',
        offline: 'Offline'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: "bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900",
                                children: bank.name
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: [
                                    bank.transactions,
                                    " transactions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-slate-900",
                                children: [
                                    bank.successRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 mt-1",
                                children: "Success rate"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mt-4 pt-4 border-t border-slate-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-3 h-3 rounded-full ${statusColor[bank.status]}`
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-medium ${statusColor[bank.status]}`,
                        children: statusLabel[bank.status]
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = BankCard;
function LinkedBanksStatus({ banks }) {
    _s();
    const [selectedBank, setSelectedBank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-8 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-slate-900 mb-6",
                        children: "Linked Banks Status"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-6",
                        children: banks.map((bank)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BankCard, {
                                bank: bank,
                                onClick: ()=>setSelectedBank(bank)
                            }, bank.id, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$BankDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BankDetailModal"], {
                isOpen: selectedBank !== null,
                bank: selectedBank,
                bankTransactions: selectedBank ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bankTransactionDetails"][selectedBank.id] || [] : [],
                onClose: ()=>setSelectedBank(null)
            }, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(LinkedBanksStatus, "Fe29H75uyoYgl7F4hguAtNHic54=");
_c1 = LinkedBanksStatus;
var _c, _c1;
__turbopack_context__.k.register(_c, "BankCard");
__turbopack_context__.k.register(_c1, "LinkedBanksStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$SystemStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$StatCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/StatCards.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$TransactionVolumeChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/TransactionVolumeChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$SuccessRateTrendChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/SuccessRateTrendChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$LinkedBanksStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/components/dashboard/LinkedBanksStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function DashboardPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$SystemStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemStatus"], {}, void 0, false, {
                fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$StatCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatCards"], {
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardStatsData"]
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-6 grid grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$TransactionVolumeChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionVolumeChart"], {
                                data: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionVolumeData"]
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$SuccessRateTrendChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuccessRateTrendChart"], {
                                data: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["successRateTrendData"]
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$components$2f$dashboard$2f$LinkedBanksStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkedBanksStatus"], {
                        banks: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkedBanksData"]
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Learn/Family-Banking/app/dashboard/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Learn_Family-Banking_dfdabf4e._.js.map