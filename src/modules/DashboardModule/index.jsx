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

  const [institutes, setInstitutes] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [counselors, setCounselors] = useState([]);

  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [filteredPaymentData, setFilteredPaymentData] = useState({});
  const [universityExistenceMessage, setUniversityExistenceMessage] = useState('');

  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
  };

  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  const handleCounselorChange = (value) => {
    setSelectedCounselor(value);
  };

  const resetData = () => {
    setSelectedInstitute('');
    setSelectedUniversity('');
    setSelectedCounselor('');
    setFilteredPaymentData({});
    setUniversityExistenceMessage('');
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://sode-erp.onrender.com/api/payment/list');
      const data = await response.json();

      if (data.success && data.result !== null) {
        const uniqueInstitutes = [...new Set(data.result.map((item) => item.institute_name))];
        const uniqueUniversities = [...new Set(data.result.map((item) => item.university_name))];
        const uniqueCounselors = [...new Set(data.result.map((item) => item.counselor_email))];

        setInstitutes(uniqueInstitutes);
        setUniversities(uniqueUniversities);
        setCounselors(uniqueCounselors);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedInstitute || selectedUniversity || selectedCounselor) {
        try {
          const response = await fetch(
            `https://sode-erp.onrender.com/api/payment/summary?institute_name=${selectedInstitute}&university_name=${selectedUniversity}&counselor_email=${selectedCounselor}`
          );
          const data = await response.json();

          if (data.success && data.result !== null) {
            setFilteredPaymentData(data.result || {});
          } else {
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
  }, [selectedInstitute, selectedUniversity, selectedCounselor]);
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
      title: translate('University preview'),
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
      title={translate('Total Course Fee')}
      tagColor={'purple'}
      prefix={translate('Total Amount')}
      isLoading={paymentLoading}
      tagContent={`${moneyFormatter({ amount: filteredPaymentData.total_course_fee || paymentResult?.total_course_fee })}`}
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
      title={translate('Recent Paid')}
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

  return (
    <>
      {universityExistenceMessage && (
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <div style={{ color: 'red' }}>{universityExistenceMessage}</div>
          </Col>
        </Row>
      )}
      <Row className='flex space-x-7'>
        <Select value={selectedInstitute} onChange={handleInstituteChange} className='w-36'>
          <Select.Option value=''>Select Institute</Select.Option>
          {institutes.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>

        <Select value={selectedUniversity} onChange={handleUniversityChange} className='w-36'>
          <Select.Option value=''>Select University</Select.Option>
          {universities.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>

        <Select value={selectedCounselor} onChange={handleCounselorChange} className='w-36'>
          <Select.Option value=''>Select Counselor</Select.Option>
          {counselors.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
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
