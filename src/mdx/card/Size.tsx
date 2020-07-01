import React from 'react';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';

export default function Colored() {
  return (
    <>
      <Card size="Large">
        <CardHeader>Card header</CardHeader>
        <CardBody>Card basic content container component.</CardBody>
      </Card>
      <Card size="Giant">
        <CardHeader>Card header</CardHeader>
        <CardBody>Card basic content container component.</CardBody>
      </Card>
    </>
  );
}
