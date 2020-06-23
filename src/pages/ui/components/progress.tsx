import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/progress/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { progressProps } from 'src/mdx/progress/ApiArray';

export default function ProgressPage() {
  return (
    <Row>
      <SEO title="Progress Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Progress Component">
          <Overview />
          <ApiTable name="Progress" props={progressProps} />
          <StyleTable keys={['progressBar']} />
        </Switch>
      </Col>
    </Row>
  );
}
