import { FC, useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';

interface ITableProps {
    rows: IRow[];
}

interface IRow {
    original_file_name: string;
    upload_timestamp: string;
    updated_date: string;
    processed: boolean;
}

const Table: FC<ITableProps> = ({ rows }: ITableProps) => {
    if (rows?.length === 0) {
        return <>
            <Spinner />
        </>
    }

    return (
        <>
            {rows?.map((row, index) => {
                return <div key={index} className="flex w-full py-6 px-1 justify-between items-center border-t border-solid border-gray-100 bg-white gap-7">
                    <div className="flex flex-col items-start gap-1 w-[600px]">
                        {row.original_file_name}
                    </div>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Uploaded {row.upload_timestamp}
                    </p>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Last trained {row.updated_date}
                    </p>
                    <div className="flex py-1 px-[10px] items-start rounded-full border border-solid border-green-200 bg-green-100">
                        <p className="text-13 text-green-600 font-inter text-xs font-normal leading-4">
                            {row.processed === true ? "Trained" : "Progress"}
                        </p>
                    </div>
                </div>
            })}
        </>
    );
};

export default Table;