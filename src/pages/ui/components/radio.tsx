import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/radio/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { radioProps, optionProps } from 'src/mdx/radio/ApiArray';

export default function RadioPage() {
  return (
    <Row>
      <SEO title="Radio Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Radio Component">
          <Overview />
          <>
            <ApiTable name="Radio" props={radioProps} />
            <ApiTable name="Option" props={optionProps} />
          </>
          <StyleTable keys={['radio']} />
        </Switch>
      </Col>
    </Row>
  );
}
