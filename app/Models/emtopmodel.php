<?php 
namespace App\Models;
use CodeIgniter\Model;
require_once FCPATH .'vendor/autoload.php';
require_once FCPATH . '/vendor/kreait/firebase-php/src/Firebase/Factory.php';
use kreait\Firebase\Factory;

class EmtopModel extends Model
{
    protected $db;
    protected $factory;

    public function __construct() {
        parent::__construct();
        $this->factory =  (new Factory())-> withDatabaseUri('https://emtop-72473-default-rtdb.firebaseio.com/');
        $this->db = $this->factory->createDatabase();
    }

    public function login($user, $pass){
        $datos=$this->db->getReference('tbl_usuario')
        ->getChild($user)
        ->getSnapshot()
        ->getValue();
        if($datos==null) return array("ESTATUS" => "USUARIO INCORRECTO");
        if($datos["PASSWORD"]==$pass){
            $rolusuario = $this->db->getReference('tbl_rolusuario')
            ->getChild($user)
            ->getSnapshot()
            ->getValue();
            if($rolusuario == null) return array("ESTATUS" => "ACCESO DENEGADO, COMPRUEBE CON ADMINISTRADOR"); 
            $resp = array();
            $roles = array();
            foreach ($rolusuario as $k => $v) {
                if($v){
                    $rol = $this->db->getReference('tbl_rol')
                    ->getChild($k)
                    ->getSnapshot()
                    ->getValue();
                    if($rol){
                        $rruta = $this->db->getReference('tbl_rolruta')
                        ->getChild($k)
                        ->getSnapshot()
                        ->getValue();
                        if($rruta != null){
                            foreach ($rruta as $krr => $vrr) {
                                if($vrr){
                                    $ruta = $this->db->getReference('tbl_ruta')
                                    ->getSnapshot()
                                    ->getValue();
                                    foreach ($ruta as $kr => $vr) {
                                        if($vr["ESTADO"] && $krr == $kr){
                                            $resp["RUTAS"][$vr["ORDEN"]][$kr]=$vr;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $roles[$k]=$v;
                }
            }  
            if(count($resp)==0) return array("ESTATUS" => "ACCESO DENEGADO, COMPRUEBE CON ADMINISTRADOR");
            $resp["ROLES"] = $roles;
            $resp["DATOS"] = [
                "DIRECCION"=> $datos["DIRECCION"],
                "DNI"=> $datos["DNI"],
                "FECHANAC"=> $datos["FECHANAC"],
                "NOMBRES"=> $datos["NOMBRES"],
                "TELEFONO"=> $datos["TELEFONO"],
                "FOTO"=> $datos["FOTO"],
                "ID"=>$user
            ];
            $resp["ESTATUS"] = "CORRECTO";
            return $resp;
        }else
            return array("ESTATUS" => "CONTRASEÑA INCORRECTA");
    }
}