import { useState, useEffect } from 'react';
import { Table, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';
import DeleteUser from './deleteUser';
import AddUpdateUser from './addUpdateUser';

const UserList = () => {
  const history = useHistory();
  const [allProfiles, setAllProfiles] = useState([]);
  const [addUpdateModal, setAddUpdateModal] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState("");
  
  const showModal = () => {
    setAddUpdateModal(true);
  };

  useEffect(() => {
    getProfileList();
  }, [])

  const getProfileList = () => {
    const profiles = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : [];
    setAllProfiles(profiles);
    setAddUpdateModal(false);
    setDeleteProfile("");
  };

  const columns = [
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tagline',
      dataIndex: 'tagline',
      key: 'tagline',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <EyeFilled className="action-icon" onClick={()=> history.push('/view-profile', {email: record.email})} />
          <EditFilled className="action-icon" onClick={()=> history.push('/edit-profile', {email: record.email})} />
          <DeleteFilled className="action-icon error-message" onClick={()=>setDeleteProfile(record.email)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginTop: "10px", marginBottom: "20px" }}>
        Add Profile
      </Button>
      <Table columns={columns} dataSource={allProfiles} />
      {addUpdateModal &&
        <AddUpdateUser addUpdateModal={addUpdateModal} onCancel={() => setAddUpdateModal(false)} getProfileList={getProfileList}/>
      }
      {deleteProfile &&
        <DeleteUser email={deleteProfile} onCancel={() => setDeleteProfile("")} getProfileList={getProfileList} />
      }
    </>
  )
}

export default UserList;