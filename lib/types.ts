export interface AgentRole {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string | null;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string | null;
  fullPortrait: string | null;
  fullPortraitV2: string | null;
  killfeedPortrait: string;
  background: string | null;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: AgentRole | null;
  recruitmentData: unknown | null;
  abilities: Ability[];
  voiceLine: unknown | null;
}

export interface DamageRange {
  rangeStartMeters: number;
  rangeEndMeters: number;
  headDamage: number;
  bodyDamage: number;
  legDamage: number;
}

export interface WeaponStats {
  fireRate: number;
  magazineSize: number;
  runSpeedMultiplier: number;
  equipTimeSeconds: number;
  reloadTimeSeconds: number;
  firstBulletAccuracy: number;
  shotgunPelletCount: number;
  wallPenetration: string;
  feature: string | null;
  fireMode: string | null;
  altFireType: string | null;
  adsStats: AdsStats | null;
  altShotgunStats: unknown | null;
  airBurstStats: unknown | null;
  damageRanges: DamageRange[];
}

export interface AdsStats {
  zoomMultiplier: number;
  fireRate: number;
  runSpeedMultiplier: number;
  burstCount: number;
  firstBulletAccuracy: number;
}

export interface ShopData {
  cost: number;
  category: string;
  shopOrderPriority: number;
  categoryText: string;
  gridPosition: unknown | null;
  canBeTrashed: boolean;
  image: string | null;
  newImage: string;
  newImage2: string | null;
  assetPath: string;
}

export interface SkinChroma {
  uuid: string;
  displayName: string;
  displayIcon: string | null;
  fullRender: string;
  swatch: string | null;
  streamedVideo: string | null;
  assetPath: string;
}

export interface SkinLevel {
  uuid: string;
  displayName: string;
  levelItem: string | null;
  displayIcon: string | null;
  streamedVideo: string | null;
  assetPath: string;
}

export interface WeaponSkin {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: string | null;
  displayIcon: string | null;
  wallpaper: string | null;
  assetPath: string;
  chromas: SkinChroma[];
  levels: SkinLevel[];
}

export interface Weapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: WeaponStats | null;
  shopData: ShopData | null;
  skins: WeaponSkin[];
}

export interface MapCallout {
  regionName: string;
  superRegionName: string;
  location: { x: number; y: number };
}

export interface GameMap {
  uuid: string;
  displayName: string;
  narrativeDescription: string | null;
  tacticalDescription: string | null;
  coordinates: string | null;
  displayIcon: string | null;
  listViewIcon: string;
  listViewIconTall: string | null;
  splash: string;
  stylizedBackgroundImage: string | null;
  premierBackgroundImage: string | null;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts: MapCallout[] | null;
}

export interface Spray {
  uuid: string;
  displayName: string;
  category: string | null;
  themeUuid: string | null;
  isNullSpray: boolean;
  hideIfNotOwned: boolean;
  displayIcon: string | null;
  fullIcon: string | null;
  fullTransparentIcon: string | null;
  animationPng: string | null;
  animationGif: string | null;
  assetPath: string;
  levels: SprayLevel[];
}

export interface SprayLevel {
  uuid: string;
  sprayLevel: number;
  displayName: string;
  displayIcon: string | null;
  assetPath: string;
}

export interface PlayerCard {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: string | null;
  displayIcon: string;
  smallArt: string;
  wideArt: string;
  largeArt: string | null;
  assetPath: string;
}

export interface BuddyLevel {
  uuid: string;
  charmLevel: number;
  hideIfNotOwned: boolean;
  displayName: string;
  displayIcon: string;
  assetPath: string;
}

export interface Buddy {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: string | null;
  displayIcon: string;
  assetPath: string;
  levels: BuddyLevel[];
}

export interface CompetitiveTier {
  tier: number;
  tierName: string;
  division: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  smallIcon: string | null;
  largeIcon: string | null;
  rankTriangleDownIcon: string | null;
  rankTriangleUpIcon: string | null;
}

export interface CompetitiveTierSet {
  uuid: string;
  assetObjectName: string;
  tiers: CompetitiveTier[];
}

export interface Season {
  uuid: string;
  displayName: string;
  type: string | null;
  startTime: string;
  endTime: string;
  parentUuid: string | null;
  assetPath: string;
}

export interface Flex {
  uuid: string;
  displayName: string;
  displayNameAllCaps: string;
  displayIcon: string;
  assetPath: string;
}

export interface PlayerTitle {
  uuid: string;
  displayName: string;
  titleText: string | null;
  isHiddenIfNotOwned: boolean;
  assetPath: string;
}

export interface ContentTier {
  uuid: string;
  displayName: string;
  devName: string;
  rank: number;
  juiceValue: number;
  juiceCost: number;
  highlightColor: string;
  displayIcon: string;
  assetPath: string;
}
