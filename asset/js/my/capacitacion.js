let optCapacitacion = false;

function nuevaCapacitacion() {
    optCapacitacion = true;
    vaciarCajasCapacitacion();
}

function cargarCapacitacion(cod, nom, des, lin) {
    optCapacitacion = false;
    vaciarCajasCapacitacion();
    $("#fichaTecnica").val(cod).trigger('change.select2');
    $('#nombre').val(nom);
    $('#descripcion').val(des);
    $('#imagenClass').val(lin);
    
}

function vaciarCajasCapacitacion() {
    $(`#fichaTecnica`).html('');
    if(Object.keys(datosFichaTecnica).length > 0){
        for (const key in datosFichaTecnica) {
            const element = datosFichaTecnica[key];
            $(`#fichaTecnica`).append(`<option value="${key}">${key} - ${element.NOMBRE}</option>`);
        }
    }else
        alert("No se pudo cargar los datos vuelva a intentar");
    $(".select2-A").select2({ placeholder: "Seleccionar", width: '100%', allowClear: true});
    $('#progress').val(0);
    $('#nombre').val('');
    cambiarEstadoInput("nombre", true);
    $('#descripcion').val('');
    cambiarEstadoInput("descripcion", true);
    $('#imagenClass').val('');
    cambiarEstadoInput("imagenClass", true);
    $('#imagenClass').attr("placeholder", "Seleccione un archivo");
}

function guardarCapacitacion() {
    let cod = $('#fichaTecnica').val();
    let nom = $('#nombre').val();
    let des = $('#descripcion').val();
    let fil = $('#imagenClass').val();
    let est = true;
    if(cod == ""){
        est = false;
        cambiarEstadoInput("fichaTecnica", false);
    }else
        cambiarEstadoInput("fichaTecnica", true);
    if(nom == ""){
        est = false;
        cambiarEstadoInput("nombre", false);
    }else
        cambiarEstadoInput("nombre", true);
    if(des == ""){
        est = false;
        cambiarEstadoInput("nombre", false);
    }else
        cambiarEstadoInput("nombre", true);
    if(fil == ''){
        if (files.length != 0)
            cambiarEstadoInput("imagenClass", true);   
        else {
            cambiarEstadoInput("imagenClass", false);
            estado = false;
        }
    }
    if(est)
        updateFileCapacitacion(cod, nom, des, fil);
    else
        alert("VALORES INGRESADOS INCORRECTOS, REVISE EL FORMULARIO");
}

function updateFileCapacitacion(cod, nom, des, fil) {
    if(files.length != 0){
        for (let i = 0; i < files.length; i++) {
            $('#progress').val(0);
            var storage = firebase.storage().ref(`CAPACITACION/${cod}/${files[i].name}`);
            var upload = storage.put(files[i]);
            upload.on("state_changed",function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('#progress').val(percentage);
            },function error() {
                alert("LO SIENTO ERROR SUBIENDO ARCHIVO, VUELVA A INTENTAR");
                $('#progress').val(0);
            },function complete() {
                readFileCapacitacion(cod, nom, des, fil, true, i);
            });
        }
    }else
        readFileCapacitacion(cod, nom, des, fil, false, 0);
}

function readFileCapacitacion(cod, nom, des, fil, est, i) {
    if(est){
        var storage = firebase.storage().ref(`CAPACITACION/${cod}/${files[i].name}`);
        storage.getDownloadURL().then(function(url) {
            procedumInsertCapacitacion(cod, nom, des, url);
        }).catch(function(error) {
            alert(`ERROR, ${error}`);
        });
    }else
        procedumInsertCapacitacion(cod, nom, des, fil);
}

function procedumInsertCapacitacion(cod, nom, des, fil) {
    const dbRef = firebase.database().ref();
    dbRef.child(`tbl_tutoriales/${cod}/${nom}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            if(optCapacitacion){
                cambiarEstadoInput("nombre", false);
                alert("NOMBRE DE CAPACITACIÓN YA EXISTE");
            }else{
                firebase.database().ref(`tbl_tutoriales/${cod}/${nom}`).set({
                    NOMBRE: nom,
                    DESCRIPCION: des,
                    LINK : fil
                });
                vaciarCajas();
                alert("CORRECTO");
                $('#capacitacionModel').modal('toggle');
            }
        } else {
            if(optCapacitacion){
                firebase.database().ref(`tbl_tutoriales/${cod}/${nom}`).set({
                    NOMBRE: nom,
                    DESCRIPCION: des,
                    LINK : fil
                });
                vaciarCajas();
                alert("CORRECTO");
                $('#capacitacionModel').modal('toggle');
            }else{
                cambiarEstadoInput("nombre", false);
                alert("NOMBRE DE CAPACITACIÓN YA EXISTE");
            }
        }
    }).catch((error) => {
        alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
    });    
}

function deleteCapacitacion(cod, nom, fil) {
    if(confirm('¿Seguro de eliminar capacitación?')){
        let nomFil = nombreFile(fil);
        firebase.database().ref(`tbl_tutoriales/${cod}/${nom}`).set(null);
        var desertRef = storageRef.child(`CAPACITACION/${cod}/${nomFil}`);
        desertRef.delete().then(() => {
            alert("CORRECTO");
        }).catch((error) => {
            alert("HUBO UN ERROR, CONSULTE CON EL ADMINISTRADOR");
        });
    }
}