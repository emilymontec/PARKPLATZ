import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "path";

// Cargar variables de entorno
// dotenv.config() busca el archivo .env en el directorio raíz del proceso
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

// Validación robusta antes de intentar crear el cliente
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("tu-proyecto") || supabaseKey.includes("tu-")) {
    console.error("\n" + "=".repeat(60));
    console.error("❌ ERROR DE CONFIGURACIÓN: Supabase no está configurado correctamente.");
    console.error("Asegúrate de que el archivo 'backend/.env' existe y tiene las credenciales correctas.");
    console.error("SUPABASE_URL actual:", supabaseUrl || "MISSING");
    console.error("SUPABASE_KEY actual:", supabaseKey ? "PRESENT (check if it's correct)" : "MISSING");
    console.error("=".repeat(60) + "\n");
    
    // Si faltan las variables críticas, lanzamos un error descriptivo para evitar que el proceso continúe a ciegas
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Faltan variables de entorno esenciales: SUPABASE_URL y SUPABASE_KEY.");
    }
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
  }
);

