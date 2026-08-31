export interface GrowthAuditPayload {
  fullName: string;
  email: string;
  phone?: string;
  website?: string;
  primaryGoal: string;
  budgetRange?: string;
  timeline?: string;
  notes?: string;
}

export interface GrowthAuditResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export async function submitGrowthAudit(
  payload: GrowthAuditPayload
): Promise<GrowthAuditResponse> {
  try {
    const res = await fetch('/api/inquiries/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Submission failed with status: ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || 'Your audit request was received by our strategic team.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[GROWTH AUDIT SUBMISSION ERROR]:', err);
    throw err;
  }
}
