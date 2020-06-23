import React from 'react';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export default function Colored() {
  return (
    <>
      <Card accent="Success">
        <CardHeader>Card header</CardHeader>
        <CardBody>Card basic content container component.</CardBody>
      </Card>
      <Card accent="Primary">
        <CardHeader>Card header</CardHeader>
        <CardBody>Card basic content container component.</CardBody>
      </Card>
      <Card status="Danger" accent="Primary">
        <CardHeader>Card header</CardHeader>
        <CardBody>Card basic content container component.</CardBody>
      </Card>
    </>
  );
}
