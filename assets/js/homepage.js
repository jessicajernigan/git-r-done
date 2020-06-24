var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a valid GitHub username.");
  }
};

var getUserRepos = function (user) {
  // Format the Github API url.
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // Make a request to the URL.
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

var displayRepos = function (repos, searchTerm) {
  // If the API returns no repos, display a message.
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  };

  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // console.log(repos);
  // console.log(searchTerm);

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name; // taking each repository (repos[i]) and writing some of its data to the page. First we format the appearance of the name and repository name.

    // Create a <div> to serve as a container for each repo.
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // Create a <span> element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // Append to container
    repoEl.appendChild(titleEl);

    // Create a 'status' element:
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // Check if the current repo has issues or not.
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};



userFormEl.addEventListener("submit", formSubmitHandler);