import { NextRequest, NextResponse } from "next/server";
import { getGuests, confirmGuest, createGuestsTable } from "@/lib/db";

export async function GET() {
  try {
    // Crear tabla si no existe (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await createGuestsTable();
    }

    const guests = await getGuests();
    return NextResponse.json(guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, guestCount, message, giftMessage } = body;

    if (!name || !guestCount) {
      return NextResponse.json(
        { error: "Name and guest count are required" },
        { status: 400 }
      );
    }

    const confirmedGuest = await confirmGuest(
      name,
      guestCount,
      message,
      giftMessage
    );

    if (!confirmedGuest) {
      return NextResponse.json(
        { error: "Failed to confirm guest" },
        { status: 500 }
      );
    }

    return NextResponse.json(confirmedGuest);
  } catch (error) {
    console.error("Error confirming guest:", error);
    return NextResponse.json(
      { error: "Failed to confirm guest" },
      { status: 500 }
    );
  }
}
