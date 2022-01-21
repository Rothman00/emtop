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

function generarCatalogoPremios(data) {
    let content = '';
    let ind = true;
    data.forEach(element => {
        if(element.ESTADO){
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
            content += `<img src="${element.LINK}" class="img-responsive">
                    </div>
                    <div class="panel-body text-center">
                        <strong>${element.NOMBRE}</strong>
                        <p>${element.DESCRIPCION}</p>
                        <strong>PUNTOS: ${element.PUNTOS}</strong>
                        <p>${element.FECHADESDE}/${element.FECHAHASTA}</p>
                        <div class="row">
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-3d btn-warning" data-toggle="modal" data-target="#premioModel" onclick="mostrarPremio('${element.CODIGO??''}','${element.NOMBRE??''}','${element.DESCRIPCION??''}','${element.LINK??''}','${element.PUNTOS??''}','${element.FECHADESDE??''}','${element.FECHAHASTA??''}');">
                                    <i class="icons icon-settings"></i>
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-3d btn-danger" onclick="deletePremio('${element.CODIGO}');">
                                    <i class="icons icon-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            if(ind)
                content += "</div>";
        }
    });
    return content;
}

function generarCanjes(data) {
    let tabla = `
        <br>
        <table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Escuderia</th>
                    <th>Administrador</th>
                    <th>Ciudad</th>
                    <th>Dirección</th>
                    <th>Puntos Total</th>
                    <th>Premio</th>
                    <th>Puntos</th>
                    <th>Fecha Solicitud</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;
    for (const key in data) {
        const d = data[key];
        if(d["CANJEAR"] != undefined){
            for (const k in d["CANJEAR"]) {
                const e = d["CANJEAR"][k];
                let esc = datosPuntoVenta[e["ESCUDERIA"]];
                let text = 'PENDIENTE';
                if(e["ESTADO"] == 0)
                    text = 'APROBADO';
                if(e["ESTADO"] == 1){
                    if(!comprobarFechas(e["FECHASOLICITUD"], d["FECHAHASTA"])){
                        text = 'FUERA DE TIEMPO';
                        fueraTiempoEscuderia(d["CODIGO"], k, e["ESCUDERIA"], d["PUNTOS"]);
                    }
                }
                if(e["ESTADO"] == 2)
                    text = "NEGADO";
                if(e["ESTADO"] == 3)
                    text = "FUERA DE TIEMPO";
                tabla+=`
                        <tr class="text-center">
                            <td style="color:#000000;">${e["ESCUDERIA"]}</td>
                            <td style="color:#000000;">${esc["ADMINISTRADOR"]}</td>
                            <td style="color:#000000;">${esc["CIUDAD"]}</td>
                            <td style="color:#000000;">${esc["DIRECCION"]}</td>
                            <td style="color:#000000;">${e["PUNTOSTOTAL"]}</td>
                            <td style="color:#000000;">${d["CODIGO"]}-${d["NOMBRE"]}</td>
                            <td style="color:#000000;">${d["PUNTOS"]}</td>
                            <td style="color:#000000;">${e["FECHASOLICITUD"]}</td>
                            <td style="color:#000000;">${text}</td>`;
                if(text == 'PENDIENTE'){
                    tabla += `<td style="color:#000000;">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-circle btn-mn btn-success" onclick="premiarEscuderia('${d["CODIGO"]}', '${k}');">
                                            <i class="icons icon-like"></i>
                                        </button>
                                    </div>
                                    <div class="col-sm-6">
                                        <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="negarEscuderia('${d["CODIGO"]}', '${k}', '${e["ESCUDERIA"]}', '${d["PUNTOS"]}');">
                                            <i class="icons icon-dislike"></i>
                                        </button>
                                    </div>
                                </div>  
                            </td>`;
                }else
                    tabla += '<td></td>';
                tabla += `</tr>`;
            }
        }
    }
    tabla += '</tbody></table>';
    return tabla;
}

function generarPuntosConfig(data) {
    let tabla = `
        <br>
        <table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Porcentaje</th>
                    <th>Factor</th>
                    <th>Fecha Desde</th>
                    <th>Fecha Hasta</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;
    data.forEach(d => {
        if(d["ESTADO"]){
            tabla+=`
                    <tr class="text-center">
                        <td style="color:#000000;">${d["PORCENTAJE"]}</td>
                        <td style="color:#000000;">${d["FACTOR"]}</td>
                        <td style="color:#000000;">${d["FECHADESDE"]}</td>
                        <td style="color:#000000;">${d["FECHAHASTA"]}</td>
                        <td style="color:#000000;">
                            <div class="row">
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#puntosConfigModel" onclick="mostrarPuntosModelConfig('${d["PORCENTAJE"]}', '${d["FACTOR"]}', '${d["FECHADESDE"]}', '${d["FECHAHASTA"]}');">
                                        <i class="icons icon-settings"></i>
                                    </button>
                                </div>
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deletePremio('${d["FECHADESDE"]}');">
                                        <i class="icons icon-trash"></i>
                                    </button>
                                </div>
                            </div>  
                        </td>
                    </tr>`;
        }
    });
    tabla += '</tbody></table>';
    return tabla;
}

function generarUsuarioConfigData(data) {
    let tabla = `
        <br>
        <table id="datatables-generic1" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>DNI</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Foto</th>
                    <th>Escuderia</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;
    data.forEach(d => {
        if(d["ESTADO"]){
            let esc = d["ESCUDERIA"];
            if(d["ESCUDERIA"] == undefined || d["ESCUDERIA"] == null)
                esc = "CLIENTE";
            else if(d["ESCUDERIA"] == '')
                esc = "ADMINISTRADOR"
            tabla+=`
                    <tr class="text-center">
                        <td style="color:#000000;">${d["APELLIDOS"]} ${d["NOMBRES"]}</td>
                        <td style="color:#000000;">${d["DNI"]}</td>
                        <td style="color:#000000;">${d["EMAIL"]}</td>
                        <td style="color:#000000;">${d["TELEFONO"]}</td>
                        <td style="color:#000000;">
                            <button type="button" class="btn btn-circle btn-mn btn-success" data-toggle="modal" data-target="#mostrarImagen" onclick="cargarImagen('${d["FOTO"]==''?base_url+"/asset/img/avatar.jpg":d["FOTO"]}');">
                                <i class="icons icon-picture"></i>
                            </button>
                        </td>
                        <td style="color:#000000;">${esc}</td>
                        <td style="color:#000000;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#otorgarRolUsuario" onclick="mostrarRolModal('${esc}','${d["USUARIO"]}');">
                                        <i class="icons icon-diamond"></i>
                                    </button>
                                </div>
                                <div class="col-sm-4">
                                    <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#usuariosConfModel" onclick="mostrarUsuarioConf('${d["DNI"]}','${d["NOMBRES"]}','${d["APELLIDOS"]}','${d["EMAIL"]}','${d["TELEFONO"]}','${d["FOTO"]}','${d["ESCUDERIA"]??''}','${d["USUARIO"]}','${d["PASSWORD"]}');">
                                        <i class="icons icon-settings"></i>
                                    </button>
                                </div>
                                <div class="col-sm-4">
                                    <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deleteUsuarioConf('${d["USUARIO"]}');">
                                        <i class="icons icon-trash"></i>
                                    </button>
                                </div>
                            </div>  
                        </td>
                    </tr>`;
        }
    });
    tabla += '</tbody></table>';
    return tabla;
}

function generarTablaCiudad(data) {
    let tabla = `
        <br>
        <table id="datatables-generic2" class="table table-striped table-bordered" width="100%" cellspacing="0">
            <thead>
                <tr>
                    <th>Ciudad</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;
    for (const key in data) {
        const d = data[key];
        if(d){
            tabla+=`
                    <tr class="text-center">
                        <td style="color:#000000;">${key}</td>
                        <td style="color:#000000;">
                            <div class="row">
                                <div class="col-sm-4">
                                    <button type="button" class="btn btn-circle btn-mn btn-warning" data-toggle="modal" data-target="#ciudadModalN" onclick="mostrarCiudad('${key}');">
                                        <i class="icons icon-settings"></i>
                                    </button>
                                </div>
                                <div class="col-sm-4">
                                    <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deleteCiudadN('${key}');">
                                        <i class="icons icon-trash"></i>
                                    </button>
                                </div>
                            </div>  
                        </td>
                    </tr>`;
        }
    }
    tabla += '</tbody></table>';
    return tabla;
}

function generarCaroulBanner(data) {
    let indicator1 = '', indicator2 = '', contenido1 = '', contenido2 = '', con1 = 0, con2 = 0;
    var hoy = new Date().toISOString().slice(0, 10);
    data.forEach(d => {
        if(d["ESTADO"]){
            if(comprobarFechas(d["FECHADESDE"], hoy) && comprobarFechas(hoy, d["FECHAHASTA"])){
                if(indicator1 == ''){
                    indicator1 += `<li data-target="#carousel-example3" data-slide-to="${con1++}" class="active"></li>`;
                    contenido1 += `<div class="item active">
                                        <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                        <div class="carousel-caption">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                                </div>
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                }else{
                    indicator1 += `<li data-target="#carousel-example3" data-slide-to="${con1++}"></li>`;
                    contenido1 += `<div class="item">
                                        <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                        <div class="carousel-caption">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                                </div>
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                }
            }else{
                firebase.database().ref(`tbl_banner/${d["ID"]}/ESTADO`).set(false);
                if(indicator2 == ''){
                    indicator2 += `<li data-target="#carousel-example4" data-slide-to="${con2++}" class="active"></li>`;
                    contenido2 += `<div class="item active">
                                        <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                        <div class="carousel-caption">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                                </div>
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                }else{
                    indicator2 += `<li data-target="#carousel-example4" data-slide-to="${con2++}"></li>`;
                    contenido2 += `<div class="item">
                                        <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                        <div class="carousel-caption">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                                </div>
                                                <div class="col-sm-6">
                                                    <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                }
            }
        }else{
            if(indicator2 == ''){
                indicator2 += `<li data-target="#carousel-example4" data-slide-to="${con2++}" class="active"></li>`;
                contenido2 += `<div class="item active">
                                    <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                    <div class="carousel-caption">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                            </div>
                                            <div class="col-sm-6">
                                                <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            }else{
                indicator2 += `<li data-target="#carousel-example4" data-slide-to="${con2++}"></li>`;
                contenido2 += `<div class="item">
                                    <img class="img-responsive" src="${d["LINK"]}" alt="First slide" >
                                    <div class="carousel-caption">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <button class="btn btn-round btn-warning" data-animation="animated zoomInRight" data-toggle="modal" data-target="#bannerModalN" onclick="mostrarBanner('${d["ID"]}','${d["LINK"]}','${d["FECHADESDE"]}','${d["FECHAHASTA"]}')"><i class="icons icon-settings"></i></button>
                                            </div>
                                            <div class="col-sm-6">
                                                <button class="btn btn-round btn-danger" data-animation="animated zoomInUp"><i class="icons icon-trash" onclick="deleteBanner('${d["ID"]}')"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            }
        }
    });
    $('#indicatorNum1').html(indicator1);
    $('#indicatorNum2').html(indicator2);
    $('#contenidoCarouel1').html(contenido1);
    $('#contenidoCarouel2').html(contenido2);
}