import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/flip-card/overview.md';
import ApiTable from 'src/components/ApiTable';
import { flipCardProps } from 'src/mdx/flip-card/ApiArray';

export default function FlipCardPage() {
  return (
    <Row>
      <SEO title="FlipCard Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="FlipCard Components">
          <Overview />
          <ApiTable name="FlipCard" props={flipCardProps} />
        </Switch>
      </Col>
    </Row>
  );
}
