function sendChat(){
    $.ajax({
        type: 'POST',
        data: {command: 'dataSent', info: $("#chatEntry").val()},
        url: 'chat.php',
        timeout: 2000,

        success: function(data) {
            var obj=jQuery.parseJSON(data);
            $("#chatEntry").val("");

            if (obj.end)
            {
                $(window.location).attr('href', '/');
            }

            if (obj.resumeSheet)
            {
                var NWin = window.open('/resumeSheet.php?charid='+obj.resumeSheet,'resumeSheet','titlebar=1,scrollbars=1,height=300,width=800');
                if (window.focus)
                {
                    NWin.focus();
                }
                return false;
                // window.open('/resumeSheet.php?charid='+obj.resumeSheet,'resumeSheet');
            }
           
            return false;
        },
         
        complete: function(XMLHttpResponse, textStatus)
        { 
            return true;
        },
                                      
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return true;
        }});

    return false;
}

function offChatGet(){
    $.ajax({
        type: 'POST',
        data: {command: 'offChatGet', lastTimestamp: $("input[name=lastOffTimestamp]").val()},
        url: 'chat.php',
        timeout: 2000,
        success: function(data) {
            var obj=jQuery.parseJSON(data);
            $("#offChatData").append(obj.chatData);
            $("input[name=lastOffTimestamp]").val(obj.lastTimestamp);
            $("#offChatData").animate({ scrollTop: $('#offChatData').height() }, 300);
            //$("#offChatData").animate({ scrollTop: $("#offChatData").attr("scrollHeight")}, 3000);
            
            return false;
        },
        complete: function(XMLHttpResponse, textStatus)
        { 
            return true;
        },                            
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return true;
        }});
}


function onChatGet(){
    $.ajax({
        type: 'POST',
        data: {command: 'onChatGet', lastTimestamp: $("input[name=lastOnTimestamp]").val()},
        url: 'chat.php',
        timeout: 2000,
        success: function(data) {
            var obj=jQuery.parseJSON(data);
            $("#onChatData").append(obj.chatData);
            $("input[name=lastOnTimestamp]").val(obj.lastTimestamp);
            //$('#onChatData').scrollTop($('#onChatData').height());
            $("#onChatData").animate({ scrollTop: $('#onChatData').height() }, 300);
            // $("#onChatGet").animate({ scrollTop: $("#onChatGet").prop("scrollHeight") - $("#onChatGet").height() }, 300);
            return false;
        },
        complete: function(XMLHttpResponse, textStatus)
        { 
            return true;
        },                            
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return true;
        }});
}

function whoIsOnTable() {
  $.ajax({
    type: 'GET',
    url: 'bring_party.php',
    timeout: 2000,
    success: function(data) {
        if (data=='kicked out')
        {
            window.location.href='/';
        }
        else
        {
            $("#people").html(data);
            window.setTimeout(whoIsOnTable, 2000);
        }
    },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
              //      $("#notice_div").html('Timeout contacting server..');
              //      window.setTimeout(update, 60000);
    }
  });
}

function takeFirstTimestamp(){
    $.ajax({
        type: 'POST',
        data: {command: 'firstTimestamp'},
        url: 'chat.php',
        timeout: 2000,
        success: function(data) {
            var obj=jQuery.parseJSON(data);
            $("input[name=lastOnTimestamp]").val(obj.lastTimestamp);
            $("input[name=lastOffTimestamp]").val(obj.lastTimestamp);
            return false;
        },
        complete: function(XMLHttpResponse, textStatus)
        { 
            return true;
        },                            
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return true;
        }});
}
