<!DOCTYPE html>
<html lang="es">
<head>

  <meta charset="utf-8">
  <meta name="description" content="SAC">
  <meta name="keyword" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EMTOP</title>

  <!-- start: Css -->
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/bootstrap.min.css">

  <!-- plugins -->
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/font-awesome.min.css"/>
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/simple-line-icons.css"/>
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/animate.min.css"/>
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/icheck/skins/flat/aero.css"/>
  <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/style.css">
  <!-- end: Css -->

  <link rel="shortcut icon" href="<?php echo base_Url()?>/asset/img/emtop.jpg">
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>

    <body style="background-image: url('asset/img/emtop.jpg'); background-size: cover;">

      <div class="container">

        <form class="form-signin" action="<?php echo base_Url();?>/inicio" method="post">
          <div class="panel periodic-login">
              <div class="panel-body text-center">
                  <h1></h1><strong><p class="element-name">Sistema de Administración</p></strong></h1>
                  <i class="icons icon-arrow-down"></i>
                  <div class="form-group form-animate-text" style="margin-top:40px !important;">
                    <input type="text" class="form-text" name="usuario" id="usuario" required>
                    <span class="bar"></span>
                    <label>Usuario</label>
                  </div>
                  <div class="form-group form-animate-text" style="margin-top:40px !important;">
                    <input type="password" class="form-text" name="contra" id="contra" required>
                    <span class="bar"></span>
                    <label>Contraseña</label>
                  </div>
                  <?php
                    if(isset($error))
                    {
                        echo "<div style='color:red'>Usuario o contraseña invalido </div>";
                    }
                  ?>
                  <input type="submit" class="btn col-md-12" value="Ingresar"/>
              </div>
          </div>
        </form>

      </div>

      <!-- end: Content -->
      <!-- start: Javascript -->
      <script src="<?php echo base_Url()?>/asset/js/jquery.min.js"></script>
      <script src="<?php echo base_Url()?>/asset/js/jquery.ui.min.js"></script>
      <script src="<?php echo base_Url()?>/asset/js/bootstrap.min.js"></script>

      <script src="<?php echo base_Url()?>/asset/js/plugins/moment.min.js"></script>
      <script src="<?php echo base_Url()?>/asset/js/plugins/icheck.min.js"></script>

      <!-- custom -->
      <script src="<?php echo base_Url()?>/asset/js/main.js"></script>
      <script type="text/javascript">
        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

        // Open (or create) the database
        var open = indexedDB.open("EMTOP", 1);
        
        // Create the schema
        open.onupgradeneeded = function() {
            var db = open.result;
            
        };

        open.onsuccess = function(){
            var idb = open.result;
            idb.close();
            indexedDB.deleteDatabase("EMTOP");
        };
      </script>
     <!-- end: Javascript -->
   </body>
   </html>