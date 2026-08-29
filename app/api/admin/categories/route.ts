import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const categories = await db.category.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: { posts: true },
                },
            },
        });

        const formatted = categories.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description || "",
            post_count: c._count.posts,
            created_at: c.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/categories error:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, slug, description } = body;

        if (!name) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newCategory = await db.category.create({
            data: {
                name,
                slug: categorySlug,
                description: description || null,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/categories error:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        await db.category.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Category deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/categories error:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
