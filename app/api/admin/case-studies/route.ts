import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const studies = await db.caseStudy.findMany({
            orderBy: { createdAt: "desc" },
        });

        const formatted = studies.map(s => ({
            id: s.id,
            title: s.title,
            slug: s.slug,
            client: s.client || "",
            industry: s.industry || "",
            summary: s.summary || "",
            content: s.content || "",
            results: s.results || "",
            image: s.image || "",
            status: s.status,
            created_at: s.createdAt.toISOString(),
            updated_at: s.updatedAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/case-studies error:", error);
        return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, slug, client, industry, summary, content, results, image, status } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const studySlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const study = await db.caseStudy.create({
            data: {
                title,
                slug: studySlug,
                client: client || null,
                industry: industry || null,
                summary: summary || null,
                content: content || null,
                results: results || null,
                image: image || null,
                status: status || "Published",
            },
        });

        return NextResponse.json(study, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/case-studies error:", error);
        return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, slug, client, industry, summary, content, results, image, status } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (slug !== undefined) updateData.slug = slug;
        if (client !== undefined) updateData.client = client;
        if (industry !== undefined) updateData.industry = industry;
        if (summary !== undefined) updateData.summary = summary;
        if (content !== undefined) updateData.content = content;
        if (results !== undefined) updateData.results = results;
        if (image !== undefined) updateData.image = image;
        if (status !== undefined) updateData.status = status;

        const updated = await db.caseStudy.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("PUT /api/admin/case-studies error:", error);
        return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.caseStudy.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Case study deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/case-studies error:", error);
        return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
    }
}
