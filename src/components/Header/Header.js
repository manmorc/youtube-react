import React from 'react';
import {Nav} from "react-bootstrap";

import './Header.scss';

export class Header extends React.Component {
  render() {
    return (
        <Nav className="Header justify-content-center">
          <Nav.Link href="/">by link</Nav.Link>
          <Nav.Link href="/byWord">by word</Nav.Link>
        </Nav>
    );
  }
}
