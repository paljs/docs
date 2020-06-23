import React from 'react';
import { Row, Col } from '@paljs/ui';
import SEO from 'src/components/SEO';
import Switch from 'src/components/Switch';
import Overview from 'src/mdx/chat/overview.md';
import ApiTable from 'src/components/ApiTable';
import StyleTable from 'src/components/Api';
import { chatProps, messagesProps, fromProps } from 'src/mdx/chat/ApiArray';

export default function ChatPage() {
  return (
    <Row>
      <SEO title="Chat Component" />
      <Col breakPoint={{ xs: 12 }}>
        <Switch title="Chat Component">
          <Overview />
          <>
            <ApiTable name="Chat" props={chatProps} />
            <ApiTable name="ChatMessages" props={messagesProps} />
            <ApiTable name="ChatForm" props={fromProps} />
          </>
          <StyleTable keys={['chat']} />
        </Switch>
      </Col>
    </Row>
  );
}
