import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const settingsList = await db.siteSetting.findMany();
        
        // Default settings object
        const settingsMap: Record<string, string> = {
            site_name: "CREATIVE WORLD",
            site_description: "Premium Digital Marketing & Web Development Agency",
            contact_email: "hello@creativeworld.com",
            contact_phone: "+91 98765 43210",
            address: "Jaipur, Rajasthan, India",
            logo_url: "",
            favicon_url: "",
            primary_color: "#14b8a6",
            currency: "USD",
            maintenance_mode: "false",
        };

        settingsList.forEach(s => {
            settingsMap[s.key] = s.value;
        });

        return NextResponse.json({
            success: true,
            settings: settingsMap,
        });
    } catch (error: any) {
        console.error("GET /api/admin/settings error:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const settings = body.settings || body;

        if (typeof settings !== "object") {
            return NextResponse.json({ error: "Settings object is required" }, { status: 400 });
        }

        const updatePromises = Object.entries(settings).map(([key, value]) =>
            db.siteSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) },
            })
        );

        await Promise.all(updatePromises);

        return NextResponse.json({
            success: true,
            message: "Settings saved successfully",
        });
    } catch (error: any) {
        console.error("POST /api/admin/settings error:", error);
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }
}
