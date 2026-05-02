import{c as y,n as f,g as d,s as n,a as u}from"./index-D4X_T6ys.js";const h=async()=>{var o,e,a,r,s;await w(),await m(),(o=document.getElementById("logoutBtn"))==null||o.addEventListener("click",()=>{y(),f("/")}),(e=document.getElementById("btnCreateUser"))==null||e.addEventListener("click",()=>{g()}),(a=document.getElementById("btnCancelModal"))==null||a.addEventListener("click",c),(r=document.getElementById("btnCancelBottom"))==null||r.addEventListener("click",c),(s=document.getElementById("userForm"))==null||s.addEventListener("submit",I),window.onclick=i=>{const l=document.getElementById("userModal");i.target===l&&c()};const t=JSON.parse(localStorage.getItem("user")||"{}");if(t.username){const i=document.getElementById("userName");i&&(i.textContent=t.nombres_apellidos||t.username)}},w=async()=>{try{const t=await fetch("/api/admin/roles",{headers:d()});if(!t.ok)throw new Error(`Error HTTP: ${t.status}`);const o=await t.json(),e=document.getElementById("rol_id");e&&(e.innerHTML=o.map(a=>`<option value="${a.id_roles}">${a.nombre}</option>`).join(""))}catch(t){console.error("Error en loadRoles:",t)}},m=async()=>{try{const t=await fetch("/api/admin/usuarios",{headers:d()});if(!t.ok)throw new Error(`Error HTTP: ${t.status}`);const o=await t.json();v(o)}catch(t){console.error("Error en loadUsers:",t);const o=document.getElementById("usersTableBody");o&&(o.innerHTML=`
                <tr><td colspan="6" style="text-align: center; color: red;">
                    Error al cargar usuarios: ${t.message}
                </td></tr>
            `)}},v=t=>{const o=document.getElementById("usersTableBody");if(o){if(t.length===0){o.innerHTML='<tr><td colspan="6" style="text-align: center;">No hay usuarios registrados</td></tr>';return}o.innerHTML=t.map(e=>`
        <tr>
            <td>
                <div class="user-cell-info">
                    <div class="user-avatar-sm">
                        ${E(e.nombres_apellidos||e.username)}
                    </div>
                    <div>
                        <div style="font-weight: 500;">${e.nombres_apellidos}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">@${e.username}</div>
                    </div>
                </div>
            </td>
            <td>${e.email}</td>
            <td>
                <span class="badge" 
                      style="padding: 4px 8px; border-radius: 4px; font-size: 12px; 
                      background: ${e.rol==="ADMINISTRADOR"?"#e3f2fd":"#f5f5f5"}; 
                      color: ${e.rol==="ADMINISTRADOR"?"#1976d2":"#616161"};">
                    ${e.rol}
                </span>
            </td>
            <td>
                <span style="color: ${e.activo?"var(--success)":"var(--danger)"}; font-weight: 500;">
                    ${e.activo?"Activo":"Inactivo"}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="btn-action" onclick="window.editUser('${e.id_usuario}')" title="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-action ${e.activo?"btn-toggle-off":"btn-toggle-on"}" 
                            onclick="window.toggleUser('${e.id_usuario}', ${e.activo})" 
                            title="${e.activo?"Desactivar":"Activar"}">
                        <i class="fa-solid ${e.activo?"fa-user-slash":"fa-user-check"}"></i>
                    </button>
                    <button class="btn-action" onclick="window.resetPassword('${e.id_usuario}')" title="Restablecer Contraseña">
                        <i class="fa-solid fa-key"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join(""),window.editUser=e=>{const a=t.find(r=>r.id_usuario==e);a&&g(a)},window.resetPassword=async e=>{if(await u({title:"Restablecer Contraseña",message:`¿Estás seguro de restablecer la contraseña de este usuario?
Se asignará la contraseña predeterminada.`,type:"warning"}))try{const r=await fetch(`/api/admin/usuarios/${e}/reset-password`,{method:"PATCH",headers:{...d(),"Content-Type":"application/json"}}),s=await r.json();r.ok?await n({title:"Éxito",message:"Contraseña restablecida correctamente.",type:"success"}):await n({title:"Error",message:s.error||"Error al restablecer contraseña",type:"error"})}catch(r){console.error(r),await n({title:"Error",message:"No se pudo conectar con el servidor",type:"error"})}},window.toggleUser=async(e,a)=>{if(await u({title:a?"Desactivar Usuario":"Activar Usuario",message:`¿Estás seguro de que deseas ${a?"desactivar":"activar"} este usuario?`,type:a?"danger":"success"}))try{(await fetch(`/api/admin/usuarios/${e}/toggle`,{method:"PATCH",headers:{...d(),"Content-Type":"application/json"},body:JSON.stringify({userId:e,activo:!a})})).ok?m():await n({title:"Error",message:"Error al cambiar estado",type:"error"})}catch(s){console.error(s),await n({title:"Error de Conexión",message:"No se pudo conectar con el servidor",type:"error"})}}}},g=(t=null)=>{const o=document.getElementById("userModal"),e=document.getElementById("userForm"),a=document.getElementById("modalTitle"),r=document.getElementById("passwordHelp");o.classList.add("active"),e.reset(),t?(a.textContent="Editar Usuario",document.getElementById("userId").value=t.id_usuario,document.getElementById("nombres_apellidos").value=t.nombres_apellidos,document.getElementById("username").value=t.username,document.getElementById("email").value=t.email,document.getElementById("rol_id").value=t.rol_id,document.getElementById("password").required=!1,r.textContent="Dejar en blanco para mantener la actual."):(a.textContent="Crear Usuario",document.getElementById("userId").value="",document.getElementById("password").required=!0,r.textContent="Requerida para crear.")},E=t=>t?t.split(" ").filter(o=>o.length>0).map(o=>o[0]).join("").toUpperCase().substring(0,2):"??",c=()=>{document.getElementById("userModal").classList.remove("active")},I=async t=>{t.preventDefault();const o=document.getElementById("userId").value,e=!!o,a=document.getElementById("rol_id").value;if(!a){await n({title:"Campo Requerido",message:"Por favor seleccione un rol",type:"warning"});return}const r={nombres_apellidos:document.getElementById("nombres_apellidos").value,username:document.getElementById("username").value,email:document.getElementById("email").value,rol_id:parseInt(a),password:document.getElementById("password").value};r.password||delete r.password;try{const s=e?`/api/admin/usuarios/${o}`:"/api/admin/usuarios",l=await fetch(s,{method:e?"PUT":"POST",headers:{...d(),"Content-Type":"application/json"},body:JSON.stringify(r)}),p=await l.json();if(!l.ok)throw new Error(p.error||"Error al guardar usuario");c(),m(),await n({title:"Éxito",message:e?"Usuario actualizado correctamente":"Usuario creado exitosamente",type:"success"})}catch(s){console.error(s),await n({title:"Error",message:s.message,type:"error"})}};export{h as initUsers};
