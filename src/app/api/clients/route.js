import { NextResponse } from "next/server";

// Fake DB for now
const clients = [
  { id: "1", name: "John Doe", email: "john@example.com", contact: "555-1234", priority: "high" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", contact: "555-5678", priority: "low" },
];

// GET all clients (admin only)
export async function GET() {
  return NextResponse.json(clients);
}
