# CEATIVEe WORLD — SECURITY SESSION POLICY

## Session Rules

1. **Normal Refresh Behavior**:
   - Refreshing a browser tab or navigating within the admin panel updates `lastActivityAt` and extends the 30-minute idle window.

2. **Idle Expiration**:
   - If an admin leaves a tab open without activity for 30 minutes, the session expires server-side.
   - The `SessionTimeoutGuard` client component warns the admin 5 minutes prior to expiration.

3. **Absolute Maximum Session**:
   - A single login session lasts a maximum of 12 hours.
   - After 12 hours, the session naturally terminates, requiring re-authentication.

4. **Multi-Tab Synchronization**:
   - If session is logged out or revoked in Tab A, subsequent requests in Tab B will fail server validation and redirect to login.

5. **Password Reset Revocation**:
   - Updating password revokes all existing sessions across all browsers.
