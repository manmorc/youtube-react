export function authenticate(gapi) {
  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
    .then(() => console.log("Sign-in successful"))
    .catch(err => console.error("Error signing in", err));
}

export function loadClient(gapi) {
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(() => console.log("GAPI client loaded for API"))
}

