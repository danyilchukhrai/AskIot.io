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

export interface IDashboardScore {
  total_conversations: number;
  avg_messages: number;
  positive_feedback: number;
  negative_feedback: number;
  no_feedback: number;
  positive_feedback_percentage: number;
  negative_feedback_percentage: number;
}

export interface IChatQueryBody {
  threadId: string;
  query: string;
}

export interface IThread {
  threadId: string;
  title: string;
  status: string;
  date: string;
  isInitialThread?: boolean;
  isLocalThread?: boolean;
  interactions?: IThreadInteraction[]
}

export interface IThreadInteraction {
  ai: string;
  id: number;
  user: string;
  keywords: string;
  aiLogo?: string;
}

export interface Persona {
  persona_id: number;
  name: string;
  description: string;
  is_common: boolean;
  selected: boolean; 

}