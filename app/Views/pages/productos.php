    <div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">FICHA TÉCNICA</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Ficha Técnica
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-12 top-20 padding-0">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-heading"><h3>Ficha Técnica</h3></div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-10 col-sm-1"></div>
                            <div class="col-lg-2 col-sm-11">
                                <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#fichatecnicaModel" onclick="nuevoProducto();"><i class="icons icon-plus"></i> Nuevo </button>
                            </div>
                        </div>
                        <br>
                        <div class="responsive-table" id="tableFichaTecnica">
                            <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

        <!--MODAL DE NUEVO FICHA TÉCNICA-->
        <div class="modal fade" id="fichatecnicaModel" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Ficha Técnica</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">CÓDIGO <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="codigo">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">PRODUCTO <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="producto">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">IMAGEN <span class="obligatorio">*</span></label>
                            <center>
                                <div class="col-sm-8 input-group fileupload-v1">
                                    <input type="file" name="fileRead" id="fileRead" class="fileupload-v1-file hidden" accept=".png, .gif, .jpg, .jpeg" data-bind="event: { change: $root.Browse }"/>
                                    <input type="text" id="imagenClass" class="form-control primary fileupload-v1-path" placeholder="Seleccione una imagen" disabled>
                                    <span class="input-group-btn">
                                        <button class="btn fileupload-v1-btn" type="button"><i class="icons icon-picturer"></i> Escoger</button>
                                    </span>
                                </div>
                                <div class="col-sm-12">
                                    <progress value="0" max="100" id="progress"></progress>
                                </div>
                            </center>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DESCRIPCIÓN </label>
                            <div class="col-sm-9">
                                <textarea type="text" class="form-control primary" id="descripcion" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">PUNTOS EXTRAS</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="puntos" step="0.01" min="0" placeholder="0 %" onchange="activarFecha(this.value);">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">DESDE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="desde" disabled>
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">HASTA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="hasta" disabled>
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
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarProducto();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#fichatecnicaModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO CLIENTE-->

        <!--MODAL MOSTRAR IMAGEN-->
        <div class="modal fade" id="cargarImagen" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Producto</h4>
                    </div>
                    <div class="modal-body">
                        <img id="imagen" src="<?echo base_Url('asset/img/cargando.gif');?>" class="rounded img-fluid">
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#cargarImagen"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL MOSTRAR IMAGEN-->

        <!--MODAL MOSTRAR PUNTOS EXTRAS-->
        <div class="modal fade" id="cargarPuntos" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Puntos</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">PUNTOS EXTRAS</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="puntosM" step="0.01" min="0" placeholder="0 %" disabled>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DESDE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="desdeM" disabled>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">HASTA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="hastaM" disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#cargarPuntos"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL MOSTRAR PUNTOS EXTRAS-->

    </div>