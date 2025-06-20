import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting profiles seed...')

  // Clear existing profiles
  await prisma.profile.deleteMany()

  // Get all categories to link profiles to them
  const categories = await prisma.category.findMany()
  
  if (categories.length === 0) {
    console.log('❌ No categories found. Please run categories-seed first.')
    return
  }

  // Helper function to get category by name
  const getCategoryByName = (name: string) => {
    return categories.find(cat => cat.name === name)
  }

  // Create profiles with category relationships
  const profiles = [
    {
      name: 'Red Cross',
      description: 'International humanitarian organization providing emergency assistance and disaster relief.',
      imageUrl: 'https://example.com/red-cross.jpg',
      links: [
        { name: 'Website', url: 'https://www.redcross.org' },
        { name: 'Donate', url: 'https://www.redcross.org/donate' }
      ],
      categoryNames: ['Charities']
    },
    {
      name: 'UNICEF',
      description: 'United Nations agency providing humanitarian and developmental aid to children worldwide.',
      imageUrl: 'https://example.com/unicef.jpg',
      links: [
        { name: 'Website', url: 'https://www.unicef.org' },
        { name: 'Donate', url: 'https://www.unicef.org/donate' }
      ],
      categoryNames: ['Charities']
    },
    {
      name: 'TRT News',
      description: 'Turkish public service broadcaster providing international news coverage.',
      imageUrl: 'https://example.com/trt-news.jpg',
      links: [
        { name: 'Website', url: 'https://www.trt.net.tr' },
        { name: 'Arabic', url: 'https://www.trt.net.tr/arabic' }
      ],
      categoryNames: ['News', 'Arabic Language']
    },
    {
      name: 'Al Jazeera',
      description: 'Qatar-based international news network with extensive Arabic coverage.',
      imageUrl: 'https://example.com/al-jazeera.jpg',
      links: [
        { name: 'Website', url: 'https://www.aljazeera.com' },
        { name: 'Arabic', url: 'https://www.aljazeera.net/arabic' }
      ],
      categoryNames: ['News', 'Arabic Language']
    },
    {
      name: 'NASA',
      description: 'National Aeronautics and Space Administration exploring space and advancing scientific knowledge.',
      imageUrl: 'https://example.com/nasa.jpg',
      links: [
        { name: 'Website', url: 'https://www.nasa.gov' },
        { name: 'Missions', url: 'https://www.nasa.gov/missions' }
      ],
      categoryNames: ['Science', 'Technology']
    },
    {
      name: 'National Geographic',
      description: 'Scientific and educational organization documenting nature, science, and world cultures.',
      imageUrl: 'https://example.com/natgeo.jpg',
      links: [
        { name: 'Website', url: 'https://www.nationalgeographic.com' },
        { name: 'Magazine', url: 'https://www.nationalgeographic.com/magazine' }
      ],
      categoryNames: ['Science', 'History']
    },
    {
      name: 'Khan Academy',
      description: 'Non-profit educational organization providing free online courses and resources.',
      imageUrl: 'https://example.com/khan-academy.jpg',
      links: [
        { name: 'Website', url: 'https://www.khanacademy.org' },
        { name: 'Arabic Courses', url: 'https://www.khanacademy.org/arabic' }
      ],
      categoryNames: ['Arabic Language', 'Technology']
    },
    {
      name: 'Smithsonian Institution',
      description: 'World\'s largest museum, education, and research complex preserving American history.',
      imageUrl: 'https://example.com/smithsonian.jpg',
      links: [
        { name: 'Website', url: 'https://www.si.edu' },
        { name: 'Museums', url: 'https://www.si.edu/museums' }
      ],
      categoryNames: ['History', 'Science']
    },
    {
      name: 'TechCrunch',
      description: 'Technology news website covering startups, venture capital, and tech industry.',
      imageUrl: 'https://example.com/techcrunch.jpg',
      links: [
        { name: 'Website', url: 'https://techcrunch.com' },
        { name: 'Startups', url: 'https://techcrunch.com/tag/startups' }
      ],
      categoryNames: ['Technology', 'News']
    },
    {
      name: 'World Health Organization',
      description: 'Specialized agency of the United Nations responsible for international public health.',
      imageUrl: 'https://example.com/who.jpg',
      links: [
        { name: 'Website', url: 'https://www.who.int' },
        { name: 'Health Topics', url: 'https://www.who.int/health-topics' }
      ],
      categoryNames: ['Science', 'News']
    }
  ]

  for (const profileData of profiles) {
    const { categoryNames, ...profileInfo } = profileData
    
    // Find the categories to connect
    const categoriesToConnect = categoryNames
      .map(name => getCategoryByName(name))
      .filter(Boolean)

    const createdProfile = await prisma.profile.create({
      data: {
        ...profileInfo,
        categories: {
          connect: categoriesToConnect.map(cat => ({ id: cat!.id }))
        }
      },
      include: {
        categories: true
      }
    })
    
    console.log(`✅ Created profile: ${createdProfile.name} (Categories: ${createdProfile.categories.map(c => c.name).join(', ')})`)
  }

  console.log('🎉 Profiles seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 