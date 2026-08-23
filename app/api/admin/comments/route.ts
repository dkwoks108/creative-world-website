import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const comments = await db.blogComment.findMany({
            orderBy: { createdAt: "desc" },
        });

        const formatted = comments.map(c => ({
            id: c.id,
            post_id: c.postId,
            name: c.name,
            email: c.email,
            content: c.content,
            status: c.status,
            created_at: c.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/comments error:", error);
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { post_id, name, email, content } = body;

        if (!post_id || !name || !email || !content) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const comment = await db.blogComment.create({
            data: {
                postId: post_id,
                name,
                email,
                content,
                status: "Pending",
            },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/comments error:", error);
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }

        const updated = await db.blogComment.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("PATCH /api/admin/comments error:", error);
        return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.blogComment.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Comment deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/comments error:", error);
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
}
