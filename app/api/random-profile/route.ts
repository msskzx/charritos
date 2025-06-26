import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Profile } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getRandomProfile = async (category: string): Promise<Profile | null> => {
  try {
    // First, check if the category exists
    const categoryExists = await prisma.category.findUnique({
      where: { name: category }
    });

    if (!categoryExists) {
      console.warn(`Category "${category}" not found in database`);
      return null;
    }

    // Get count of profiles in this category for better error handling
    const profileCount = await prisma.profile.count({
      where: {
        categories: {
          some: {
            name: category
          }
        }
      }
    });

    if (profileCount === 0) {
      console.warn(`No profiles found in category "${category}"`);
      return null;
    }

    // Use a more efficient approach: get a random subset and pick from it
    const profiles = await prisma.profile.findMany({
      where: {
        categories: {
          some: {
            name: category
          }
        }
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: Math.min(profileCount, 50), // Limit to prevent memory issues
      orderBy: {
        createdAt: 'desc' // Order by creation date for some variety
      }
    });

    if (profiles.length === 0) {
      return null;
    }

    // Pick a random profile from the subset
    const randomIndex = Math.floor(Math.random() * profiles.length);
    const randomProfile = profiles[randomIndex];

    // Ensure the return type matches the Profile interface
    return {
      id: randomProfile.id,
      name: randomProfile.name,
      description: randomProfile.description,
      imageUrl: randomProfile.imageUrl,
      links: randomProfile.links,
      categories: randomProfile.categories
    };
  } catch (error) {
    console.error(`Error fetching random profile from category "${category}":`, error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const randomProfile = await getRandomProfile(category);
    
    if (!randomProfile) {
      return NextResponse.json(
        { error: `No profiles found in category "${category}"` },
        { status: 404 }
      );
    }

    return NextResponse.json(randomProfile);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 