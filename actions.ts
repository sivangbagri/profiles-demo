"use server";

import { promises as fs } from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

export async function submitGamingProfile(formData: FormData) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS gaming_profiles (
        id SERIAL PRIMARY KEY,
        game VARCHAR(255) NOT NULL,
        frequency VARCHAR(50) NOT NULL,
        twitter VARCHAR(255),
        instagram VARCHAR(255),
        archetype VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    const newProfile = {
      game: formData.get("game"),
      frequency: formData.get("frequency"),
      twitter: formData.get("twitter") || null,
      instagram: formData.get("instagram") || null,
      archetype: formData.get("archetype"),
    };
    await sql`INSERT INTO gaming_profiles (game, frequency, twitter, instagram, archetype, created_at)
    VALUES (${newProfile.game}, ${newProfile.frequency}, ${newProfile.twitter}, ${newProfile.instagram}, ${newProfile.archetype}, NOW())
    RETURNING id`;
    return { success: true };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { success: false, error: "Failed to save profile" };
  }
}
