sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	return Opa5.extend("com.mrb.UI5-Navigation-and-Routing.test.integration.arrangements.Startup", {

		iStartMyApp: function () {
			this.iStartMyUIComponent({
				componentConfig: {
					name: "com.mrb.UI5-Navigation-and-Routing",
					async: true,
					manifest: true
				}
			});
		}

	});
});
