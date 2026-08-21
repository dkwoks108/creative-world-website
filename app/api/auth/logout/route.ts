import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/lib/session";

export async function POST() {
    try {
        await deleteAdminSession();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Logout route error:", error);
        return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
    }
}

