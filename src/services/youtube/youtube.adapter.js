import React from "react";
import {YoutubeFrame} from "../../components/YoutubeFrame/embed";
import {authenticate, loadClient} from "./api/auth";

class YoutubeAdapter {
  name = 'youtube';

  gapi = window.gapi;
  clientId = '654627767189-de3f13p40lpu9ise8s3gdrk1657j7vi1.apps.googleusercontent.com';

  regular = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

  init = async () => {
    let promise = new Promise(resolve => {
          this.gapi.load("client:auth2", () => {
            this.gapi.auth2.init({client_id: this.clientId});
            return resolve();
          });
        });

    return promise
      .then(() => authenticate(this.gapi))
      .then(() => loadClient(this.gapi))
  };

  createFrame = (videoId) => (
    <YoutubeFrame
      videoId={videoId}
    />
  );


  getId = (url) => {
    if (url !== undefined || url !== '') {
      let match = url.match(this.regular);

      if (match && match[2].length === 11) {
        return match[2]
      } else {
        return false;
      }
    }
  };

  searchVideos = (query) => {
    return this.gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 3,
      "q": query
    })
    .then(response => response.result.items)
    .catch(err => console.error("Execute error", err));
  }
}

export const youtubeAdapter = new YoutubeAdapter();
