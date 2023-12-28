import { FC, useEffect, useState } from 'react';

interface ITableProps {
    rows: IRow[];
}

interface IRow {
    name: string;
    size: number;
    type: string;
    uploadTime: number;
    trainedTime: number;
    result: boolean;
}

const Table: FC<ITableProps> = ({ rows }: ITableProps) => {
    console.log('rows', rows)

    return (
        <>
            {rows?.map((row, index) => {
                return <div className="flex w-full py-6 px-1 justify-between items-center border-t border-solid border-gray-100 bg-white gap-7">
                    <div className="flex flex-col items-start gap-1 min-w-[180px]">
                        <p className="text-14 text-gray-800 font-inter text-base font-semibold leading-5">
                            {row.name}
                        </p>
                        <p className="text-14 text-gray-500 font-inter text-base font-semibold leading-5">
                            {row.size}B
                        </p>
                    </div>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        {row.type}
                    </p>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Uploaded {row.uploadTime / 3600}days ago
                    </p>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Last trained {row.uploadTime / 3600}days ago
                    </p>
                    <div className="flex py-1 px-[10px] items-start rounded-full border border-solid border-green-200 bg-green-100">
                        <p className="text-13 text-green-600 font-inter text-xs font-normal leading-4">
                            Trained
                        </p>
                    </div>
                </div>

            })}
        </>
    );
};

export default Table;
