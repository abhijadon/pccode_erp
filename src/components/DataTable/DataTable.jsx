import { useCallback, useEffect } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Table, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { generate as uniqueId } from 'shortid';
import useResponsiveTable from '@/hooks/useResponsiveTable';
import { useCrudContext } from '@/context/crud';

function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handelClick = () => {
    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handelClick} type="primary">
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, extra = [] }) {
  let { entity, dataTableColumns, DATATABLE_TITLE } = config;
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;
  const translate = useLanguage();

  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    ...extra,
    {
      type: 'divider',
    },

    {
      label: translate('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];

  const handleRead = (record) => {
    dispatch(crud.currentItem({ data: record }));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };
  function handleEdit(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }
  function handleDelete(record) {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  }

  function handleUpdatePassword(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    advancedBox.open();
    panel.open();
    collapsedBox.open();
  }

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;

                case 'delete':
                  handleDelete(record);
                  break;
                case 'updatePassword':
                  handleUpdatePassword(record);
                  break;

                default:
                  break;
              }
              // else if (key === '2')handleCloseTask
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items: dataSource } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = {
      page: pagination.current || 1,
      items: pagination.pageSize || 10
    };
    dispatch(crud.list({ entity, options }));
  }, [dispatch, entity]);

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  const { tableColumns, tableHeader } = useResponsiveTable(
    dataTableColumns,
    items
  );



<<<<<<< Updated upstream


=======
  const statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Cancel', value: 'Cancel' },
    // Add more institute options as needed
  ];

  // Reset filters function
  const handleResetFilters = () => {
    setSelectedInstitute('');
    setSelectedUniversity('');
    setSearchValue('');
    setSelectedSession('');
    setSelectedStatus('');
  };

  // Reset filters function
  const handleReset1 = () => {
    setSelectedInstitute('');
  };

  // Reset filters function
  const handleReset2 = () => {
    setSelectedUniversity('');
  };

  // Reset filters function
  const handleReset3 = () => {
    setSelectedSession('');
  };

  // Reset filters function
  const handleReset4 = () => {
    setSelectedStatus('');
  };

  // Function to handle institute filter selection
  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
  };

  // Function to handle university filter selection
  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  // Function to handle university filter selection
  const handleSessionChange = (value) => {
    setSelectedSession(value);
  };

  // Function to handle university filter selection
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const applyFilters = (data) => {
    let filteredData = [...data];

    if (selectedInstitute !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.customfields &&
          item.customfields.institute_name &&
          item.customfields.institute_name.toLowerCase() === selectedInstitute.toLowerCase()
      );
    }

    if (selectedUniversity !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.customfields &&
          item.customfields.university_name &&
          item.customfields.university_name.toLowerCase() === selectedUniversity.toLowerCase()
      );
    }

    if (selectedSession !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.customfields &&
          item.customfields.session &&
          item.customfields.session.toLowerCase() === selectedSession.toLowerCase()
      );
    }

    if (selectedStatus !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.customfields &&
          item.customfields.status &&
          item.customfields.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
    return filteredData;
  };

  // Function to handle search value changes
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  // Filtering data based on search value
  const filteredBySearch = dataSource.filter((item) => {
    // Modify searchFields as per your actual data structure
    const searchFields = ['full_name', 'lead_id'];

    const lowerCaseSearchValue = searchValue.toLowerCase();

    return searchFields.some((field) => {
      if (Array.isArray(field)) {
        // Access nested fields in the data structure
        const fieldValue = String(item[field[0]][field[1]]).toLowerCase();
        return fieldValue.includes(lowerCaseSearchValue);
      } else if (item[field]) {
        const fieldValue = String(item[field]).toLowerCase();
        return fieldValue.includes(lowerCaseSearchValue);
      }
      return false;
    });
  });
  const filteredData = applyFilters(filteredBySearch);

  const conditionalDataSource = entity === 'lead' ? filteredData : dataSource;
>>>>>>> Stashed changes

  return (
    <>
      <div className='-mt-6'>
<<<<<<< Updated upstream
=======
        {entity === 'lead' && (
          <div className='flex justify-between mb-24 items-center'>
            {/* Filter condition using select for Institute */}
            <div className='grid grid-cols-3 gap-4'>
              <div>
                {/* Institute wise filter  */}
                <h3>Filter by Institute</h3>
                <Select
                  style={{ width: 170 }}
                  placeholder="Select Institute"
                  onChange={handleInstituteChange}
                  value={selectedInstitute}
                >
                  {instituteOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                <p onClick={handleReset1} className='cursor-pointer text-end text-red-500 font-thin text-xs'>Reset</p>
              </div>

              {/* University wise  */}
              <div>
                <h3>Filter by University</h3>
                <Select
                  style={{ width: 170 }}
                  placeholder="Select University"
                  onChange={handleUniversityChange}
                  value={selectedUniversity}
                >
                  {universityOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                <p onClick={handleReset2} className='cursor-pointer text-end text-red-500 font-thin text-xs'>Reset</p>
              </div>

              {/* Session wise  */}
              <div>
                <h3>Session</h3>
                <Select
                  style={{ width: 170 }}
                  placeholder="Select Session"
                  onChange={handleSessionChange}
                  value={selectedSession}
                >
                  {sessionOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                <p onClick={handleReset3} className='cursor-pointer text-end text-red-500 font-thin text-xs'>Reset</p>
              </div>
              {/* Status wise  */}
              <div>
                <h3>Status</h3>
                <Select
                  style={{ width: 170 }}
                  placeholder="Select Session"
                  onChange={handleStatusChange}
                  value={selectedStatus}
                >
                  {statusOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                <p onClick={handleReset4} className='cursor-pointer text-end text-red-500 font-thin text-xs'>Reset</p>
              </div>
            </div>

            <div className='w-1/4 flex gap-3 relative top-[-50px]'>
              <label htmlFor="Search">Search
                <Input.Search
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </label>
              <div>
                {/* Reset button */}
                <h3>Reset</h3>
                <Button title='Reset All Filter' onClick={handleResetFilters}><RedoOutlined /></Button>
              </div>
            </div>
          </div>
        )}

        {/* Rest of the code... */}
>>>>>>> Stashed changes
        <div ref={tableHeader}>
          <PageHeader
            onBack={() => window.history.back()}
            title={DATATABLE_TITLE}
            ghost={false}
            extra={[
              <Button onClick={handelDataTableLoad} key={`${uniqueId()}`}>
                {translate('Refresh')}
              </Button>,
              <AddNewItem key={`${uniqueId()}`} config={config} />,
            ]}
            style={{
              padding: '20px 0px',
            }}
          ></PageHeader>
        </div>
        <Table
          columns={tableColumns}
          rowKey={(item) => item._id}
<<<<<<< Updated upstream
          dataSource={dataSource}
=======
          dataSource={conditionalDataSource}
>>>>>>> Stashed changes
          pagination={pagination}
          loading={listIsLoading}
          onChange={handelDataTableLoad}
        />
      </div>
    </>
  );
}
