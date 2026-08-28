create table if not exists public.order_fulfilments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique not null references public.orders(id) on delete cascade,
  assigned_to uuid references auth.users(id),
  reserved_at timestamptz,
  picking_started_at timestamptz,
  picked_at timestamptz,
  packing_started_at timestamptz,
  packed_at timestamptz,
  dispatched_at timestamptz,
  delivered_at timestamptz
);

create table if not exists public.fulfilment_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  event_type text not null,
  performed_by uuid references auth.users(id),
  notes text,
  created_at timestamptz default now()
);
