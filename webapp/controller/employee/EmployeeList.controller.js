sap.ui.define([
	"com/mrb/UI5-Navigation-and-Routing/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("com.mrb.UI5-Navigation-and-Routing.controller.employee.EmployeeList", {

		onListItemPressed: function (oEvent) {
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employee", {
				employeeId: oCtx.getProperty("EmployeeID")
			});
		}
		
	});
});
