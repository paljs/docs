import React from 'react';
import Spinner from '@paljs/ui/Spinner';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';
import { status } from '../shared';

function Status() {
  return (
    <Row>
      {status.map((key) => (
        <Col key={key} breakPoint={{ xs: 12 }}>
          <Card style={{ position: 'relative' }}>
            <CardBody>Some card content.</CardBody>
            <Spinner status={key}>Loading...</Spinner>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Status;
