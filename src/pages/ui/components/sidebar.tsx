import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/sidebar/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { sidebarProps, sidebarMethod } from 'src/mdx/sidebar/ApiArray';

export default function SidebarPage() {
  return (
    <Row>
      <SEO title="Sidebar Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Sidebar Components">
          <Overview />
          <ApiTable name="Sidebar" props={sidebarProps} methods={sidebarMethod} />
          <StyleTable keys={['sidebar']} />
        </Switch>
      </Col>
    </Row>
  );
}
