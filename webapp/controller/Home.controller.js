sap.ui.define([
	"com/mrb/UI5-Navigation-and-Routing/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.mrb.UI5-Navigation-and-Routing.controller.Home", {
		onDisplayNotFound: function () {
			/* 
        	  alternative ways of getting the `sap.m.routing.Targets` Object
			  this.getOwnerComponent().getRouter().getTargets() or 
			  this.getOwnerComponent().getTargets().
			*/
			//display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget: "home"
			});
		},
		onNavToEmployees: function () {
			this.getRouter().navTo("employeeList");
		},
		onNavToEmployeeOverview : function ()  {
			this.getRouter().navTo("employeeOverview");
		}
	});
});
