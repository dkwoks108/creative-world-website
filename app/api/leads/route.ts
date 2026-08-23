import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const search = searchParams.get("search");

        const where: any = {};
        if (status && status !== "All") {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
                { companyName: { contains: search } },
                { businessName: { contains: search } },
            ];
        }

        const inquiries = await db.inquiry.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                notes: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        // Map to format expected by Leads table / CRM UI
        const formatted = inquiries.map(i => ({
            id: i.id,
            name: i.name,
            email: i.email,
            phone: i.phone || "",
            company_name: i.companyName || i.businessName || "",
            business_size: i.businessSize || "",
            budget_range: i.budgetRange || i.budget || "",
            timeline: i.timeline || "",
            priority: i.priority || "Medium",
            status: i.status || "New",
            assigned_to: i.assignedTo || "",
            lead_score: i.leadScore || 0,
            service: i.service || i.goal || "General Inquiry",
            source: i.source || "Website Form",
            message: i.message,
            notes: i.notes.map(n => n.content).join("\n\n"),
            last_contacted: i.lastContacted ? i.lastContacted.toISOString() : null,
            next_followup: i.nextFollowup ? i.nextFollowup.toISOString() : null,
            createdAt: i.createdAt.toISOString(),
            created_at: i.createdAt.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error("GET /api/leads error:", error);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            name,
            email,
            phone,
            company_name,
            business_name,
            service,
            goal,
            budget,
            budget_range,
            message,
            source,
        } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
        }

        const newInquiry = await db.inquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                companyName: company_name || business_name || null,
                businessName: business_name || company_name || null,
                service: service || goal || null,
                goal: goal || service || null,
                budget: budget || budget_range || null,
                budgetRange: budget_range || budget || null,
                message,
                source: source || "Website Form",
                status: "New",
            },
        });

        return NextResponse.json(newInquiry, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/leads error:", error);
        return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            id,
            status,
            company_name,
            business_size,
            budget_range,
            timeline,
            priority,
            assigned_to,
            notes,
            last_contacted,
            next_followup,
            lead_score,
        } = body;

        if (!id) {
            return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
        }

        const updateData: any = {};
        if (status !== undefined) updateData.status = status;
        if (company_name !== undefined) updateData.companyName = company_name;
        if (business_size !== undefined) updateData.businessSize = business_size;
        if (budget_range !== undefined) updateData.budgetRange = budget_range;
        if (timeline !== undefined) updateData.timeline = timeline;
        if (priority !== undefined) updateData.priority = priority;
        if (assigned_to !== undefined) updateData.assignedTo = assigned_to;
        if (lead_score !== undefined) updateData.leadScore = Number(lead_score);
        if (last_contacted !== undefined) {
            updateData.lastContacted = last_contacted ? new Date(last_contacted) : null;
        }
        if (next_followup !== undefined) {
            updateData.nextFollowup = next_followup ? new Date(next_followup) : null;
        }

        const updatedInquiry = await db.inquiry.update({
            where: { id },
            data: updateData,
        });

        // Handle note addition if provided
        if (notes) {
            await db.inquiryNote.create({
                data: {
                    inquiryId: id,
                    content: notes,
                    createdBy: assigned_to || "Admin",
                },
            });
        }

        return NextResponse.json({
            ...updatedInquiry,
            company_name: updatedInquiry.companyName,
            budget_range: updatedInquiry.budgetRange,
            business_size: updatedInquiry.businessSize,
            assigned_to: updatedInquiry.assignedTo,
            last_contacted: updatedInquiry.lastContacted?.toISOString() || null,
            next_followup: updatedInquiry.nextFollowup?.toISOString() || null,
            createdAt: updatedInquiry.createdAt.toISOString(),
        });
    } catch (error: any) {
        console.error("PATCH /api/leads error:", error);
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
        }

        await db.inquiry.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });
    } catch (error: any) {
        console.error("DELETE /api/leads error:", error);
        return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
    }
}
