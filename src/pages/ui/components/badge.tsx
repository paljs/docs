import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/badge/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { badgeProps } from 'src/mdx/badge/ApiArray';

export default function BadgePage() {
  return (
    <Row>
      <SEO title="Badge Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Badge Component">
          <Overview />
          <ApiTable name="Badge" props={badgeProps} />
          <StyleTable keys={['badge']} />
        </Switch>
      </Col>
    </Row>
  );
}
