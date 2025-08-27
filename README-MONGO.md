
# MongoDB Integration Guide (Hex ID Login)

## 1) Install deps
```bash
pnpm add mongoose
```

## 2) Environment
Create `.env.local` at the project root:
```bash
cp .env.local.example .env.local
# Then edit .env.local and set your actual MongoDB connection string.
```
Ensure `MONGODB_URI` is set.

## 3) Files added
- `lib/mongoose.ts` — connection with caching for App Router
- `models/User.ts` — User schema with `idHex` as unique ID
- `app/api/auth/login/route.ts` — POST: create or find user by hex ID, sets cookie `uid`
- `app/api/auth/me/route.ts` — GET: returns the logged-in user
- `app/api/auth/logout/route.ts` — POST: clears the cookie
- `components/HexLogin.tsx` — drop-in Hex Login form you can render on your login page

## 4) Use the HexLogin component
Open `app/auth/login/page.tsx` and render this anywhere inside the page:
```tsx
import dynamic from "next/dynamic";
const HexLogin = dynamic(() => import("@/components/HexLogin"), { ssr: false });

// ...return (
<HexLogin />
// )
```

## 5) Protect pages (optional)
Create `middleware.ts` to redirect unauthenticated users away from protected routes:
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uid = req.cookies.get("uid")?.value;
  if (!uid && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## 6) Fetch current user on the client
```ts
const me = await fetch("/api/auth/me").then((r) => r.json());
```

## 7) Replace hardcoded defaults
Any place you had default data for "JOSEN" or "DALL·E", read the current user from `/api/auth/me` and load their data from the DB instead.
```ts
const { ok, user } = await fetch("/api/auth/me").then((r) => r.json());
if (ok) {
  // user.data -> your per-user state
}
```
