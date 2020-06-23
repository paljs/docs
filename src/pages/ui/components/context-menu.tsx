import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/context-menu/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { contextProps } from 'src/mdx/context-menu/ApiArray';
import { itemProps } from 'src/mdx/menu/ApiArray';

export default function ContextMenuPage() {
  return (
    <Row>
      <SEO title="ContextMenu Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="ContextMenu Component">
          <Overview />
          <>
            <ApiTable
              name="ContextMenu"
              props={contextProps}
              hint="items prop take array of object item go down to see his props ↓"
            />
            <ApiTable name="Item" props={itemProps} />
          </>
          <StyleTable keys={['context']} />
        </Switch>
      </Col>
    </Row>
  );
}
