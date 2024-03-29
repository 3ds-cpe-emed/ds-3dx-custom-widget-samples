//docs https://media.3ds.com/support/documentation/developer/Cloud/en/DSDocNS.htm?show=../generated/js/_index/WebappsUtils.htm#function
//CPE Euromed - bootstrap

function executeInitWidget(w) 
{ 
    require(["DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"], 
    
    function (WAFData, i3DXCompassServices) {
      
      var myWidget = {
        endEdit: function () {
          console.log("3DX Custom Widget endEdit called");
        },
        onEdit: function () {
          console.log("3DX Custom Widget onEdit called");
        },
        onKeyboardAction: function (key) {
          console.log("3DX Custom Widget onKeyboardAction called with key '" + key + "'");
        },
        onLoad: function () {
          console.log("3DX Custom Widget OnLoad called");
        },
        onRefresh: function () {
          console.log("3DX Custom Widget OnRefresh called");
          myWidget.updateSecurityContextPreferences();
        },
        onResize: function () {
          console.log("3DX Custom Widget onResize called");
        },
        onViewChange: function (event) {
          console.log("3DX Custom Widget onViewChange called with event.type ='" + event.type + "'");
        },
        onSearch: function (searchQuery) {
          console.log("3DX Custom Widget onSearch called with searchQuery ='" + searchQuery + "'");
        },
        onResetSearch: function () {
          console.log("3DX Custom Widget onResetSearch called.");
        },
        setSecurityContextArrayCallback : (dataResp) => {

          let securityContextArray = myWidget.parseSecurityContextArray(dataResp);

          let secCtxtPreference = {
                name: "SecurityContextPreference",
                type: "list",
                label: "Security Context",
                options: securityContextArray,
                defaultValue: securityContextArray[0] ,
            } ;
            
            widget.addPreference(secCtxtPreference);
        
        },
        parseSecurityContextArray : (data) => {

          let securityContextArray = [];

          if (data ==null) return securityContextArray;

          if (data.collabspaces == null) return securityContextArray;

          let collabspaces = data.collabspaces;

          if (!Array.isArray(collabspaces)) return securityContextArray;

          for (let i=0; i<collabspaces.length; i++)
          {
            let collabspace = collabspaces[i];
            if (collabspace == null) continue;
            if (collabspace.name == null) continue;
            if ((collabspace.couples == null) || (!Array.isArray(collabspace.couples))) continue;

            let collabspaceName = collabspace.name;

            for (let j=0; j< collabspace.couples.length; j++)
            {
              let collabspaceCouple = collabspace.couples[j];

              if (collabspaceCouple.organization == null) continue;
              if (collabspaceCouple.role == null) continue;

              let organizationName = collabspaceCouple.organization.name;
              let roleName = collabspaceCouple.role.name;

              if (organizationName == null) continue;
              if (roleName == null) continue;

              let newSecurityContextOption = {};

              newSecurityContextOption.label = roleName + "." + organizationName + "." + collabspaceName;
              newSecurityContextOption.value = roleName + "." + organizationName + "." + collabspaceName;

              securityContextArray.push(newSecurityContextOption);
            }    
          }

          return securityContextArray;

        },
        setSecurityContextArrayError : (err) =>{
          alert(err);
        },
        updateSecurityContextPreferences : () => {

          i3DXCompassServices.getServiceUrl({
        
            serviceName: "3DSpace",
            
            platformId: widget.getValue("x3dPlatformId"),
          
            onComplete: serviceUrl => {

              let url = serviceUrl + "/resources/modeler/pno/person?current=true&select=collabspaces";

              WAFData.authenticatedRequest(url, {
                method: "GET",                        
                type: "json",

                onComplete: myWidget.setSecurityContextArrayCallback,                         
                onFailure: myWidget.setSecurityContextArrayError,
                onPassportError: myWidget.setSecurityContextArrayError,

                onTimeout: myWidget.setSecurityContextArrayError
              })
            }
        })
      }
    };//myWidget

    w.addEvent("endEdit",          myWidget.endEdit);
    w.addEvent("onEdit",           myWidget.onEdit);
    w.addEvent("onKeyboardAction", myWidget.onKeyboardAction);
    w.addEvent("onLoad",           myWidget.onLoad);
    w.addEvent("onRefresh",        myWidget.onRefresh);
    w.addEvent("onResize",         myWidget.onResize);
    w.addEvent("onViewChange",     myWidget.onViewChange);
    w.addEvent("onSearch",         myWidget.onSearch);
    w.addEvent("onResetSearch",    myWidget.onResetSearch);

  }); // require
} // executeInitWidget