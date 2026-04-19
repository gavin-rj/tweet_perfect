import prisma from './prisma'

/**
 * Get user data including preferences
 */
export async function getUserData(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      preferences: true,
    },
  })
}

/**
 * Save or update user API key
 */
export async function saveApiKey(userId: string, apiKey: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { apiKey },
  })
}

/**
 * Save a generated tweet
 */
export async function saveTweet(
  userId: string,
  content: string,
  platform: string
) {
  return prisma.tweet.create({
    data: {
      userId,
      content,
      platform,
    },
  })
}

/**
 * Get user preferences
 */
export async function getUserPreferences(userId: string) {
  return prisma.preference.findUnique({
    where: { userId },
  })
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string,
  data: {
    theme?: string
    defaultPlatform?: string
  }
) {
  return prisma.preference.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  })
}

/**
 * Get user's tweet history
 */
export async function getUserTweets(userId: string, limit: number = 10) {
  return prisma.tweet.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

/**
 * Get user's tweet statistics
 */
export async function getUserStats(userId: string) {
  const totalTweets = await prisma.tweet.count({
    where: { userId },
  })

  const platformCounts = await prisma.tweet.groupBy({
    by: ['platform'],
    where: { userId },
    _count: {
      id: true,
    },
  })

  return {
    totalTweets,
    platformUsage: platformCounts.map((item) => ({
      platform: item.platform,
      count: item._count.id,
    })),
  }
}

/**
 * Create or update user in database
 */
export async function upsertUser(email: string, data: any) {
  return prisma.user.upsert({
    where: { email },
    update: data,
    create: {
      email,
      ...data,
    },
  })
}

/**
 * Delete user and all associated data
 */
export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  })
}
