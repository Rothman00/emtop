if($('#reportesData1').length > 0){
    var dbReporte1 = firebase.database().ref('tbl_fichatecnica');
    dbReporte1.on('value', (snapshot) => {
        if(snapshot.exists()){
            let tabla = `
                        <br>
                        <table id="datatables-generic0" class="table table-striped table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Link</th>
                                    <th>Puntos</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                </tr>
                            </thead>
                            <tbody>`;
            const data = snapshot.val();
            for (const key in data) {
                const d = data[key];
                if(d["ESTADO"]){
                    tabla += `
                                <tr class="text-center">
                                    <td style="color:#000000;">${key}</td>
                                    <td style="color:#000000;">${d["NOMBRE"]}</td>
                                    <td style="color:#000000;">${d["DESCRIPCION"]}</td>
                                    <td style="color:#000000;">${d["LINK"]}</td>
                                    <td style="color:#000000;">${d["EXTRAS"]}</td>
                                    <td style="color:#000000;">${d["FECHADESDE"]}</td>
                                    <td style="color:#000000;">${d["FECHAHASTA"]}</td>
                                </tr>`;
                }
            }
            tabla += '</tbody></table>';
            $('#reportesData1').html(tabla);
            $('#datatables-generic0').DataTable({
                "scrollX": true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }
    });
}

if($('#reportesData2').length > 0){
    var dbReporte2 = firebase.database().ref('tbl_premio');
    dbReporte2.on('value', (snapshot) => {
        if(snapshot.exists()){
            let tabla = `
                        <br>
                        <table id="datatables-generic1" class="table table-striped table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Link</th>
                                    <th>Puntos</th>
                                    <th>Desde</th>
                                    <th>Hasta</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>`;
            const data = snapshot.val();
            for (const key in data) {
                const d = data[key];
                tabla += `
                            <tr class="text-center">
                                <td style="color:#000000;">${key}</td>
                                <td style="color:#000000;">${d["NOMBRE"]}</td>
                                <td style="color:#000000;">${d["DESCRIPCION"]}</td>
                                <td style="color:#000000;">${d["LINK"]}</td>
                                <td style="color:#000000;">${d["PUNTOS"]}</td>
                                <td style="color:#000000;">${d["FECHADESDE"]}</td>
                                <td style="color:#000000;">${d["FECHAHASTA"]}</td>
                                <td style="color:#000000;">${d["ESTADO"]?"ACTIVO":"INACTIVO"}</td>
                            </tr>`;
            }
            tabla += '</tbody></table>';
            $('#reportesData2').html(tabla);
            $('#datatables-generic1').DataTable({
                "scrollX": true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }
    });
}

if($('#reportesData3').length > 0){
    var dbReporte3 = firebase.database().ref('tbl_premio');
    dbReporte3.on('value', (snapshot) => {
        if(snapshot.exists()){
            let tabla = `
                        <br>
                        <table id="datatables-generic2" class="table table-striped table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Puntos</th>
                                    <th>Escuderia</th>
                                    <th>Puntos Totales</th>
                                    <th>Fecha solicutud</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>`;
            const data = snapshot.val();
            for (const key in data) {
                const d = data[key];
                if(d["CANJEAR"]!=undefined){
                    for (const k in d["CANJEAR"]) {
                        const c = d["CANJEAR"][k];
                        let text = 'PENDIENTE';
                        if(c["ESTADO"] == 0)
                            text = 'APROBADO';
                        if(c["ESTADO"] == 1){
                            if(!comprobarFechas(c["FECHASOLICITUD"], d["FECHAHASTA"])){
                                text = 'FUERA DE TIEMPO';
                                fueraTiempoEscuderia(key, k, c["ESCUDERIA"], d["PUNTOS"]);
                            }
                        }
                        tabla += `
                                <tr class="text-center">
                                    <td style="color:#000000;">${key}</td>
                                    <td style="color:#000000;">${d["NOMBRE"]}</td>
                                    <td style="color:#000000;">${d["PUNTOS"]}</td>
                                    <td style="color:#000000;">${c["ESCUDERIA"]}</td>
                                    <td style="color:#000000;">${c["PUNTOSTOTAL"]}</td>
                                    <td style="color:#000000;">${c["FECHASOLICITUD"]}</td>
                                    <td style="color:#000000;">${text}</td>
                                </tr>`;
                    }
                }
            }
            tabla += '</tbody></table>';
            $('#reportesData3').html(tabla);
            $('#datatables-generic2').DataTable({
                "scrollX": true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }
    });
}