import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

const App = () => {

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      // {
      //   title: 'Upgrade Status',
      //   dataIndex: 'upgradeNum',
      //   key: 'upgradeNum',
      // },
      // {
      //   title: 'Action',
      //   key: 'operation',
      //   render: () => (
      //     <Space size="middle">
      //       <a>Pause</a>
      //       <a>Stop</a>
      //       <Dropdown
      //         menu={{
      //           items,
      //         }}
      //       >
      //         <a>
      //           More <DownOutlined />
      //         </a>
      //       </Dropdown>
      //     </Space>
      //   ),
      // },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'Apple',
        // upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'items number',
      dataIndex: 'platform',
      key: 'platform',
    },
    // {
    //   title: 'Version',
    //   dataIndex: 'version',
    //   key: 'version',
    // },
    // {
    //   title: 'Upgraded',
    //   dataIndex: 'upgradeNum',
    //   key: 'upgradeNum',
    // },
    // {
    //   title: 'Creator',
    //   dataIndex: 'creator',
    //   key: 'creator',
    // },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      key: 'state',
      render: () => <Badge status="processing" text="Processing..." />,
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   render: () => <a>Publish</a>,
    // },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: '1233215',
      platform: '3',
      version: '10.3.4.5654',
      // upgradeNum: 500,
      // creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  
  return (
    <div>
    
      <Table
        className='user-table-order'
        columns={columns}
        expandable={{
          expandedRowRender,
          // defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
     
    </div>
  );
};
export default App;