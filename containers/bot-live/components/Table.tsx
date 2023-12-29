import { FC, useEffect, useState } from 'react';
import { ITrainData } from '@/modules/bots/types';

interface ITableProps {
    rows: ITrainData[];
    removeFile: (data: ITrainData) => void;
}

const Table: FC<ITableProps> = ({ rows, removeFile }: ITableProps) => {

    const downloadFile = (uri: string, fileName: string) => {
        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute and the file name
        link.download = fileName;

        // Set the href attribute to the image URL
        link.href = uri;

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }

    return (
        <>
            {rows?.map((row, index) => {
                return <div key={index} className="flex w-full py-6 px-1 justify-between items-center border-t border-solid border-gray-100 bg-white gap-7">
                    <div className="flex flex-col items-start gap-1 min-w-[380px]">
                        <p className="text-14 text-gray-800 font-inter text-base font-semibold leading-5">
                            {row.name}
                        </p>
                        <p className="text-14 text-gray-500 font-inter text-base font-semibold leading-5">
                            {row.size}B
                        </p>
                    </div>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5 min-w-[120px]">
                        {row.type}
                    </p>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Uploaded {row.uploadTime / 3600} days ago
                    </p>
                    <p className="text-14 text-212529 text-right font-inter text-base font-normal leading-5">
                        Last trained {row.uploadTime / 3600} days ago
                    </p>
                    <div className="flex py-1 px-[10px] items-start rounded-full border border-solid border-green-200 bg-green-100">
                        <p className="text-13 text-green-600 font-inter text-xs font-normal leading-4">
                            Trained
                        </p>
                    </div>
                    <div className='flex justify-between w-[60px]'>
                        <img src="/assets/icons/eye-icon.svg" className='cursor-pointer' onClick={() => downloadFile(row.uri, row.name)} />
                        <img src="/assets/icons/x-mark-icon.svg" className='cursor-pointer' onClick={() => removeFile(row)} />
                    </div>
                </div>

            })}
        </>
    );
};

export default Table;
