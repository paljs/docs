import React from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui';

export default function Basic() {
  return (
    <Card>
      <CardHeader>Card header</CardHeader>
      <CardBody>Card basic content container component.</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}
