import { useViewportGridContext } from '@/context';
import { Col, Row } from 'antd';

interface ViewportGridProps {
  onSetActiveViewport: (activeViewportId: string) => void;
}

const ViewportGrid = ({ onSetActiveViewport }: ViewportGridProps) => {
  const { viewportGridState } = useViewportGridContext();
  const { rows, columns, activeViewportId } = viewportGridState;

  const backgroundColors = [
    'bg-red-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
    'bg-gray-200',
  ];

  return (
    <div className="w-full h-full p-4">
      <Row
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Col
            span={24 / columns}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            key={colIndex}
          >
            {Array.from({ length: rows }).map((_, rowIndex) => {
              const index = rowIndex * columns + colIndex;
              const backgroundColor =
                backgroundColors[index % backgroundColors.length];

              return (
                <div
                  key={index}
                  onClick={() => {
                    onSetActiveViewport(String(index));
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    border:
                      String(index) === activeViewportId
                        ? '2px solid #1677FF'
                        : '',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className={`h-full w-full ${backgroundColor} flex justify-center items-center`}
                  >
                    {index} {activeViewportId}
                  </div>
                </div>
              );
            })}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewportGrid;
