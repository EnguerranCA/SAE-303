<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Order.php");


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
class OrderRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Order{
        $requete = $this->cnx->prepare("select * from Orders where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if(!$answer){
            return null;
        }
        $p = new Order($answer);

        return $p;
    }

    public function countOrdersByStatus(){
        $requete = $this->cnx->prepare("SELECT order_status, COUNT(*) as count FROM Orders WHERE order_status IN ('Pending', 'Shipped', 'Delivered') GROUP BY order_status");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $result = [];
        foreach ($answer as $order) {
            $result[$order->order_status] = $order->count;
        }
        return $result;
    }

    public function returnArticlesSentPerCountry($month) {
        $requete = $this->cnx->prepare("
                SELECT 
                    c.country, 
                    COUNT(oi.id) as articles_count
                FROM 
                    Orders o
                JOIN 
                    OrderItems oi ON o.id = oi.order_id
                JOIN 
                    Customers c ON o.customer_id = c.id
                WHERE 
                    DATE_FORMAT(o.order_date, '%Y-%m') = :month
                GROUP BY 
                    c.country
                ORDER BY 
                    c.country
            ");
        $requete->bindParam(':month', $month);
        $requete->execute();
        return $requete->fetchAll(PDO::FETCH_OBJ);
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