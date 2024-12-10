<?php
require_once "Controller.php";
require_once "Repository/ProductRepository.php";


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends Controller
{

    private ProductRepository $Products;

    public function __construct()
    {
        $this->Products = new ProductRepository();
    }


    protected function processGetRequest(HttpRequest $request)
    {
        $id = $request->getId("id");
        $amount = $request->getParam("amount");
        $duration = $request->getParam("duration");
        $category = $request->getParam("category");
        if ($id == "top") {
            // URI is .../product/status
            $p = $this->Products->returnTopProducts($amount, $duration);
            return $p;
        } else if ($id == "sales") {
            if ($category == true) {
                // URI is .../product/sales?category=true
                $p = $this->Products->returnMonthlySalesCategory($duration);
                return $p;
            }
            // URI is .../product/sales
            $p = $this->Products->returnMonthlySales($duration);
            return $p;
        } else if ($id == "stock") {
            // URI is .../product/stock
            $p = $this->Products->returnSmallestStocks($amount);
            return $p;
        } else {
            // URI is .../product/{id}
            $p = $this->Products->find($id);
            return $p;
        }
        // } else {
        //     // URI is .../product/{id}
        //     $p = $this->Products->getProduct($id);
        //     return $p;
        // }
    }
}
