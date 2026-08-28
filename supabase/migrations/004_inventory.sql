create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid unique not null references public.products(id) on delete cascade,
  quantity_on_hand integer not null default 0,
  quantity_reserved integer not null default 0,
  reorder_level integer not null default 0,
  updated_at timestamptz default now()
);

create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  movement_type text not null,
  quantity integer not null,
  reference_type text,
  reference_id uuid,
  performed_by uuid references auth.users(id),
  notes text,
  created_at timestamptz default now()
);
