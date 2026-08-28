"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
    Users,
    TrendingUp,
    Clock,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    RefreshCw,
    BarChart3
} from "lucide-react";

const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month) => ({
        month,
        value: Math.floor(Math.random() * 400) + 100,
        users: Math.floor(Math.random() * 5000) + 1000,
        revenue: Math.floor(Math.random() * 50000) + 10000
    }));
};

const generateWeeklyData = () => {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    return weeks.map((week) => ({
        month: week,
        value: Math.floor(Math.random() * 300) + 150,
        users: Math.floor(Math.random() * 2000) + 500,
        revenue: Math.floor(Math.random() * 20000) + 5000
    }));
};

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<"week" | "month">("month");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [statisticsData, setStatisticsData] = useState(generateMonthlyData());

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => prev.map(stat =>
                stat.label === "Active Visitors"
                    ? { ...stat, value: `${Math.floor(Math.random() * 20) + 40}` }
                    : stat
            ));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeRange === "week") {
            setStatisticsData(generateWeeklyData());
        } else {
            setStatisticsData(generateMonthlyData());
        }
    }, [timeRange]);

    const [stats, setStats] = useState([
        {
            label: "Total Visitors",
            value: "99,340",
            change: "+25.4%",
            trending: "up",
            icon: Users,
            description: "Unique visitors past 30 days"
        },
        {
            label: "Inquiries Captured",
            value: "1,248",
            change: "+14.3%",
            trending: "up",
            icon: TrendingUp,
            description: "High-intent client leads"
        },
        {
            label: "Avg Session Duration",
            value: "04m 45s",
            change: "-2.1%",
            trending: "down",
            icon: Clock,
            description: "Mean time on site"
        },
        {
            label: "Active Visitors",
            value: "48",
            change: "+12.4%",
            trending: "up",
            icon: Activity,
            description: "Live real-time users"
        }
    ]);

    const maxValue = Math.max(...statisticsData.map(d => d.value));

    const userExploreData = [
        { label: "Home Page (/)", sessions: "38.50%", avgTime: "03m 23s", bounceRate: "18.2%", pageViews: "142.4k" },
        { label: "Services (/services)", sessions: "28.30%", avgTime: "04m 15s", bounceRate: "22.1%", pageViews: "98.2k" },
        { label: "Insights Blog (/insights)", sessions: "17.50%", avgTime: "05m 45s", bounceRate: "24.4%", pageViews: "76.3k" },
        { label: "Contact Us (/contact)", sessions: "12.40%", avgTime: "02m 32s", bounceRate: "41.6%", pageViews: "54.1k" },
        { label: "About Us (/about)", sessions: "9.30%", avgTime: "02m 18s", bounceRate: "38.9%", pageViews: "41.7k" }
    ];

    const deviceBreakdown = [
        { device: "Desktop", percentage: 62, color: "bg-cyan-400" },
        { device: "Mobile", percentage: 32, color: "bg-indigo-500" },
        { device: "Tablet", percentage: 6, color: "bg-purple-500" }
    ];

    const handleRefresh = () => {
        setIsRefreshing(true);
        setStatisticsData(timeRange === "week" ? generateWeeklyData() : generateMonthlyData());
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(statisticsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `creativee-analytics-${timeRange}-${Date.now()}.json`;
        link.click();
    };

    return (
        <div className="max-w-[1400px] mx-auto text-white pb-20 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <BarChart3 className="text-cyan-400" size={24} />
                        Executive Traffic & Conversion Telemetry
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Real-time engagement telemetry, page duration, and user acquisition flows</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        className="p-2.5 hover:bg-[#0D121F] border border-[#1E293B] rounded-xl transition-colors text-slate-400 hover:text-white"
                        disabled={isRefreshing}
                    >
                        <RefreshCw size={16} className={cn(isRefreshing && "animate-spin text-cyan-400")} />
                    </button>
                    <Button
                        onClick={handleExport}
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl"
                    >
                        <Download size={16} /> Export Telemetry JSON
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="bg-[#111622] border border-[#1E293B] rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                                <div className="p-2 rounded-xl bg-[#0D121F] border border-[#1E293B] text-cyan-400">
                                    <Icon size={16} />
                                </div>
                            </div>
                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-2xl font-bold font-mono text-white">{stat.value}</span>
                                <span className={cn(
                                    "text-[10px] font-semibold flex items-center gap-0.5",
                                    stat.trending === "up" ? "text-emerald-400" : "text-amber-400"
                                )}>
                                    {stat.trending === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">{stat.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-base font-bold text-white">Traffic Acquisition & Volume</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTimeRange("week")}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-lg transition-colors border",
                                    timeRange === "week" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold" : "border-[#1E293B] text-slate-400 hover:text-white"
                                )}
                            >
                                Weekly
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-lg transition-colors border",
                                    timeRange === "month" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold" : "border-[#1E293B] text-slate-400 hover:text-white"
                                )}
                            >
                                Monthly
                            </button>
                        </div>
                    </div>

                    <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
                        {statisticsData.slice(0, 12).map((item, index) => (
                            <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full relative h-44 flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(item.value / maxValue) * 100}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 via-purple-600 to-cyan-400 group-hover:brightness-125 transition-all shadow-md shadow-cyan-500/10"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">{item.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-bold text-white mb-4">Device Distribution</h3>
                        <div className="space-y-4 pt-2">
                            {deviceBreakdown.map((device, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2.5 h-2.5 rounded-full", device.color)} />
                                        <span className="text-slate-300 font-medium">{device.device}</span>
                                    </div>
                                    <span className="font-mono text-cyan-400 font-bold">{device.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1A2333]">
                        <div className="h-2.5 bg-[#0D121F] rounded-full overflow-hidden flex gap-1 p-0.5 border border-[#1E293B]">
                            {deviceBreakdown.map((device, index) => (
                                <div key={index} style={{ width: `${device.percentage}%` }} className={cn("rounded-full", device.color)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Telemetry Table */}
            <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-[#1A2333]">
                    <h2 className="text-base font-bold text-white">Top Page Telemetry & Engagement</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Page URI</th>
                                <th className="p-4">Total Views</th>
                                <th className="p-4">Session %</th>
                                <th className="p-4">Avg. Duration</th>
                                <th className="p-4 text-right">Bounce Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {userExploreData.map((row, index) => (
                                <tr key={index} className="hover:bg-[#0D121F]/60 transition-colors">
                                    <td className="p-4 font-semibold text-white">{row.label}</td>
                                    <td className="p-4 text-slate-300 font-mono">{row.pageViews}</td>
                                    <td className="p-4 text-cyan-400 font-mono">{row.sessions}</td>
                                    <td className="p-4 text-slate-400 font-mono">{row.avgTime}</td>
                                    <td className="p-4 text-right text-slate-400 font-mono">{row.bounceRate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
