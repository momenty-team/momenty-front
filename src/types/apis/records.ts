type RecordMethod = 'OPTION_TYPE' | 'BOOLEAN_TYPE' | 'NUMBER_TYPE' | 'TEXT_TYPE';

export interface LogRecord {
  id: number;
  title: string;
  method: RecordMethod;
  is_public: boolean;
}

export interface RecordsResponse {
  records: LogRecord[];
}

export type RecordDetailResponse = RecordDetail;

export interface RecordDetail {
  record_id: number;
  record_title: string;
  record_method: RecordMethod;
  record_is_public: boolean;  
  id: number;
  content: string[];
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export interface RecordDetailsResponse extends LogRecord {
  records: RecordDetail[];
}

export interface RecordUnitResponse {
  unit?: string;
}

export interface Option {
  id: number;
  option: string;
}

export interface RecordOptionsResponse {
  options: Array<Option>;
}

