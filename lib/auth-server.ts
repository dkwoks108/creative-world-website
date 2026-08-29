import { NextResponse } from 'next/server';

export interface UserSession {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  permissions: string[];
}

export function checkPermission(user: UserSession, permission: string): boolean {
  if (user.role === 'SUPER_ADMIN') return true;
  return user.permissions.includes(permission) || user.permissions.includes('*');
}

export function requirePermission(permission: string, handler: Function) {
  return async (request: Request, context: any) => {
    // Mock server session check (In production, replace with JWT / NextAuth session)
    const user: UserSession = {
      id: 'admin-1',
      email: 'admin@creativeworld.in',
      role: 'SUPER_ADMIN',
      permissions: ['*'],
    };

    if (!checkPermission(user, permission)) {
      return NextResponse.json(
        { success: false, error: `Forbidden: Missing required permission [${permission}]` },
        { status: 403 }
      );
    }

    return handler(request, context, user);
  };
}
