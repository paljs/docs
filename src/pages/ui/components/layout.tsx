import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/layout/overview.md';
import StyleTable from 'src/components/Api';
import ApiTable from 'src/components/ApiTable';
import { layoutProps, layoutMethod, headerProps, columnProps } from 'src/mdx/layout/ApiArray';

function LayoutPage() {
  return (
    <Row>
      <SEO title="Layout Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Layout Components">
          <Overview />
          <>
            <ApiTable name="Layout" props={layoutProps} methods={layoutMethod} />
            <ApiTable name="LayoutHeader" props={headerProps} />
            <ApiTable name="LayoutColumn" props={columnProps} />
          </>
          <StyleTable keys={['layout', 'header', 'footer']} />
        </Switch>
      </Col>
    </Row>
  );
}

export default LayoutPage;
