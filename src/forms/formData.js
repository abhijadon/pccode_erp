const formData = [
  {
    label: 'HES',
    name: 'customfields.institute_name',
    value: 'HES',
    universities: [
      {
        label: 'SPU',
        name: 'customfields.university_name',
        value: 'SPU',
        fields: [
          {
            key: 'radio',
            label: 'Want to send Fee Receipt',
            id: 'Send',
            name: 'customfields.send_fee_receipt',
            type: 'radio',
            options: ['yes', 'no'],
          },
          {
            key: 'studentId',
            name: 'lead_id',
            label: 'StudentID',
            place: 'StudentID',
            id: 'StudentID',
            type: 'studentId',
          },
          {
            key: 'text',
            name: 'full_name',
            label: 'Student Name',
            place: 'Student Name',
            id: 'SGVUStudentName',
            type: 'text',
          },
          {
            key: 'email',
            label: 'Email-id',
            place: 'Enter Email-id',
            name: 'contact.email',
            id: 'EmailID',
            type: 'email',
          },
          {
            key: 'tel',
            label: 'phone',
            name: 'contact.phone',
            place: 'Enter Phone Number',
            id: 'phone',
            type: 'tel',
          },
          {
            key: 'text',
            label: 'Father Name',
            name: 'customfields.father_name',
            place: 'Enter Father Name',
            id: 'Father Name',
            type: 'text',
          },
          {
            key: 'text',
            label: 'Mother Name',
            name: 'customfields.mother_name',
            place: 'Enter Mother Name',
            id: 'mother_name',
            type: 'text',
          },
          {
            key: 'number',
            label: 'Session',
            name: 'customfields.session',
            place: 'eg: 2020-2023',
            id: 'Session',
            type: 'number',
          },
          {
            key: 'select',
            label: 'Session Type',
            name: 'customfields.session_type',
            id: 'SessionType',
            place: 'Enter Session Type',
            type: 'select',
            options: ['January', 'July', 'N/A'],
          },
          {
            key: 'select',
            label: 'Course Name',
            name: 'education.course',
            id: 'course',
            place: 'Enter Course Name',
            type: 'select',
            options: ['MBA', 'BBA', 'B.Sc'],
          },
          {
            key: 'text',
            label: 'Specialization',
            name: 'customfields.enter_specialization',
            place: 'Enter Specialization',
            id: 'Specialization',
            type: 'text',
          },
          {
            key: 'date',
            label: 'Date of Birth',
            name: 'customfields.dob',
            place: 'Enter Date of Birth',
            id: 'dob',
            type: 'date',
          },
          {
            key: 'select',
            label: 'Gender',
            name: 'customfields.gender',
            id: 'Gender',
            place: 'Gender',
            type: 'select',
            options: ['Male', 'Female', 'Other'],
          },
          {
            key: 'select',
            label: 'Installment Type',
            id: 'InstallmentType',
            name: 'customfields.installment_type',
            place: 'Installment Type',
            type: 'select',
            options: [
              '1st Installment',
              '2nd Installment',
              '3rd Installment',
              '4th Installment',
              '5th Installment',
            ],
          },
          {
            key: 'select ',
            label: 'Payment mode ',
            name: 'customfields.payment_mode',
            id: 'PaymentMode ',
            type: 'select',
            options: ['DES Bank Account/UPI', 'University Bank Account', 'PayUMoney', 'Cash/DD'],
          },
          {
            key: 'number',
            label: 'Total Course Fee',
            name: 'customfields.total_course_fee',
            place: 'eg: 20000',
            id: 'Total Course Fee',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Paid Amount',
            name: 'customfields.paid_amount',
            place: 'eg: 20000',
            id: 'Paid Amount',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Due Fee Amount',
            place: 'eg: 20000',
            name: 'customfields.due_amount',
            id: 'Due Fee Amount',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Total Paid Amount',
            place: 'eg: 20000',
            name: 'customfields.total_paid_amount',
            id: 'Total Paid Amount',
            type: 'number',
          },
          {
            key: 'email',
            label: 'Counselor Email',
            name: 'customfields.counselor_email',
            place: 'Enter Counselor Email',
            id: 'CounselorEmail',
            type: 'email',
          },
          {
            key: 'file',
            label: 'Upload Fee Receipt Screenshot',
            name: 'image',
            place: 'Enter Counselor Email',
            id: 'Upload Fee Receipt Screenshot',
            type: 'file',
          },
          {
            key: 'text',
            label: 'Uplaod Student Document',
            name: 'customfields.upload_student_document',
            place: 'Enter Counselor Email',
            id: 'Uplaod Student Document',
            type: 'text',
          },
          {
            key: 'select ',
            label: 'Status',
            name: 'customfields.status',
            id: 'status ',
            type: 'select',
            options: ['New', 'Cancel', 'Alumini', 'Deactive'],
          },
          {
            key: 'text',
            label: 'Remarks',
            name: 'customfields.remark',
            place: 'Enter Remark',
            id: 'remark',
            type: 'textarea',
          },
        ],
      },
      {
        label: 'SPU',
        name: 'customfields.university_name',
        value: 'SPU',
        fields: [
          {
            key: 'radio',
            label: 'Want to send Fee Receipt',
            id: 'Send',
            name: 'customfields.send_fee_receipt',
            type: 'radio',
            options: ['yes', 'no'],
          },
          {
            key: 'studentId',
            name: 'lead_id',
            label: 'StudentID',
            place: 'StudentID',
            id: 'StudentID',
            type: 'studentId',
          },
          {
            key: 'text',
            name: 'full_name',
            label: 'Student Name',
            place: 'Student Name',
            id: 'SGVUStudentName',
            type: 'text',
          },
          {
            key: 'email',
            label: 'Email-id',
            place: 'Enter Email-id',
            name: 'contact.email',
            id: 'EmailID',
            type: 'email',
          },
          {
            key: 'tel',
            label: 'phone',
            name: 'contact.phone',
            place: 'Enter Phone Number',
            id: 'phone',
            type: 'tel',
          },
          {
            key: 'text',
            label: 'Father Name',
            name: 'customfields.father_name',
            place: 'Enter Father Name',
            id: 'Father Name',
            type: 'text',
          },
          {
            key: 'text',
            label: 'Mother Name',
            name: 'customfields.mother_name',
            place: 'Enter Mother Name',
            id: 'mother_name',
            type: 'text',
          },
          {
            key: 'number',
            label: 'Session',
            name: 'customfields.session',
            place: 'eg: 2020-2023',
            id: 'Session',
            type: 'number',
          },
          {
            key: 'select',
            label: 'Session Type',
            name: 'customfields.session_type',
            id: 'SessionType',
            place: 'Enter Session Type',
            type: 'select',
            options: ['January', 'July', 'N/A'],
          },
          {
            key: 'select',
            label: 'Course Name',
            name: 'education.course',
            id: 'course',
            place: 'Enter Course Name',
            type: 'select',
            options: ['MBA', 'BBA', 'B.Sc'],
          },
          {
            key: 'text',
            label: 'Specialization',
            name: 'customfields.enter_specialization',
            place: 'Enter Specialization',
            id: 'Specialization',
            type: 'text',
          },
          {
            key: 'date',
            label: 'Date of Birth',
            name: 'customfields.dob',
            place: 'Enter Date of Birth',
            id: 'dob',
            type: 'date',
          },
          {
            key: 'select',
            label: 'Gender',
            name: 'customfields.gender',
            id: 'Gender',
            place: 'Gender',
            type: 'select',
            options: ['Male', 'Female', 'Other'],
          },
          {
            key: 'select',
            label: 'Installment Type',
            id: 'InstallmentType',
            name: 'customfields.installment_type',
            place: 'Installment Type',
            type: 'select',
            options: [
              '1st Installment',
              '2nd Installment',
              '3rd Installment',
              '4th Installment',
              '5th Installment',
            ],
          },
          {
            key: 'select ',
            label: 'Payment mode ',
            name: 'customfields.payment_mode',
            id: 'PaymentMode ',
            type: 'select',
            options: ['DES Bank Account/UPI', 'University Bank Account', 'PayUMoney', 'Cash/DD'],
          },
          {
            key: 'number',
            label: 'Total Course Fee',
            name: 'customfields.total_course_fee',
            place: 'eg: 20000',
            id: 'Total Course Fee',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Paid Amount',
            name: 'customfields.paid_amount',
            place: 'eg: 20000',
            id: 'Paid Amount',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Due Fee Amount',
            place: 'eg: 20000',
            name: 'customfields.due_amount',
            id: 'Due Fee Amount',
            type: 'number',
          },
          {
            key: 'number',
            label: 'Total Paid Amount',
            place: 'eg: 20000',
            name: 'customfields.total_paid_amount',
            id: 'Total Paid Amount',
            type: 'number',
          },
          {
            key: 'email',
            label: 'Counselor Email',
            name: 'customfields.counselor_email',
            place: 'Enter Counselor Email',
            id: 'CounselorEmail',
            type: 'email',
          },
          {
            key: 'text',
            label: 'Upload Fee Receipt Screenshot',
            name: 'customfields.upload_fee_receipt_screenshot',
            place: 'Enter Counselor Email',
            id: 'Upload Fee Receipt Screenshot',
            type: 'text',
          },
          {
            key: 'text',
            label: 'Uplaod Student Document',
            name: 'customfields.upload_student_document',
            place: 'Enter Counselor Email',
            id: 'Uplaod Student Document',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    label: 'DES',
    value: 'DES',
    universities: [],
  },
];

export default formData;
