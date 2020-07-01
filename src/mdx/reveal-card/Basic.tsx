import React from 'react';
import RevealCard  from '@paljs/ui/RevealCard';
import { Card, CardBody } from '@paljs/ui/Card';

export default function Basic() {
  return (
    <RevealCard>
      <Card>
        <header>Front</header>
        <CardBody>Card basic content container component.</CardBody>
        <footer>Footer</footer>
      </Card>
      <Card>
        <header>Back</header>
        <CardBody>Card basic content container component.</CardBody>
        <footer>Footer</footer>
      </Card>
    </RevealCard>
  );
}
