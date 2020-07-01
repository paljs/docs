import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Box from './Box';

export default function Auto() {
  return (
    <Container>
      <Row>
        <Col breakPoint={{ xs: true }}>
          <Box row>xs</Box>
        </Col>
        <Col breakPoint={{ xs: true }}>
          <Box row>xs</Box>
        </Col>
      </Row>
      <Row>
        <Col breakPoint={{ xs: true }}>
          <Box row>xs</Box>
        </Col>
        <Col breakPoint={{ xs: true }}>
          <Box row>xs</Box>
        </Col>
        <Col breakPoint={{ xs: true }}>
          <Box row>xs</Box>
        </Col>
      </Row>
    </Container>
  );
}
