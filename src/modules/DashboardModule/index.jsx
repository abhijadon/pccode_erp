import { Tag, Row, Col, Select, message, Button } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import RecentTable from './components/RecentTable';
import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
import { useState, useEffect } from 'react';
export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [filteredPaymentData, setFilteredPaymentData] = useState({});
  const [universityExistenceMessage, setUniversityExistenceMessage] = useState('');

  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
  };

  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedInstitute || selectedUniversity) {
        try {
          const response = await fetch(
            `https://sode-erp.onrender.com/api/payment/summary?institute_name=${selectedInstitute}&university_name=${selectedUniversity}`
          );
          const data = await response.json();

          if (data.success && data.result !== null) {
            // University exists, update filtered payment data state
            setFilteredPaymentData(data.result || {});
          } else {
            // University doesn't exist, set payment data to 0 and show notification
            setFilteredPaymentData({});
            message.error(
              `The specified university (${selectedUniversity}) does not exist in the dataset.`
            );
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [selectedInstitute, selectedUniversity]);
  const { result: invoiceResult, isLoading: invoiceLoading } = useFetch(() =>
    request.summary({ entity: 'invoice' })
  );

  const { result: quoteResult, isLoading: quoteLoading } = useFetch(() =>
    request.summary({ entity: 'quote' })
  );

  const { result: offerResult, isLoading: offerLoading } = useFetch(() =>
    request.summary({ entity: 'offer' })
  );

  const { result: paymentResult, isLoading: paymentLoading } = useFetch(() =>
    request.summary({ entity: 'payment' })
  );

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'company'],
    },

    {
      title: translate('Total'),
      dataIndex: 'total_course_fee',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
          },
        };
      },
      render: (total_course_fee) => moneyFormatter({ amount: total_course_fee }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'Draft' ? 'volcano' : 'green';

        return <Tag color={color}>{translate(status)}</Tag>;
      },
    },
  ];

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'invoice',
      title: translate('Institute preview'),
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
      title: translate('Student preview'),
    },
    {
      result: offerResult,
      isLoading: offerLoading,
      entity: 'payment',
      title: translate('offers preview'),
    },
    {
      result: paymentResult,
      isLoading: paymentLoading,
      entity: 'payment',
      title: translate('payments preview'),
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (entity === 'offer') return null;

    return (
      <SummaryCard
        key={index}
        title={data?.entity === 'payment' ? translate('Payment') : translate(data?.entity)}
        tagColor={
          data?.entity === 'invoice' ? 'cyan' : data?.entity === 'quote' ? 'purple' : 'green'
        }
        prefix={translate('This month')}
        isLoading={isLoading}
        tagContent={result?.total && moneyFormatter({ amount: result?.total })}
      />
    );
  });

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading, title } = data;

    if (entity === 'payment') return null;

    return (
      <PreviewCard
        key={index}
        title={title}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });
  const invoiceCard = (
    <SummaryCard
      title={translate('Invoice')}
      tagColor={'purple'}
      prefix={translate('Total Amount')}
      isLoading={paymentLoading}
      tagContent={`${moneyFormatter({ amount: filteredPaymentData.total_paid_amount || paymentResult?.total_paid_amount })}`}
    />
  );

  const totalPaidAmountCard = (
    <SummaryCard
      title={translate('Total Paid Amount')}
      tagColor={'blue'}
      prefix={translate('Total Amount')}
      isLoading={paymentLoading}
      tagContent={`${moneyFormatter({ amount: filteredPaymentData.total_paid_amount || paymentResult?.total_paid_amount })}`}
    />
  );

  const paidAmountCard = (
    <SummaryCard
      title={translate('Paid Amount')}
      tagColor={'green'}
      prefix={translate('Paid Amount')}
      isLoading={paymentLoading}
      tagContent={`${moneyFormatter({ amount: filteredPaymentData.paid_amount || paymentResult?.paid_amount })}`}
    />
  );

  const dueAmountCard = (
    <SummaryCard
      title={translate('Due Amount')}
      tagColor={'red'}
      prefix={translate('Due amount')}
      isLoading={paymentLoading}
      tagContent={`${moneyFormatter({ amount: filteredPaymentData.due_amount || paymentResult?.due_amount })}`}
    />
  );
  const resetData = () => {
    setSelectedInstitute('');
    setSelectedUniversity('');
    setFilteredPaymentData({});
    setUniversityExistenceMessage(''); // Reset university existence message if needed
  };
  return (
    <>
      {/* Display the university existence message */}
      {universityExistenceMessage && (
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <div style={{ color: 'red' }}>{universityExistenceMessage}</div>
          </Col>
        </Row>
      )}
      <Row className='flex space-x-7'>
        {/* Select for Institute */}


        <Select value={selectedInstitute} onChange={handleInstituteChange} className='w-36'>
          {/* Options for Institute */}

          <Select.Option value="HES">HES</Select.Option>
          <Select.Option value="DES">DES</Select.Option>
          {/* Add more options as needed */}
        </Select>


        {/* Select for University */}

        <Select value={selectedUniversity} onChange={handleUniversityChange} className='w-36'>
          {/* Options for University */}
          <Select.Option value="SPU">SPU</Select.Option>
          <Select.Option value="CU">CU</Select.Option>
          {/* Add more options as needed */}
        </Select>
        <Button onClick={resetData}>Reset All</Button>

      </Row>

      <Row gutter={[32, 32]}>
        {invoiceCard}
        {totalPaidAmountCard}
        {paidAmountCard}
        {dueAmountCard}
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
          <div className="whiteBox shadow" style={{ height: 458 }}>
            <Row className="pad20" gutter={[0, 0]}>
              {statisticCards}
            </Row>
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Recent Invoices')}
            </h3>

            <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Recent Quotes')}
            </h3>
            <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
    </>
  );
}
