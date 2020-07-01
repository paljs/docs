import React from 'react';
import Progress from '@paljs/ui/ProgressBar';
import { Card, CardBody } from '@paljs/ui/Card';
import { status } from '../shared';

function Status() {
  const style = { marginBottom: '1rem' };
  return (
    <Card>
      <header>Progress Bar Status</header>
      <CardBody>
        {status.map((key, index) => (
          <Progress key={key} style={style} value={(index + 1) * 20} status={key}>
            {key}
          </Progress>
        ))}
      </CardBody>
    </Card>
  );
}

export default Status;
