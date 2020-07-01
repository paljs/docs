import React, { useState } from 'react';
import { Checkbox } from '@paljs/ui/Checkbox';
import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { status } from '../shared';
import { Status } from '@paljs/ui/types';

const initState: any = {};
status.forEach((key) => (initState[key] = false));

function Example() {
  const [checkbox, setCheckbox] = useState(initState);
  const onChangeCheckbox = (value: boolean, key: Status) => {
    setCheckbox({ ...checkbox, [key]: value });
  };
  return (
    <Card>
      <header>Checkbox Status</header>
      <CardBody>
        <Row>
          {status.map((key) => (
            <Col key={key} breakPoint={{ xs: true }}>
              <Checkbox checked={checkbox[key]} status={key} onChange={(value) => onChangeCheckbox(value, key)}>
                {key}
              </Checkbox>
            </Col>
          ))}
          <Col breakPoint={{ xs: true }}>
            <Checkbox checked onChange={() => ({})} disabled>
              disabled
            </Checkbox>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Example;
