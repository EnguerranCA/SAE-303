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
        $stat = $request->getParam("stat");
        $amount = $request->getParam("amount");
        $duration = $request->getParam("duration");
        $product_id = $request->getParam("product_id");
        if ($stat == "top") {
            // URI is .../product/status
            $p = $this->Products->returnTopProducts($amount, $duration);
            return $p;
        } else if ($stat == "sales") {
            // URI is .../product/sales
            $p = $this->Products->returnMonthlySales($duration);
            return $p;
        } 

        if ($stat == "sales_product") {
            // URI is .../product/sales?product_id=true
            $p = $this->Products->returnProductSales($product_id,$duration);
            return $p;
        }

        if ($stat == "sales_category") {
            // URI is .../product/sales?category=true
            $p = $this->Products->returnMonthlySalesCategory($duration);
            return $p;
        }

        else if ($stat == "smallest_stocks") {
            // URI is .../product/stock
            $p = $this->Products->returnSmallestStocks($amount);
            return $p;
        } else {
            // URI is .../product
            $p = $this->Products->findAll();
            return $p;
        }
    }
}
