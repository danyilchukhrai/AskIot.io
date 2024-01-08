import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';
import axios from 'axios';
import { getLocalStorageWithoutParsing } from '@/services/local-storage';

import { IFile } from './types';
const access_token = getLocalStorageWithoutParsing('accessToken');

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function replaceSpaceWithHyphen(inputString: string) {
    // Use the replace method with a regular expression to replace spaces with hyphens
    const resultString = inputString.replace(/ /g, '-');
    return resultString;
}

export const checkBotStatus = async () => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/private/chatbot/duplicate`
        );
        // ********** // 
        return res;
    } catch (_error) {
        return null;
    }
};

export const getBotData = async () => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/private/chatbot/get`
        );
        return res;
    } catch (_error) {
        return null;
    }
};

export const uploadFile = async (file: File, type: string) => {
    try {
        const { uri, sasToken } = await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/sas-token`, { "name": replaceSpaceWithHyphen(file.name), type }, "POST");
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
            const { uri, sasToken } = await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/sas-token`, { "name": replaceSpaceWithHyphen(file.name), type: 'vendor' }, "POST");
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
        console.log('processUploads files',files)
        await askIOTApiFetch(`${API_ENDPOINT}/private/training/process-uploads`, {
            files: files
        }, "POST");

        return true;
    } catch (_error) {
        return false;
    }
};

const uploadMultipleToAzureStorage = async (uri: string, sasToken: string, file: File) => {
    const apiUrl = `${uri}?${sasToken}`;

    // Make a PUT request using Axios
    try {
        const response = await axios.put(apiUrl, file, {
            headers: {
                'Content-Type': file.type, // Set the content type to the file's MIME type
                'x-ms-blob-type': 'BlockBlob', // Specify the blob type
            },
        });

        // If the response is successful, return the URI
        if (response.status === 201) {
            return uri;
        } else {
            throw new Error(`Failed to upload file. Status code: ${response.status}`);
        }
    } catch (error: any) {
        console.error(`Error uploading file "${file.name}":`, error.message);
        throw error; // Rethrow the error to handle it outside this function if needed
    }
}

export const createBot = async (botName: string) => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/private/chatbot/create`,
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
            `${API_ENDPOINT}/private/chatbot/update`,
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

export const getTrainedData = async () => {
    try {
        const trainedData = await askIOTApiFetch(`${API_ENDPOINT}/private/training/get`);

        return trainedData.data;
    } catch (_error) {
        return null;
    }
};

export const removeTrainedData = async (file_id: number) => {
    try {
        await axios.delete(`${API_ENDPOINT}/private/chatbot/delete-file/${file_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });
        return true;
    } catch (_error) {
        return null;
    }
};

export const getVendorId = async () => {
    try {
        await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/js`);
        const vendorId = await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/vendor-id`);
        return vendorId;
    } catch (_error) {
        return null;
    }
};
