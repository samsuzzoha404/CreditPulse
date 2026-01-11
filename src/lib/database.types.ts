import type { LMACDMData } from '../types/cdm';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      analysis_results: {
        Row: {
          id: string;
          company_name: string;
          upload_url: string;
          cdm_json: LMACDMData;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          upload_url: string;
          cdm_json: LMACDMData;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          upload_url?: string;
          cdm_json?: LMACDMData;
          created_at?: string;
          updated_at?: string;
        };
      };
      waiver_requests: {
        Row: {
          id: string;
          analysis_id: string | null;
          company_name: string;
          breach_details: Json;
          generated_letter: string;
          status: 'draft' | 'sent' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          analysis_id?: string | null;
          company_name: string;
          breach_details: Json;
          generated_letter: string;
          status?: 'draft' | 'sent' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          analysis_id?: string | null;
          company_name?: string;
          breach_details?: Json;
          generated_letter?: string;
          status?: 'draft' | 'sent' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
