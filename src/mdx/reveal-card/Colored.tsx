import React from 'react';
import RevealCard from '@paljs/ui/RevealCard';
import { Card, CardBody } from '@paljs/ui/Card';

export default function Colored() {
  return (
    <>
      <RevealCard button="bottom">
        <Card status="Success">
          <header>Front</header>
          <CardBody>Card basic content container component.</CardBody>
        </Card>
        <Card status="Primary">
          <header>Back</header>
          <CardBody>Card basic content container component.</CardBody>
        </Card>
      </RevealCard>
      <br />
      <RevealCard>
        <Card accent="Info">
          <header>Front</header>
          <CardBody>Card basic content container component.</CardBody>
        </Card>
        <Card accent="Warning">
          <header>Back</header>
          <CardBody>Card basic content container component.</CardBody>
        </Card>
      </RevealCard>
    </>
  );
}
