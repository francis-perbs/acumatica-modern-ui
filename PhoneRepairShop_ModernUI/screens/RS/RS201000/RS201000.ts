import {
    createCollection,
    graphInfo,
    gridConfig,
    GridPreset,
    PXFieldOptions,
    PXFieldState,
    PXScreen,
    PXView
} from "client-controls";

@graphInfo({
    graphType: "PhoneRepairShop.RSSVRepairServiceMaint",
    primaryView: "RepairService",
    hideFilesIndicator: true,
    hideNotesIndicator: true
})
export class RS201000 extends PXScreen {
    RepairService = createCollection(RSSVRepairService);
}

@gridConfig({
    preset: GridPreset.Primary
})
export class RSSVRepairService extends PXView {
    ServiceCD: PXFieldState;
    Description: PXFieldState;
    Active: PXFieldState;
    WalkInService: PXFieldState<PXFieldOptions.CommitChanges>;
    Prepayment: PXFieldState;
    PreliminaryCheck: PXFieldState<PXFieldOptions.CommitChanges>;
}