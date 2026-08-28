"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D14] p-4 relative overflow-hidden text-white">
      {/* Glow Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#111622] border-[#1E293B] shadow-2xl relative z-10 rounded-2xl overflow-hidden">
        <CardHeader className="text-center pb-6 border-b border-[#1A2333] pt-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center">
              <Sparkles className="text-cyan-400" size={24} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight font-poppins">
            CREATIVEE WORLD ADMIN
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs mt-1">
            Executive Portal for Authorized Management
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold text-slate-300 ml-1">
                  Admin Email
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-[#0D121F] border border-[#1E293B] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm"
                    placeholder="admin@creativeeworld.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-semibold text-slate-300 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 bg-[#0D121F] border border-[#1E293B] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-sm"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs py-3 px-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle size={16} />
                <p>{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex gap-2 justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-white" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Admin
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1A2333]">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span>256-bit Encrypted Session Security</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                © 2026 Creativee World Jaipur. All Rights Reserved.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
