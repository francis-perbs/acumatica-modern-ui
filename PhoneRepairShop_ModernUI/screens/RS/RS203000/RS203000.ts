import {
  createCollection,
  createSingle,
  PXScreen,
  graphInfo,
  viewInfo,
  PXView,
  PXFieldState,
  gridConfig,
  PXFieldOptions,
  GridPreset,
  controlConfig,
  columnConfig,
} from "client-controls";

@graphInfo({
  graphType: "PhoneRepairShop.RSSVRepairPriceMaint",
  primaryView: "RepairPrices"
})
export class RS203000 extends PXScreen {
  RepairPrices = createSingle(RSSVRepairPrice);
  RepairItems = createCollection(RSSVRepairItem);
  Labor = createCollection(RSSVLabor);
  Warranty = createCollection(RSSVWarranty);
}

// Views
export class RSSVRepairPrice extends PXView {
  @controlConfig({ allowEdit: true })
  ServiceID: PXFieldState;

  @controlConfig({ allowEdit: true })
  DeviceID: PXFieldState;

  Price: PXFieldState;
}

@gridConfig({
  preset: GridPreset.Details,
})
export class RSSVRepairItem extends PXView {
  RepairItemType: PXFieldState<PXFieldOptions.CommitChanges>;
  Required: PXFieldState<PXFieldOptions.CommitChanges>;
  InventoryID: PXFieldState;
  InventoryID_description: PXFieldState;
  BasePrice: PXFieldState<PXFieldOptions.CommitChanges>;
  IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
  preset: GridPreset.Inquiry,
})
export class RSSVLabor extends PXView {
  @columnConfig({ hideViewLink: true })
  InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
  InventoryID_description: PXFieldState;
  DefaultPrice: PXFieldState<PXFieldOptions.CommitChanges>;
  uantity: PXFieldState<PXFieldOptions.CommitChanges>;
  ExtPrice: PXFieldState;
}

@gridConfig({
  preset: GridPreset.Details,
})
export class RSSVWarranty extends PXView {
  ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
  ContractID_description: PXFieldState;
  ContractDuration: PXFieldState;
  ContractDurationType: PXFieldState;
  ContractType: PXFieldState;
}
