<?php
require_once "Controller.php";
require_once "Repository/ProductRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends Controller {

    private ProductRepository $Products;

    public function __construct(){
        $this->Products = new ProductRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        $amount = $request->getParam("amount");
        $duration = $request->getParam("duration");
        if ($id == "top"){
            // URI is .../product/status
            $p = $this->Products->returnTopProducts($amount, $duration);
            return $p;
        } else if ($id == "sales"){
            // URI is .../product/sales
            $p = $this->Products->returnMonthlySales($duration);
            return $p;
        }
        // } else {
        //     // URI is .../product/{id}
        //     $p = $this->Products->getProduct($id);
        //     return $p;
        // }
    }

   
}

?>