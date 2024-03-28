  //docs https://media.3ds.com/support/documentation/developer/Cloud/en/DSDocNS.htm?show=../generated/js/_index/WebappsUtils.htm#function
  //CPE Euromed - bootstrap
  function executeInitWidget(w) {

    require(["DS/WAFData/WAFData"], 
      function (WAFData) 
      {
        var myWidget = {
          
          endEdit: function () {
            console.log("3DX Workshop Widget endEdit called");
          },
          onEdit: function () {
            console.log("3DX Workshop Widget onEdit called");
          },
          onKeyboardAction: function (key) {
            console.log("3DX Workshop Widget onKeyboardAction called with key '" + key + "'");
          },
          onLoad: function () {
            myWidget.invokeBoredActivity();
            console.log("3DX Workshop Widget OnLoad called");
          },
          onRefresh: function () {
            myWidget.invokeBoredActivity();
            console.log("3DX Workshop Widget OnRefresh called");
          },
          onResize: function () {
            console.log("3DX Workshop Widget onResize called");
          },
          onViewChange: function (event) {
            console.log("3DX Workshop Widget onViewChange called with event.type ='" + event.type + "'");
          },
          onSearch: function (searchQuery) {
            console.log("3DX Workshop Widget onSearch called with searchQuery ='" + searchQuery + "'");
          },
          onResetSearch: function () {
            console.log("3DX Workshop Widget onResetSearch called.");
          },
          invokeBoredActivity: function() {
                WAFData.proxifiedRequest("https://www.boredapi.com/api/activity", { type: "json", 
                onComplete : data => {
                  let recommendedActivity = data.activity;
                  document.getElementById("activityId").textContent = 
                    "Feeling bored? You could " + recommendedActivity.charAt(0).toLowerCase() + recommendedActivity.substring(1) + "!";
                } })
            }
        };
        
        w.addEvent("endEdit", myWidget.endEdit);
        w.addEvent("onEdit", myWidget.onEdit);
        w.addEvent("onKeyboardAction", myWidget.onKeyboardAction);
        w.addEvent("onLoad", myWidget.onLoad);
        w.addEvent("onRefresh", myWidget.onRefresh);
        w.addEvent("onResize", myWidget.onResize);
        w.addEvent("onViewChange", myWidget.onViewChange);

        w.addEvent("onSearch", myWidget.onSearch);
        w.addEvent("onResetSearch", myWidget.onResetSearch);
  }) 
}
