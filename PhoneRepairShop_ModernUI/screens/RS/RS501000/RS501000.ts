import {
    graphInfo,
    PXScreen,
    viewInfo,
    createSingle,
    PXView,
    PXFieldState,
    PXFieldOptions,
    columnConfig,
    gridConfig,
    GridPreset,
    createCollection
} from "client-controls";

@graphInfo({
    graphType: "PhoneRepairShop.RSSVAssignProcess",
    primaryView: "Filter"
})
export class RS501000 extends PXScreen {
    @viewInfo({ containerName: "Filter Parameters" })
    Filter = createSingle(RSSVWorkOrderToAssignFilte);

    @viewInfo({ containerName: "Work Orders To Assign" })
    WorkOrders = createCollection(RSSVWorkOrders);
}

export class RSSVWorkOrderToAssignFilte extends PXView {
    Priority: PXFieldState<PXFieldOptions.CommitChanges>;
    TimeWithoutAction: PXFieldState<PXFieldOptions.CommitChanges>;
    ServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
    preset: GridPreset.Processing,
    autoAdjustColumns: true
})
export class RSSVWorkOrders extends PXView {
    @columnConfig({ allowCheckAll: true })
    Selected: PXFieldState;

    @columnConfig({ hideViewLink: true })
    OrderNbr: PXFieldState;

    Description: PXFieldState;

    @columnConfig({ hideViewLink: true })
    ServiceID: PXFieldState;

    @columnConfig({ hideViewLink: true })
    DeviceID: PXFieldState;

    

    @columnConfig({ hideViewLink: true })
    AssignTo: PXFieldState<PXFieldOptions.CommitChanges>;

    NbrOfAssignedOrders: PXFieldState;
    TimeWithoutAction: PXFieldState;
}