import React from 'react';
import { Row, Col } from '@paljs/ui';
import Overview from 'src/mdx/grid/overview.md';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import ApiTable from 'src/components/ApiTable';
import { container, row, col } from 'src/mdx/grid/ApiArray';

function GridComponents() {
  return (
    <Row>
      <SEO title="Grid Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Grid Components">
          <Overview />
          <>
            <ApiTable name="Container" props={container} />
            <ApiTable
              name="Row"
              hint="breakpoints type is one of this [xs, is, sm, md, lg, xl, xxl, xxxl]"
              props={row}
            />
            <ApiTable name="Col" props={col} />
          </>
        </Switch>
      </Col>
    </Row>
  );
}

export default GridComponents;
