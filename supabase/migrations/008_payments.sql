create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  provider text,
  provider_reference text,
  amount numeric(12,2) not null,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz default now()
);
