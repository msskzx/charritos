import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Profile } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getRandomCharity = async (): Promise<Profile | null> => {
  try {
    // First, check if the "Charities" category exists
    const charityCategory = await prisma.category.findUnique({
      where: { name: "Charities" }
    });

    if (!charityCategory) {
      console.warn('Charities category not found in database');
      return null;
    }

    // Get count of charity profiles for better error handling
    const charityCount = await prisma.profile.count({
      where: {
        categories: {
          some: {
            name: "Charities"
          }
        }
      }
    });

    if (charityCount === 0) {
      console.warn('No charity profiles found in database');
      return null;
    }

    // Use a more efficient approach: get a random subset and pick from it
    const charityProfiles = await prisma.profile.findMany({
      where: {
        categories: {
          some: {
            name: "Charities"
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
      take: Math.min(charityCount, 50), // Limit to prevent memory issues
      orderBy: {
        createdAt: 'desc' // Order by creation date for some variety
      }
    });

    if (charityProfiles.length === 0) {
      return null;
    }

    // Pick a random charity from the subset
    const randomIndex = Math.floor(Math.random() * charityProfiles.length);
    const randomCharity = charityProfiles[randomIndex];

    // Ensure the return type matches the Profile interface
    return {
      id: randomCharity.id,
      name: randomCharity.name,
      username: randomCharity.username,
      description: randomCharity.description,
      imageUrl: randomCharity.imageUrl,
      links: randomCharity.links,
      categories: randomCharity.categories
    };
  } catch (error) {
    console.error('Error fetching random charity:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    return null;
  }
};

export async function GET() {
  try {
    const randomCharity = await getRandomCharity();
    
    if (!randomCharity) {
      return NextResponse.json(
        { error: 'No charities found' },
        { status: 404 }
      );
    }

    return NextResponse.json(randomCharity);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 