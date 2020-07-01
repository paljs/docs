import React from 'react';
import { EvaIcon } from '@paljs/ui/Icon';
import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { status } from '../shared';

export default function () {
  return (
    <Card>
      <header>Icon status</header>
      <CardBody>
        <Row>
          {status.map((key) => (
            <Col key={key} breakPoint={{ xs: true }}>
              <EvaIcon status={key} name="heart-outline" />
            </Col>
          ))}
          <Col breakPoint={{ xs: true }}>
            <EvaIcon name="heart-outline" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
