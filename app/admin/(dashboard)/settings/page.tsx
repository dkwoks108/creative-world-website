"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Save, Settings, CheckCircle2 } from "lucide-react";

export default function AdminSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({
        site_name: "CREATIVE WORLD",
        site_description: "Premium Digital Marketing & Web Development Agency",
        contact_email: "hello@creativeeworld.com",
        contact_phone: "+91 98765 43210",
        address: "Jaipur, Rajasthan, India",
        primary_color: "#22d3ee",
        currency: "INR",
        maintenance_mode: "false",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings");
            if (res.ok) {
                const data = await res.json();
                if (data.settings) {
                    setSettings(prev => ({ ...prev, ...data.settings }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings }),
            });
            if (res.ok) {
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 3000);
            }
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Settings className="text-cyan-400" size={24} />
                        Global Portal & Brand Settings
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Configure site branding, executive metadata, and agency contact channels</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <form onSubmit={handleSave} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 shadow-xl">
                    {savedNotice && (
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs font-semibold">
                            <CheckCircle2 size={16} />
                            System settings successfully synchronized!
                        </div>
                    )}

                    <div className="space-y-4">
                        <h2 className="text-sm font-bold text-white border-b border-[#1A2333] pb-2 text-cyan-400 uppercase tracking-wider">Brand Identity</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                                <label className="text-slate-300 mb-1 block font-semibold">Brand / Agency Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                                    value={settings.site_name || ""}
                                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 mb-1 block font-semibold">Primary Currency</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={settings.currency || ""}
                                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="text-xs">
                            <label className="text-slate-300 mb-1 block font-semibold">Meta Brand Tagline / Description</label>
                            <textarea
                                rows={2}
                                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                                value={settings.site_description || ""}
                                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h2 className="text-sm font-bold text-white border-b border-[#1A2333] pb-2 text-cyan-400 uppercase tracking-wider">Contact & Office Coordinates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                                <label className="text-slate-300 mb-1 block font-semibold">Executive Contact Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={settings.contact_email || ""}
                                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 mb-1 block font-semibold">Contact Telephone</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={settings.contact_phone || ""}
                                    onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="text-xs">
                            <label className="text-slate-300 mb-1 block font-semibold">HQ Address Location</label>
                            <input
                                type="text"
                                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                                value={settings.address || ""}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/20"
                        >
                            <Save size={16} />
                            {saving ? "Synchronizing..." : "Save Settings"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
