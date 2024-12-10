<?php
/**
 *  Class Customer
 * 
 *  Représente une commande avec plusieurs propriétés
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Customer doivent être convertis en JSON. Voir la méthode pour plus de détails.
 */
class Customer implements JsonSerializable {
    private int $id; // id du cient
    private string $first_name; // prénom du client
    private string $last_name; // nom du client

    
    public function __construct(int $id){
        $this->id = $id;
    }

    /**
     *  Define how to convert/serialize an Customer to a JSON format
     *  This method will be automatically invoked by json_encode when applied to an Customer
     */
    public function jsonSerialize(): mixed {
        $json = [
            "id" => $this->id,
            "name" => $this->first_name . ' ' . $this->last_name

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
     * Get the value of first_name
     */
    public function getFirstName(): string
    {
        return $this->first_name;
    }


    /**
     * Get the value of last_name
     */
    public function getLastName(): string
    {
        return $this->last_name;
    }

    
    
}
