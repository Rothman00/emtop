let base = {};
if($('#seccionRoles').length > 0){
    var dbRolesAsig = firebase.database().ref('tbl_rol');
    dbRolesAsig.on('value', (snapshot) => {
        if(snapshot.exists()){
            let data=snapshot.val();
            let rolTex = `<center>`;
            for (const key in data) {
                const r = data[key];
                if(r){
                    rolTex += `<div class="form-group form-animate-checkbox">
                                    <input type="checkbox" class="checkbox" id="rol${key}" value="${key}">
                                    <label> ${key}</label>
                                </div>`;
                }
            }
            rolTex += '</center>';
            $('#seccionRoles').html(rolTex);
        }
    });
}

function enviarMensaje() {
    $('#progress').val(0);
    if(confirm("¿Estás seguro de enviar este mensaje?")){
        let men = $('#mensaje').val();
        let estado = true;
        if(men == ''){
            estado = false;
            cambiarEstadoInput("mensaje", false);
            alert("Debe de agrear algun mensaje");
        }else
            cambiarEstadoInput("mensaje", true);
        let personas = [];
        $('input[type=checkbox]:checked').each(function() {
            personas.push($(this).val());
        });
        if(personas.length == 0){
            estado = false;
            alert("Debe de seleccionar algun grupo o rol a quien enviar");
        }
        if(estado){
            if(files.length != 0){
                for (let i = 0; i < files.length; i++) {
                    getBase64(files[i]);
                }
            }
            const dbRef = firebase.database().ref();
            dbRef.child("tbl_usuario").get().then((snapshot) => {
                let numeros = [];
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    for (const key in data) {
                        const d = data[key];
                        for (let index = 0; index < personas.length; index++) {
                            const element = personas[index];
                            if(element == "ESCUDERIA"){
                                if(d["ESCUDERIA"] != undefined && d["ESCUDERIA"] == ""){
                                    numeros.push(d["TELEFONO"]);
                                    break;
                                }
                            }else{  
                                if(element == "EMPLEADOS"){
                                    if(d["ESCUDERIA"] != undefined && d["ESCUDERIA"] != ""){
                                        numeros.push(d["TELEFONO"]);
                                        break;
                                    }    
                                }else{
                                    if(element == "CLIENTES"){
                                        if(d["ESCUDERIA"] == undefined){
                                            numeros.push(d["TELEFONO"]);
                                            break;
                                        }
                                    }else{
                                        let temp = datosRolUsuario[key][element];
                                        if(temp != undefined && temp){
                                            numeros.push(d["TELEFONO"]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(numeros.length != 0){
                        let con = 0, err = 0, tex= '', optFil = false;
                        setTimeout(() => {
                            if(files.length != 0){
                                optFil = true;
                                files = [];
                            }
                            numeros.forEach(n => {
                                if(n.indexOf("09") == 0){
                                    n = n.slice(1);
                                    enviarTextoWhatsapp(men, n);
                                    if(optFil){
                                        for (const key in base) {
                                            const file = base[key];
                                            enviarArchivoWhatsApp(file, key, n);
                                        }
                                    }
                                    con ++;
                                    var percentage = (con / numeros.length) * 100;
                                    $('#progress').val(percentage);
                                }else{
                                    err++;
                                    tex += n + ', ';
                                }
                            });
                            setTimeout(() => {
                                alert(`Se han enviado ${con} con exito.\nTuvimos ${err} errores.\n${tex}`);
                                if(confirm("¿Borrar contenido de cajas?"))
                                    location.reload();
                            }, Object.keys(data).length * 1000);
                        }, files.length*2500);
                    }else
                        alert("Los grupos seleccionados no tienen números de celular");
                } else 
                    alert("Hubo un problema vuelva a intentar");
            }).catch((error) => {
                alert("Hubo un error vuelva a intentar \n"+error);
            });
        }
    }
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        base[file.name] = reader.result;
    };
    reader.onerror = function (error) {
      alert('Error: '+ error);
    };
}

/* 
    TIPOS DE ENVIOS
    sendMessage = Solo texto
    sendFile = Envio de archivo
*/
function enviarTextoWhatsapp(texto, numero){
    var token = 'olrg4yrxko5xcpnl';
    var instanceId = '251495';
    var url = `https://api.chat-api.com/instance${instanceId}/sendMessage?token=${token}`;
    var data = {
        phone: `593${numero}`,
        body: `${texto}`,
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType : 'application/json',
        success: function (response) {
            console.log(response);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        if (jqXHR.status === 0) {
          alert('Verificar conexión a internet');
        } else if (jqXHR.status == 404) {
          alert('Fallo en evio vuelva a intentar');
        } else if (jqXHR.status == 500) {
          alert('Error en el servicio vuelva a intentar');
        } else if (textStatus === 'parsererror') {
          alert('Información a enviar erronea consulte con administrador');
        } else if (textStatus === 'timeout') {
          alert('Error en tiempo de consulta');
        } else if (textStatus === 'abort') {
          alert('Finaliza consulta con errores consulte con administrador');
        } else {
          alert('Error: ' + jqXHR.responseText);
        }
    });
}

function enviarArchivoWhatsApp(body, name, numero) {
    var token = 'olrg4yrxko5xcpnl';
    var instanceId = '251495';
    var url = `https://api.chat-api.com/instance${instanceId}/sendFile?token=${token}`;
    var data = {
        body: `${body}`,
        filename: name,
        phone: `593${numero}`
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType : 'application/json',
        success: function (response) {
            console.log(response);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        if (jqXHR.status === 0) {
          alert('Verificar conexión a internet');
        } else if (jqXHR.status == 404) {
          alert('Fallo en evio vuelva a intentar');
        } else if (jqXHR.status == 500) {
          alert('Error en el servicio vuelva a intentar');
        } else if (textStatus === 'parsererror') {
          alert('Información a enviar erronea consulte con administrador');
        } else if (textStatus === 'timeout') {
          alert('Error en tiempo de consulta');
        } else if (textStatus === 'abort') {
          alert('Finaliza consulta con errores consulte con administrador');
        } else {
          alert('Error: ' + jqXHR.responseText);
        }
    });
}