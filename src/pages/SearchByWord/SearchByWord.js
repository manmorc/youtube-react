import React from 'react';
import {Button, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {youtubeAdapter} from "../../services/youtube";

import './SearchByWord.scss';
import {videoProvider} from "../../services/provider.service";

export class SearchByWord extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      videoId: null,
      videos: null,
      adapter: null,
      createFrame: null,
      auth: false,
    };
  }

  authentificate = () => {
    youtubeAdapter.init()
      .then(() => this.setState({auth: true}))
      .catch(err => console.error("Error loading GAPI client for API", err))
  };

  search = async (event) => {
    let adapterSettings = await videoProvider.chooseAdapter(null, event.target.value);

    if(!adapterSettings){
      return false
    }

    let videos = adapterSettings.videos.map((video, index) => {
      return React.createElement(
        'li',
        {
          key: index,
          className: "list-group-item",
          id: video.id.videoId,
          onClick: this.showFrame,
        },
        video.snippet.title.toString()
      );
    });

    this.setState({
      videos: videos,
      adapter: adapterSettings.adapter,
      createFrame: adapterSettings.createFrame,
    });
  };

  showFrame = (event) => {
    return this.setState({videoId: event.target.id})
  };

  render() {
    return (
      <div className={'SearchByWord'}>
        {!this.state.auth ? (
          <Button
            className={'auth'}
            onClick={this.authentificate}
          >Auth</Button>
        ) : (
          <Form onSubmit={event => event.preventDefault() || event.stopPropagation()}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                value={this.state.input} onChange={this.search}
                type="text" placeholder="Search" />
            </Form.Group>
          </Form>
        )}
        <Container className={this.state.auth ? '' : 'hide'}>
          <Row>
            <Col>
              <ul className="list-group">
                {this.state.videos}
              </ul>
            </Col>
            <Col>
              <ul className="list-group">
                {this.state.videoId && this.state.createFrame(this.state.videoId)}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
