import Button from '@/components/Button';
import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import Textarea from '@/components/Textarea';

export interface ColumnsProps {
  title: ReactNode;
  renderNode: (row: any) => ReactNode;
  key: string | number;
  styles?: string;
  hiddenTitle?: boolean;
}

interface IItemsTableProps {
  rows: any[];
  columns: ColumnsProps[];
  additionalRow?: ReactNode;
  onOpenSuggestDrawer: () => void;
}

const ItemsTable: FC<IItemsTableProps> = ({
  rows = [],
  columns = [],
  additionalRow,
  onOpenSuggestDrawer,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleAddNote = (row: any) => {
    setSelectedRows((prev) => [...prev, row.id]);
  };

  const handleCancelNote = (row: any) => {
    setSelectedRows((prev) => [...prev].filter((it) => it !== row.id));
  };

  return (
    <div className="overflow-x-auto">
      <div className={clsx('relative min-w-[530px] rounded-xl border border-gray-100')}>
        <div className="header py-4 pl-6 pr-18 border-b border-gray-100 w-full bg-white flex items-center justify-between">
          {columns.map((column) => (
            <div
              key={column.key}
              className={clsx(
                'text-s md:text-base text-gray-600 font-normal text-start ',
                column?.styles || '',
                {
                  invisible: column?.hiddenTitle,
                },
              )}
            >
              {column.title}
            </div>
          ))}
        </div>
        {rows?.length && (
          <div className="body">
            {rows.map((row, index) => {
              return (
                <div
                  key={index}
                  className="p-6 pr-18 group hover:cursor-pointer hover:bg-gray border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center justify-between row">
                    {columns.map((column) => (
                      <div
                        key={column.key}
                        className={clsx(
                          'text-start text-gray-1000 text-s md:text-base font-normal',
                          column?.styles || '',
                        )}
                      >
                        {column.renderNode(row)}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-6 w-full">
                    {selectedRows.includes(row.id) ? (
                      <div className="flex flex-col w-full">
                        <div className="relative">
                          <Textarea
                            containerClassName="w-full"
                            className="border-[2px] border-primary-400 bg-primary-100"
                            placeholder="Type your response..."
                            rows={3}
                          />
                          <div className="flex items-center absolute bottom-3 right-3">
                            <Button
                              className="!p-0"
                              variant="inline"
                              onClick={() => handleCancelNote(row)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="!p-0 !text-primary-500 ml-3"
                              variant="inline"
                              onClick={() => handleCancelNote(row)}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                        {!row?.isSuggested && (
                          <Button
                            className="flex items-center px-0.5 mt-6 w-fit !py-0.5"
                            variant="inline"
                            onClick={onOpenSuggestDrawer}
                          >
                            <Image
                              src="/assets/icons/cube-primary-icon.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                            <span className="text-primary-500 text-base font-medium pl-2.5">
                              Suggest alternative products
                            </span>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <>
                        <Button
                          className="flex items-center px-0.5"
                          variant="inline"
                          onClick={() => handleAddNote(row)}
                        >
                          <Image
                            src="/assets/icons/plus-primary-icon.svg"
                            width={20}
                            height={20}
                            alt=""
                          />
                          <span className="text-primary-500 text-s md:text-base font-medium pl-2.5">
                            Add notes
                          </span>
                        </Button>
                        {!row?.isSuggested && (
                          <Button
                            className="flex items-center ml-6 px-0.5"
                            variant="inline"
                            onClick={onOpenSuggestDrawer}
                          >
                            <Image
                              src="/assets/icons/cube-primary-icon.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                            <span className="text-primary-500 text-s md:text-base font-medium pl-2.5">
                              Suggest alternative products
                            </span>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {additionalRow && <div className="w-full p-6 pr-18">{additionalRow}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsTable;
