import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/reveal-card/overview.md';
import ApiTable from 'src/components/ApiTable';
import { revealCardProps } from 'src/mdx/reveal-card/ApiArray';

export default function RevealCardPage() {
  return (
    <Row>
      <SEO title="RevealCard Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="RevealCard Components">
          <Overview />
          <ApiTable name="RevealCard" props={revealCardProps} />
        </Switch>
      </Col>
    </Row>
  );
}
