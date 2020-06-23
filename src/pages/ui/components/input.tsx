import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/input/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { inputProps } from 'src/mdx/input/ApiArray';

export default function InputPage() {
  return (
    <Row>
      <SEO title="Input Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Input Component">
          <Overview />
          <ApiTable name="InputGroup" props={inputProps} />
          <StyleTable keys={['input']} />
        </Switch>
      </Col>
    </Row>
  );
}
