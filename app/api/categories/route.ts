import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CategoryForCard } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getCategories = async (): Promise<CategoryForCard[]> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            profiles: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return categories.map(category => ({
      name: category.name,
      description: category.description,
      profileCount: category._count.profiles
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export async function GET() {
  try {
    const categories = await getCategories();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 