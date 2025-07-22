import { createCollection, gridConfig, GridPreset, PXFieldOptions, PXFieldState, PXView } from 'client-controls';
import {
    IN202500,
    InventoryItem,
    ItemCurySettings,
    ItemSettings
} from 'src/screens/IN/IN202500/IN202500';
import { RSSVStockItemDevice } from "src/screens/common/CompatibleDevices/CompatibleDevicesTable";

export interface IN202500_PhoneRepairShop extends IN202500 {}
export class IN202500_PhoneRepairShop {
    CompatibleDevices = createCollection(RSSVStockItemDevice);
}

export interface ItemSettings_PhoneRepairShop extends ItemSettings {}
export class ItemSettings_PhoneRepairShop {
    UsrRepairItem: PXFieldState<PXFieldOptions.CommitChanges>;
    UsrRepairItemType: PXFieldState;
}

export interface ItemCurySettings_PhoneRepairShop extends ItemCurySettings{}
export class ItemCurySettings_PhoneRepairShop {
    UsrTextA: PXFieldState;
}

export interface InventoryItem_PhoneRepairShop extends InventoryItem {}
export class InventoryItem_PhoneRepairShop {
    UsrTextB: PXFieldState;
}