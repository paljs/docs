import React from 'react';
import Spinner from '@paljs/ui/Spinner';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';
import { size } from '../shared';

function Size() {
  return (
    <Row>
      {size.map((key) => (
        <Col key={key} breakPoint={{ xs: 12 }}>
          <Card style={{ position: 'relative' }}>
            <CardBody>Some card content.</CardBody>
            <Spinner size={key}>Loading...</Spinner>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Size;
