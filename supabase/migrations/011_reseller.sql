create table if not exists public.reseller_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  reseller_code text unique not null,
  business_name text,
  status text default 'active',
  commission_rate numeric(5,2) default 0,
  created_at timestamptz default now()
);

create table if not exists public.reseller_customers (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid not null references auth.users(id),
  customer_name text not null,
  phone text,
  email text,
  created_at timestamptz default now()
);

create table if not exists public.reseller_orders (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid not null references auth.users(id),
  order_id uuid unique references public.orders(id),
  reseller_customer_id uuid references public.reseller_customers(id),
  created_at timestamptz default now()
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid not null references auth.users(id),
  order_id uuid not null references public.orders(id),
  amount numeric(12,2) not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  reseller_id uuid not null references auth.users(id),
  amount numeric(12,2) not null,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz default now()
);
