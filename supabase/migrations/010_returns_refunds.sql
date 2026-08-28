create table if not exists public.return_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  customer_id uuid not null references auth.users(id),
  reason text not null,
  details text,
  status text not null default 'requested',
  requested_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  return_request_id uuid references public.return_requests(id),
  order_id uuid not null references public.orders(id),
  amount numeric(12,2) not null,
  status text not null default 'pending_approval',
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz default now()
);
