import { useMemo, useState, useEffect } from 'react';
import { Col, Progress } from 'antd';
import useLanguage from '@/locale/useLanguage';

const fetchData = async () => {
  try {
    const response = await fetch('https://sode-erp.onrender.com/api/payment/summary');
    const data = await response.json();

    if (data?.instituteSpecificData && data?.universitySpecificData) {
      // Combine institute and university specific data into a single array
      return [...data.instituteSpecificData, ...data.universitySpecificData];
    } else if (data?.instituteSpecificData) {
      return data.instituteSpecificData;
    } else if (data?.universitySpecificData) {
      return data.universitySpecificData;
    } else {
      console.error('No specific data found in the response');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
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
    tag: 'CU',
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


  const [universityCounts, setUniversityCounts] = useState([]);
  const [instituteCounts, setInstituteCounts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (data) {
        const counts = {};

        // Prepare university-wise counts
        data.forEach((universityData) => {
          const { _id, count } = universityData[0] || {};
          if (_id && count) {
            counts[_id] = count;
          }
        });

        setUniversityCounts(counts);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (data) {
        const counts = {};

        // Prepare university-wise counts
        data.forEach((instituteData) => {
          const { _id, count } = instituteData[0] || {};
          if (_id && count) {
            counts[_id] = count;
          }
        });

        setInstituteCounts(counts);
      }
    };

    getData();
  }, []);

  const universityTagCounts = useMemo(() => {
    const counts = {};
    Object.keys(universityCounts).forEach((tag) => {
      counts[tag] = universityCounts[tag] !== undefined ? universityCounts[tag] : 0;
    });
    return counts;
  }, [universityCounts]);

  const instituteTagCounts = useMemo(() => {
    const counts = {};
    Object.keys(instituteCounts).forEach((tag) => {
      counts[tag] = instituteCounts[tag] !== undefined ? instituteCounts[tag] : 0;
    });
    return counts;
  }, [instituteCounts]);
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
              // Check if the status tag corresponds to a university count
              const universityCount = universityTagCounts[status.tag];
              if (universityCount !== undefined) {
                return (
                  <PreviewState
                    key={index}
                    tag={status.tag}
                    color={colours[status.tag]}
                    value={status.value}
                    displayedValue={universityCount.toString()} // Show the university count
                  />
                );
              }

              // For other status tags, render as before
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