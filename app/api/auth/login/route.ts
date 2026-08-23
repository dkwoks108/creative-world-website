import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { createAdminSession } from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
        }

        // Find user by email
        const user = await db.adminUser.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password
        const passwordMatch = await compare(password, user.passwordHash);
        if (!passwordMatch) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Create DB session and HTTP-only cookie
        await createAdminSession(user.id, user.email, user.role);

        // Audit log
        await db.auditLog.create({
            data: {
                userId: user.id,
                action: "ADMIN_LOGIN_SUCCESS",
                resource: "Auth",
                details: JSON.stringify({ email: user.email }),
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error: any) {
        console.error("Login route error:", error);
        return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
    }
}
