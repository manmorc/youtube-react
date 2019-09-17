import {youtubeAdapter} from "./youtube";

class VideoProvider {
  constructor(){
    this.adapters = [youtubeAdapter];
  }

  chooseAdapter = async (url, query) => {
    //main place for choosing logic
    if(url){
      return this.getVideo(url)
    }

    if(query){
      return this.getVideos(query)
    }
  };

  getVideo = (url) => {
    console.log('url: ', url);

    let selectedAdapter = null;
    let videoId = null;

    for(let adapter of this.adapters){
      let id = adapter.getId(url);

      if(id){
        selectedAdapter = adapter;
        videoId = id;
        break;
      }
    }

    if(!selectedAdapter){
      return false;
    }

    return {
      adapter: selectedAdapter.name,
      videoId: videoId,
      createFrame: (videoId) => selectedAdapter.createFrame(videoId),
    }
  };

  getVideos = async (query) => {
    console.log('query: ', query);

    let videos = await youtubeAdapter.searchVideos(query);
    let selectedAdapter = this.adapters[0];

    return {
      videos: videos,
      adapter: selectedAdapter.name,
      createFrame: (videoId) => selectedAdapter.createFrame(videoId),
    }
  }
}

export const videoProvider = new VideoProvider();
