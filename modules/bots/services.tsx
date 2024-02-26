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

export const getBotData = async (token: string) => {
    try {
        const res = await askIOTApiFetch(
            `${API_ENDPOINT}/public/chatbot/get/${token}`
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
        console.log('processUploads files', files)
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

//added by Sunder
export const getTokenByVendorId = async (vendorId: string) => {
    try {
        // Call the API endpoint with the vendorId

        const response = await askIOTApiFetch(`${API_ENDPOINT}/public/chatbot/get-token/${vendorId}`);

        if (response && response.accessToken) {
            return response.accessToken;
        } else {
            throw new Error("Token not found for the given vendorId");
        }
    } catch (_error) {
        console.error("Error in getTokenByVendorId:", _error);
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

export const liveBot = async () => {
    try {
        const res = askIOTApiFetch(
            `${API_ENDPOINT}/private/chatbot/live`,
            {},
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
      const response = await axios.delete(`${API_ENDPOINT}/private/chatbot/delete-file/${file_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      
      return response.data.message;
    } catch (_error) {
      return "Sorry, an error occurred while trying to delete the file.";
    }
  };
  

export const getVendorId = async () => {
    try {
        await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/js`);
        const response = await axios.get(`${API_ENDPOINT}/private/chatbot/vendor-id`, {
            method: 'GET', // Explicitly stating that the method is GET

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,

              },  
        });
        return response.data;
    } catch (_error) {
        return null;
    }
};

export const fetchLinks = async (url: string, urlType: number) => { // 0 : Website 1 : SiteMap
    try {
        const fetchlinks = await askIOTApiFetch(`${API_ENDPOINT}/private/links/get-link?link=${url}&type=${urlType === 1 ? "sitemap" : "website"}`);

        let arr = [];
        let index = 0;
        for (const link of fetchlinks) {
            arr.push({
                no: index++,
                url: link
            })
        }
        return arr;
    } catch (_error) {
        return null;
    }
};

export const getLinks = async () => { // 0 : Website 1 : SiteMap
    try {
        const links = await askIOTApiFetch(`${API_ENDPOINT}/private/links/list-links`);
        let arr = [];
        for (const link of links) {
            arr.push({
                no: link.link_id,
                url: link.link,
                processed: link.processed, // Add the processed field
                created_at: link.created_at // You might also want to include the created_at field if needed
            });
        }
        return arr;
    } catch (_error) {
        return null;
    }
};

export const addLink = async (links: string[]) => {
    try {
        await askIOTApiFetch(`${API_ENDPOINT}/private/links/add-link`, links, "POST");

        return true;
    } catch (_error) {
        return null;
    }
};

export const removeLink = async (row: number) => {
    try {
        await askIOTApiFetch(`${API_ENDPOINT}/private/links/delete-link/${row}`, {}, "DELETE");
        return true;
    } catch (_error) {
        return null;
    }
};

export const getDashboardScore = async (vendorId: number) => {
    try {
        const response = await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/get-dashboard-stats/${vendorId}`);
        if (response) {
            const stats = {
                total_conversations: parseInt(response.total_conversations, 10),
                avg_messages: parseFloat(response.avg_messages),
                positive_feedback: parseInt(response.positive_feedback, 10),
                negative_feedback: parseInt(response.negative_feedback, 10),
                no_feedback: parseInt(response.no_feedback, 10),
                positive_feedback_percentage: parseFloat(response.positive_feedback_percentage),
                negative_feedback_percentage: parseFloat(response.negative_feedback_percentage),
            };

            Object.keys(stats).forEach((key) => {
                const statKey = key as keyof typeof stats;
                if (isNaN(stats[statKey])) {
                    stats[statKey] = 0;
                }
            });

            return stats;
        } else {
            throw new Error('No data received from the API');
        }
    } catch (_error) {
        console.error('Error in getDashboardScore:', _error);
        return null;
    }
};


export const getThreadDetails = async () => {
    try {
        return await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/threads/vendor`);
    } catch (e) {
        return null;
    }
}

export const getAIResponse = async (botToken: string, userPrompt: string, threadId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/public/chatbot/process-vendor-query`,
            {
                threadId: threadId,
                query: userPrompt,
                chatToken: botToken,
            }
        );

        return response.data.greeting;
    } catch (e) {
        return '';
    }
}

export const listPersonas = async (chatToken: string) => {
    try {
        const response = await askIOTApiFetch(`${API_ENDPOINT}/private/chatbot/personas/${chatToken}`);
        console.log("Data from backend:", response);

       

        return response; // data is the array of personas
    } catch (e) {
        console.error(e); // It's better to log the error for debugging purposes
        return [];
    }
};



export const addPersona = async (name: string, description: string, chatToken : string) => {
    try {
        const response = await askIOTApiFetch(
            `${API_ENDPOINT}/private/chatbot/personas`,
            { name, description, chatToken }
        );
        return response; // Assuming the response data is the added persona
    } catch (e) {
        console.error(e); // It's better to log the error for debugging purposes
        return null;
    }
};