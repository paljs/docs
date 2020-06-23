import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/card/overview.md';
import StyleTable from 'src/components/Api';
import ApiTable from 'src/components/ApiTable';
import { cardProps } from 'src/mdx/card/ApiArray';

function CardPage() {
  return (
    <Row>
      <SEO title="Card Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Card Component">
          <Overview />
          <ApiTable
            hint="This component just styled component not have any React function so you can pass any props like styled component"
            name="Card"
            props={cardProps}
          />
          <StyleTable keys={['card']} />
        </Switch>
      </Col>
    </Row>
  );
}

export default CardPage;
