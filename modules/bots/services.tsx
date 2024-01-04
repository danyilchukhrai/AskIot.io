import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import axios from 'axios';
import { IFile } from './types';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const checkBotStatus = async () => {
    try {
        // const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/bot/get/id`, {}, 'POST');

        // Fake API
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/api/private/chatbot/duplicate`
        );
        // ********** // 
        return res;
    } catch (_error) {
        return null;
    }
};

export const getBotData = async () => {
    try {
        // const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/bot/get/id`, {}, 'POST');

        // Fake API
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/api/private/chatbot/get`
        );
        // ********** // 
        return res;
    } catch (_error) {
        return null;
    }
};

export const uploadFile = async (file: any) => {
    try {
        const { uri, sasToken } = await askIOTApiFetch(`${API_ENDPOINT}/api/private/chatbot/sas-token`, { "name": file.name}, "POST");
        const uploadedUri = await uploadMultipleToAzureStorage(
            uri, sasToken, file
        );

        return { name: file.name, url: uploadedUri };
    } catch (_error) {
        return [];
    }
};

export const uploadFiles = async (files: File[]) => {
    try {
        const response: any[] = [];
        for (const file of files) {
            const { uri, sasToken } = await askIOTApiFetch(`${API_ENDPOINT}/api/private/chatbot/sas-token`, { "name": file.name}, "POST");
            const uploadedUri = await uploadMultipleToAzureStorage(
                uri, sasToken, file
            );

            response.push({ name: file.name, url: uploadedUri });
        }
        // ********** // 
        return response;
    } catch (_error) {
        return [];
    }
};

export const processUploads = async (files: IFile[]) => {
    try {
        const response = await askIOTApiFetch(`${API_ENDPOINT}/api/private/training/process-uploads`, {
            files: files
        }, "POST");

        console.log('response', response)
        return true;
    } catch (_error) {
        return false;
    }
};


const uploadMultipleToAzureStorage = async (uri: string, sasToken: string, file: File) => {

    const apiUrl = `${uri}?${sasToken}`;

    // Create FormData object to send the File
    const formData = new FormData();
    formData.append('file', file);

    // Make a PUT request using Axios
    try {
        await axios.put(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for FormData
                'x-ms-blob-type': 'BlockBlob', // Specify the blob type
            },
        });

        return uri;
    } catch (error: any) {
        console.error(`Error uploading file "${file.name}":`, error.message);
    }
}


export const createBot = async (botName: string) => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/api/private/chatbot/create`,
            {
                name: botName
            },
            'POST',
        );
        // ********** // 
        return res;
    } catch (_error) {
        return null;
    }
};


export const updateBot = async (data: any) => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/api/private/chatbot/update`,
            {
                data: data
            },
            'POST',
        );
        // ********** // 
        return res;
    } catch (_error) {
        return null;
    }
};

export const trainBot = async (files: File[]) => {
    try {
        // const trainData = await askIOTApiFetch(`${API_ENDPOINT}/bot/train`, body);

        // Fake API
        const trainData: any[] = [];
        for (const file of files) {
            trainData.push({
                uri: URL.createObjectURL(file),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadTime: 21600,
                trainedTime: 21600,
                result: true
            });
        }
        await delay(2000);
        // *********** //
        return { data: trainData };
    } catch (_error) {
        return null;
    }
};

export const getAccessTokenFromId = async (id: number) => {
    try {
        // const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/bot/get/id`, {}, 'POST');

        // Fake API
        await delay(2000);

        switch (id) {
            case 1:
                return 'accessToken1';
            case 2:
                return 'accessToken2';
            case 3:
                return 'accessToken3';
        }
        // ********** // 
        return null;
    } catch (_error) {
        return null;
    }
};

export const getTrainedData = async (accessToken: string) => {
    try {
        // const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/bot/get/id`, {}, 'POST');

        // Fake API
        await delay(2000);

        const trainedData = [{
            uri: '/assets/dummy/train-1.txt',
            name: 'train-1.txt',
            size: 100,
            type: 'Raw Text',
            uploadTime: 5 * 3600,
            trainedTime: 5 * 3600,
            result: true
        }, {
            uri: '/assets/dummy/train-2.txt',
            name: 'train-2.txt',
            size: 100, type: 'Raw Text',
            uploadTime: 5 * 3600,
            trainedTime: 5 * 3600,
            result: true
        }, {
            uri: '/assets/dummy/train-3.txt',
            name: 'train-3.txt',
            size: 100, type: 'Raw Text',
            uploadTime: 5 * 3600,
            trainedTime: 5 * 3600,
            result: true
        }];
        // ********** // 
        return trainedData;
    } catch (_error) {
        return null;
    }
};

export const removeTrainedData = async (accessToken: string, uri: string) => {
    try {
        // const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/bot/get/id`, {}, 'POST');

        // Fake API
        await delay(500);
        // ********** // 
        return 'success';
    } catch (_error) {
        return null;
    }
};

export const getVendorId = async () => {
    try {
        await askIOTApiFetch(`${API_ENDPOINT}/api/private/chatbot/js`);
        const vendorId = await askIOTApiFetch(`${API_ENDPOINT}/api/private/chatbot/vendor-id`);
        return vendorId;
    } catch (_error) {
        return null;
    }
};
