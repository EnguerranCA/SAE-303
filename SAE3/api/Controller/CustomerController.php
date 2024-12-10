<?php
require_once "Controller.php";
require_once "Repository/CustomerRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class CustomerController extends Controller {

    private CustomerRepository $Customers;

    public function __construct(){
        $this->Customers = new CustomerRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id == true){
            // URI is .../customer/x
            $p = $this->Customers->returnCustomerProducts($id);
            return $p;
        }
        $p = $this->Customers->findAll();
            return $p;
    }

   
}

?>