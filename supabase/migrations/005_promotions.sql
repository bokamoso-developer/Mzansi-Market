create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  discount_type text not null,
  discount_value numeric(12,2) not null,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.promotion_products (
  promotion_id uuid references public.promotions(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  primary key (promotion_id, product_id)
);
