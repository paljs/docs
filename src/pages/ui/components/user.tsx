import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/user/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { userProps } from 'src/mdx/user/ApiArray';

export default function UserPage() {
  return (
    <Row>
      <SEO title="User Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="User Component">
          <Overview />
          <ApiTable name="User" props={userProps} />
          <StyleTable keys={['user']} />
        </Switch>
      </Col>
    </Row>
  );
}
