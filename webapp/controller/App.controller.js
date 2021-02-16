sap.ui.define([
  "com/mrb/UI5-Navigation-and-Routing/controller/BaseController",
  "sap/base/Log",
  "sap/m/MessageToast"
], function (BaseController, Log, MsgToast) {
	"use strict";

	return BaseController.extend("com.mrb.UI5-Navigation-and-Routing.controller.App", {
		onInit: function () {

			/**
			 * This is ONLY for being used within the tutorial0
			 * The default log level of the current running environment may be higher than INFO,
			 * in order to see the debug info in the console, the log level needs to be explicitly set to INFO here.
			 * But for application development, the log level doesn't need to be set again in the code.
			 */
			// Log.setLevel(Log.Level.INFO); 

			var oRouter = this.getRouter();

			oRouter.attachBypassed(function (oEvent) {
				var sHash = oEvent.getParameter("hash");
				// Do something here, i.e. send logging data to the backend for analysis
				// telling what resource the user tried to access...
				// Log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
				MsgToast.show("Invalid hash: '" + sHash + "'. Bypassed was hit.");
			});
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName = oEvent.getParameter("name");
				var sHash = oEvent.getSource().oHashChanger.hash;
				// do something, i.e. send usage statistics to back end
				// in order to improve our app and the user experience (Build-Measure-Learn cycle)
				Log.info("User accessed route " + sRouteName + ", timestamp = " + new Date().getTime());
				if (sHash) {
					MsgToast.show("User navigated to route '" + sRouteName + "'. " + "Hash: '" + sHash + "'.");
				} else {
					MsgToast.show("User navigated to route '" + sRouteName + "'.");
				}
			});
		}
	});
});
