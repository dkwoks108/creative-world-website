import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const plans = await db.pricingPlan.findMany({
            orderBy: { sortOrder: "asc" },
        });

        const formatted = plans.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            billing_period: p.billingPeriod,
            description: p.description || "",
            features: p.features ? JSON.parse(p.features) : [],
            is_popular: p.isPopular,
            status: p.status,
            sort_order: p.sortOrder,
            cta_text: p.ctaText,
            created_at: p.createdAt.toISOString(),
            updated_at: p.updatedAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/admin/pricing error:", error);
        return NextResponse.json({ error: "Failed to fetch pricing plans" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, slug, price, billing_period, description, features, is_popular, status, sort_order, cta_text } = body;

        if (!name || !price) {
            return NextResponse.json({ error: "Plan name and price are required" }, { status: 400 });
        }

        const planSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        const newPlan = await db.pricingPlan.create({
            data: {
                name,
                slug: planSlug,
                price,
                billingPeriod: billing_period || "/month",
                description: description || null,
                features: features ? JSON.stringify(features) : null,
                isPopular: Boolean(is_popular),
                status: status || "Published",
                sortOrder: sort_order ? Number(sort_order) : 0,
                ctaText: cta_text || "Get Started",
            },
        });

        return NextResponse.json(newPlan, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/admin/pricing error:", error);
        return NextResponse.json({ error: "Failed to create pricing plan" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, slug, price, billing_period, description, features, is_popular, status, sort_order, cta_text } = body;

        if (!id) {
            return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (slug !== undefined) updateData.slug = slug;
        if (price !== undefined) updateData.price = price;
        if (billing_period !== undefined) updateData.billingPeriod = billing_period;
        if (description !== undefined) updateData.description = description;
        if (features !== undefined) updateData.features = JSON.stringify(features);
        if (is_popular !== undefined) updateData.isPopular = Boolean(is_popular);
        if (status !== undefined) updateData.status = status;
        if (sort_order !== undefined) updateData.sortOrder = Number(sort_order);
        if (cta_text !== undefined) updateData.ctaText = cta_text;

        const updatedPlan = await db.pricingPlan.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedPlan);
    } catch (error: any) {
        console.error("PUT /api/admin/pricing error:", error);
        return NextResponse.json({ error: "Failed to update pricing plan" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
        }

        await db.pricingPlan.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Pricing plan deleted" });
    } catch (error: any) {
        console.error("DELETE /api/admin/pricing error:", error);
        return NextResponse.json({ error: "Failed to delete pricing plan" }, { status: 500 });
    }
}
