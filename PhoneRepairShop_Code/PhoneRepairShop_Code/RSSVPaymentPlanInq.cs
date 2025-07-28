using System;
using System.Collections;
using PX.Data;
using PX.Data.BQL;
using PX.Data.BQL.Fluent;
using PX.Objects.AR;
using PX.Objects.SO;

namespace PhoneRepairShop
{
  public class RSSVPaymentPlanInq : PXGraph<RSSVPaymentPlanInq>
  {
    public PXCancel<RSSVWorkOrderToPayFilter> Cancel = null!;
    public PXFilter<RSSVWorkOrderToPayFilter> Filter = null!;

    [PXFilterable]
    public SelectFrom<RSSVWorkOrderToPay>.InnerJoin<ARInvoice>.On<ARInvoice.refNbr.IsEqual<RSSVWorkOrderToPay.invoiceNbr>>.View.ReadOnly DetailsView = null!;

    protected virtual IEnumerable detailsView()
    {

        var workOrdersQuery =
			SelectFrom<RSSVWorkOrderToPay>.
			InnerJoin<ARInvoice>.On<
			    ARInvoice.refNbr.IsEqual<RSSVWorkOrderToPay.invoiceNbr>>.
			Where<
			    RSSVWorkOrderToPay.status.IsNotEqual<RSSVWorkOrderEntry_Workflow.States.paid>.
			    And<RSSVWorkOrderToPayFilter.customerID.FromCurrent.IsNull.
                      Or<RSSVWorkOrderToPay.customerID.IsEqual<
                           RSSVWorkOrderToPayFilter.customerID.FromCurrent>>>.
			    And<RSSVWorkOrderToPayFilter.serviceID.FromCurrent.IsNull.
                      Or<RSSVWorkOrderToPay.serviceID.IsEqual<
                           RSSVWorkOrderToPayFilter.serviceID.FromCurrent>>>>.
			View.ReadOnly.Select(this);

		foreach (PXResult<RSSVWorkOrderToPay, ARInvoice> order in workOrdersQuery)
		{
			yield return order;
		}

        
		    var sorders =
			    SelectFrom<SOOrderShipment>.
			    InnerJoin<ARInvoice>.On<
                    ARInvoice.refNbr.IsEqual<SOOrderShipment.invoiceNbr>>.
			    Where<
                    RSSVWorkOrderToPayFilter.customerID.FromCurrent.IsNull.
                    Or<SOOrderShipment.customerID.IsEqual<
                         RSSVWorkOrderToPayFilter.customerID.FromCurrent>>>.
			    View.ReadOnly.Select(this);

		    foreach (PXResult<SOOrderShipment, ARInvoice> order in sorders)
		    {
			    SOOrderShipment soshipment = order;
			    ARInvoice invoice = order;
			    RSSVWorkOrderToPay workOrder = ToRSSVWorkOrderToPay(soshipment);
			    workOrder.OrderType = OrderTypeConstants.SalesOrder;
			    var result = new PXResult<RSSVWorkOrderToPay, ARInvoice>(
				    workOrder, invoice);
			    yield return result;
		    }
        
    }

    public SelectFrom<Customer>.View CustomerView = null!;

    public SelectFrom<RSSVWorkOrder>.View WorkOrderPayView = null!;

    protected virtual IEnumerable workOrderPayView()
    {
        var workOrdersQuery = SelectFrom<RSSVWorkOrder>
            .Where<RSSVWorkOrder.customerID.IsNull.Or<RSSVWorkOrder.customerID.IsEqual<@P.AsInt>>>.View.Select(this, CustomerView.Current.BAccountID);

        return workOrdersQuery;
    }

    protected virtual void _(Events.RowSelected<RSSVWorkOrderToPay> e)
    {
        using (new PXConnectionScope())
        {
            if (e.Row == null) return;
            if (e.Row.OrderTotal== 0) return;

            RSSVWorkOrderToPay order = e.Row;
            var invoices = SelectFrom<ARInvoice>.Where<ARInvoice.refNbr.IsEqual<@P.AsString>>.View.Select(this, order.InvoiceNbr);

            if (invoices.Count == 0) return;

            ARInvoice first = invoices[0];
            e.Row.PercentPaid = (order.OrderTotal - first.CuryDocBal) / order.OrderTotal * 100;
        }
    }

    public static RSSVWorkOrderToPay ToRSSVWorkOrderToPay(SOOrderShipment shipment) => new RSSVWorkOrderToPay
    {
        OrderNbr = shipment.OrderNbr,
        InvoiceNbr = shipment.InvoiceNbr
    };

    public override bool IsDirty => false;

  }

    [PXHidden]
    public class RSSVWorkOrderToPayFilter : PXBqlTable, IBqlTable
    {
        #region ServiceID
        [PXInt()]
        [PXUIField(DisplayName = "Service")]
        [PXSelector(
            typeof(Search<RSSVRepairService.serviceID>),
            typeof(RSSVRepairService.serviceCD),
            typeof(RSSVRepairService.description),
            DescriptionField = typeof(RSSVRepairService.description),
            SelectorMode = PXSelectorMode.DisplayModeText)]
        public virtual int? ServiceID { get; set; }
        public abstract class serviceID : PX.Data.BQL.BqlInt.Field<serviceID>{ }
        #endregion

        #region CustomerID
        [CustomerActive(DisplayName = "Customer ID")]
        public virtual int? CustomerID { get; set; }
        public abstract class customerID : PX.Data.BQL.BqlInt.Field<customerID>{ }
        #endregion
    }
}