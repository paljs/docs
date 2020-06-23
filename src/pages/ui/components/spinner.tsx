import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/spinner/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { spinnerProps } from 'src/mdx/spinner/ApiArray';

export default function SpinnerPage() {
  return (
    <Row>
      <SEO title="Spinner Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Spinner Component">
          <Overview />
          <ApiTable name="Spinner" props={spinnerProps} />
          <StyleTable keys={['spinner']} />
        </Switch>
      </Col>
    </Row>
  );
}
