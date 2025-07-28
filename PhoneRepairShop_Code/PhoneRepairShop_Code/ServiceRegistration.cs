using Autofac;
using PX.Api.TSBasedScreen;

namespace PhoneRepairShop
{
    public class ServiceRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterCustomDataHandler<RS301000Handler>();
        }
    }
}
