export interface LogRecord {
  id: number;
  title: string;
  method: 'OPTION_TYPE' | 'BOOLEAN_TYPE' | 'NUMBER_TYPE' | 'TEXT_TYPE';
  is_public: boolean;
}

export interface RecordsResponse {
  records: LogRecord[];
}

export interface RecordDetail {
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
