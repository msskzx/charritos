import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Profile } from '../../../../types';

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
    const { id } = await params;

    // Get the profile with its categories
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
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
      description: profile.description,
      imageUrl: profile.imageUrl,
      links: profile.links,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
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