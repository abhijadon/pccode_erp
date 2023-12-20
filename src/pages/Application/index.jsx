import {
  DownloadOutlined, ZoomInOutlined,
  ZoomOutOutlined, PrinterOutlined
} from '@ant-design/icons';
import { Tag, Image, Space } from 'antd';
import dayjs from 'dayjs'; // Import dayjs if not already imported
import CrudModule from '@/modules/CrudModule/CrudModule';
import LeadForm from '@/forms/LeadForm';
import useLanguage from '@/locale/useLanguage';
import EditForm from '../../forms/EdtiForm';

export default function Lead() {
  const translate = useLanguage();
  const entity = 'lead';
  const searchConfig = {
    displayLabels: ['full_name', 'company', 'contact.email'],
    searchFields: ['full_name', 'company', 'contact.email'],
    outputValue: '_id',
  };


  const handleDownload = (base64ImageData, imageName) => {
    try {
      const blob = base64ToBlob(base64ImageData);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error('Error while handling download:', error);
    }
  };

  const handlePrint = (base64ImageData) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="data:image/png;base64,${base64ImageData}" style="max-width:100%;" />`);
    printWindow.document.close();
    printWindow.print();
  };

  function base64ToBlob(base64ImageData) {
    const byteCharacters = atob(base64ImageData);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'image/png' });
  }
  const entityDisplayLabels = ['number', 'company'];

  const readColumns = [
    {
      title: translate('StudentID'),
      dataIndex: 'lead_id',
    },
    {
      title: translate('Student Name'),
      dataIndex: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'contact.email',
    },
    {
      title: 'Phone',
      dataIndex: 'contact.phone',
    },
    {
      title: translate('course'),
      dataIndex: 'education.course',
    },
    {
      title: translate('Session'),
      dataIndex: 'customfields.session',
    },
    {
      title: translate('Institute Name'),
      dataIndex: 'customfields.institute_name',
    },

    {
      title: translate('University name'),
      dataIndex: 'customfields.university_name',
    },

    {
      title: translate('counselor email'),
      dataIndex: 'customfields.counselor_email',
    },

    {
      title: translate('Father Name'),
      dataIndex: 'customfields.father_name',
    },
    {
      title: translate('Mother name'),
      dataIndex: 'customfields.mother_name',
    },
    {
      title: translate('Session type'),
      dataIndex: 'customfields.session_type',
    },
    {
      title: translate('Specialization'),
      dataIndex: 'customfields.enter_specialization',
    },
    {
      title: translate('Date of birth'),
      dataIndex: 'customfields.dob',
      render: (dob) => (dob ? new Date(dob).toLocaleDateString() : 'N/A'),
    },
    {
      title: translate('gender'),
      dataIndex: 'customfields.gender',
    },
    {
      title: translate('Installment type'),
      dataIndex: 'customfields.installment_type',
    },
    {
      title: translate('Payment mode'),
      dataIndex: 'customfields.payment_mode',
    },

    {
      title: translate('Total Course Fee'),
      dataIndex: 'customfields.total_course_fee',
    },
    {
      title: translate('paid amount'),
      dataIndex: 'customfields.paid_amount',
    },
    {
      title: translate('Due amount'),
      dataIndex: 'customfields.due_amount',
    },
    {
      title: translate('Total Paid amount'),
      dataIndex: 'customfields.total_paid_amount',
    },
    {
      title: translate('Send Fee Receipt'),
      dataIndex: 'customfields.send_fee_receipt',
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
      dataIndex: ['customfields', 'institute_name'],
      key: 'institute_name'
    },

    {
      title: 'University Name', // Assuming 'university_name' is within customfields
      dataIndex: ['customfields', 'university_name'],
      key: 'university_name',
    },

    {
      title: translate('Counselor Email'),
      dataIndex: ['customfields', 'counselor_email'],
      key: 'counselor_email'
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
      dataIndex: ['customfields', 'session_type'],
      key: 'sessionType'
    },
    {
      title: translate('Specialization'),
      dataIndex: ['customfields', 'enter_specialization'],
      key: 'enter_specialization'
    },
    {
      title: translate('Date of birth'),
      dataIndex: ['customfields', 'dob'],
      key: 'dob',
      render: (dob) => (dob ? new Date(dob).toLocaleDateString() : 'N/A'), // Modify the render based on how dob is stored
    },
    {
      title: translate('gender'),
      dataIndex: ['customfields', 'gender'],
      key: 'gender'
    },

    {
      title: translate('Installment type'),
      dataIndex: ['customfields', 'installment_type'],
      key: 'installmentType'
    },

    {
      title: translate('Payment mode'),
      dataIndex: ['customfields', 'payment_mode'],
      key: 'payment_mode'
    },
    {
      title: translate('Total Course Fee'),
      dataIndex: ['customfields', 'total_course_fee'],
      key: 'total_course_fee'
    },
    {
      title: translate('paid amount'),
      dataIndex: ['customfields', 'paid_amount'],
      key: 'paid_amount'
    },
    {
      title: translate('Due amount'),
      dataIndex: ['customfields', 'due_amount'],
      key: 'due_amount'
    },
    {
      title: translate('Total Paid amount'),
      dataIndex: ['customfields', 'total_paid_amount'],
      key: 'total_paid_amount'
    },
    {
      title: translate('Fee receipt screenshot'),
      dataIndex: ['customfields', 'upload_fee_receipt_screenshot'],
      key: 'upload_fee_receipt_screenshot'
    },
    {
      title: 'Image',
      dataIndex: 'image', // Assuming 'image' is the field containing the image data
      key: 'image',
      render: (imageData) => (
        <Image src={imageData && imageData.length > 0 ? imageData[0].thumbUrl : ''} alt="Lead Image" style={{ maxWidth: '50px' }} />
      ),
    },
    {
      title: 'Send Fee Receipt',
      dataIndex: ['customfields', 'send_fee_receipt'],
      key: 'send_fee_receipt',
    },

    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'new'
            ? 'cyan'
            : status === 'Enrolled'
              ? 'blue'
              : status === 'Alumini'
                ? 'green'
                : status === 'Cancel'
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
      updateForm={<EditForm isUpdateForm={true} />}
      config={config}
    />
  );
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}