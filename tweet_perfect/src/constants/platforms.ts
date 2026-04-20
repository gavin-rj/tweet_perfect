// Platform configurations for tweet generation

export const PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
} as const

export const PLATFORM_LIMITS = {
  twitter: 280,
  facebook: 63206,
  instagram: 2200,
  linkedin: 3000,
} as const

export const PLATFORM_NAMES = {
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
} as const

export const PLATFORM_OPTIONS = Object.entries(PLATFORMS).map(([, value]) => ({
  value,
  label: PLATFORM_NAMES[value as keyof typeof PLATFORM_NAMES],
  limit: PLATFORM_LIMITS[value as keyof typeof PLATFORM_LIMITS],
}))

export function isValidPlatform(platform: string): platform is keyof typeof PLATFORM_LIMITS {
  return platform in PLATFORM_LIMITS
}

export function getPlatformLimit(platform: string): number {
  if (isValidPlatform(platform)) {
    return PLATFORM_LIMITS[platform]
  }
  return PLATFORM_LIMITS.twitter // Default to Twitter limit
}

export function getPlatformName(platform: string): string {
  if (platform in PLATFORM_NAMES) {
    return PLATFORM_NAMES[platform as keyof typeof PLATFORM_NAMES]
  }
  return platform
}
