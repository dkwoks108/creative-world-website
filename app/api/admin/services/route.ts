import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const services = await db.service.findMany({
            orderBy: { sortOrder: "asc" },
        });

        const formatted = services.map(s => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            description: s.description || "",
            content: s.content || "",
            status: s.status,
            icon: s.icon || "",
            features: s.features ? JSON.parse(s.features) : [],
            sort_order: s.sortOrder,
            created_at: s.createdAt.toISOString(),
            updated_at: s.updatedAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/services error:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, slug, description, content, status, icon, features, sort_order } = body;

        if (!name) {
            return NextResponse.json({ error: "Service name is required" }, { status: 400 });
        }

        const serviceSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newService = await db.service.create({
            data: {
                name,
                slug: serviceSlug,
                description: description || null,
                content: content || null,
                status: status || "Published",
                icon: icon || null,
                features: features ? JSON.stringify(features) : null,
                sortOrder: sort_order ? Number(sort_order) : 0,
            },
        });

        return NextResponse.json(newService, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/services error:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, slug, description, content, status, icon, features, sort_order } = body;

        if (!id) {
            return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (slug !== undefined) updateData.slug = slug;
        if (description !== undefined) updateData.description = description;
        if (content !== undefined) updateData.content = content;
        if (status !== undefined) updateData.status = status;
        if (icon !== undefined) updateData.icon = icon;
        if (features !== undefined) updateData.features = JSON.stringify(features);
        if (sort_order !== undefined) updateData.sortOrder = Number(sort_order);

        const updatedService = await db.service.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedService);
    } catch (error: any) {
        console.error("PUT /api/admin/services error:", error);
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
        }

        await db.service.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Service deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/services error:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}
