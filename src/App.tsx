import { Space } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons';
import { Home } from './pages/home/home';
import "./App.css";

function App() {

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <div className="container">
        <UpCircleTwoTone />
        <Home />
      </div>
    </Space>
  );
}

export default App;
