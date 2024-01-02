import { useCallback, useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Table, Button, Select, Input } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { generate as uniqueId } from 'shortid';
import useResponsiveTable from '@/hooks/useResponsiveTable';
import { useCrudContext } from '@/context/crud';


const { Option } = Select;

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
  const [selectOptions, setSelectOptions] = useState({
    instituteNames: [],
    universityNames: [],
    sessions: [],
    counselorEmails: [],
    statuses: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    institute_name: null,
    university_name: null,
    session: null,
    counselor_email: null,
    status: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const fetchData = async (entity = '') => {
    try {
      const apiUrl = `https://sode-erp.onrender.com/api/lead/filter?entity=${entity}`;
      const response = await fetch(apiUrl);
      const apiData = await response.json();

      const filteredData = apiData.result.map((item) => ({
        institute_name: item.customfields.institute_name,
        university_name: item.customfields.university_name,
        session: item.customfields.session,
        counselor_email: item.customfields.counselor_email,
        status: item.customfields.status,
      }));

      const uniqueInstituteNames = [...new Set(filteredData.map((item) => item.institute_name))];
      const uniqueUniversityNames = [...new Set(filteredData.map((item) => item.university_name))];
      const uniqueSessions = [...new Set(filteredData.map((item) => item.session))];
      const uniqueCounselorEmails = [...new Set(filteredData.map((item) => item.counselor_email))];
      const uniqueStatuses = [...new Set(filteredData.map((item) => item.status))];

      setSelectOptions({
        instituteNames: uniqueInstituteNames,
        universityNames: uniqueUniversityNames,
        sessions: uniqueSessions,
        counselorEmails: uniqueCounselorEmails,
        statuses: uniqueStatuses,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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

  const handelDataTableLoad = useCallback(
    (pagination, searchQuery = '') => {
      const options = {
        page: pagination.current || 1,
        items: pagination.pageSize || 10,
        filter: {
          ...selectedFilters,
          q: searchQuery, // Include search query in the filter
        },
      };

      dispatch(crud.list({ entity, options }));
    },
    [entity, selectedFilters]
  );


  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };


  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    fetchData(entity, searchQuery);
    return () => {
      controller.abort();
    };
  }, [entity, searchQuery]);


  const { tableColumns, tableHeader } = useResponsiveTable(
    dataTableColumns,
    items
  );

  const handleSelectChange = (fieldName, selectedValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: selectedValue,
    }));
  };


  const handleSearch = (value) => {
    setSearchQuery(value);

    // Trigger data loading with the updated search query
    handelDataTableLoad({ current: 1, pageSize: pagination.pageSize }, value);
  };

  return (
    <>
      {entity === 'lead' && (
        <div className='mb-14 -mt-12 -ml-9'>
          {/* Select components for filtering */}

          <Select
            placeholder="Select Institute Name"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => handleSelectChange('institute_name', value)}
            value={selectedFilters.institute_name}
          >
            {selectOptions.instituteNames.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select University Name"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => handleSelectChange('university_name', value)}
          >
            {selectOptions.universityNames.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Session"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => handleSelectChange('session', value)}
          >
            {selectOptions.sessions.map((session) => (
              <Option key={session} value={session}>
                {session}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Counselor Email"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => handleSelectChange('counselor_email', value)}
          >
            {selectOptions.counselorEmails.map((email) => (
              <Option key={email} value={email}>
                {email}
              </Option>
            ))}
          </Select>
          <Select
            className='mt-3.5'
            placeholder="Select Status"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => handleSelectChange('status', value)}
          >
            {selectOptions.statuses.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
          <Input.Search
            className='mt-3.5'
            placeholder="Search"
            onSearch={handleSearch}
            // Use onChange to trigger live search as the user types
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200, marginRight: 16 }}
          />
        </div>
      )}
      <div className='-mt-6'>
        <div ref={tableHeader}>
          {/* Show total count based on applied filters */}
          <PageHeader
            onBack={() => window.history.back()}
            title={`${DATATABLE_TITLE} (${translate('Total')} ${pagination.total || 0} )`}
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
          />
        </div>
        {/* Table component */}
        <Table
          columns={tableColumns}
          rowKey={(item) => item._id}
          dataSource={dataSource
            .filter((item) => {
              // Apply filter conditions based on selected filters
              return (
                (!selectedFilters.institute_name || item.customfields.institute_name === selectedFilters.institute_name) &&
                (!selectedFilters.university_name || item.customfields.university_name === selectedFilters.university_name) &&
                (!selectedFilters.session || item.customfields.session === selectedFilters.session) &&
                (!selectedFilters.counselor_email || item.customfields.counselor_email === selectedFilters.counselor_email) &&
                (!selectedFilters.status || item.customfields.status === selectedFilters.status)
              );
            })
            .filter((item) => {
              // Apply search filter
              if (!searchQuery) {
                return true; // If no search query, include all items
              }
              const searchFields = ['lead_id', 'contact.phone', 'contact.email'];

              return searchFields.some((field) => {
                // Handle nested fields like 'contact.phone'
                const fieldParts = field.split('.');
                let fieldValue = item;

                for (const part of fieldParts) {
                  fieldValue = fieldValue[part];
                }
                return (
                  fieldValue &&
                  String(fieldValue).toLowerCase().includes(searchQuery.toLowerCase())
                );
              });
            })}
          pagination={pagination}
          loading={listIsLoading}
          onChange={handelDataTableLoad}
        />
      </div>
    </>
  );
}