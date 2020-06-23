import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/tabs/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { tabsProps, tabProps } from 'src/mdx/tabs/ApiArray';

export default function TabsPage() {
  return (
    <Row>
      <SEO title="Tabs Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Tabs Components">
          <Overview />
          <>
            <ApiTable name="Tabs" props={tabsProps} />
            <ApiTable name="Tab" props={tabProps} />
          </>
          <StyleTable keys={['tabs']} />
        </Switch>
      </Col>
    </Row>
  );
}
