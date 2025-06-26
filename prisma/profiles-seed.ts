import { PrismaClient } from '@prisma/client'
// import { profiles } from './profiles-data'
import { profiles } from './profiles-data-2'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting profiles seed...')

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

  for (const profileData of profiles) {
    const { categoryNames, ...profileInfo } = profileData

    try {
      // Find the categories to connect
      const categoriesToConnect = categoryNames
        .map(name => getCategoryByName(name))
        .filter(Boolean) // Filter out any undefined (missing) categories

      // Optional: Check if any specified categories were not found
      if (categoriesToConnect.length !== categoryNames.length) {
        const missingCategories = categoryNames.filter(name => !getCategoryByName(name))
        console.warn(`⚠️ Warning: Profile "${profileData.name}" refers to missing categories: ${missingCategories.join(', ')}. Creating profile without these categories.`)
      }

      const createdProfile = await prisma.profile.create({
        data: {
          ...profileInfo,
          categories: {
            connect: categoriesToConnect.map(cat => ({ id: cat!.id })) // `cat!` is safe due to `.filter(Boolean)`
          }
        },
        include: {
          categories: true
        }
      })

      console.log(`✅ Created profile: ${createdProfile.name} (Categories: ${createdProfile.categories.map(c => c.name).join(', ')})`)

    } catch (error) {
      console.error(`❌ Error creating or processing profile "${profileData.name}"`)
    }
  }

  console.log('🎉 Profiles seeding completed!')
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