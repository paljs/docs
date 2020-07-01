import Container from '@paljs/ui/Container';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';
import Box from './Box';

export default function Offset() {
  return (
    <Container>
      <Row>
        {Array.from(Array(11), (v, i) => {
          return (
            <Col key={i} offset={{ xs: 11 - i }} breakPoint={{ xs: i + 1 }}>
              <Box row />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
