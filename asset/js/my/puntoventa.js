//Variables de uso
let opt = true;

function nuevoEscuderiaOption() {
    opt = true;
    vaciarDatos(true);
}

function cargarEscuderiaOption(esc, ciu, dir, adm, pun) {
    opt = false;
    $('#escuderia').val(esc);
    $('#direccion').val(dir);
    $('#puntos').val(pun);
    llenadoDatos();
    $("#escuderia").prop("disabled",true);
    setTimeout(function(){
        $("#ciudad").val(ciu).trigger('change.select2');
        $("#admin").val(adm).trigger('change.select2');
    }, 500);
}

function vaciarDatos(opcion) {
    $("#escuderia").prop("disabled",false);
    $('#escuderia').val('');
    $('#direccion').val('');
    $('#puntos').val('');
    llenadoDatos();
}

function llenadoDatos() {
    $('#ciudad').html('<option value="-1">ESPERE ...</option>');
    const dbRef = firebase.database().ref();
    dbRef.child("tbl_ciudad").get().then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            $('#ciudad').html('<option value="-1">SELECCIONAR</option>');
            for (const key in data) {
                if(data[key])
                    $(`#ciudad`).append(`<option value="${key}">${key}</option>`);
            }
        } else 
            alert("No se encontraron los datos, vuelva a cargar");
    }).catch((error) => {
        alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
    });
    $('#admin').html('<option value="-1">SELECCIONAR</option>');
    for (const key in datosUsuarios) {
        const element = datosUsuarios[key];
        if(typeof element.ESCUDERIA !== 'undefined' && element.ESCUDERIA == "")
            $(`#admin`).append(`<option value="${key}">${element.NOMBRES} ${element.APELLIDOS}</option>`);
    }
}

function guardarEscuderia() {
    let texto = '¿Seguro de crear escuderia?';
    if(!opt)
        texto = '¿Seguro de editar escuderia?';
    if(confirm(texto)){
        let esc = $('#escuderia').val();
        let ciu = $('#ciudad').val();
        let dir = $('#direccion').val();
        let adm = $('#admin').val();
        let pun = $('#puntos').val();
        let estado = true;
        if(esc == ""){
            cambiarEstadoInput("escuderia", false);
            estado = false;
        }else
            cambiarEstadoInput("escuderia", true);
        if(ciu == -1){
            cambiarEstadoInput("ciudad", false);
            estado = false;
        }else
            cambiarEstadoInput("ciudad", true);
        if(dir == ""){
            cambiarEstadoInput("direccion", false);
            estado = false;
        }else
            cambiarEstadoInput("direccion", true);
        if(adm == -1){
            cambiarEstadoInput("admin", false);
            estado = false;
        }else
            cambiarEstadoInput("admin", true);
        if(pun == "" || pun < 0){
            cambiarEstadoInput("puntos", false);
            estado = false;
        }else
            cambiarEstadoInput("puntos", true);
        if(estado){
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_puntoventa/${esc}`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(opt && snapshot.val().ESTADO){
                        cambiarEstadoInput("escuderia", false);
                        alert("NOMBRE DE ESCUDERIA YA EXISTE");
                    }else{
                        firebase.database().ref(`tbl_puntoventa/${esc}`).set({
                            CIUDAD: ciu,
                            DIRECCION: dir,
                            ADMINISTRADOR : adm,
                            PUNTOS: pun,
                            ESTADO: true
                        });
                        alert("CORRECTO");
                    }
                } else {
                    if(opt){
                        firebase.database().ref(`tbl_puntoventa/${esc}`).set({
                            CIUDAD: ciu,
                            DIRECCION: dir,
                            ADMINISTRADOR : adm,
                            PUNTOS: pun,
                            ESTADO: true
                        });
                        alert("CORRECTO");
                    }else{
                        cambiarEstadoInput("escuderia", false);
                        alert("NOMBRE DE ESCUDERIA NO EXISTE");
                    }
                }
            }).catch((error) => {
                alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
            });
        }else
            alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
    }
}

function cambiarEstadoInput(id, estado) { //true -> Correcto valor  false -> Incorrecto valor
    if(estado)
        $(`#${id}`).removeClass('danger').addClass('primary');
    else
        $(`#${id}`).removeClass('primary').addClass('danger');
}

function deletePuntoVenta(esc) {
    if(confirm('¿Seguro de eliminar escuderia?'))
        firebase.database().ref(`tbl_puntoventa/${esc}/ESTADO`).set(false);
}