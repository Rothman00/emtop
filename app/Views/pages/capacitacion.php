    <div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">CAPACITACIONES</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Capacitaciones
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-12 top-20 padding-0">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-heading"><h3>Capacitaciones</h3></div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-10 col-sm-1"></div>
                            <div class="col-lg-2 col-sm-11">
                                <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#capacitacionModel" onclick="nuevaCapacitacion();"><i class="icons icon-plus"></i> Nuevo </button>
                            </div>
                        </div>
                        <div id="capacitacionDatos">
                            <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

         <!--MODAL DE NUEVO CAPACITACION-->
         <div class="modal fade" id="capacitacionModel" style="overflow:hidden;" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Capacitación</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">FICHA TÉCNICA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <select class="select2-A" id="fichaTecnica" placeholders="CARGANDO ..."></select>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">NOMBRE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="nombre">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DESCRIPCIÓN </label>
                            <div class="col-sm-9">
                                <textarea type="text" class="form-control primary" id="descripcion" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">ARCHIVO <span class="obligatorio">*</span></label>
                            <center>
                                <div class="col-sm-8 input-group fileupload-v1">
                                    <input type="file" name="fileRead" id="fileRead" class="fileupload-v1-file hidden" accept="image/*, video/*" data-bind="event: { change: $root.Browse }"/>
                                    <input type="text" id="imagenClass" class="form-control primary fileupload-v1-path" placeholder="Seleccione un archivo" disabled>
                                    <span class="input-group-btn">
                                        <button class="btn fileupload-v1-btn" type="button"><i class="icons icon-picturer"></i> Escoger</button>
                                    </span>
                                </div>
                                <div class="col-sm-12">
                                    <span class="obligatorio">Subiendo: </span><progress value="0" max="100" id="progress"></progress>
                                </div>
                            </center>
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
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarCapacitacion();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#capacitacionModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO CAPACITACION-->

    </div>