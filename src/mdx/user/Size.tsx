import React from 'react';
import User from '@paljs/ui/User';
import { Card, CardBody } from '@paljs/ui/Card';
import { size } from '../shared';

function Size() {
  return size.map((key) => (
    <Card key={key}>
      <CardBody>
        <User title="Manger" name="ahmed elywa" size={key} />
      </CardBody>
    </Card>
  ));
}

export default Size;
