import { Model, Schema, Types, model } from "mongoose";
import {
    IFlavourItem,
    IRawUpgrade,
    IMiscItem,
    IInventoryDatabase,
    IBooster,
    IInventoryResponse,
    IInventoryDatabaseDocument,
    ISlots,
    IGenericItem,
    IMailbox,
    IDuviriInfo
} from "../../types/inventoryTypes/inventoryTypes";
import { IMongoDate, IOid } from "../../types/commonTypes";
import { ISuitDatabase } from "@/src/types/inventoryTypes/SuitTypes";
import { IWeaponDatabase } from "@/src/types/inventoryTypes/weaponTypes";
import {
    IAbilityOverride,
    IColor,
    IItemConfig,
    IOperatorConfigClient,
    IOperatorConfigDatabase,
    IPolarity
} from "@/src/types/inventoryTypes/commonInventoryTypes";
import { toOid } from "@/src/helpers/inventoryHelpers";

const polaritySchema = new Schema<IPolarity>({
    Slot: Number,
    Value: String
});

const abilityOverrideSchema = new Schema<IAbilityOverride>({
    Ability: String,
    Index: Number
});
const colorSchema = new Schema<IColor>(
    {
        t0: Number,
        t1: Number,
        t2: Number,
        t3: Number,
        en: Number,
        e1: Number,
        m0: Number,
        m1: Number
    },
    { _id: false }
);

const operatorConfigSchema = new Schema<IOperatorConfigDatabase>(
    {
        Skins: [String],
        pricol: colorSchema,
        attcol: colorSchema,
        sigcol: colorSchema,
        eyecol: colorSchema,
        facial: colorSchema,
        syancol: colorSchema,
        cloth: colorSchema,
        Upgrades: [String],
        Name: String, // not sure if possible in operator
        ugly: Boolean // not sure if possible in operator
    },
    { id: false }
);

operatorConfigSchema.virtual("ItemId").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

operatorConfigSchema.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

///TODO: clearly seperate the different config schemas. (suit and weapon and so on)
const ItemConfigSchema = new Schema<IItemConfig>(
    {
        Skins: [String],
        pricol: colorSchema,
        attcol: colorSchema,
        sigcol: colorSchema,
        eyecol: colorSchema,
        facial: colorSchema,
        syancol: colorSchema,
        Upgrades: [String],
        Songs: [
            {
                m: String,
                b: String,
                p: String,
                s: String
            }
        ],
        Name: String,
        AbilityOverride: abilityOverrideSchema,
        PvpUpgrades: [String],
        ugly: Boolean
    },
    { _id: false }
);

ItemConfigSchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject.__v;
    }
});

//TODO: migrate to one schema for weapons and suits.. and possibly others
const WeaponSchema = new Schema<IWeaponDatabase>(
    {
        ItemType: String,
        Configs: [ItemConfigSchema],
        UpgradeVer: Number,
        XP: Number,
        Features: Number,
        Polarized: Number,
        Polarity: [polaritySchema],
        FocusLens: String,
        ModSlotPurchases: Number,
        UpgradeType: Schema.Types.Mixed, //todo
        UpgradeFingerprint: String,
        ItemName: String,
        ModularParts: [String],
        UnlockLevel: Number
    },
    { id: false }
);

WeaponSchema.virtual("ItemId").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

WeaponSchema.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const BoosterSchema = new Schema<IBooster>({
    ExpiryDate: Number,
    ItemType: String
});

const RawUpgrades = new Schema<IRawUpgrade>(
    {
        ItemType: String,
        ItemCount: Number
    },
    { id: false }
);

RawUpgrades.virtual("LastAdded").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

RawUpgrades.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

//TODO: find out what this is
const Upgrade = new Schema({
    UpgradeFingerprint: String,
    ItemType: String
});

Upgrade.virtual("ItemId").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

Upgrade.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

//TODO: reduce weapon and suit schemas to one schema if reasonable
const suitSchema = new Schema<ISuitDatabase>(
    {
        ItemType: String,
        Configs: [ItemConfigSchema],
        UpgradeVer: Number,
        XP: Number,
        InfestationDate: Date,
        Features: Number,
        Polarity: [polaritySchema],
        Polarized: Number,
        ModSlotPurchases: Number,
        FocusLens: String,
        UnlockLevel: Number
    },
    { id: false }
);

suitSchema.virtual("ItemId").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

suitSchema.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const slotsBinSchema = new Schema<ISlots>(
    {
        Slots: Number,
        Extra: Number
    },
    { _id: false }
);

const FlavourItemSchema = new Schema(
    {
        ItemType: String
    },
    { _id: false }
);

FlavourItemSchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const GenericItemSchema = new Schema<IGenericItem>(
    {
        ItemType: String,
        Configs: [ItemConfigSchema],
        UpgradeVer: Number //this is probably just __v
    },
    { id: false }
);

GenericItemSchema.virtual("ItemId").get(function () {
    return { $oid: this._id.toString() } satisfies IOid;
});

GenericItemSchema.set("toJSON", {
    virtuals: true,
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

//  "Mailbox": { "LastInboxId": { "$oid": "123456780000000000000000" } }
const MailboxSchema = new Schema<IMailbox>(
    {
        LastInboxId: {
            type: Schema.Types.ObjectId,
            set: (v: IMailbox["LastInboxId"]) => v.$oid.toString()
        }
    },
    { id: false, _id: false }
);

MailboxSchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject.__v;
        //TODO: there is a lot of any here
        returnedObject.LastInboxId = toOid(returnedObject.LastInboxId as Types.ObjectId);
    }
});

const DuviriInfoSchema = new Schema<IDuviriInfo>(
    {
        Seed: Number,
        NumCompletions: Number
    },
    {
        _id: false,
        id: false
    }
);

DuviriInfoSchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject.__v;
    }
});

const inventorySchema = new Schema<IInventoryDatabase, InventoryDocumentProps>({

    accountOwnerId: Schema.Types.ObjectId,
    SubscribedToEmails: Number,
    Created: Schema.Types.Mixed,
    RewardSeed: Number,

    //Credit
    RegularCredits: Number,
    //Platinum
    PremiumCredits: Number,
    //Gift Platinum(Non trade)
    PremiumCreditsFree: Number,
    //Endo
    FusionPoints: Number,

    //SlotAny
    SuitBin: slotsBinSchema,
    WeaponBin: slotsBinSchema,
    SentinelBin: slotsBinSchema,
    SpaceSuitBin: slotsBinSchema,
    SpaceWeaponBin: slotsBinSchema,
    PvpBonusLoadoutBin: slotsBinSchema,
    PveBonusLoadoutBin: slotsBinSchema,
    RandomModBin: slotsBinSchema,
    OperatorAmpBin: slotsBinSchema,
    CrewShipSalvageBin: slotsBinSchema,
    MechBin: slotsBinSchema,
    CrewMemberBin: slotsBinSchema,


    //How many trades do you have left
    TradesRemaining: Number,
    //How many Gift do you have left*(gift spends the trade)
    GiftsRemaining: Number,
    //Curent trade info Giving or Getting items
    PendingTrades: [Schema.Types.Mixed],

    //Curent Syndicates rank\exp
    Affiliations: [Schema.Types.Mixed],
    //Syndicates Missions complate(Navigation->Syndicate)
    CompletedSyndicates: [String],
    //Daily Syndicates Exp
    DailyAffiliation: Number,
    DailyAffiliationPvp: Number,
    DailyAffiliationLibrary: Number,
    DailyAffiliationCetus: Number,
    DailyAffiliationQuills: Number,
    DailyAffiliationSolaris: Number,
    DailyAffiliationVentkids: Number,
    DailyAffiliationVox: Number,
    DailyAffiliationEntrati: Number,
    DailyAffiliationNecraloid: Number,
    DailyAffiliationZariman: Number,
    DailyAffiliationKahl: Number,


    //Daily Focus limit
    DailyFocus: Number,
    //you not used Focus 
    FocusXP: Schema.Types.Mixed,
    //Curent active like Active school focuses is = "Zenurik"
    FocusAbility: String,
    //The treeways of the Focus school.(Active and passive Ability)
    FocusUpgrades: [Schema.Types.Mixed],

    //Achievement
    ChallengeProgress: [Schema.Types.Mixed],

    //Account Item like Ferrite,Form,Kuva etc
    MiscItems: [Schema.Types.Mixed],

    //Non Upgrade Mods Example:I have 999 item WeaponElectricityDamageMod (only "ItemCount"+"ItemType")
    RawUpgrades: [RawUpgrades],
    //Upgrade Mods\Riven\Arcane Example:"UpgradeFingerprint"+"ItemType"+""
    Upgrades: [Upgrade],

    //Warframe
    Suits: [suitSchema],
    //Primary    Weapon
    LongGuns: [WeaponSchema],
    //Secondary  Weapon
    Pistols: [WeaponSchema],
    //Melee      Weapon
    Melee: [WeaponSchema],
    //Ability Weapon like Ultimate Mech\Excalibur\Ivara etc
    SpecialItems: [Schema.Types.Mixed],
    //The Mandachord(Octavia) is a step sequencer
    StepSequencers: [Schema.Types.Mixed],

    //Sentinel(like Helios or modular)
    Sentinels: [Schema.Types.Mixed],
    //Any /Sentinels/SentinelWeapons/ (like warframe weapon)
    SentinelWeapons: [Schema.Types.Mixed],
    //Modular Pets
    MoaPets: [Schema.Types.Mixed],

    KubrowPetEggs: [Schema.Types.Mixed],
    //Like PowerSuit Cat\Kubrow or etc Pets
    KubrowPets: [Schema.Types.Mixed],
    //Prints   Cat(3 Prints)\Kubrow(2 Prints) Pets
    KubrowPetPrints: [Schema.Types.Mixed],

    //Item for EquippedGear example:Scaner,LoadoutTechSummon etc
    Consumables: [Schema.Types.Mixed],
    //Weel Emotes+Gear
    EquippedEmotes: [String],
    EquippedGear: [String],
    //Equipped Shawzin
    EquippedInstrument: String,
    ReceivedStartingGear: Boolean,

    //to use add SummonItem to Consumables+EquippedGear
    //Archwing need Suits+Melee+Guns
    SpaceSuits: [GenericItemSchema],
    SpaceMelee: [GenericItemSchema],
    SpaceGuns: [Schema.Types.Mixed],
    ArchwingEnabled: Boolean,
    //Mech need Suits+SpaceGuns+SpecialItem
    MechSuits: [suitSchema],
    ///Restoratives/HoverboardSummon (like Suit)
    Hoverboards: [Schema.Types.Mixed],

    //Use Operator\Drifter
    UseAdultOperatorLoadout: Boolean,
    //Operator\Drifter Weapon
    OperatorAmps: [Schema.Types.Mixed],
    //Operator
    OperatorLoadOuts: [operatorConfigSchema],
    //Drifter
    AdultOperatorLoadOuts: [operatorConfigSchema],
    DrifterMelee: [GenericItemSchema],
    DrifterGuns: [GenericItemSchema],
    //ErsatzHorsePowerSuit
    Horses: [GenericItemSchema],

    //Liset colors skin etc
    Ships: [Schema.Types.Mixed],
    // /Lotus/Types/Items/ShipDecos/
    ShipDecorations: [Schema.Types.Mixed],

    //RailJack Setting(Mods,Skin,Weapon,etc)
    CrewShipHarnesses: [Schema.Types.Mixed],
    //Railjack/Components(https://warframe.fandom.com/wiki/Railjack/Components)
    CrewShipRawSalvage: [Schema.Types.Mixed],


    //Default RailJack
    CrewShips: [Schema.Types.Mixed],
    CrewShipAmmo: [Schema.Types.Mixed],
    CrewShipWeapons: [Schema.Types.Mixed],
    CrewShipWeaponSkins: [Schema.Types.Mixed],


    //NPC Crew and weapon
    CrewMembers: [Schema.Types.Mixed],
    CrewShipSalvagedWeaponSkins: [Schema.Types.Mixed],
    CrewShipSalvagedWeapons: [Schema.Types.Mixed],


    //Complete Mission\Quests
    Missions: [Schema.Types.Mixed],
    QuestKeys: [Schema.Types.Mixed],
    //item like DojoKey or Boss missions key 
    LevelKeys: [Schema.Types.Mixed],
    //Active quests
    Quests: [Schema.Types.Mixed],

    //Cosmetics like profile glyphs\Kavasa Prime Kubrow Collar\Game Theme etc
    FlavourItems: [FlavourItemSchema],

    //Lunaro Weapon
    Scoops: [GenericItemSchema],

    //Mastery Rank*(Need item XPInfo to rank up)
    PlayerLevel: Number,
    //Item Mastery Rank exp
    XPInfo: [Schema.Types.Mixed],
    //24h timer rank up
    TrainingDate: Date,
    //Retries rank up(3 time)
    TrainingRetriesLeft: Number,


    //you saw last played Region when you opened the star map
    LastRegionPlayed: String,

    //Blueprint
    Recipes: [Schema.Types.Mixed],
    //Crafting Blueprint(Item Name + CompletionDate)
    PendingRecipes: [Schema.Types.Mixed],

    //warframe\Weapon skins
    WeaponSkins: [Schema.Types.Mixed],

    
    //Ayatan Item
    FusionTreasures: [Schema.Types.Mixed],
    //"node": "TreasureTutorial", "state": "TS_COMPLETED"
    TauntHistory: [Schema.Types.Mixed],


    //noShow2FA,VisitPrimeVault etc
    WebFlags: Schema.Types.Mixed,
    //Id CompletedAlerts
    CompletedAlerts: [String],

    //Warframe\Duviri
    StoryModeChoice: String,

    //Alert->Kuva Siphon
    PeriodicMissionCompletions: [Schema.Types.Mixed],


    //Codex->LoreFragment
    LoreFragmentScans: [Schema.Types.Mixed],

    //Resource,Credit,Affinity etc or Bless any boosters
    Boosters: [BoosterSchema],
    BlessingCooldown: Schema.Types.Mixed,

    //the color your clan requests like Items/Research/DojoColors/DojoColorPlainsB
    ActiveDojoColorResearch: String,

    SentientSpawnChanceBoosters: Schema.Types.Mixed,
    
    QualifyingInvasions: [Schema.Types.Mixed],
    FactionScores: [Number],

    //Have only Suit+Pistols+LongGuns+Melee+ItemType(BronzeSpectre,GoldSpectre,PlatinumSpectreArmy,SilverSpectreArmy)
    //"/Lotus/Types/Game/SpectreArmies/BronzeSpectreArmy": "Vapor Specter Regiment",
    SpectreLoadouts: [Schema.Types.Mixed],
    //If you want change Spectre Gear id
    PendingSpectreLoadouts: [Schema.Types.Mixed],


    //New quest Email spam
    //example:"ItemType": "/Lotus/Types/Keys/RailJackBuildQuest/RailjackBuildQuestEmailItem",
    EmailItems: [Schema.Types.Mixed],
    

    //Profile->Wishlist
    Wishlist: [String],

    //https://warframe.fandom.com/wiki/Alignment
    //like "Alignment": { "Wisdom": 9, "Alignment": 1 },
    Alignment: Schema.Types.Mixed,
    AlignmentReplay: Schema.Types.Mixed,

    //https://warframe.fandom.com/wiki/Sortie
    CompletedSorties: [String],
    LastSortieReward: [Schema.Types.Mixed],

    //Resource_Drone[Uselees stuff]
    Drones: [Schema.Types.Mixed],

    //Active profile ico
    ActiveAvatarImageType: String,

    // open location store like EidolonPlainsDiscoverable or OrbVallisCaveDiscoverable
    DiscoveredMarkers: [Schema.Types.Mixed],
    //Open location mission like "JobId" + "StageCompletions"
    CompletedJobs: [Schema.Types.Mixed],

    //Game mission\ivent score example  "Tag": "WaterFight", "Best": 170, "Count": 1258,
    PersonalGoalProgress: [Schema.Types.Mixed],
    
    //Setting interface Style
    ThemeStyle: String,
    ThemeBackground: String,
    ThemeSounds: String,

    //Daily LoginRewards
    LoginMilestoneRewards: [String],

    //You first Dialog with NPC or use new Item
    NodeIntrosCompleted: [String],

    //https://warframe.fandom.com/wiki/Heist
    //ProfitTaker(1-4) Example:"LocationTag": "EudicoHeists", "Jobs":Mission name
    CompletedJobChains: [Schema.Types.Mixed],
    //Night Wave Challenge
    SeasonChallengeHistory: [Schema.Types.Mixed],


    //Cephalon Simaris Entries Example:"TargetType"+"Scans"(1-10)+"Completed": true|false
    LibraryPersonalProgress: [Schema.Types.Mixed],
    //Cephalon Simaris Daily Task
    LibraryAvailableDailyTaskInfo: Schema.Types.Mixed,

    //https://warframe.fandom.com/wiki/Invasion
    InvasionChainProgress: [Schema.Types.Mixed],
    
    //https://warframe.fandom.com/wiki/Parazon
    DataKnives: [GenericItemSchema],
    
    //CorpusLich or GrineerLich
    NemesisAbandonedRewards: [String],
    //CorpusLich\KuvaLich 
    NemesisHistory: [Schema.Types.Mixed],
    LastNemesisAllySpawnTime: Schema.Types.Mixed,
    
    //TradingRulesConfirmed,ShowFriendInvNotifications(Option->Social)
    Settings: Schema.Types.Mixed,

    //Railjack craft 
    //https://warframe.fandom.com/wiki/Rising_Tide
    PersonalTechProjects: [Schema.Types.Mixed],
    
    //Modulars lvl and exp(Railjack|Duviri)
    //https://warframe.fandom.com/wiki/Intrinsics
    PlayerSkills: Schema.Types.Mixed,

    //TradeBannedUntil data
    TradeBannedUntil: Schema.Types.Mixed,


    //https://warframe.fandom.com/wiki/Helminth
    InfestedFoundry: Schema.Types.Mixed,
    NextRefill: Schema.Types.Mixed,

    //Purchase this new permanent skin from the Lotus customization options in Personal Quarters located in your Orbiter.
    //https://warframe.fandom.com/wiki/Lotus#The_New_War
    LotusCustomization: Schema.Types.Mixed,

    //Progress+Rank+ItemType(ZarimanPumpShotgun)
    //https://warframe.fandom.com/wiki/Incarnon
    EvolutionProgress: [Schema.Types.Mixed],


    //Unknown and system
    DuviriInfo: DuviriInfoSchema,
    Mailbox: MailboxSchema,
    KahlLoadOuts: [Schema.Types.Mixed],
    HandlerPoints: Number,
    ChallengesFixVersion: Number,
    PlayedParkourTutorial: Boolean,
    SubscribedToEmailsPersonalized: Number,
    LastInventorySync: Schema.Types.Mixed,
    ActiveLandscapeTraps: [Schema.Types.Mixed],
    RepVotes: [Schema.Types.Mixed],
    LeagueTickets: [Schema.Types.Mixed],
    HasContributedToDojo: Boolean,
    HWIDProtectEnabled: Boolean,
    LoadOutPresets: { type: Schema.Types.ObjectId, ref: "Loadout" },
    CurrentLoadOutIds: [Schema.Types.Mixed],
    RandomUpgradesIdentified: Number,
    BountyScore: Number,
    ChallengeInstanceStates: [Schema.Types.Mixed],
    RecentVendorPurchases: [Schema.Types.Mixed],
    Robotics: [Schema.Types.Mixed],
    UsedDailyDeals: [Schema.Types.Mixed],
    CollectibleSeries: [Schema.Types.Mixed],
    HasResetAccount: Boolean,

    //Discount Coupon 
    PendingCoupon: Schema.Types.Mixed,
    //Like BossAladV,BossCaptainVor come for you on missions % chance
    DeathMarks: [String],
    //Zanuka
    Harvestable: Boolean,
    //Grustag three
    DeathSquadable: Boolean
});

inventorySchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject._id;
        delete returnedObject.__v;

        const trainingDate = (returnedObject as IInventoryDatabaseDocument).TrainingDate;

        (returnedObject as IInventoryResponse).TrainingDate = {
            $date: {
                $numberLong: trainingDate.getTime().toString()
            }
        } satisfies IMongoDate;
    }
});

type InventoryDocumentProps = {
    Suits: Types.DocumentArray<ISuitDatabase>;
    LongGuns: Types.DocumentArray<IWeaponDatabase>;
    Pistols: Types.DocumentArray<IWeaponDatabase>;
    Melee: Types.DocumentArray<IWeaponDatabase>;
    FlavourItems: Types.DocumentArray<IFlavourItem>;
    RawUpgrades: Types.DocumentArray<IRawUpgrade>;
    MiscItems: Types.DocumentArray<IMiscItem>;
    Boosters: Types.DocumentArray<IBooster>;
    OperatorLoadOuts: Types.DocumentArray<IOperatorConfigClient>;
    AdultOperatorLoadOuts: Types.DocumentArray<IOperatorConfigClient>;
    MechSuits: Types.DocumentArray<ISuitDatabase>;
    Scoops: Types.DocumentArray<IGenericItem>;
    DataKnives: Types.DocumentArray<IGenericItem>;
    DrifterMelee: Types.DocumentArray<IGenericItem>;
    Sentinels: Types.DocumentArray<IWeaponDatabase>;
    Horses: Types.DocumentArray<IGenericItem>;
};

type InventoryModelType = Model<IInventoryDatabase, {}, InventoryDocumentProps>;

const Inventory = model<IInventoryDatabase, InventoryModelType>("Inventory", inventorySchema);

export { Inventory };
