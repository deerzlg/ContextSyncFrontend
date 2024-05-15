import { AppstoreOutlined } from '@ant-design/icons';
import { Button, Popover, Tooltip } from 'antd';
import { useState } from 'react';

interface LayoutSelectorProps {
  onSelection: (Layout: { numRows: number; numCols: number }) => void;
  columns: number;
  rows: number;
}

function LayoutSelector({
  onSelection,
  columns = 3,
  rows = 3,
}: LayoutSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const hoverX = hoveredIndex % columns;
  const hoverY = Math.floor(hoveredIndex / columns);
  const isHovered = (index: number) => {
    const x = index % columns;
    const y = Math.floor(index / columns);

    return x <= hoverX && y <= hoverY;
  };

  const gridSize = '20px ';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridSize.repeat(columns),
        gridTemplateRows: gridSize.repeat(rows),
        backgroundColor: '#090c29', // primary-dark
      }}
      className="p-2"
    >
      {[...Array(rows * columns)]
        .map(function (_, i) {
          return i;
        })
        .map(function (_, i) {
          return i;
        })
        .map((index) => (
          <div
            key={index}
            style={{
              border: '1px solid white',
              backgroundColor: isHovered(index) ? '#5acce6' : '#0b1a42',
            }}
            className="cursor-pointer"
            onClick={() => {
              const x = index % columns;
              const y = Math.floor(index / columns);
              onSelection({
                numRows: y + 1,
                numCols: x + 1,
              });
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          ></div>
        ))}
    </div>
  );
}

interface LayoutSelectorButtonProps {
  setLayoutGrid: (Layout: { numRows: number; numCols: number }) => void;
}

export default function LayoutSelectorButton(props: LayoutSelectorButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const hide = () => {
    setOpen(false);
  };

  return (
    <Popover
      placement="bottom"
      arrow
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={
        <div onClick={hide}>
          <LayoutSelector
            onSelection={props.setLayoutGrid}
            rows={3}
            columns={3}
          />
        </div>
      }
    >
      <Tooltip title="布局" trigger="hover" placement="right">
        <Button
          type="primary"
          icon={<AppstoreOutlined />}
          style={{ marginRight: '6px' }}
          onClick={(e) => e.preventDefault()}
        ></Button>
      </Tooltip>
    </Popover>
  );
}
