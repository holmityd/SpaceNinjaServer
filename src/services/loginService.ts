import { Account } from "@/src/models/loginModel";
import { createInventory } from "@/src/services/inventoryService";
import { IDatabaseAccount } from "@/src/types/loginTypes";
import { createShip } from "./shipService";
import { Types } from "mongoose";
import { LoadoutModel } from "@/src/models/inventoryModels/loadoutModel";

const isCorrectPassword = (requestPassword: string, databasePassword: string): boolean => {
    return requestPassword === databasePassword;
};

const createAccount = async (accountData: IDatabaseAccount) => {
    const account = new Account(accountData);
    try {
        await account.save();
        const loadoutId = await createLoadout(account._id);
        await createInventory(account._id, loadoutId);
        await createShip(account._id, loadoutId);
        return account.toJSON();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("error creating account that is not of instance Error");
    }
};

export { isCorrectPassword, createAccount };

export const createLoadout = async (accountId: Types.ObjectId) => {
    const loadout = new LoadoutModel({ loadoutOwnerId: accountId });
    const savedLoadout = await loadout.save();
    return savedLoadout._id;
};
