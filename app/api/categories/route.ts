import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Category } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getCategories = async (): Promise<Category[]> => {
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
      id: category.id,
      name: category.name,
      nameAr: category.nameAr,
      description: category.description,
      descriptionAr: category.descriptionAr,
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