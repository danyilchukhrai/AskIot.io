'use-client';
import { FC, ReactNode } from 'react';

interface IConfirmModal {
  children: ReactNode;
}

const ConfirmModal: FC<IConfirmModal> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] bg-[#000000bf]">
      <div className="fixed left-0 top-[25%] sm:top-[30%] sm:left-[50%] -translate-y-2/4 sm:-translate-x-2/4 z-[120] bg-white w-full sm:w-[500px] h-auto rounded-[10px] py-3 sm:py-5 px-3 sm:px-5">
        {children}
      </div>
    </div>
  );
};

export default ConfirmModal;
