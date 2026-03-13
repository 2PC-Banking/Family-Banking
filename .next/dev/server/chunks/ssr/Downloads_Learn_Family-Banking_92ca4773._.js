module.exports = [
"[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemStatus",
    ()=>SystemStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Learn/Family-Banking/lib/mockData.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function SystemStatus() {
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCurrentTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentTime"])());
        const interval = setInterval(()=>{
            setCurrentTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$lib$2f$mockData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentTime"])());
        }, 1000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-8 py-6 border-b border-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-slate-900",
                        children: "Bank Admin Management System"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-right",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "System Status"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Learn/Family-Banking/components/dashboard/SystemStatus.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Learn$2f$Family$2d$Banking$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
];

//# sourceMappingURL=Downloads_Learn_Family-Banking_92ca4773._.js.map