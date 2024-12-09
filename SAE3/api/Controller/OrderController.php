<?php
require_once "Controller.php";
require_once "Repository/OrderRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class OrderController extends Controller {

    private OrderRepository $orders;

    public function __construct(){
        $this->orders = new OrderRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id == "status"){
            // URI is .../order/status
            $p = $this->orders->countOrdersByStatus();
            return $p;
        }
    }

    // protected function processPostRequest(HttpRequest $request) {
    //     $json = $request->getJson();
    //     $obj = json_decode($json);
    //     $p = new Order(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
    //     $p->setName($obj->name);
    //     $p->setIdcategory($obj->category);
    //     $ok = $this->order->save($p); 
    //     return $ok ? $p : false;
    // }
   
}

?>