import React from 'react';
import {Form} from "react-bootstrap";

import {videoProvider} from "../../services/provider.service";

export class UrlParse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      adapter: null,
      frame: null,
    };
  }

  parse = async (event) => {
    let adapterSettings = await videoProvider.chooseAdapter(event.target.value);

    if(!adapterSettings){
      console.error('Url is not supported');
      return false
    }

    this.setState({
      videoId: adapterSettings.videoId,
      adapter: adapterSettings.adapter,
      createFrame: adapterSettings.createFrame,
    })
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              value={this.state.input} onChange={this.parse}
              type="text" placeholder="Enter video URL" />
            <Form.Text className="text-muted">Paste URL of your you want to watch!</Form.Text>
          </Form.Group>
        </Form>
        {this.state.videoId && this.state.createFrame(this.state.videoId)}
      </div>
    );
  }
}
