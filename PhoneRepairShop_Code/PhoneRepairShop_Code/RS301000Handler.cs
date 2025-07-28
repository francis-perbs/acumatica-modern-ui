using PX.Api.TSBasedScreen.Interfaces;

namespace PhoneRepairShop
{
    internal class RS301000Handler : BaseCustomDataHandler<RSSVWorkOrderEntry>
    {
        protected override void CollectData(RSSVWorkOrderEntry graph, dynamic result)
        {
            result.RefreshSitemap = "Hello World!";
        }
    }
}
