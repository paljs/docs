import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/actions/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { actionsProps, actionProps } from 'src/mdx/actions/ApiArray';

export default function ActionsPage() {
  return (
    <Row>
      <SEO title="Actions Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Actions Components">
          <Overview />
          <>
            <ApiTable name="Actions" props={actionsProps} hint="actions array accept object of action see down" />
            <ApiTable
              name="Action"
              props={actionProps}
              hint="this not component just object pass to actions props array"
            />
          </>
          <StyleTable keys={['actions']} />
        </Switch>
      </Col>
    </Row>
  );
}
