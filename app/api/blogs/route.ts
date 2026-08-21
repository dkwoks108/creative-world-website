import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const categoryId = searchParams.get("categoryId");
        const search = searchParams.get("search");

        const where: any = {};
        if (status && status !== "All") {
            where.status = status.toUpperCase();
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { excerpt: { contains: search } },
                { content: { contains: search } },
            ];
        }

        const posts = await db.post.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                author: true,
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        // Format for Blog list component
        const formatted = posts.map(p => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt || "",
            content: p.content,
            author_id: p.authorId,
            author_name: p.author?.name || "Admin",
            category_id: p.categoryId,
            category_name: p.category?.name || "General",
            featured_image: p.featuredImage || "",
            status: p.status === "PUBLISHED" ? "Published" : p.status === "DRAFT" ? "Draft" : p.status,
            seo_title: p.seoTitle || p.title,
            seo_desc: p.metaDescription || p.excerpt || "",
            canonical_url: p.canonicalUrl || "",
            og_image: p.ogImage || p.featuredImage || "",
            views: p.views || 0,
            published_at: p.publishAt ? p.publishAt.toISOString() : p.createdAt.toISOString(),
            created_at: p.createdAt.toISOString(),
            updated_at: p.updatedAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/blogs error:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            title,
            slug,
            excerpt,
            content,
            author_id,
            category_id,
            featured_image,
            status,
            seo_title,
            seo_desc,
            canonical_url,
            og_image,
        } = body;

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newPost = await db.post.create({
            data: {
                title,
                slug: blogSlug,
                excerpt: excerpt || null,
                content,
                authorId: author_id || null,
                categoryId: category_id || null,
                featuredImage: featured_image || null,
                status: status ? status.toUpperCase() : "DRAFT",
                seoTitle: seo_title || title,
                metaDescription: seo_desc || excerpt || null,
                canonicalUrl: canonical_url || null,
                ogImage: og_image || featured_image || null,
            },
            include: {
                author: true,
                category: true,
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/blogs error:", error);
        return NextResponse.json({ error: error.message || "Failed to create blog" }, { status: 500 });
    }
}
