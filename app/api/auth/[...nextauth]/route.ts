// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // adjust to "@/auth" or "@/src/auth" depending on path

export const { GET, POST } = handlers;
