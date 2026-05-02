import{g,c as m,n as u,s as p}from"./index-D4X_T6ys.js";function I(){const t=JSON.parse(localStorage.getItem("user")||"{}");if(t.username){const r=document.getElementById("userName");r&&(r.textContent=t.nombres_apellidos||t.username)}const e=document.getElementById("logoutBtn");e&&e.addEventListener("click",w),v(),E(),x(),h()}function h(){const t=document.getElementById("btnDownloadReport");t&&t.addEventListener("click",async()=>{try{t.disabled=!0;const e=t.innerHTML;t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Generando...';const r=await fetch("/api/admin/reporte",{method:"GET",headers:g()});if(r.status===401){m(),u("/login");return}if(!r.ok)throw new Error("Error al generar reporte");const o=await r.blob(),s=window.URL.createObjectURL(o),n=document.createElement("a");n.href=s;const c=r.headers.get("Content-Disposition");let i="reporte.csv";if(c){const a=c.match(/filename="?([^"]+)"?/);a&&a[1]&&(i=a[1])}n.download=i,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(s),n.remove()}catch(e){console.error(e),p("Error al descargar el reporte")}finally{t.disabled=!1,t.innerHTML='<i class="fa-solid fa-file-export"></i> Descargar Reporte'}})}function x(){const t=document.getElementById("gananciasModal"),e=document.getElementById("closeGananciasModal"),r=document.getElementById("btnCerrarGanancias"),o=()=>{t&&t.classList.remove("active")};e&&(e.onclick=o),r&&(r.onclick=o),t&&(t.onclick=s=>{s.target===t&&o()})}function b(t){const e=document.getElementById("gananciasModal"),r=document.getElementById("detalleGananciasModalBody");!e||!r||(!t||t.length===0?r.innerHTML=`
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fa-solid fa-file-invoice-dollar" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No hay ingresos registrados hoy.</p>
            </div>
        `:r.innerHTML=t.map(o=>`
            <div style="margin: 12px 0; padding: 12px; background: #F8FAFC; border-radius: 8px; border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 0.95rem; color: var(--text-main); display: block; margin-bottom: 4px;">${o.nombre}</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted); background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">
                            ${o.tipo_cobro}
                        </span>
                        <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">
                            ${o.cantidad_registros} registro${o.cantidad_registros!==1?"s":""}
                        </span>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.1rem; font-weight: 700; color: var(--success);">
                            ${new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(o.total_hoy)}
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-light);">
                            Tarifa: ${new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(o.valor_tarifa||0)}
                        </span>
                    </div>
                </div>
            </div>
        `).join(""),e.classList.add("active"))}async function v(){try{const t=await fetch("/api/admin/stats",{method:"GET",headers:g()});if(t.status===401){console.warn("Token expirado"),m(),u("/login");return}const e=await t.text();let r,o;try{const a=JSON.parse(e);t.ok||(o=a),r=a}catch{throw new Error(`API stats falló: status ${t.status}. Texto: "${e}"`)}if(!t.ok)throw new Error(o.error||"Error cargando estadísticas");const s=document.getElementById("todayIncome"),n=document.getElementById("currentOccupancy"),c=document.getElementById("activeVehicles");if(s){const a=Number(r.gananciasHoy)||0,d=!isNaN(a)&&a>=0?a:0;s.textContent=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(d)}if(n){const d=r.ocupacionActual||0,l=Math.min(d/45*100,100).toFixed(0);n.textContent=l+"%"}c&&(c.textContent=r.ocupacionActual||0);const i=document.getElementById("cardIngresos");if(i){const a=i.cloneNode(!0);i.parentNode.replaceChild(a,i),a.onclick=()=>b(r.gananciasDetalle||[])}}catch(t){console.error("Error cargando datos:",t),await p({title:"Error de Dashboard",message:"Error cargando estadísticas: "+t.message,type:"error"})}}async function w(){try{if(!(await fetch("/api/auth/logout",{method:"POST",headers:g()})).ok)throw new Error("Error en logout");m(),u("/login")}catch(t){console.error("Logout error:",t),m(),u("/login")}}async function E(){const t=document.getElementById("activityTable");if(t)try{const e=await fetch("/api/admin/registros?limit=10",{method:"GET",headers:g()});if(e.status===401){t.innerHTML=`
                <tr>
                    <td colspan="4" style="text-align: center; color: var(--danger); padding: 40px;">
                        Sesión expirada. Por favor recarga.
                    </td>
                </tr>
            `;return}if(!e.ok)throw new Error(`Error ${e.status}: ${e.statusText}`);const r=await e.text();let o;try{o=JSON.parse(r)}catch{throw new Error(`API registros falló: status ${e.status}. Texto: "${r}"`)}const s=Array.isArray(o)?o:o.data||[];if(!s||s.length===0){t.innerHTML=`
                <tr>
                    <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 40px;">
                        Sin registros
                    </td>
                </tr>
            `;return}t.innerHTML=s.map(n=>{const c=new Date(n.entrada).toLocaleString("es-CO"),i=n.estado==="FINALIZADO",a=i?"badge-danger":"badge-success",d=i?"Finalizado":"En Curso",l=Number(n.valor_calculado)||0,f=!isNaN(l)&&l>=0?l:0,y=new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(f);return`
                <tr>
                    <td>${c}</td>
                    <td>${n.placa}</td>
                    <td>
                        <span class="badge ${a}">
                            ${d}
                        </span>
                    </td>
                    <td style="font-weight: 600; color: var(--success);">${y}</td>
                </tr>
            `}).join("")}catch(e){console.error("Error rendering activity table:",e),t.innerHTML=`
            <tr>
                <td colspan="4" style="text-align: center; color: var(--danger); padding: 40px;">
                    Error cargando registros
                </td>
            </tr>
        `}}export{I as default};
