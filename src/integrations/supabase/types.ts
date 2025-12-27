export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      commission_settings: {
        Row: {
          category: string
          commission: number
          created_at: string
          id: string
          last_updated: string
          updated_at: string
        }
        Insert: {
          category: string
          commission?: number
          created_at?: string
          id?: string
          last_updated?: string
          updated_at?: string
        }
        Update: {
          category?: string
          commission?: number
          created_at?: string
          id?: string
          last_updated?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer: string
          created_at: string
          id: string
          order_number: string
          payment: Database["public"]["Enums"]["order_payment_status"]
          placed_on: string
          seller: string
          status: Database["public"]["Enums"]["order_status"]
          total: number
          updated_at: string
        }
        Insert: {
          buyer: string
          created_at?: string
          id?: string
          order_number: string
          payment?: Database["public"]["Enums"]["order_payment_status"]
          placed_on?: string
          seller: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updated_at?: string
        }
        Update: {
          buyer?: string
          created_at?: string
          id?: string
          order_number?: string
          payment?: Database["public"]["Enums"]["order_payment_status"]
          placed_on?: string
          seller?: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      payout_requests: {
        Row: {
          available_balance: number
          created_at: string
          id: string
          request_id: string
          requested_amount: number
          seller: string
          updated_at: string
        }
        Insert: {
          available_balance: number
          created_at?: string
          id?: string
          request_id: string
          requested_amount: number
          seller: string
          updated_at?: string
        }
        Update: {
          available_balance?: number
          created_at?: string
          id?: string
          request_id?: string
          requested_amount?: number
          seller?: string
          updated_at?: string
        }
        Relationships: []
      }
      pending_approvals: {
        Row: {
          created_at: string
          id: string
          name: string
          requested_on: string
          type: Database["public"]["Enums"]["approval_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          requested_on?: string
          type: Database["public"]["Enums"]["approval_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          requested_on?: string
          type?: Database["public"]["Enums"]["approval_type"]
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          icon: string
          id: string
          name: string
          price: number
          product_code: string
          seller: string
          status: Database["public"]["Enums"]["product_status"]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          icon?: string
          id?: string
          name: string
          price?: number
          product_code: string
          seller: string
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          price?: number
          product_code?: string
          seller?: string
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      recent_activities: {
        Row: {
          activity: string
          activity_user: string
          created_at: string
          date_text: string
          id: string
        }
        Insert: {
          activity: string
          activity_user: string
          created_at?: string
          date_text: string
          id?: string
        }
        Update: {
          activity?: string
          activity_user?: string
          created_at?: string
          date_text?: string
          id?: string
        }
        Relationships: []
      }
      report_category: {
        Row: {
          category: string
          created_at: string
          id: string
          orders: number
          sales: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          orders: number
          sales: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          orders?: number
          sales?: number
        }
        Relationships: []
      }
      report_detailed: {
        Row: {
          commission: number
          created_at: string
          date_label: string
          id: string
          orders: number
          refunds: number
          sales: number
        }
        Insert: {
          commission: number
          created_at?: string
          date_label: string
          id?: string
          orders: number
          refunds: number
          sales: number
        }
        Update: {
          commission?: number
          created_at?: string
          date_label?: string
          id?: string
          orders?: number
          refunds?: number
          sales?: number
        }
        Relationships: []
      }
      report_sales_daily: {
        Row: {
          created_at: string
          date_label: string
          id: string
          orders: number
          sales: number
        }
        Insert: {
          created_at?: string
          date_label: string
          id?: string
          orders: number
          sales: number
        }
        Update: {
          created_at?: string
          date_label?: string
          id?: string
          orders?: number
          sales?: number
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string
          created_on: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_id: string
          ticket_user: string
          updated_at: string
          user_type: Database["public"]["Enums"]["ticket_user_type"]
        }
        Insert: {
          category: string
          created_at?: string
          created_on?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_id: string
          ticket_user: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["ticket_user_type"]
        }
        Update: {
          category?: string
          created_at?: string
          created_on?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          ticket_id?: string
          ticket_user?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["ticket_user_type"]
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          order_id: string
          seller: string
          status: Database["public"]["Enums"]["txn_status"]
          txn_date: string
          txn_id: string
          type: Database["public"]["Enums"]["txn_type"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          order_id: string
          seller: string
          status: Database["public"]["Enums"]["txn_status"]
          txn_date?: string
          txn_id: string
          type: Database["public"]["Enums"]["txn_type"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          order_id?: string
          seller?: string
          status?: Database["public"]["Enums"]["txn_status"]
          txn_date?: string
          txn_id?: string
          type?: Database["public"]["Enums"]["txn_type"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "buyer" | "seller"
      approval_type: "Seller" | "Product"
      order_payment_status: "paid" | "refunded" | "pending"
      order_status: "new" | "shipped" | "delivered" | "cancelled" | "refunded"
      product_status: "pending" | "approved" | "rejected"
      ticket_priority: "low" | "medium" | "high"
      ticket_status: "open" | "in_progress" | "resolved"
      ticket_user_type: "Buyer" | "Seller"
      txn_status: "settled" | "processed" | "pending"
      txn_type: "order" | "payout" | "refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "buyer", "seller"],
      approval_type: ["Seller", "Product"],
      order_payment_status: ["paid", "refunded", "pending"],
      order_status: ["new", "shipped", "delivered", "cancelled", "refunded"],
      product_status: ["pending", "approved", "rejected"],
      ticket_priority: ["low", "medium", "high"],
      ticket_status: ["open", "in_progress", "resolved"],
      ticket_user_type: ["Buyer", "Seller"],
      txn_status: ["settled", "processed", "pending"],
      txn_type: ["order", "payout", "refund"],
    },
  },
} as const
