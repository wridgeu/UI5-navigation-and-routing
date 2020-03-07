# UI5-Navigation-and-Routing

This repository is meant to serve as example for how navigation and routing works within UI5. It is basically what happens when you work through the entire "Navigation and Routing"-Section within the official [UI5 documentation](https://sapui5.hana.ondemand.com/#/topic/1b6dcd39a6a74f528b27ddb22f15af0d).

### The complete flow of the application as it can also be seen on the [Documentation](https://sapui5.hana.ondemand.com/#/topic/1b6dcd39a6a74f528b27ddb22f15af0d).

You basically read it like this - starting from the home page (here simply called 'Home') you can do the following:

* Display a _Not Found_ page
* Navigate to a list of employees and drill further down to see a _Details_ page for each employee
* Show an _Employee Overview_ that they can search and sort

![](readme_images/routing_overview.png)

# Basics of Routing

Single-page applications based on SAPUI5 can use a so-called “router” to dispatch hash-based URLs to one or more views of the app. Therefore, the router needs to know how to address and show the views. In SAPUI5, we can simply add a routing section to our existing `sap.ui5` section in the descriptor file to configure the router. 

## Example App Structure

```text
.
├── ProjectFolder
│   └── webapp
│       ├── controller
│       │   └── App.controller.js
|       |   └── Home.controller.js
│       ├── css
│       ├── i18n
│       ├── view
│       │   └── App.view.xml
|       |   └── Home.view.xml
│       ├── Component.js
│       ├── index.html
│       └── manifest.json
├── package.json
├── readme.md
└── ui5.yaml
```

### There are three properties that can be used to configure the routing of your application:

__config__

This section contains the global router configuration and default values that apply for all routes and targets. The property routerClass is special as it determines the router implementation. The default value is `sap.ui.core.routing.Router`. Here, we set the routerClass to `sap.m.routing`.Router, because we implement an app based on `sap.m`. All other properties in config are given to the router instance. For example, we define where our views are located in the app. To load and display views automatically, we also specify the controlId of the control that is used to display the pages and the aggregation (controlAggregation) that will be filled when a new page is displayed. We will create only XMLviews in this tutorial, so we can set the viewType property to XML. All our views will be available in the view folder of the namespace "com.mrb.UI5-Navigation-and-Routing", so we can set the viewPath to `com.mrb.UI5-Navigation-and-Routing.view`. The transition allows us to set a default value for how the transition should happen; you can choose between slide (default), flip, fade, and show. All parameters of the config section can be overruled in the individual route and target definitions if needed.
* __Note:__

    The possible values for routerClass are `sap.ui.core.routing.Router`, `sap.m.routing.Router`, or any other subclasses of `sap.ui.core.routing.Router`. Compared to `sap.ui.core.routing`.Router the `sap.m.routing.Router` is optimized for mobile apps and adds the properties _viewLevel_, _transition_ and _transitionParameters_ which can be specified for each route or target created by the `sap.m.routing.Router`. The transitionParameters can also be used for custom transitions. Please check the [API Reference](https://sapui5.hana.ondemand.com/#/api/sap.m.routing.Router%23overview) for more information.

__routes__

Each route defines a name, a pattern, and one or more targets to navigate to when the route has been hit. The pattern is basically the hash part of the URL that matches the route. The sequence of the routes is important because only the first matched route is used by the router. In our case, we have an empty pattern to match the empty hash. The name property allows you to choose a unique route name that helps you to navigate a specific route or to determine the matched route in one of the matched handlers (we'll explain that in a later step). The target property references one or more targets from the section below that will be displayed when the route has been matched.

__targets__

A target defines the view that is displayed. It is associated with one or more routes or it can be displayed manually from within the app. Whenever a target is displayed, the corresponding view is loaded and added to the aggregation configured with the _controlAggregation_ option of the control. This option is configured using _controlId_. Each target has a unique key (home). The viewName defines which view shall be loaded. In our little example, the absolute view path to be loaded for our home target is determined by the default "viewPath": "com.mrb.UI5-Navigation-and-Routing.view" and "viewName": "Home". This leads to "com.mrb.UI5-Navigation-and-Routing.view.Home". The viewLevel is especially relevant for flip and slide transitions. It helps the router to determine the direction of the transition from one page to another. (This will also be explained later.) A target can be assigned to a route, but it's not necessary. Targets can be displayed directly in the app without hitting a route.

## Example manifest.json configuration

```json
"sap.ui5": {
    "rootView": {
        "viewName": "com.mrb.UI5-Navigation-and-Routing.view.App",
        "type": "XML",
        "async": true,
        "id": "app"
    },
    "routing": {
        "config": {
            "routerClass": "sap.m.routing.Router",
            "viewType": "XML",
            "viewPath": "com.mrb.UI5-Navigation-and-Routing.view",
            "controlId": "app",
            "controlAggregation": "pages",
            "transition": "slide",
            "async": true
        },
        "routes": [{
            "name": "appHome",
            "pattern": "",
            "target": ["home"]
        }],
        "targets": {
            "home": {
                "viewType": "XML",
                "viewId": "home",
                "viewLevel": 1,
                "viewName": "Home"
            }
        }
    }
}
```

Basically what we do here is, we define our main view called "App" to be loaded initially when starting up the application, as it is declared as `rootView` within our manifest.json. We then use the routing configuration with an initial (empty) route to display some content. We do this by using the property `controlId` and `controlAggregation`. The Router uses the initial route which points to our second view called "Home" and adds it into to the "App" view or rather into the App control as aggregation of `pages`. Therefore our "Home" view only needs to declare the aggregation `Page` which encapsulates our content. 

## Example App & Home View

__App-View__

```XML
<mvc:View
	controllerName="com.mrb.UI5-Navigation-and-Routing.controller.App"
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true">
	<Shell>
		<App id="app"/> 
        <!--The Home-View will be added into the App-Control via the Router;
        The Routing configuration tells the framework which controlId and which
        controlAggregation it has to 'target' for the placement of the View;
        Home-View implements the <page> and all it's content-->
	</Shell>
</mvc:View>
``` 

__Home-View__

```XML
<mvc:View
   controllerName="com.mrb.UI5-Navigation-and-Routing.controller.Home"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Page title="{i18n>homePageTitle}" class="sapUiResponsiveContentPadding">
      <content>
         <Button text="{i18n>iWantToNavigate}" class="sapUiTinyMarginEnd"/>
      </content>
   </Page>
</mvc:View>
```

## Routing Conventions

* Configure the router in the manifest.json descriptor file
* Initialize the router exactly once
* Initialize the router in the component

# Credits

You can find more in the [UI5-Documentation](https://sapui5.hana.ondemand.com/#/topic/cf3c57c89ef0491793d1ce327ab4f9b2).