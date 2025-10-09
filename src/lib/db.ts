import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface Invitation {
  id: number;
  name: string;
  guests: number;
  code: string;
  confirmed: number;
  declined: boolean;
  message: string | null;
  created_at: Date;
  confirmed_at: Date | null;
}

export async function getInvitationByCode(
  code: string
): Promise<Invitation | null> {
  try {
    const rows = await sql`
      SELECT * FROM invitations 
      WHERE code = ${code.toUpperCase()} 
      LIMIT 1
    `;
    return (rows[0] as Invitation) || null;
  } catch (error) {
    console.error("Error fetching invitation:", error);
    return null;
  }
}

export async function confirmInvitation(
  code: string,
  confirmedCount: number,
  message?: string,
  declined?: boolean
): Promise<Invitation | null> {
  try {
    const rows = await sql`
      UPDATE invitations 
      SET confirmed = ${confirmedCount},
          message = ${message || null},
          confirmed_at = NOW(),
          declined = ${declined || false}
      WHERE code = ${code.toUpperCase()}
      RETURNING *
    `;

    return (rows[0] as Invitation) || null;
  } catch (error) {
    console.error("Error confirming invitation:", error);
    return null;
  }
}

export async function getAllInvitations(): Promise<Invitation[]> {
  try {
    const rows = await sql`SELECT * FROM invitations ORDER BY name`;
    return rows as Invitation[];
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
}

export async function createInvitationsTable(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS invitations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guests INTEGER NOT NULL,
        code VARCHAR(6) UNIQUE NOT NULL,
        confirmed INTEGER DEFAULT 0,
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        confirmed_at TIMESTAMP
      )
    `;
    console.log("Invitations table created successfully");
  } catch (error) {
    console.error("Error creating invitations table:", error);
  }
}
