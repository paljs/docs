import React, { useState } from 'react';
import { Status } from '@paljs/ui/types';
import { Button } from '@paljs/ui/Button';
import Spinner from '@paljs/ui/Spinner';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';

function ButtonTest() {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <Card>
      <CardBody>
        <Row>
          {(['Primary', 'Success', 'Danger'] as Status[]).map((key) => (
            <Col breakPoint={{ xs: true }} key={key}>
              <Button onClick={onClick} style={{ position: 'relative' }} fullWidth status={key}>
                Primary
                {show && <Spinner status={key} />}
              </Button>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
}

export default ButtonTest;
