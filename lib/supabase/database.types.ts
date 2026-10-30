export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      admin_users: Table<
        { user_id: string; created_at: string },
        { user_id: string; created_at?: string }
      >;
      about_metrics: Table<
        {
          id: string;
          icon: string;
          value: string;
          label: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          icon: string;
          value: string;
          label: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        }
      >;
      business_settings: Table<
        {
          id: boolean;
          phone_primary: string;
          phone_secondary: string;
          whatsapp_phone: string;
          email: string;
          street_address: string;
          address_locality: string;
          postal_code: string;
          address_region: string;
          address_country: string;
          weekday_hours: string;
          saturday_hours: string;
          sunday_hours: string;
          updated_at: string;
        },
        {
          id?: boolean;
          phone_primary: string;
          phone_secondary: string;
          whatsapp_phone: string;
          email: string;
          street_address: string;
          address_locality: string;
          postal_code: string;
          address_region: string;
          address_country: string;
          weekday_hours: string;
          saturday_hours: string;
          sunday_hours: string;
          updated_at?: string;
        }
      >;
      faqs: Table<
        {
          id: string;
          question: string;
          answer: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          question: string;
          answer: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        }
      >;
      inquiries: Table<
        {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          subject: string;
          message: string;
          source: "contact" | "consultation";
          status: "new" | "contacted" | "closed";
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          subject: string;
          message: string;
          source: "contact" | "consultation";
          status?: "new" | "contacted" | "closed";
          created_at?: string;
          updated_at?: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
