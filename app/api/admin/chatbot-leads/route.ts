import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const leads = await db.chatbotLead.findMany({
            orderBy: { createdAt: "desc" },
        });

        const formatted = leads.map(l => ({
            id: l.id,
            name: l.name || "Anonymous",
            email: l.email || "",
            phone: l.phone || "",
            conversation: l.conversation ? JSON.parse(l.conversation) : [],
            status: l.status,
            created_at: l.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/chatbot-leads error:", error);
        return NextResponse.json({ error: "Failed to fetch chatbot leads" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, conversation } = body;

        const lead = await db.chatbotLead.create({
            data: {
                name: name || null,
                email: email || null,
                phone: phone || null,
                conversation: conversation ? JSON.stringify(conversation) : null,
                status: "New",
            },
        });

        return NextResponse.json(lead, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/chatbot-leads error:", error);
        return NextResponse.json({ error: "Failed to create chatbot lead" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }

        const updated = await db.chatbotLead.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("PATCH /api/admin/chatbot-leads error:", error);
        return NextResponse.json({ error: "Failed to update chatbot lead" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.chatbotLead.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Chatbot lead deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/chatbot-leads error:", error);
        return NextResponse.json({ error: "Failed to delete chatbot lead" }, { status: 500 });
    }
}
