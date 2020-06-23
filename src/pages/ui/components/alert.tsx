import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/alert/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { alertProps } from 'src/mdx/alert/ApiArray';

export default function AlertPage() {
  return (
    <Row>
      <SEO title="Alert Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Alert Component">
          <Overview />
          <ApiTable name="Alert" props={alertProps} />
          <StyleTable keys={['alert']} />
        </Switch>
      </Col>
    </Row>
  );
}
