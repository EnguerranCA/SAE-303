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
class ProductRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Product{
        $requete = $this->cnx->prepare("select * from Products where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if(!$answer){
            return null;
        }
        $p = new Product($answer);

        return $p;
    }

    public function returnTopProducts($amount, $duration){
        $requete = $this->cnx->prepare("
            SELECT p.*, SUM(oi.quantity) as total_quantity
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

    public function findAll(){
        // Not implemented ! TODO when needed !
        return false;
    }

   
    
}