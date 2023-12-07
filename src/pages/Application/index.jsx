  import dayjs from 'dayjs';
  import { Tag } from 'antd';
  import CrudModule from '@/modules/CrudModule/CrudModule';
  import LeadForm from '@/forms/LeadForm';
  import useLanguage from '@/locale/useLanguage';

  export default function Lead() {
    const translate = useLanguage();
    const entity = 'lead';
    const searchConfig = {
      displayLabels: ['studentname', 'company'],
      searchFields: 'studentname,company',
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
        dataIndex: ['studentid'],
      },

      {
        title: translate('Student Name'),
        dataIndex: ['studentname'],
      },
      {
        title: translate('Phone'),
        dataIndex: ['phone'],
      },
      {
        title: translate('Email'),
        dataIndex: ['email'],
      },
      {
        title: translate('Course'),
        dataIndex: ['courseName'],
      },
      {
        title: translate('Session'),
        dataIndex: 'session',
      },
      {
        title: translate('Institute Name'),
        dataIndex: 'institute',
      },
      {
        title: translate('University'),
        dataIndex: ['university'],
      },
      {
        title: translate('Counselor Email'),
        dataIndex: ['counselorEmail'],
      },
      {
        title: translate('Lms'),
        dataIndex: ['lms'],
      },
      {
        title: translate('Father Name'),
        dataIndex: ['fatherName'],
      },
      {
        title: translate('mother Name'),
        dataIndex: ['motherName'],
      },
      {
        title: translate('Session type'),
        dataIndex: ['sessionType'],
      },
      {
        title: translate('Specialization'),
        dataIndex: ['specialization'],
      },
      {
        title: translate('Date of birth'),
        dataIndex: ['dob'],
        render: (date) => dayjs(date).format('DD/MM/YYYY'),
      },
      {
        title: translate('gender'),
        dataIndex: ['gender'],
      },

      {
        title: translate('Installment type'),
        dataIndex: ['installmentType'],
      },

      {
        title: translate('Payment mode'),
        dataIndex: ['paymentMode'],
      },
      {
        title: translate('Total course fee'),
        dataIndex: ['totalCourseFee'],
      },
      {
        title: translate('Total amount'),
        dataIndex: ['totalPaidAmount'],
      },
      {
        title: translate('paid amount'),
        dataIndex: ['paidAmount'],
      },
      {
        title: translate('Due amount'),
        dataIndex: ['duefeeAmount'],
      },
      {
        title: translate('Interested Loan'),
        dataIndex: ['interestedLoan'],
      },
      {
        title: translate('Additional comments'),
        dataIndex: ['interestedLoan'],
      },
      {
        title: translate('Document img1'),
        dataIndex: ['file1'],
      },
      {
        title: translate('Document img2'),
        dataIndex: ['file2'],
      },
      {
        title: translate('State'),
        dataIndex: ['state'],
      },
      {
        title: translate('Send fee receipt'),
        dataIndex: ['sendfeereceipt'],
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
