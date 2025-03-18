 import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = await request.json();

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    const data = await response.json();
    let profileImageUrl = data.data.profile_image_url;
    profileImageUrl = profileImageUrl.replace("_normal", ""); // for better quality
    if (!data.data || !data.data.profile_image_url) {
      return NextResponse.json(
        { error: "Profile image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profileImageUrl });
  } catch (error) {
    console.error("Twitter API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Twitter profile image" },
      { status: 500 }
    );
  }
}
