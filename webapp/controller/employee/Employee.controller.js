sap.ui.define([
	"com/mrb/UI5-Navigation-and-Routing/controller/BaseController"
], function (
	BaseController
) {
	"use strict";

	return BaseController.extend("com.mrb.UI5-Navigation-and-Routing.controller.employee.Employee", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);

			/* Hint: we don't want to do it this way
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			*/
		},
		
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			//use oDataModel to resolve the path and attach events
			oView.bindElement({
				path: "/Employees(" + oArgs.employeeId + ")",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function (_) {
						oView.setBusy(true);
					},
					dataReceived: function (_) {
						oView.setBusy(false);
					}
				}
			});
		},

		_onBindingChange: function (_) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		
		onShowResume: function (_) {
			var oCtx = this.getView().getElementBinding().getBoundContext();

			this.getRouter().navTo("employeeResume", {
				employeeId: oCtx.getProperty("EmployeeID")
			});
		}
	});
});
