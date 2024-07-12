import { DataTable } from '@metrostar/comet-extras';
import { Button, ButtonGroup, Select } from '@metrostar/comet-uswds';
import { Spacecraft } from '@src/types/spacecraft';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TableData } from '../types';

interface DashboardTableProps {
  items: Spacecraft[] | undefined;
}

export const DashboardTable = ({
  items,
}: DashboardTableProps): React.ReactElement => {
  const [data, setData] = useState<TableData[]>();
  const [pageSize, setPageSize] = useState(5);
  const cols = React.useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'affiliation',
        header: 'Affiliation',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'dimensions',
        header: 'Dimensions',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'appearances',
        header: 'Appearances',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  useEffect(() => {
    if (items) {
      const newData: TableData[] = [];
      items.forEach((item: Spacecraft) => {
        newData.push({
          name: (
            <NavLink id={`details-link-${item.id}`} to={`/details/${item.id}`}>
              {item.name}
            </NavLink>
          ),
          affiliation: item.affiliation,
          dimensions: item.dimensions,
          appearances: item.appearances,
        });
      });
      setData(newData);
    }
  }, [items]);

  useEffect(() => {
    console.log('Page size: ', pageSize);
    if (items) {
      const newData = [...items];
      setData([...newData]);
    }
  }, [items, pageSize]);

  const handleAdd = () => {
    if (data) {
      const newData = [...data];
      newData?.push({
        name: 'New Row',
        affiliation: 'New Row',
        dimensions: 'New Row',
        appearances: 0,
      });
      console.log(newData);
      setData([...newData]);
    }
  };

  const handleDelete = () => {
    if (data) {
      const newData = [...data];
      newData?.pop();
      console.log(newData);
      setData([...newData]);
    }
  };

  return data ? (
    <>
      <ButtonGroup>
        <Button id="add-btn" onClick={handleAdd}>
          Add Row
        </Button>
        <Button id="delete-btn" onClick={handleDelete}>
          Delete Row
        </Button>
      </ButtonGroup>
      <Select
        id="select-1"
        name="select-1"
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        options={[
          {
            label: '5',
            value: '5',
          },
          {
            label: '10',
            value: '10',
          },
        ]}
      ></Select>
      <DataTable
        id="launch-table"
        className="width-full"
        columns={cols}
        data={data}
        sortable
        sortCol="appearances"
        sortDir="desc"
        pageable
        pageSize={pageSize}
      ></DataTable>
    </>
  ) : (
    <></>
  );
};
