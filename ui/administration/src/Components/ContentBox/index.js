import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { withTheme } from 'material-ui/styles';

class ContentBox extends Component {
  render() {
    const style = this.props.theme.custom.contentBox;

    return (
      <Container
        fluid
        style={{
          ...style.container,
          ...this.props.style
        }}
        {...this.props.boxProps}
      >
        {this.props.title && (
          <Row
            style={{
              ...style.titleBox,
              ...this.props.titleBoxStyle
            }}
            align={this.props.titleAlign || 'center'}
            {...this.props.titleBoxProps}
          >
            <Col align={this.props.title.align || 'center'} xs={12}>
              <h3 style={{ ...style.title, ...this.props.titleStyle }}>
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

export default withTheme()(ContentBox);
