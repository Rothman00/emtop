function generarTablaPuntoVenta(data) {
    let tabla = `<table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Escuderia</th>
                                <th>Ciudad</th>
                                <th>Dirección</th>
                                <th>Administrador</th>
                                <th>Puntos</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                    <tbody>`;
    data.forEach(d => {
        if(d["ESTADO"]){
            let usu = datosUsuarios[d["ADMINISTRADOR"]];
            tabla += `<tr>
                        <td style="color:#000000;">${d["ESCUDERIA"]??''}</td>
                        <td style="color:#000000;">${d["CIUDAD"]??''}</td>
                        <td style="color:#000000;">${d["DIRECCION"]??''}</td>
                        <td style="color:#000000;">${usu.NOMBRES??d["ADMINISTRADOR"]} ${usu.APELLIDOS??''}</td>
                        <td style="color:#000000;">${d["PUNTOS"]??''}</td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#escuderiaModal" onclick="cargarEscuderiaOption('${d["ESCUDERIA"]??''}','${d["CIUDAD"]??''}','${d["DIRECCION"]??''}','${d["ADMINISTRADOR"]??''}','${d["PUNTOS"]??''}');">
                                <i class="icons icon-settings"></i>
                            </button>
                            <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deletePuntoVenta('${d["ESCUDERIA"]}');">
                                <i class="icons icon-trash"></i>
                            </button>
                        </td>
                     </tr>`;
        }
    });
    tabla += '</tbody></table>';
    return tabla;
}
