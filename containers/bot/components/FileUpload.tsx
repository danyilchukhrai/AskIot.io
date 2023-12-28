import { FC, useEffect, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

interface IFileUploadProps {
    type: string[];
    files: File[];
    setFiles: any;
}

const FileUpload: FC<IFileUploadProps> = ({type, files, setFiles}: IFileUploadProps) => {
    const handleChange = (files: File[]) => {
      setFiles(files);
    };

    return (
        <>
            <FileUploader
                handleChange={handleChange}
                name="files"
                types={type}
                multiple
                children={<div
                    className="flex h-[80px] px-[12px] py-[10px] justify-center items-center 
                              marker:gap-[10px] align-self-stretch rounded-md border-dashed border-2 
                            border-gray-300 bg-white shadow-md md:w-[255px] w-full cursor-pointer hover:border-gray-600 group ">
                    <p className="text-14 first-line:text-gray-500 font-inter text-base font-normal leading-5 group-hover:first-line:text-gray-700">
                        Upload or drag files here
                    </p>
                </div>} />
            <div className="flex flex-col items-start gap-2 self-stretch mt-4">
                {files.length > 0 ? ([...files].map((file: File, idnex: number) => {
                    return <div className="flex justify-center items-center gap-[11px]">
                        <img src="/assets/images/solar_file-bold.png" className='w-[58px] h-[58px]' />
                        <div className="flex flex-col items-start gap-[5px] max-w-[190px]">
                            <p className="text-14 text-black font-inter text-base font-normal leading-5">
                                {file.name}
                            </p>
                            <p className="text-14 text-black text-opacity-50 font-inter text-base font-normal leading-5">
                            </p>
                        </div>
                    </div>
                })) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default FileUpload;
