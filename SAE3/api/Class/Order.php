<?php
/**
 *  Class Order
 * 
 *  Représente une commande avec plusieurs propriétés
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Order doivent être convertis en JSON. Voir la méthode pour plus de détails.
 */
class Order implements JsonSerializable {
    private int $id; // id de la commande
    private int $order_id; // id de la commande
    private int $product_id; // id du produit
    private int $quantity; // quantité du produit
    private string $status; // statut de la commande

    public function __construct(int $id){
        $this->id = $id;
    }

    /**
     *  Define how to convert/serialize an Order to a JSON format
     *  This method will be automatically invoked by json_encode when applied to an Order
     */
    public function jsonSerialize(): mixed {
        $json = [
            "id" => $this->id,
            "order_id" => $this->order_id ?? null,
            "product_id" => $this->product_id ?? null,
            "quantity" => $this->quantity ?? null
        ];

        // Remove fields with null values
        return array_filter($json, function($value) {
            return !is_null($value);
        });
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the value of order_id
     */ 
    public function getOrderId(): int
    {
        return $this->order_id;
    }

    /**
     * Set the value of order_id
     *
     * @return  self
     */ 
    public function setOrderId(int $order_id): self
    {
        $this->order_id = $order_id;
        return $this;
    }

    /**
     * Get the value of product_id
     */ 
    public function getProductId(): int
    {
        return $this->product_id;
    }

    /**
     * Set the value of product_id
     *
     * @return  self
     */ 
    public function setProductId(int $product_id): self
    {
        $this->product_id = $product_id;
        return $this;
    }

    /**
     * Get the value of quantity
     */ 
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * Set the value of quantity
     *
     * @return  self
     */ 
    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;
        return $this;
    }

    /**
     * Get the value of status
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @return  self
     */
    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }
    
}
