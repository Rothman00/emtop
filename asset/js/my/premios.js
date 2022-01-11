let optPremio = true;

function nuevoPremio() {
    optPremio = true;   
    vaciarCajasContenido();
}

function mostrarPremio(cod, nom, des, img, pun, ded, has) {
    optPremio = false;
    vaciarCajasContenido();
    $('#codigo').val(cod).prop("disabled", true);
    $('#nombre').val(nom);
    $('#descripcion').val(des);
    $('#imagenClass').attr("placeholder", img);
    $('#imagenClass').val(img);
    $('#puntos').val(pun);
    $('#desde').val(ded);
    $('#hasta').val(has);
}

function vaciarCajasContenido() {
    $('#progress').val(0);
    $('#codigo').val('').prop("disabled", false);
    cambiarEstadoInput("codigo", true);
    $('#nombre').val('');
    cambiarEstadoInput("nombre", true);
    $('#descripcion').val('');
    cambiarEstadoInput("descripcion", true);
    $('#imagen').val('');
    $('#imagenClass').attr("placeholder", "Seleccione una imagen");
    cambiarEstadoInput("imagenClass", true);
    $('#puntos').val('');
    cambiarEstadoInput("puntos", true);
    $('#desde').val('');
    cambiarEstadoInput("desde", true);
    $('#hasta').val('');
    cambiarEstadoInput("hasta", true);
}

function guardarPremio() {
    let texto = '¿Seguro de crear premio?';
    if(!optPremio)
        texto = '¿Seguro de editar premio?';
    if(confirm(texto)){
        let cod = $('#codigo').val();
        let nom = $('#nombre').val();
        let des = $('#descripcion').val();
        let fil = $('#imagenClass').val();
        let pun = $('#puntos').val();
        let ded = $('#desde').val();
        let has = $('#hasta').val();
        let estado = true;
        if(cod == ''){
            cambiarEstadoInput("codigo", false);
            estado = false;
        }else
            cambiarEstadoInput("codigo", true);
        if(nom == ''){
            cambiarEstadoInput("nombre", false);
            estado = false;
        }else
            cambiarEstadoInput("nombre", true);
        if(des == ''){
            cambiarEstadoInput("descripcion", false);
            estado = false;
        }else
            cambiarEstadoInput("descripcion", true);
        if(fil == '' ){
            if (files.length != 0)
                cambiarEstadoInput("imagenClass", true);   
            else {
                cambiarEstadoInput("imagenClass", false);
                estado = false;
            }
        }
        if(pun == '' && pun <= 0){
            cambiarEstadoInput("puntos", false);
            estado = false;
        }else
            cambiarEstadoInput("puntos", true);
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
            uploadFilePremio(cod, nom, fil, des, pun, ded, has);
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }
}

function uploadFilePremio(cod, pro, fil, des, pun, ded, has) {
    if(files.length != 0){
        for (let i = 0; i < files.length; i++) {
            $('#progress').val(0);
            var storage = firebase.storage().ref(`PREMIOS/${cod}/${files[i].name}`);
            var upload = storage.put(files[i]);
            upload.on("state_changed",function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('#progress').val(percentage);
            },function error() {
                alert("LO SIENTO ERROR SUBIENDO ARCHIVO, VUELVA A INTENTAR");
                $('#progress').val(0);
            },function complete() {
                readFilePremio(cod, pro, fil, des, pun, ded, has, true, i);
            });
        }
    }else{
        readFilePremio(cod, pro, fil, des, pun, ded, has, false, 0);
    }
}

function readFilePremio(cod, pro, fil, des, pun, ded, has, est, i) {
    if(est){
        var storage = firebase.storage().ref(`PREMIOS/${cod}/${files[i].name}`);
        storage.getDownloadURL().then(function(url) {
            productoInsertPremio(cod, pro, url, des, pun, ded, has);
        }).catch(function(error) {
            alert(`ERROR, ${error}`);
        });
    }else
        productoInsertPremio(cod, pro, fil, des, pun, ded, has);
}

function productoInsertPremio(cod, pro, fil, des, pun, ded, has) {
    const dbRef = firebase.database().ref();
    dbRef.child(`tbl_premio/${cod}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            if(optPremio && snapshot.val().ESTADO){
                cambiarEstadoInput("codigo", false);
                alert("CODIGO DE PREMIO YA EXISTE");
            }else{
                firebase.database().ref(`tbl_premio/${cod}`).set({
                    NOMBRE: pro,
                    DESCRIPCION: des,
                    LINK : fil,
                    PUNTOS: pun,
                    FECHADESDE: ded,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                vaciarCajas();
                alert("CORRECTO");
                $('#premioModel').modal('toggle');
            }
        } else {
            if(optPremio){
                firebase.database().ref(`tbl_premio/${cod}`).set({
                    NOMBRE: pro,
                    DESCRIPCION: des,
                    LINK : fil,
                    PUNTOS: pun,
                    FECHADESDE: ded,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                vaciarCajasContenido();
                alert("CORRECTO");
                $('#premioModel').modal('toggle');
            }else{
                cambiarEstadoInput("codigo", false);
                alert("CODIGO DE PREMIO YA EXISTE");
            }
        }
    }).catch((error) => {
        alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
    });
}

function deletePremio(id) {
    if(confirm('¿Seguro de eliminar premio?'))
        firebase.database().ref(`tbl_premio/${id}/ESTADO`).set(false);
}

/* 
    0: APROBADO
    1: PENDIENTE
    2: NEGADO
    3: FUERA DE TIEMPO
*/

function premiarEscuderia(cod, id) {
    if(confirm('¿Seguro quieres premiar escuderia?')){
        firebase.database().ref(`tbl_premio/${cod}/CANJEAR/${id}/ESTADO`).set(0);
        alert("CORRECTO");
    }
}

function negarEscuderia(cod, id, esc, pun) {
    if(confirm('¿Seguro que no quieres premiar escuderia?')){
        firebase.database().ref(`tbl_premio/${cod}/CANJEAR/${id}/ESTADO`).set(2);
        devolverPuntos(esc, pun);
    }
}

function fueraTiempoEscuderia(cod, id, esc, pun) {
    firebase.database().ref(`tbl_premio/${cod}/CANJEAR/${id}/ESTADO`).set(3);
    devolverPuntos(esc, pun);
}

function devolverPuntos(esc, pun) {
    const dbRef = firebase.database().ref();
    dbRef.child(`tbl_puntoventa/${esc}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            let sum = parseFloat(data["PUNTOS"]) + parseFloat(pun);
            firebase.database().ref(`tbl_puntoventa/${esc}/PUNTOS`).set(sum);
        }else{
            alert("PONGASE EN CONTACTO CON ADMINISTRADOR, NO SE PUDO DEVOLVER LOS PUNTOS A ESCUDERIA CORRECTAMENTE");
        }
    });
}