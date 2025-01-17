import { Ship } from "@/src/models/shipModel";
import { ILoadoutDatabase } from "@/src/types/saveLoadoutTypes";
import { RequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const getShipController: RequestHandler = async (req, res) => {
    const accountId = req.query.accountId;
    const ship = await Ship.findOne({ ShipOwnerId: accountId }).populate<{
        LoadOutInventory: { LoadOutPresets: ILoadoutDatabase };
    }>("LoadOutInventory.LoadOutPresets");

    if (!ship) {
        res.status(500).json({ error: "error finding a corresponding ship" });
        return;
    }

    ship.Ship.Features = [
        "/Lotus/Types/Items/ShipFeatureItems/AdvancedOrdisFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/AlchemyRoomFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/AlertsFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ArsenalFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/CeresNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ClanFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/EarthNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/EidolonArchwingFoundryUpgradeFeatureBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/EidolonArchwingFoundryUpgradeFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ErisNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/EuropaNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/FoundryConcurrentBuildFormaFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/FoundryFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/FoundryVesselUpgradeFeatureBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/FoundryVesselUpgradeFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/GeneticFoundryCatbrowUpgradeFeatureBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/GeneticFoundryCatbrowUpgradeFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/GeneticFoundryFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/GeneticFoundryUpgradeFeatureBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/GeneticFoundryUpgradeFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryArchonShardBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryArchonShardFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryItem",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryUpgradeBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/InfestedFoundryUpgradeFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/JupiterNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/MarketTierOneFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/MarketTierTwoFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/MarsNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/MercuryNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ModsFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ModsFusionFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ModsTransmuteFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/NeptuneNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/PersonalQuartersFeatureBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/PersonalQuartersFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/PhobosNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/PlutoNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackHoodBraceFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackHoodFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackHullFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackNacelleLeftFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackNacelleRightFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/DamagedRailjackTailFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHoodBraceFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHoodBraceFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHoodFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHoodFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHullFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackHullFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackNacelleLeftFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackNacelleLeftFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackNacelleRightFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackNacelleRightFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackTailFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/Railjack/RailjackTailFeatureItemBlueprint",
        "/Lotus/Types/Items/ShipFeatureItems/RailjackCephalonShipFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/RailjackKeyShipFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/SaturnNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/SednaNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/ShipFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/SocialMenuFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/SolarChartFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/UranusNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/VenusNavigationFeatureItem",
        "/Lotus/Types/Items/ShipFeatureItems/VoidProjectionFeatureItem"
    ];

    res.json(ship);
};

export { getShipController };
