import { sql } from "@vercel/postgres";

export interface Guest {
  id: number;
  name: string;
  guest_count: number;
  confirmed: boolean;
  message: string | null;
  gift_message: string | null;
  confirmed_at: Date | null;
}

export async function getGuests(): Promise<Guest[]> {
  try {
    const { rows } = await sql`SELECT * FROM guests ORDER BY name`;
    return rows as Guest[];
  } catch (error) {
    console.error("Error fetching guests:", error);
    return [];
  }
}

export async function getGuestByName(name: string): Promise<Guest | null> {
  try {
    const { rows } =
      await sql`SELECT * FROM guests WHERE name = ${name} LIMIT 1`;
    return (rows[0] as Guest) || null;
  } catch (error) {
    console.error("Error fetching guest:", error);
    return null;
  }
}

export async function confirmGuest(
  name: string,
  guestCount: number,
  message?: string,
  giftMessage?: string
): Promise<Guest | null> {
  try {
    // Primero intentamos actualizar si ya existe
    const { rows: existingRows } = await sql`
      UPDATE guests 
      SET confirmed = true, 
          guest_count = ${guestCount},
          message = ${message || null},
          gift_message = ${giftMessage || null},
          confirmed_at = NOW()
      WHERE name = ${name}
      RETURNING *
    `;

    if (existingRows.length > 0) {
      return existingRows[0] as Guest;
    }

    // Si no existe, lo creamos
    const { rows } = await sql`
      INSERT INTO guests (name, guest_count, confirmed, message, gift_message, confirmed_at)
      VALUES (${name}, ${guestCount}, true, ${message || null}, ${
      giftMessage || null
    }, NOW())
      RETURNING *
    `;

    return rows[0] as Guest;
  } catch (error) {
    console.error("Error confirming guest:", error);
    return null;
  }
}

export async function createGuestsTable(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS guests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guest_count INTEGER NOT NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        message TEXT,
        gift_message TEXT,
        confirmed_at TIMESTAMP
      )
    `;
    console.log("Guests table created successfully");
  } catch (error) {
    console.error("Error creating guests table:", error);
  }
}
