'use client';

// Client wrapper calling server actions safely or server actions module
import { loginServerAction, logoutServerAction } from './auth-server';

export async function loginAction(formData: FormData) {
  return await loginServerAction(formData);
}

export async function logoutAction() {
  return await logoutServerAction();
}
