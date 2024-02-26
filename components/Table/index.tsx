import clsx from 'clsx';
import { FC, Fragment, ReactNode, useState } from 'react';
import Button from '../Button';

export interface ColumnsProps {
  title: ReactNode;
  renderNode: (row: any) => ReactNode;
  key: string | number;
  styles?: string;
  hiddenTitle?: boolean;
  hidden?: boolean;
}

interface ITableProps {
  rows: any[];
  columns: ColumnsProps[];
  additionalRow?: ReactNode;
  containerClassName?: string;
  pagination?: boolean;
  onClickRow?: (row: any) => void;
  numberOfPage?: number;
  noFoundMsg?: string;
}

const Table: FC<ITableProps> = ({
  rows = [],
  columns = [],
  additionalRow,
  containerClassName = '',
  pagination = false,
  onClickRow,
  numberOfPage = 5,
  noFoundMsg = 'No device found',
}) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.floor(rows?.length / numberOfPage) + 1;

  const onNextPagination = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  }

  const onPreviewPagination = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  }

  const getLastNumber = () => {
    if (page === totalPages - 1) {
      return rows?.length;
    } else {
      return (page + 1) * numberOfPage;
    }
  }

  return (
    <>
      <div
        className={clsx(
          'relative overflow-x-auto rounded-xl border border-gray-100',
          containerClassName,
        )}
      >
        <table className="w-full bg-white md:table-fixed">
          <thead>
            <tr className="hover:cursor-pointer">
              {columns
                ?.filter((it) => !it?.hidden)
                .map((column) => (
                  <th
                    key={column.key}
                    className={clsx(
                      'md:first:pl-6 md:last:pr-6 py-4 px-4 md:px-0 border-b border-gray-100 text-base text-gray-600 font-normal text-start ',
                      column?.styles || '',
                      {
                        invisible: column?.hiddenTitle,
                      },
                    )}
                    scope="col"
                  >
                    {column.title}
                  </th>
                ))}
            </tr>
          </thead>
          {rows?.length > 0 ? (
            <tbody>
              {rows.map((row, index) => {
                if(pagination && (index < page * numberOfPage || index >= (page + 1) * numberOfPage)) {
                  return null;
                };
                return (
                  <Fragment key={index}>
                    <tr
                      key={index}
                      className="group hover:cursor-pointer hover:bg-gray"
                      onClick={() => {
                        onClickRow && onClickRow(row);
                      }}
                    >
                      {columns
                        ?.filter((it) => !it?.hidden)
                        .map((column) => (
                          <td
                            key={column.key}
                            className={clsx(
                              'md:first:pl-6 md:last:pr-6 md:py-6 py-4 px-4 md:px-0 border-gray-100 text-start text-gray-1000 text-base font-normal',
                              column?.styles || '',
                              {
                                'border-b': !row?.isFullCol,
                              },
                            )}
                          >
                            {column.renderNode(row)}
                          </td>
                        ))}
                    </tr>
                    {row?.isFullCol && (
                      <tr>
                        <td
                          className="px-6 pb-4 border-b  border-gray-100"
                          colSpan={columns?.length || 9999}
                        >
                          {row?.fullColComponent}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {additionalRow && (
                <tr>
                  <td className="px-6 py-4" colSpan={columns?.length || 0}>
                    {additionalRow}
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <div className="px-2 py-4">
              <p className="text-gray-600">{ noFoundMsg }</p>
            </div>
          )}
        </table>
      </div>
      {(pagination && rows?.length > 0 ) && (
        <div className="pagination flex justify-between items-center md:pt-5 pt-2.5" >
          <p className="text-s md:text-base text-gray-700 px-3 py-2.5">
            Viewing {page * numberOfPage + 1}-{getLastNumber()} of {rows?.length} results
          </p>
          <div className="flex">
            {page !== 0 && <Button className="mr-3 text-xs md:text-base" variant="secondary" onClick={onPreviewPagination}>
              Prev
            </Button>}
            {page + 1 < totalPages && <Button className="text-xs md:text-base" variant="secondary" onClick={onNextPagination}>
              Next
            </Button>}
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
