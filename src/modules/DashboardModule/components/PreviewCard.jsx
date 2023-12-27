import { useMemo, useState, useEffect } from 'react';
import { Col, Progress } from 'antd';
import useLanguage from '@/locale/useLanguage';

// Fetch data from the API endpoint
const fetchData = async () => {
  try {
    const response = await fetch('https://sode-erp.onrender.com/api/payment/summary');
    const data = await response.json();
    return data; // Assuming the response structure matches the provided JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const fetchDataa = async () => {
  try {
    const response = await fetch('https://sode-erp.onrender.com/api/payment/summary?institute_name=DES');
    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
const fetchDataaa = async () => {
  try {
    const response = await fetch('https://sode-erp.onrender.com/api/payment/summary?institute_name=HES');
    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Error fetching data', error)
  }
}
const colours = {
  HES: '#595959',
  DES: '#1890ff',
  SPU: '#1890ff',
  LPU: '#ffa940',
  SGVU: '#ff4d4f',
  UPES: '#13c2c2',
  UU: '#95de64',
  Total: '#ff4d4f',
  New: '#95de64',
  cancel: '#13c2c2',
  Enrolled: '#722ed1',
  Alumini: '#614700',
};

const defaultStatistics = [
  {
    tag: 'SPU',
    value: 0,
  },
  {
    tag: 'LPU',
    value: 0,
  },
  {
    tag: 'UPES',
    value: 0,
  },
  {
    tag: 'UU',
    value: 0,
  },

  {
    tag: 'SGVU',
    value: 0,
  },
];

const defaultInvoiceStatistics = [
  {
    tag: 'Total',
    value: 0,
  },
  {
    tag: 'HES',
    value: 0,
  },
  {
    tag: 'DES',
    value: 0,
  },

];

const defaultStatus = [
  {
    tag: 'New',
    value: 0,
  },
  {
    tag: 'Enrolled',
    value: 0,
  },
  {
    tag: 'Aancel',
    value: 0,
  },
  {
    tag: 'Alumini',
    value: 0,
  },
];

const PreviewState = ({ tag, color, value, displayedValue }) => {
  const translate = useLanguage();
  const numericValue = isNaN(displayedValue) ? value : displayedValue;

  return (
    <div style={{ color: '#595959', marginBottom: 5 }}>
      <div className="left alignLeft uppercase">{translate(tag)}</div>
      <div className="right alignRight">{numericValue}</div>
      <Progress
        percent={parseFloat(numericValue)}
        showInfo={false}
        strokeColor={{
          '0%': color,
          '100%': color,
        }}
      />
    </div>
  );
};

export default function PreviewCard({
  title = 'Preview',
  statistics = defaultStatistics,
  isLoading = false,
  entity = 'invoice',
}) {
  const statisticsMap = useMemo(() => {
    let defaultStats = [];
    if (entity === 'invoice') {
      defaultStats = defaultInvoiceStatistics;
    } else {
      defaultStats = entity === 'status' ? defaultStatus : defaultStatistics;
    }

    return defaultStats.map((defaultStat) => {
      const matchedStat = Array.isArray(statistics)
        ? statistics.find((stat) => stat.tag === defaultStat.tag)
        : null;
      return matchedStat || defaultStat;
    });
  }, [statistics, entity]);


  const [totalCount, setTotalCount] = useState(null);
  const [instituteCounts, setInstituteCounts] = useState(null);
  const [instituteCount, setInstituteCount] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (data) {
        setTotalCount(data.result.count);
        // setInstituteCounts(data.instituteData.map((institute) => institute.value));
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDataa();
      if (data) {
        setInstituteCounts(data.result.count);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDataaa();
      if (data) {
        setInstituteCount(data.result.count);
      }
    };

    getData();
  }, []);

  const customSort = (a, b) => {
    const colorOrder = Object.values(colours);
    const indexA = colorOrder.indexOf(colours[a.tag]);
    const indexB = colorOrder.indexOf(colours[b.tag]);
    return indexA - indexB;
  };

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
    >
      <div className="pad20">
        <h3
          style={{
            color: '#22075e',
            fontSize: 'large',
            marginBottom: 40,
            marginTop: 0,
          }}
        >
          {title}
        </h3>

        {!isLoading &&
          statisticsMap
            ?.map((status, index) => {
              if (status.tag === 'Total') {
                return (
                  <PreviewState
                    key={index}
                    tag={status.tag}
                    color={colours[status.tag]}
                    value={status.value}
                    displayedValue={totalCount || 'Loading...'}
                  />
                );
              }
              if (status.tag === 'DES') {
                return (
                  <PreviewState
                    key={index}
                    tag={status.tag}
                    color={colours[status.tag]}
                    value={status.value}
                    displayedValue={instituteCounts || 'Loading...'}
                  />
                );
              }
              if (status.tag === 'HES') {
                return (
                  <PreviewState
                    key={index}
                    tag={status.tag}
                    color={colours[status.tag]}
                    value={status.value}
                    displayedValue={instituteCount || 'Loading...'}
                  />
                );
              }
              return (
                <PreviewState
                  key={index}
                  tag={status.tag}
                  color={colours[status.tag]}
                  value={status.value}
                />
              );
            })
            .sort(customSort)}
      </div>
    </Col>
  );
}