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

function generarFichaTecnica(data) {
    let tabla = `<table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Imagen</th>
                                <th>Puntos</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                    <tbody>`;
    data.forEach(d => {
        if(d["ESTADO"]){
            tabla += `<tr>
                        <td style="color:#000000;">${d["CODIGO"]??''}</td>
                        <td style="color:#000000;">${d["NOMBRE"]??''}</td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-success" data-toggle="modal" data-target="#mostrarImagen" onclick="cargarImagen('${d["LINK"]??''}');">
                                <i class="icons icon-picture"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-info" data-toggle="modal" data-target="#mostrarPuntos" onclick="cargarPuntos('${d["EXTRAS"]??''}', '${d["FECHADESDE"]??''}', '${d["FECHAHASTA"]??''}');">
                                <i class="icons icon-picture"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#fichaModel" onclick="cargarFichaTecnica('${d["CODIGO"]??''}','${d["NOMBRE"]??''}','${d["DESCRIPCION"]??''}','${d["EXTRAS"]??''}','${d["FECHADESDE"]??''}','${d["FECHAHASTA"]??''}','${d["LINK"]??''}');">
                                <i class="icons icon-settings"></i>
                            </button>
                            <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deleteFichaTecnica('${d["CODIGO"]}');">
                                <i class="icons icon-trash"></i>
                            </button>
                        </td>
                     </tr>`;
        }
    });
    tabla += '</tbody></table>';
    return tabla;
}