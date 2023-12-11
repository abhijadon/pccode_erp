import { useCallback, useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, RedoOutlined } from '@ant-design/icons';
import { Dropdown, Table, Button, Input, Select } from 'antd';
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
  // State variables for filtering
  const [searchValue, setSearchValue] = useState('');
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
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
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(crud.list({ entity, options }));
  }, []);

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

  const universityOptions = [
    { label: 'SPU', value: 'SPU' },
    { label: 'CU', value: 'CU' },
    { label: 'SGVU', value: 'SGVU' },
    // Add more university options as needed
  ];
  const instituteOptions = [
    { label: 'HES', value: 'HES' },
    { label: 'DES', value: 'DES' },
    // Add more institute options as needed
  ];
  // Reset filters function
  const handleResetFilters = () => {
    setSelectedInstitute('');
    setSelectedUniversity('');
    setSearchValue('');
  };
  // Reset filters function
  const handleReset1 = () => {
    setSelectedInstitute('');
  };
  // Reset filters function
  const handleReset2 = () => {
    setSelectedUniversity('');
  };
  // Function to handle institute filter selection
  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
  };

  // Function to handle university filter selection
  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  const applyFilters = (data) => {
    let filteredData = [...data];

    if (selectedInstitute !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.customfields &&
          item.customfields.institue && // Correct the key to 'institue' instead of 'institute'
          item.customfields.institue.toLowerCase() === selectedInstitute.toLowerCase()
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

    return filteredData;
  };
  // Rest of your code...

  // Function to handle search value changes
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  // Filtering data based on search value
  const filteredBySearch = dataSource.filter((item) => {
    // Modify searchFields as per your actual data structure
    const searchFields = ['full_name', 'lead_id', ['contact', 'email'], ['contact', 'phone']];

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

  return (
    <>
      <div className='-mt-6'>
        {/* Filter condition using select for Institute */}
        <div className='flex justify-between mb-24 items-center'>
          <div className='flex gap-5'>
            <div>
              <h3>Filter by Institute</h3>
              <Select
                style={{ width: 200 }}
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
            <div>
              <h3>Filter by University</h3>
              <Select
                style={{ width: 200 }}
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
          </div>

          <div className='w-1/4 flex gap-3 '>
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
        {/* Rest of the code... */}
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
          dataSource={applyFilters(filteredBySearch)}
          pagination={pagination}
          loading={listIsLoading}
          onChange={handelDataTableLoad}
        />

      </div>
    </>
  );
}
