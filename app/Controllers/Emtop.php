<?php

namespace App\Controllers;
use \App\Models\EmtopModel;

class Emtop extends BaseController
{
    protected $request,$session, $model, $incorrect;

    public function __construct() {
		$this->request = \Config\Services::request();
		$this->session = \Config\Services::session();
		$this->model = new EmtopModel();
        $this->incorrect = false;
	}

    public function index()
	{
		if($this->session->has('usuario'))
			return $this->login();
		else
			return view('login/login');
	}

	public function destruirSession()
    {
		$this->session->destroy();
		echo '<script>localStorage.clear();</script>';
		return view('login/login');
    }

	public function login()
	{
		if($this->session->has('usuario')){
			$resp = ["rol"=>$this->session->get("rol"), "ref"=>$this->session->get("usuario")->USU_REFERENCIA];
			$respU=["usuario"=>$this->session->get("usuario")];
			$respR=["rutas"=>$this->session->get("rutas")];
			return view("layouts/header", $respU).view("layouts/aside", $respR).view("layouts/body", $resp).view("layouts/footer");
		}
		$usuario=isset($_POST['usuario']) ? $_POST['usuario'] : "";
		$contra=isset($_POST['contra']) ? $_POST['contra'] : "";
		$dataUP = array(
            "USU_USUARIO" => $usuario,
            "USU_PASSWORD" => $contra,
			"TIPO" => true
        );
		$resp = $this->model->postEnvio("/gestion/login", $dataUP);
		if($resp!=NULL){
		    if($resp[0]){
				$ref = array("USU_REFERENCIA" => $resp[1]);
    			$usuario = $this->model->postEnvio("/gestion/su",$ref);
    			if($usuario!=null){
    			    $rutas = $this->model->postEnvio("/gestion/r",$ref);
					$rol = $this->model->postEnvio("/gestion/srol",$ref);
    				$this->session->set(["usuario"=>$usuario]);
    				$this->session->set(["rutas"=>$rutas]);
					$this->session->set(["rol"=>$rol[0]]);
					$resp = ["rol"=>$this->session->get("rol"), "ref"=>$this->session->get("usuario")->USU_REFERENCIA];
					$respU=["usuario"=>$this->session->get("usuario")];
					$respR=["rutas"=>$this->session->get("rutas")];
    				return view("layouts/header", $respU).view("layouts/aside", $respR).view("layouts/body", $resp).view("layouts/footer");
    			}
    		}
		}
		return view('login/login', ["error"=>true]);
	}
}
