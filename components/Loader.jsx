import React from 'react';
import { Spin } from 'antd';

const App = (loading) => {
  const [spinning, setSpinning] = React.useState(loading);

  return (
    <>
      <Spin spinning={spinning} fullscreen />
    </>
  );
};

export default App;