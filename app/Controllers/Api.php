<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Api extends ResourceController
{
    protected $model;

    public function loginData()
    {
        $datos=$this->request->getJSON();
        if(!isset($datos->USUARIO)){
            return $this->genericResponse(null,'USUARIO NO EXISTE', 500);
        }
        if(!isset($datos->PASSWORD)){
            return $this->genericResponse(null,'PASSWORD NO EXISTE', 500);
        }
        $model = new \App\Models\APIMODEL();
        $resp=$model->login($datos->USUARIO, $datos->PASSWORD);
        if($resp["ESTATUS"]=="CORRECTO")
            return $this->genericResponse($resp,"",200);
        else
            return $this->genericResponse("", $resp["ESTATUS"], 404);
    }

    private function genericResponse($data, $msj, $code)
    {
        if ($code == 200) {
            $this->response->setHeader('Access-Control-Allow-Origin', '*');
            $this->response->setHeader('Access-Control-Allow-Methods', 'GET, POST');
            return $this->respond(array(
                "data" => $data,
                "code" => $code
            )); //, 404, "No hay nada"
        } else {
            $this->response->setHeader('Access-Control-Allow-Origin', '*');
            $this->response->setHeader('Access-Control-Allow-Methods', 'GET, POST');
            return $this->respond(array(
                "msj" => $msj,
                "code" => $code
            ));
        }
    }
}