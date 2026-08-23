import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const post = await db.post.findUnique({
            where: { id: params.id },
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

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const formatted = {
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content,
            author_id: post.authorId,
            author_name: post.author?.name || "",
            category_id: post.categoryId,
            category_name: post.category?.name || "",
            featured_image: post.featuredImage || "",
            status: post.status === "PUBLISHED" ? "Published" : post.status === "DRAFT" ? "Draft" : post.status,
            seo_title: post.seoTitle || post.title,
            seo_desc: post.metaDescription || post.excerpt || "",
            canonical_url: post.canonicalUrl || "",
            og_image: post.ogImage || post.featuredImage || "",
            views: post.views || 0,
            published_at: post.publishAt ? post.publishAt.toISOString() : post.createdAt.toISOString(),
            created_at: post.createdAt.toISOString(),
            updated_at: post.updatedAt.toISOString(),
        };

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/blogs/[id] error:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (slug !== undefined) updateData.slug = slug;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (content !== undefined) updateData.content = content;
        if (author_id !== undefined) updateData.authorId = author_id || null;
        if (category_id !== undefined) updateData.categoryId = category_id || null;
        if (featured_image !== undefined) updateData.featuredImage = featured_image || null;
        if (status !== undefined) updateData.status = status.toUpperCase();
        if (seo_title !== undefined) updateData.seoTitle = seo_title;
        if (seo_desc !== undefined) updateData.metaDescription = seo_desc;
        if (canonical_url !== undefined) updateData.canonicalUrl = canonical_url;
        if (og_image !== undefined) updateData.ogImage = og_image;

        const updatedPost = await db.post.update({
            where: { id: params.id },
            data: updateData,
            include: {
                author: true,
                category: true,
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error: any) {
        console.error("PUT /api/blogs/[id] error:", error);
        return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db.post.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true, message: "Blog post deleted" });
    } catch (error: any) {
        console.error("DELETE /api/blogs/[id] error:", error);
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
