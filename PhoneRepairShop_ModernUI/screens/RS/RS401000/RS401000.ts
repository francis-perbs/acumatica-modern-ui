import {
  createCollection,
  createSingle,
  PXScreen,
  graphInfo,
  PXView,
  PXFieldState,
  gridConfig,
  columnConfig,
  GridPreset,
  GridFastFilterVisibility,
  viewInfo,
  ControlParameter,
  PXFieldOptions,
} from "client-controls";

@graphInfo({
  graphType: "PhoneRepairShop.RSSVPaymentPlanInq",
  primaryView: "Filter"
})
export class RS401000 extends PXScreen {
  Filter = createSingle(RSSVWorkOrderToPayFilter);

  DetailsView = createCollection(RSSVWorkOrder);

  CustomerView = createCollection(CustomerViews);

  WorkOrderPayView = createCollection(WorkOrderPayViews);
}

export class RSSVWorkOrderToPayFilter extends PXView {
  ServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
  CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Views
@gridConfig({
  preset: GridPreset.Inquiry,
  autoAdjustColumns: true
})
export class RSSVWorkOrder extends PXView {
  ServiceID: PXFieldState;
  CustomerID: PXFieldState;

  OrderNbr: PXFieldState;
  OrderType: PXFieldState;
  Status: PXFieldState;
  InvoiceNbr: PXFieldState;
  PercentPaid: PXFieldState;
  ARInvoice__DueDate: PXFieldState;
  ARInvoice__CuryDocBal: PXFieldState;
}

@gridConfig({
  preset: GridPreset.Details,
  autoAdjustColumns: true,
  syncPosition: true,
  autoRepaint: ["WorkOrderPayView"]
})
export class CustomerViews extends PXView {
    BAccountID: PXFieldState;
    AcctCD: PXFieldState;
    AcctName: PXFieldState;
}

@gridConfig({
  preset: GridPreset.Details,
  autoAdjustColumns: true
})
export class WorkOrderPayViews extends PXView {
  ServiceID: PXFieldState;
  CustomerID: PXFieldState;

  OrderNbr: PXFieldState;
  OrderType: PXFieldState;
  Status: PXFieldState;
  InvoiceNbr: PXFieldState;
  PercentPaid: PXFieldState;
  ARInvoice__DueDate: PXFieldState;
  ARInvoice__CuryDocBal: PXFieldState;
}
