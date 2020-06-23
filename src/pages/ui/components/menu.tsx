import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/menu/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { menuProps, menuMethod, itemProps } from 'src/mdx/menu/ApiArray';

export default function MenuPage() {
  return (
    <Row>
      <SEO title="Menu Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Menu Components">
          <Overview />
          <>
            <ApiTable
              name="Menu"
              props={menuProps}
              methods={menuMethod}
              hint="items prop take array of object item go down to see his props ↓"
            />
            <ApiTable name="Item" props={itemProps} />
          </>
          <StyleTable keys={['menu']} />
        </Switch>
      </Col>
    </Row>
  );
}
