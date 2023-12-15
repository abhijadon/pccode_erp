import { useState, useEffect } from 'react';
import { Form, Select, Input, Checkbox, Radio, DatePicker, Upload, message } from 'antd';
import formData from './formData';
const { Option } = Select;
// Inside the component


export default function LeadForm() {
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    if (selectedInstitute && selectedUniversity) {
      setStudentId(generateUniqueId());
    } else {
      setStudentId('');
    }
  }, [selectedInstitute, selectedUniversity]);

  const generateUniqueId = () => {
    const min = 100000;
    const max = 999999;
    return String(Math.floor(Math.random() * (max - min - 1)) + min);
  };

  const generateFormItems = (fields) => {
    return fields.map((field) => {
      switch (field.type) {
        case 'studentId':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
              initialValue={generateUniqueId()}
            >
              <Input
                placeholder="Generated automatically"
                value={studentId}
                disabled
              />
            </Form.Item>
          );

        case 'text':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Input placeholder={field.place} />
            </Form.Item>
          );
        case 'email':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Input placeholder={field.place} />
            </Form.Item>
          );
        case 'tel':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Input placeholder={field.place} />
            </Form.Item>
          );
        case 'checkbox':
          return (
            <Form.Item
              key={field.id}
              valuePropName="checked"
              name={field.name}
            >
              <Checkbox>{field.label}</Checkbox>
            </Form.Item>
          );
        case 'radio':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name} // This should be 'customfields.sendfeereceipt'
            >
              <Radio.Group>
                {field.options.map((option) => (
                  <Radio key={option} value={option}>{option}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          );
        case 'select':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Select placeholder={field.place}>
                {field.options.map((option) => (
                  <Option key={option} value={option}>{option}</Option>
                ))}
              </Select>
            </Form.Item>
          );
        case 'date':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <DatePicker placeholder={field.place} />
            </Form.Item>
          );
        case 'number':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Input type="number" placeholder={field.place} />
            </Form.Item>
          );
        case 'textarea':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
            >
              <Input.TextArea rows={4} placeholder={field.place} />
            </Form.Item>
          );
        case 'file':
          return (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                onChange={(info) => {
                  if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                  } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
                fileList={[]}
              >
                <span>Click to Upload</span>
              </Upload>
            </Form.Item>
          );

        default:
          return null;
      }
    });
  };

  const handleInstituteChange = (value) => {
    setSelectedInstitute(value);
    setSelectedUniversity(null);
  };

  const handleUniversityChange = (value) => {
    setSelectedUniversity(value);
  };

  return (
    <div>
      <form>
        <Form.Item label="Select Institute" name="customfields.institute_name">
          <Select onChange={handleInstituteChange} placeholder="--Select Institute--">
            {formData.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedInstitute && (
          <Form.Item label="Select University" name="customfields.university_name">
            <Select onChange={handleUniversityChange} placeholder="--Select University--">
              {formData
                .find((item) => item.value === selectedInstitute)
                .universities.map((university) => (
                  <Option key={university.value} value={university.value}>
                    {university.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}
      </form>

      {selectedUniversity && (
        <form>
          {generateFormItems(
            formData
              .find((item) => item.value === selectedInstitute)
              .universities.find((university) => university.value === selectedUniversity).fields
          )}
        </form>
      )}
    </div>
  );
}