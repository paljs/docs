import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/toastr/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { toastrProps, toastrMethod } from 'src/mdx/toastr/ApiArray';
//import { toastrProps } from 'src/mdx/toastr/ApiArray';

export default function ToastrPage() {
  return (
    <Row>
      <SEO title="Toastr Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Toastr Component">
          <Overview />
          <ApiTable name="Toastr" props={toastrProps} methods={toastrMethod} />
          <StyleTable keys={['toastr']} />
        </Switch>
      </Col>
    </Row>
  );
}
