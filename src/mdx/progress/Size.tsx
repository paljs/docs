import React from 'react';
import Progress  from '@paljs/ui/ProgressBar';
import { Card, CardBody } from '@paljs/ui/Card';
import { size } from '../shared';

function Size() {
  const style = { marginBottom: '1rem' };
  return (
    <Card>
      <header>Progress Bar Size</header>
      <CardBody>
        {size.map((key, index) => (
          <Progress key={key} style={style} value={(index + 1) * 20} size={key}>
            {key}
          </Progress>
        ))}
      </CardBody>
    </Card>
  );
}

export default Size;
