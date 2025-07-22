import {
  createCollection,
  createSingle,
  PXScreen,
  graphInfo,
  viewInfo,
  PXView,
  PXFieldState,
  gridConfig,
  controlConfig,
  PXFieldOptions,
  GridPreset,
  PXActionState,
  linkCommand,
} from "client-controls";
import { MenuItem } from "client-controls/controls/compound/tool-bar/qp-tool-bar-items";
import { RSSVStockItemDevice } from "src/screens/common/CompatibleDevices/CompatibleDevicesTable";

@graphInfo({
  graphType: "PhoneRepairShop.RSSVWorkOrderEntry",
  primaryView: "WorkOrders"
})
export class RS301000 extends PXScreen {
  FullService: PXActionState;
  PartialService: PXActionState;
  RecommendService: PXActionState;

  GoToGoogle: PXActionState;
  OpenInvoice: PXActionState;

  WorkOrders = createSingle(RSSVWorkOrder);

  CompatibleDevices = createCollection(RSSVStockItemDevice);

  @viewInfo({ containerName: "Repair Items" })
  RepairItems = createCollection(RSSVWorkOrderItem);

  @viewInfo({ containerName: "Labor" })
  Labor = createCollection(RSSVWorkOrderLabor);

  showMe = true;
  hellow = "Hello World";
}

// Views
export class RSSVWorkOrder extends PXView {
  UsrOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
  OrderNbr: PXFieldState;
  Status: PXFieldState;
  DateCreated: PXFieldState;
  DateCompleted: PXFieldState;
  Priority: PXFieldState<PXFieldOptions.CommitChanges>;
  CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
  ServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
  DeviceID: PXFieldState<PXFieldOptions.CommitChanges>;

  @controlConfig({ displayMode: "text" })
  Assignee: PXFieldState;

  Description: PXFieldState;
  OrderTotal: PXFieldState;
  InvoiceNbr: PXFieldState;
}

export class RSSVWorkOrderItem extends PXView {
  GoToGoogle: PXActionState;

  RepairItemType: PXFieldState;
  InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
  InventoryID_description: PXFieldState;
  BasePrice: PXFieldState;
}

@gridConfig({
  preset: GridPreset.Details,
  actionsConfig: {
    refresh: {
      renderAs: MenuItem.RENDER_TEXT,
      images: {},
      text: "REFRESH"
    },
    insert: {
      renderAs: MenuItem.RENDER_TEXT,
      images: {},
      text: "INSERT"
    }
  },
  topBarItems: {
    ServicesMenu: {
      type: "menu-options",
      index: 1,
      config: {
        text: "Service",
        options: {
          first: {
            text: "Full Service",
            commandName: "FullService"
          },
          second: {
            text: "Partial Service",
            commandName: "PartialService"
          },
          threee: {
            text: "Recommend Service",
            commandName: "RecommendService"
          }
        }
      }
    }
  }
})
export class RSSVWorkOrderLabor extends PXView {
  InventoryID: PXFieldState;
  InventoryID_InventoryItem_descr: PXFieldState;
  DefaultPrice: PXFieldState;

  @linkCommand("GoToGoogle")
  Quantity: PXFieldState<PXFieldOptions.CommitChanges>;
  ExtPrice: PXFieldState;
}