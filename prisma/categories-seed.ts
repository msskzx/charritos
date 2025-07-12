import { PrismaClient } from '@prisma/client'
import { categories } from './categories-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting categories seed...')

  // Delete all existing categories first
  console.log('🗑️  Deleting existing categories...')
  await prisma.category.deleteMany({})
  console.log('✅ All existing categories deleted')

  // Create categories from the categories page
  for (const category of categories) {
    try {
      const createdCategory = await prisma.category.create({
        data: category,
      })
      console.log(`✅ Created category: ${createdCategory.name}`)
    } catch (error) {
      console.error(`❌ Error creating category "${category.name}":`, error)
    }
  }

  console.log('🎉 Categories seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ An unhandled error occurred during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Prisma client disconnected.')
  }) 