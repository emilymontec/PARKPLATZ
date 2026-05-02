import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan las variables de entorno de Supabase.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function recreateAdmin() {
  try {
    console.log("Conectando a la base de datos...");
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // 1. Verificar si el usuario 'admin' ya existe
    console.log("Verificando existencia del usuario 'admin'...");
    const { data: existingUser, error: findError } = await supabase
      .from("usuarios")
      .select("id_usuario")
      .eq("username", "admin")
      .maybeSingle();

    if (findError) throw findError;

    if (existingUser) {
      console.log("El usuario 'admin' ya existe. Actualizando datos y contraseña...");
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({
          password_hash: hashedPassword,
          email: "admin@parkplatz.com",
          nombres_apellidos: "Administrador Sistema",
          rol_id: 1,
          activo: true
        })
        .eq("username", "admin");

      if (updateError) throw updateError;
      console.log("¡Usuario 'admin' actualizado correctamente!");
    } else {
      console.log("El usuario 'admin' no existe. Creando uno nuevo...");
      const adminId = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from("usuarios")
        .insert([{
          id_usuario: adminId,
          username: "admin",
          password_hash: hashedPassword,
          email: "admin@parkplatz.com",
          nombres_apellidos: "Administrador Sistema",
          rol_id: 1,
          activo: true
        }]);

      if (insertError) throw insertError;
      console.log("¡Administrador creado con éxito!");
    }

    console.log("=====================================");
    console.log("Usuario: admin");
    console.log("Contraseña: admin123");
    console.log("=====================================");

  } catch (err) {
    console.error("Error durante la operación:", err);
  } finally {
    process.exit(0);
  }
}

recreateAdmin();
