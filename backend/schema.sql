
-- SCHEMA SQL para PARKPLATZ
-- Este script crea todas las tablas necesarias en Supabase

-- 1. Tabla roles
CREATE TABLE IF NOT EXISTS roles (
    id_roles INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Tabla tipos_vehiculo
CREATE TABLE IF NOT EXISTS tipos_vehiculo (
    id_vehiculo INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 3. Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nombres_apellidos VARCHAR(100) NOT NULL,
    rol_id INT NOT NULL REFERENCES roles(id_roles),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabla tarifas
CREATE TABLE IF NOT EXISTS tarifas (
    id_tarifa BIGSERIAL PRIMARY KEY,
    tipo_vehiculo_id INT NOT NULL REFERENCES tipos_vehiculo(id_vehiculo),
    nombre VARCHAR(100) NOT NULL,
    tipo_cobro VARCHAR(50) NOT NULL CHECK (tipo_cobro IN ('POR_MINUTO', 'POR_HORA', 'POR_DIA', 'FRACCION')),
    valor NUMERIC(10, 2) NOT NULL CHECK (valor &gt;= 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    fecha_inicio TIMESTAMPTZ NOT NULL,
    fecha_fin TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabla espacios
CREATE TABLE IF NOT EXISTS espacios (
    id_espacio BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    espacio_id INT NOT NULL, -- 1 = Auto/Sedán/Camioneta, 3 = Moto
    disponible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Tabla registros
CREATE TABLE IF NOT EXISTS registros (
    id_registro BIGSERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL,
    vehiculo_id INT NOT NULL REFERENCES tipos_vehiculo(id_vehiculo),
    espacio_id BIGINT REFERENCES espacios(id_espacio),
    entrada TIMESTAMPTZ NOT NULL,
    salida TIMESTAMPTZ,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('EN_CURSO', 'FINALIZADO')),
    usuario_entrada UUID NOT NULL REFERENCES usuarios(id_usuario),
    usuario_salida UUID REFERENCES usuarios(id_usuario),
    tarifa_id BIGINT REFERENCES tarifas(id_tarifa),
    total_minutos INT,
    valor_calculado NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========== INSERTS INICIALES ==========

-- Insertar roles
INSERT INTO roles (id_roles, nombre) VALUES
(1, 'ADMINISTRADOR'),
(2, 'OPERARIO')
ON CONFLICT (id_roles) DO NOTHING;

-- Insertar tipos de vehículo
INSERT INTO tipos_vehiculo (id_vehiculo, nombre) VALUES
(1, 'Sedán'),
(2, 'Camioneta'),
(3, 'Moto')
ON CONFLICT (id_vehiculo) DO NOTHING;

