//PUNTOS CONFIGURACIÓN
let optPuntosConf = true;

function nuevoPuntos() {
    optPuntosConf = true;
    vaciarPuntosCajas();
}

function mostrarPuntosModelConfig(por, fac, des, has) {
    optPuntosConf = false;
    vaciarPuntosCajas();
    $('#porcentaje').val(por);
    $('#factor').val(fac);
    $('#desde').val(des).prop('disabled', true);
    $('#hasta').val(has);
}

function vaciarPuntosCajas() {
    $('#porcentaje').val('');
    cambiarEstadoInput("puntos", true);
    $('#factor').val('');
    cambiarEstadoInput("puntos", true);
    $('#desde').val('').prop('disabled', false);;
    cambiarEstadoInput("desde", true);
    $('#hasta').val('');
    cambiarEstadoInput("hasta", true);
}

function guardarPuntos() {
    let texto = '¿Seguro de crear ficha técnica?';
    if(!optProducto)
        texto = '¿Seguro de editar ficha técnica?';
    if(confirm(texto)){
        let por = $('#porcentaje').val();
        let fac = $('#factor').val();
        let ded = $('#desde').val();
        let has = $('#hasta').val();
        let estado = true;
        if(por == '' && por <= 0){
            cambiarEstadoInput("porcentaje", false);
            estado = false;
        }else
            cambiarEstadoInput("porcentaje", true);
        if(fac == '' && fac <= 0){
            cambiarEstadoInput("factor", false);
            estado = false;
        }else
            cambiarEstadoInput("factor", true);
        if(ded == null){
            cambiarEstadoInput("desde", false);
            estado = false;
        }
        if(has == null){
            cambiarEstadoInput("hasta", false);
            estado = false;
        }
        if(estado && !comprobarFechas(ded, has)){
            cambiarEstadoInput("desde", false);
            cambiarEstadoInput("hasta", false);
            estado = false;
        }else{
            cambiarEstadoInput("desde", true);
            cambiarEstadoInput("hasta", true);
        }
        if(estado){
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_configuracion/${ded}`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(optPuntosConf && snapshot.val().ESTADO){
                        cambiarEstadoInput("desde", false);
                        alert("FECHA YA EXISTENTE");
                    }else{
                        firebase.database().ref(`tbl_configuracion/${ded}`).set({
                            PORCENTAJE: por, 
                            FACTOR: fac,
                            FECHADESDE: ded,
                            FECHAHASTA: has,
                            ESTADO: true
                        });
                        alert("CORRECTO");
                        $('#puntosConfigModel').modal('toggle');
                    }
                } else {
                    if(optPuntosConf){
                        firebase.database().ref(`tbl_configuracion/${ded}`).set({
                            PORCENTAJE: por, 
                            FACTOR: fac,
                            FECHADESDE: ded,
                            FECHAHASTA: has,
                            ESTADO: true
                        });
                        alert("CORRECTO");
                        $('#puntosConfigModel').modal('toggle');
                    }else{
                        cambiarEstadoInput("desde", false);
                        alert("FECHA YA EXISTENTE");
                    }
                }
            }).catch((error) => {
                alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
            });
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }
}

function deletePremio(ded) {
    if(confirm('¿Seguro de eliminar configuración?'))
        firebase.database().ref(`tbl_configuracion/${ded}/ESTADO`).set(false);
}

//USUARIOS
let optUsuarioConf = true;
let optUsuarioRolConf = '';
let optRolConf = '';
function nuevoUsuarioConfi() {
    optUsuarioConf = true;
    $('#escuderia').html('<option value="-1">ESPERE ...</option>');
    vaciarCajasUsuarioConfig();
}

function mostrarUsuarioConf(dni, nom, ape, ema, tel, fil, esc, usu, pas) {
    optUsuarioConf = false;
    $('#escuderia').html('<option value="-1">ESPERE ...</option>');
    vaciarCajasUsuarioConfig();
    $('#dni').val(dni);
    $('#nombres').val(nom);
    $('#apellidos').val(ape);
    $('#email').val(ema);
    $('#telefono').val(tel);
    $('#imagenClass').val(fil);
    $("#escuderia").val(esc==''?'-1':esc).trigger('change.select2');
    $('#usuario').val(usu).prop('disabled', true);
    $('#password').val(pas);
}

function mostrarRolModal(esc, usu) {
    casillasModalRol("rolUsuarioCon", "rutasUsuarioCon", true);
    casillasModalRutas("rutasUsuarioCon");
    if(esc == "CLIENTE")
        alert("Usuario seleccionado no puede asignar roles");
    else{
        optUsuarioRolConf = usu;
        let roles = datosRolUsuario[usu];
        for (const key in roles) {
            const r = roles[key];
            if(r && key != "SUPERADMIN")
                $(`#rolUsuarioCon${key}`).prop('checked', true).prop('disabled', false).trigger('change');
        }
    }
}

function nuevoRolConfig() {
    $('#nombresRolC').val('');
    cambiarEstadoInput("nombresRolC", true);
    casillasModalRutas('rutasconfigRolN');
}

function onchangeRutasForRol(idRuta, idRol, key, est) {
    optRolConf = idRol;
    if($(`#${idRol}${key}`).prop('checked')){
        let rutas = datosRolRutas[key];
        for (const key1 in rutas) {
            const u = rutas[key1];
            if(u){
                if(est == "true")
                    $(`#${idRuta}${key1}`).prop('checked', true).attr("disabled", true).trigger('change');
                else
                    $(`#${idRuta}${key1}`).prop('checked', true).removeAttr("disabled").trigger('change');
            }
        }
    }else{
        for (const key in datosRuta) {
            const r = datosRuta[key];
            if(r["ESTADO"]){
                if(est  == "true")
                    $(`#${idRuta}${key}`).prop('checked', false).attr("disabled", true).trigger('change');
                else
                    $(`#${idRuta}${key}`).prop('checked', false).removeAttr("disabled").trigger('change');
            }
        }
    }
}

function casillasModalRol(idRol, idRuta, est) {
    let rolTex = `<center>
                    <strong>Roles</strong>`;
    for (const key in datosRol) {
        const r = datosRol[key];
        if(r && key!="SUPERADMIN"){
            rolTex += `<div class="form-group form-animate-checkbox">
                            <input type="checkbox" class="checkbox ${idRol}" id="${idRol}${key}" onchange="onchangeRutasForRol('${idRuta}', '${idRol}', '${key}', '${est}')">
                            <label> ${key}</label>
                        </div>`;
        }
    }
    rolTex += '</center>';
    $(`#${idRol}`).html(rolTex);
}

function casillasModalRutas(idRuta, est) {
    let rutTex = `<center>
                    <strong>Rutas</strong>`;
    for (const key in datosRuta) {
        const r = datosRuta[key];
        if(r["ESTADO"]){
            rutTex += `<div class="form-group form-animate-checkbox">
                            <input type="checkbox" class="checkbox ${idRuta}" id="${idRuta}${key}">
                            <label> ${key}</label>
                        </div>`;
        }
    }
    rutTex += '</center>';
    $(`#${idRuta}`).html(rutTex);
}

function vaciarCajasUsuarioConfig() {
    $('#dni').val('');
    cambiarEstadoInput("dni", true);
    $('#nombres').val('');
    cambiarEstadoInput("nombres", true);
    $('#apellidos').val('');
    cambiarEstadoInput("apellidos", true);
    $('#email').val('');
    cambiarEstadoInput("email", true);
    $('#telefono').val('');
    cambiarEstadoInput("telefono", true);
    $('#fileRead').val('');
    $('#imagenClass').val('').attr("placeholder", 'Escoja una foto');
    cambiarEstadoInput("imagenClass", true);
    $('#escuderia').html('<option value="-1">SELECCIONAR</option>');
    for (const key in datosPuntoVenta) {
        $(`#escuderia`).append(`<option value="${key}">${key}</option>`);
    }
    $("#escuderia").val("-1").trigger('change.select2');
    $('#usuario').val('').prop('disabled', false);
    cambiarEstadoInput("usuario", true);
    $('#password').val('');
    cambiarEstadoInput("password", true);
}

function guardarUsuario() {
    let texto = '¿Seguro de crear usuario?';
    if(!optUsuarioConf)
        texto = '¿Seguro de editar usuario?';
    if(confirm(texto)){
        let dni = $('#dni').val();
        let nom = $('#nombres').val();
        let ape = $('#apellidos').val();
        let ema = $('#email').val();
        let tel = $('#telefono').val();
        let fil = $('#imagenClass').val();
        let esc = $("#escuderia").val();
        let usu = $('#usuario').val();
        let pas = $('#password').val();
        let estado = true;
        if(dni == ''){
            cambiarEstadoInput("dni", false);
            estado = false;
        }else
            cambiarEstadoInput("dni", true);
        if(nom == ''){
            cambiarEstadoInput("nombres", false);
            estado = false;
        }else
            cambiarEstadoInput("nombres", true);
        if(ape == ''){
            cambiarEstadoInput("apellidos", false);
            estado = false;
        }else
            cambiarEstadoInput("apellidos", true);
        if(ema == ''){
            cambiarEstadoInput("email", false);
            estado = false;
        }else
            cambiarEstadoInput("email", true);
        if(tel == ''){
            cambiarEstadoInput("telefono", false);
            estado = false;
        }else
            cambiarEstadoInput("telefono", true);
        if(fil == '' ){
            if (files.length != 0)
                cambiarEstadoInput("imagenClass", true);   
            else {
                cambiarEstadoInput("imagenClass", false);
                estado = false;
            }
        }
        if(usu == ''){
            cambiarEstadoInput("usuario", false);
            estado = false;
        }else
            cambiarEstadoInput("usuario", true);
        if(pas == ''){
            cambiarEstadoInput("password", false);
            estado = false;
        }else
            cambiarEstadoInput("password", true);
        if(esc == -1){
            if(confirm("¿Usuario es Administrador de Escuderia?"))
                esc = "";
            else
                esc = null;
        }
        if(estado){
            uploadFileUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas);
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }   
}

function uploadFileUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas) {
    if(files.length != 0){
        for (let i = 0; i < files.length; i++) {
            $('#progress').val(0);
            var storage = firebase.storage().ref(`USUARIOS/${usu}/${files[i].name}`);
            var upload = storage.put(files[i]);
            upload.on("state_changed",function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('#progress').val(percentage);
            },function error() {
                alert("LO SIENTO ERROR SUBIENDO ARCHIVO, VUELVA A INTENTAR");
                $('#progress').val(0);
            },function complete() {
                readFileUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas, true, i);
            });
        }
    }else{
        readFileUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas, false, 0);
    }
}

function readFileUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas, est, i) {
    if(est){
        var storage = firebase.storage().ref(`USUARIOS/${usu}/${files[i].name}`);
        storage.getDownloadURL().then(function(url) {
            productoInsertUsuarioConf(dni,nom,ape,ema,tel,url,esc,usu,pas);
        }).catch(function(error) {
            alert(`ERROR, ${error}`);
        });
    }else
        productoInsertUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas);
}

function productoInsertUsuarioConf(dni,nom,ape,ema,tel,fil,esc,usu,pas) {
    const dbRef = firebase.database().ref();
    dbRef.child(`tbl_usuario/${usu}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            if(optUsuarioConf && snapshot.val().ESTADO){
                cambiarEstadoInput("usuario", false);
                alert("USUARIO YA EXISTENTE");
            }else{
                firebase.database().ref(`tbl_usuario/${usu}`).set({
                    APELLIDOS: ape,
                    DNI: dni,
                    EMAIL: ema,
                    ESCUDERIA: esc,
                    ESTADO: true,
                    FOTO: fil,
                    NOMBRES: nom,
                    PASSWORD: pas,
                    TELEFONO: tel,
                    USUARIO: usu
                });
                alert("CORRECTO");
                $('#usuariosConfModel').modal('toggle');
            }
        } else {
            if(optUsuarioConf){
                firebase.database().ref(`tbl_usuario/${usu}`).set({
                    APELLIDOS: ape,
                    DNI: dni,
                    EMAIL: ema,
                    ESCUDERIA: esc,
                    ESTADO: true,
                    FOTO: fil,
                    NOMBRES: nom,
                    PASSWORD: pas,
                    TELEFONO: tel,
                    USUARIO: usu
                });
                alert("CORRECTO");
                $('#usuariosConfModel').modal('toggle');
            }else{
                cambiarEstadoInput("usuario", false);
                alert("USUARIO YA EXISTENTE");
            }
        }
    }).catch((error) => {
        alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
    });
}

function deleteUsuarioConf(usu) {
    if(confirm('¿Seguro de eliminar usuario?'))
        firebase.database().ref(`tbl_usuario/${usu}/ESTADO`).set(false);
}

function guardarRolUsuario() {
    if(confirm("¿Está seguro de dar este rol?")){
        if(optUsuarioRolConf != ''){
            firebase.database().ref(`tbl_rolusuario/${optUsuarioRolConf}`).set(null);
            let datos = {};
            for (const key in datosRol) {
                const r = datosRol[key];
                if(r && $(`#${optRolConf}${key}`).prop('checked'))
                    datos[key] = true;
            }
            firebase.database().ref(`tbl_rolusuario/${optUsuarioRolConf}`).set(datos);
            alert("CORRECTO");
            optUsuarioRolConf = '';
            $('#otorgarRolUsuario').modal('toggle');
        }
    }
}

function guardarRolNuevoRutas(optRutas) {
    if(confirm("¿Esta seguro de crear este rol?")){
        let rol = $('#nombresRolC').val();
        let est = true;
        if(rol == ''){
            cambiarEstadoInput("nombresRolC", false);
            est = false;
        }else
            cambiarEstadoInput("nombresRolC", true);
        if(est){
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_rol/${rol}`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(snapshot.val()){
                        cambiarEstadoInput("nombresRolC", false);
                        alert("ROL YA EXISTENTE")
                    }else{
                        firebase.database().ref(`tbl_rol/${rol}`).set(true);
                        let datos = {};
                        for (const key in datosRuta) {
                            const r = datosRuta[key];
                            if(r["ESTADO"] && $(`#${optRutas}${key}`).prop('checked'))
                                datos[key] = true;
                        }
                        firebase.database().ref(`tbl_rolruta/${rol}`).set(datos);
                        alert("CORRECTO");
                        $('#rolConfigModel').modal('toggle');
                    }
                }else{
                    firebase.database().ref(`tbl_rol/${rol}`).set(true);
                    let datos = {};
                    for (const key in datosRuta) {
                        const r = datosRuta[key];
                        if(r["ESTADO"] && $(`#${optRutas}${key}`).prop('checked'))
                            datos[key] = true;
                    }
                    firebase.database().ref(`tbl_rolruta/${rol}`).set(datos);
                    alert("CORRECTO");
                    $('#rolConfigModel').modal('toggle');
                }
            });
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }
}

function guardarRolNuevoN(rolConf, rutaConf) {
    if(confirm("¿Estás seguro de actualizar rol?")){
        let rol = '';
        for (const key in datosRol) {
            const r = datosRol[key];
            if(r && $(`#${rolConf}${key}`).prop('checked')){
                rol = key;
                break;
            }
        }
        let ruta = {};
        for (const key in datosRuta) {
            const r = datosRuta[key];
            if(r["ESTADO"] && $(`#${rutaConf}${key}`).prop('checked'))
                ruta[key] = true;
        }
        firebase.database().ref(`tbl_rolruta/${rol}`).set(ruta);
        alert("Completo");
    }
}

function deleteRolNuevoN(rolConf) {
    if(confirm("¿Estás seguro de eliminar rol?")){
        let rol = '';
        for (const key in datosRol) {
            const r = datosRol[key];
            if(r && $(`#${rolConf}${key}`).prop('checked')){
                rol = key;
                break;
            }
        }
        firebase.database().ref(`tbl_rol/${rol}`).set(false);
        alert("Completo");
    }
}

//Ciudad
let optCiudadN = true;
let optAnterior = '';

function nuevaCiudad() {
    optCiudadN = true;
    optAnterior = '';
    $('#ciudadN').val('');
    cambiarEstadoInput("ciudadN", true); 
}

function mostrarCiudad(ciu) {
    optCiudadN = false;
    optAnterior = ciu;
    $('#ciudadN').val(ciu);
    cambiarEstadoInput("ciudadN", true); 
}

function guardarCiudadN() {
    let text = "¿Está seguro de crear ciudad?";
    if(!optCiudadN)
        text = "¿Está seguro de editar ciudad?";
    if(confirm(text)){
        let ciu = $('#ciudadN').val();
        if(ciu == ''){
            cambiarEstadoInput("ciudadN", false); 
            alert("Revise el formulario");
        }else{
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_ciudad/${ciu}`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(optCiudadN && snapshot.val()){
                        cambiarEstadoInput("ciudadN", false);
                        alert("CUIDAD YA EXISTENTE")
                    }else{
                        firebase.database().ref(`tbl_ciudad/${optAnterior}`).set(null);
                        firebase.database().ref(`tbl_ciudad/${ciu}`).set(true);
                        alert("CORRECTO");
                        $('#ciudadModalN').modal('toggle');
                    }
                }else{
                    if(!optCiudadN)
                        firebase.database().ref(`tbl_ciudad/${optAnterior}`).set(null);
                    firebase.database().ref(`tbl_ciudad/${ciu}`).set(true);
                    alert("CORRECTO");
                    $('#ciudadModalN').modal('toggle');
                }
            });
        }
    }
}

function deleteCiudadN(ciu) {
    if(confirm("¿Estás seguro de eliminar ciudad?")){
        firebase.database().ref(`tbl_ciudad/${ciu}`).set(false);
        alert("Completo");
    }
}

//Banner
let optBanner = true;
let inBan = -1;
function nuevaBanner() {
    optBanner = true;
    vaciarBannerConetnido();
}

function mostrarBanner(id, lin, des, has) {
    optBanner = false;
    vaciarBannerConetnido();
    $('#imagenClass1').val(lin);
    $('#desdeB').val(des);
    $('#hastaB').val(has);
    inBan = id;
}

function vaciarBannerConetnido() {
    inBan = -1;
    $('#imagenClass1').val('').attr("placeholder", 'Escoja una imagen');
    cambiarEstadoInput("imagenClass1", true);
    $('#desdeB').val('');
    cambiarEstadoInput("desdeB", true);
    $('#hastaB').val('');
    cambiarEstadoInput("hastaB", true); 
    $('#progress1').val(0);
}

function guardarBanner() {
    let text = "¿Seguro quiere crear este Banner?";
    if(!optBanner)
        text = "¿Seguro quiere editar este Banner?";
    if(confirm(text)){
        let fil = $('#imagenClass1').val();
        let des = $('#desdeB').val();
        let has = $('#hastaB').val();
        let estado = true;
        if(des == ''){
            cambiarEstadoInput("desdeB", false);
            estado = false;
        }else
            cambiarEstadoInput("desdeB", true);
        if(has == ''){
            cambiarEstadoInput("hastaB", false);
            estado = false;
        }else
            cambiarEstadoInput("hastaB", true);
        if(fil == '' ){
            if (files.length != 0)
                cambiarEstadoInput("imagenClass", true);   
            else {
                cambiarEstadoInput("imagenClass", false);
                estado = false;
            }
        }
        if(estado){
            uploadFileBanner(fil, des, has);
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }   
}

function uploadFileBanner(fil, des, has) {
    if(files.length != 0){
        for (let i = 0; i < files.length; i++) {
            $('#progress1').val(0);
            var storage = firebase.storage().ref(`BANNER/${files[i].name}`);
            var upload = storage.put(files[i]);
            upload.on("state_changed",function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('#progress1').val(percentage);
            },function error() {
                alert("LO SIENTO ERROR SUBIENDO ARCHIVO, VUELVA A INTENTAR");
                $('#progress1').val(0);
            },function complete() {
                readFileBanner(fil, des, has, true, i);
            });
        }
    }else{
        readFileBanner(fil, des, has, false, 0);
    }
}

function readFileBanner(fil, des, has, est, i) {
    if(est){
        var storage = firebase.storage().ref(`BANNER/${files[i].name}`);
        storage.getDownloadURL().then(function(url) {
            productoInsertBanner(url, des, has);
        }).catch(function(error) {
            alert(`ERROR, ${error}`);
        });
    }else
        productoInsertBanner(fil, des, has);
}

function productoInsertBanner(fil, des, has) {
    if(inBan != -1 && !optBanner){
        firebase.database().ref(`tbl_banner/${inBan}`).set({
            LINK: fil,
            FECHADESDE: des,
            FECHAHASTA: has,
            ESTADO: true
        });
        alert("CORRECTO");
        $('#bannerModalN').modal('toggle');
    }else{
        const dbRef = firebase.database().ref();
        dbRef.child(`tbl_banner`).get().then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                firebase.database().ref(`tbl_banner/${data.length}`).set({
                    LINK: fil,
                    FECHADESDE: des,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                alert("CORRECTO");
                $('#bannerModalN').modal('toggle');
            } else {
                firebase.database().ref(`tbl_banner/0`).set({
                    LINK: fil,
                    FECHADESDE: des,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                alert("CORRECTO");
                $('#bannerModalN').modal('toggle');
            }
        }).catch((error) => {
            alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
        });
    }
}

function deleteBanner(id) {
    if(confirm("¿Estás seguro de inhabilitar contenido de banner?")){
        firebase.database().ref(`tbl_banner/${id}/ESTADO`).set(false);
        alert("CORRECTO");
    }
}