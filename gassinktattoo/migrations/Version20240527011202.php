<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240527011202 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE pedido_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE pedido_articulos_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE pedido (id INT NOT NULL, cliente_id INT NOT NULL, order_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, status VARCHAR(255) NOT NULL, price NUMERIC(10, 2) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C4EC16CEDE734E51 ON pedido (cliente_id)');
        $this->addSql('CREATE TABLE pedido_articulos (id INT NOT NULL, pedido_id INT NOT NULL, product_id INT DEFAULT NULL, merchandising_id INT DEFAULT NULL, quantity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_8472AAD54854653A ON pedido_articulos (pedido_id)');
        $this->addSql('CREATE INDEX IDX_8472AAD54584665A ON pedido_articulos (product_id)');
        $this->addSql('CREATE INDEX IDX_8472AAD540B83CFE ON pedido_articulos (merchandising_id)');
        $this->addSql('ALTER TABLE pedido ADD CONSTRAINT FK_C4EC16CEDE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pedido_articulos ADD CONSTRAINT FK_8472AAD54854653A FOREIGN KEY (pedido_id) REFERENCES pedido (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pedido_articulos ADD CONSTRAINT FK_8472AAD54584665A FOREIGN KEY (product_id) REFERENCES producto (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pedido_articulos ADD CONSTRAINT FK_8472AAD540B83CFE FOREIGN KEY (merchandising_id) REFERENCES merchandising (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE pedido_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE pedido_articulos_id_seq CASCADE');
        $this->addSql('ALTER TABLE pedido DROP CONSTRAINT FK_C4EC16CEDE734E51');
        $this->addSql('ALTER TABLE pedido_articulos DROP CONSTRAINT FK_8472AAD54854653A');
        $this->addSql('ALTER TABLE pedido_articulos DROP CONSTRAINT FK_8472AAD54584665A');
        $this->addSql('ALTER TABLE pedido_articulos DROP CONSTRAINT FK_8472AAD540B83CFE');
        $this->addSql('DROP TABLE pedido');
        $this->addSql('DROP TABLE pedido_articulos');
    }
}
