import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/button/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { buttonProps } from 'src/mdx/button/ApiArray';

export default function ButtonPage() {
  return (
    <Row>
      <SEO title="Button Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Button Components">
          <Overview />
          <ApiTable
            name="Button"
            props={buttonProps}
            hint="This component just styled component not have any React function so you can pass any props like styled component"
          />
          <StyleTable keys={['button']} />
        </Switch>
      </Col>
    </Row>
  );
}
