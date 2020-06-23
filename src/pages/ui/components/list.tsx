import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/list/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';

export default function ListPage() {
  return (
    <Row>
      <SEO title="List Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="List Components">
          <Overview />
          <ApiTable
            name="List"
            props={[]}
            hint="This component just styled component not have any React function so you can pass any props like styled component"
          />
          <StyleTable keys={['list']} />
        </Switch>
      </Col>
    </Row>
  );
}
