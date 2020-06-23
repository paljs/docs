import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/select/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { selectProps } from 'src/mdx/select/ApiArray';

export default function SelectPage() {
  return (
    <Row>
      <SEO title="Select Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Select Component">
          <Overview />
          <ApiTable name="Select" props={selectProps} />
          <StyleTable keys={['select']} />
        </Switch>
      </Col>
    </Row>
  );
}
