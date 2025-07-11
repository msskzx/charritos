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
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const categoryName = decodeURIComponent(name);

    // Get the category with its profiles
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
      include: {
        profiles: {
          select: {
            id: true,
            name: true,
            username: true,
            description: true,
            imageUrl: true,
            links: true,
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
        },
        _count: {
          select: {
            profiles: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Format the response
    const response = {
      id: category.id,
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      createdAt: category.createdAt,
      profileCount: category._count.profiles,
      profiles: category.profiles.map(profile => ({
        id: profile.id,
        name: profile.name,
        username: profile.username,
        description: profile.description,
        imageUrl: profile.imageUrl,
        links: profile.links,
        categories: profile.categories
      }))
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