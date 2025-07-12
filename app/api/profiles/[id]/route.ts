import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: username } = await params;

    // Get the profile with its categories using username as the identifier
    const profile = await prisma.profile.findUnique({
      where: { username: String(username) },
      select: {
        id: true,
        name: true,
        username: true,
        description: true,
        imageUrl: true,
        city: true,
        country: true,
        links: true,
        donation: true,
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Format the response
    const response = {
      id: profile.id,
      name: profile.name,
      username: profile.username,
      description: profile.description,
      imageUrl: profile.imageUrl,
      city: profile.city,
      country: profile.country,
      links: profile.links,
      donation: profile.donation,
      categories: profile.categories
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 