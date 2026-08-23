import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ success: false, user: null }, { status: 401 });
        }

        const user = await db.adminUser.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ success: false, user: null }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_name: user.role,
                permissions: [
                    "analytics.view",
                    "content.create",
                    "content.edit",
                    "content.delete",
                    "settings.general",
                    "settings.security",
                    "users.view",
                    "users.create",
                ],
            },
        });
    } catch (error: any) {
        console.error("Auth me error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
