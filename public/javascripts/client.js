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
  if (issues.type === "issue") {
    if (issues.state === "closed") {
      console.log("Issue-" + issues.id + ": is closed");
      notify(issues, "Issue is Closed");
      deleteClosedIssue(issues);
    } else {
      console.log("New Issue Created");
      notify(issues, "New Issue Created");
      newIssue(issues);
    }
  }
});

const notify = (issue, text) => {
  const allNotificationsDiv = document.getElementById("allNotifications");

  const notifyDiv = document.createElement("div");
  notifyDiv.setAttribute("class", "notifyDiv");

  const notifyText = document.createElement("h3");
  const h3Text = document.createTextNode(text);
  notifyText.appendChild(h3Text);

  const issueTitle = document.createElement("h4");
  const h4Text = document.createTextNode(issue.title);
  issueTitle.appendChild(h4Text);

  const issueAuthor = document.createElement("p");
  const authorP = document.createTextNode("Author: " + issue.author);
  issueAuthor.appendChild(authorP);

  const issueUpdated = document.createElement("p");
  const updatedP = document.createTextNode("Updated at: " + issue.updated_at);
  issueUpdated.appendChild(updatedP);

  notifyDiv.appendChild(notifyText);
  notifyDiv.appendChild(issueTitle);
  notifyDiv.appendChild(issueAuthor);
  notifyDiv.appendChild(issueUpdated);

  allNotificationsDiv.appendChild(notifyDiv);
};

const newIssue = (issue) => {
  const allIssues = document.getElementById("allIssues");

  const issueBox = document.createElement("div");
  issueBox.setAttribute("class", "issueBox");
  issueBox.setAttribute("id", issue.id);

  const issueTitle = document.createElement("h3");
  const titleH3 = document.createTextNode(issue.title);
  issueTitle.appendChild(titleH3);

  const issueAuth = document.createElement("p");
  const authP = document.createTextNode("Author: " + issue.author);
  issueAuth.appendChild(authP);

  const issueDesc = document.createElement("p");
  const descP = document.createTextNode(issue.description);
  issueDesc.appendChild(descP);

  const issueState = document.createElement("p");
  issueState.setAttribute("class", "issueSmall");
  const stateP = document.createTextNode("State: " + issue.state);
  issueState.appendChild(stateP);

  const issueLink = document.createElement("p");
  issueLink.setAttribute("class", "issueSmall");
  const refLink = document.createElement("a");
  const linkA = document.createTextNode(issue.link);
  refLink.appendChild(linkA);
  const linkP = document.createTextNode("Link: ");
  issueLink.appendChild(linkP);
  issueLink.appendChild(refLink);

  const issueCreated = document.createElement("p");
  issueCreated.setAttribute("class", "issueSmall");
  const createdP = document.createTextNode("Created at: " + issue.created_at);
  issueCreated.appendChild(createdP);

  const issueUpdated = document.createElement("p");
  issueUpdated.setAttribute("class", "issueSmall");
  const updatedP = document.createTextNode("Updated at: " + issue.updated);
  issueUpdated.appendChild(updatedP);

  issueBox.appendChild(issueTitle);
  issueBox.appendChild(issueAuth);
  issueBox.appendChild(issueDesc);
  issueBox.appendChild(issueState);
  issueBox.appendChild(issueLink);
  issueBox.appendChild(issueCreated);
  issueBox.appendChild(issueUpdated);

  allIssues.appendChild(issueBox);
};

const deleteClosedIssue = (issue) => {
  document.getElementById(issue.id).remove();
};
