//VARIABLES
let optProducto = false;

function activarFecha(valor) {
    if(valor != ''){
        $('#desde').removeAttr('disabled');
        $('#hasta').removeAttr('disabled');
    }else{
        $('#desde').attr('disabled', 'disabled').val('');
        $('#hasta').attr('disabled', 'disabled').val('');
    }
}

function cargarDescripcion(des) {
    $('#descripcionM').val(des);
}

function cargarImagen(link) {
    $("#imagen").attr("src",link);
}

function cargarPuntos(ext, des, has) {
    if(ext!=''){
        $('#puntosM').val(ext);
        $('#desdeM').val(des);
        $('#hastaM').val(has);
    }else{
        $('#puntosM').val('');
        $('#desdeM').val('');
        $('#hastaM').val('');
        alert("ESTE PRODUCTO NO CUENTA CON PUNTOS EXTRAS");
    }
}

function nuevoProducto() {
    optProducto = true;
    vaciarCajas();
}

function cargarFichaTecnica(cod, nom, des, ext, ded, has, lin) {
    optProducto = false;
    vaciarCajas();
    $('#codigo').val(cod);
    $('#producto').val(nom);
    $('#imagenClass').attr("placeholder", lin);
    $('#imagenClass').val(lin);
    $('#descripcion').val(des);
    if(ext != ''){
        $('#puntos').val(ext);
        $('#desde').val(ded);
        $('#hasta').val(has);
        $('#desde').removeAttr('disabled');
        $('#hasta').removeAttr('disabled');
    }
}

function vaciarCajas() {
    files=[];
    $('#progress').val(0);
    $('#codigo').val('');
    cambiarEstadoInput("codigo", true);
    $('#producto').val('');
    cambiarEstadoInput("producto", true);
    $('#imagen').val('');
    $('#imagenClass').attr("placeholder", "Seleccione una imagen");
    cambiarEstadoInput("imagenClass", true);
    $('#descripcion').val('');
    cambiarEstadoInput("descripcion", true);
    $('#puntos').val('');
    cambiarEstadoInput("puntos", true);
    $('#desde').val('');
    cambiarEstadoInput("desde", true);
    $('#hasta').val('');
    cambiarEstadoInput("hasta", true);
    var attr1 = $('#desde').attr('disabled');
    if (typeof attr1 == typeof undefined || attr1 == false) 
        $('#desde').attr('disabled', 'disabled');
    var attr2 = $('#hasta').attr('disabled');
    if (typeof attr2 == typeof undefined || attr2 == false) 
        $('#hasta').attr('disabled', 'disabled');
}

function comprobarFechas(desde, hasta) {
    var d = new Date(desde);
    var h = new Date(hasta);
    return d<=h;
}

function guardarProducto() {
    let texto = '¿Seguro de crear ficha técnica?';
    if(!optProducto)
        texto = '¿Seguro de editar ficha técnica?';
    if(confirm(texto)){
        let cod = $('#codigo').val();
        let pro = $('#producto').val();
        let fil = $('#imagenClass').val();
        let des = $('#descripcion').val();
        let pun = $('#puntos').val();
        let ded = $('#desde').val();
        let has = $('#hasta').val();
        let estado = true;
        if(cod == ''){
            cambiarEstadoInput("codigo", false);
            estado = false;
        }else
            cambiarEstadoInput("codigo", true);
        if(pro == ''){
            cambiarEstadoInput("producto", false);
            estado = false;
        }else
            cambiarEstadoInput("producto", true);
        if(pun != ''){
            if(pun <= 0){
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
        }
        if(fil == '' ){
            if (files.length != 0)
                cambiarEstadoInput("imagenClass", true);   
            else {
                cambiarEstadoInput("imagenClass", false);
                estado = false;
            }
        }
        if(estado){
            uploadFile(cod, pro, fil, des, pun, ded, has);
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }
}

function uploadFile(cod, pro, fil, des, pun, ded, has) {
    if(files.length != 0){
        for (let i = 0; i < files.length; i++) {
            $('#progress').val(0);
            var storage = firebase.storage().ref(`PRODUCTOS/${cod}/${files[i].name}`);
            var upload = storage.put(files[i]);
            upload.on("state_changed",function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('#progress').val(percentage);
            },function error() {
                alert("LO SIENTO ERROR SUBIENDO ARCHIVO, VUELVA A INTENTAR");
                $('#progress').val(0);
            },function complete() {
                readFile(cod, pro, fil, des, pun, ded, has, true, i);
            });
        }
    }else{
        readFile(cod, pro, fil, des, pun, ded, has, false, 0);
    }
}

function readFile(cod, pro, fil, des, pun, ded, has, est, i) {
    if(est){
        var storage = firebase.storage().ref(`PRODUCTOS/${cod}/${files[i].name}`);
        storage.getDownloadURL().then(function(url) {
            productoInsert(cod, pro, url, des, pun, ded, has);
        }).catch(function(error) {
            alert(`ERROR, ${error}`);
        });
    }else
        productoInsert(cod, pro, fil, des, pun, ded, has);
}

function productoInsert(cod, pro, fil, des, pun, ded, has) {
    const dbRef = firebase.database().ref();
    dbRef.child(`tbl_fichatecnica/${cod}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            if(optProducto && snapshot.val().ESTADO){
                cambiarEstadoInput("codigo", false);
                alert("CODIGO DE FICHA TÉCNICA YA EXISTE");
            }else{
                firebase.database().ref(`tbl_fichatecnica/${cod}`).set({
                    NOMBRE: pro,
                    DESCRIPCION: des,
                    LINK : fil,
                    EXTRAS: pun,
                    FECHADESDE: ded,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                vaciarCajas();
                alert("CORRECTO");
                $('#fichatecnicaModel').modal('toggle');
            }
        } else {
            if(optProducto){
                firebase.database().ref(`tbl_fichatecnica/${cod}`).set({
                    NOMBRE: pro,
                    DESCRIPCION: des,
                    LINK : fil,
                    EXTRAS: pun,
                    FECHADESDE: ded,
                    FECHAHASTA: has,
                    ESTADO: true
                });
                vaciarCajas();
                alert("CORRECTO");
                $('#fichatecnicaModel').modal('toggle');
            }else{
                cambiarEstadoInput("codigo", false);
                alert("CODIGO DE FICHA TÉCNICA YA EXISTE");
            }
        }
    }).catch((error) => {
        alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
    });
}

function deleteFichaTecnica(id) {
    if(confirm('¿Seguro de eliminar ficha técnica?'))
        firebase.database().ref(`tbl_fichatecnica/${id}/ESTADO`).set(false);
}