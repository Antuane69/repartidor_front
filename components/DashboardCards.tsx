import { Card, Col, Row, Statistic } from 'antd';
import { ReactNode } from 'react';

type CardItem = {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: ReactNode;
  color?: string;
};

type Props = {
  data: CardItem[];
};

export default function DashboardCards({ data }: Props) {
  return (
    <Row gutter={[16, 16]}>
      {data.map((item, index) => (
        <Col
          key={index}
          xs={24}
          sm={12}
          md={12}
          lg={6}
          xl={6}
        >
          <Card
            style={{ borderRadius: 12 }}
            bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <p style={{ margin: 0, color: '#888' }}>{item.title}</p>
              <Statistic
                value={item.value}
                suffix={item.suffix}
                valueStyle={{ color: item.color || '#000' }}
              />
            </div>

            {item.prefix && (
              <div
                style={{
                  background: item.color || '#1890ff',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {item.prefix}
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}