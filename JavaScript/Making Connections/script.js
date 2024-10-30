var connectionRequests = 2;
var connections = 487;

function changeName() {
    var nameElement = document.getElementById("username");
    nameElement.innerText = "Omar Rayyan";
}
function removeRequest(request, operation) {
    var element = document.getElementById(request);
    var notificationsCountElement = document.getElementById("notifications-count");
    element.remove();
    connectionRequests--;
    notificationsCountElement.innerText = connectionRequests;

    if (operation === "accept") {
        connections++;
        var connectionsCountElement = document.getElementById("connections-count");
        connectionsCountElement.innerText = connections;
    }
    
    if (connectionRequests === 0) {
        var connectionRequestsWindow = document.getElementById("connection-requests-window");
        connectionRequestsWindow.remove();
    }
}