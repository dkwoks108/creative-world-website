import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const users = await db.adminUser.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const formatted = users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name,
            role_name: u.role,
            created_at: u.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/users error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
        }

        const existing = await db.adminUser.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (existing) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }

        const passwordHash = await hash(password, 12);

        const newUser = await db.adminUser.create({
            data: {
                name,
                email: email.toLowerCase().trim(),
                passwordHash,
                role: role || "ADMIN",
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/users error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await db.adminUser.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "User deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/users error:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
