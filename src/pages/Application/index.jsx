import dayjs from 'dayjs';
import { Tag } from 'antd';
import CrudModule from '@/modules/CrudModule/CrudModule';
import LeadForm from '@/forms/LeadForm';
import useLanguage from '@/locale/useLanguage';

export default function Lead() {
  const translate = useLanguage();
  const entity = 'lead';
  const searchConfig = {
    displayLabels: ['full_name', 'company'],
    searchFields: 'full_name,company',
    outputValue: '_id',
  };
  const entityDisplayLabels = ['number', 'company'];

  const readColumns = [
    {
      title: translate('University Name'),
      dataIndex: 'institute',
    },
    {
      title: translate('University Name'),
      dataIndex: 'university',
    },

    {
      title: translate('Want to Send'),
      dataIndex: 'sendfeereceipt',
    },
    {
      title: translate('StudentID'),
      dataIndex: 'studentid',
    },
    {
      title: translate('Student Name'),
      dataIndex: 'studentname',
    },

    {
      title: translate('Father Name'),
      dataIndex: 'fatherName',
    },
    {
      title: translate('Mother name'),
      dataIndex: 'motherName',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Dob'),
      dataIndex: 'dob',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: translate('counseelor email'),
      dataIndex: 'counselorEmail',
    },
    {
      title: translate('session'),
      dataIndex: 'session',
    },
    {
      title: translate('Session Type'),
      dataIndex: 'sessionType',
    },
    {
      title: translate('course'),
      dataIndex: 'courseName',
    },
    {
      title: translate('specialization'),
      dataIndex: 'specialization',
    },
    {
      title: translate('gender'),
      dataIndex: 'gender',
    },
    {
      title: translate('installment type'),
      dataIndex: 'installmentType',
    },
    {
      title: translate('payment mode'),
      dataIndex: 'paymentMode',
    },
    {
      title: translate('total course fee'),
      dataIndex: 'totalCourseFee',
    },
    {
      title: translate('Total paid amount'),
      dataIndex: 'totalPaidAmount',
    },
    {
      title: translate('paid amount'),
      dataIndex: 'paidAmount',
    },
    {
      title: translate('Due fee amount'),
      dataIndex: 'duefeeAmount',
    },

    {
      title: translate('status'),
      dataIndex: 'status',
    },
  ];

  const dataTableColumns = [

    {
      title: 'S.No.',
      dataIndex: '',
      render: (text, record, index) => index + 1,
    },
    {
      title: translate('StudentID'),
      dataIndex: ['lead_id'],
    },

    {
      title: translate('Student Name'),
      dataIndex: ['full_name'],
    },
    {
      title: 'Email',
      dataIndex: ['contact', 'email'],
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: ['contact', 'phone'],
      key: 'phone',
    },
    {
      title: translate('Course'),
      dataIndex: ['education', 'course'],
      key: 'course'
    },
    {
      title: translate('Session'),
      dataIndex: ['customfields', 'session'],
      key: 'session'
    },
    {
      title: translate('Institute Name'),
      dataIndex: ['customfields', 'institue'],
      key: 'institue'
    },
    {
      title: 'University Name', // Assuming 'university_name' is within customfields
      dataIndex: ['customfields', 'university_name'],
      key: 'university_name',
    },

    {
      title: translate('Counselor Email'),
      dataIndex: ['customfields', 'counselorEmail'],
      key: 'counselorEmail'
    },
    {
      title: translate('Lms'),
      dataIndex: ['lms'],
    },
    {
      title: translate('Father Name'),
      dataIndex: ['customfields', 'father_name'],
      key: 'father_name'
    },
    {
      title: translate('Mother Name'),
      dataIndex: ['customfields', 'mother_name'],
      key: 'mother_name'
    },
    {
      title: translate('Session type'),
      dataIndex: ['customfields', 'sessionType'],
      key: 'sessionType'
    },
    {
      title: translate('Specialization'),
      dataIndex: ['education', 'specialization'],
      key: 'specialization'
    },
    {
      title: translate('Date of birth'),
      dataIndex: ['customfields', 'dob'],
      key: 'dob',
    },
    {
      title: translate('gender'),
      dataIndex: ['customfields', 'gender'],
      key: 'gender'
    },

    {
      title: translate('Installment type'),
      dataIndex: ['customfields', 'installmentType'],
      key: 'installmentType'
    },

    {
      title: translate('Payment mode'),
      dataIndex: ['customfields', 'paymentMode'],
      key: 'paymentMode'
    },
    {
      title: translate('Total amount'),
      dataIndex: ['customfields', 'totalPaidAmount'],
      key: 'totalPaidAmount'
    },
    {
      title: translate('paid amount'),
      dataIndex: ['customfields', 'paidAmount'],
      key: 'paidAmount'
    },
    {
      title: translate('Due amount'),
      dataIndex: ['customfields', 'duefeeAmount'],
      key: 'interestedLoan'
    },
    {
      title: translate('Interested Loan'),
      dataIndex: ['customfields', 'interestedLoan'],
      key: 'interestedLoan'
    },
    {
      title: translate('Additional comments'),
      dataIndex: ['customfields', 'interestedLoan'],
      key: 'interestedLoan'
    },
    {
      title: translate('Document img1'),
      dataIndex: ['file1'],
    },
    {
      title: 'Send Fee Receipt',
      dataIndex: ['customfields', 'sendfeereceipt'],
      key: 'sendfeereceipt',
    },

    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'new'
            ? 'cyan'
            : status === 'reached'
              ? 'blue'
              : status === 'interested'
                ? 'green'
                : status === 'not interested'
                  ? 'orange'
                  : 'red';
        return <Tag color={color}>{status && translate(status)}</Tag>;
      },

    },
    {
      title: translate('Created'),
      dataIndex: 'created',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('applications'),
    DATATABLE_TITLE: translate('Applications'),
    ADD_NEW_ENTITY: translate('add_applications'),
    ENTITY_NAME: translate('applications'),
    CREATE_ENTITY: translate('save'),
    UPDATE_ENTITY: translate('update'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    readColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<LeadForm />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}
