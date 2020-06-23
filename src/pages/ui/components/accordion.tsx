import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/accordion/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { accordionProps, accordionMethod, accordionItemProps } from 'src/mdx/accordion/ApiArray';

export default function AccordionPage() {
  return (
    <Row>
      <SEO title="Accordion Components" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Accordion Components">
          <Overview />
          <>
            <ApiTable name="Accordion" props={accordionProps} methods={accordionMethod} />
            <ApiTable name="AccordionItem" props={accordionItemProps} />
          </>
          <StyleTable keys={['accordion']} />
        </Switch>
      </Col>
    </Row>
  );
}
