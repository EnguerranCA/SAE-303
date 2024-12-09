<?php
/**
 *  Class Product
 * 
 *  Représente une commande avec plusieurs propriétés
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Product doivent être convertis en JSON. Voir la méthode pour plus de détails.
 */
class Product implements JsonSerializable {
    private int $id; // id de la commande
    private int $Product_id; // id de la commande
    private int $product_id; // id du produit
    private int $quantity; // quantité du produit
    private string $status; // statut de la commande

    public function __construct(int $id){
        $this->id = $id;
    }

    /**
     *  Define how to convert/serialize an Product to a JSON format
     *  This method will be automatically invoked by json_encode when applied to an Product
     */
    public function jsonSerialize(): mixed {
        $json = [
            "id" => $this->id,
            "Product_id" => $this->Product_id ?? null,
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
     * Get the value of Product_id
     */ 
    public function getProductId(): int
    {
        return $this->Product_id;
    }

    /**
     * Set the value of Product_id
     *
     * @return  self
     */ 
    public function setProductId(int $Product_id): self
    {
        $this->Product_id = $Product_id;
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
