import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/popover/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { popoverProps } from 'src/mdx/popover/ApiArray';

export default function PopoverPage() {
  return (
    <Row>
      <SEO title="Popover Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Popover Component">
          <Overview />
          <ApiTable name="Popover" props={popoverProps} />
          <StyleTable keys={['popover']} />
        </Switch>
      </Col>
    </Row>
  );
}
