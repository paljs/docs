import React from 'react';
import Progress  from '@paljs/ui/ProgressBar';
import { Card, CardBody } from '@paljs/ui/Card';

function Value() {
  const style = { marginBottom: '1rem' };
  return (
    <Card>
      <header>Progress Bar Value</header>
      <CardBody>
        <Progress style={style} value={20} displayValue />
        <Progress style={style} value={40}>
          Custom value
        </Progress>
      </CardBody>
    </Card>
  );
}

export default Value;
