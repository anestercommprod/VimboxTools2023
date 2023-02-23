const curTabs = chrome.tabs.query( {} ) ;

function takeScreenshot(callback) {
    chrome.extension.sendMessage({name: 'screenshot'}, function(response) {
        var data = response.screenshotUrl;
        var canvas = document.createElement('canvas');
        var img = new Image();
        img.onload = function() {
            canvas.width = $(window).width();
            canvas.height = $(window).height()
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

            var $canvas = $(canvas);
            $canvas.data('scrollLeft', $(document.body).scrollLeft());
            $canvas.data('scrollTop', $(document.body).scrollTop());

            // Perform callback after image loads
            callback($canvas);
        }
        img.src = data;
    });
}

function GetTabByIndex(tabIndex){
    chrome.tabs.query( {} , data => { return data[tabIndex]; } )
}



function ScreenshotV2(){
    document.body.style.minWidth = "800px";
    document.body.style.maxWidth = "800px";
    document.body.style.minHeight = "800px";
    document.body.style.maxHeight = "800px";
    
    chrome.tabs.captureVisibleTab(null,{},function(dataUri){
        console.log(dataUri);

        const newImg = document.createElement('img');
        newImg.style.position = "absolute";
        newImg.src = dataUri;

        document.body.append(newImg);
    });

}
function ImgurUpload()
{
    $.ajax({
        url: "https://api.imgur.com/3/image",
        type: "POST",
        datatype: "json",
        headers: {
          "Authorization": "Client-ID aca6d2502f5bfd8"
        },
        data: formData,
        success: function(response) {
          console.log(response);
          var photo = response.data.link;
          var photo_hash = response.data.deletehash;
        },
        cache: false,
        contentType: false,
        processData: false
      });
}
