-- ============================================================
-- Esquema para las confirmaciones de asistencia (RSVP)
-- Ejecuta esto en: Supabase Dashboard > SQL Editor > New query
-- ============================================================

create table if not exists confirmaciones (
    id uuid primary key default gen_random_uuid(),
    nombre text not null,
    acompañante text not null,
    telefono integer not null,
    asistencia text not null check (asistencia in ('Sí asistiré', 'No asistiré')),
    fecha_registro timestamptz not null default now()
);

-- Evita confirmaciones duplicadas exactas del mismo nombre
create unique index if not exists idx_confirmaciones_nombre_unico
    on confirmaciones (lower(nombre));

-- Row Level Security: nadie puede LEER ni MODIFICAR desde el navegador,
-- solo puede INSERTAR (enviar el formulario). Tú ves todo desde el
-- dashboard de Supabase con tu propia cuenta (que se salta RLS).
alter table confirmaciones enable row level security;

create policy "Cualquiera puede confirmar asistencia"
    on confirmaciones
    for insert
    to anon
    with check (true);

-- (No se crea policy de SELECT/UPDATE/DELETE para "anon" a propósito:
--  así nadie puede leer ni alterar las respuestas de otros invitados
--  desde el navegador, aunque conozcan tu URL y llave pública).
