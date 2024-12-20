<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Product.php");


/**
 *  Classe ProductRepository
 * 
 *  Cette classe représente le "stock" de Product.
 *  Toutes les opérations sur les Product doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class ProductRepository extends EntityRepository
{

    public function __construct()
    {
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Product
    {
        $requete = $this->cnx->prepare("select * from Products where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if (!$answer) {
            return null;
        }
        $p = new Product($answer);

        return $p;
    }

    // Itération 4 : Retourner les produits les plus vendus
    public function returnTopProducts($amount, $duration)
    {
        $requete = $this->cnx->prepare("
            SELECT p.product_name, SUM(oi.quantity) as total_quantity
            FROM Products p
            JOIN OrderItems oi ON p.id = oi.product_id
            JOIN Orders o ON oi.order_id = o.id
            WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL :duration MONTH)
            GROUP BY p.id
            ORDER BY total_quantity DESC
            LIMIT :amount
        ");
        $requete->bindParam(':amount', $amount, PDO::PARAM_INT);
        $requete->bindParam(':duration', $duration, PDO::PARAM_INT);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    // Itération 5 : Retourner les revenus par mois
    public function returnMonthlySales($duration)
    {
        $requete = $this->cnx->prepare("
            SELECT DATE_FORMAT(o.order_date, '%Y-%m') as month, SUM(oi.quantity * p.price) as total_sales
            FROM Orders o
            JOIN OrderItems oi ON o.id = oi.order_id
            JOIN Products p ON oi.product_id = p.id
            WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL (:duration - 1) MONTH)
            AND o.order_date <= CURDATE()
            GROUP BY month
            ORDER BY month
        ");
        $requete->bindParam(':duration', $duration, PDO::PARAM_INT);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }


    // Itération 6 : Visualiser le montant mensuel des ventes par catégorie 

    public function returnMonthlySalesCategory($duration)
    {
        $requete = $this->cnx->prepare("
            SELECT DATE_FORMAT(o.order_date, '%Y-%m') as month, p.category as category_name, SUM(oi.quantity * p.price) as total_sales
            FROM Orders o
            JOIN OrderItems oi ON o.id = oi.order_id
            JOIN Products p ON oi.product_id = p.id
            WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL (:duration - 1) MONTH)
            AND o.order_date <= CURDATE()
            GROUP BY p.category, month
            ORDER BY p.category, month
        ");
        $requete->bindParam(':duration', $duration, PDO::PARAM_INT);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);

        // Grouper les résultats par catégorie
        $groupedResult = [];
        foreach ($result as $row) {
            $category = $row->category_name;
            if (!isset($groupedResult[$category])) {
            $groupedResult[$category] = [];
            }
            $groupedResult[$category][] = $row;
        }

        // Convertir le résultat groupé en tableau
        $groupedResult = array_values($groupedResult);

        return $groupedResult;
    }

    // Itération 7 : Retourner les produits avec le plus petit stock

    public function returnSmallestStocks($amount)
    {
        $requete = $this->cnx->prepare("
            SELECT p.product_name, p.stock
            FROM Products p
            ORDER BY p.stock ASC
            LIMIT :amount
        ");
        $requete->bindParam(':amount', $amount, PDO::PARAM_INT);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    // Itération 8 : Pour un produit sélectionné, visualiser l’évolution de ses ventes sur les 12 derniers mois

    public function returnProductSales($product_id, $duration) {
        $requete = $this->cnx->prepare("
        SELECT DATE_FORMAT(o.order_date, '%Y-%m') as month, SUM(oi.quantity) as total_sales
        FROM Orders o
        JOIN OrderItems oi ON o.id = oi.order_id
        WHERE oi.product_id = :product_id
        AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL (:duration -1) MONTH)
        AND o.order_date <= CURDATE()
        GROUP BY month
        ORDER BY month
        ");
        $requete->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $requete->bindParam(':duration', $duration, PDO::PARAM_INT);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    // Itération 8 : récupérer le nom et l'id de tous les produits
    public function findAll()
    {
        $requete = $this->cnx->prepare("select id, product_name from Products");
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }
    
    public function delete($id)
    {
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($product)
    {
        // Not implemented ! TODO when needed !
        return false;
    }

    public function save($product)
    {
        // Not implemented ! TODO when needed !
        return false;
    }

}
