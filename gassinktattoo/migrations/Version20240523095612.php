<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240523095612 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE carrito_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE carrito_item_id_seq CASCADE');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT fk_3397dfa6de2cf6e7');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT fk_3397dfa67645698e');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT fk_3397dfa640b83cfe');
        $this->addSql('ALTER TABLE carrito DROP CONSTRAINT fk_77e6bed5de734e51');
        $this->addSql('DROP TABLE carrito_item');
        $this->addSql('DROP TABLE carrito');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE carrito_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE carrito_item_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE carrito_item (id INT NOT NULL, carrito_id INT NOT NULL, producto_id INT DEFAULT NULL, merchandising_id INT DEFAULT NULL, quantity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_3397dfa640b83cfe ON carrito_item (merchandising_id)');
        $this->addSql('CREATE INDEX idx_3397dfa67645698e ON carrito_item (producto_id)');
        $this->addSql('CREATE INDEX idx_3397dfa6de2cf6e7 ON carrito_item (carrito_id)');
        $this->addSql('CREATE TABLE carrito (id INT NOT NULL, cliente_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_77e6bed5de734e51 ON carrito (cliente_id)');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT fk_3397dfa6de2cf6e7 FOREIGN KEY (carrito_id) REFERENCES carrito (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT fk_3397dfa67645698e FOREIGN KEY (producto_id) REFERENCES producto (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT fk_3397dfa640b83cfe FOREIGN KEY (merchandising_id) REFERENCES merchandising (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito ADD CONSTRAINT fk_77e6bed5de734e51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
