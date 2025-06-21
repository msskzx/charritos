import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting categories seed...')

  // Clear existing categories
  await prisma.category.deleteMany()

  // Create categories from the categories page
  const categories = [
    {
      name: 'History',
      description: 'Exploring events and figures from the past.',
    },
    {
      name: 'Charities',
      description: 'Organizations making a positive difference.',
    },
    {
      name: 'Arabic Language',
      description: 'Resources for learning Arabic.',
    },
    {
      name: 'News',
      description: 'Latest updates from around the globe.',
    },
    {
      name: 'Science',
      description: 'Delving into scientific discoveries.',
    },
    {
      name: 'Technology',
      description: 'Innovations and future trends.',
    },
    {
      name: 'Islam',
      description: 'Resources for learning about Islam.',
    },
    {
      name: 'Quran',
      description: 'The holy book of Islam.',
    },
    {
      name: 'Hadith',
      description: 'The sayings and actions of the Prophet Muhammad.',
    },
  ]

  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: category,
    })
    console.log(`✅ Created category: ${createdCategory.name}`)
  }

  console.log('🎉 Categories seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 