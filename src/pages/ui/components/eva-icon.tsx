import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/eva-icon/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { animationOption, evaIconOptions, iconProps } from 'src/mdx/eva-icon/ApiArray';

export default function EvaIconPage() {
  return (
    <Row>
      <SEO title="EvaIcon Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="EvaIcon Component">
          <Overview />
          <>
            <ApiTable name="EvaIcon" props={iconProps} />
            <ApiTable name="EvaIconOptions" props={evaIconOptions} />
            <ApiTable name="AnimationOption" props={animationOption} />
          </>
          <StyleTable keys={['icon']} />
        </Switch>
      </Col>
    </Row>
  );
}
