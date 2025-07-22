using PX.Data.BQL;
using PX.Data.ReferentialIntegrity.Attributes;
using PX.Data;
using PX.Objects.CM;
using PX.Objects.CR;
using PX.Objects.CS;
using PX.Objects.IN;
using PX.Objects;
using System.Collections.Generic;
using System;

namespace PX.Objects.IN
{
    // Acuminator disable once PX1016 ExtensionDoesNotDeclareIsActiveMethod extension should be constantly active
    public sealed class InventoryItemCurySettingsExt : PXCacheExtension<PX.Objects.IN.InventoryItemCurySettings>
    {
        #region UsrTextA
        [PXDBString(8)]
        [PXUIField(DisplayName = "Text A")]
        public string? UsrTextA { get; set; }
        public abstract class usrTextA : PX.Data.BQL.BqlString.Field<usrTextA> { }
        #endregion
    }
}