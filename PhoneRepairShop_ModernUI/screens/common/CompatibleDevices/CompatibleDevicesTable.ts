import {
    createCollection,
    PXScreen,
    gridConfig,
    GridPreset,
    PXView,
    PXFieldState,
    PXFieldOptions
} from "client-controls";

@gridConfig({
    preset: GridPreset.Details
})
export class RSSVStockItemDevice extends PXView {
    DeviceID: PXFieldState<PXFieldOptions.CommitChanges>;
    DeviceID_description: PXFieldState;
}