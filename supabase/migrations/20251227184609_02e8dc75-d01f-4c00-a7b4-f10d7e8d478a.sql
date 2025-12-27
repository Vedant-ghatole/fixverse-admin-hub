-- Add additional roles to app_role enum (safe if already present)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'buyer') THEN
    ALTER TYPE public.app_role ADD VALUE 'buyer';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'seller') THEN
    ALTER TYPE public.app_role ADD VALUE 'seller';
  END IF;
END$$;

-- Allow admins to read all profiles (needed for admin user management)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can view all profiles') THEN
    CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END$$;

-- Allow admins to read all roles (needed for admin user management)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Admins can view all roles') THEN
    CREATE POLICY "Admins can view all roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END$$;

-- Enums for admin-managed entities
CREATE TYPE public.product_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.order_payment_status AS ENUM ('paid', 'refunded', 'pending');
CREATE TYPE public.order_status AS ENUM ('new', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE public.txn_type AS ENUM ('order', 'payout', 'refund');
CREATE TYPE public.txn_status AS ENUM ('settled', 'processed', 'pending');
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved');
CREATE TYPE public.ticket_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.ticket_user_type AS ENUM ('Buyer', 'Seller');
CREATE TYPE public.approval_type AS ENUM ('Seller', 'Product');

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_code text NOT NULL UNIQUE,
  name text NOT NULL,
  seller text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  status public.product_status NOT NULL DEFAULT 'pending',
  icon text NOT NULL DEFAULT '📦',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read products" ON public.products FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Orders
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  buyer text NOT NULL,
  seller text NOT NULL,
  total numeric NOT NULL DEFAULT 0,
  payment public.order_payment_status NOT NULL DEFAULT 'pending',
  status public.order_status NOT NULL DEFAULT 'new',
  placed_on date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read orders" ON public.orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete orders" ON public.orders FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Commission settings
CREATE TABLE public.commission_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL UNIQUE,
  commission numeric NOT NULL DEFAULT 0,
  last_updated date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.commission_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read commission settings" ON public.commission_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert commission settings" ON public.commission_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update commission settings" ON public.commission_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete commission settings" ON public.commission_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_commission_settings_updated_at BEFORE UPDATE ON public.commission_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Transactions
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  txn_id text NOT NULL UNIQUE,
  type public.txn_type NOT NULL,
  order_id text NOT NULL,
  seller text NOT NULL,
  amount numeric NOT NULL,
  status public.txn_status NOT NULL,
  txn_date date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read transactions" ON public.transactions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert transactions" ON public.transactions FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update transactions" ON public.transactions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete transactions" ON public.transactions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Payout requests
CREATE TABLE public.payout_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id text NOT NULL UNIQUE,
  seller text NOT NULL,
  requested_amount numeric NOT NULL,
  available_balance numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read payout requests" ON public.payout_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert payout requests" ON public.payout_requests FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update payout requests" ON public.payout_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete payout requests" ON public.payout_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_payout_requests_updated_at BEFORE UPDATE ON public.payout_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Support tickets
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text NOT NULL UNIQUE,
  subject text NOT NULL,
  ticket_user text NOT NULL,
  user_type public.ticket_user_type NOT NULL,
  category text NOT NULL,
  status public.ticket_status NOT NULL DEFAULT 'open',
  priority public.ticket_priority NOT NULL DEFAULT 'low',
  created_on date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read support tickets" ON public.support_tickets FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert support tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update support tickets" ON public.support_tickets FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete support tickets" ON public.support_tickets FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- FAQs
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read faqs" ON public.faqs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update faqs" ON public.faqs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete faqs" ON public.faqs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pending approvals + recent activities (dashboard)
CREATE TABLE public.pending_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.approval_type NOT NULL,
  name text NOT NULL,
  requested_on date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pending_approvals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read pending approvals" ON public.pending_approvals FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert pending approvals" ON public.pending_approvals FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pending approvals" ON public.pending_approvals FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pending approvals" ON public.pending_approvals FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_pending_approvals_updated_at BEFORE UPDATE ON public.pending_approvals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.recent_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  activity_user text NOT NULL,
  date_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.recent_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read recent activities" ON public.recent_activities FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert recent activities" ON public.recent_activities FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete recent activities" ON public.recent_activities FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Reports tables (seeded analytics data)
CREATE TABLE public.report_sales_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date_label text NOT NULL,
  sales int NOT NULL,
  orders int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.report_sales_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read report sales daily" ON public.report_sales_daily FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert report sales daily" ON public.report_sales_daily FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.report_detailed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date_label text NOT NULL,
  orders int NOT NULL,
  sales int NOT NULL,
  commission int NOT NULL,
  refunds int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.report_detailed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read report detailed" ON public.report_detailed FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert report detailed" ON public.report_detailed FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.report_category (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  sales int NOT NULL,
  orders int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.report_category ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read report category" ON public.report_category FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert report category" ON public.report_category FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));