export interface ITrainData {
    blob_url: string;
    original_file_name: string;
    upload_timestamp: string;
    updated_date: string;
    processed: boolean;
    file_id: number;
  }
  
export interface IFile {
  name: string;
  url: string;
}