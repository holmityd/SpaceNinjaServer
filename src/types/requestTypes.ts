import {
    IBooster,
    IChallengeProgress,
    IConsumable,
    ICrewShipSalvagedWeaponSkin,
    IMiscItem,
    IMission,
    IRawUpgrade
} from "./inventoryTypes/inventoryTypes";
import { IWeaponClient } from "./inventoryTypes/weaponTypes";
import { ISuitClient } from "./inventoryTypes/SuitTypes";

export interface IArtifactsRequest {
    Upgrade: ICrewShipSalvagedWeaponSkin;
    LevelDiff: number;
    Cost: number;
    FusionPointCost: number;
}

export interface IMissionInventoryUpdateRequest {
    rewardsMultiplier?: number;
    ActiveBoosters?: IBooster[];
    LongGuns?: IWeaponClient[];
    Pistols?: IWeaponClient[];
    Suits?: ISuitClient[];
    Melee?: IWeaponClient[];
    RawUpgrades?: IRawUpgrade[];
    MiscItems?: IMiscItem[];
    Consumables?: IConsumable[];
    Recipes?: IConsumable[];
    RegularCredits?: number;
    ChallengeProgress?: IChallengeProgress[];
    RewardInfo?: IMissionInventoryUpdateRequestRewardInfo;
    FusionPoints?: number;
    Missions?: IMission;
}

export interface IMissionInventoryUpdateRequestRewardInfo {
    node: string;
    rewardTier?: number;
    nightmareMode?: boolean;
    useVaultManifest?: boolean;
    EnemyCachesFound?: number;
    toxinOk?: boolean;
    lostTargetWave?: number;
    defenseTargetCount?: number;
    EOM_AFK?: number;
    rewardQualifications?: string;
    PurgatoryRewardQualifications?: string;
    rewardSeed?: number;
}

export interface IInventorySlotsRequest {
    Bin: "PveBonusLoadoutBin";
}
