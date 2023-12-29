// import { CustomNextImage } from '@/components/CustomImage';
// import Table from '@/components/Table';
// import Button from '@/components/Button';
// import { RESTRICTED_APP_ROUTES } from '@/constants/routes';
// import { useRouter } from 'next/navigation';
// import { FC, useEffect, useState } from 'react';
// import LoadingIndicator from '@/components/LoadingIndicator';
// import { getAllTrainedData } from '@/modules/bots/services';

// interface IBotDashboardProps { }

// interface IBotDetail {
//     uniqueId: number;
//     accessToken: string;
//     botName: string;
//     uploadedTime: number;
//     trainedTime: number;
// }

// const BotDashboard: FC<IBotDashboardProps> = (props) => {
//     const router = useRouter();
//     const [list, setList] = useState<IBotDetail[]>([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const initialize = async () => {
//         setIsLoading(true);

//         const trainedData = await getAllTrainedData();
//         console.log('trainedData', trainedData);
//         setList(trainedData === null ? [] : trainedData);

//         setIsLoading(false);
//     }

//     const handleClickRow = (row: IBotDetail) => {
//         router.push(`${RESTRICTED_APP_ROUTES.BOT_DASHBOARD}/${row.uniqueId}`);
//     };

//     const columns = [
//         {
//             title: 'Id',
//             key: 'uniqueId',
//             renderNode: (row: IBotDetail) => row.uniqueId,
//         },
//         {
//             title: 'Name',
//             key: 'name',
//             renderNode: (row: IBotDetail) => row.botName,
//         }
//     ];

//     useEffect(() => {
//         initialize();
//     }, [])

//     if (isLoading) return <LoadingIndicator />;

//     return (
//         <section className="vendors-section p-4 md:p-8">
//             <div className="header flex items-center justify-between mb-5">
//                 <Button
//                     className="flex items-center"
//                     variant="info"
//                     onClick={() => router.push(`${RESTRICTED_APP_ROUTES.BOT}`)}
//                 >
//                     <img src="/assets/logo/logo-white.svg" width={20} height={20} alt="AskIoT" />
//                     <span className="ml-2.5">New Bot</span>
//                 </Button>
//             </div>
//             <Table rows={list} columns={columns} onClickRow={handleClickRow} />
//         </section>
//     );
// };

// export default BotDashboard;
