import React from 'react';
import { EvaIcon } from '@paljs/ui/Icon';
import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';

export default function () {
  return (
    <Card>
      <header>Animation</header>
      <CardBody>
        <Row>
          {(['zoom', 'pulse', 'shake', 'flip'] as ('zoom' | 'pulse' | 'shake' | 'flip')[]).map((key) => (
            <Col key={key} breakPoint={{ xs: true }}>
              <EvaIcon status="Success" name="heart-outline" options={{ animation: { type: key } }} /> {key}
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
}
