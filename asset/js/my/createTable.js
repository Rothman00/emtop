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
            tabla += `<tr class="text-center">
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
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Puntos</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                    <tbody>`;
    data.forEach(d => {
        if(d["ESTADO"]){
            tabla += `<tr class="text-center">
                        <td style="color:#000000;">${d["CODIGO"]??''}</td>
                        <td style="color:#000000;">${d["NOMBRE"]??''}</td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-secondary" data-toggle="modal" data-target="#mostrardescripcion" onclick="cargarDescripcion('${d["DESCRIPCION"]??''}');">
                                <i class="icons icon-speech"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-success" data-toggle="modal" data-target="#mostrarImagen" onclick="cargarImagen('${d["LINK"]??''}');">
                                <i class="icons icon-picture"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-info" data-toggle="modal" data-target="#mostrarPuntos" onclick="cargarPuntos('${d["EXTRAS"]??''}', '${d["FECHADESDE"]??''}', '${d["FECHAHASTA"]??''}');">
                                <i class="icons icon-trophy"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#fichatecnicaModel" onclick="cargarFichaTecnica('${d["CODIGO"]??''}','${d["NOMBRE"]??''}','${d["DESCRIPCION"]??''}','${d["EXTRAS"]??''}','${d["FECHADESDE"]??''}','${d["FECHAHASTA"]??''}','${d["LINK"]??''}');">
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

function generarCapacitacion(data) {
    let content = '';
    let codigo = '';
    let ind = true;
    data.forEach(element => {
        if(codigo != element.CODIGO){
            codigo = element.CODIGO;
            if(!ind){
                content += '</div>';
                ind = true;
            }
            content += `
                <br>
                <center><h3>${codigo}</h3></center>
                <br>
            `;
        }
        if (ind){
            ind = false;
            content += `
                <div class="col-md-12">
                    <div class="col-md-6">
                        <div class="panel box-v1">
                            <div class="panel-heading bg-white border-none">
            `;
        }else{
            ind = true;
            content += `
                    <div class="col-md-6">
                        <div class="panel box-v1">
                            <div class="panel-heading bg-white border-none">
            `;
        }
        let nombre = nombreFile(element.LINK);
        let format = nombre.split('.');
        switch (format[1]) {
            case 'wmv':
            case 'asf':
            case 'mov':
            case 'flv':
            case 'rm':
            case 'rmvb':
            case 'mp4':
            case 'mkv':
            case 'mks':
            case '3gpp':
                content += `
                                <video controls name="media"><source src="${element.LINK}" type="video/${format[1]}"></video>
                            </div>
                            <div class="panel-body text-center">
                                <strong>${element.NOMBRE}</strong>
                                <p>${element.DESCRIPCION}</p>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-3d btn-warning" data-toggle="modal" data-target="#capacitacionModel" onclick="cargarCapacitacion('${element.CODIGO??''}','${element.NOMBRE??''}','${element.DESCRIPCION??''}','${element.LINK??''}');">
                                            <i class="icons icon-settings"></i>
                                        </button>
                                    </div>
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-3d btn-danger" onclick="deleteCapacitacion('${element.CODIGO}', '${element.NOMBRE}', '${element.LINK}');">
                                            <i class="icons icon-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                content += `
                                <img src="${element.LINK}" class="img-responsive">
                            </div>
                            <div class="panel-body text-center">
                                <strong>${element.NOMBRE}</strong>
                                <p>${element.DESCRIPCION}</p>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-3d btn-warning" data-toggle="modal" data-target="#capacitacionModel" onclick="cargarCapacitacion('${element.CODIGO??''}','${element.NOMBRE??''}','${element.DESCRIPCION??''}','${element.LINK??''}');">
                                            <i class="icons icon-settings"></i>
                                        </button>
                                    </div>
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-3d btn-danger" onclick="deleteCapacitacion('${element.CODIGO}', '${element.NOMBRE}', '${element.LINK}');">
                                            <i class="icons icon-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
        if(ind)
            content += "</div>";
    });
    return content;
}

function generarForoTemas(data) {
    let tabla = `
        <table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Autor</th>
                    <th>Temas</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;
    data.forEach(d => {
        let usu = datosUsuarios[d["USUARIO"]];
        let img = base_url+"/asset/img/avatar.jpg";
        if(usu["FOTO"]!='') img = usu["FOTO"];
        tabla+=`
                <tr class="text-center">
                    <td style="color:#000000;">
                        <strong>${usu["NOMBRES"]} ${usu["APELLIDOS"]}</strong>
                        <br>
                        <img src="${img}" class="img-circle avatar">
                        <p>${d["FECHA"]}</p>
                    </td>
                    <td style="color:#000000;">${d["TEMA"]}</td>
                    <td style="color:#000000;">
                        <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#discursoModel" onclick="mostrarDiscursoNuevo('${d["TEMA"]}');">
                            <i class="icons icon-speech"></i>
                        </button>
                        <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deleteTemaForo('${d["TEMA"]}');">
                            <i class="icons icon-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
    });
    tabla += '</tbody></table>';
    return tabla;
}