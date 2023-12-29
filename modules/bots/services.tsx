import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

export const getTrainedData = async (accessToken : string) => {
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

export const removeTrainedData = async (accessToken : string, uri: string) => {
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
