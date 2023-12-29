import {
  DownloadOutlined, LeftOutlined, RightOutlined
  , PrinterOutlined
} from '@ant-design/icons';
import { Tag, Modal, Image, Button, Select } from 'antd';

import CrudModule from '@/modules/CrudModule/CrudModule';
import LeadForm from '@/forms/LeadForm';
import useLanguage from '@/locale/useLanguage';
import EditForm from '../../forms/EdtiForm';
import { useState, useEffect } from 'react';

export default function Lead() {
  const translate = useLanguage();
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewVisible2, setPreviewVisible2] = useState(false); // Second Modal
  const [studentConversation, setStudentConversation] = useState([]);


  const handleImagePreview = (imageData, index) => {
    setPreviewImages(imageData);
    setCurrentImageIndex(index);
    setPreviewVisible1(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % previewImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? previewImages.length - 1 : prevIndex - 1
    );
  };
  const getConversationHistory = (record) => {
    const currentRemark = record.customfields && record.customfields.remark;
    const previousRemarks = record.previousRemarks || []; // Assuming you have previous remarks stored

    // Simulated conversation data for demonstration purposes
    const conversationData = [];

    if (currentRemark) {
      conversationData.push({
        message: currentRemark,
        date: new Date().toISOString(), // Current date for the current remark
      });
    } else {
      conversationData.push({
        message: 'No current remark found',
        date: new Date().toISOString(),
      });
    }

    // Add previous remarks to conversation data
    previousRemarks.forEach((remark, index) => {
      conversationData.push({
        message: `Previous Remark ${index + 1}: ${remark}`, // Modify the format as needed
        date: '2023-12-23T09:30:00Z', // Use the appropriate date for previous remarks
      });
    });

    return conversationData;

  };
  const handleViewStudentConversation = (record) => {
    const conversationData = getConversationHistory(record);
    setStudentConversation(conversationData);
    setPreviewVisible2(true); // Open the second modal
  };
  const handleModal1Cancel = () => {
    setPreviewVisible2(false);
    setStudentConversation([]); // Reset conversation state for modal 1
  };
  const entity = 'lead';
  const searchConfig = {
    displayLabels: ['full_name', 'company', 'contact.email'],
    searchFields: ['full_name', 'company', 'contact.email'],
    outputValue: '\_id',
  };

  const handleDownload = (base64ImageData, imageName) => {
    try {
      // Check if the provided data is a valid Base64 string
      const isBase64 = /^data:image\/([a-zA-Z]_);base64,([^\/\r\n]_)/.test(base64ImageData);

      if (!isBase64) {
        console.error('Invalid Base64 data provided.');
        return;
      }

      // Convert the Base64 string to a Blob
      const byteCharacters = atob(base64ImageData.split(',')[1]);
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
      const blob = new Blob(byteArrays, { type: 'image/png' });

      // Create an object URL from the Blob and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName || 'image'; // Set default name if imageName is missing
      link.click();

      // Clean up resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error while handling download:', error);
    }

  };
  const handlePrint = (imageUrl) => {
    const printWindow = window.open('', '\_blank');
    printWindow.document.write(
      `<img src="${imageUrl}" style="max-width:100%;" />`
    );
    printWindow.document.close();
    printWindow.print();
  };

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
      // Other columns...
      title: translate('Due amount'),
      dataIndex: 'customfields',
      render: (customfields) => {
        const totalPaidAmount = parseFloat(customfields.total_paid_amount) || 0;
        const paidAmount = parseFloat(customfields.paid_amount) || 0;
        const dueAmount = totalPaidAmount - paidAmount;
        return <span>{dueAmount.toFixed(2)}</span>; // Modify the display format as needed
      },
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
      title: translate('Total Paid amount'),
      dataIndex: 'customfields',
      key: 'total_paid_amount',
      render: (customfields) => {
        const totalPaidAmount = parseFloat(customfields.total_paid_amount) || 0;
        const paidAmount = parseFloat(customfields.paid_amount) || 0;
        const sum = totalPaidAmount + paidAmount;
        return <span>{sum.toFixed(2)}</span>; // Adjust the display format as needed
      },
    },
    {
      title: translate('paid amount'),
      dataIndex: ['customfields', 'paid_amount'],
      key: 'paid_amount'
    },
    {
      title: translate('Due amount'),
      dataIndex: 'customfields',
      render: (customfields) => {
        const totalCourseFee = parseFloat(customfields.total_course_fee) || 0;
        const paidAmount = parseFloat(customfields.paid_amount) || 0;
        const dueAmount = totalCourseFee - paidAmount;
        return <span>{dueAmount.toFixed(2)}</span>; // Adjust the display format as needed
      },
    },
    {
      title: translate('Fee receipt screenshot'),
      dataIndex: ['customfields', 'upload_fee_receipt_screenshot'],
      key: 'upload_fee_receipt_screenshot',
      render: (screenshot) => (
        screenshot && (
          <a href={screenshot} target="_blank" rel="noopener noreferrer" download>
            <DownloadOutlined style={{ fontSize: '20px', color: '#083662', cursor: 'pointer' }} />
          </a>
        )
      ),
    },
    {
      title: translate('Student Document'),
      dataIndex: 'image',
      key: 'image',
      render: (imageData) => {
        if (Array.isArray(imageData) && imageData.length > 0) {
          return (
            <div style={{ display: 'flex' }}>
              {imageData.map((img, idx) => (
                <div key={idx} style={{ marginRight: '5px' }}>
                  <img
                    src={img.thumbUrl || ''}
                    alt={img.name || `Image ${idx}`}
                    style={{ maxWidth: '50px', cursor: 'pointer' }}
                    onClick={() => handleImagePreview(imageData, idx)}
                  />
                </div>
              ))}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: 'Send Fee Receipt',
      dataIndex: ['customfields', 'send_fee_receipt'],
      key: 'send_fee_receipt',
    },
    {
      title: 'Remark',
      dataIndex: ['customfields', 'remark'],
      key: 'remark',
      render: (remark, record) => (
        <div>
          <Button onClick={() => handleViewStudentConversation(record)}>
            Remark
          </Button>
        </div>
      ),
    },
    {
      title: translate('Status'),
      dataIndex: ['customfields', 'status'],
      render: (status) => {
        let color =
          status === 'New'
            ? 'cyan'
            : status === 'Cancel'
              ? 'blue'
              : status === 'Alumini'
                ? 'green'
                : status === 'Not Intrested'
                  ? 'orange'
                  : 'red';
        return <Tag color={color}>{status && translate(status)}</Tag>;
      },

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
    <>
      <Modal
        visible={previewVisible1}
        onCancel={() => setPreviewVisible1(false)}
        footer={null}
        width={800}
        centered
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <Image
              src={previewImages[currentImageIndex]?.thumbUrl || ''}
              alt={previewImages[currentImageIndex]?.name || 'Preview'}
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
              preview={{
                mask: (
                  <>

                  </>
                ),
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '440px', // Adjusted width to accommodate 10px gap on each side
                left: '-100px', // 10px gap on the left side
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button onClick={handlePrevious} icon={<LeftOutlined />} />
              <Button onClick={handleNext} icon={<RightOutlined />} />
            </div>

          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            gap: '10px',
            position: 'absolute',
            top: '8px',
            borderRadius: '5px',
            left: 0,
            padding: '2px',

          }}
        >
          <PrinterOutlined
            onClick={() =>
              handlePrint(previewImages[currentImageIndex]?.thumbUrl)
            }
            style={{
              fontSize: '20px',
              color: '#083662',
              cursor: 'pointer',
            }}
          />

          <DownloadOutlined
            onClick={() =>
              handleDownload(
                previewImages[currentImageIndex]?.thumbUrl,
                previewImages[currentImageIndex]?.name
              )
            }
            style={{
              fontSize: '20px',
              color: '#083662',
              cursor: 'pointer',
            }}
          />
        </div>

      </Modal>
      <Modal
        visible={previewVisible2}
        onCancel={handleModal1Cancel}
        footer={null}
        width={800}
        centered
      >
        {/* Content for the first modal */}
        <div>
          {studentConversation.map((conversation, index) => (
            <p key={index}>
              {conversation.message} - {new Date(conversation.date).toLocaleDateString()}
            </p>
          ))}
        </div>
      </Modal>
      <CrudModule
        createForm={<LeadForm />}
        updateForm={<EditForm isUpdateForm={true} />}
        config={config}

      />
    </>

  );
}
