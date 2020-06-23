import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/checkbox/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { checkboxProps } from 'src/mdx/checkbox/ApiArray';

export default function CheckboxPage() {
  return (
    <Row>
      <SEO title="Checkbox Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Checkbox Component">
          <Overview />
          <ApiTable name="Checkbox" props={checkboxProps} />
          <StyleTable keys={['checkbox']} />
        </Switch>
      </Col>
    </Row>
  );
}
