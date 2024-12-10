<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Customer.php");


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
class CustomerRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Customer{
        $requete = $this->cnx->prepare("select * from Customers where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if(!$answer){
            return null;
        }
        $p = new Customer($answer);

        return $p;
    }

    // Itération 9 : Récupérer tous les noms et id des clients
    
    public function findAll()
    {
        $requete = $this->cnx->prepare("select id, CONCAT(firs_name, ' ', last_name) as name from Customers");
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    // Itération 9 : Pour un client sélectionné, visualiser l’ensemble de produits commandés par catégorie

    public function returnCustomerProducts($id){
        $requete = $this->cnx->prepare("
            SELECT p.category, p.product_name, SUM(oi.quantity) as total_quantity
            FROM Customers c
            JOIN Orders o ON c.id = o.customer_id
            JOIN OrderItems oi ON o.id = oi.order_id
            JOIN Products p ON oi.product_id = p.id
            WHERE c.id = :customer_id
            GROUP BY p.category, p.product_name
            ORDER BY p.category, p.product_name
        ");
        $requete->bindParam(':customer_id', $id);
        $requete->execute();
        $result = $requete->fetchAll(PDO::FETCH_OBJ);

        // Grouper les résultats par catégorie
        $groupedResult = [];
        foreach ($result as $row) {
            $category = $row->category;
            if (!isset($groupedResult[$category])) {
                $groupedResult[$category] = [];
            }
            $groupedResult[$category][] = $row;
        }

        return $groupedResult;
    }

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

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($product){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function save($product){
        // Not implemented ! TODO when needed !
        return false;
    }


   
    
}