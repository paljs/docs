import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/search/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { searchProps } from 'src/mdx/search/ApiArray';

export default function SearchPage() {
  return (
    <Row>
      <SEO title="Search Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Search Component">
          <Overview />
          <ApiTable name="Search" props={searchProps} />
          <StyleTable keys={['search']} />
        </Switch>
      </Col>
    </Row>
  );
}
