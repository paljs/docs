import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/tooltip/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { tooltipProps } from 'src/mdx/tooltip/ApiArray';

export default function TooltipPage() {
  return (
    <Row>
      <SEO title="Tooltip Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Tooltip Component">
          <Overview />
          <ApiTable name="Tooltip" props={tooltipProps} />
          <StyleTable keys={['tooltip']} />
        </Switch>
      </Col>
    </Row>
  );
}
