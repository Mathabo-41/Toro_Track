import { NextResponse } from "next/server";

// Fake DB (same as above for now)
const clients = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    contact: "078 234 5674",
    address: "123 Main St",
    projects: [
      { id: "p1", name: "Website Redesign" },
      { id: "p2", name: "Marketing Campaign" },
    ],
    activity: ["Logged in", "Uploaded a file", "Updated project status"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "076 234 5678",
    address: "456 Oak Ave",
    projects: [{ id: "p3", name: "Mobile App" }],
    activity: ["Viewed invoice", "Messaged support"],
  },
   {
    id: "3",
    name: "Toro Informatics",
    email: "toroi@toroinfo.com",
    contact: "076 234 5678",
    address: "456 Oak Ave",
    projects: [{ id: "p3", name: "Mobile App" }],
    activity: ["Viewed invoice", "Messaged support"],
  },
   {
    id: "4",
    name: "Alice Wesker",
    email: "alice.wesker@umbrella.com",
    contact: "076 234 5678",
    address: "456 Oak Ave",
    projects: [{ id: "p3", name: "Mobile App" }],
    activity: ["Viewed invoice", "Messaged support"],
  },
   {
    id: "5",
    name: "Bruce Wayne",
    email: "bruce.bruce.wayne@wayne.com",
    contact: "076 234 5678",
    address: "456 Oak Ave",
    projects: [{ id: "p3", name: "Mobile App" }],
    activity: ["Viewed invoice", "Messaged support"],
  },
];

export async function GET(req, { params }) {
  const { id } = params;
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}
