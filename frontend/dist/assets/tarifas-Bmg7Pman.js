import{g as d,c as h,n as E,s as f,a as b}from"./index-D4X_T6ys.js";let u=[],y=[],s=null;function C(){w(),T(),g(),x()}function w(){const t=JSON.parse(localStorage.getItem("user")||"{}");if(t.username){const o=document.getElementById("userName");o&&(o.textContent=t.nombres_apellidos||t.username)}const e=document.getElementById("logoutBtn");e&&e.addEventListener("click",async()=>{try{await fetch("/api/auth/logout",{method:"POST",headers:d()})}catch(o){console.error("Logout error",o)}finally{h(),E("/login")}})}async function T(){const t=document.getElementById("tipoVehiculo");try{const e=await fetch("/api/admin/tipos-vehiculo",{method:"GET",headers:d()});if(!e.ok)throw new Error("Error al cargar tipos de vehículo");y=await e.json(),t.innerHTML='<option value="">Seleccione...</option>',y.forEach(o=>{const i=document.createElement("option");i.value=o.id_vehiculo,i.textContent=o.nombre,t.appendChild(i)})}catch(e){console.error("Error loading vehicle types:",e),t.innerHTML='<option value="">Error cargando datos</option>'}}async function g(){const t=document.getElementById("tarifasTableBody");try{const e=await fetch("/api/admin/tarifas",{method:"GET",headers:d()});if(e.status===401){h(),E("/login");return}if(!e.ok)throw new Error("Error al cargar tarifas");u=await e.json(),I()}catch(e){console.error(e),t.innerHTML=`
            <tr>
                <td colspan="7" style="text-align: center; color: var(--danger); padding: 40px;">
                    Error cargando datos: ${e.message}
                </td>
            </tr>
        `}}function I(){const t=document.getElementById("tarifasTableBody");if(t){if(u.length===0){t.innerHTML=`
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">
                    No hay tarifas registradas.
                </td>
            </tr>
        `;return}t.innerHTML=u.map(e=>{var v,p;const o=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(e.valor),i={POR_MINUTO:"Minuto",POR_HORA:"Hora",POR_DIA:"Día",FRACCION:"Fracción (15m)"},n=new Date(e.fecha_inicio).toLocaleDateString("es-CO"),a=e.fecha_fin?new Date(e.fecha_fin).toLocaleDateString("es-CO"):"Indefinida",r=(((v=e.tipos_vehiculo)==null?void 0:v.nombre)||"").toLowerCase();let c="fa-car-side",l="#EFF6FF",m="#2563EB";return r.includes("moto")&&(c="fa-motorcycle",l="#FFF7ED",m="#EA580C"),`
            <tr>
                <td>
                    <div class="user-cell-info">
                        <div class="user-avatar-sm" style="background: ${l}; color: ${m}; font-size: 1rem;">
                            <i class="fa-solid ${c}"></i>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: var(--text-main);">${e.nombre}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 500;">
                                ${((p=e.tipos_vehiculo)==null?void 0:p.nombre)||"General"}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge" style="background: #F8FAFC; border: 1px solid var(--border); color: var(--text-main); font-weight: 500;">
                        ${i[e.tipo_cobro]||e.tipo_cobro}
                    </span>
                </td>
                <td>
                    <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${o}</div>
                </td>
                <td>
                    <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 4px;">
                        <span style="display: flex; align-items: center; gap: 6px; color: var(--text-main);">
                            <i class="fa-regular fa-calendar-check" style="color: var(--success);"></i> ${n}
                        </span>
                        <span style="display: flex; align-items: center; gap: 6px; color: var(--text-muted);">
                            <i class="fa-regular fa-calendar-xmark" style="color: var(--text-light);"></i> ${a}
                        </span>
                    </div>
                </td>
                <td>
                    <span style="color: ${e.activo?"var(--success)":"var(--danger)"}; font-weight: 600; font-size: 0.875rem;">
                        ${e.activo?"Activa":"Inactiva"}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                        <button class="btn-action" onclick="window.editTarifa(${e.id_tarifa})" title="Editar">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-action ${e.activo?"btn-toggle-off":"btn-toggle-on"}" 
                                onclick="window.toggleTarifa(${e.id_tarifa}, ${!e.activo})" 
                                title="${e.activo?"Desactivar":"Activar"}">
                            <i class="fa-solid ${e.activo?"fa-ban":"fa-check"}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `}).join("")}}function x(){const t=document.getElementById("tarifaModal"),e=document.getElementById("btnCreateTarifa"),o=document.getElementById("modalClose"),i=document.getElementById("tarifaForm");e&&e.addEventListener("click",()=>{s=null,document.getElementById("modalTitle").textContent="Nueva Tarifa",i.reset(),document.getElementById("fechaInicio").valueAsDate=new Date,t.classList.add("active")}),o&&o.addEventListener("click",()=>{t.classList.remove("active")}),btnCancel&&btnCancel.addEventListener("click",()=>{t.classList.remove("active")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("active")}),i.addEventListener("submit",async n=>{n.preventDefault();const a={nombre:document.getElementById("nombre").value,tipo_vehiculo_id:document.getElementById("tipoVehiculo").value,tipo_cobro:document.getElementById("tipoCobro").value,valor:parseFloat(document.getElementById("valor").value),fecha_inicio:document.getElementById("fechaInicio").value,fecha_fin:document.getElementById("fechaFin").value||null};try{const r=s?`/api/admin/tarifas/${s}`:"/api/admin/tarifas",l=await fetch(r,{method:s?"PUT":"POST",headers:{...d(),"Content-Type":"application/json"},body:JSON.stringify(a)});if(!l.ok){const m=await l.json();throw new Error(m.error||"Error al guardar tarifa")}t.classList.remove("active"),g(),await f({title:"Éxito",message:s?"Tarifa actualizada correctamente":"Tarifa creada exitosamente",type:"success"})}catch(r){console.error(r),await f({title:"Error",message:r.message,type:"error"})}}),window.editTarifa=n=>{const a=u.find(r=>r.id_tarifa===n);a&&(s=n,document.getElementById("modalTitle").textContent="Editar Tarifa",document.getElementById("nombre").value=a.nombre,document.getElementById("tipoVehiculo").value=a.tipo_vehiculo_id,document.getElementById("tipoCobro").value=a.tipo_cobro,document.getElementById("valor").value=a.valor,document.getElementById("fechaInicio").value=a.fecha_inicio.split("T")[0],document.getElementById("fechaFin").value=a.fecha_fin?a.fecha_fin.split("T")[0]:"",t.classList.add("active"))},window.toggleTarifa=async(n,a)=>{if(await b({title:a?"Activar Tarifa":"Desactivar Tarifa",message:`¿Estás seguro de que deseas ${a?"activar":"desactivar"} esta tarifa?`,type:a?"success":"warning"}))try{if(!(await fetch(`/api/admin/tarifas/${n}/toggle`,{method:"PATCH",headers:{...d(),"Content-Type":"application/json"},body:JSON.stringify({activo:a})})).ok)throw new Error("Error al cambiar estado");g()}catch(c){console.error(c),await f({title:"Error",message:c.message,type:"error"})}}}export{C as default};
