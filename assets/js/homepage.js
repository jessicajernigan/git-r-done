var getUserRepos = function(user) {
  // Format the Github API url.
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // Make a request to the URL.
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

getUserRepos();