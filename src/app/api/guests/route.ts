import { NextRequest, NextResponse } from "next/server";
import {
  getInvitationByCode,
  confirmInvitation,
  createInvitationsTable,
  getAllInvitations,
  resetInvitationConfirmation,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Crear tabla si no existe (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await createInvitationsTable();
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    // Si se proporciona un código, buscar esa invitación específica
    if (code) {
      const invitation = await getInvitationByCode(code);

      if (!invitation) {
        return NextResponse.json(
          { error: "Invitation not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(invitation);
    }

    // Si no hay código, devolver todas las invitaciones
    const invitations = await getAllInvitations();
    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error fetching invitation:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitation" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, confirmed, message, declined, reset } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Si es un reset, resetear la confirmación
    if (reset === true) {
      const result = await resetInvitationConfirmation(code);

      if (!result) {
        return NextResponse.json(
          { error: "Failed to reset invitation" },
          { status: 500 }
        );
      }

      return NextResponse.json(result);
    }

    if (confirmed === undefined || confirmed === null) {
      return NextResponse.json(
        { error: "Confirmed count is required" },
        { status: 400 }
      );
    }

    const result = await confirmInvitation(code, confirmed, message, declined);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to confirm invitation" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error confirming invitation:", error);
    return NextResponse.json(
      { error: "Failed to confirm invitation" },
      { status: 500 }
    );
  }
}
