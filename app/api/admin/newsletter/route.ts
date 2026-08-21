import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const subscribers = await db.newsletterSubscriber.findMany({
            orderBy: { createdAt: "desc" },
        });

        const formatted = subscribers.map(s => ({
            id: s.id,
            email: s.email,
            status: s.status,
            source: s.source,
            created_at: s.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/newsletter error:", error);
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, source } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const subscriber = await db.newsletterSubscriber.upsert({
            where: { email: email.toLowerCase().trim() },
            update: { status: "Subscribed" },
            create: {
                email: email.toLowerCase().trim(),
                source: source || "Website Footer",
                status: "Subscribed",
            },
        });

        return NextResponse.json(subscriber, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/newsletter error:", error);
        return NextResponse.json({ error: "Failed to add subscriber" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Subscriber ID is required" }, { status: 400 });
        }

        await db.newsletterSubscriber.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Subscriber deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/newsletter error:", error);
        return NextResponse.json({ error: "Failed to delete subscriber" }, { status: 500 });
    }
}
