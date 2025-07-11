import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Profile } from '../../../types';

// Use a singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getProfiles = async (page: number, limit: number): Promise<{profiles: Profile[], total: number}> => {
  try {
    const total = await prisma.profile.count();
    const profiles = await prisma.profile.findMany({
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
      },
      orderBy: {
        name: 'asc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      profiles: profiles.map(profile => ({
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
      })),
      total
    };
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const search = searchParams.get('search') || '';
    if (search) {
      const where = { name: { contains: search, mode: 'insensitive' as const } };
      const total = await prisma.profile.count({ where });
      const profiles = await prisma.profile.findMany({
      where,
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
        },
        orderBy: {
          name: 'asc'
        },
        skip: (page - 1) * limit,
        take: limit
      });
      return NextResponse.json({ profiles, total });
    } else {
      const { profiles, total } = await getProfiles(page, limit);
      return NextResponse.json({ profiles, total });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 }
    );
  }
} 