import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  try {
    const { data: roles } = await supabase.from("roles").select("*");
    console.log("Roles:", roles);

    const { data: users } = await supabase.from("usuarios").select("id_usuario, username, email, rol_id, roles(nombre)").eq("username", "admin");
    console.log("Admin User:", users);

  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

checkDb();
