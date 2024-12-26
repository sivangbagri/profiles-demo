'use server'

import { promises as fs } from 'fs'
import path from 'path'

export async function submitGamingProfile(formData: FormData) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'profiles.json')
    
    try {
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
    } catch (error) {
      console.error('Error creating directory:', error)
    }

    let profiles = []
    try {
      const jsonData = await fs.readFile(filePath, 'utf8')
      profiles = JSON.parse(jsonData)
    } catch (error) {
      // File doesn't exist yet, we'll create it
    }

    const newProfile = {
      id: Date.now(),
      game: formData.get('game'),
      frequency: formData.get('frequency'),
      twitter: formData.get('twitter') || null,
      instagram: formData.get('instagram') || null,
      archetype: formData.get('archetype'),
      createdAt: new Date().toISOString()
    }

    profiles.push(newProfile)

    await fs.writeFile(filePath, JSON.stringify(profiles, null, 2))

    return { success: true }
  } catch (error) {
    console.error('Error saving profile:', error)
    return { success: false, error: 'Failed to save profile' }
  }
}

