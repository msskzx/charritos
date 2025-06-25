import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Profile } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getProfiles = async (): Promise<Profile[]> => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return profiles.map(profile => ({
      id: profile.id,
      name: profile.name,
      description: profile.description,
      imageUrl: profile.imageUrl,
      links: profile.links,
      categories: profile.categories
    }));
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export async function GET() {
  try {
    const profiles = await getProfiles();
    
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
} 