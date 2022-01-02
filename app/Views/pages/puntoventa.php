    <div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">ESCUDERIA</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Escuderia
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-12 top-20 padding-0">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-heading"><h3>Escuderias</h3></div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-10 col-sm-1"></div>
                            <div class="col-lg-2 col-sm-11">
                                <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#escuderiaModal" onclick="nuevoEscuderiaOption();"><i class="icons icon-plus"></i> Nuevo </button>
                            </div>
                        </div>
                        <br>
                        <div class="responsive-table" id="tableEscuderia">
                            <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <!--MODAL DE NUEVO ESCUDERIA-->
        <div class="modal fade" id="escuderiaModal" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Escuderia</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">ESCUDERIA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="escuderia">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">CIUDAD <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <select class="select2-A form-control primary" id="ciudad" placeholders="Seleccionar ciudad"></select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DIRECCIÓN <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="direccion">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">ADMINISTRADOR <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <select class="select2-A form-control primary" id="admin" placeholders="Seleccionar administrador"></select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">PUNTOS <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="puntos" step="1" min="0">
                            </div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarEscuderia();" data-toggle="modal" data-target="#escuderiaModal"><i class="mdi mdi-account-plus"></i> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#escuderiaModal"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO CLIENTE-->
    </div>