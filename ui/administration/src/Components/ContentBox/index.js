import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { white, cyan500 } from 'material-ui/styles/colors';

class ContentBox extends Component {
  render() {
    return (
      <Container
        fluid
        style={{
          background: white,
          borderRadius: 4,
          ...this.props.style
        }}
        {...this.props.boxProps}
      >
        {this.props.title && (
          <Row
            style={{
              background: cyan500,
              borderRadius: 4,
              ...this.props.titleBoxStyle
            }}
            align={this.props.titleAlign || 'center'}
            {...this.props.titleBoxProps}
          >
            <Col align={this.props.title.align || 'center'} xs={12}>
              <h3 style={{ color: white, ...this.props.titleStyle }}>
                {this.props.title}
              </h3>
            </Col>
          </Row>
        )}
        {this.props.children}
      </Container>
    );
  }
}

export default ContentBox;
