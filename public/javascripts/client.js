const socket = io();

socket.on("connect", () => {
  console.log("Client Connected to Server!");
});

socket.on("disconnect", () => {
  console.log("Client Disconnected from Server!");
});

socket.on("issue-event", function (issues) {
  console.log(issues);
  console.log("-----IN ISSUE-EVENT-----");
});
